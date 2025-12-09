export type NodeType = 
| "Program" 
| "NumericLiteral" 
| "Identifier" 
| "BinaryExpr" 
| "CallExpr" 
| "UnaryExpr" 
| "FunctionDeclaration";

export interface statement {
    kind: NodeType;
}

export interface Program extends statement {
    kind: "Program";
    body: statement[];
}

export interface expression extends statement {}

export interface BinaryExpr extends expression {
    kind: "BinaryExpr";
    left: expression;
    right: expression;
    operator: string;
}

export interface Identifier extends expression {
    kind: "Identifier";
    symbol: string;
}

export interface NumericLiteral extends expression {
    kind: "NumericLiteral";
    symbol: number;
}