///////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input. Change these strings to run your own example.
///////////////////////////////////////////////////////////////////////////////////////////////////
// Your PAT (Personal Access Token) can be found in the Account's Security section
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
// Change these to whatever model and image URL you want to use
// To use a local file, assign the location variable
// const IMAGE_FILE_LOCATION = 'YOUR_IMAGE_FILE_LOCATION_HERE'
const smartBrainModel = {
  authConfig: {
    userId: process.env.CLARIFAI_USER_ID,
    appId: process.env.CLARIFAI_APP_ID,
    pat: process.env.CLARIFAI_API_KEY,
  },
  modelId: process.env.CLARIFAI_MODEL_ID,
  modelVersionId: process.env.CLARIFAI_MODEL_VERSION_ID,
};

export { smartBrainModel };
