import { Author } from "./author";

export class Blog {
    constructor(category: string, imageUrl: string,
        title: string, description: string, body: string, author: Author, id?: string) {
        this.category = category,
        this.imageUrl = imageUrl,
        this.title = title,
        this.description = description,
        this.body = body,
        this.author = author,
        this._id = id
    }

    _id: string;
    category: string;
    imageUrl: string;
    postDate: Date;
    title: string;
    body: string;
    description: string;
    author: Author;
}
