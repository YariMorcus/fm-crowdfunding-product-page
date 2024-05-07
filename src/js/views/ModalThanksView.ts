import View from './View';

/**
 * @class ModalThanksView
 * @description Class adds JS functionality to the confirmation message view after form submit
 * @property {HTMLDialogElement} dialog - the dialog element
 */
class ModalThanksView extends View {
  private readonly dialog = document.getElementById(
    'js-modal'
  ) as HTMLDialogElement;

  /**
   * Listen for click event on Got it button
   * and call controller when event fired
   */
  addClickHandler(handler: Function): void {
    this.dialog
      .querySelector('#js-thank-you__btn')
      ?.addEventListener('click', () => {
        handler();
      });
  }
}

export default new ModalThanksView();
