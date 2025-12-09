// let x = 45
// [ LetToken, IdentifierTk, EqualsToken, NumberToken ]

export enum TokenType {
    Number,
    Identifier,
    String,

    Func,
    Return,

    OpenParen, ClosedParen,
    OpenBrace, ClosedBrace,

    Equals,
    Let,
    BinaryOperator,

    Comma,
    Semicolon
}

const KEYWORDS: Record<string, TokenType> = {
    "let": TokenType.Let,
    "func": TokenType.Func,
    "return": TokenType.Return
}

export interface Token {
    value: string;
    type: TokenType;
}

function token (value = "", type: TokenType): Token {
    return { value, type };
}

function isAlpha (src: string) {
    return src.toUpperCase() !=  src.toLowerCase();
}

function isSkippable (str: string) {
    return str == ' ' || '\n' || '\t';
}

function isInt (str: string) {
    const c = str.charCodeAt(0); 
    const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
    return (c >= bounds[0] && c <= bounds[1]);
}

export function tokenize (sourceCode: string): Token[] {
    const tokens = new Array<Token>;
    const src = sourceCode.split("");

    while (src.length > 0) {
        if (src[0] == '(') {
            tokens.push(token(src.shift(), TokenType.OpenParen));
        } else if (src[0] == ')') {
            tokens.push(token(src.shift(), TokenType.ClosedParen));
        } else if (src[0] == '{') {
            tokens.push(token(src.shift(), TokenType.OpenBrace));
        } else if (src[0] == '}') {
            tokens.push(token(src.shift(), TokenType.ClosedBrace));
        } else if (src[0] == '+' || src[0] == '-' || src[0] == '*' || src[0] == '/') {
            tokens.push(token(src.shift(), TokenType.BinaryOperator));
        } else if (src[0] == '=') {
            tokens.push(token(src.shift(), TokenType.Equals));
        } else if (src[0] == ',') {
            tokens.push(token(src.shift(), TokenType.Comma));
        } else if (src[0] == ';') {
            tokens.push(token(src.shift(), TokenType.Semicolon));
        } else {
            // Multi-character Tokens
            if (isInt(src[0])) {
                let num = "";
                while (src.length > 0 && isInt(src[0])) {
                    num += src.shift();
                }

                tokens.push(token(num, TokenType.Number));
            } else if (isAlpha(src[0])) {
                let ident = "";
                while (src.length > 0 && isAlpha(src[0])) {
                    ident += src.shift();
                }

                // Check KEYWORDS First
                const reserved = KEYWORDS[ident];
                if (reserved == undefined) {
                    tokens.push(token(ident, TokenType.Identifier));
                } else {
                    tokens.push(token(ident, reserved));
                }
                
            } else if (isSkippable(src[0])) {
                src.shift() // Skips Current Character
            } else {
                console.log("Unrecognized Character Found In Src: ", src[0]);
                Deno.exit(1);
            }
        }
    }
        

    return tokens;
} 

const source = await Deno.readTextFile("./Examples/test_1.txt");
for (const token of tokenize(source)) {
    console.log(token);
}