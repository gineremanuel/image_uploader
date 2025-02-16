import { Repository } from "typeorm";
import { Book } from "../entities/book.entity";
import { IBook, IBookRepository } from "../interfaces/book.interface";
import { AppDataSource } from "../config/database";

export class BookRepository implements IBookRepository {
    private repository: Repository<Book>;

    constructor() {
        this.repository = AppDataSource.getRepository(Book);
    }

    async findAll(): Promise<IBook[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<IBook | null> {
        return this.repository.findOneBy({ id });
    }

    async create(book: IBook): Promise<IBook> {
        const newBook = this.repository.create(book);
        return this.repository.save(newBook);
    }

    async update(id: number, book: IBook): Promise<IBook> {
        await this.repository.update(id, book);
        return this.repository.findOneBy({ id }) as Promise<IBook>;
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}