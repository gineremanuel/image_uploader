// src/services/book.service.ts
import { IBook, IBookRepository } from "../interfaces/book.interface";
import { BookRepository } from "../repositories/book.repository";

export class BookService {
    private repository: IBookRepository;

    constructor() {
        this.repository = new BookRepository();
    }

    async getAllBooks(): Promise<IBook[]> {
        return this.repository.findAll();
    }

    async getBookById(id: number): Promise<IBook | null> {
        const book = await this.repository.findById(id);
        if (!book) {
            throw new Error("Book not found");
        }
        return book;
    }

    async createBook(bookData: IBook): Promise<IBook> {
        if (!bookData.isbn) {
            throw new Error("ISBN is required");
        }
        return this.repository.create(bookData);
    }

    async updateBook(id: number, bookData: IBook): Promise<IBook> {
        const existingBook = await this.repository.findById(id);
        if (!existingBook) {
            throw new Error("Book not found");
        }
        return this.repository.update(id, bookData);
    }

    async deleteBook(id: number): Promise<void> {
        const existingBook = await this.repository.findById(id);
        if (!existingBook) {
            throw new Error("Book not found");
        }
        await this.repository.delete(id);
    }
}