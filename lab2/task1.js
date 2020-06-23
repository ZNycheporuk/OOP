class Man {
    static men = [];
    constructor(name, admin) {
        this.name = name;
        this.admin = admin;
        Man.men.push(this);
    }
}
class Message {
    constructor(text, status) {
        this.text = text;
        this.toEveryone = status;
    }
}
class Proxy {
    send(message) {
        if (message.toEveryone == true) {
            Man.men.forEach(man => {
                console.log("To: " + man.name);
                console.log("Message: " + message.text + "\n");
            })
            return;
        }
        Man.men.forEach(man => {
            if (man.admin) {
                console.log("To: " + man.name);
                console.log("Message: " + message.text + "\n");
            }
        })
    }
}
let m1 = new Man("Carl", true);
let m2 = new Man("Andre", false);
let m3 = new Man("Nick", true);
let m4 = new Man("John", true);
let m5 = new Man("Alex", false);

let message1 = new Message("Hello!", true);
let message2 = new Message("You are the chosen one", false);

let sender = new Proxy();

sender.send(message1);
sender.send(message2);