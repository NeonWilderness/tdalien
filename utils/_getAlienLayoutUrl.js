/**
 * Get the Aliens LayoutUrl of a Twoday blog with admin access auth
 * ================================================================
 * 
 */

/**
 * Return the alien layout url
 * @param blog string name of the twoday blog with admin access
 * @returns string url of the blog's export layout
 */
const getAlienLayoutUrl = blog => {
  return `https://${blog}.twoday.net/layouts/alien/`;
};

module.exports = getAlienLayoutUrl;