export class Author {
    constructor(id: string, name: string, title: string, imageUrl: string) {
        this.id = id,
        this.name = name,
        this.title = title,
        this.imageUrl = imageUrl
    }

    id: string;
    name: string;
    title: string;
    imageUrl: string;
}