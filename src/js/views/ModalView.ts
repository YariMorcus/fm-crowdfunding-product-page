/**
 * @class ModalView
 * @description Class provides all functionality for the modal
 * @property {HTMLDialogElement} modal - the dialog element
 * @property {HTMLDialogElement | null} modalMarkup - the dialog element markup
 * @property {HTMLButtonElement} closeButton - the close button
 */
class ModalView {
  private modal = document.querySelector('#js-modal') as HTMLDialogElement;

  private modalMarkup: HTMLDialogElement | null = null;

  private closeButton = document.querySelector(
    '#js-btn-modal-close'
  ) as HTMLButtonElement;

  /**
   * Listen for click event on close button and call
   * modalCloseController when event fired
   */
  addCloseHandler(handler: Function): void {
    this.modal.addEventListener('click', e => {
      const closeButton = (<HTMLButtonElement>e.target).classList.contains(
        'btn-modal-close'
      );

      if (!closeButton) return;

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

  /**
   * Clone original modal markup with forms
   */
  cloneOriginalModalMarkup(): void {
    this.modalMarkup = this.modal.cloneNode(true) as HTMLDialogElement;
  }

  /**
   * Restore original markup so the modal with forms will be shown again
   */
  restoreOriginalModalMarkup(): void {
    this.modal.remove();

    document.body.appendChild(this.modalMarkup!);

    // Store new reference for event listeners
    this.modal = document.querySelector('#js-modal')!;
  }

  /**
   * Get new reference to close button after DOM Node deletion
   * (needed for event listeners)
   */
  restoreCloseButtonReference(): void {
    this.closeButton = document.querySelector('#js-btn-modal-close')!;
  }
}

export default new ModalView();
