import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/database";
import { BookController } from "./controllers/book.controller";

const app = express();
app.use(express.json());

const bookController = new BookController();

app.get("/books", bookController.getAll);
app.get("/books/:id", bookController.getById);
app.post("/books", bookController.create);
app.put("/books/:id", bookController.update);
app.delete("/books/:id", bookController.delete);

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");
        app.listen(3010, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((error) => console.log(error));