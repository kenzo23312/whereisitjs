export class Question {
    constructor(question, a, b, c, d, correct) {
        this.question = question;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.correct = correct;
    } 

    question() {
        return this.question;
    }

    a() {
        return this.a;
    }

    b() {
        return this.b;
    }

    c() {
        return this.c;
    }

    d() {
        return this.d;
    }

    correct() {
        return this.correct;
    }
}