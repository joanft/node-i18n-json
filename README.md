# Node file management for `@angular-localize` generated JSON
Small Node script to handle `@angular-localize` generated JSON. This way you can savely manage i18n translations.

Problem:
`@angular-localize` generates a translation file that:
1. Overrides current translations file.
2. Does not create localized files (es, de, ch, ...)

Script solution:
1. Reads `base.json` file. Which is the generated one.
2. Creates files for each locale configured. Locale `defaultLocale` gets the `base.json` value if key is missing.
3. Get all the keys and adds those to the files
4. Write json file

This is a skeleton script, reay to use and prepared to be modified and used into your project workflow.

# Run
`node index.js`

#Test online
Run this code on [Stackblitz](stackblitz.com/edit/node-i18n-json).
