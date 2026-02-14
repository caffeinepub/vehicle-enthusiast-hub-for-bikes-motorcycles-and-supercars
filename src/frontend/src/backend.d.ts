import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Vehicle {
    id: bigint;
    vehicleType: string;
    make: string;
    specs: Specs;
    nanosecondsCreated: bigint;
    price: bigint;
    images: Array<string>;
}
export interface Specs {
    weight: bigint;
    model: string;
    year: bigint;
    acceleration: number;
    power: bigint;
    topSpeed: bigint;
    engine: string;
}
export interface backendInterface {
    addVehicle(vehicleType: string, make: string, specs: Specs, price: bigint, images: Array<string>): Promise<bigint>;
    getAllVehicles(): Promise<Array<Vehicle>>;
    getMapSizes(): Promise<[bigint, bigint]>;
    getUserFavorites(user: Principal): Promise<Array<bigint>>;
    getVehicleById(vehicleId: bigint): Promise<Vehicle>;
    getVehiclesByType(vehicleType: string): Promise<Array<Vehicle>>;
    isFavorite(vehicleId: bigint): Promise<boolean>;
    isRegistered(): Promise<boolean>;
    toggleFavorite(vehicleId: bigint): Promise<boolean>;
}
