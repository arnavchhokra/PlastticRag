const fs = require("fs");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } =  require("@google/generative-ai/server");

const express = require("express");
const cors = require("cors");
const path = require('path');
const bcrypt = require('bcryptjs');


require('dotenv').config();

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./model/userModel');

const  mongo_user = process.env.MONGO_USER;
const mongo_pass = process.env.MONGO_PASSWORD;



const uri =`mongodb+srv://${mongo_user}:${mongo_pass}@goodlookscluster.u6bqu.mongodb.net/?retryWrites=true&w=majority&appName=goodLooksCluster`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const con= mongoose.connection;



const app = express();


app.use(cors());
app.use(express.json());

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


const generateToken = (user) => {
  return jwt.sign({ userId: user._id, username: user.username,  email: user.email,  }, process.env.JWT_SECRET, { expiresIn: '1h' });
};


const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};






const protectRoute = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get the token from the Authorization header

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header is missing or invalid' });
  }

  const token = authHeader.split(' ')[1];  // Extract the token after 'Bearer'
  if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
  }
  console.log('token: ', token)

  try {
      const decoded = verifyToken(token);
      req.user = {
        userId: decoded.userId,
        username: decoded.username,
        email: decoded.email,
      };
      next();
  } catch (error) {
      return res.status(401).json({ message: 'Invalid token', error: error.message });
  }

};


app.post('/User', protectRoute, async (req, res)  => {
  try {
    const name = req.user.userId;
    const email = req.user.email;
    if(name && email)
    {
      res.status(200).json({name, email});
    }
    else{
      res.status(400).json({message: "User not found"});
    }
  } catch (error) {
      res.status(400).json({ message: 'User Could not be found', error: error.message });
  }
});


app.post("/generate", upload.single("file"), protectRoute,  async (req, res) => {
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


    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).send("An error occurred while generating content.");
    } finally{
      const file = req.file;
      if(!file) return;
      fs.unlink(file.path, (err) => {
        if (err) {
            console.error("Error deleting file:", err);
        } else {
            console.log(`File ${file.path} deleted successfully`);
        }
    });
    }
});


app.post('/register', async (req, res) => {
  try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password:hashedPassword });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      res.status(400).json({ message: 'Registration failed', error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user ||  !(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = generateToken(user);
      res.json({ token });
  } catch (error) {
      res.status(500).json({ message: 'Login failed', error: error.message });
  }
});





app.listen(8000, () => {
    console.log("Server is running on port 8000");
    try{
      con.on('open',() => {
          console.log('connected');
      })
    }catch(error)
    {
      console.log("Error: "+error);
    }
});
