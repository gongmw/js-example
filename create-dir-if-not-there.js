/**
 * @description Checks to see if a directory exists in the users home directory, if not then create it.
 * @author MingWei Gong
 */

const folderpath = '/Users/fengshi/Documents/core';
const pathArr = folderpath.split('/');
let _path = '';
for (let i = 0; i < pathArr.length - 1; i++) {
    if (pathArr[i]) {
        _path += `/${pathArr[i]}`;
        if (!fs.existsSync(_path)) {
            fs.mkdirSync(_path);
        }
    }
}
