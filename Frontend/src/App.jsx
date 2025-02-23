import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import ParticlesBg from "particles-bg";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import MainApp from "./components/MainApp";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import { AppContext } from "../context/Appcontext";


const App = () => {
  const { token, setToken, navigate } = useContext(AppContext);
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (token !== "") navigate("/home");
  }, [navigate, token]);

  return (
    <div className="App">
      <ToastContainer />
      <ParticlesBg color="#ffffff" num={100} type="cobweb" bg={true} />
      <Navigation token={token} setToken={setToken} />
      <Routes>
        <Route
          key={MainApp}
          path={"/home"}
          element={<MainApp token={token} setImageURL={setImageURL} imageURL={imageURL} />}
        />
        <Route key={"signin"} path={"/signin"} element={<SignIn />} />
        <Route key={"register"} path={"/register"} element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
