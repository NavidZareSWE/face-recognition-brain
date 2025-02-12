import { useContext } from "react";
import { AppContext } from "../../context/Appcontext";
const Navigation = ({ token, setToken }) => {
  const { navigate } = useContext(AppContext);
  return token !== "" ? (
    <nav className="flex justify-end">
      <p
        onClick={() => {setToken(""); navigate("/signin"); localStorage.clear("token")}}
        className="text-2xl no-underline text-black p-4 cursor-pointer hover:opacity-50 hover:underline"
      >
        Sign Out
      </p>
    </nav>
  ) : (
    <nav className="flex justify-end">
      <p
        onClick={() => navigate("/signin")}
        className="text-2xl no-underline text-black p-4 cursor-pointer hover:opacity-50 hover:underline"
      >
        Sign In
      </p>
      <p
        onClick={() => navigate("/register")}
        className="text-2xl no-underline text-black p-4 cursor-pointer hover:opacity-50 hover:underline"
      >
        Register
      </p>
    </nav>
  );
};

export default Navigation;
