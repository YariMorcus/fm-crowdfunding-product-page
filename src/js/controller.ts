import model from './model';
import AboutView from './views/AboutView';
import HTMLRootView from './views/HTMLRootView';
import HeaderView from './views/HeaderView';
import ModalFormView from './views/ModalFormView';
import ModalView from './views/ModalView';
import NavigationView from './views/NavigationView';

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
  const CURRENT_VALUE = ModalFormView.retrieveInputValue(
    model.getCurrentActiveForm
  );

  if (
    !ModalFormView.fieldEmpty(model.getCurrentActiveForm) ||
    ModalFormView.isNumberBelowConstraint(model.getCurrentActiveForm)
  )
    return;

  // Save pledge input
  model.setCurrentTotalBacked = CURRENT_VALUE;

  // Render confirmation message
  ModalFormView.renderConfirmationMessage();
};

/**
 * modalCloseController
 *
 * Provides close modal functionality
 */
const modalCloseController = function (): void {
  ModalView.closeModal();
};

/**
 * modalOpenController
 *
 * Provides open modal functionality
 */
const modalOpenController = function (): void {
  ModalView.openModal();
  ModalView.addCloseHandler(modalCloseController);
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

    NavigationView.addHandlerClick(navigationController);

    HeaderView.addClickHandler(modalOpenController);

    AboutView.addClickHandler(modalOpenController);

    ModalFormView.addRadioClickHandler(modalFormController);

    ModalFormView.addSubmitHandler(modalFormSubmitController);
  }
}

// Init App
new App();
