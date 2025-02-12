import Logo from "./Logo";
import Rank from "./Rank";
import ImageLinkForm from "./ImageLinkForm";
import FaceRecognition from "./FaceRecognition";

const MainApp = ({ setImageURL, imageURL }) => {
  return (
    <div className="Main-App">
      <Logo />
      <Rank />
      <ImageLinkForm setImageURL={setImageURL} />
      <FaceRecognition imageURL={imageURL} />
    </div>
  );
};

export default MainApp;
