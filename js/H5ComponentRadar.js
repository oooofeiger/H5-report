var H5ComponentRadar = function(name, cfg){
	var component = new H5ComponentBase(name, cfg);

	//绘制网格线
	var w = cfg.width;
	var h = cfg.height;

	//网格线-背景层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;

	var r = w/2;
	var step = cfg.data.length;

	ctx.beginPath();
	ctx.arc(r,r,5,0,2*Math.PI);	
	ctx.stroke();

	//计算一个圆周上的的坐标
	//已知圆心为（a,b）半径为r；角度deg
	//rad = ( 2*Math.PI / 360) * (360 / step) * i
	//x = a + Math.PI*sin(rad) * r;
	//y = b + Math.PI*cos(red) * r;

	//绘制网格背景
	for(var s = 10; s>0; s--){
		ctx.beginPath();
		for(var i =0;i<step; i++){
			var rad = (2*Math.PI/360)*(360/step)*i;
			var x = r + Math.sin(rad) * r * (s/10);
			var y = r + Math.cos(rad) * r * (s/10);

			ctx.lineTo(x,y);
		}
		ctx.lineTo(x,y);
		ctx.fillStyle = (s%2==0)?'#99c0ff' : '#f1f9ff';
		ctx.fill();
	}
	//绘制伞骨
	for(var i =0;i<step; i++){
		var rad = (2*Math.PI/360)*(360/step)*i;
		var x = r + Math.sin(rad) * r;
		var y = r + Math.cos(rad) * r;

		ctx.moveTo(r,r);
		ctx.lineTo(x,y);
		//输出项目文字
		var text_radar = $('<div class="text_radar"></div>');
		text_radar.text(cfg.data[i][0]);
		text_radar.css('transition','all .5s '+i*0.1 +'s');

		if(x > w/2){
			text_radar.css('left',x/2);
		}else{
			text_radar.css('right',(w-x)/2);
		}

		if(y> h/2){
			text_radar.css('top',y/2);
		}else{
			text_radar.css('bottom',(h-y)/2);
		}

		if(cfg.data[i][2]){
			text_radar.css('color',cfg.data[i][2]);
		}
		text_radar.css('opacity',0);
		component.append(text_radar);
	}
	ctx.strokeStyle = '#e0e0e0';
	ctx.stroke();
	component.append(cns);

	//数据层画布
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	ctx.strokeStyle = '#f00';
	var draw = function(per){
		if(per >= 1){
			$('.text_radar').css('opacity',1);
		}else if(per <= 1){
			$('.text_radar').css('opacity',0);
		}

		ctx.clearRect(0,0,w,h);
		//绘制数据之间的连线
		for(var i = 0;i < step ; i++){
			var rad = (2*Math.PI/360)*(360/step)*i;
			var rate = cfg.data[i][1] * per;
			var x = r + Math.sin(rad) * r * rate;
			var y = r + Math.cos(rad) * r * rate;
			ctx.lineTo(x,y);
		}

		ctx.closePath();
		ctx.stroke();

		//绘制数据点
		ctx.fillStyle = '#ff7676';
		for(var i = 0;i < step ; i++){
			var rad = (2*Math.PI/360)*(360/step)*i;
			var rate = cfg.data[i][1] * per;
			var x = r + Math.sin(rad) * r * rate;
			var y = r + Math.cos(rad) * r * rate;

			ctx.beginPath()
			ctx.arc(x,y,5,0,2*Math.PI);
			ctx.fill();
			ctx.closePath();
		}

	}

	component.append(cns);

	component.on('onLoad',function(){
		//雷达动画
		var s = 0;
		for(var i = 0; i< 100; i++){
			setTimeout(function(){
				s+=.01;
				draw(s);
			},i*10+500)
		}
	})
	component.on('onLeave',function(){
		//雷达动画
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