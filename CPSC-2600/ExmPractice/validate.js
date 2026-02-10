//i will design middleware which will validate data

const validateEntry = (req, res, next) =>{
    res.locals.errors - [];

    const cars = req.body.cars;

    const allowedCars = ["Corolla", "Camry", "Supra", "FourRunner"];

    if(!cars || !allowedCars.includes(cars)){
        res.locals.errors.push({
            field: "cars",
            message: "Invalid car choice"
        });
    }
    res.locals.formData = {cars};
    next();
}