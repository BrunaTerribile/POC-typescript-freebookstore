export type BookEntity = {
    id: number,
    name: string,
    author: string,
    avaiable: boolean,
    userId?: number
}

export type Book = Omit<BookEntity, "id" | "avaiable">