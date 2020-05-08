class Man {
    static men = [];
    constructor(name, admin) {
        this.name = name;
        this.admin = admin;
        Man.men.push(this);
    }
}
class Message {
    constructor(message) {
        this.message = message;
    }
}
class Proxy {
    constructor(object) {
        this.message = object.message;
        this.men = Man.men;
    }
    send() {
        this.men.forEach(man => {
            if(man.admin){
                console.log("To: " + man.name);
                console.log("Message: " + this.message + "\n");
            }
        })
    }
}
let m1 = new Man ("Carl", true);
let m2 = new Man ("Andre", false);
let m3 = new Man ("Nick", true);
let m4 = new Man ("John", true);
let m5 = new Man ("Alex", false);

let sender = new Proxy(new Message("Hello!"));
sender.send();