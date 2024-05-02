/**
 * @class AboutView
 * @description Class adds necessary JS functionality to open modal
 * @property {HTMLElement} aboutSection - About this project section
 */
class AboutView {
  private readonly aboutSection = document.querySelector(
    '.project'
  ) as HTMLElement;

  /**
   * Listen for click event on reward buttons
   * and call modalController when event fired
   */
  addClickHandler(handler: Function): void {
    this.aboutSection.addEventListener('click', e => {
      const rewardButton = (<HTMLElement>e.target).classList.contains(
        'btn--reward'
      );

      if (!rewardButton) return;

      handler();
    });
  }
}

export default new AboutView();
