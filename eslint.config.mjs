import globals from "globals";
import pluginJs from "@eslint/js";


export default [
    { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
    {
        languageOptions: {
            ...globals.browser,
            process: "readonly"
        }
    },
    pluginJs.configs.recommended,
];