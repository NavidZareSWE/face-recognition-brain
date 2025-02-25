import { useContext } from "react";
import { AppContext } from "../../context/AppContext";


const Rank = () => {
  const { user } = useContext(AppContext);

  return (
    <div className="centerAll">
      <div className="text-white text-2xl tracking-tight">
        {`${user.name}, your current rank is`}&nbsp;&nbsp;
      </div>
      {/* FIX THIS BUGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG */}
      <div className="text-white text-5xl">{Number(user.entries) + 1}</div>
    </div>
  );
};

export default Rank;
