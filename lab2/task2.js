class Candidates {
    static candidates = [{ name: "Nycheporuk", votes: 0 }, { name: "Petrenko", votes: 0 }, { name: "Symonovych", votes: 0 }];
    static show() {
        console.log("\nChoose your candidate: \n")
        Candidates.candidates.forEach(candidate => console.log("Name: " + candidate.name));
    }
    static votes() {
        console.log("\n\nResults: \n")
        Candidates.candidates.forEach(candidate => console.log("Name: " + candidate.name + "   Votes: " + candidate.votes));

    }
}
class Man {
    static men = [];
    constructor(name) {
        this.name = name;
        this.voted = false;
        Man.men.push(this);
    }
    vote(name) {
        this.voted = true;
        let candidate = Candidates.candidates.find(candidate => candidate.name == name);
        candidate.votes++;
    }
}
let m1 = new Man ("Carl");
let m2 = new Man ("Andre");
let m3 = new Man ("Nick");
let m4 = new Man ("John");
let m5 = new Man ("Alex");
Candidates.show();
m1.vote("Nycheporuk");
m2.vote("Petrenko");
m3.vote("Symonovych");
m4.vote("Nycheporuk");
m5.vote("Nycheporuk");
Candidates.votes();
