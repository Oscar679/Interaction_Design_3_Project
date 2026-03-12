import globals from "globals";

export default [
    {
        ignores: [
            "dist/**",
            "dev-dist/**",
            "node_modules/**",
            "public/particles.js",
        ],
    },
    {
        files: ["api/**/*.js", "components/**/*.js", "src/**/*.js", "*.js", "*.ts"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "no-undef": "error",
        },
    },
];
