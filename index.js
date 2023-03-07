const fs = require('fs');

const config = {
  defaultLocale: 'en-US',
  locales: ['en-US', 'es-ES', 'en-GB'],
  dynamicKeyNS: 'dynamic.',
  sourceFile: './base.json',
};

function getLocaleFilePath(locale) {
  return `./locale.${locale}.json`;
}

function readLocaleFile(locale) {
  const filePath = getLocaleFilePath(locale);
  const exist = fs.existsSync(filePath);
  if (!exist) {
    return {};
  }

  return JSON.parse(fs.readFileSync(filePath));
}

function mergeKeys(source, target, locale) {
  for (const [key, value] of Object.entries(source)) {
    if (target[key]) {
      continue;
    }

    target[key] = locale === config.defaultLocale ? value : '';
  }
}

function removeOldKeys(source, target) {
  Object.keys(target).map((key) => {
    if (
      typeof source[key] === 'undefined' &&
      !key.startsWith(config.dynamicKeyNS)
    ) {
      delete target[key];
    }
  });
}

function sortKeys(data) {
  const sortedKeys = Object.keys(data).sort();
  const dataSorted = {};

  sortedKeys.forEach((key) => {
    dataSorted[key] = data[key];
  });

  return dataSorted;
}

function saveTranslations(data, locale) {
  fs.writeFileSync(getLocaleFilePath(locale), JSON.stringify(data, null, 2));
}

function updateTranslations(source, locale) {
  const localeTranslations = readLocaleFile(locale);
  mergeKeys(source, localeTranslations, locale);
  removeOldKeys(source, localeTranslations);
  saveTranslations(sortKeys(localeTranslations), locale);
}

function main() {
  const source = JSON.parse(fs.readFileSync(config.sourceFile));
  config.locales.forEach((locale) => {
    updateTranslations(source.translations, locale);
  });
}

main();
