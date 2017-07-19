export class City {
    constructor(idCountry, name, x, y) {
        this.idCountry = idCountry;
        this.name = name;
        this.x = x;
        this.y = y;
    } 

    name() {
        return this.name;
    }

    x() {
        return this.x;
    }

    y() {
        return this.y;
    } 
}