import polyline from '@mapbox/polyline';

const ARRIVAL_THRESHOLD_DEG = 0.0003; // ~30 m

/**
 * Trim an encoded polyline from the driver's current position forward.
 * Returns '' when the driver is within the arrival threshold (signal to hide line).
 */
export function trimPolylineFromPosition(
  encodedPolyline: string,
  driverLat: number,
  driverLng: number
): string {
  const coords = polyline.decode(encodedPolyline);
  if (coords.length < 2) return encodedPolyline;

  let closestIndex = 0;
  let minDist = Infinity;
  coords.forEach(([lat, lng], i) => {
    const dist = Math.hypot(lat - driverLat, lng - driverLng);
    if (dist < minDist) {
      minDist = dist;
      closestIndex = i;
    }
  });

  if (minDist < ARRIVAL_THRESHOLD_DEG) return ''; // arrived, hide line

  const trimmed = coords.slice(closestIndex);
  if (trimmed.length < 2) return encodedPolyline; // don't vanish prematurely
  return polyline.encode(trimmed as [number, number][]);
}
