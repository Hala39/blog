import { IdGenerator } from './IdGenerator';
export class Author {
    constructor(firstName: string, lastName: string, title: string, imageUrl: string) {
        this.name = `${firstName} ${lastName}`,
        this.title = title,
        this.imageUrl = imageUrl,
        this.id = IdGenerator.generateId()
    }

    id: string;
    name: string;
    title: string;
    imageUrl: string;
    
}