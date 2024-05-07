import iconCheck from '../../img/icon-check.svg';
import View from './View';

/**
 * @class ModalFormView
 * @description Class provides all functionality for modal form
 * @property {HTMLDialogElement} dialog - the modal itself
 * @property {HTMLFormElement} form - the form element within the modal
 * @property {string | null} previousActiveFormSectionID - the previously active form section
 * @property {string} successHeadingText - the heading text after submit
 * @property {string} successParagraphText - the paragraph text after submit
 * @property {string} successButtonText - the button text after submit
 * @property {string} successButtonAriaLabelText - the aria-label text after submit
 */
class ModalFormView extends View {
  protected readonly _parentEl = document.querySelector(
    '#js-modal'
  ) as HTMLDialogElement;

  private readonly form = document.querySelector(
    '#js-pledge-form'
  ) as HTMLFormElement;

  private previousActiveFormSectionID: string | null = null;

  // Texts related to success message after form submit
  private readonly successHeadingText = 'Thanks for your support!';
  private readonly successParagraphText =
    'Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get an email once our campaign is completed.';
  private readonly successButtonText = 'Got it!';
  private readonly successButtonAriaLabelText = 'Close modal';
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
   * Render the confirmation message after submit
   */
  renderConfirmationMessage(): void {
    // Clear parent element
    this._clear();

    // Add class to dialog element for scoping specific styles
    this._parentEl.classList.add('modal-thank-you');

    // Insert markup in DOM
    this.#createConfirmationMarkup();
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
   * @param {HTMLElement} formSection - the form section associated with the selected radio button
   * @returns {boolean} false if there is NO reward associated with the pledge, true otherwise
   */
  #isIsPledgeWithReward(formSection: HTMLElement): boolean {
    if (formSection.classList.contains('pledge-form__section--no-reward'))
      return false;

    return true;
  }

  /**
   * Create success icon img element (submitted form)
   * @returns {HTMLImageElement} - the image element
   */
  #createSuccessIconElement(): HTMLImageElement {
    const IMG = document.createElement('img');

    this._setAttributes(IMG, {
      class: 'modal-thank-you__icon-check',
      src: iconCheck,
      alt: '',
      width: 64,
      height: 64,
    });

    return IMG;
  }

  /**
   * Create success HTML heading element (submitted form)
   * @returns {HTMLHeadingElement} - the heading element
   */
  #createSuccessHeadingElement(): HTMLHeadingElement {
    const H2 = document.createElement('h2');
    const H2_TEXT_NODE = document.createTextNode(this.successHeadingText);

    H2.classList.add('modal-thank-you__title');

    H2.append(H2_TEXT_NODE);

    return H2;
  }

  /**
   * Create success HTML paragraph element (submitted form)
   * @returns {HTMLParagraphElement} - the paragraph element
   */
  #createSuccessPElement(): HTMLParagraphElement {
    const P = document.createElement('p');
    const P_TEXT_NODE = document.createTextNode(this.successParagraphText);

    P.classList.add('modal-thank-you__paragraph');

    P.append(P_TEXT_NODE);

    return P;
  }

  /**
   * Create success close modal button element (submitted form)
   * @returns {HTMLButtonElement} - the button element
   */
  #createSuccessCloseModalButton(): HTMLButtonElement {
    const BUTTON = document.createElement('button');
    const BUTTON_TEXT_NODE = document.createTextNode(this.successButtonText);

    this._setAttributes(BUTTON, {
      class: 'btn btn--primary',
      'aria-label': this.successButtonAriaLabelText,
    });

    BUTTON.append(BUTTON_TEXT_NODE);

    return BUTTON;
  }

  /**
   * Create success HTML paragraph element (submitted form)
   * @returns {HTMLParagraphElement} - the paragraph element
   */
  #createConfirmationMarkup(): void {
    const IMG = this.#createSuccessIconElement();
    const H2 = this.#createSuccessHeadingElement();
    const P = this.#createSuccessPElement();
    const BUTTON = this.#createSuccessCloseModalButton();

    this._parentEl.append(IMG, H2, P, BUTTON);
  }
}

export default new ModalFormView();
