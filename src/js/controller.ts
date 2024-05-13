import model from './model';
import AboutView from './views/AboutView';
import HTMLRootView from './views/HTMLRootView';
import HeaderView from './views/HeaderView';
import ModalFormView from './views/ModalFormView';
import ModalThanksView from './views/ModalThanksView';
import ModalView from './views/ModalView';
import NavigationView from './views/NavigationView';
import StatisticsView from './views/StatisticsView';

/**
 * navigationController
 *
 * Provides the mobile navigation functionality
 */
const navigationController = function (): void {
  NavigationView.toggleAriaExpanded();
  NavigationView.toggleMenu();
  NavigationView.toggleOverlay();
};

/**
 * modalFormController
 *
 * Provides the form functionality in the modal
 */
const modalFormController = function (radioButtonID: string): void {
  ModalFormView.showForm(radioButtonID);

  const ACTIVE_FORM = ModalFormView.logCurrentActiveFormSection(radioButtonID);

  model.setCurrentActiveForm = ACTIVE_FORM;
};

/**
 * modalFormSubmitController
 *
 * Provides the form submit functionality in the modal which includes:
 * • Retrieving the user input
 * • Validating the user input
 * • Storing the user input
 */
const modalFormSubmitController = function (): void {
  // Retrieve value of current input

  /**
   * If there is no reward associated with
   * the pledge, render confirmation message
   */
  if (!ModalFormView.isIsPledgeWithReward(model.getCurrentActiveForm)) {
    // Update state
    model.incrementTotalBackers();

    // Render confirmation message
    ModalFormView.renderConfirmationMessage();

    // Update UI
    StatisticsView.updateTotalBackers(model.getTotalBackers);

    ModalThanksView.addClickHandler(modalCloseController);
    return;
  }

  const CURRENT_VALUE = ModalFormView.retrieveInputValue(
    model.getCurrentActiveForm
  );

  if (
    !ModalFormView.fieldEmpty(model.getCurrentActiveForm) ||
    ModalFormView.isNumberBelowConstraint(model.getCurrentActiveForm)
  )
    return;

  // Update state
  model.setCurrentTotalBacked = CURRENT_VALUE;
  model.incrementTotalBackers();

  // Render confirmation message
  ModalFormView.renderConfirmationMessage();

  // Update UI
  StatisticsView.updateTotalAmount(model.getCurrentTotalBacked);
  StatisticsView.updateTotalBackers(model.getTotalBackers);
  StatisticsView.updateProgressBar(model.getCurrentTotalBacked);

  ModalThanksView.addClickHandler(modalCloseController);
};

/**
 * modalCloseController
 *
 * Provides close modal functionality which includes:
 * • Restoring the original markup so the user will be shown
 *   the modal with the forms again
 * • Restoring all references for event listeners
 * • Restoring the event listeners themselves
 */
const modalCloseController = function (): void {
  ModalView.restoreOriginalModalMarkup();

  ModalView.closeModal();

  ModalView.restoreCloseButtonReference();

  ModalFormView.restoreParentElementReference();

  ModalFormView.restoreFormElementReference();

  ModalThanksView.restoreDialogElementReference();
};

/**
 * modalOpenController
 *
 * Provides open modal functionality which includes:
 * • Attaching the event listeners
 * • Cloning the modal markup with forms for later restoration
 */
const modalOpenController = function (): void {
  ModalView.openModal();
  ModalFormView.addRadioClickHandler(modalFormController);
  ModalFormView.addSubmitHandler(modalFormSubmitController);
  ModalView.addCloseHandler(modalCloseController);

  // Clone current modal markup with the forms
  ModalView.cloneOriginalModalMarkup();
};

/**
 * @class App
 * @description class provides all JS functionality for the application (init function)
 */
class App {
  constructor() {
    // If JS is NOT available, show navigation menu
    // by default by NOT adding .js to <html>
    HTMLRootView.indicateJSAvailable();

    // Render initial data based on state object
    StatisticsView.renderInitialData(model.setupStatisticsStateObject());

    NavigationView.addHandlerClick(navigationController);

    HeaderView.addClickHandler(modalOpenController);

    AboutView.addClickHandler(modalOpenController);
  }
}

// Init App
new App();
