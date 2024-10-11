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

const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });


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

          const prompt = `
          I need an analysis that includes the following:
          - NO PREAMBLE OR FLUFF
          - A comparison score for each feature, comparing my user score to an average score.
          - A list of my best facial features based on their perceived value.
          - Specific improvement tips tailored to enhance my facial features without surgery.
          - Optional surgical tips that could be considered for further enhancement.

          Please format the response as follows:

          \`\`\`json
          {
            "facialComparisonData": [
              { "feature": "Eyes", "userScore": XX, "averageScore": XX },
              { "feature": "Nose", "userScore": XX, "averageScore": XX },
              { "feature": "Lips", "userScore": XX, "averageScore": XX },
              { "feature": "Jawline", "userScore": XX, "averageScore": XX },
              { "feature": "Cheekbones", "userScore": XX, "averageScore": XX },
              { "feature": "Forehead", "userScore": XX, "averageScore": XX }
            ],
            "bestFacialFeaturesData": [
              { "name": "eyes", "value": XX },
              { "name": "lips", "value": XX },
              { "name": "cheekbones", "value": XX },
              { "name": "jawline", "value": XX },
              { "name": "nose", "value": XX }
            ],
            "improvementTips": [
              "TIP 1",
              "TIP 2",
              "TIP 3",
              "TIP 4",
              "TIP 5",
            ],
            "surgicalTips": [
              "SURGERY OPTION 1",
              "SURGERY OPTION 2",
              "SURGERY OPTION 3",
              "SURGERY OPTION 4",
              "SURGERY OPTION 5",
            ]
          }
          \`\`\`

          Please ensure the analysis is accurate and clearly formatted. If the image cannot be understood, respond just with "500".
          `;
          console.log("prompt made");


      const result = await model.generateContent([
      prompt,
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
