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
    parserOpts: { plugins: ["typescript"] },
    plugins: ["@babel/plugin-transform-typescript"],
    ast: true,
  },
);

assert(
  res.ast.program.body[0].expression.type === "CallExpression",
  "call type",
);

// no typeParameters here
assert(
  res.ast.program.body[0].expression.typeParameters !== null,
  "has type parameters",
);
