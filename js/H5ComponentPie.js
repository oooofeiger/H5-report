var H5ComponentPie = function(name, cfg){
	var component = new H5ComponentBase(name, cfg);
	var w = cfg.width;
	var h = cfg.height;

	//网格线-背景层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex',1);
	var r = w/2;

	//加入一个底图层
	ctx.beginPath();
	ctx.fillStyle = '#eee';
	ctx.strokeStyle = '#eee';
	ctx.lineWidth = 1;
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();
	component.append(cns);

	//网格线-背景层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);
	$(cns).css('zIndex',2);
	var colors = ['deeppink','lightgreen','yellow','lightblue','orange'];
	var sAngel = 1.5 * Math.PI; // 设置开始的角度为12点位置
	var eAngel = 0;  // 结束角度
	var aAngel = Math.PI * 2; //360度位置

	var step = cfg.data.length;
	for(var i = 0; i < step ; i++){
		var item = cfg.data[i];
		var color = item[2] || (item[2] = colors.pop());
		eAngel = sAngel + aAngel * item[1];

		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.lineWidth = .01;
		ctx.moveTo(r,r);
		ctx.arc(r,r,r,sAngel,eAngel);
		ctx.fill();
		ctx.stroke();

		sAngel = eAngel;

		//加入文本
		var text_pie = $('<div class="text_pie"></div>');
		text_pie.text(cfg.data[i][0]);
		var per = $('<div class="per"></div>');
		per.text(cfg.data[i][1]*100 + '%');
		text_pie.append(per);

		var x = r + Math.sin(.5 * Math.PI-sAngel) * r;
		var y = r + Math.cos(.5 * Math.PI-sAngel) * r;

		if(x > w/2){
			text_pie.css('left',x/2);
		}else{
			text_pie.css('right',(w-x)/2);
		}

		if(y > h/2){
			text_pie.css('top',y/2);
		}else{
			text_pie.css('bottom',(h-y+30)/2);
		}

		if(cfg.data[i][2]){
			text_pie.css('color',cfg.data[i][2])
		}
		text_pie.css('opacity',0)
		component.append(text_pie);
	}

	//加入一个蒙板层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex',3);

	ctx.fillStyle = '#eee';
	ctx.strokeStyle = '#eee';
	ctx.lineWidth = 1;
	
	component.append(cns);

	var draw = function(per){
		ctx.clearRect(0,0,w,h);

		ctx.beginPath();
		ctx.moveTo(r,r);
		if(per <= 0){
			ctx.arc(r,r,r,0,2*Math.PI);
			$('.text_pie').css('opacity',0)
		}else{
			ctx.arc(r,r,r,sAngel,sAngel + 2*Math.PI*per,true);
		}
		

		ctx.fill();
		ctx.stroke();

		if(per >= 1){
			$('.text_pie').css('opacity',1)
		}
	}
	draw(0);

	component.on('onLoad',function(){
		var s = 0;
		for(var i = 0; i< 100; i++){
			setTimeout(function(){
				s+=.01;
				draw(s);
			},i*10+500)
		}
	})
	component.on('onLeave',function(){
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