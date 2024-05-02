/**
 * @class HeaderView
 * @description Class adds necessary JS functionality to open modal
 * @property {HTMLButtonElement} backThisProjectButton - Back this project button
 */
class HeaderView {
  private readonly backThisProjectButton = document.querySelector(
    '#js-btn--back-this-project'
  ) as HTMLButtonElement;

  /**
   * Listen for click event on back this project button
   * and call modalController when event fired
   */
  addClickHandler(handler: Function): void {
    this.backThisProjectButton.addEventListener('click', () => {
      handler();
    });
  }
}

export default new HeaderView();
