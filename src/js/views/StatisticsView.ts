import View from './View';

/**
 * @class StatisticsView
 * @description Class adds JS functionality for the statistics view
 * @property {HTMLDialogElement} statistics - the statistics container
 * @property {HTMLProgressElement} statisticsProgressBar - the progress bar
 */
class StatisticsView extends View {
  private readonly statistics = document.getElementById(
    'js-statistics'
  ) as HTMLDialogElement;

  private readonly statisticsProgressBar = this.statistics.querySelector(
    '#js-statistics__progress-total-backed'
  ) as HTMLProgressElement;

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
}

export default new StatisticsView();
