// src/controllers/book.controller.ts
import { Request, Response } from "express";
import { BookService } from "../services/book.service";
import { BookAdapter } from "../adapters/book.adapter";

export class BookController {
    private service: BookService;

    constructor() {
        this.service = new BookService();
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const books = await this.service.getAllBooks();
            res.json(books.map(BookAdapter.toDTO));
        } catch (error) {
            res.status(500).json({ message: "Error getting books" });
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const book = await this.service.getBookById(parseInt(req.params.id));
            if (book) {
                res.json(BookAdapter.toDTO(book));
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        } catch (error) {
            res.status(404).json({ message: "Book not found" });
        }
    };

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const bookData = BookAdapter.toEntity(req.body);
            const newBook = await this.service.createBook(bookData);
            res.status(201).json(BookAdapter.toDTO(newBook));
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const bookData = BookAdapter.toEntity(req.body);
            const updatedBook = await this.service.updateBook(parseInt(req.params.id), bookData);
            res.json(BookAdapter.toDTO(updatedBook));
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.service.deleteBook(parseInt(req.params.id));
            res.status(204).send();
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };
}