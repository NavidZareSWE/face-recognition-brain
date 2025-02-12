import style from "./LoadingImage.module.css";
const LoadingImage = () => {
  return (
    <div className="w-full h-60 bg-gray-400 opacity-80 relative rounded-md">
      <div
        className={`${style.line} w-1 h-full bg-white absolute blur-sm`}
      ></div>
    </div>
  );
};

export default LoadingImage;
