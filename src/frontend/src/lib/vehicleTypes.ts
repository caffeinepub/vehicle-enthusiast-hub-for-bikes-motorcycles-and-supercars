export const VEHICLE_TYPES = {
  BIKE: 'Bike',
  MOTORCYCLE: 'Motorcycle',
  CAR: 'Car',
} as const;

export type VehicleType = typeof VEHICLE_TYPES[keyof typeof VEHICLE_TYPES];

export function getCategoryLabel(type: string): string {
  switch (type) {
    case VEHICLE_TYPES.BIKE:
      return 'Bikes';
    case VEHICLE_TYPES.MOTORCYCLE:
      return 'Motorcycles';
    case VEHICLE_TYPES.CAR:
      return 'Supercars';
    default:
      return 'Vehicles';
  }
}

export function getCategoryIcon(type: string): string {
  switch (type) {
    case VEHICLE_TYPES.BIKE:
      return '/assets/generated/icon-bike.dim_256x256.png';
    case VEHICLE_TYPES.MOTORCYCLE:
      return '/assets/generated/icon-motorcycle.dim_256x256.png';
    case VEHICLE_TYPES.CAR:
      return '/assets/generated/icon-supercar.dim_256x256.png';
    default:
      return '';
  }
}
