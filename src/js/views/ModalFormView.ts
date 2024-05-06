/**
 * @class ModalFormView
 * @description Class provides all functionality for modal form
 * @property {HTMLFormElement} form - the form element within the modal
 * @property {string | null} previousActiveFormSectionID - the previously active form section
 */
class ModalFormView {
  private readonly form = document.querySelector(
    '#js-pledge-form'
  ) as HTMLFormElement;

  private previousActiveFormSectionID: string | null = null;

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
   * Listen for submit event and call
   * modalFormSubmitController when event fired
   */
  addSubmitHandler(handler: Function) {
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      handler();
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

    /**
     * Form active? Hide it first before showing
     * the new form
     */
    if (this.previousActiveFormSectionID) this.#hideForm();

    // Show form if a reward is applicable
    FORM_SECTION.classList.add('is-active');
  }

  /**
   * Store currently active form section
   * @param {string} radioButtonId - the ID of the radio button
   */
  logCurrentActiveFormSection(radioButtonId: string): string {
    const RADIO_BUTTON_EL = document.getElementById(
      radioButtonId
    ) as HTMLElement;

    this.previousActiveFormSectionID = (<HTMLElement>(
      RADIO_BUTTON_EL.closest('.pledge-form__section')
    )).id;

    return (<HTMLElement>RADIO_BUTTON_EL.closest('.pledge-form__section')).id;
  }

  /**
   * Hide the currently active form in the modal
   */
  #hideForm(): void {
    const PREVIOUS_ACTIVE_FORM_SECTION = document.getElementById(
      this.previousActiveFormSectionID!
    ) as HTMLFieldSetElement;

    PREVIOUS_ACTIVE_FORM_SECTION.classList.remove('is-active');
  }

  /**
   * Retrieve the user input
   *
   * @param {string} activeFormID - the current active form ID (id HTML attr. value)
   * @returns {number} - the user input
   */
  retrieveInputValue(activeFormID: string): number {
    // Retrieve input value based in current active form
    const CURRENT_ACTIVE_FORM = document.getElementById(
      activeFormID
    ) as HTMLElement;

    const VALUE = (
      CURRENT_ACTIVE_FORM.querySelector(
        '.pledge-form__input'
      ) as HTMLInputElement
    ).value;

    return Number(VALUE);
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
