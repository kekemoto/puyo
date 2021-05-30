import "p5/global"

declare global {
  interface Window {
    // p5.js
    setup: Function
    draw: Function
    mouseClicked: Function
    windowResized: Function
  }
}
