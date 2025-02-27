// import ImageWithFallback from "./ImageWithFallback";
import LoadingImage from "./LoadingImage";
import { Suspense } from "react";
import { lazyLoad } from "../utils/lazyLoad";

// Assuming you are using a bundler like Webpack, Vite, etc.
const url = new URL(".", import.meta.url).pathname;
const ImageWithFallback = lazyLoad(url + "/ImageWithFallback");

const FaceRecognition = ({ imageURL, faces }) => {
  return imageURL === "" ? (
    <div></div>
  ) : (
    <div className="center">
      <div className="center border-gray-300 rounded-xl p-[3px] border-[3px]  max-w-[70%] mt-2">
        <Suspense fallback={<LoadingImage />}>
          <ImageWithFallback fallback="./404 - Not Found.jpg" src={imageURL} faces={faces} />
        </Suspense>
      </div>
    </div>
  );
};

export default FaceRecognition;
