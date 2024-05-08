import View from './View';

/**
 * @class StatisticsView
 * @description Class adds JS functionality for the statistics view
 * @property {HTMLDialogElement} statistics - the statistics container
 * @property {HTMLDataElement} statisticsTotalBacked - the statistics total backed number
 * @property {HTMLDataElement} statisticsTotalBackers - the statistics total backers number
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

  private readonly statisticsProgressBar = this.statistics.querySelector(
    '#js-statistics__progress-total-backed'
  ) as HTMLProgressElement;

  /**
   * Update progress bar
   * TODO move method before #formatCurrency later on
   * @param {number} totalBacked - the current total backed value
   */
  updateProgressBar(totalBacked: number): void {
    this.statisticsProgressBar.value = totalBacked;

    this.statisticsProgressBar.textContent = this.#formatCurrency(totalBacked);
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
}

export default new StatisticsView();
