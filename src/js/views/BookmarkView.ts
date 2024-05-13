/**
 * @class BookmarkView
 * @description Class adds necessary JS for bookmark functionality
 * @property {HTMLButtonElement} bookmarkButton - the bookmark button
 * @property {HTMLSpanElement} bookmarkButtonText - the bookmark button text
 */
class BookmarkView {
  private bookmarkButton = document.querySelector(
    '#js-btn-bookmark'
  ) as HTMLButtonElement;

  private bookmarkButtonText = this.bookmarkButton.querySelector(
    '#js-btn-bookmark__text'
  ) as HTMLSpanElement;

  /**
   * Listen for click event and call
   * controller when event fired
   */
  addClickHandler(handler: Function): void {
    this.bookmarkButton.addEventListener('click', () => {
      handler();
    });
  }

  /**
   * Toggle bookmark state
   */
  toggleActivatedState(): void {
    this.bookmarkButton.classList.toggle('btn--bookmarked');

    this.bookmarkButtonText.textContent =
      this.bookmarkButtonText.textContent === 'Bookmark'
        ? 'Bookmarked'
        : 'Bookmark';
  }
}

export default new BookmarkView();
