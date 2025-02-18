import express from 'express';

const eventRouter = express.Router();

eventRouter.route("/create").post();
eventRouter.route("/all-event").get();
eventRouter.route("/:eventId");
eventRouter.route("/delete/:eventId").delete();
eventRouter.route("/updateuser/:eventId").put();

export default eventRouter;