class Token{
    constructor(type, value, range) {
        this.type = type;
        this.value = value;
        this.range = range;
    }
}

class Tokenizer {
    init() {
        this.tokens = [];
        this.newToken();
    }
    pushToken(){
        if (this.currentToken.value) {
            this.tokens.push(this.currentToken);
        }
    }
    newToken(type="", value="", range=[0,0,0,0] ) {
        this.currentToken = new Token(type, value, range);
    }
    tokenize(rawText) {
        this.init()
        //const text = editor.getModel().getLinesContent()
        const text = rawText.split("\n");
        let isString = false;
        for (let line=0; line<text.length; line++) {
            ignoreLine:
            for (let column=0; column<text[line].length; column++) {
                if (isString) {
                    this.currentToken.value += text[line][column];
                    this.currentToken.range[2] = line+1;
                    this.currentToken.range[3] = column+2;
                    if (text[line][column] === '"') {
                        isString = false
                        this.pushToken()
                    }
                } else {
                    switch (text[line][column]) {
                        case '"':
                            this.newToken("val", text[line][column], [line+1, column+1, line+1, column+2]);
                            isString = true;
                            break;
                        case " ":
                        case "\t":
                            this.pushToken();
                            this.newToken();
                            break;
                        case ";":
                        case "{":
                        case "}":
                        case "(":
                        case ")":
                            this.pushToken();
                            this.newToken(text[line][column], text[line][column], [line+1, column+1, line+1, column+2]);
                            this.pushToken();
                            this.newToken();
                            break;
                        case "/":
                            if (text[line][column] === "/" && text[line][column+1] === "*") {
                                this.pushToken();
                                this.newToken("/*", "/*", [line+1, column+1, line+1, column+3]);
                                this.pushToken();
                                this.newToken();
                                column+=1;
                                break;
                            }
                            if (text[line][column] === "/" && text[line][column+1] === "/") {
                                this.pushToken();
                                break ignoreLine;
                            }
                        case "*":
                            if (text[line][column] === "*" && text[line][column+1] === "/") {
                                this.pushToken();
                                this.newToken("*/", "*/", [line+1, column+1, line+1, column+3]);
                                this.pushToken();
                                this.newToken();
                                column+=1;
                                break;
                            }
                        default:
                            if (this.currentToken.value) {
                                this.currentToken.value += text[line][column];
                                this.currentToken.range[2] = line+1;
                                this.currentToken.range[3] = column+2;
                            } else {
                                this.newToken("val", text[line][column], [line+1, column+1, line+1, column+2]);
                            }
                            break;
                        
                    }
                }
            }
        }
        return this.tokens;
    }
}

class Parser {
    constructor() {
        this.tokenizer = new Tokenizer();
        this.tokens = [].entries();
    }

    parseComment() {
        let token;
        while (token = this.tokens.next(), !token.done) {
            token = token.value[1]
            switch (token.type) {
                case "*/":
                    return;
            }
        }
        console.error("No closing tag for multiline comment.")
    }

    parseArr(){
        let token;
        let stack = []
        while (token = this.tokens.next(), !token.done) {
            token = token.value[1]
            switch (token.type) {
                case "/*":
                    this.parseComment()
                    break;
                case "{":
                    stack.push(this.parseObj())
                    break;
                case "(":
                    const foamArray = this.parseArr()
                    const closingToken = foamArray.pop()
                    stack.push(new Token("array", foamArray, [token.range[0], token.range[1], closingToken.range[2], closingToken.range[3]]))
                    break;
                case ")":
                    stack.push(token)
                    return stack
                case "val":
                    stack.push(token)
                    break;
                default:
                    console.error(`Invalid token type: ${token.type}`)
            }
        }
        console.error("No closing parentesis.")
    }

    parseObj(){
        let token;
        let obj = {}
        let stack = []
        while (token = this.tokens.next(), !token.done) {
            token = token.value[1]
            switch (token.type) {
                case "/*":
                    this.parseComment()
                    break;
                case "{":
                    obj[stack[0].value] = this.parseObj()
                    stack = []
                    break;
                case "}":
                    return obj;
                case "(":
                    const foamArray = this.parseArr()
                    const closingToken = foamArray.pop()
                    obj[stack.map((o)=>o.value).join(" ")] = new Token("array", foamArray, [token.range[0], token.range[1], closingToken.range[2], closingToken.range[3]])
                    stack = []
                    break;
                case ";":
                    if (stack.length > 1) {
                        //TODO handle multiple tokens like "myvar uniform 298"
                        obj[stack[0].value] = stack.slice(1);
                        stack = []
                    }
                    break;
                case "val":
                    stack.push(token)
                    break;
                default:
                    console.error(`Invalid token type: ${token.type}`)
            }
        }
        return obj
    }

    parse(text) {
        this.tokens = this.tokenizer.tokenize(text).entries()
        const ast = this.parseObj()
        return ast
    }
}

export default Parser;