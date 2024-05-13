/*
 * File contains global interfaces
 * that are used across multiple files
 */

/*
 * Model related
 */

// Interface represents projectState object
interface projectState {
  totalBacked: number;
  totalBackers: number;
  daysLeft: number;
  bookmarked?: boolean;
}
