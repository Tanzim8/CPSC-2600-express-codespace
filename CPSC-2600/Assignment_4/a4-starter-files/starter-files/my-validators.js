// 
import validator from "validator";

const validatePizza = (req, res, next) => {
    res.locals.errors = [];

    // ---- SAUCE ----
    const sauce = req.body.sauce;
    const allowedSauces = ["tomato", "alfredo"];
    if (!sauce || !allowedSauces.includes(sauce)) {
        res.locals.errors.push({
            field: "sauce",
            message: "Invalid sauce choice"
        });
    }

    // ---- TOPPINGS (normalize) ----
    let toppings = req.body.toppings;

    if (!toppings) {
        toppings = [];
    } else if (!Array.isArray(toppings)) {
        toppings = [toppings];
    }

    // Count check: 1..3
    if (toppings.length < 1 || toppings.length > 3) {
        res.locals.errors.push({
            field: "toppings",
            message: "Select between 1 and 3 toppings"
        });
    }

    // IMPORTANT: these must match the checkbox value="" in your HTML
    const allowedToppings = [
        "pepperoni",
        "ham",
        "vegetarian-sausage",
        "mushrooms",
        "peppers",
        "olives"
    ];

    const invalid = toppings.find(t => !allowedToppings.includes(t));
    if (invalid) {
        res.locals.errors.push({
            field: "toppings",
            message: "Invalid topping selection"
        });
    }

    // ---- NAME ----
    let name = validator.trim(req.body.name || "");
    if (name.length < 3 || name.length > 30) {
        res.locals.errors.push({
            field: "name",
            message: "Name must be between 3 and 30 characters."
        });
    }

    // ---- EMAIL ----
    let email = validator.trim(req.body.email || "");
    if (!validator.isEmail(email)) {
        res.locals.errors.push({
            field: "email",
            message: "Invalid email address"
        });
    }

    // Save sanitized/normalized values for EJS
    res.locals.formData = { sauce, toppings, name, email };

    // IMPORTANT: do NOT call next(errors)
    next();
};
export default validatePizza;

export const colorValidator = (req, res, next) => {
    const DEFAULT_COLOR = "#fffeed";

    let color = req.query.color;

    // No color provided → default
    if (!color) {
        res.locals.bgColor = DEFAULT_COLOR;
        return next();
    }

    // Normalize
    color = validator.trim(String(color));

    // Remove leading # if present
    const cleanColor = color.startsWith("#")
        ? color.substring(1)
        : color;
        
        // if(color.startsWith("#")){
        //     color.subString(1);
        // }else{
        //     color;
        // }

    // Validate hex color
    if (!validator.isHexColor(cleanColor)) {
        res.locals.bgColor = DEFAULT_COLOR;
        return next();
    }

    // Store validated color WITH #
    res.locals.bgColor = `#${cleanColor.toLowerCase()}`;
    next();
};
