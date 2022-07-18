const { Logger, ErrorList } = require('../helpers/index');
const path = require('path');

/**
 * Returns list of errors
 *
 * @async
 * @function GetErrorList
 * @returns {object} - list of errors
 * @author dev-team
 */

const GetErrorList = async () => {
  try {
    return { errors: ErrorList.errorList };
  } catch (exc) {
    Logger.log('error', `Error in GetErrorList in ${path.basename(__filename)}: ${JSON.stringify(exc)}`);
    throw exc;
  }
};

module.exports = {
  GetErrorList
};
