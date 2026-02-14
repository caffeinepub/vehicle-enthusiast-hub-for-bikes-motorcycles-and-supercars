import Map "mo:core/Map";
import Set "mo:core/Set";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Text "mo:core/Text";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Category = {
    id : Nat;
    name : Text;
  };

  type Specs = {
    model : Text;
    year : Nat;
    engine : Text;
    power : Nat; // HP
    topSpeed : Nat; // Km/h
    acceleration : Float; // 0-60 mph in seconds
    weight : Nat; // Kg
  };

  type Vehicle = {
    id : Nat;
    vehicleType : Text; // Car | Bike | Motorcycle
    make : Text;
    images : [Text];
    specs : Specs;
    price : Int;
    nanosecondsCreated : Int;
  };

  module Vehicle {
    public func compareByDate(vehicle1 : Vehicle, vehicle2 : Vehicle) : Order.Order {
      Int.compare(vehicle1.nanosecondsCreated, vehicle2.nanosecondsCreated);
    };
  };

  type Favorite = {
    vehicleId : Nat;
    timestamp : Time.Time;
  };

  let vehicles = Map.empty<Nat, Vehicle>();
  let favorites = Map.empty<Principal, Set.Set<Nat>>();
  var nextId = 0;

  public shared ({ caller }) func addVehicle(
    vehicleType : Text,
    make : Text,
    specs : Specs,
    price : Int,
    images : [Text],
  ) : async Nat {
    let id = nextId;
    let vehicle : Vehicle = {
      id;
      vehicleType;
      make;
      specs;
      price;
      images;
      nanosecondsCreated = Time.now();
    };

    vehicles.add(id, vehicle);
    nextId += 1;
    id;
  };

  public shared ({ caller }) func toggleFavorite(vehicleId : Nat) : async Bool {
    let favoritesSet = switch (favorites.get(caller)) {
      case (null) { Set.empty<Nat>() };
      case (?set) { set };
    };

    let isAlreadyFavorite = favoritesSet.contains(vehicleId);
    if (isAlreadyFavorite) {
      favoritesSet.remove(vehicleId);
    } else {
      favoritesSet.add(vehicleId);
    };

    favorites.add(caller, favoritesSet);

    not isAlreadyFavorite;
  };

  public query ({ caller }) func getVehicleById(vehicleId : Nat) : async Vehicle {
    switch (vehicles.get(vehicleId)) {
      case (null) { Runtime.trap("Vehicle not found") };
      case (?vehicle) { vehicle };
    };
  };

  public query ({ caller }) func getAllVehicles() : async [Vehicle] {
    vehicles.values().toArray().sort(Vehicle.compareByDate);
  };

  public query ({ caller }) func getVehiclesByType(vehicleType : Text) : async [Vehicle] {
    vehicles.values().toArray().filter(
      func(vehicle) {
        Text.equal(vehicle.vehicleType, vehicleType);
      }
    );
  };

  public query ({ caller }) func getUserFavorites(user : Principal) : async [Nat] {
    switch (favorites.get(user)) {
      case (null) { [] };
      case (?favoriteSet) { favoriteSet.values().toArray() };
    };
  };

  public query ({ caller }) func isFavorite(vehicleId : Nat) : async Bool {
    switch (favorites.get(caller)) {
      case (null) { false };
      case (?favoriteSet) { favoriteSet.contains(vehicleId) };
    };
  };

  public query ({ caller }) func getMapSizes() : async (Nat, Nat) {
    (vehicles.size(), favorites.size());
  };

  public query ({ caller }) func isRegistered() : async Bool {
    favorites.containsKey(caller);
  };
};
