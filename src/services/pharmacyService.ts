import { demoPharmacies, type Pharmacy } from '../data/demoPharmacies';

/**
 * Returns nearby pharmacies for medication refill.
 * The UI depends only on this function, so real GPS / Google Places API
 * can be plugged in later without UI changes.
 */
export async function getNearbyPharmacies(_medication?: string): Promise<Pharmacy[]> {
  // Simulates asynchronous fetch with demo data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(demoPharmacies);
    }, 100);
  });
}

export type { Pharmacy };
