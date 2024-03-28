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

        // no typeParameters here
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

        // has typeParameters here
        assert(
          path.node.expression.typeParameters !== null,
          "ExpressionStatement: type parameters",
        );
      },
    },
  };
};

babel.transformSync(
  `
    someFunction<TSomeType>();
`,
  {
    plugins: ["@babel/plugin-transform-typescript", testPlugin],
    parserOpts: { plugins: ["typescript"] },
    ast: true,
  },
);
