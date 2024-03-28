const babel = require("@babel/core");

const assert = (condition, name) => {
  if (!condition) {
    console.log("Assert failed: " + name);
  } else {
    console.log("Assert success: " + name);
  }
};

const res = babel.transformSync(
  `
    someFunction<TSomeType>();
`,
  {
      filename: "file.ts",
    /*  plugins: [
      "@babel/plugin-syntax-typescript",
      //"@babel/plugin-transform-typescript",
    ],*/
    presets: ["@babel/preset-typescript"],
    ast: true,
  },
);

console.log("result:", res.code);

assert(
  res.ast.program.body[0].expression.type === "CallExpression",
  "call type",
);

assert(
  res.ast.program.body[0].expression.typeParameters !== null,
  "has type parameters",
);
