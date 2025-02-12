import Tilt from "react-parallax-tilt";
import style from "./Logo.module.css";

const Logo = () => {
  return (
    <div className="m-8 mt-0 w-max h-max">
      <Tilt scale="1.1" transitionSpeed="600">
        <div
          className={`${style.Tilt} flex justify-center content-center`}
          style={{
            height: "150px",
            width: "150px",
          }}
        >
          <img src="./brain.svg" alt="Brain Logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
