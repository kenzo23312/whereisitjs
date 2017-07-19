export class Country {
    constructor(id, name, r, g, b) {
        this.id = id;
        this.name = name;
        this.r = r;
        this.g = g;
        this.b = b;
    }

    id() {
        return this.id;
    }

    name() {
        return this.name;
    }

    r() {
        return this.r;
    }

    g() {
        return this.g;
    }

    b() {
        return this.b;
    }
}