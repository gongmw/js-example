 /**
 * @description use glob traverse of folder
 * @author MingWei Gong
 */

const path = require('path');
const glob = require('glob');
const files = glob.sync(path.resolve('/Users/fengshi/Documents/tix/test/2.7.7', '**'), { nodir: true});
console.log(files)

// nodir: Does not match directories, only files. (note: to match only directories, just add to the end of the pattern)
