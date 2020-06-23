class IComposite {
    constructor(name) {
        this.name = name;
    }
    add() { };
    get() { };
    count() { };
    getCodes() { };
}
class Composite extends IComposite{
    constructor(name) {
        super();
        this.name = name;
        this.contains = [];
    }
    add(object) {
        if (object instanceof (IComposite)) {
            this.contains.push(object);
            return
        }
        console.log('\"' + object + '\"', "is not instance of IComposite")
    }
    get() {
        console.log(JSON.stringify(this, null, 2));
    }
    count() {
        let result = this.getCodes()
        return {
            all: result.length,
            unic: new Set(result).size
        }
    }
    getCodes() {
        const res = [];
        this.contains.forEach(element =>
            res.push(...element.getCodes())
        );
        return res;
    }
}

class Book extends IComposite {
    static books = {};

    static counter = {
        nextId: 1,
        nextCode: "F1D2B3A"
    };

    static checkBook(name) {
        return Book.books[name];
    }

    static getCode(name) {
        let check = Book.checkBook(name);
        if (check) {
            return check;
        }
        let code = Book.counter.nextCode;
        Book.counter.nextCode = (parseInt(code, 16) + 1).toString(16).toUpperCase();
        return code;
    }

    constructor(name) {
        super();
        this.name = name;
        this.id = Book.counter.nextId++;
        this.code = Book.getCode(name);
        Book.books[name] = this.code;
    }
    getCodes() {
        return [this.code];
    }
}


let library = new Composite("My library");
let section = new Composite("First section");
let section2 = new Composite("Second section");

let rack1 = new Composite("First rack");
let rack2 = new Composite("Second rack");
let rack3 = new Composite("Third rack");

let shelf1 = new Composite("First shelf");
let shelf2 = new Composite("Second shelf");
let shelf3 = new Composite("Third shelf");

let book1 = new Book("First book");
let book2 = new Book("Second book");
let book3 = new Book("First book");
let book4 = new Book("Third book");

library.add(section);
library.add(section2);

section.add(rack1);
section.add(rack2);
section2.add(rack3);

section.add("Not Composite");


rack1.add(shelf1);
rack1.add(shelf2);
rack2.add(shelf3);

shelf1.add(book1);
shelf1.add(book2);
shelf2.add(book3);
shelf3.add(book4);


section.get();

console.log(library.count());
console.log(rack1.count());