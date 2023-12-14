import express from "express";
import { createCategoryController, deleteCategoryController, getCategoryController, getSingleCategoryController } from "../Controller/CategoryController.js";
import { VerifyAdmin } from "../Helper/AdminVerify.js";
import { VerifyToken } from "../Helper/VerifyToken.js";

const CategoryRoutes = express.Router();

CategoryRoutes.post("/create-category", VerifyToken, VerifyAdmin, createCategoryController)
CategoryRoutes.get("/get-category", getCategoryController)
CategoryRoutes.get("/get-category/:slug", getSingleCategoryController)
CategoryRoutes.delete("/delete-category/:slug", VerifyToken, VerifyAdmin, deleteCategoryController)

export default CategoryRoutes;