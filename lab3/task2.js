// Забезпечити створення нових користувачів програми за
// допомогою клонування базового прототипу користувача. Полями, які
// повинна містити особова картка користувача, можуть бути: логін, пароль,
// ПІБ, вік, місто, колір шрифту для спілкування у чаті тощо.

//Prototype

// class User {
//     constructor() { }
// }
function User() { }

User.prototype.name;
User.prototype.age;
User.prototype.hometown;
User.prototype.getName = function () { return this.name; }
User.prototype.setName = function (name) { this.name = name; }
User.prototype.getAge = function () { return this.age; }
User.prototype.setAge = function (age) { this.age = age; }
User.prototype.getHometown = function () { return this.hometown; }
User.prototype.setHometown = function (hometown) { this.hometown = hometown; }

let alex = new User;
alex.setName("Alex");
alex.setAge(24);
alex.setHometown("Rivne");

let mia = new User;
mia.setName("Mia");
mia.setAge(19);
mia.setHometown("Kyiv");

console.log();
console.log("Name: ", alex.getName());
console.log("Age: ", alex.getAge());
console.log("Hometown: ", alex.getHometown());
console.log();

console.log("Name: ", mia.getName());
console.log("Age: ", mia.getAge());
console.log("Hometown: ", mia.getHometown());