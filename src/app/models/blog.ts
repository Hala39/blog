import { Author } from "./author";

export class Blog {
    constructor(category: string, imageUrl: string, postDate: Date, title: string, description: string, body: string, author: Author) {
        this.category = category,
        this.imageUrl = imageUrl,
        this.postDate = postDate,
        this.title = title,
        this.description = description,
        this.body = body,
        this.author = author,
        this.id = this.generateId()
    }

    id: string;
    category: string;
    imageUrl: string;
    postDate: Date;
    title: string;
    body: string;
    description: string;
    author: Author;

    private generateId = () : string => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
}
