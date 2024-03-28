const babel = require("@babel/core");

const assert = (condition, name) => {
  if (!condition) {
    console.log("Assert failed: " + name);
  } else {
    console.log("Assert success: " + name);
  }
};

const BABEL_VERSION = 7;

const testPlugin = (api, options) => {
  api.assertVersion(BABEL_VERSION);

  return {
    visitor: {
      CallExpression: (path) => {
        assert(
          path.node.type === "CallExpression",
          "CallExpression: call type",
        );

        assert(
          path.node.typeParameters !== null,
          "CallExpression: has type parameters",
        );
      },

      ExpressionStatement: (path) => {
        assert(
          path.node.expression.type === "CallExpression",
          "ExpressionStatement: call type",
        );

        assert(
          path.node.expression.typeParameters !== null,
          "ExpressionStatement: type parameters",
        );
      },
    },
  };
};

const res = babel.transformSync(
  `
    someFunction<TSomeType>();
`,
  {
    filename: "file.ts",
    plugins: [
      //"@babel/plugin-syntax-typescript",
      testPlugin,
      // "@babel/plugin-transform-typescript",
    ],
    presets: ["@babel/preset-typescript"],
    ast: true,
  },
);

console.log(res.code);
