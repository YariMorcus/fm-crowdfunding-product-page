import AboutView from './views/AboutView';
import HTMLRootView from './views/HTMLRootView';
import HeaderView from './views/HeaderView';
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
  }
}

// Init App
new App();
