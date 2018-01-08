import '../../common/css/style.css'
import Icon from '../../common/img/piano.png'
import Data from '../../common/data/data.xml';
import printMe from '../../common/js/print.js';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML = _.join(['Hell89o', 'webpack'], ' ');
  element.classList.add('hello');

  // 将图像添加到我们现有的 div。
  var myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  console.log(Data); // 控制台输出导入的数据xml

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());

let a = 111;  
let b = 222;  
var xxx = (c,d) => c*d;  
console.log(xxx(a,b));  