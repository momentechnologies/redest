const OFF = 0;
const ERROR = 2;

module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "settings": {
        "react": {
            "version": "15.3.0"
        }
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "parser": "babel-eslint",
    "plugins": [
        "react"
    ],
    "rules": {

        //Possible Errors
        "no-irregular-whitespace": "error",                         //http://eslint.org/docs/rules/no-irregular-whitespace
        "no-regex-spaces": "error",                                 //http://eslint.org/docs/rules/no-regex-spaces

        //Best Practices
        "no-multi-spaces": "error",                                 //http://eslint.org/docs/rules/no-multi-spaces

        //Stylistic Issues
        "no-mixed-spaces-and-tabs": "error",                        //http://eslint.org/docs/rules/no-mixed-spaces-and-tabs
        "no-trailing-spaces": "error",                              //http://eslint.org/docs/rules/no-trailing-spaces

        //JSX
        "jsx-quotes": ["error", "prefer-double"],                   //http://eslint.org/docs/rules/jsx-quotes
        "react/no-deprecated": "error",                             //http://eslint.org/docs/rules/jsx-quotes
        "react/forbid-foreign-prop-types": "error",                 //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-foreign-prop-types.md
        "react/no-children-prop": "error",                          //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-children-prop.md
        "react/no-danger": "error",                                 //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md
        "react/no-did-mount-set-state": "error",                    //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md
       "react/no-did-update-set-state": "error",                   //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md
       "react/no-will-update-set-state": "error",                  //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-will-update-set-state.md
        "react/no-direct-mutation-state": "error",                  //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
        "react/no-multi-comp": ["error", {"ignoreStateless": true}],//https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md
       "react/self-closing-comp": "error",                         //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
        "react/require-render-return": "error",                     //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md
       "react/require-optimization": "warn",                       //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-optimization.md
       "react/no-string-refs": "warn",                             //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
        "react/no-unknown-property": "error",                       //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
        "react/no-unused-prop-types": "error",                      //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md
        "react/prefer-stateless-function": "error",                 //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
        "react/prop-types": "error",                                //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
        "react/react-in-jsx-scope": "error",                        //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
        "react/require-default-props": "error",                     //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
        "react/jsx-closing-bracket-location": "error",              //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
        "react/jsx-curly-spacing": "error",                         //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
        "react/jsx-equals-spacing": "error",                        //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md
        "react/jsx-filename-extension": "error",                    //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
       "react/jsx-first-prop-new-line": ["error", "multiline"],    //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
        "react/jsx-key": "error",                                   //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
       "react/jsx-max-props-per-line": "error",                    //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md
        "react/jsx-no-duplicate-props": "error",                    //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md
        "react/jsx-no-target-blank": "error",                       //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
        "react/jsx-pascal-case": "error",                           //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
        "react/jsx-uses-vars": "error",                             //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md
        "react/jsx-wrap-multilines": "error",                       //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md
        "react/jsx-tag-spacing": ["error", {                        //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md
            "closingSlash": "never",
            "beforeSelfClosing": "never",
            "afterOpening": "never"
        }],

        //ECMAScript 6

        //Other
        "quotes": ["error", "single"],                              //http://eslint.org/docs/rules/quotes
        "no-dupe-args": "error",                                    //http://eslint.org/docs/rules/no-dupe-args
        "constructor-super": "error",                               //http://eslint.org/docs/rules/constructor-super
        "no-fallthrough": "error",                                  //http://eslint.org/docs/rules/no-fallthrough
        "no-new-func": "error",                                     //http://eslint.org/docs/rules/no-new-func
        "func-call-spacing": ["error", "never"],                    //http://eslint.org/docs/rules/func-call-spacing
        "func-name-matching": ["error", "always"],                  //http://eslint.org/docs/rules/func-name-matching
        "space-before-function-paren": ["error", "never"],          //http://eslint.org/docs/rules/space-before-function-paren
        "arrow-body-style": ["error", "as-needed"],                 //http://eslint.org/docs/rules/arrow-body-style
        "arrow-parens": ["error", "always"],                        //http://eslint.org/docs/rules/arrow-parens
        "arrow-spacing": "error"                                    //http://eslint.org/docs/rules/arrow-spacing
    }
};
