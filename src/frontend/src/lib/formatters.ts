export function formatBigInt(value: bigint | number): string {
  return value.toString();
}

export function formatSpeed(kmh: bigint | number): string {
  const speed = Number(kmh);
  return `${speed} km/h (${Math.round(speed * 0.621371)} mph)`;
}

export function formatWeight(kg: bigint | number): string {
  const weight = Number(kg);
  return `${weight} kg (${Math.round(weight * 2.20462)} lbs)`;
}

export function formatAcceleration(seconds: number): string {
  return `${seconds}s (0-60 mph)`;
}
