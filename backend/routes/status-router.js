import express from "express";

const statusRouter = express.Router();
import {
  getName,
  getStatus,
  newStatus,
  updateStatus,
  deleteStatus,
} from "../controller/status-controller.js";
statusRouter.get("/", getStatus);
statusRouter.get("/get-names", getName);
statusRouter.post("/new-status", newStatus);
statusRouter.post("/update-status", updateStatus);
statusRouter.post("/delete-status", deleteStatus);

export default statusRouter;
