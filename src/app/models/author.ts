export class Author {
    constructor(firstName: string, lastName: string, title: string, imageUrl: string) {
        this.name = `${firstName} ${lastName}`,
        this.title = title,
        this.imageUrl = imageUrl
    }

    id: string;
    name: string;
    title: string;
    imageUrl: string;
    
}