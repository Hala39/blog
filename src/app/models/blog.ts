import { Author } from "./author";
import { IdGenerator } from "./IdGenerator";

export class Blog {
    constructor(category: string, imageUrl: string, postDate: Date, 
        title: string, description: string, body: string, author: Author, id?: string) {
        this.category = category,
        this.imageUrl = imageUrl,
        this.postDate = postDate,
        this.title = title,
        this.description = description,
        this.body = body,
        this.author = author,
        this.id = id ? id : IdGenerator.generateId()
    }

    id: string;
    category: string;
    imageUrl: string;
    postDate: Date;
    title: string;
    body: string;
    description: string;
    author: Author;
}
