// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"59e9e917ff9583ff8d2552c82d29ccb7":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 80;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "3c67c037b28431da02862bb59faac42c";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"6a21b61466c14587a3ded1aa3b933b89":[function(require,module,exports) {
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
"use strict";

var _i18nText = _interopRequireDefault(require("./i18nText"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// system const
const FRAME_RATE = 60;
const GAME_SET_CHAIN_SIZE = 5;
const COMBO_SIZE = 3;
const DEFAULT_COUNTRY = "ja"; // ui const

const TOKEN_SIZE = 60;
const WEIGHT_BOLD = 5;
const WEIGHT_DEFAULT = 1;
const COLOR_BASE = 50;
const COLOR_MAIN = 245;
const COLOR_FIRST_LASER = 0;
const COLOR_SECOND_LASER = 200;
const COLOR_FIRST = `hsl(0, 75%, 65%)`;
const COLOR_SECOND = `hsl(180, 75%, 65%)`;
const COLOR_FOCUS_FIELD = `rgba(${COLOR_MAIN}, ${COLOR_MAIN}, ${COLOR_MAIN}, 0.05)`;
const TEXT_FONT = "Ranchers";
const MARGIN_FIRLD = TOKEN_SIZE;
const COMBO_ANIME_DELAY = 10;
var Player;

(function (Player) {
  Player[Player["First"] = 0] = "First";
  Player[Player["Second"] = 1] = "Second";
})(Player || (Player = {}));

var GameState;

(function (GameState) {
  GameState[GameState["Play"] = 0] = "Play";
  GameState[GameState["GameSet"] = 1] = "GameSet";
})(GameState || (GameState = {}));

var GameStateEvent;

(function (GameStateEvent) {
  GameStateEvent[GameStateEvent["Init"] = 0] = "Init";
  GameStateEvent[GameStateEvent["Play"] = 1] = "Play";
  GameStateEvent[GameStateEvent["GameSet"] = 2] = "GameSet";
})(GameStateEvent || (GameStateEvent = {}));

var AnimeEvent;

(function (AnimeEvent) {
  AnimeEvent[AnimeEvent["Play"] = 0] = "Play";
  AnimeEvent[AnimeEvent["Done"] = 1] = "Done";
  AnimeEvent[AnimeEvent["Abort"] = 2] = "Abort";
})(AnimeEvent || (AnimeEvent = {}));

var TurnEvent; // ---------------------------------------------------
// Definition of classes & functions used in the game.
// ---------------------------------------------------

(function (TurnEvent) {
  TurnEvent[TurnEvent["ToggleField"] = 0] = "ToggleField";
  TurnEvent[TurnEvent["ToggleTurn"] = 1] = "ToggleTurn";
})(TurnEvent || (TurnEvent = {}));

class I18n {
  constructor() {
    _defineProperty(this, "i18nText", _i18nText.default);

    this.setCountry();
  }

  setCountry(country) {
    if (country) {
      this.country = country;
      return;
    }

    country = window.navigator.language;

    if (country && country !== "") {
      this.country = country.slice(0, 2);
      return;
    }

    this.country = DEFAULT_COUNTRY;
  }

  get(keyword) {
    let countries = _i18nText.default[keyword];

    if (countries === undefined) {
      never(`i18n keyword is undefined. keyword: ${keyword}`);
    }

    return countries[this.country] ?? countries[DEFAULT_COUNTRY];
  }

}

class Delayer {
  constructor() {
    _defineProperty(this, "callbacks", new Map());
  }

  set(delay, callback) {
    let list = this.callbacks.get(frameCount + delay) ?? [];
    list.push(callback);
    this.callbacks.set(frameCount + delay, list);
  }

  nextFrame(callback) {
    this.set(1, callback);
  }

  check() {
    let list = this.callbacks.get(frameCount);

    if (list === undefined) {
      return;
    }

    for (let callback of list) {
      callback();
    }

    this.callbacks.delete(frameCount);
  }

}

class EventEmitter {
  constructor() {
    _defineProperty(this, "listeners", new Map());

    _defineProperty(this, "onceListeners", new Map());
  }

  on(eventName, listener) {
    let list = this.listeners.get(eventName) ?? [];
    list.push(listener);
    this.listeners.set(eventName, list);
  }

  onOnce(eventName, listener) {
    let list = this.onceListeners.get(eventName) ?? [];
    list.push(listener);
    this.onceListeners.set(eventName, list);
  }

  emit(eventName, ...args) {
    let list = this.listeners.get(eventName) ?? [];

    for (let listener of list) {
      listener(...args);
    }

    list = this.onceListeners.get(eventName) ?? [];

    for (let listener of list) {
      listener(...args);
    }

    this.onceListeners.delete(eventName);
  }

}

class Sound {
  setup() {
    this.audioElements = {
      token: this.setupAudioElement("token"),
      laser: this.setupAudioElement("laser"),
      gameset: this.setupAudioElement("gameset"),
      blink: this.setupAudioElement("blink")
    };
  }

  play(name) {
    let a = this.audioElements[name] ?? never();

    if (a.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
      a.currentTime = 0;
      a.play();
    }
  }

  stop(name) {
    let a = this.audioElements[name] ?? never();

    if (a.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
      a.pause();
    }
  }

  setupAudioElement(name) {
    let e = document.getElementById(`audio-${name}`) ?? never();

    if (e instanceof HTMLAudioElement) {
      return e;
    } else {
      never();
    }
  }

}

class Anime extends EventEmitter {
  // The callback will be called when all animations are done.
  static doneAll(animes, callback) {
    const maxCount = animes.length;
    let count = 0;
    animes.forEach(a => {
      a.onOnce(AnimeEvent.Done, () => {
        count += 1;

        if (maxCount <= count) {
          callback();
        }
      });
    });
  }

  static playParallel(animes, delay) {
    if (animes.length === 0) {
      never('"animes" should be one or more arrays');
    } else if (animes.length <= 1) {
      return head(animes).play();
    } else {
      head(animes).play();
      delayer.set(delay, () => {
        this.playParallel(rest(animes), delay);
      });
      return tail(animes);
    }
  }

  constructor(handler, params) {
    super();
    this.handler = handler;
    this.params = params ?? {};
    this.init();
  }

  play() {
    this.isPlay = true;
    this.startFrameCount = frameCount;
    this.emit(AnimeEvent.Play);
    return this;
  }

  abort() {
    this.init;
    this.emit(AnimeEvent.Abort);
    return this;
  }

  draw() {
    if (!this.isPlay) {
      return;
    }

    let isEnd = this.handler(frameCount - this.startFrameCount, this.params);

    if (isEnd) {
      this.init();
      this.emit(AnimeEvent.Done, this);
    }
  }

  init() {
    this.isPlay = false;
    this.startFrameCount = 0;
  }

}

class AnimeViews {
  constructor() {
    _defineProperty(this, "animes", new Set());
  }

  add(anime) {
    this.animes.add(anime);
    anime.onOnce(AnimeEvent.Done, () => {
      this.animes.delete(anime);
    });
    anime.onOnce(AnimeEvent.Abort, () => {
      this.animes.delete(anime);
    });
  }

  draw() {
    for (let a of this.animes) {
      a.draw();
    }
  }

}

class Scroller {
  constructor() {
    _defineProperty(this, "x", 0);

    _defineProperty(this, "y", 0);

    _defineProperty(this, "startX", 0);

    _defineProperty(this, "startY", 0);

    _defineProperty(this, "oldX", 0);

    _defineProperty(this, "oldY", 0);
  }

  init() {
    this.x = 0;
    this.y = 0;
    this.startX = 0;
    this.startY = 0;
    this.oldX = 0;
    this.oldY = 0;
  }

  touchStarted() {
    this.startX = mouseX;
    this.startY = mouseY;
    this.oldX = this.x;
    this.oldY = this.y;
  }

  touchMoved() {
    cursor("grabbing");
    this.x = this.oldX + mouseX - this.startX;
    this.y = this.oldY + mouseY - this.startY;
  }

  touchEnded() {
    cursor("auto");
  }

}

class AbstractToken {
  get baseX() {
    return this.x - scroller.x;
  }

  get baseY() {
    return this.y - scroller.y;
  }

  get centerX() {
    return this.baseX + TOKEN_SIZE / 2;
  }

  get centerY() {
    return this.baseY + TOKEN_SIZE / 2;
  }

}

class PlayerToken extends AbstractToken {
  constructor() {
    super();
    let max = 10;
    this.blinkAnime = new Anime(frame => {
      if (frame === 1) {
        sound.play("blink");
      }

      stroke(255);
      strokeWeight(30 * frame / max);
      fill(this.color);
      rect(this.x, this.y, TOKEN_SIZE, TOKEN_SIZE);

      if (max <= frame) {
        sound.stop("blink");
        return true;
      }
    });
  }

  draw() {
    if (this.blinkAnime.isPlay) {
      this.blinkAnime.draw();
    } else {
      stroke(COLOR_MAIN);
      strokeWeight(WEIGHT_DEFAULT);
      fill(this.color);
      rect(this.x, this.y, TOKEN_SIZE, TOKEN_SIZE);
    }
  }

}

class FirstToken extends PlayerToken {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "player", Player.First);

    _defineProperty(this, "color", COLOR_FIRST);
  }

}

class SecondToken extends PlayerToken {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "player", Player.Second);

    _defineProperty(this, "color", COLOR_SECOND);
  }

}

class GuideToken extends AbstractToken {
  constructor() {
    super();

    _defineProperty(this, "player", undefined);

    const ALPHA_BASE = 20;
    const PHASE = [150, 250, 400];
    this.anime = new Anime(frame => {
      frame = frame % PHASE[PHASE.length - 1];
      let c = color(turnModerator.player === Player.First ? COLOR_FIRST : COLOR_SECOND);

      if (frame <= PHASE[0]) {
        let max = PHASE[0];
        let strength = (max - frame) / max;
        c.setAlpha(255 * 0.3 * strength + ALPHA_BASE);
      } else if (frame <= PHASE[1]) {
        c.setAlpha(ALPHA_BASE);
      } else {
        let min = PHASE[1];
        let max = PHASE[2];
        let strength = (frame - min) / (max - min);
        c.setAlpha(255 * 0.3 * strength + ALPHA_BASE);
      }

      fill(c);
      noStroke();
      rect(this.x, this.y, TOKEN_SIZE, TOKEN_SIZE);
    });
  }

  play() {
    return this.anime.play();
  }

  abort() {
    return this.anime.abort();
  }

  draw() {
    this.anime.draw();
  }

}

function makeTokenTurn() {
  switch (turnModerator.player) {
    case Player.First:
      return new FirstToken();

    case Player.Second:
      return new SecondToken();

    default:
      return never();
  }
}

class FieldData {
  constructor() {
    this.init();
  }

  init() {
    this.data = [[new GuideToken()]];
  }

  set(token, column, row) {
    if (column < 0) {
      return;
    }

    if (row < 0) {
      return;
    }

    if (this.data[column] === undefined) {
      this.data[column] = [];
    } // @ts-ignore


    this.data[column][row] = token;
  } // Add only if empty.


  add(token, column, row) {
    if (undefined === this.get(column, row)) {
      this.set(token, column, row);
    }
  }

  get(column, row) {
    if (column < 0) {
      return undefined;
    }

    if (row < 0) {
      return undefined;
    }

    let a = this.data[column] ?? [];
    return a[row];
  }

  forEach(callback) {
    this.data.forEach((v, column) => {
      if (v === undefined) {
        return;
      }

      v.forEach((token, row) => {
        callback(token, column, row);
      });
    });
  }

  getComboLines(column, row, size) {
    const lines = [];
    let tokenLine = [];
    size -= 1; // direction : horizontal

    tokenLine = range(-size, size).map(offset => this.get(column + offset, row));
    lines.push(tokenLine); // direction : virtical

    tokenLine = range(-size, size).map(offset => this.get(column, row + offset));
    lines.push(tokenLine); // direction : down and left

    tokenLine = range(-size, size).map(offset => this.get(column + offset, row + offset));
    lines.push(tokenLine); // direction : down and right

    tokenLine = range(-size, size).map(offset => this.get(column - offset, row + offset));
    lines.push(tokenLine);
    return lines;
  }

}

class AbstractField extends EventEmitter {
  // convert x, y -> column, row
  constructor() {
    super();
    this.windowResized();
    this.fieldData = new FieldData();
  }

  get x() {
    return this.baseX + scroller.x;
  }

  get y() {
    return this.baseY + scroller.y;
  }

  add(token, column, row) {
    if (turnModerator.canPutField !== this.player) {
      return;
    }

    this.fieldData.set(token, column, row);
    let tokens = judgeGameSet(turnModerator.player, column, row, this.fieldData);

    if (0 < tokens.length) {
      this.emit(GameStateEvent.GameSet, tokens);
      return;
    }

    this.addCandidates(column, row);
    delayer.nextFrame(() => {
      let combos = getCombos(turnModerator.player, column, row, this.fieldData);
      chainComboAnimate(combos);
      turnModerator.addComboCount(combos.length);
      turnModerator.action();
      this.guideAnimePlay();
      sound.play("token");
    });
  }

  addCandidates(column, row) {
    this.fieldData.add(new GuideToken(), column + 1, row);
    this.fieldData.add(new GuideToken(), column - 1, row);
    this.fieldData.add(new GuideToken(), column, row + 1);
    this.fieldData.add(new GuideToken(), column, row - 1);
  }

  guideAnimePlay() {
    this.fieldData.forEach(token => {
      if (token instanceof GuideToken) {
        token.play();
      }
    });
  }

  init() {
    this.fieldData.init();
    this.enable = true;
    this.guideAnimePlay();
  }

  mouseClicked() {
    const {
      column,
      row
    } = this.toCell(mouseX, mouseY);

    if (column < 0) {
      return;
    }

    if (row < 0) {
      return;
    }

    let token = this.fieldData.get(column, row);

    if (token instanceof GuideToken) {
      this.add(makeTokenTurn(), column, row);
      return false;
    }
  }

} // The field you can see on the left.


class FirstField extends AbstractField {
  constructor() {
    super();
    this.player = Player.First;
  }

  toCell(x, y) {
    return {
      column: floor((this.x - x) / TOKEN_SIZE),
      row: floor((this.y - y) / TOKEN_SIZE)
    };
  }

  draw() {
    if (!this.enable) {
      return;
    } // background


    if (turnModerator.canPutField === this.player) {
      fill(COLOR_FOCUS_FIELD);
      noStroke();
      rect(0, 0, this.x, this.y);
    } // line


    let isCanPutField = turnModerator.canPutField === this.player;

    if (isCanPutField) {
      strokeWeight(WEIGHT_BOLD);

      if (turnModerator.player === Player.First) {
        stroke(COLOR_FIRST);
      } else {
        stroke(COLOR_SECOND);
      }
    } else {
      strokeWeight(WEIGHT_DEFAULT);
      stroke(COLOR_MAIN);
    }

    line(this.x, this.y, this.x, 0);
    line(this.x, this.y, 0, this.y); // tokens

    strokeWeight(WEIGHT_DEFAULT);
    stroke(COLOR_MAIN);
    this.fieldData.forEach((token, column, row) => {
      if (token === undefined) {
        return;
      }

      if (token instanceof GuideToken && !isCanPutField) {
        return;
      }

      token.x = this.x - (column + 1) * TOKEN_SIZE;
      token.y = this.y - (row + 1) * TOKEN_SIZE;
      token.draw();
    });
  }

  windowResized() {
    this.baseX = windowWidth / 2 - MARGIN_FIRLD / 2;
    this.baseY = windowHeight - MARGIN_FIRLD;
  }

} // The field you can see on the right.


class SecondField extends AbstractField {
  constructor() {
    super();
    this.player = Player.Second;
  }

  toCell(x, y) {
    return {
      column: floor((x - this.x) / TOKEN_SIZE),
      row: floor((this.y - y) / TOKEN_SIZE)
    };
  }

  draw() {
    if (!this.enable) {
      return;
    } // background


    if (turnModerator.canPutField === this.player) {
      fill(COLOR_FOCUS_FIELD);
      noStroke();
      rect(this.x, 0, windowWidth - scroller.x, this.y);
    } // line


    let isCanPutField = turnModerator.canPutField === this.player;

    if (isCanPutField) {
      strokeWeight(WEIGHT_BOLD);

      if (turnModerator.player === Player.First) {
        stroke(COLOR_FIRST);
      } else {
        stroke(COLOR_SECOND);
      }
    } else {
      strokeWeight(WEIGHT_DEFAULT);
      stroke(COLOR_MAIN);
    }

    line(this.x, this.y, this.x, 0);
    line(this.x, this.y, windowWidth, this.y); // tokens

    strokeWeight(WEIGHT_DEFAULT);
    stroke(COLOR_MAIN);
    this.fieldData.forEach((token, column, row) => {
      if (token === undefined) {
        return;
      }

      if (token instanceof GuideToken && !isCanPutField) {
        return;
      }

      token.x = this.x + column * TOKEN_SIZE;
      token.y = this.y - (row + 1) * TOKEN_SIZE;
      token.draw();
    });
  }

  windowResized() {
    this.baseX = windowWidth / 2 + MARGIN_FIRLD / 2;
    this.baseY = windowHeight - MARGIN_FIRLD;
  }

}

class GameSetScene extends EventEmitter {
  constructor() {
    super();

    _defineProperty(this, "showAnime", new Anime(frame => {
      this.coreDraw(frame / 30);

      if (30 <= frame) {
        return true;
      }
    }));

    _defineProperty(this, "hideAnime", new Anime(frame => {
      this.coreDraw(1);
      let strength = frame / 20;
      strength = easeInOutQuad(strength);
      fill(COLOR_BASE);
      rect(0, 0, windowWidth / 2 * strength, windowHeight);
      rect(windowWidth - windowWidth / 2 * strength, 0, windowWidth, windowHeight);

      if (20 <= frame) {
        return true;
      }
    }));

    this.init();
  }

  init() {
    this.enable = false;
    this.player = undefined;
  }

  show(player) {
    this.enable = true;
    this.player = player;
    this.showAnime.play();
  }

  hide() {
    this.hideAnime.onOnce(AnimeEvent.Done, () => {
      this.enable = false;
      this.player = undefined;
      this.emit(GameStateEvent.Init);
    });
    this.hideAnime.play();
  }

  mouseClicked() {
    if (!this.enable) {
      return;
    }

    this.hide();
    return false;
  }

  draw() {
    if (!this.enable) {
      return;
    }

    if (this.showAnime.isPlay) {
      this.showAnime.draw();
    } else if (this.hideAnime.isPlay) {
      this.hideAnime.draw();
    } else {
      this.coreDraw(1);
    }
  }

  coreDraw(alphaRate) {
    let size = getTextSize();
    background(COLOR_MAIN);
    textSize(size);
    noStroke();
    let c = color(COLOR_BASE);
    c.setAlpha(255 * alphaRate);
    fill(c);
    text("Game Set", windowWidth / 2, windowHeight / 2 - size);
    stroke(c);
    strokeWeight(8);

    if (this.player == Player.First) {
      c = color(COLOR_FIRST);
      c.setAlpha(255 * alphaRate);
      fill(c);
      text(`Win : Red`, windowWidth / 2, windowHeight / 2 + size);
    } else {
      c = color(COLOR_SECOND);
      c.setAlpha(255 * alphaRate);
      fill(c);
      text(`Win : Blue`, windowWidth / 2, windowHeight / 2 + size);
    }
  }

}

class TurnModerator extends EventEmitter {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.player = Player.First;
    this.actionCount = 1;
    this.canPutField = Player.First;
  }

  action() {
    this.actionCount -= 1;

    if (this.actionCount <= 0) {
      this.toggleTurn();
    }
  }

  addComboCount(count) {
    if (count === 0) {
      return;
    }

    this.actionCount += count;
    this.toggleField();
  }

  toggleField() {
    this.canPutField = this.canPutField === Player.First ? Player.Second : Player.First;
    this.emit(TurnEvent.ToggleField);
  }

  toggleTurn() {
    this.player = this.player === Player.First ? Player.Second : Player.First;
    this.actionCount = 1;

    if (this.canPutField !== this.player) {
      this.canPutField = this.player;
      this.emit(TurnEvent.ToggleField);
    }

    this.emit(TurnEvent.ToggleTurn);
  }

}

class GameModerator {
  // state
  constructor(firstField, secondField, gameSetScene) {
    _defineProperty(this, "gameState", GameState.Play);

    this.firstField = firstField;
    this.secondField = secondField;
    this.gameSetScene = gameSetScene;
  }

  init() {
    scroller.init();
    turnModerator.init();
    this.gameSetScene.init();
    this.secondField.init();
    this.firstField.init();
  }

  gameSet(tokens) {
    let hue = head(tokens).player === Player.First ? COLOR_FIRST_LASER : COLOR_SECOND_LASER;
    let slashAnime = new Anime(frame => {
      let strength;
      let lineFunc = makeLineFunction(head(tokens).centerX + scroller.x, head(tokens).centerY + scroller.y, tail(tokens).centerX + scroller.x, tail(tokens).centerY + scroller.y);

      if (frame <= 4) {
        strength = frame / 4;
        const [x1, y1] = lineFunc(0);
        const [x2, y2] = lineFunc(windowWidth * strength);
        laserLine(x1, y1, x2, y2, hue);
      } else if (frame <= 34) {
        if (frame === 5) sound.play("laser");
        const [x1, y1] = lineFunc(0);
        const [x2, y2] = lineFunc(windowWidth);
        laserLine(x1, y1, x2, y2, hue);
      } else if (frame <= 84) {
        if (frame === 38) sound.play("gameset");
        strength = (frame - 34) / (84 - 34);
        const [x1, y1] = lineFunc(0);
        const [x2, y2] = lineFunc(windowWidth);
        const maxWeight = max([windowWidth, windowHeight]) * 2.5;
        laserLine(x1, y1, x2, y2, hue, maxWeight * strength);
      } else if (frame <= 94) {
        const [x1, y1] = lineFunc(0);
        const [x2, y2] = lineFunc(windowWidth);
        const maxWeight = max([windowWidth, windowHeight]) * 2.5;
        laserLine(x1, y1, x2, y2, hue, maxWeight);
      } else {
        return true;
      }
    });
    animeViews.add(slashAnime);
    slashAnime.on(AnimeEvent.Done, () => {
      this.firstField.enable = false;
      this.secondField.enable = false;
      this.gameSetScene.show(head(tokens).player);
    });
    let animes = tokens.map(t => t.blinkAnime);
    animes.push(slashAnime);
    Anime.playParallel(animes, COMBO_ANIME_DELAY);
  }

}

function judgeGameSet(player, column, row, field) {
  let lines = field.getComboLines(column, row, GAME_SET_CHAIN_SIZE);

  for (let tokens of lines) {
    let result = getComboTokens(player, tokens, GAME_SET_CHAIN_SIZE);

    if (0 < result.length) {
      return result;
    }
  }

  return [];
}

function getCombos(player, column, row, field) {
  // Combos do not occur on enemy fields.
  if (turnModerator.player !== turnModerator.canPutField) {
    return [];
  }

  let result = [];
  let lines = field.getComboLines(column, row, COMBO_SIZE + 1);

  for (let tokens of lines) {
    // If a combo has already occurred, it will not be counted.
    // It exists only at the terminal.
    let terminal = tokens.slice(0, COMBO_SIZE + 1);

    if (isCombo(player, terminal, COMBO_SIZE + 1)) {
      tokens = tokens.slice(COMBO_SIZE);
    }

    terminal = tokens.slice(-(COMBO_SIZE + 1));

    if (isCombo(player, terminal, COMBO_SIZE + 1)) {
      tokens = tokens.slice(0, -COMBO_SIZE);
    }

    let comboTokens = getComboTokens(player, tokens, COMBO_SIZE);

    if (0 < comboTokens.length) {
      result.push(comboTokens);
    }
  }

  return result;
}

function getComboTokens(player, tokens, size) {
  let result = [];

  for (let token of tokens) {
    if (token === undefined) {
      result = [];
      continue;
    }

    if (token.player === player) {
      result.push(token);
    } else {
      result = [];
    }

    if (size <= result.length) {
      return result;
    }
  }

  return [];
}

function isCombo(player, tokens, size) {
  return 0 < getComboTokens(player, tokens, size).length;
}

const slashAnimeHandler = (frame, params) => {
  if (frame === 1) {
    sound.play("laser");
  }

  let strength;
  let lineFunc = makeLineFunction(params.x1 + scroller.x, params.y1 + scroller.y, params.x2 + scroller.x, params.y2 + scroller.y);

  if (frame <= 4) {
    strength = frame / 4;
    const [x1, y1] = lineFunc(0);
    const [x2, y2] = lineFunc(windowWidth * strength);
    laserLine(x1, y1, x2, y2, params.hue);
  } else if (frame <= 64) {
    const [x1, y1] = lineFunc(0);
    const [x2, y2] = lineFunc(windowWidth);
    laserLine(x1, y1, x2, y2, params.hue);
  } else if (frame <= 68) {
    strength = (frame - 64) / (68 - 64);
    const [x1, y1] = lineFunc(windowWidth * strength);
    const [x2, y2] = lineFunc(windowWidth);
    laserLine(x1, y1, x2, y2, params.hue);
  } else {
    return true;
  }
}; // Create a function of a straight line passing through two points.
// The created function returns [x, y] when passed x.
// (auxiliary variable)


function makeLineFunction(x1, y1, x2, y2) {
  if (x1 === x2) {
    // When x1 and x2 are the same, they cannot be represented by "y = ax + b".
    return x => [x1, windowHeight * x / windowHeight];
  }

  return x => [x, (y2 - y1) * (x - x1) / (x2 - x1) + y1];
}

function betweenLine(x1, y1, x2, y2, offset) {
  if (x1 === x2) {
    line(x1 + offset, y1, x2 + offset, y2);
    line(x1 - offset, y1, x2 - offset, y2);
  } else {
    line(x1, y1 + offset, x2, y2 + offset);
    line(x1, y1 - offset, x2, y2 - offset);
  }
}

function laserLine(x1, y1, x2, y2, hue, coreWeight = undefined) {
  const rates = [5, 2, 6, 6];
  const totalRate = rates.reduce((value, total) => total + value);
  const totalWeight = coreWeight === undefined ? TOKEN_SIZE : coreWeight * totalRate / rates[0];
  const weights = rates.map(rate => totalWeight * rate / totalRate / 2);
  let offset = weights[0] / 2;
  stroke(`hsl(${hue}, 100%, 100%)`);
  strokeWeight(weights[0]);
  betweenLine(x1, y1, x2, y2, offset);
  offset += weights[0] / 2 + weights[1] / 2;
  stroke(`hsl(${hue}, 100%, 50%)`);
  strokeWeight(weights[1]);
  betweenLine(x1, y1, x2, y2, offset);
  offset += weights[1] / 2 + weights[2] / 2;
  stroke(`hsla(${hue}, 100%, 50%, 0.5)`);
  strokeWeight(weights[2]);
  betweenLine(x1, y1, x2, y2, offset);
  offset += weights[2] / 2 + weights[3] / 2;
  stroke(`hsla(${hue}, 100%, 50%, 0.2)`);
  strokeWeight(weights[3]);
  betweenLine(x1, y1, x2, y2, offset);
}

function comboAnimate(tokens) {
  if (tokens.length < 2) {
    never(`You need at least two tokens. size: ${tokens.length}`);
  }

  let animes = tokens.map(t => t.blinkAnime);
  let tailTokenAnime = tail(animes);
  let slashAnime = new Anime(slashAnimeHandler, {
    x1: head(tokens).centerX,
    y1: head(tokens).centerY,
    x2: tail(tokens).centerX,
    y2: tail(tokens).centerY,
    hue: head(tokens).player === Player.First ? COLOR_FIRST_LASER : COLOR_SECOND_LASER
  });
  animeViews.add(slashAnime);
  animes.push(slashAnime);
  Anime.playParallel(animes, COMBO_ANIME_DELAY);
  return tailTokenAnime;
}

function chainComboAnimate(combos) {
  if (combos.length === 0) {
    return;
  } else if (combos.length === 1) {
    comboAnimate(head(combos));
  } else {
    let anime = comboAnimate(head(combos));
    anime.onOnce(AnimeEvent.Done, () => {
      chainComboAnimate(rest(combos));
    });
  }
}

function getTextSize() {
  return floor(min([windowWidth, windowHeight]) / 5);
}

function eventPropagate(eventName, gameObjects) {
  for (let i of gameObjects) {
    let isPropagate = tryCall(i, eventName);

    if (isPropagate === false) {
      return false;
    }
  }
}

function tryCall(object, method_name, ...args) {
  if (object === undefined) {
    return undefined;
  }

  if (object[method_name] instanceof Function) {
    return object[method_name](...args);
  }

  return undefined;
} // function devError(msg: string) {
//   // @ts-ignore
//   if (process.env.NODE_ENV === "production") {
//     console.error(msg)
//   } else {
//     throw new Error(msg)
//   }
// }


function range(min, max, step = 1) {
  let result = [];

  for (let i = 0; i <= max - min; i += step) {
    result.push(min + i);
  }

  return result;
}

function easeInOutQuad(t) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
}

function head(array) {
  return array[0];
}

function rest(array) {
  return array.slice(1);
}

function tail(array) {
  return array[array.length - 1];
}

function never(message = "It cannot be reached.") {
  throw new Error(message);
}

function print(...args) {
  console.log(...args);
} // ---------------------------------------------------
// Define the main processing of the game.
// ---------------------------------------------------


let views = [];
let turnModerator = new TurnModerator();
let scroller = new Scroller();
let animeViews = new AnimeViews();
let delayer = new Delayer();
let sound = new Sound();
let i18n = new I18n();

window.setup = function () {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textFont(TEXT_FONT);
  frameRate(FRAME_RATE);
  let gameSetScene = new GameSetScene();
  let firstField = new FirstField();
  let secondField = new SecondField();
  let gameModerator = new GameModerator(firstField, secondField, gameSetScene);
  gameModerator.init();
  firstField.on(GameStateEvent.GameSet, tokens => {
    gameModerator.gameSet(tokens);
  });
  secondField.on(GameStateEvent.GameSet, tokens => {
    gameModerator.gameSet(tokens);
  });
  gameSetScene.on(GameStateEvent.Init, () => {
    gameModerator.init();
  });
  sound.setup();
  views.push(firstField);
  views.push(secondField);
  views.push(animeViews);
  views.push(gameSetScene);
};

window.draw = function () {
  clear();
  background(COLOR_BASE);
  eventPropagate("draw", views);
  delayer.check();
};

window.mouseClicked = function () {
  return eventPropagate("mouseClicked", views.reverse());
};

window.touchStarted = function () {
  scroller.touchStarted();
};

window.touchMoved = function () {
  scroller.touchMoved();
  return false;
};

window.touchEnded = function () {
  scroller.touchEnded();
};

window.windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
  return eventPropagate("windowResized", views);
};
},{"./i18nText":"5fd50d5e400ac2cccd2d4439e6df089d"}],"5fd50d5e400ac2cccd2d4439e6df089d":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  me: {
    ja: "私",
    en: "me",
    zh: "我"
  },
  you: {
    ja: "あなた",
    en: "you",
    zh: "你"
  }
};
exports.default = _default;
},{}]},{},["59e9e917ff9583ff8d2552c82d29ccb7","6a21b61466c14587a3ded1aa3b933b89"], null)

//# sourceMappingURL=front.3c67c037.js.map
