function write(filePath, string) {
    const fs = require('fs');
    fs.writeFileSync(filePath, string);
}
function read(filePath) {
    const fs = require('fs');
    let file = fs.readFileSync(filePath);
    let string = file.toString();
    return string;
}

class File {
    constructor() {
        this.text;
    }
    read(filePath) {
        this.text = read(filePath);
    }
    save(filePath) {
        write(filePath, this.text);
        this.show(filePath);
        return;
    }
    show(filePath) {
        console.log(read(filePath))
    }
}
class Decorator extends File {
    constructor(file) {
        super();
        this.file = file;
    }
    save(filePath) { };
}
class noSpacesDecorator extends Decorator {
    constructor(file) {
        super();
        this.file = file;

    }
    save(filePath) {
        let txt = this.file.text.replace(/ /g, "");
        write(filePath, txt);
        this.show(filePath);
        return;
    }
}
class changedDecorator extends Decorator {
    constructor(file) {
        super();
        this.file = file;
    }
    save(filePath) {
        let txt = this.file.text.replace(/t/g, "p");
        txt = txt.replace(/m/g, "d");
        txt = txt.replace(/h/g, "q");
        txt = txt.replace(/k/g, "c");
        txt = txt.replace(/a/g, "l");
        txt = txt.replace(/e/g, "a");
        txt = txt.replace(/i/g, "e");
        write(filePath, txt);
        this.show(filePath);
        return;
    };
}
let file = new File();
file.read("data/read.txt");
file.save("data/file1.txt");
let D1 = new noSpacesDecorator(file);
D1.save("data/file2.txt")
let D2 = new changedDecorator(file);
D2.save("data/file3.txt")
