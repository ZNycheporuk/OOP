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
    constructor(filePath) {
        this.text = read(filePath);
    }
    save(filePath) {
        write(filePath, this.text);
        return;
    }
    saveWithoutSpaces(filePath) {
        let txt = this.text.replace(/ /g, "");
        write(filePath, txt);
        return;
    }
    saveChanged(filePath){
        let txt = this.text.replace(/t/g, "p");
        txt = txt.replace(/m/g, "d");
        txt = txt.replace(/h/g, "q");
        txt = txt.replace(/k/g, "c");
        txt = txt.replace(/a/g, "l");
        txt = txt.replace(/e/g, "a");
        txt = txt.replace(/i/g, "e");
        write(filePath, txt);
        return;
    }
}
let file = new File("data/read.txt");
file.save("data/file1.txt");
file.saveWithoutSpaces("data/file2.txt");
file.saveChanged("data/file3.txt");
