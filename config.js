import StyleDictionary from 'style-dictionary';

const isHigherTierToken = (filePath) => {
  return filePath.includes('tier-2-usage') || filePath.includes('tier-3-component');
};

StyleDictionary.registerFormat({
  name: 'css/custom-variables',
  format: function ({dictionary, platform}) {
    return `:root {
    ${dictionary.allTokens.map((token) => {
      const tokenName = token.name.replace(`${platform.prefix}-`,'');
      if (isHigherTierToken(token.filePath)) {
        return `--${platform.prefix}-theme-${tokenName}: ${token.value};`
      }
      return ` --${platform.prefix}-${tokenName}: ${token.value};`
    }).join('\n')}
}`
  }
});

export default{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "css": {
      "prefix": "ds",
      "transformGroup": "css",
      "buildPath": "build/css/",
      "files": [
        {
          "destination": "_variables.css",
          "format": "css/custom-variables"
        }
      ]
    }
  }
}