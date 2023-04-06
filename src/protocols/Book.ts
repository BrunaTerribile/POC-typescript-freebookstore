export type BookEntity = {
    id: number,
    name: string,
    author: string,
    userId?: number,
    avaiable: boolean,
}

export type Book = Omit<BookEntity, "id" | "avaiable">