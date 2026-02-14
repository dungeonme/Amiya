import { Scholarship } from '../types';

/**
 * ScholarshipEngine
 * 
 * Handles the logic for:
 * 1. Computing the real-time status of a scholarship (Open, Closed, Opening Soon).
 * 2. Auto-resetting dates for recurring scholarships (e.g., if 2023 deadline passed, project to 2024/2025).
 * 3. Generating UI-friendly badges and deadline strings.
 */

export interface ComputedStatus {
  status: 'OPEN' | 'CLOSING_SOON' | 'CLOSED' | 'OPENING_SOON' | 'ANNOUNCED';
  label: string;
  colorClass: string;
  badgeClass: string;
  effectiveDeadline: string; // The projected deadline year
  daysLeft: number | null;
  isAutoRenewed: boolean;
}

export class ScholarshipEngine {

  /**
   * Main function to analyze a scholarship and return its dynamic status.
   */
  static analyze(scholarship: Scholarship): ComputedStatus {
    const now = new Date();
    const currentYear = now.getFullYear();

    // 1. Determine Effective Dates (Handle Recursion)
    let start = scholarship.startDate ? new Date(scholarship.startDate) : null;
    let end = new Date(scholarship.deadline);
    let isAutoRenewed = false;

    // If recurring and end date is in the past, project it to the current or next cycle
    if (scholarship.isRecurring && end < now) {
      isAutoRenewed = true;
      const originalStartYear = start ? start.getFullYear() : end.getFullYear();
      const originalEndYear = end.getFullYear();

      // Shift years to current year
      if (start) start.setFullYear(currentYear);
      end.setFullYear(currentYear);

      // If even after shifting to current year, the deadline passed, move to next year
      // (Unless it's currently open within the window, but we handled end < now check above)
      // Actually, we need to check the window.
      // If today is May 2025. Original was Jan-Dec 2023.
      // Shifted to Jan-Dec 2025. Today is inside window. It is OPEN.
      // If today is Dec 2025. Original was Jan-Nov 2023.
      // Shifted to Jan-Nov 2025. End passed. Next cycle: 2026.
      
      if (end < now) {
        if (start) start.setFullYear(currentYear + 1);
        end.setFullYear(currentYear + 1);
      }
    }

    // 2. Compute Status
    let status: ComputedStatus['status'] = 'CLOSED';
    let label = 'Closed';
    let colorClass = 'text-red-600';
    let badgeClass = 'bg-red-100 text-red-800';
    let daysLeft: number | null = null;

    if (end) {
      const diffTime = end.getTime() - now.getTime();
      daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (daysLeft < 0) {
        status = 'CLOSED';
        label = 'Deadline Passed';
        colorClass = 'text-slate-500';
        badgeClass = 'bg-slate-100 text-slate-600';
      } else {
        // Future deadline
        if (start && now < start) {
           status = 'OPENING_SOON';
           label = `Opens ${start.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}`;
           colorClass = 'text-blue-600';
           badgeClass = 'bg-blue-100 text-blue-800';
        } else if (daysLeft <= 7) {
           status = 'CLOSING_SOON';
           label = `Closing in ${daysLeft} days`;
           colorClass = 'text-red-600';
           badgeClass = 'bg-red-100 text-red-800 animate-pulse';
        } else {
           status = 'OPEN';
           label = 'Applications Open';
           colorClass = 'text-green-600';
           badgeClass = 'bg-green-100 text-green-800';
        }
      }
    } else {
      status = 'ANNOUNCED';
      label = 'To Be Announced';
      colorClass = 'text-orange-600';
      badgeClass = 'bg-orange-100 text-orange-800';
    }

    // 3. Format Date String
    const deadlineString = end.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

    return {
      status,
      label,
      colorClass,
      badgeClass,
      effectiveDeadline: deadlineString,
      daysLeft,
      isAutoRenewed
    };
  }

  // Simulate a live verification check (Cron Job Simulation)
  static async verifyStatus(scholarshipId: string): Promise<string> {
     // In a real app, this calls an API. Here we simulate a check.
     return new Date().toISOString(); 
  }
}
