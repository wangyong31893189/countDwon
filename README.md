# countDwon
简单的倒计时处理js

#调用处理
new CountDown({currTime:new Date().getTime(),beginTime:new Date().getTime()+13000/*,callback:function(){
				window.location.reload();
			}*/})
			
			currTime:传入的系统当前时间   必传对象
			beginTime:传入的倒计时时间    必传对象
			callback:倒计时完成的回调
			id:传入的倒计时容器ID  默认为countdown
			ext:各个日，时，分，秒的容器ID后缀    如countdown_day_{ext}   
			template:'<span class="label">距结束：</span><span class="number" id="countdown_day_{{id}}">{{day}}</span>天<span class="number" id="countdown_hour_{{id}}">{{hour}}</span>时<span class="number" id="countdown_minutes_{{id}}">{{minutes}}</span>分<span class="number" id="countdown_seconds_{{id}}">{{seconds}}</span>秒'默认模版格式{{}}双大括号提供的为各个日，时，分，秒的数据填充，
			{{id}}接收的为ext的容器ID后缀
			
			
