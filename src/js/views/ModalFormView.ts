/**
 * @class ModalFormView
 * @description Class provides all functionality for modal form
 * @property {HTMLFormElement} form - the form element within the modal
 */
class ModalFormView {
  private readonly form = document.querySelector(
    '#js-pledge-form'
  ) as HTMLFormElement;

  /**
   * Listen for click event on radio button and call
   * modalFormController when event fired
   */
  addRadioClickHandler(handler: Function) {
    this.form.addEventListener('click', e => {
      const radioButton = (<HTMLElement>e.target).classList.contains(
        'pledge-form__radio-button'
      );

      if (!radioButton) return;

      const radioButtonID = (<HTMLElement>e.target).id;

      handler(radioButtonID);
    });
  }

  /**
   * Show the corresponding form based on the currently checked radio button
   * @param {string} radioButtonID - the ID of the radio button
   */
  showForm(radioButtonID: string): void {
    const RADIO_BUTTON_EL = document.getElementById(
      radioButtonID
    ) as HTMLElement;

    const FORM_SECTION = RADIO_BUTTON_EL.closest(
      '.pledge-form__section'
    ) as HTMLElement;

    FORM_SECTION.classList.add('is-active');
  }
}

export default new ModalFormView();
