import View from './View';

/**
 * @class ModalThanksView
 * @description Class adds JS functionality to the confirmation message view after form submit
 * @property {HTMLDialogElement} dialog - the dialog element
 */
class ModalThanksView extends View {
  private dialog = document.getElementById('js-modal') as HTMLDialogElement;

  /**
   * Listen for click event on close button and call
   * modalCloseController when event fired
   */
  addCloseHandler(handler: Function): void {
    this.dialog.addEventListener('click', e => {
      const closeButton = (<HTMLButtonElement>e.target).classList.contains(
        'btn-thank-you'
      );

      if (!closeButton) return;

      handler(true);
    });
  }

  /**
   * Get new reference to dialog element after DOM Node deletion
   * (needed for event listeners)
   */
  restoreDialogElementReference() {
    this.dialog = document.getElementById('js-modal') as HTMLDialogElement;
  }
}

export default new ModalThanksView();
