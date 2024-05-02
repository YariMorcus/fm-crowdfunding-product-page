/**
 * @class ModalView
 * @description Class provides all functionality for the modal
 * @property {HTMLDialogElement} modal - the dialog element
 */
class ModalView {
  private readonly modal = document.querySelector(
    '#js-modal'
  ) as HTMLDialogElement;

  /**
   * Button clicked? Open modal
   */
  openModal(): void {
    this.modal.showModal();
  }
}

export default new ModalView();
