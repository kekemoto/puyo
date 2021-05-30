/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.
    If not, see <https://www.gnu.org/licenses/agpl-3.0.en.html>.
*/

"use strict"

import i18nText from "./i18nText"

// system const
const FRAME_RATE = 60
const GAME_SET_CHAIN_SIZE = 5
const COMBO_SIZE = 3
const DEFAULT_COUNTRY = "ja"

// ui const
const TOKEN_SIZE = 60
const WEIGHT_BOLD = 5
const WEIGHT_DEFAULT = 1
const COLOR_BASE = 50
const COLOR_MAIN = 245
const COLOR_FIRST_LASER = 0
const COLOR_SECOND_LASER = 200
const COLOR_FIRST = `hsl(0, 75%, 65%)`
const COLOR_SECOND = `hsl(180, 75%, 65%)`
const COLOR_FOCUS_FIELD = `rgba(${COLOR_MAIN}, ${COLOR_MAIN}, ${COLOR_MAIN}, 0.05)`
const TEXT_FONT = "Ranchers"
const MARGIN_FIRLD = TOKEN_SIZE
const COMBO_ANIME_DELAY = 10

enum Player {
  First,
  Second,
}

enum GameState {
  Play,
  GameSet,
}

enum GameStateEvent {
  Init,
  Play,
  GameSet,
}

enum AnimeEvent {
  Play,
  Done,
  Abort,
}

enum TurnEvent {
  ToggleField,
  ToggleTurn,
}

// ---------------------------------------------------
// Definition of classes & functions used in the game.
// ---------------------------------------------------

class I18n {
  i18nText: { [key: string]: { [key: string]: string } } = i18nText
  country: string

  constructor() {
    this.setCountry()
  }

  setCountry(country?: string): void {
    if (country) {
      this.country = country
      return
    }

    country = window.navigator.language
    if (country && country !== "") {
      this.country = country.slice(0, 2)
      return
    }

    this.country = DEFAULT_COUNTRY
  }

  get(keyword: string): string {
    let countries = i18nText[keyword]
    if (countries === undefined) {
      never(`i18n keyword is undefined. keyword: ${keyword}`)
    }
    return countries[this.country] ?? countries[DEFAULT_COUNTRY]
  }
}

class Delayer {
  callbacks: Map<number, Array<() => void>> = new Map()

  set(delay: number, callback: () => void): void {
    let list = this.callbacks.get(frameCount + delay) ?? []
    list.push(callback)
    this.callbacks.set(frameCount + delay, list)
  }

  nextFrame(callback: () => void): void {
    this.set(1, callback)
  }

  check(): void {
    let list = this.callbacks.get(frameCount)
    if (list === undefined) {
      return
    }

    for (let callback of list) {
      callback()
    }
    this.callbacks.delete(frameCount)
  }
}

class EventEmitter<T> {
  listeners: Map<T, Function[]> = new Map()
  onceListeners: Map<T, Function[]> = new Map()

  on(eventName: T, listener: Function) {
    let list = this.listeners.get(eventName) ?? []
    list.push(listener)
    this.listeners.set(eventName, list)
  }

  onOnce(eventName: T, listener: Function): void {
    let list = this.onceListeners.get(eventName) ?? []
    list.push(listener)
    this.onceListeners.set(eventName, list)
  }

  emit(eventName: T, ...args: any[]): void {
    let list = this.listeners.get(eventName) ?? []
    for (let listener of list) {
      listener(...args)
    }

    list = this.onceListeners.get(eventName) ?? []
    for (let listener of list) {
      listener(...args)
    }
    this.onceListeners.delete(eventName)
  }
}

interface AudioElements {
  token: HTMLAudioElement | undefined
  laser: HTMLAudioElement | undefined
  gameset: HTMLAudioElement | undefined
  blink: HTMLAudioElement | undefined
}
class Sound {
  audioElements: AudioElements

  setup() {
    this.audioElements = {
      token: this.setupAudioElement("token"),
      laser: this.setupAudioElement("laser"),
      gameset: this.setupAudioElement("gameset"),
      blink: this.setupAudioElement("blink"),
    }
  }

  play(name: keyof AudioElements): void {
    let a = this.audioElements[name] ?? never()
    if (a.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
      a.currentTime = 0
      a.play()
    }
  }

  stop(name: keyof AudioElements): void {
    let a = this.audioElements[name] ?? never()
    if (a.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
      a.pause()
    }
  }

  private setupAudioElement(name: string): HTMLAudioElement {
    let e = document.getElementById(`audio-${name}`) ?? never()

    if (e instanceof HTMLAudioElement) {
      return e
    } else {
      never()
    }
  }
}

type AnimeHandler = (
  frame: number,
  params: { [key: string]: any }
) => boolean | void
class Anime extends EventEmitter<AnimeEvent> {
  handler: AnimeHandler
  isPlay: boolean
  startFrameCount: number
  params: { [key: string]: any }

  // The callback will be called when all animations are done.
  static doneAll(animes: Anime[], callback: () => void): void {
    const maxCount = animes.length
    let count = 0

    animes.forEach((a) => {
      a.onOnce(AnimeEvent.Done, () => {
        count += 1
        if (maxCount <= count) {
          callback()
        }
      })
    })
  }

  static playParallel(animes: Anime[], delay: number): Anime {
    if (animes.length === 0) {
      never('"animes" should be one or more arrays')
    } else if (animes.length <= 1) {
      return head(animes).play()
    } else {
      head(animes).play()
      delayer.set(delay, () => {
        this.playParallel(rest(animes), delay)
      })
      return tail(animes)
    }
  }

  constructor(
    handler: (frame: number, params?: { [key: string]: any }) => boolean | void,
    params?: object
  ) {
    super()
    this.handler = handler
    this.params = params ?? {}
    this.init()
  }

  play(): Anime {
    this.isPlay = true
    this.startFrameCount = frameCount
    this.emit(AnimeEvent.Play)
    return this
  }

  abort(): Anime {
    this.init
    this.emit(AnimeEvent.Abort)
    return this
  }

  draw() {
    if (!this.isPlay) {
      return
    }

    let isEnd = this.handler(frameCount - this.startFrameCount, this.params)
    if (isEnd) {
      this.init()
      this.emit(AnimeEvent.Done, this)
    }
  }

  private init() {
    this.isPlay = false
    this.startFrameCount = 0
  }
}

class AnimeViews {
  animes: Set<Anime> = new Set()

  add(anime: Anime): void {
    this.animes.add(anime)

    anime.onOnce(AnimeEvent.Done, () => {
      this.animes.delete(anime)
    })
    anime.onOnce(AnimeEvent.Abort, () => {
      this.animes.delete(anime)
    })
  }

  draw() {
    for (let a of this.animes) {
      a.draw()
    }
  }
}

class Scroller {
  x: number = 0
  y: number = 0
  private startX: number = 0
  private startY: number = 0
  private oldX: number = 0
  private oldY: number = 0

  init() {
    this.x = 0
    this.y = 0
    this.startX = 0
    this.startY = 0
    this.oldX = 0
    this.oldY = 0
  }

  touchStarted() {
    this.startX = mouseX
    this.startY = mouseY
    this.oldX = this.x
    this.oldY = this.y
  }

  touchMoved() {
    cursor("grabbing")
    this.x = this.oldX + mouseX - this.startX
    this.y = this.oldY + mouseY - this.startY
  }

  touchEnded() {
    cursor("auto")
  }
}

type Token = FirstToken | SecondToken | GuideToken

abstract class AbstractToken {
  x: number
  y: number

  abstract draw(): void

  get baseX(): number {
    return this.x - scroller.x
  }

  get baseY(): number {
    return this.y - scroller.y
  }

  get centerX(): number {
    return this.baseX + TOKEN_SIZE / 2
  }

  get centerY(): number {
    return this.baseY + TOKEN_SIZE / 2
  }
}

abstract class PlayerToken extends AbstractToken {
  x: number
  y: number
  readonly player: Player
  blinkAnime: Anime
  color: string

  constructor() {
    super()
    let max = 10
    this.blinkAnime = new Anime((frame: number) => {
      if (frame === 1) {
        sound.play("blink")
      }
      stroke(255)
      strokeWeight((30 * frame) / max)
      fill(this.color)
      rect(this.x, this.y, TOKEN_SIZE, TOKEN_SIZE)

      if (max <= frame) {
        sound.stop("blink")
        return true
      }
    })
  }

  draw() {
    if (this.blinkAnime.isPlay) {
      this.blinkAnime.draw()
    } else {
      stroke(COLOR_MAIN)
      strokeWeight(WEIGHT_DEFAULT)
      fill(this.color)
      rect(this.x, this.y, TOKEN_SIZE, TOKEN_SIZE)
    }
  }
}

class FirstToken extends PlayerToken {
  readonly player = Player.First
  color = COLOR_FIRST
}

class SecondToken extends PlayerToken {
  readonly player = Player.Second
  color = COLOR_SECOND
}

class GuideToken extends AbstractToken {
  readonly player = undefined
  anime: Anime

  constructor() {
    super()
    const ALPHA_BASE = 20
    const PHASE = [150, 250, 400]
    this.anime = new Anime((frame: number) => {
      frame = frame % PHASE[PHASE.length - 1]

      let c = color(
        turnModerator.player === Player.First ? COLOR_FIRST : COLOR_SECOND
      )
      if (frame <= PHASE[0]) {
        let max = PHASE[0]
        let strength = (max - frame) / max
        c.setAlpha(255 * 0.3 * strength + ALPHA_BASE)
      } else if (frame <= PHASE[1]) {
        c.setAlpha(ALPHA_BASE)
      } else {
        let min = PHASE[1]
        let max = PHASE[2]
        let strength = (frame - min) / (max - min)
        c.setAlpha(255 * 0.3 * strength + ALPHA_BASE)
      }

      fill(c)
      noStroke()
      rect(this.x, this.y, TOKEN_SIZE, TOKEN_SIZE)
    })
  }

  play(): Anime {
    return this.anime.play()
  }

  abort(): Anime {
    return this.anime.abort()
  }

  draw() {
    this.anime.draw()
  }
}

function makeTokenTurn(): Token {
  switch (turnModerator.player) {
    case Player.First:
      return new FirstToken()
    case Player.Second:
      return new SecondToken()
    default:
      return never()
  }
}

class FieldData {
  data: Array<Array<Token> | undefined>

  constructor() {
    this.init()
  }

  init() {
    this.data = [[new GuideToken()]]
  }

  set(token: Token, column: number, row: number): void {
    if (column < 0) {
      return
    }
    if (row < 0) {
      return
    }

    if (this.data[column] === undefined) {
      this.data[column] = []
    }
    // @ts-ignore
    this.data[column][row] = token
  }

  // Add only if empty.
  add(token: Token, column: number, row: number): void {
    if (undefined === this.get(column, row)) {
      this.set(token, column, row)
    }
  }

  get(column: number, row: number): Token | undefined {
    if (column < 0) {
      return undefined
    }
    if (row < 0) {
      return undefined
    }

    let a = this.data[column] ?? []
    return a[row]
  }

  forEach(callback: Function) {
    this.data.forEach((v, column) => {
      if (v === undefined) {
        return
      }
      v.forEach((token, row) => {
        callback(token, column, row)
      })
    })
  }

  getComboLines(
    column: number,
    row: number,
    size: number
  ): Array<Array<Token | undefined>> {
    const lines: Array<Array<Token | undefined>> = []
    let tokenLine: Array<Token | undefined> = []
    size -= 1

    // direction : horizontal
    tokenLine = range(-size, size).map((offset) =>
      this.get(column + offset, row)
    )
    lines.push(tokenLine)

    // direction : virtical
    tokenLine = range(-size, size).map((offset) =>
      this.get(column, row + offset)
    )
    lines.push(tokenLine)

    // direction : down and left
    tokenLine = range(-size, size).map((offset) =>
      this.get(column + offset, row + offset)
    )
    lines.push(tokenLine)

    // direction : down and right
    tokenLine = range(-size, size).map((offset) =>
      this.get(column - offset, row + offset)
    )
    lines.push(tokenLine)

    return lines
  }
}

abstract class AbstractField extends EventEmitter<GameStateEvent> {
  fieldData: FieldData
  player: Player
  baseX: number
  baseY: number
  enable: boolean

  abstract draw(): void

  // convert x, y -> column, row
  abstract toCell(column: number, row: number): { column: number; row: number }

  abstract windowResized(): void

  constructor() {
    super()
    this.windowResized()
    this.fieldData = new FieldData()
  }

  get x() {
    return this.baseX + scroller.x
  }

  get y() {
    return this.baseY + scroller.y
  }

  add(token: Token, column: number, row: number): void {
    if (turnModerator.canPutField !== this.player) {
      return
    }

    this.fieldData.set(token, column, row)
    let tokens = judgeGameSet(turnModerator.player, column, row, this.fieldData)
    if (0 < tokens.length) {
      this.emit(GameStateEvent.GameSet, tokens)
      return
    }

    this.addCandidates(column, row)

    delayer.nextFrame(() => {
      let combos = getCombos(turnModerator.player, column, row, this.fieldData)
      chainComboAnimate(combos)
      turnModerator.addComboCount(combos.length)
      turnModerator.action()
      this.guideAnimePlay()
      sound.play("token")
    })
  }

  private addCandidates(column: number, row: number): void {
    this.fieldData.add(new GuideToken(), column + 1, row)
    this.fieldData.add(new GuideToken(), column - 1, row)
    this.fieldData.add(new GuideToken(), column, row + 1)
    this.fieldData.add(new GuideToken(), column, row - 1)
  }

  private guideAnimePlay() {
    this.fieldData.forEach((token: Token) => {
      if (token instanceof GuideToken) {
        token.play()
      }
    })
  }

  init() {
    this.fieldData.init()
    this.enable = true
    this.guideAnimePlay()
  }

  mouseClicked() {
    const { column, row } = this.toCell(mouseX, mouseY)
    if (column < 0) {
      return
    }
    if (row < 0) {
      return
    }

    let token = this.fieldData.get(column, row)
    if (token instanceof GuideToken) {
      this.add(makeTokenTurn(), column, row)
      return false
    }
  }
}

// The field you can see on the left.
class FirstField extends AbstractField {
  constructor() {
    super()
    this.player = Player.First
  }

  toCell(x: number, y: number): { column: number; row: number } {
    return {
      column: floor((this.x - x) / TOKEN_SIZE),
      row: floor((this.y - y) / TOKEN_SIZE),
    }
  }

  draw() {
    if (!this.enable) {
      return
    }

    // background
    if (turnModerator.canPutField === this.player) {
      fill(COLOR_FOCUS_FIELD)
      noStroke()
      rect(0, 0, this.x, this.y)
    }

    // line
    let isCanPutField = turnModerator.canPutField === this.player
    if (isCanPutField) {
      strokeWeight(WEIGHT_BOLD)
      if (turnModerator.player === Player.First) {
        stroke(COLOR_FIRST)
      } else {
        stroke(COLOR_SECOND)
      }
    } else {
      strokeWeight(WEIGHT_DEFAULT)
      stroke(COLOR_MAIN)
    }
    line(this.x, this.y, this.x, 0)
    line(this.x, this.y, 0, this.y)

    // tokens
    strokeWeight(WEIGHT_DEFAULT)
    stroke(COLOR_MAIN)
    this.fieldData.forEach(
      (token: Token | undefined, column: number, row: number) => {
        if (token === undefined) {
          return
        }
        if (token instanceof GuideToken && !isCanPutField) {
          return
        }
        token.x = this.x - (column + 1) * TOKEN_SIZE
        token.y = this.y - (row + 1) * TOKEN_SIZE
        token.draw()
      }
    )
  }

  windowResized() {
    this.baseX = windowWidth / 2 - MARGIN_FIRLD / 2
    this.baseY = windowHeight - MARGIN_FIRLD
  }
}

// The field you can see on the right.
class SecondField extends AbstractField {
  constructor() {
    super()
    this.player = Player.Second
  }

  toCell(x: number, y: number): { column: number; row: number } {
    return {
      column: floor((x - this.x) / TOKEN_SIZE),
      row: floor((this.y - y) / TOKEN_SIZE),
    }
  }

  draw() {
    if (!this.enable) {
      return
    }

    // background
    if (turnModerator.canPutField === this.player) {
      fill(COLOR_FOCUS_FIELD)
      noStroke()
      rect(this.x, 0, windowWidth - scroller.x, this.y)
    }

    // line
    let isCanPutField = turnModerator.canPutField === this.player
    if (isCanPutField) {
      strokeWeight(WEIGHT_BOLD)
      if (turnModerator.player === Player.First) {
        stroke(COLOR_FIRST)
      } else {
        stroke(COLOR_SECOND)
      }
    } else {
      strokeWeight(WEIGHT_DEFAULT)
      stroke(COLOR_MAIN)
    }
    line(this.x, this.y, this.x, 0)
    line(this.x, this.y, windowWidth, this.y)

    // tokens
    strokeWeight(WEIGHT_DEFAULT)
    stroke(COLOR_MAIN)
    this.fieldData.forEach(
      (token: Token | undefined, column: number, row: number) => {
        if (token === undefined) {
          return
        }
        if (token instanceof GuideToken && !isCanPutField) {
          return
        }
        token.x = this.x + column * TOKEN_SIZE
        token.y = this.y - (row + 1) * TOKEN_SIZE
        token.draw()
      }
    )
  }

  windowResized() {
    this.baseX = windowWidth / 2 + MARGIN_FIRLD / 2
    this.baseY = windowHeight - MARGIN_FIRLD
  }
}

class GameSetScene extends EventEmitter<GameStateEvent> {
  private enable: boolean
  private player: Player | undefined

  private showAnime: Anime = new Anime((frame) => {
    this.coreDraw(frame / 30)

    if (30 <= frame) {
      return true
    }
  })

  private hideAnime: Anime = new Anime((frame) => {
    this.coreDraw(1)

    let strength = frame / 20
    strength = easeInOutQuad(strength)

    fill(COLOR_BASE)
    rect(0, 0, (windowWidth / 2) * strength, windowHeight)
    rect(
      windowWidth - (windowWidth / 2) * strength,
      0,
      windowWidth,
      windowHeight
    )

    if (20 <= frame) {
      return true
    }
  })

  constructor() {
    super()
    this.init()
  }

  init() {
    this.enable = false
    this.player = undefined
  }

  show(player: Player) {
    this.enable = true
    this.player = player
    this.showAnime.play()
  }

  hide() {
    this.hideAnime.onOnce(AnimeEvent.Done, () => {
      this.enable = false
      this.player = undefined
      this.emit(GameStateEvent.Init)
    })

    this.hideAnime.play()
  }

  mouseClicked() {
    if (!this.enable) {
      return
    }
    this.hide()
    return false
  }

  draw() {
    if (!this.enable) {
      return
    }

    if (this.showAnime.isPlay) {
      this.showAnime.draw()
    } else if (this.hideAnime.isPlay) {
      this.hideAnime.draw()
    } else {
      this.coreDraw(1)
    }
  }

  coreDraw(alphaRate: number) {
    let size = getTextSize()

    background(COLOR_MAIN)
    textSize(size)

    noStroke()
    let c = color(COLOR_BASE)
    c.setAlpha(255 * alphaRate)
    fill(c)
    text("Game Set", windowWidth / 2, windowHeight / 2 - size)

    stroke(c)
    strokeWeight(8)
    if (this.player == Player.First) {
      c = color(COLOR_FIRST)
      c.setAlpha(255 * alphaRate)
      fill(c)
      text(`Win : Red`, windowWidth / 2, windowHeight / 2 + size)
    } else {
      c = color(COLOR_SECOND)
      c.setAlpha(255 * alphaRate)
      fill(c)
      text(`Win : Blue`, windowWidth / 2, windowHeight / 2 + size)
    }
  }
}

class TurnModerator extends EventEmitter<TurnEvent> {
  player: Player
  actionCount: number
  canPutField: Player

  constructor() {
    super()
    this.init()
  }

  init() {
    this.player = Player.First
    this.actionCount = 1
    this.canPutField = Player.First
  }

  action() {
    this.actionCount -= 1
    if (this.actionCount <= 0) {
      this.toggleTurn()
    }
  }

  addComboCount(count: number) {
    if (count === 0) {
      return
    }
    this.actionCount += count
    this.toggleField()
  }

  toggleField() {
    this.canPutField =
      this.canPutField === Player.First ? Player.Second : Player.First
    this.emit(TurnEvent.ToggleField)
  }

  toggleTurn() {
    this.player = this.player === Player.First ? Player.Second : Player.First
    this.actionCount = 1

    if (this.canPutField !== this.player) {
      this.canPutField = this.player
      this.emit(TurnEvent.ToggleField)
    }

    this.emit(TurnEvent.ToggleTurn)
  }
}

class GameModerator {
  // state
  gameState: GameState = GameState.Play

  // Game Object
  firstField: FirstField
  secondField: SecondField
  gameSetScene: GameSetScene

  constructor(
    firstField: FirstField,
    secondField: SecondField,
    gameSetScene: GameSetScene
  ) {
    this.firstField = firstField
    this.secondField = secondField
    this.gameSetScene = gameSetScene
  }

  init() {
    scroller.init()
    turnModerator.init()
    this.gameSetScene.init()
    this.secondField.init()
    this.firstField.init()
  }

  gameSet(tokens: PlayerToken[]) {
    let hue =
      head(tokens).player === Player.First
        ? COLOR_FIRST_LASER
        : COLOR_SECOND_LASER

    let slashAnime = new Anime((frame) => {
      let strength: number
      let lineFunc = makeLineFunction(
        head(tokens).centerX + scroller.x,
        head(tokens).centerY + scroller.y,
        tail(tokens).centerX + scroller.x,
        tail(tokens).centerY + scroller.y
      )

      if (frame <= 4) {
        strength = frame / 4
        const [x1, y1] = lineFunc(0)
        const [x2, y2] = lineFunc(windowWidth * strength)
        laserLine(x1, y1, x2, y2, hue)
      } else if (frame <= 34) {
        if (frame === 5) sound.play("laser")
        const [x1, y1] = lineFunc(0)
        const [x2, y2] = lineFunc(windowWidth)
        laserLine(x1, y1, x2, y2, hue)
      } else if (frame <= 84) {
        if (frame === 38) sound.play("gameset")
        strength = (frame - 34) / (84 - 34)
        const [x1, y1] = lineFunc(0)
        const [x2, y2] = lineFunc(windowWidth)
        const maxWeight = max([windowWidth, windowHeight]) * 2.5
        laserLine(x1, y1, x2, y2, hue, maxWeight * strength)
      } else if (frame <= 94) {
        const [x1, y1] = lineFunc(0)
        const [x2, y2] = lineFunc(windowWidth)
        const maxWeight = max([windowWidth, windowHeight]) * 2.5
        laserLine(x1, y1, x2, y2, hue, maxWeight)
      } else {
        return true
      }
    })
    animeViews.add(slashAnime)

    slashAnime.on(AnimeEvent.Done, () => {
      this.firstField.enable = false
      this.secondField.enable = false
      this.gameSetScene.show(head(tokens).player as Player)
    })

    let animes = tokens.map((t) => t.blinkAnime)
    animes.push(slashAnime)
    Anime.playParallel(animes, COMBO_ANIME_DELAY)
  }
}

function judgeGameSet(
  player: Player,
  column: number,
  row: number,
  field: FieldData
): PlayerToken[] {
  let lines = field.getComboLines(column, row, GAME_SET_CHAIN_SIZE)
  for (let tokens of lines) {
    let result = getComboTokens(player, tokens, GAME_SET_CHAIN_SIZE)
    if (0 < result.length) {
      return result
    }
  }
  return []
}

function getCombos(
  player: Player,
  column: number,
  row: number,
  field: FieldData
): PlayerToken[][] {
  // Combos do not occur on enemy fields.
  if (turnModerator.player !== turnModerator.canPutField) {
    return []
  }

  let result: PlayerToken[][] = []
  let lines = field.getComboLines(column, row, COMBO_SIZE + 1)
  for (let tokens of lines) {
    // If a combo has already occurred, it will not be counted.
    // It exists only at the terminal.
    let terminal = tokens.slice(0, COMBO_SIZE + 1)
    if (isCombo(player, terminal, COMBO_SIZE + 1)) {
      tokens = tokens.slice(COMBO_SIZE)
    }
    terminal = tokens.slice(-(COMBO_SIZE + 1))
    if (isCombo(player, terminal, COMBO_SIZE + 1)) {
      tokens = tokens.slice(0, -COMBO_SIZE)
    }

    let comboTokens = getComboTokens(player, tokens, COMBO_SIZE)
    if (0 < comboTokens.length) {
      result.push(comboTokens)
    }
  }

  return result
}

function getComboTokens(
  player: Player,
  tokens: Array<Token | undefined>,
  size: number
): PlayerToken[] {
  let result: PlayerToken[] = []

  for (let token of tokens) {
    if (token === undefined) {
      result = []
      continue
    }

    if (token.player === player) {
      result.push(token as PlayerToken)
    } else {
      result = []
    }

    if (size <= result.length) {
      return result
    }
  }
  return []
}

function isCombo(
  player: Player,
  tokens: Array<Token | undefined>,
  size: number
): boolean {
  return 0 < getComboTokens(player, tokens, size).length
}

const slashAnimeHandler: AnimeHandler = (frame, params) => {
  if (frame === 1) {
    sound.play("laser")
  }

  let strength: number
  let lineFunc = makeLineFunction(
    params.x1 + scroller.x,
    params.y1 + scroller.y,
    params.x2 + scroller.x,
    params.y2 + scroller.y
  )

  if (frame <= 4) {
    strength = frame / 4
    const [x1, y1] = lineFunc(0)
    const [x2, y2] = lineFunc(windowWidth * strength)
    laserLine(x1, y1, x2, y2, params.hue)
  } else if (frame <= 64) {
    const [x1, y1] = lineFunc(0)
    const [x2, y2] = lineFunc(windowWidth)
    laserLine(x1, y1, x2, y2, params.hue)
  } else if (frame <= 68) {
    strength = (frame - 64) / (68 - 64)
    const [x1, y1] = lineFunc(windowWidth * strength)
    const [x2, y2] = lineFunc(windowWidth)
    laserLine(x1, y1, x2, y2, params.hue)
  } else {
    return true
  }
}

// Create a function of a straight line passing through two points.
// The created function returns [x, y] when passed x.
// (auxiliary variable)
function makeLineFunction(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): (x: number) => [number, number] {
  if (x1 === x2) {
    // When x1 and x2 are the same, they cannot be represented by "y = ax + b".
    return (x: number) => [x1, (windowHeight * x) / windowHeight]
  }

  return (x: number) => [x, ((y2 - y1) * (x - x1)) / (x2 - x1) + y1]
}

function betweenLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  offset: number
): void {
  if (x1 === x2) {
    line(x1 + offset, y1, x2 + offset, y2)
    line(x1 - offset, y1, x2 - offset, y2)
  } else {
    line(x1, y1 + offset, x2, y2 + offset)
    line(x1, y1 - offset, x2, y2 - offset)
  }
}

function laserLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  hue: number,
  coreWeight: number | undefined = undefined
): void {
  const rates = [5, 2, 6, 6]
  const totalRate = rates.reduce((value, total) => total + value)
  const totalWeight =
    coreWeight === undefined ? TOKEN_SIZE : (coreWeight * totalRate) / rates[0]
  const weights = rates.map((rate) => (totalWeight * rate) / totalRate / 2)

  let offset = weights[0] / 2
  stroke(`hsl(${hue}, 100%, 100%)`)
  strokeWeight(weights[0])
  betweenLine(x1, y1, x2, y2, offset)

  offset += weights[0] / 2 + weights[1] / 2
  stroke(`hsl(${hue}, 100%, 50%)`)
  strokeWeight(weights[1])
  betweenLine(x1, y1, x2, y2, offset)

  offset += weights[1] / 2 + weights[2] / 2
  stroke(`hsla(${hue}, 100%, 50%, 0.5)`)
  strokeWeight(weights[2])
  betweenLine(x1, y1, x2, y2, offset)

  offset += weights[2] / 2 + weights[3] / 2
  stroke(`hsla(${hue}, 100%, 50%, 0.2)`)
  strokeWeight(weights[3])
  betweenLine(x1, y1, x2, y2, offset)
}

function comboAnimate(tokens: PlayerToken[]): Anime {
  if (tokens.length < 2) {
    never(`You need at least two tokens. size: ${tokens.length}`)
  }

  let animes = tokens.map((t) => t.blinkAnime)
  let tailTokenAnime = tail(animes)

  let slashAnime = new Anime(slashAnimeHandler, {
    x1: head(tokens).centerX,
    y1: head(tokens).centerY,
    x2: tail(tokens).centerX,
    y2: tail(tokens).centerY,
    hue:
      head(tokens).player === Player.First
        ? COLOR_FIRST_LASER
        : COLOR_SECOND_LASER,
  })
  animeViews.add(slashAnime)

  animes.push(slashAnime)
  Anime.playParallel(animes, COMBO_ANIME_DELAY)

  return tailTokenAnime
}

function chainComboAnimate(combos: PlayerToken[][]): void {
  if (combos.length === 0) {
    return
  } else if (combos.length === 1) {
    comboAnimate(head(combos))
  } else {
    let anime = comboAnimate(head(combos))
    anime.onOnce(AnimeEvent.Done, () => {
      chainComboAnimate(rest(combos))
    })
  }
}

function getTextSize() {
  return floor(min([windowWidth, windowHeight]) / 5)
}

function eventPropagate(
  eventName: string,
  gameObjects: object[]
): void | boolean {
  for (let i of gameObjects) {
    let isPropagate = tryCall(i, eventName)
    if (isPropagate === false) {
      return false
    }
  }
}

function tryCall(object: Object, method_name: string, ...args: any[]): any {
  if (object === undefined) {
    return undefined
  }
  if (object[method_name] instanceof Function) {
    return object[method_name](...args)
  }
  return undefined
}

// function devError(msg: string) {
//   // @ts-ignore
//   if (process.env.NODE_ENV === "production") {
//     console.error(msg)
//   } else {
//     throw new Error(msg)
//   }
// }

function range(min: number, max: number, step: number = 1): number[] {
  let result: number[] = []
  for (let i = 0; i <= max - min; i += step) {
    result.push(min + i)
  }
  return result
}

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
}

function head<T>(array: Array<T>): T {
  return array[0]
}

function rest<T>(array: Array<T>): Array<T> {
  return array.slice(1)
}

function tail<T>(array: Array<T>): T {
  return array[array.length - 1]
}

function never(message: string = "It cannot be reached."): never {
  throw new Error(message)
}

function print(...args: any) {
  console.log(...args)
}

// ---------------------------------------------------
// Define the main processing of the game.
// ---------------------------------------------------

let views: any[] = []
let turnModerator = new TurnModerator()
let scroller = new Scroller()
let animeViews = new AnimeViews()
let delayer = new Delayer()
let sound = new Sound()
let i18n = new I18n()

window.setup = function () {
  createCanvas(windowWidth, windowHeight)
  textAlign(CENTER, CENTER)
  textFont(TEXT_FONT)
  frameRate(FRAME_RATE)

  let gameSetScene = new GameSetScene()

  let firstField = new FirstField()

  let secondField = new SecondField()

  let gameModerator = new GameModerator(firstField, secondField, gameSetScene)
  gameModerator.init()

  firstField.on(GameStateEvent.GameSet, (tokens: PlayerToken[]) => {
    gameModerator.gameSet(tokens)
  })

  secondField.on(GameStateEvent.GameSet, (tokens: PlayerToken[]) => {
    gameModerator.gameSet(tokens)
  })

  gameSetScene.on(GameStateEvent.Init, () => {
    gameModerator.init()
  })

  sound.setup()

  views.push(firstField)
  views.push(secondField)
  views.push(animeViews)
  views.push(gameSetScene)
}

window.draw = function () {
  clear()
  background(COLOR_BASE)
  eventPropagate("draw", views)
  delayer.check()
}

window.mouseClicked = function () {
  return eventPropagate("mouseClicked", views.reverse())
}

window.touchStarted = function () {
  scroller.touchStarted()
}

window.touchMoved = function () {
  scroller.touchMoved()
  return false
}

window.touchEnded = function () {
  scroller.touchEnded()
}

window.windowResized = function () {
  resizeCanvas(windowWidth, windowHeight)
  return eventPropagate("windowResized", views)
}
