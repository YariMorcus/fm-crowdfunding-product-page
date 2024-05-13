// Interface represents formState object
interface formState {
  currentActiveForm: string;
}

/**
 * @class Model
 * @class Class contains the data and business logic
 * @property {object} state - the data
 */
class Model {
  private state = {
    form: {} as formState,
    MBMR: {
      // Mastercraft Bamboo Monitor Riser (project name)
      totalBacked: 89_914,
      totalBackers: 5_007,
      daysLeft: 56,
      bookmarked: false,
    } as projectState,
  };

  /**
   * Setup the statistics state object for initial rendering
   *
   * @returns {projectState} - the project state object
   */
  setupStatisticsStateObject(): projectState {
    return {
      totalBacked: this.getCurrentTotalBacked,
      totalBackers: this.getTotalBackers,
      daysLeft: this.getDaysLeft,
    };
  }

  /**
   * Store which form is currently active.
   * @param {string} currentFormID - the ID of the current form (id HTML attr. value)
   */
  set setCurrentActiveForm(currentFormID: string) {
    if (typeof currentFormID === 'string' && currentFormID.trim().length > 0) {
      this.state.form.currentActiveForm = currentFormID;
    }
  }

  /**
   * Get current active form
   * @returns {string} - the current active form ID (id HTML attr. value)
   */
  get getCurrentActiveForm(): string {
    return this.state.form.currentActiveForm;
  }

  /**
   * Update current total backed value
   * @param {number} userInput - the backed value that it should be incremented with
   */
  set setCurrentTotalBacked(userInput: number) {
    this.state.MBMR.totalBacked += userInput;
  }

  /**
   * Get current total backed value
   * @returns {number} - the current backed value
   */
  get getCurrentTotalBacked(): number {
    return this.state.MBMR.totalBacked;
  }

  /**
   * Increment total backers by one
   */
  incrementTotalBackers(): void {
    ++this.state.MBMR.totalBackers;
  }

  /**
   * Get current total backers
   * @returns {number} - the total amount of backers of this project
   */
  get getTotalBackers(): number {
    return this.state.MBMR.totalBackers;
  }

  /**
   * Get days left
   *
   * @returns {number} - the number of days left
   */
  get getDaysLeft(): number {
    return this.state.MBMR.daysLeft;
  }

  /**
   * Save bookmarked state
   */
  setBookmarkState() {
    this.state.MBMR.bookmarked = this.state.MBMR.bookmarked ? false : true;
  }
}

export default new Model();
