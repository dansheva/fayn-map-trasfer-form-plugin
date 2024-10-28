import { Autocomplete, GoogleMap } from "@react-google-maps/api";
import { useRef, useState } from "react";

const RATE_PER_KM = 1.5;

const allowedCountries = { componentRestrictions: { country: "IT" } };

export const DirectionSection = () => {
  const [pickup, setPickup] = useState<string | null>(null);
  const [destination, setDestination] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  const pickupRef = useRef<google.maps.places.Autocomplete | null>(null);
  const destinationRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoadPickup = (autocomplete: google.maps.places.Autocomplete) => {
    pickupRef.current = autocomplete;
  };

  const onLoadDestination = (autocomplete: google.maps.places.Autocomplete) => {
    destinationRef.current = autocomplete;
  };

  const handlePlaceChanged = () => {
    if (pickupRef.current) {
      const place = pickupRef.current.getPlace();
      if (place && place.formatted_address) {
        setPickup(place.formatted_address);
      }
    }

    if (destinationRef.current) {
      const place = destinationRef.current.getPlace();
      if (place && place.formatted_address) {
        setDestination(place.formatted_address);
      }
    }
  };

  const calculateDistance = async () => {
    if (!pickup || !destination) return;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: pickup,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          const distanceInMeters =
            result.routes[0].legs[0].distance?.value || 0;
          const distanceInKm = distanceInMeters / 1000;
          setPrice(distanceInKm * RATE_PER_KM);
        } else {
          console.error("Error fetching directions", status);
        }
      }
    );
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Distance & Price Calculator</h1>

      <div className="mb-4 w-full max-w-md">
        <label>Pickup Location:</label>
        <Autocomplete
          onLoad={onLoadPickup}
          onPlaceChanged={handlePlaceChanged}
          options={allowedCountries}
        >
          <input
            type="text"
            placeholder="Enter pickup location"
            className="border p-2 rounded w-full"
          />
        </Autocomplete>
      </div>

      <div className="mb-4 w-full max-w-md">
        <label>Destination:</label>
        <Autocomplete
          onLoad={onLoadDestination}
          onPlaceChanged={handlePlaceChanged}
          options={allowedCountries}
        >
          <input
            type="text"
            placeholder="Enter destination"
            className="border p-2 rounded w-full"
          />
        </Autocomplete>
      </div>

      <button
        onClick={calculateDistance}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Calculate
      </button>

      {price !== null && (
        <p className="mt-4 text-xl">Price: ${price.toFixed(2)}</p>
      )}

      {/* GoogleMap component must be included even if not displayed, as it initializes Google Maps */}
      <GoogleMap
        mapContainerStyle={{ display: "none" }}
        center={{ lat: 41.9028, lng: 12.4964 }} // Centered on Italy
        zoom={5}
      />
    </div>
  );
};
