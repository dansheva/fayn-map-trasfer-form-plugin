import { Libraries, useLoadScript } from "@react-google-maps/api";
import { DirectionSection } from "./components";

const libraries: Libraries = ["places"];

const App = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCpQbYP2X06eR2RJKrBxTy387o2zipmOTQ",
    libraries,
  });

  return isLoaded ? <DirectionSection /> : <div>Saniok lox</div>;
};

export default App;
