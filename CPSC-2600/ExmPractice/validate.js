//i will design middleware which will validate data
import validator from "validator";                  

const validateEntry = (req, res, next) =>{
    res.locals.errors = [];

    let cars = req.body.cars;

    const allowedCars = ["Corolla", "Camry", "Supra", "FourRunner"];

    if(!cars){
        cars = [];
    } else if (!Array.isArray(cars)){
        cars = [cars];
    }

    const invalidCar = cars.find(c => !allowedCars.includes(c));
    if(invalidCar){
        res.locals.errors.push({
            field: "cars",
            message: "Invalid car selection"
        })
    }

    const name = req.body.name;
    if(!name || name.length <3 || name.length >30){
        res.locals.errors.push({
            field: "name",
            message: "Name must be between 3 to 30 characters."
        })
    }

    //email validation

    const email = req.body.email;
    if(!email || !validator.isEmail(email)){
        res.locals.errors.push({
            field: "email",
            message: "Invalid email address"
        });
    }

    //checking an dvalidationg from a bigger array
    let books = req.body.books;

    if(!books){
        books = [];
    }else if (!Array.isArray(books)){
        books = [books];
    }

    if(books.length <1 || books.length >3){
        res.locals.errors.push({
            field: "Books",
            message: "Select between 1 and 3 books"
        })
    }

    const allowedBooks = ["Harry Potter", "Lord of the Rings", "Game of Thrones", "The Hobbit", "The Catcher in the Rye", "To Kill a Mockingbird", "Song of Ice and Fire"];

    // if(!books || !allowedBooks.includes(books)){
    //     res.locals.errors.push({
    //         field: "Books",
    //         message: "Invalid book choice"
    //     })
    // }

    const invalid = books.find(b => !allowedBooks.includes(b));
    if(invalid){
        res.locals.errors.push({
            field: "Books",
            message: "Invalid book selection"
        })
    }
    res.locals.formData = {cars, name, email, books};
    next();
    
};
export default validateEntry;