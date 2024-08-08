import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
// Helps in setting the paths
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import paymentRoutes from "./routes/payment.js";
import donationRoutes from "./routes/donation.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { createDonationPost } from "./controllers/donation.js";
import { verifyToken } from "./middleware/auth.js";
import Razorpay from "razorpay";
import { v4 as uuidv4 } from "uuid";

// Configurations

// normal computer location (web address of the js file)
const __filename = fileURLToPath(import.meta.url);
// takes the location and provide the folder name
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// images locally store hongey
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

let uniqueID = uuidv4();

// File Storage     (Same as documentation)     cb --> callback function
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, `${uniqueID} - ${file.originalname}`);
  },
});

// upload karne ke liye ye use karengey
const upload = multer({ storage });

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Routes with files
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), (req, res) => {
  createPost(req, res, uniqueID);
});

app.post("/donation/new", upload.single("picture"), (req, res) => {
  createDonationPost(req, res, uniqueID);
});

app.get("/payment/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/donation", donationRoutes);
app.use("/payment", paymentRoutes);

// Mongoose setup
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started at ${PORT} Port`));
  })
  .catch((error) => console.log(`${error} did not connect`));
