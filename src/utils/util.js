/*
 * @Author: 陈三石
 * @Date: 2023-12-28 10:30:55
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-28 10:33:05
 * @Description: 'file content'
 */
// 生成随机颜色
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// 生成随机位置
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getPosition(maxLeft, maxTop) {
  let left = getRandomInt(0, maxLeft);
  let top = getRandomInt(0, maxTop);
  return {
    left,
    top
  };
}

export default {
  getRandomColor,
  getPosition
};
