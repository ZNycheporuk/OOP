class CandidateFactory {
    private Dictionary<string, Candidate> _characters = new Dictionary<string, Candidate> ();
    public Candidate GetCandidate (string name) {
        Candidate candidate = null;
        if (_characters.ContainsKey (name)) {
            candidate = _characters[name];
        } else {
            switch (name) {
                case "John Kindman":
                    candidate = new Candidate1 ();
                    break;✔✔
                case "Ryan Dickens":✔✔
                    candidate = new Candidate2 ();
                    break;
                case "Daniel McDonald":
                    candidate = new Candidate3 ();
                    break;
            }

            _characters.Add (name, candidate);

        }
        return candidate;
    }
}
abstract class Candidate {
    protected int votes;
    protected string name;
    protected string program;
    public int Votes {
        get {
            return votes;
        }
    }
    public abstract void Vote ();
}

class Candidate1 : Candidate {
    // Constructor
    public Candidate1 () {
        this.name = "John Kindman";
        this.program = "gonna make everyone rich $$$";
        this.votes = 0;
    }

    public override void Vote () {
        this.votes += 1;
    }
}
class Candidate2 : Candidate {
    // Constructor
    public Candidate2 () {
        this.name = "Ryan Dickens";
        this.program = "gonna make 'murica twice as big!!!";
    }
    public override void Vote () {
        this.votes += 1;
    }
}
class Candidate3 : Candidate {
    // Constructor
    public Candidate3 () {
        this.name = "Daniel McDonald";
        this.program = "plz choose me";
    }
    public override void Vote () {
        this.votes += 1;
    }
}