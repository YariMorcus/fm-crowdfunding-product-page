import iconCheck from '../../img/icon-check.svg';
import View from './View';

/**
 * @class ModalThanksView
 * @description Class adds JS functionality to the confirmation message view after form submit
 * @property {HTMLDialogElement} _parentEl - the dialog element
 * @property {string} successHeadingText - the heading text after submit
 * @property {string} successParagraphText - the paragraph text after submit
 * @property {string} successButtonText - the button text after submit
 * @property {string} successButtonAriaLabelText - the aria-label text after submit
 */
class ModalThanksView extends View {
  protected _parentEl = document.getElementById(
    'js-modal'
  ) as HTMLDialogElement;

  // Texts related to success message after form submit
  private readonly successHeadingText = 'Thanks for your support!';
  private readonly successParagraphText =
    'Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get an email once our campaign is completed.';
  private readonly successButtonText = 'Got it!';
  private readonly successButtonAriaLabelText = 'Close modal';

  /**
   * Listen for click event on close button and call
   * modalCloseController when event fired
   */
  addCloseHandler(handler: Function): void {
    this._parentEl.addEventListener('click', e => {
      const closeButton = (<HTMLButtonElement>e.target).classList.contains(
        'btn-thank-you'
      );

      if (!closeButton) return;

      handler(true);
    });
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
      id: 'js-thank-you__btn',
      class: 'btn btn--primary btn-thank-you',
      'aria-label': this.successButtonAriaLabelText,
    });

    BUTTON.append(BUTTON_TEXT_NODE);

    return BUTTON;
  }

  /**
   * Get new reference to dialog element after DOM Node deletion
   * (needed for event listeners)
   */
  restoreDialogElementReference() {
    this._parentEl = document.getElementById('js-modal') as HTMLDialogElement;
  }
}

export default new ModalThanksView();
