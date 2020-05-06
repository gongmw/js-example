// 例如：[1，2，4，4，3，3，1，5，3]
// 输出：[1，3，4]
let arr = [1, 2, 4, 4, 3, 3, 1, 5, 3];

// 方法一
function repeat1(arr){
	var result = [], map = {};
	arr.map(function(num){
	if(map[num] === 1) result.push(num); // 等于1说明之前出现过一次 这次重复出现了
		map[num] = (map[num] || 0) + 1; // 微妙之处 开始第一次出现无值 记为 0 + 1 = 1 下一次从1开始累加
	});
	return result;
}
console.log(repeat1(arr));

// 方法二

function repeat(arr) {
    let result = arr.filter((x, i, self) => {
        return self.indexOf(x) === i && self.lastIndexOf(x) !== i
    }); 
    return result;
}
console.log(repeat(arr));
