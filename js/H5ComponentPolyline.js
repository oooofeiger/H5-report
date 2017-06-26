var H5ComponentPolyline = function(name, cfg){
	var component = new H5ComponentBase(name, cfg);

	//绘制网格线
	var w = cfg.width;
	var h = cfg.height;

	//网格线-背景层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;

	//水平网格线
	var step = 10;
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#aaa";

	for(var i = 0; i< step+1; i++){
		var y = (h/step) * i;
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);
	}

	//垂直网格线，根据项目个数去分，还应包括头尾两根线
	step = cfg.data.length+1;
	var text_w = w/step;
	for(var i = 0; i< step+1; i++){
		var x = (w/step) * i;
		ctx.moveTo(x,0);
		ctx.lineTo(x,h);

		if(cfg.data[i]){
			var text_polyline = $('<div class="text_polyline"></div>');
			text_polyline.text(cfg.data[i][0]);
			text_polyline.css('width',text_w/2).css('left',(x/2-text_w/4)+text_w/2);
			component.append(text_polyline);
			console.log((x/2-text_w/4)+text_w/2)
		}
	}

	ctx.stroke();
	component.append(cns);

	//加入画布-数据层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;

	var draw = function(per){
		//清空之前的画布,参数表示起始位置和终点位置坐标
		ctx.clearRect(0,0,w,h);
		//绘制折线数据
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = "#ff8878";

		var x = 0;
		var y = 0;
		var row_w = (w/(cfg.data.length + 1));
		//画点
		for(i in cfg.data){
			var item = cfg.data[i];
			x = row_w * i + row_w;
			y = h*(1 - item[1]*per);
			ctx.moveTo(x,y);
			ctx.arc(x,y,5,0,2*Math.PI);
		}

		//连线
		ctx.moveTo(row_w,h*(1-cfg.data[0][1]*per));//移动画笔到第一点位置
		for(i in cfg.data){
			var item = cfg.data[i];
			x = row_w * i + row_w;
			y = h*(1 - item[1]*per);
			ctx.lineTo(x,y)
		}
		ctx.stroke();

		ctx.lineWidth = 1;
		ctx.fillStyle = 'rgba(255,255,255,0)';

		//绘制阴影
		ctx.lineTo(x,h);
		ctx.lineTo(row_w,h);
		ctx.fillStyle = 'rgba(255,136,120,0.2)';
		ctx.fill();

		//写数据
		for(i in cfg.data){
			var item = cfg.data[i];
			x = row_w * i + row_w;
			y = h*(1 - item[1]*per);
			ctx.fillStyle = item[2] ? item[2] : '#595959';
			ctx.fillText(((item[1]*100))+'%', x-10, y-10);

		}
	}

	component.append(cns);

	component.on('onLoad',function(){
		//折线动画
		var s = 0;
		for(var i = 0; i< 100; i++){
			setTimeout(function(){
				s+=.01;
				draw(s);
			},i*10+500)
		}
	})
	component.on('onLeave',function(){
		//折线动画
		var s = 1;
		for(var i = 0; i< 100; i++){
			setTimeout(function(){
				s-=.01;
				draw(s);
			},i*10)
		}
	})

	return component;
}