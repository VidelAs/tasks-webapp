import express from "express";

const userRouter = express.Router();
import {
  deleteUser,
  getNames,
  getUsers,
  newUser,
  updateUser,
} from "../controller/user-controller.js";
userRouter.get("/", getUsers);
userRouter.get("/get-names", getNames);
userRouter.post("/new-user", newUser);
userRouter.post("/update-user", updateUser);
userRouter.post("/delete-user", deleteUser);

export default userRouter;
