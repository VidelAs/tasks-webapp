
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import taskRouter from "./routes/task-router.js";
import userRouter from "./routes/user-router.js";
import statusRouter from "./routes/status-router.js";

const app = express();
app.use(express.json());


dotenv.config();


const whitelist = [
  "http://127.0.0.1:5500",
  "http://127.0.0.1:8080",
  "http://127.0.0.1:5501",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};
app.use(cors(corsOptions));


app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);
app.use("/api/status", statusRouter);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Serveris running on port ${PORT}`);
});
