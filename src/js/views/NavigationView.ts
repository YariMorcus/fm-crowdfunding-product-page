/**
 * @class NavigationView
 * @description Class provides all functionality for the mobile navigation
 * @property {HTMLButtonElement} toggleButton - the toggle button
 * @property {HTMLUListElement} menu - the navigation menu
 */
class NavigationView {
  private readonly toggleButton = document.querySelector(
    '#js-navbar-toggle'
  ) as HTMLButtonElement;

  private readonly menu = document.querySelector('#js-nav') as HTMLUListElement;

  /**
   * Listen for click event on toggle button and call
   * navigationController when event fired
   */
  addHandlerClick(handler: Function) {
    this.toggleButton.addEventListener('click', () => {
      this.toggleButton.classList.toggle('is-active');

      handler();
    });
  }

  /**
   * Toggle the aria-expanded attr. to improve accessibility
   */
  toggleAriaExpanded(): void {
    // Retrieve current aria expanded value and convert to boolean
    const expanded = this.toggleButton.getAttribute('aria-expanded');
    let expandedBool = expanded === 'false';

    // Update DOM
    this.toggleButton.setAttribute('aria-expanded', `${expandedBool}`);
  }

  /**
   * Toggle the menu when clicked (open/close)
   */
  toggleMenu(): void {
    this.menu.classList.toggle('is-expanded');
  }
}

export default new NavigationView();
