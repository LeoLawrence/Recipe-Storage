import express from 'express';
import mongoose from 'mongoose';
import { RecipeModel } from "../models/Recipes.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await RecipeModel.find({}); // finds all recipe models
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.post("/", async (req, res) => {
    const recipe = new RecipeModel(req.body); // matches all the fields.
    try {
        const response = await recipe.save(); // finds all recipe models
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});



export {router as recipeRouter };