/**
 * @class View - The parent view
 * @description Class contains all common properties and methods of all the child views
 * @property {HTMLElement | null} _parentEl - the parent element
 */
export default class View {
  protected readonly _parentEl: HTMLElement | null = null;

  /**
   * Clear the parent element BEFORE inserting dynamic content
   */
  protected _clear(): void {
    (this._parentEl as HTMLElement).innerHTML = '';
  }

  /**
   * Serves as a helper function to set multiple attributes on the given element
   * @param {HTMLElement} el - the HTML element
   * @param {object} attrsObj - object that contains all attributes to be added
   */
  protected _setAttributes(el: HTMLElement, attrsObj: object): void {
    Object.keys(attrsObj).forEach(attrName =>
      el.setAttribute(attrName, attrsObj[attrName as keyof typeof attrsObj])
    );
  }
}
