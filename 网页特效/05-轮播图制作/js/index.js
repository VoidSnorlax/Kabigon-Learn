window.addEventListener('load', function() {
    //1.获取元素
    var arrowl=document.querySelector('.arrow-l');
    var arrowr=document.querySelector('.arrow-r');
    var fouc=document.querySelector('.focus');
    var width=fouc.offsetWidth;//获取大盒子的宽度(因为图片平铺,盒子多大图片多大)
    var num=0;
    var crcle=0;
    //2.鼠标经过显示箭头
    fouc.addEventListener('mouseenter',function (){
        arrowl.style.display='block';
        arrowr.style.display='block';
        clearInterval(time);
        time=null;
    })
    fouc.addEventListener('mouseleave',function (){
        arrowl.style.display='none';
        arrowr.style.display='none';
        time=setInterval(function (){
            arrowr.click();//自动调用
        },2000);
    })
    //3.动态生成底部表示园
    var ul=fouc.querySelector('ul');//获取div:fouc下的ul
    var ol=fouc.querySelector('.circle');

   // console.log(ul.children.length);
    for(var i=0;i<ul.children.length;i++){
        var li=document.createElement('li');//创建li节点
        li.setAttribute('index',i);//给li添加下标属性
        ol.appendChild(li);//插入到ol下面
        //排他思想
        li.addEventListener('click',function (){
            for(var i=0;i<ol.children.length;i++){
                ol.children[i].className='';
            }
            var index=this.getAttribute('index');//获取当前的索引号
            num=index;//让num等于索引号保持移动
            crcle=index;//让crcle等于索引号控制下标移动
            animate(ul,-index*width);//调用动画函数
            this.className='current';//点击那个(调用那个)就改变类名
        })
    }
    ol.children[0].className='current';

    //克隆第一张图片
    var width1=fouc.offsetWidth;//获取大盒子的宽度(因为图片平铺,盒子多大图片多大)
    var frist=ul.children[0].cloneNode(true);//可隆ul里面的第一个li(用深可隆)
    ul.appendChild(frist);//加入

    //右侧箭头绑定图片滚动
    var open=true;
    arrowr.addEventListener('click',function (){
       if(open){
           open=false;
           if(num===ul.children.length-1){
               ul.style.left=0;
               num=0;
               /*无缝动画*/
           }
           num++;
           animate(ul,-num*width1,function (){
               open=true;
           });
           crcle++;
           if(crcle===ol.children.length){
               crcle=0;
           }
           change();
       }
    });

    //左侧按钮
    arrowl.addEventListener('click',function (){
       if(open){
           open=false;
           if(num===0){
               num=ul.children.length-1;
               ul.style.left=-num*width+'px';
               /*无缝动画*/
           }
           num--;
           animate(ul,-num*width1,function (){
               open=true;
           });
           crcle--;
           if(crcle<0){
               crcle=ol.children.length-1;
           }
           change();
       }
    });

    //自动播放
    var time=setInterval(function (){
        arrowr.click();//自动调用
    },2000);
    //封装排他
    function change(){
        for(var a=0;a<ol.children.length;a++){
            ol.children[a].className='';
        }
        ol.children[crcle].className='current';
    }

})