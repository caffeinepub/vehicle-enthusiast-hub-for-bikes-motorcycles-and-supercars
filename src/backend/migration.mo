import Map "mo:core/Map";
import Set "mo:core/Set";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";

module {
  type Specs = {
    model : Text;
    year : Nat;
    engine : Text;
    power : Nat;
    topSpeed : Nat;
    acceleration : Float;
    weight : Nat;
  };

  // Old vehicle type with Int id
  type OldVehicle = {
    id : Int;
    vehicleType : Text;
    make : Text;
    images : [Text];
    specs : Specs;
    price : Int;
    nanosecondsCreated : Int;
  };

  // Old actor type with Int keys
  type OldActor = {
    vehicles : Map.Map<Int, OldVehicle>;
    favorites : Map.Map<Principal, Set.Set<Int>>;
  };

  // New vehicle type with Nat id
  type NewVehicle = {
    id : Nat;
    vehicleType : Text;
    make : Text;
    images : [Text];
    specs : Specs;
    price : Int;
    nanosecondsCreated : Int;
  };

  // New actor type with Nat keys
  type NewActor = {
    vehicles : Map.Map<Nat, NewVehicle>;
    favorites : Map.Map<Principal, Set.Set<Nat>>;
    nextId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    // Convert Int id vehicles to Nat id vehicles.
    let newVehicles = Map.empty<Nat, NewVehicle>();
    old.vehicles.entries().forEach(
      func((intId, oldVehicle)) {
        let newVehicle = { oldVehicle with id = intId.toNat() };
        newVehicles.add(intId.toNat(), newVehicle);
      }
    );

    // Convert Set<Int> favorites to Set<Nat>.
    let newFavorites = old.favorites.map<Principal, Set.Set<Int>, Set.Set<Nat>>(
      func(_user, oldSet) {
        let newSet = Set.empty<Nat>();
        oldSet.values().forEach(
          func(vehicleId) {
            newSet.add(vehicleId.toNat());
          }
        );
        newSet;
      }
    );

    {
      vehicles = newVehicles;
      favorites = newFavorites;
      nextId = 0;
    };
  };
};
