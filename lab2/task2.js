class CandidateFactory {
    constructor() {
        this.candidates = {};
    }
    create(name) {
        let candidate = this.candidates[name];
        if (candidate) return candidate;
        console.count('candidate');
        switch (name) {
            case "Nycheporuk":
                this.candidates[name] = new Candidate1();
                break;
            case "Petrenko":
                this.candidates[name] = new Candidate2();
                break;
            case "Symonovych":
                this.candidates[name] = new Candidate3();
                break;
            default: this.candidates[name] = new Candidate(name);
        }
        return this.candidates[name]
    }
}

class Candidate {
    constructor(name) {
        this.name = name;
        this.votes = 0;
    }
    getVotes() {
        return this.votes;
    }
    vote() {
        this.votes++;
    }
}
class Candidate1 extends Candidate {
    constructor() {
        super();
        this.name = "Nycheporuk";
    }
}
class Candidate2 extends Candidate {
    constructor() {
        super();
        this.name = "Petrenko";
    }
}
class Candidate3 extends Candidate {
    constructor() {
        super();
        this.name = "Symonovych";
    }
}
//////////////////
class Bulleten {
    static Candidates = [];
    constructor(){
        this.candidates = Bulleten.Candidates;
    }
    addCandidate(name){
        Bulleten.Candidates.push(factory.create(name));
    }
    vote(name){
        Bulleten.Candidates.forEach(candidate => {
            if(candidate.name == name) candidate.votes++;
        });
    }
    getVotes(){
        console.log(JSON.stringify(Bulleten.Candidates, null, 2));
    }
}
class Man {
    constructor(name) {
        this.name = name;
        this.voted = false;
        this.Bulleten = new Bulleten();
    }
    vote(name) {
        if(this.voted == true) {
            console.log('You alredy voted');
            return;
        }
        this.voted = true;
        this.Bulleten.vote(name);
    }
}
const factory = new CandidateFactory();

let bulleten = new Bulleten();
bulleten.addCandidate("Nycheporuk");
bulleten.addCandidate("Petrenko");
bulleten.addCandidate("Symonovych");
bulleten.addCandidate("Someone else");

let m1 = new Man ("Carl");
let m2 = new Man ("Andre");
let m3 = new Man ("Nick");
let m4 = new Man ("John");
let m5 = new Man ("Alex");

m1.vote('Nycheporuk');
m2.vote('Petrenko');
m3.vote('Symonovych');
m4.vote('Someone else');
m5.vote('Nycheporuk');

bulleten.getVotes();