import express from "express";
import { VerifyToken } from "../Helper/VerifyToken.js";
import {
    attendSingleServiceOrderRequestController, completeSingleServiceOrderRequestController, createNewServiceOrderController,
    getAllServiceOrderRequestsController, getSingleServiceOrderRequestDetailsController
} from "../Controller/ServiceController.js";

const ServiceRoutes = express.Router();

ServiceRoutes.post("/new-order", VerifyToken, createNewServiceOrderController);
ServiceRoutes.get("/get-order", VerifyToken, getAllServiceOrderRequestsController);
ServiceRoutes.get("/get-order/:id", VerifyToken, getSingleServiceOrderRequestDetailsController);
ServiceRoutes.put("/attend-order/:id", VerifyToken, attendSingleServiceOrderRequestController);
ServiceRoutes.put("/complete-order/:id", VerifyToken, completeSingleServiceOrderRequestController);


export default ServiceRoutes;