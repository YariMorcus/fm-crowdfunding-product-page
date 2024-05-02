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

const modalController = function (): void {
  ModalView.openModal();
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

    HeaderView.addClickHandler(modalController);
    AboutView.addClickHandler(modalController);
  }
}

// Init App
new App();
