var H5_loading = function(imgs,page){
	console.log(222222222222222)
	var id = this.id;
	if(this._images === undefined){   //第一次进入
		this._images = (imgs || []).length;
		this._loaded = 0;

		window[id] = this;    //把当前对象存储到全局对象window中，用来进行某个图片加载完成后的回掉
		for(s in imgs){
			var item = imgs[s];
			var img = new Image;
			img.onload = function(){
				window[id].loader();
			}
			img.src = item;
			console.log(id)
		}

		$('#rate').text('0%');
		return this;
	}else{
		this._loaded ++;
		$('#rate').text(((this._loaded / this._images * 100)>>0)+'%');

		if(this._loaded < this._images){
			return this;
		}
	}
	window[id] = null;

	this.el.fullpage({
		onLeave: function(index, nextIndex, direction){
			$(this).find('.h5_component').trigger('onLeave');
		},
		afterLoad: function(anchorLink, index){
			$(this).find('.h5_component').trigger('onLoad');
		}
	});
	this.page[0].find('.h5_component').trigger('onLoad');
	this.el.show();

	if(page){
		$.fn.fullpage.moveTo(page);//直接切换到指定页
	}
}