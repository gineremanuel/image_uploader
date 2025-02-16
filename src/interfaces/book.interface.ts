export interface IBook {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  publishYear: number;
}

export interface IBookRepository {
  findAll(): Promise<IBook[]>;
  findById(id: number): Promise<IBook | null>;
  create(book: IBook): Promise<IBook>;
  update(id: number, book: IBook): Promise<IBook>;
  delete(id: number): Promise<void>;
}