import NavigationView from './views/NavigationView';

/**
 * navigationController
 *
 * Provides the mobile navigation functionality
 */
const navigationController = function (): void {
  NavigationView.toggleAriaExpanded();
  NavigationView.toggleMenu();
};

/**
 * @class App
 * @description class provides all JS functionality for the application (init function)
 */
class App {
  constructor() {
    // TODO add line underneath to view later on
    document.documentElement.classList.add('js');

    NavigationView.addHandlerClick(navigationController);
  }
}

// Init App
new App();
