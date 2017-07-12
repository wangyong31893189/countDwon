(function() {
    /*var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
*/
    var CountDown=function(options){
        var that=this;
        var today=Date.now();
        that.options={
            template:'<span class="label">距结束：</span><span class="number" id="countdown_day_{{id}}">{{day}}</span>天<span class="number" id="countdown_hour_{{id}}">{{hour}}</span>时<span class="number" id="countdown_minutes_{{id}}">{{minutes}}</span>分<span class="number" id="countdown_seconds_{{id}}">{{seconds}}</span>秒',
            id:"countdown",//对象ID
            currTime:today,//服务器当前时间
            beginTime:today+24*60*60*1000, //倒计时开始时间
            ext:today,//Id后缀
            timeoutId:0,//定时器ID
            callback:function(){//需要回调的函数
                console.warn("当前没有传入的回调！");
            }
        };
        for(var i in options){
            that.options[i]=options[i];
        }
		that.options.ext=that.options.id+that.options.ext+Math.round(100*Math.random(10));
        var id=that.options.ext;
		console.log("id=="+id);
        that.options.template=that.options.template.replace(/(\{\{)\s*(\w)\s*(\}\})/g,"$1$2$3").replace(/\{\{id\}\}/g,id);
        var countObj=$(that.options.id);
        if(countObj){
            hideVisi(countObj);
            countObj.innerHTML=that.options.template;
            that.getCountDownAreaTemplate();
        }
        that.init();
    };
    function $(id){
        return document.getElementById(id);
    }
    function showVisi(obj){
        if(obj.style.visibility!="visible"){
            obj.style.visibility="visible";
        }
    }
    function hideVisi(obj){
        if(obj.style.visibility!="hidden"){
            obj.style.visibility="hidden";
        }
    }
    CountDown.prototype={
        init:function(){
            var that=this;
            var currTime=that.options.currTime;
            var beginTime=that.options.beginTime;
            var intervalTime=beginTime-currTime;//间隔时间
            if(intervalTime<0){
                console.error("传入的倒计时开始时间比当前时间小！请检查！");
                return;
            }
            //that.render(intervalTime);
            that.options.timeoutId=setTimeout(function(){
                that.countdown(intervalTime);
            },1000);
        },
        getCountDownAreaTemplate:function(){
            var that=this;
            var ext=that.options.ext;
            var dayObj=$("countdown_day_"+ext);
            if(dayObj){
                hideVisi(dayObj);
                that.options.dayTemplate=dayObj.innerHTML;
            }
            var hourObj=$("countdown_hour_"+ext);
            if(hourObj){
                hideVisi(hourObj);
                that.options.hourTemplate=hourObj.innerHTML;
            }
            var minutesObj=$("countdown_minutes_"+ext);
            if(minutesObj){
                hideVisi(minutesObj);
                that.options.minutesTemplate=minutesObj.innerHTML;
            }
            var secondsObj=$("countdown_seconds_"+ext);
            if(secondsObj){
                hideVisi(secondsObj);
                that.options.secondsTemplate=secondsObj.innerHTML;
            }
        },
        countdown:function(intervalTime){
            var that=this;
            var t=intervalTime;
            t=t-1000;
            that.render(t);
            if(t<=0){
                console.log("%c 倒计已经结束！","color: #fff; background: #f40; font-size: 24px;");
                if(that.options.callback){
                    that.options.callback();//执行回调
                }
                clearTimeout(that.options.timeoutId);//清除定时器
                return;
            }
            that.options.timeoutId=setTimeout(function(){
                that.countdown(t);
            },1000);
        },
        render:function(intervalTime){//渲染模版
            var that=this;
            var t=intervalTime;
            var template=that.options.template;
            var ext=that.options.ext;
            var day=parseInt(t/(1000*60*60*24),10);
            var hour=parseInt((t-(day*1000*60*60*24))/(1000*60*60),10);
            var minutes=parseInt((t-(day*1000*60*60*24)-(hour*1000*60*60))/(1000*60),10);
            var seconds=parseInt((t-(day*1000*60*60*24)-(hour*1000*60*60)-(minutes*1000*60))/1000,10);
            if(template.indexOf("{{day}}")!=-1){
                if(day<10){
                    day="0"+day;
                }
                if(hour<10){
                    hour="0"+hour;
                }
                if(minutes<10){
                    minutes="0"+minutes;
                }
                if(seconds<10){
                    seconds="0"+seconds;
                }
                //template=template.replace(/({{)\s*(\w)\s*(}})/g,"$1$2$3").replace("{{day}}",day).replace("{{hour}}",hour).replace("{{minutes}}",minutes).replace("{{seconds}}",seconds);
                that.showCountDown({day:day,hour:hour,minutes:minutes,seconds:seconds});
            }else{
                if(template.indexOf("{{hour}}")!=-1){
//                    var hour=parseInt(t/(1000*60*60),10);
//                    var minutes=parseInt((t-(hour*1000*60*60))/(1000*60),10);
//                    var seconds=parseInt((t-(hour*1000*60*60)-(minutes*1000*60))/1000,10);
                    if(hour<10){
                        hour="0"+hour;
                    }
                    if(minutes<10){
                        minutes="0"+minutes;
                    }
                    if(seconds<10){
                        seconds="0"+seconds;
                    }
                    //template=template.replace(/({{)\s*(\w)\s*(}})/g,"$1$2$3").replace("{{hour}}",hour).replace("{{minutes}}",minutes).replace("{{seconds}}",seconds);
                    that.showCountDown({hour:hour,minutes:minutes,seconds:seconds});
                }else{
                    if(template.indexOf("{{minutes}}")!=-1){
//                        var minutes=parseInt(t/(1000*60),10);
//                        var seconds=parseInt((t-(hour*1000*60*60)-(minutes*1000*60))/1000,10);
                        if(minutes<10){
                            minutes="0"+minutes;
                        }
                        if(seconds<10){
                            seconds="0"+seconds;
                        }
                        //template=template.replace(/({{)\s*(\w)\s*(}})/g,"$1$2$3").replace("{{minutes}}",minutes).replace("{{seconds}}",seconds);
                        that.showCountDown({minutes:minutes,seconds:seconds});
                    }else{
                        if(template.indexOf("{{seconds}}")!=-1){
//                            var seconds=parseInt((t-(hour*1000*60*60)-(minutes*1000*60))/1000,10);
                            if(seconds<10){
                                seconds="0"+seconds;
                            }
                            //template=template.replace(/({{)\s*(\w)\s*(}})/g,"$1$2$3").replace("{{seconds}}",seconds);
                            that.showCountDown({seconds:seconds});
                        }
                    }
                }
            }
            var countObj=$(that.options.id);
            if(countObj){
                showVisi(countObj);
            }
            // var countObj=$(that.options.id);
            // if(countObj){
            //     countObj.innerHTML=template;
            // }
        },
        showCountDown:function(options){//ext ID后缀  options 选项
            var that=this;
            var ext=that.options.ext;
            var dayObj=$("countdown_day_"+ext);
            if(dayObj){
                dayObj.innerHTML=that.options.dayTemplate.replace("{{day}}",options.day);
                showVisi(dayObj);
            }
            var hourObj=$("countdown_hour_"+ext);
            if(hourObj){
                hourObj.innerHTML=that.options.hourTemplate.replace("{{hour}}",options.hour);
                showVisi(hourObj);
            }
            var minutesObj=$("countdown_minutes_"+ext);
            if(minutesObj){
                minutesObj.innerHTML=that.options.minutesTemplate.replace("{{minutes}}",options.minutes);
                showVisi(minutesObj);
            }
            var secondsObj=$("countdown_seconds_"+ext);
            if(secondsObj){
                secondsObj.innerHTML=that.options.secondsTemplate.replace("{{seconds}}",options.seconds);
                showVisi(secondsObj);
            }
        }
    };
    window.CountDown=CountDown;
}());

