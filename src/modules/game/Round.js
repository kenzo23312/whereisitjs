export class Round {
    constructor(country, city, question) {
        this.country = country;
        this.city = city;
        this.question = question;
    } 

    country() {
        return this.country;
    }

    question() {
        return this.question;
    }

    city() {
        return this.city;
    }

    title() {
        if (this.country) {
            return "Where is " + this.country.name + "?";
        } else if (this.city) {
            return "Where is " + this.city.name + "?";
        }

        return "";
    }
}