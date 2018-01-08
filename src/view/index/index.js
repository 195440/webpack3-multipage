import '../../common/css/style.css'
import './style.css'
import Icon from '../../common/img/piano.png'
import Data from '../../common/data/data.xml';
import printMe from '../../common/js/print.js';
import $ from '../../common/js/jquery-vendor.js';

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

$('#btn').click(function(){
  alert('test')
})