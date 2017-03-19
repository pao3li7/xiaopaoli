var ny = 0;
var rotYINT;
var arrList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];//下标列表
    var oDiv = $('#thumbList').find('.thumb');
        var arr = [];//另外14个红包列表
        var indexsed='';
$(function() {
    var oList = document.getElementById('list');
    var result;

    //根据分辨率控制文字的大小
    $('body').css('font-size',window.screen.width/320*12)

    //获取15个红包金额列表并铺出
    $.ajax({
        url: "json/list.json",
        async: true,
        dataType: "json",
        type: "get",
        success: function(data) {
            if (data.rs == 1) {
                var liText = "";
                for (var i = 0; i < data.data.length; i++) {
                    liText += '<li><b>' + data.data[i] + '</b>元</li>';
                    oList.innerHTML = liText;
                    if (data.data[i] != data.result) {
                        arr.push(data.data[i]);
                    }

                }
                //重新排序
                arr = arr.sort(randomsort);

            }
        }
    });

    //设置banner大小
    var winW = $(window).width();
    $('header img').width(winW);
    //动态设置图片的大小
    var imgWidth = $('.thumb  img').width();
    var imgHeight = imgWidth * 127 / 93;
    $('.thumb  img,.thumb,#aniDiv img').height(imgHeight);
    $('#aniDiv,#aniDiv .thumb').css({
        'width': imgWidth * 1.5,
        height: imgHeight * 1.5
    });
    //定位翻转后文字的位置
    var newImgW=$('.thumb  img').width();
     var newImgH=$('.thumb  img').height();
    $('.imgContent').css({
    	left:'1px',
    	top:newImgH/2
    });
    //定位选中的文字
    $('#aniDiv .imgContent').css({
		left:newImgW/2,
		top:newImgH/3*2
    });
    //点击图片的操作
    $('.thumb.flip').click(function() {

        //执行了一次就取消方法							
        $('.thumb.flip').off();
        indexsed = $(this).index();
        var _this=this;
        //获取结果ajax
            $.ajax({
        url: "json/list.json",
        async: true,
        dataType: "json",
        type: "post",
        success: function(data) {
            if (data.rs == 1) {
            	//获取中奖结果
            	var other=data.other;
            	if(other==0){
            		//没有剩余的红包，把链接指向支付界面
            		$('.go').html('继续支付');
            		$('.go').click(function(){
            			window.location='http://www.baidu.com';
            		});
            		
            	}else{
            		//请求再次拆红包
            	}
                result = data.result;
                $('#layers b,#aniDiv b').html(result);
		        Alist(_this, $(this), result, 10, indexsed);
		         $(_this).css('visibility', 'hidden');

            }
        }
    });

        //开始旋转其他的div					
        $('.sure,.go,#layers h3 span').click(function() {
            $('#layers,.tips').hide();
        })

    });

})

    //点击确定执行的全部翻转函数
    function clickedFn(indexs) {
        arrList.splice(indexs, 1);
        for (var i = 0; i < arrList.length; i++) {
            var time = 300 * i;
            Alist(oDiv, arrList[i], arr[i], time, indexsed);
        }
    }

//点击的效果
function Alist(obj, indexs, result, time, fitstI) {//对象，不是第一次下标，结果，定时器时间，第一次的下标
    if (typeof indexs != 'object') {
        setTimeout(function() {
            var objs = obj.get(indexs);
            objs.querySelector('.thumb-wrapper').className = 'thumb-wrapper flipIt';
            objs.querySelector('b').innerHTML =result;
        },
        time);
        if(indexsed==14 && indexs==13 || indexs==14){
        	setTimeout(function(){
        		$('.tips').height(document.body.scrollHeight).show();
        	  	$('#layers').show();
        },6000)
        }
        
      

    } else {
        //点击第一个的效果
        var getOff = getAbsPoint(obj);
        var imgW = $('#thumbList img').width();
        var imgH = $('#thumbList img').height();
        //判断是否是最右边的，是的话定位就不同
        if (fitstI == 4 || fitstI == 9 || fitstI == 14) {
            $('#aniDiv').css({
                left: getOff[0] - imgW / 2,
                top: getOff[1] - imgH / 2
            }).show();
        } else {
            $('#aniDiv').css({
                left: getOff[0],
                top: getOff[1]
            }).show();
        }
       
        //放大再旋转；然后执行回调
        $('#aniDiv img').animate({
            width: imgW * 1.5,
            height: imgH * 1.5
        },
        500,
        function() {
            $('#aniDiv .thumb-wrapper').addClass('flipIt');
            //判断是否是最右边，然后把div放回去
            if (fitstI == 4 || fitstI == 9 || fitstI == 14) {
                setTimeout(function() {
                    $('#aniDiv').animate({
                        left: getOff[0],
                        top: getOff[1],
                        width: imgW + 10,
                        height: imgH + 10
                    },
                    500);
                    $('#aniDiv .thumb').animate({
                        width: imgW + 10,
                        height: imgH + 10
                    },
                    500);
                    	$('#aniDiv img').animate({
                        width: imgW,
                        height:imgH
                    },
                    500);
                    	                    //动画选中文字
                    var newImgW=$('.thumb  img').width();
 					var newImgH=$('.thumb  img').height();
                    $('#aniDiv .imgContent').animate({
                        left: '1px',
                        top:newImgH/2
                    },
                    500);
                    
                },
                1000)

            } else {
                setTimeout(function() {
                    $('#aniDiv .thumb').animate({
                        width: imgW + 10,
                        height: imgH + 10
                    },
                    500);
                    $('#aniDiv img').animate({
                        width: imgW,
                        height:imgH
                    },
                    500);
                    //动画选中文字
                    var newImgW=$('.thumb  img').width();
 					var newImgH=$('.thumb  img').height();
                    $('#aniDiv .imgContent').animate({
                        left: '1px',
                        top:newImgH/2
                    },
                    500);
                },
                1000)

            }
           
            setTimeout(function() {                            
                $('.thumb-detail>img').hide();
                $('.thumb-detail>span').show();
               clickedFn(indexsed);
            },
            2000)
        });

    }

}

//返回所在坐标函数
function getAbsPoint(e) {
    var x = e.offsetLeft,
    y = e.offsetTop;
    var getXY = [x, y];
    return getXY;
}

//随机排序
function randomsort(a, b) {
    return Math.random() > .5 ? -1 : 1;
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1  
}
