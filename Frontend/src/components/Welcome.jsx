import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
const Welcome = () => {
  const { navigate } = useContext(AppContext);
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <img className="mb-5 w-80" src="./Psychology.svg" alt="Website Logo" />
        <h1 className="text-3xl mb-1">Welcome, To our Face Detection App</h1>
        <h2 className="text-xl mb-5">To Enter:</h2>
        <div className="flex justify-center items-center">
          <p
            onClick={() => navigate("/signin")}
            className="font-bold  text-2xl text-gray-900 bg-white py-3 px-6 rounded-3xl hover:bg-gray-300 hover:scale-105 cursor-pointer transition-all ease-in-out duration-150"
          >
            Sign In
          </p>
          <p className="text-4xl">&nbsp;/&nbsp;</p>
          <p
            onClick={() => navigate("/register")}
            className="font-bold  text-2xl text-gray-900 bg-white py-3 px-6 rounded-3xl hover:bg-gray-300 cursor-pointer hover:scale-105 transition-all ease-in-out duration-150"
            href="Register"
          >
            Register
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
