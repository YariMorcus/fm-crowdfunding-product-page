/**
 * @class HTMLRootView
 * @description Class is only used to indicate that JavaScript is available
 * @property {HTMLHtmlElement} rootEl - the root element (html tag)
 */
class HTMLRootView {
  private readonly rootEl = document.querySelector('html') as HTMLHtmlElement;

  /**
   * Indicate JS availability
   */
  indicateJSAvailable(): void {
    this.rootEl.classList.add('js');
  }
}

export default new HTMLRootView();
