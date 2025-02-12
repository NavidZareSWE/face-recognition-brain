import { Model } from "clarifai-nodejs";

const Clarifai = async () => {
  new Model({
    authConfig: {
      USER_ID: process.env.CLARIFAI_USER_ID,
      APP_ID: process.env.CLARIFAI_APP_ID,
      PAT: process.env.CLARIFAI_API_KEY,
    },
    MODEL_ID: process.env.CLARIFAI_MODEL_ID,
  });
};

export default Clarifai;
