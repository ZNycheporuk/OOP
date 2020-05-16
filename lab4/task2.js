// Процес приготування різних блюд з однакового набору продуктів
// складається з таких етапів: взяти певну (невелику) кількість продуктів,
// помити їх, нарізати – це спільні етапи. Сам процес приготування: або
// просто змішати нарізане, або зажарити, або зварити тощо – даний етап
// для кожного рецепту свій . Останній етап – додати сіль, цукор, різни
// приправи за смаком – також може бути реалізований по-різному. Блюда
// для приготування з одного і того самого набору продуктів придумати
// самостійно. Показати реалізацію як мінімум трьох блюд.

// Шаблонний метод

// гречка з котлетами 
// гречаники
// гречка із м'ясною зажаркою та яйцем

class Dish {
    Operation1() {
        return "Boiling buckwheat";
    }
    Operation2() {
        return "Grinding meet";
    }
    Operation3() {
        return "Break the eggs";
    }
    Operation4() { }
    Operation5() {
        return "Fry it";
    }
    Operation6() {
        return "Put the resulting products on a plate"
    }

}

class FirstDish extends Dish {
    Operation4() {
        return "Mix meat with eggs, add spices";
    }
}
class SecondDish extends Dish {

    Operation4() {
        return "Mix meat with eggs and buckwheat, add spices";
    }
}
class ThirdDish extends Dish {

    Operation3() {
        return "Add spices to meet \nFry it"
    }
    Operation4() {
        return "Break the eggs"
    }

}
class Algorithm {
    TemplateMethod(dish) {
        console.log();
        console.log(dish.Operation1());
        console.log(dish.Operation2());
        console.log(dish.Operation3());
        console.log(dish.Operation4());
        console.log(dish.Operation5());
        console.log(dish.Operation6());
    }
}

let a = new Algorithm();
a.TemplateMethod(new FirstDish());
a.TemplateMethod(new SecondDish());
a.TemplateMethod(new ThirdDish());