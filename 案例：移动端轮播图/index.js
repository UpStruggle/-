window.addEventListener("load", function () {
  var focus = document.querySelector(".focus");
  var ul = focus.children[0];
  //获得focus 的宽度
  var w = focus.offsetWidth;
  var ol = focus.children[1];
  //1.利用定时器自动轮播图片
  var index = 0;
  var timer = setInterval(function () {
    index++;
    var translateX = -index * w;
    ul.style.transition = "all .3s"; //添加过渡效果
    ul.style.transform = "translateX(" + translateX + "px)";
  }, 2000);

  //等到过渡完成后再去判断，就是过渡完成后判断 监听渡完成事件 transitionend
  ul.addEventListener("transitionend", function () {
    //2.无缝滚动
    //判断条件：如果索引号大于等于3 就说明走到了最后一张图片，此时索引号要复原为0
    if (index >= 3) {
      index = 0;
      //此时去除过渡效果，让ul快速的跳到目标位置
      ul.style.transition = "none";
      //利用最新的索引乘以宽度 去滚动图片
      var translateX = -index * w;
      ul.style.transform = "translateX(" + translateX + "px)";
    } else if (index < 0) {
      index = 2;
      //此时去除过渡效果，让ul快速的跳到目标位置
      ul.style.transition = "none";
      //利用最新的索引乘以宽度 去滚动图片
      var translateX = -index * w;
      ul.style.transform = "translateX(" + translateX + "px)";
    }
    //3.小圆点跟随变化效果
    //把ol里面li带有current 类名的选出来去除类名 remove
    ol.querySelector("li.current").classList.remove("current");
    //让当前索引号的li加上 current   add
    ol.children[index].classList.add("current");
  });

  //4.手指滑动轮播图
  //触摸元素 touchstart  获取手指初始坐标
  var startX = 0;
  var moveX = 0;
  var flag = false;
  ul.addEventListener("touchstart", function (e) {
    startX = e.targetTouches[0].pageX;
    clearInterval(timer); //手指触摸时停止定时器
  });

  //移动手指 touchmove 计算手指的滑动距离，并且移动盒子
  ul.addEventListener("touchmove", function (e) {
    //计算手指移动距离 ： 手指移动之后的坐标减去原来的坐标
    moveX = e.targetTouches[0].pageX - startX;
    //移动盒子 盒子原来的位置 + 手指移动的距离
    var translateX = -index * w + moveX;
    //手指拖动的时候不需要动画效果，所以要取消过渡效果
    ul.style.transition = "none";
    ul.style.transform = "translateX(" + translateX + "px)";
    flag = true; //如果用户手指移动过，再去判断，否则不做判断效果
    e.preventDefault(); //阻止滚动屏幕的效果
  });

  //离开手指 touchend  根据滑动距离分不同情况
  ul.addEventListener("touchend", function (e) {
    if (flag) {
      //(1)如果移动距离大于50像素，就上一张/下一张 滑动
      if (Math.abs(moveX) > 50) {
        //添加绝对值，因为可能是负值
        if (moveX > 0) {
          //moveX 是正值 就是右滑 播放上一张
          index--;
        }
        //moveX 是负值 就是左滑 播放下一张
        else {
          index++;
        }
        var translateX = -index * w;
        ul.style.transition = "all .3s";
        ul.style.transform = "translateX(" + translateX + "px)";
        //(2)如果移动距离小于50像素，就回弹原来的位置
      } else {
        var translateX = -index * w;
        ul.style.transition = "all .1s";
        ul.style.transform = "translateX(" + translateX + "px)";
      }
    }
    //手指离开 重新开始定时器
    clearInterval(timer); //开之前先清除
    timer = setInterval(function () {
      index++;
      var translateX = -index * w;
      ul.style.transition = "all .3s"; //添加过渡效果
      ul.style.transform = "translateX(" + translateX + "px)";
    }, 2000);
  });
});
