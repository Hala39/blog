import { Author } from "./author";

export class Blog {
    constructor(id: number, category: string, imageUrl: string, postDate: Date, title: string, body: string, author: Author) {
        this.id = id,
        this.category = category,
        this.imageUrl = imageUrl,
        this.postDate = postDate,
        this.title = title,
        this.body = body,
        this.author = author
    }

    id: number;
    category: string;
    imageUrl: string;
    postDate: Date;
    title: string;
    body: string;
    author: Author;

}
