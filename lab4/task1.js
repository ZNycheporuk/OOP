// Дано список балів – рейтинг студентів наприкінці семестру. За
// допомогою шаблона проектування «Стратегія» реалізувати механізм
// його перетворення у список оцінок або список заліків-незаліків в
// залежності від того, яка форма контролю передбачена у навчальному
// плані для цього предмета.

class Strategy {
    calculateMark(arr) { }
}
class ConcreteStrategy1 extends Strategy {
    mark() { }
    calculateMark(mat) {
        let res = [];
        mat.forEach(arr => res.push(arr.reduce((a, b) => a + b, 0)));
        return res;
    }
}
class ConcreteStrategy2 extends Strategy {
    credit() { }
    calculateMark(mat) {
        let res = [];
        mat.forEach(arr => {
            let sum = arr.reduce((a, b) => a + b, 0);
            if (sum >= 60) res.push(true);
            else res.push(false);
        });
        return res;
    }
}
class Subject {
    constructor(strategy, marks){
        this.strategy = strategy;
        this.marks = marks;
    }
    result(){
         return this.strategy.calculateMark(this.marks);
    }
}

let mat = [[1, 2, 3, 4, 5],
[10, 12, 30, 4, 15],
[18, 2, 13, 4, 15],
[1, 27, 3, 42, 5],
[11, 2, 39, 4, 5],
[1, 12, 33, 4, 5]];

let strategy = new ConcreteStrategy1;
let oop = new Subject(strategy, mat);

console.log("OOP: ");
oop.result().forEach(el => console.log(el));

let strategy2 = new ConcreteStrategy2;
let psycology = new Subject(strategy2, mat);

console.log("Psycology: ");
psycology.result().forEach(el => console.log(el));