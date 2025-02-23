/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import style from "./ImageLinkForm.module.css";
import { toast } from "react-toastify";
import { AppContext } from "../../context/Appcontext";

const toastOptions = {
  error: {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  },
};
const isWhitespaceString = (str) => !str.replace(/\s/g, "").length;

const ImageLinkForm = ({ setImageURL, setFaces }) => {
  const [inputValue, setInputValue] = useState("");
  const { BACKEND_URL } = useContext(AppContext);
  const isValidURL = (input) => {
    if (input.length === 0) {
      toast.error("You Haven't Entered Anything!", toastOptions.error);
      return false;
    } else if (isWhitespaceString(input)) {
      toast.error("Space Only URL's don't exist!", toastOptions.error);
      return false;
    } else {
      try {
        const pattern =
          /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
        const isValid = pattern.test(input);
        if (isValid) {
          setImageURL(input);
          return true;
        } else {
          toast.error("Invalid URL!", toastOptions.error);
          return false;
        }
      } catch (error) {
        console.error(error);
      }
    }
    return false;
  };
  useEffect(() => {
    setInputValue(inputValue);
  }, [inputValue]);
  const onPictureSubmit = async (input) => {
    if (isValidURL(input)) {
      const response = fetch(BACKEND_URL + "/api/ai/facedetect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imgUrl: inputValue,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.success){
            setFaces(data.faceDetects)
          }else{
            toast.error(data.message)
          }
        })
        .catch((err) => console.error(err));
    }

  };

  return (
    <div>
      <p className="text-lg center tracking-tighter">
        {"This Magic Brain will detect faces in your pictues. Give it a try!"}
      </p>
      <div className="center">
        <div
          className={`${style.form} flex w-[700px] text-center p-8 rounded-md shadow-lg`}
        >
          <input
            placeholder="Enter A Valid URL"
            className="text-lg p-2 w-2/3 pl-4 rounded-lg rounded-r-none"
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="w-1/3 transition-all duration-200 text-lg py-2 px-4 text-white bg-purple-400 hover:scale-105 hover:shadow-inner hover:shadow-purple-500 no-underline "
            onClick={() => onPictureSubmit(inputValue)}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
