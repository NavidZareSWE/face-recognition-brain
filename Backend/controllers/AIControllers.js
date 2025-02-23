import { ClarifaiStub, grpc } from "clarifai-nodejs-grpc";

const detectFace = async (req, res) => {
  let faceDetects = [];
  const { imgUrl } = req.body;
  //index.js file

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // In this section, we set the user authentication, user and app ID, model details, and the URL
  // of the image we want as an input. Change these strings to run your own example.
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  // Your PAT (Personal Access Token) can be found in the Account's Security section
  const PAT = "08cd70dd90d24da0900e62eff2ced438";
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = "clarifai";
  const APP_ID = "main";
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = "face-detection";
  const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";
  const IMAGE_URL = imgUrl;
  // To use a local file, assign the location variable
  // const IMAGE_FILE_LOCATION = 'YOUR_IMAGE_FILE_LOCATION_HERE'

  ///////////////////////////////////////////////////////////////////////////////////
  // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
  ///////////////////////////////////////////////////////////////////////////////////

  const stub = ClarifaiStub.grpc();

  // This will be used by every Clarifai endpoint call
  const metadata = new grpc.Metadata();
  metadata.set("authorization", "Key " + PAT);

  // To use a local text file, uncomment the following lines
  // const fs = require("fs");
  // const imageBytes = fs.readFileSync(IMAGE_FILE_LOCATION);

  stub.PostModelOutputs(
    {
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      model_id: MODEL_ID,
      version_id: MODEL_VERSION_ID, // This is optional. Defaults to the latest model version
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
              // base64: imageBytes,
              allow_duplicate_url: true,
            },
          },
        },
      ],
    },
    metadata,
    (err, response) => {
      if (err) {
        throw new Error(err);
      }

      if (response.status.code !== 10000) {
        throw new Error(
          "Post model outputs failed, status: " + response.status.description
        );
      }

      const regions = response.outputs[0].data.regions;

      regions.forEach((region) => {
        // Accessing and rounding the bounding box values
        const boundingBox = region.region_info.bounding_box;
        const topRow = boundingBox.top_row.toFixed(3);
        const leftCol = boundingBox.left_col.toFixed(3);
        const bottomRow = boundingBox.bottom_row.toFixed(3);
        const rightCol = boundingBox.right_col.toFixed(3);

        region.data.concepts.forEach((concept) => {
          // Accessing and rounding the concept value
          const name = concept.name;
          const value = concept.value.toFixed(4);
          faceDetects.push({
            topRow,
            leftCol,
            bottomRow,
            rightCol,
          });
          // console.log(
          //   `${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`
          // );
        });
      });
      res.json({ success: true, faceDetects });
    }
  );
};

export { detectFace };
