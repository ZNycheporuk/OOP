// За допомогою шаблона проектування побудувати генератор
// комплектів пам’яток для студентів, які можуть роздаватися у приймальній
// комісії. Наприклад, для студентів-першокурсників до комплекту
// включають карту університету, список необхідних телефонів служб
// університету та факультету, інформацію щодо програми навчання до
// ступеня «бакалавра», основні правила навчання в вузі (за що відраховують,
// за що видають червоний диплом тощо). Для студентів-магістрів до
// комплекту включають програму навчання до ступеня «магістр», загальні
// поради щодо написання наукових статей, магістерської дисертації тощо.
// Сформувати по N комплектів обох видів.

//builder
class Booklet {
    constructor() {
        this.bookletType;
        this.introduction;
        this.content;
        this.advice;
        this.map;
    }
}

class Builder {

    createBooklet() {
        this.booklet = new Booklet;
    }
    setBookletType() { };
    setIntroduction() { };
    setContent() { };
    setAdvice() { };
    setMap() { };
    dispatchBooklet() {
        return this.booklet;
    }

}

class BachelorBuilder extends Builder {
    setBookletType() {
        this.booklet.bookletType = "Bachelor";
    }
    setIntroduction() {
        this.booklet.introduction = "Bachelor introduction";
    }
    setContent() {
        this.booklet.content = "Bachelor content";
    }
    setAdvice() {
        this.booklet.advice = "Bachelor advice";
    }
    setMap() {
        this.booklet.map = "Bachelor map";
    }
}
class MagisterBuilder extends Builder {
    setBookletType() {
        this.booklet.bookletType = "Magister";
    }
    setIntroduction() {
        this.booklet.introduction = "Magister introduction";
    }
    setContent() {
        this.booklet.content = "Magister content";
    }
    setAdvice() {
        this.booklet.advice = "Magister advice";
    }
    setMap() {
        this.booklet.map = "Magister map";
    }
}
class Director {
    generateBooklet(bookletBuilder) {
        bookletBuilder.createBooklet();
        bookletBuilder.setBookletType();
        bookletBuilder.setIntroduction();
        bookletBuilder.setContent();
        bookletBuilder.setAdvice();
        bookletBuilder.setMap();
        return bookletBuilder.dispatchBooklet();
    }
}

let bachelorBuilder = new BachelorBuilder;
let dir = new Director;
let bachelorBooklet = dir.generateBooklet(bachelorBuilder);
console.log(JSON.stringify(bachelorBooklet, null, 2))

let magisterBuilder = new MagisterBuilder;
let magisterBoooklet = dir.generateBooklet(magisterBuilder);
console.log(JSON.stringify(magisterBoooklet, null, 2))
