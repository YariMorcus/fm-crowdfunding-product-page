import View from './View';
/**
 * @class StatisticsView
 * @description Class adds JS functionality for the statistics view
 * @property {HTMLDialogElement} statistics - the statistics container
 * @property {HTMLDataElement} statisticsTotalBacked - the statistics total backed number
 * @property {HTMLDataElement} statisticsTotalBackers - the statistics total backers number
 * @property {HTMLTimeElement} statisticsDaysLeftDateTime - the statistics days left time element
 * @property {HTMLSpanElement} statisticsDaysLeftUI - the statistics days left number UI
 * @property {HTMLProgressElement} statisticsProgressBar - the progress bar
 */
class StatisticsView extends View {
  private readonly statistics = document.getElementById(
    'js-statistics'
  ) as HTMLDialogElement;

  private readonly statisticsTotalBacked = this.statistics.querySelector(
    '#js-statistics__total-backed'
  ) as HTMLDataElement;

  private readonly statisticsTotalBackers = this.statistics.querySelector(
    '#js-statistics__total-backers'
  ) as HTMLDataElement;

  private readonly statisticsDaysLeftDateTime = this.statistics.querySelector(
    '#js-statistics__days-left'
  ) as HTMLTimeElement;

  private readonly statisticsDaysLeftUI = this.statistics.querySelector(
    '#js-statistics__days-left-value'
  ) as HTMLSpanElement;

  private readonly statisticsProgressBar = this.statistics.querySelector(
    '#js-statistics__progress-total-backed'
  ) as HTMLProgressElement;

  /**
   * Render initial data
   *
   * @param {object} projectStatisticsState - contains total backed, backers and days left
   */
  renderInitialData(projectStatisticsState: projectState): void {
    this.updateTotalAmount(projectStatisticsState.totalBacked);
    this.updateTotalBackers(projectStatisticsState.totalBackers);
    this.updateDaysLeft(projectStatisticsState.daysLeft);
  }

  /**
   * Update total amount
   *
   * @param {number} totalBacked - the current total backed value
   */
  updateTotalAmount(totalBacked: number): void {
    this.statisticsTotalBacked.textContent = this.#formatCurrency(totalBacked);
    this.statisticsTotalBacked.value =
      this.#formatCurrency(totalBacked).slice(2);
  }

  /**
   * Update total backers
   * @param {number} totalBackers - the current total of backers
   */
  updateTotalBackers(totalBackers: number): void {
    this.statisticsTotalBackers.textContent = this.#formatNumber(totalBackers);
    this.statisticsTotalBackers.value = `${totalBackers}`;
  }

  /**
   * Update days left
   *
   * @param {number} daysLeft - days left until end of crowdfunding
   */
  updateDaysLeft(daysLeft: number): void {
    const finalDate = this.#addDays(new Date(), daysLeft);

    this.statisticsDaysLeftDateTime.dateTime =
      this.#setupDateTimeAttributeValue(finalDate);
    this.statisticsDaysLeftUI.textContent = `${daysLeft}`;
  }

  /**
   * Update progress bar
   *
   * @param {number} totalBacked - the current total backed value
   */
  updateProgressBar(totalBacked: number): void {
    this.statisticsProgressBar.value = totalBacked;

    this.statisticsProgressBar.textContent = this.#formatCurrency(totalBacked);
  }

  /**
   * Format given number to currency based on system locale (browser locale of user)
   * @param {number} number - the number to format
   * @returns {string} - the formatted number in currency format
   */
  #formatCurrency(number: number): string {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(number);
  }

  /**
   * Format given number with decimal points
   *
   * @param {number} number - the number to format
   * @returns {string} - the formatted number with decimal points
   */
  #formatNumber(number: number): string {
    return new Intl.NumberFormat().format(number);
  }

  /**
   * Calculate new date based on given date
   *
   * @param {Date} theDate - the date
   * @param {number} days - the days to add to the given date
   * @return {Date} - the final date
   */
  #addDays(theDate: Date, days: number): Date {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }

  /**
   * @param {Date} date - the date
   * @returns {string} - the formatted date string for the datetime attr. (2024-05-08 e.g.)
   */
  #setupDateTimeAttributeValue(date: Date): string {
    const datetimeYear = date.getFullYear();

    // Prefix with zero if necessary (otherwise invalid format)
    const datetimeMonth = `0${date.getMonth() + 1}`.slice(-2);
    const datetimeDays = `0${date.getDate()}`.slice(-2);

    return `${datetimeYear}-${datetimeMonth}-${datetimeDays}`;
  }
}

export default new StatisticsView();
