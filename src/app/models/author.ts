export class Author {
    constructor(firstName: string, lastName: string, title: string, imageUrl: string) {
        this.name = `${firstName} ${lastName}`,
        this.title = title,
        this.imageUrl = imageUrl,
        this.id = this.generateId()
    }

    id: string;
    name: string;
    title: string;
    imageUrl: string;

    private generateId = () : string => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    
}