# Specification

## Summary
**Goal:** Let users add Bikes, Motorcycles, and Cars (Supercars) into the catalog via a backend create method and a new “Add Vehicle” UI.

**Planned changes:**
- Add a backend create/add method that accepts vehicleType, make, specs, price, and images, auto-assigns a unique ID, and returns the created vehicle.
- Create a new “Add Vehicle” page/route within the existing AppLayout with a form for vehicleType, make, model, year, engine, power, topSpeed, acceleration, weight, price, and one-or-more image URLs.
- Add basic form validation with clear English error messages and show a clear English success message after creation, with a way to navigate to the created vehicle’s details and/or see it in category listings after refresh.
- Add an optional “Seed sample vehicles” action on the Add Vehicle page that inserts a small starter set (at least 1 per category) using the same backend create/add method.
- Ensure React Query lists refresh by invalidating/refetching relevant vehicle queries after add/seed so Home featured and Category pages reflect changes.

**User-visible outcome:** Users can open an Add Vehicle page, submit a validated form to create a new Bike/Motorcycle/Car with an auto-generated ID, optionally seed sample vehicles for testing, and then see the new vehicles appear on Home/Category pages (and access the new vehicle’s detail page).
