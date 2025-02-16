import { IBook } from "../interfaces/book.interface";

export class BookAdapter {
    static toDTO(book: IBook) {
        return {
            id: book.id,
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            publishYear: book.publishYear,
            fullDescription: `${book.title} by ${book.author} (${book.publishYear})`
        };
    }

    static toEntity(dto: any): IBook {
        return {
            title: dto.title,
            author: dto.author,
            isbn: dto.isbn,
            publishYear: parseInt(dto.publishYear)
        };
    }
}