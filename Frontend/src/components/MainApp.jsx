import Logo from "./Logo";
import Rank from "./Rank";
import ImageLinkForm from "./ImageLinkForm";
import FaceRecognition from "./FaceRecognition";
import { useState } from "react";
import YourComponent from "./YourComponent";

const MainApp = ({ setImageURL, imageURL }) => {
    const [faces, setFaces] = useState([])
  return (
    <div className="Main-App">
      <Logo />
      <Rank />
      <ImageLinkForm setImageURL={setImageURL} setFaces={setFaces} />
      <FaceRecognition imageURL={imageURL} faces={faces} />
      <YourComponent/>
    </div>
  );
};

export default MainApp;
