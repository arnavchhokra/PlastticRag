const fs = require("fs");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } =  require("@google/generative-ai/server");

const express = require("express");
const cors = require("cors");
const path = require('path');

require('dotenv').config();
const app = express();
app.use(cors());
// app.use(cors({ origin: "http://your-frontend-domain.com" }));

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const fileManager = new GoogleAIFileManager(process.env.GOOGLE_API_KEY);;

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });


const upload = multer({ storage: storage });


app.post("/generate", upload.single("file"), async (req, res) => {
    try {
        console.log("IN ROUTE");
        const file = req.file;
        const mimeType = req.file.mimetype;
        if (!file) {
            return res.status(400).send("No file uploaded");
        }
        console.log("FILE:", file);
        const uploadResult = await fileManager.uploadFile(file.path, {
            mimeType: mimeType,
            displayName: req.file.originalname,
          });

          console.log(
            `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`,
          );

        const prompt = "FOR THE FACIAL FETURES OF THIS PERSON IN ELEMENTS OF NOSE, LIPS, EYES, CHEEKBONES, JAWLINE : STATE THE PROMINENCE OF THESE FEATURES FROM 1 TO 5. Also no preamble no fluff and no ethical statements. LIST 5 improvement tips for the person show it as an array of strings. LIST 5 IMPROVEMENTS ONLY DOCTORS CAN MAKE AS AN ARRAY OF STRING. IF THE IMAGE IS NOT OF A HUMAN OR YOU ARE NOT ABLE TO DETERMINE THE FACIAL FEATURES OF THE PERSON JUST RETURN 500";
        const prompt2 = `
        FOR THE FACIAL FEATURES OF THIS PERSON IN ELEMENTS OF NOSE, LIPS, EYES, CHEEKBONES, JAWLINE:
        - STATE THE PROMINENCE OF THESE FEATURES FROM 1 TO 5 , MAKE SURE THE NUMBERS ARE TRUTHFUL AND FLOATING POINT.
        - LIST 5 IMPROVEMENT TIPS FOR THE PERSON AS AN ARRAY OF STRINGS, MAKE THESE TIPS AS DETAILED AS POSSIBLE, EXPLAIN WHY YOU ARE SAYING SOMETHING.
        - LIST 5 IMPROVEMENTS ONLY DOCTORS CAN MAKE AS AN ARRAY OF STRINGS, MAKE THESE TIPS AS DETAILED AS POSSIBLE, EXPLAIN WHY YOU ARE SAYING SOMETHING.
        - RETURN THE RESULTS AS A JSON OBJECT WITH THE FOLLOWING STRUCTURE:
        {
            "status:":200 or 500,
            "facialFeatures": {
                "nose": 3.1,
                "lips": 2.2,
                "eyes": 3.3,
                "cheekbones": 3.4,
                "jawline": 2.1
            },
            "improvementTips": [
                "Tip 1",
                "Tip 2",
                "Tip 3",
                "Tip 4",
                "Tip 5"
            ],
            "doctorImprovements": [
                "Doctor Improvement 1",
                "Doctor Improvement 2",
                "Doctor Improvement 3",
                "Doctor Improvement 4",
                "Doctor Improvement 5"
            ]
        }
        If the image is not of a human or you are not able to determine the facial features, just return status as 500.`;

          console.log("prompt made");

      const result = await model.generateContent([
      prompt2,
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: mimeType,
        },
      },
    ]);

        console.log("result:",result.response.text());

        res.status(200).json({msg:result.response.text()});


        fs.unlink(file.path, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            } else {
                console.log(`File ${file.path} deleted successfully`);
            }
        });

    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).send("An error occurred while generating content.");
    }
});


app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
