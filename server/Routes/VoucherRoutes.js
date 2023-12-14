import express from "express";
import { createVoucherController, deleteVoucherController, getVoucherController, getSingleVoucherController } from "../Controller/VoucherController.js";
import { VerifyAdmin } from "../Helper/AdminVerify.js";
import { VerifyToken } from "../Helper/VerifyToken.js";

const VoucherRoutes = express.Router();

VoucherRoutes.post("/create-voucher", VerifyToken, VerifyAdmin, createVoucherController)
VoucherRoutes.get("/get-voucher", getVoucherController)
VoucherRoutes.get("/get-voucher/:slug", getSingleVoucherController)
VoucherRoutes.delete("/delete-voucher/:slug", VerifyToken, VerifyAdmin, deleteVoucherController)

export default VoucherRoutes;