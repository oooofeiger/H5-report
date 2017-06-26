var H5ComponentBar_v = function(name, cfg){
	var component = new H5ComponentBase(name, cfg);

	$.each(cfg.data, function(idx, item){
		var line = $('<div class="line">');
		var name = $('<div class="name">');
		var rate_ = $('<div class="rate_">');
		var per = $('<div class="per">');

		var height = item[1]*100 +'%';
		var bgStyle = '';
		if(item[2]){
			bgStyle = 'style="background-color:'+item[2]+'"';
		}

		rate_.html('<div class="bg" '+bgStyle+'></div>');

		rate_.css('height',height);

		name.text(item[0]);

		per.text(height);

		line.append(name).append(rate_).append(per);

		component.append(line);

	})

	return component;
}