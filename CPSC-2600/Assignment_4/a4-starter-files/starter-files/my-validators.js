import express from "express";

const validatePizza = (req, res, next) =>{

    //validation for sauce
    const {sauce} = req.body;
    const allowedSauces = ["tomato", "alfredo"];
    if(!sauce || allowedSauces.includes(sauce)){
        return next(
            {
                status: 400,
                message: "Invalid sauce choice"
            }
        )

    }
    next();
}