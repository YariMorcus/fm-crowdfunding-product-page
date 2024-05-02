/**
 * @class ModalView
 * @description Class provides all functionality for the modal
 * @property {HTMLDialogElement} modal - the dialog element
 * @property {HTMLButtonElement} closeButton - the close button
 */
class ModalView {
  private readonly modal = document.querySelector(
    '#js-modal'
  ) as HTMLDialogElement;

  private readonly closeButton = document.querySelector(
    '#js-btn-modal-close'
  ) as HTMLButtonElement;

  /**
   * Listen for click event on close button and call
   * modalCloseController when event fired
   */
  addCloseHandler(handler: Function): void {
    this.closeButton.addEventListener('click', e => {
      e.stopImmediatePropagation();
      handler();
    });
  }

  /**
   * Button clicked? Open modal
   */
  openModal(): void {
    this.modal.showModal();
  }

  /**
   * Close button clicked? Close modal
   */
  closeModal(): void {
    this.modal.close();
  }
}

export default new ModalView();
