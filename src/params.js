/**
 * Extract all user set alien options from the saved skin but only keep valid ones
 * @param {*} savedParams User skin content of Site.implant including all user alien options
 * @param {*} options current fresh set of options after release upgrade (first run)
 * @returns {array} of {key, setting} e.g. {key: 'debug', setting: 'false'}
 */
const extractSavedParams = (savedParams, options) => {
  const optionStrings = savedParams.match(/[a-zA-Z]*\s*:\s*.*/g) || [];
  return optionStrings.reduce((all, item) => {
    let param = item.trim();
    if (param.slice(-1) === ',') param = param.slice(0, -1);
    const parts = param.split(':');
    const key = parts[0].trim();
    if (key in options) {
      const setting = parts.slice(1).join(':').trim();
      all.push({ key, setting });
    }
    return all;
  }, []);
};

/**
 * Merge user alien options with fresh options from new release into Site.implant skin
 * @param {object} params skin fields from getSkinData (skin.js) incl. fresh skin template in params.skin
 * @param {string} savedParams saved skin content (before upgrade) holds all user alien options
 * @param {object} options parsed fresh options
 * @returns {void} (updated content string is in params.skin)
 */
const updateParamsSkinContent = (params, savedParams, options) => {
  let userAlienOptions = extractSavedParams(savedParams, options);
  console.log('User Alien Options BEFORE Upgrade:\n', userAlienOptions);

  userAlienOptions.forEach(option => {
    const regx = new RegExp(`${option.key}\\s*:\\s*(.*)`);
    const replace = params.skin.match(regx);
    if (replace) {
      const hasComma = replace[0].slice(-1) === ',';
      params.skin = params.skin.replace(replace[0], `${option.key}: ${option.setting}${hasComma ? ',' : ''}`);
    }
  });

  console.log('\nUser Alien Options AFTER Upgrade:\n', extractSavedParams(params.skin, options));
};

export { updateParamsSkinContent };
