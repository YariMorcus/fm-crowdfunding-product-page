import View from './View';

/**
 * @class ModalFormView
 * @description Class provides all functionality for modal form
 * @property {HTMLDialogElement} _parentEl - the modal itself
 * @property {HTMLFormElement} form - the form element within the modal
 * @property {string | null} previousActiveFormSectionID - the previously active form section
 */
class ModalFormView extends View {
  protected _parentEl = document.querySelector(
    '#js-modal'
  ) as HTMLDialogElement;

  private form = document.querySelector('#js-pledge-form') as HTMLFormElement;

  private previousActiveFormSectionID: string | null = null;

  /**
   * Listen for click event on radio button and call
   * modalFormController when event fired
   */
  addRadioClickHandler(handler: Function): void {
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
  addSubmitHandler(handler: Function): void {
    this.form.addEventListener('submit', e => {
      e.stopImmediatePropagation();
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

    /**
     * Form active? Hide it first before showing
     * the new form
     */

    if (this.previousActiveFormSectionID) this.#hideForm();

    // Show form if a reward is applicable
    FORM_SECTION.classList.add('is-active');

    // Indicate that form field is required
    this.#toggleRequiredField(FORM_SECTION);
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
   * Check if form field is empty
   *
   * @param {string} activeFormID - the current active form ID (id HTML attr. value)
   * @returns {boolean} - true if empty, false otherwise
   */
  fieldEmpty(activeFormID: string): boolean {
    const INPUT_FIELD = document
      .getElementById(activeFormID)
      ?.querySelector('input[type="number"') as HTMLInputElement;

    return INPUT_FIELD.validity.valueMissing ? false : true;
  }

  /**
   * Check if number is below constraint
   *
   * @param {string} activeFormID - the current active form ID (id HTML attr. value)
   * @returns {boolean} - true if number below minimum, false otherwise
   */
  isNumberBelowConstraint(activeFormID: string): boolean {
    const INPUT_FIELD = document
      .getElementById(activeFormID)
      ?.querySelector('input[type="number"') as HTMLInputElement;

    return INPUT_FIELD.validity.rangeUnderflow ? true : false;
  }

  /**
   * Check if there is a reward associated with the pledge
   *
   * @param {string} activeFormID - the current active form ID (id HTML attr. value)
   * @returns {boolean} false if there is NO reward associated with the pledge, true otherwise
   */
  isIsPledgeWithReward(activeFormID: string): boolean {
    const FORM_SECTION = document.getElementById(
      activeFormID
    ) as HTMLFieldSetElement;

    if (FORM_SECTION.classList.contains('pledge-form__section--no-reward'))
      return false;

    return true;
  }

  /**
   * Get new reference to parent element after DOM Node deletion
   * (needed for event listeners)
   */
  restoreParentElementReference(): void {
    this._parentEl = document.querySelector('#js-modal')!;
  }

  /**
   * Get new reference to form element after DOM Node deletion
   * (needed for event listeners)
   */
  restoreFormElementReference(): void {
    this.form = document.querySelector('#js-pledge-form')!;
  }

  /**
   * Hide the currently active form in the modal
   */
  #hideForm(): void {
    const PREVIOUS_ACTIVE_FORM_SECTION = document.getElementById(
      this.previousActiveFormSectionID!
    ) as HTMLFieldSetElement;

    PREVIOUS_ACTIVE_FORM_SECTION.classList.remove('is-active');

    /**
     * Remove required HTML attr. of input element
     * to prevent an error that prevents the user
     * from submitting the form
     */
    PREVIOUS_ACTIVE_FORM_SECTION.querySelector(
      'input[type="number"]'
    )?.removeAttribute('required');
  }

  /**
   * Toggle required HTML attr. for pledge input field
   * @param {HTMLElement} formSection - the current OR previous form section
   */
  #toggleRequiredField(formSection: HTMLElement): void {
    formSection
      .querySelector('input[type="number"]')
      ?.setAttribute('required', '');
  }
}

export default new ModalFormView();
