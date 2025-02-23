import pkg from "clarifai-nodejs";
const { Model: clarifai } = pkg;
const connectClarifai = async () => {
  new clarifai({
    authConfig: {
      userId: process.env.CLARIFAI_USER_ID,
      appId: process.env.CLARIFAI_APP_ID,
      pat: process.env.CLARIFAI_API_KEY,
    },
    modelId: process.env.CLARIFAI_MODEL_ID,
  });
};

export default connectClarifai;
