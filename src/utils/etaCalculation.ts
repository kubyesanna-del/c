export function getETA(lat1: number, lon1: number, lat2: number, lon2: number, speedKmh: number = 40): string {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const distanceKm = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const etaMinutes = Math.round((distanceKm / speedKmh) * 60);
  return `${etaMinutes} min${etaMinutes !== 1 ? 's' : ''}`;
}

/**
 * Estimate travel time (in whole minutes) for a given distance in km.
 * Uses a conservative average urban speed and a small base time to account
 * for pickup/handover so very short distances don't show "0 min".
 */
export function estimateTravelMinutes(distanceKm: number, speedKmh: number = 30): number {
  if (!Number.isFinite(distanceKm) || distanceKm <= 0) return 1;
  const minutes = Math.round((distanceKm / speedKmh) * 60) + 2; // +2 min base
  return Math.max(minutes, 1);
}

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const distanceKm = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return distanceKm;
}
