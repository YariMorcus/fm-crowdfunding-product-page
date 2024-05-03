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

    // If there is no reward with the pledge, return early
    // (there is no form associated with this section)
    if (!this.#isIsPledgeWithReward(FORM_SECTION)) return;

    // Show form if a reward is applicable
    FORM_SECTION.classList.add('is-active');
  }

  /**
   * Check if there is a reward associated with the pledge
   *
   * @param {HTMLElement} formSection - the form section associated with the selected radio button
   * @returns {boolean} false if there is NO reward associated with the pledge, true otherwise
   */
  #isIsPledgeWithReward(formSection: HTMLElement): boolean {
    if (formSection.classList.contains('pledge-form__section--no-reward'))
      return false;

    return true;
  }
}

export default new ModalFormView();
