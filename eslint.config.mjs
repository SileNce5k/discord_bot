import jest from "eslint-plugin-jest";
import globals from "globals";
export default [{
    plugins: {
        jest,
    },

    languageOptions: {
        globals: {
            ...globals.jest,
            ...jest.environments.globals.globals,
        },
    },

    rules: {
        "no-fallthrough": "error",
        "no-case-declarations": "error",
        "no-unused-vars": "warn"
    },
    
},
];




// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
//   {languageOptions: { globals: globals.node }},
//   pluginJs.configs.recommended,
// ];