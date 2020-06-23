const textarea = document.getElementById("note");
const addBtn = document.getElementById("addLine");
const removeBtn = document.getElementById("removeLine");
const repeatBtn = document.getElementById("repeat");
class Command {
    constructor() { }
    execute() { };
}
class AddLineCommand extends Command {

    constructor(text) {
        super();
        this.backup = text;
    }
    execute() {
        if (textarea.value == "") {
            textarea.value += this.backup;
        } else {
            textarea.value += ("\n" + this.backup);
        }
        return true;
    }

}
class RemoveLineCommand extends Command {

    constructor() {
        super();
    }

    execute() {
        let lines = textarea.value.split("\n");
        lines.pop();
        textarea.value = (lines.join('\n'))
        return true;
    }
}
class Editor {
    constructor() {
        this.history = [];
    }

    executeCommand(command) {
        if (command.execute()) {
            this.history.push(command);
        }
    }
    init() {
        addBtn.addEventListener("click", () => {
            this.executeCommand(new AddLineCommand(document.getElementById("line").innerText))
        })
        removeBtn.addEventListener("click", () => {
            this.executeCommand(new RemoveLineCommand())
        })
        repeatBtn.addEventListener("click", () => {
            addBtn.disabled = true;
            removeBtn.disabled = true;
            textarea.value = "";
            let i = 0;
            function rec(commands) {
                console.log(i, commands[i]);
                commands[i].execute();
                i++;
                if (i < commands.length) setTimeout(() => rec(commands), 500);
                else {
                    addBtn.disabled = false;
                    removeBtn.disabled = false;
                }
            }
            rec(this.history);

        })
    }
}
/////////////
let editor = new Editor;
window.onload = () => editor.init();
