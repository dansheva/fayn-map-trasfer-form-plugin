import { DirectionSection } from "./DirectionSection";
import { Libraries, useLoadScript } from "@react-google-maps/api";

const libraries: Libraries = ["places"];

export const GoogleMapsLoader = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCpQbYP2X06eR2RJKrBxTy387o2zipmOTQ",
    libraries,
  });

  return isLoaded ? <DirectionSection /> : <div>Saniok lox</div>;
};
