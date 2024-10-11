import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import projectRoutes from "./routes/project.route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// TODO: Routes
app.get("/", (req, res) => {
  res.send("Welecome to Ergon");
});

app.use("/projects", projectRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Ergon server running on port ${PORT}`));
