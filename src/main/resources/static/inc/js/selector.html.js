/*
 * HTML Element Converter 2006.09.06
 * by NHN UII.Gony
 */

var Checkbox = Class({
	__const : function(id) {
		this._source = $(id);
		this.options = Class.extend({
			skinFormat  : './images/check_%s.gif' // on, off
		}, arguments[1]);

		// for image cache
		var o = this.options;
		$c('img').src = o.onImg = o.skinFormat.replace('%s', 'on');
		$c('img').src = o.offImg = o.skinFormat.replace('%s', 'off');

		// image element
		var e = this._element = $c('img');
		e.onclick = this.onclick.bind(this);
		this.paint();

		// replace html element
		this._source.parentNode.insertBefore(e, this._source);
		Element.hide(id);
	},
	onclick : function() {
		this._source.checked = !this._source.checked;
		this.paint();
		if (this._source.onclick) this._source.onclick();
	},
	paint : function() {
		this._element.src = this._source.checked?this.options.onImg:this.options.offImg;
	}
});

var Radiobox = Class({
	__const : function(name) {
		var s = this._sources = [].load(document.getElementsByName(name));
		this.options = Class.extend({
			onChange   : function(v,i){},
			skinFormat : './images/radio_%s.gif' // on, off
		}, arguments[1]);

		// for image cache
		var o = this.options;
		$c('img').src = o.onImg = o.skinFormat.replace('%s', 'on');
		$c('img').src = o.offImg = o.skinFormat.replace('%s', 'off');

		// image elemnts
		var e = this._elements = [];
		for(var i=0; i < s.length; i++) {
			e.push($c('img'));
			e[i].onclick = this.onclick.bind(this,i);
		}
		this.paint();

		// replace html elements
		s.each(function(v,i) {
			v.parentNode.insertBefore(e[i],v);
			Element.hide(v);
		});
	},
	onclick : function(idx) {
		var s = this._sources[idx];
		var c = s.checked;
		s.checked = true;

		this.paint();
		if (s.onclick) s.onclick();
		if (c != s.checked) this.options.onChange(s.value,idx);
	},
	setIndex : function(i) {
		this._sources[i].checked = true;
		this.paint();
	},
	setValue : function(val) {
		this._sources.each(function(v){ if(v.value == val)v.checked=true });
		this.paint();
	},
	getValue : function() {
		var val;
		this._sources.each(function(v){ if(v.checked)val=v.value });
		return val;
	},
	getIndex : function() {
		var idx;
		this._sources.each(function(v,i){ if(v.checked)idx=i });
		return idx;
	},
	paint : function() {
		var t = this;
		this._elements.each(function(v,i) {
			v.src = t._sources[i].checked?t.options.onImg:t.options.offImg;
		});
	}
});

var Selectbox = Class({
	__const : function(id) {
		var s = this._source  = $(id);
		this.options = Class.extend({
			height      : s.offsetHeight,
			width       : s.offsetWidth,
			fontSize    : 11,
			fontFamily	: 'Dotum',
			listSize    : 8,
			skinActive  : false,
			skinFormat  : 'http://m.tworld.co.kr/img/center/icon_arrow_currentline.gif', // left, right, up, down, bt
			borderActive: true,
			borderColor : '#C0C0C0',
			optTxtColor : '#666',
			optBgColor  : 'white',
			optTxtHover : 'black',
			optBgHover  : '#B4EF62'
		}, arguments[1]);

		var o = this.options;
		var e = this._element = $c('div');
		var c = e.appendChild($c('div')); // container
		var p = Element.realPos(this._source);

		// replace html element
		this._source.parentNode.insertBefore(e, s);
		this._source.style.display = 'none';

		// border
		if (o.borderActive) {
			e.style.border = '1px solid '+o.borderColor;
		}

		Element.setCSS(e, {
			display: 'inline',
			verticalAlign: 'middle',
			top : p.top+'px',
			left : p.left+'px',
			width : o.width+'px',
			height : (o.height-2)+'px',
			background : o.optBgColor
		});

		Element.setCSS(c, {
			width  : o.width+'px',
			height : (o.height-2)+'px',
			fontSize : o.fontSize+'px',
			overflow : 'hidden',
			cursor   : 'default'
		});
		c.onmousedown = this.onmousedown.bindForEvent(this);
		c.onmouseup   = this.onmouseup.bind(this);

		// button layer
		var b = c.appendChild($c('div'));
		Element.setCSS(b, {
			height     : '100%',
			background : 'no-repeat url('+o.skinFormat.replace('%s', 'bt')+') 50% 50%',
			cssFloat   : 'right',
			styleFloat : 'right'
		});

		// text box
		this._txt_element = c.appendChild($c('div'));
		with(this._txt_element) {
			appendChild(document.createTextNode(s.options[s.selectedIndex].text));
			//style.height = 20+'px';
			style.fontSize = o.fontSize+'px';
			style.fontFamily = 'Dotum';
			style.color = '#666666';
			style.paddingLeft = 5+'px';
			style.overflow = 'hidden';
			style.marginTop = Math.max(Math.floor((o.height-offsetHeight)/2),0)+'px';
			style.marginLeft = style.marginTop;
		}
		c.appendChild($c('div')).style.clear = 'both';

		// re-margin
		var im = $c('img');
		im.onload = function(){b.style.width=im.width+'px'}
		im.src = o.skinFormat.replace('%s', 'bt');

		// options
		this._list_element = document.body.appendChild($c('div'));
		Element.setCSS(this._list_element, {
			position: 'absolute',
			border: '1px solid '+o.borderColor,
			display: 'none',
			overflow: 'auto',
			fontSize: o.fontSize+'px'
		});
		//this._list_element.style.fontSize = 11+'px';
		this._list_element.onmousedown = this.onscrollbar.bindForEvent(this);
		this.paint();

		// event binding
		this._event_onmousedown = this.onmousedown.bindForEvent(this);
	},
	onmousedown : function(e) {
		if (!Element.visible(this._list_element)) {
			var p = Element.realPos(this._element);

			this.paint();
			Element.show(this._list_element);
			if (this._list_element.offsetWidth < this._element.offsetWidth) {
				this._list_element.style.width = this._element.offsetWidth+'px';
			};
			Element.setCSS(this._list_element, {
				top : p.top+this._element.offsetHeight+'px',
				left : p.left+'px',
				zIndex : 1000
			});
		} else {
			Element.hide(this._list_element);
			Event.unregister(document.body, 'mousedown', this._event_onmousedown);
		}
	},
	onmouseup : function() {
		if (Element.visible(this._list_element)) {
			Event.register(document.body, 'mousedown', this._event_onmousedown);
		} 
	},
	onselect : function(e) {
		var el=e.element, o=this.options, s=this._source;
		
		s.selectedIndex = el._index;
		this._txt_element.firstChild.nodeValue = s.options[s.selectedIndex].text;

		this.onmousedown();
		if (this._source.onchange) this._source.onchange();
	},
	onover : function(e) {
		var el=e.element, c=[].load(el.parentNode.childNodes), i=el._index, o=this.options;
		c.map(function(v) {
			v.style.color = o.optTxtColor;
			v.style.background = o.optBgColor;
			return v;
		});
		el.style.color = o.optTxtHover;
		el.style.background = o.optBgHover;
	},
	onscrollbar : function(e) {
		e.stop();
	},
	paint : function() {
		var o=this.options,s=this._source,op;
		this._list_element.innerHTML = '';
		this._list_element.style.width = '';
		this._list_element.style.height = '';
		//this._list_element.style.fontSize = 9+'px';
		for(var i=0; i < s.options.length; i++) {
			op = this._makeOption(s.options[i].value, s.options[i].text);
			op._index  = i;
			Element.setCSS(op, {
				padding : '2px 5px',
				cursor  : 'default',
				fontSize: '11px',
				fontFamily: 'Dotum',
				color : (i==this._source.selectedIndex)?o.optTxtHover:o.optTxtColor,
				background : (i==this._source.selectedIndex)?o.optBgHover:o.optBgColor
			});
			this._list_element.appendChild(op);
		}

		var old_display = this._list_element.style.display;
		Element.show(this._list_element);
		if ((this._list_element.offsetHeight-2) > op.offsetHeight * o.listSize) {
			this._list_element.style.height = op.offsetHeight*o.listSize;
		}
		this._list_element.style.display = old_display;
	},
	refresh : function() {
		var s=this._source;
		
		this._txt_element.firstChild.nodeValue = s.options[s.selectedIndex].text;
	},
	_makeOption : function(value, text) {
		var o = $c('div'), t = this;
		o._value = value;
		o.appendChild(document.createTextNode(text));

		Event.register(o, 'mouseover', this.onover.bindForEvent(this));
		Event.register(o, 'mousedown', this.onselect.bindForEvent(this));

		return o;
	}
});


var Loadbox = Class({
	__const : function(id) {
		var s = this._source  = $(id);
		this.options = Class.extend({
			height      : s.offsetHeight,
			width       : s.offsetWidth,
			fontSize    : 11,
			fontFamily	: 'Dotum',
			listSize    : 8,
			skinActive  : false,
			skinFormat  : '/img/common/ic/ic_arrow.gif', // left, right, up, down, bt
			borderActive: true,
			borderColor : '#fff',
			optTxtColor : '#666',
			optBgColor  : 'white',
			optTxtHover : 'black',
			optBgHover  : '#B4EF62'
		}, arguments[1]);

		var o = this.options;
		var e = this._element = $c('div');
		var c = e.appendChild($c('div')); // container
		var p = Element.realPos(this._source);

		// replace html element
		this._source.parentNode.insertBefore(e, s);
		this._source.style.display = 'none';

		// border
		if (o.borderActive) {
			e.style.border = '1px solid '+o.borderColor;
		}

		Element.setCSS(e, {
			top : p.top+'px',
			left : p.left+'px',
			width : o.width+'px',
			height : (o.height-2)+'px',
			background : o.optBgColor
		});

		Element.setCSS(c, {
			width  : o.width+'px',
			height : (o.height-2)+'px',
			fontSize : o.fontSize+'px',
			overflow : 'hidden',
			cursor   : 'default'
		});
		c.onmousedown = this.onmousedown.bindForEvent(this);
		c.onmouseup   = this.onmouseup.bind(this);

		// button layer
		var b = c.appendChild($c('div'));
		Element.setCSS(b, {
			height     : '100%',
			background : 'no-repeat url('+o.skinFormat.replace('%s', 'bt')+') 50% 50%',
			cssFloat   : 'right',
			styleFloat : 'right'
		});

		// text box
		this._txt_element = c.appendChild($c('div'));
		with(this._txt_element) {
			appendChild(document.createTextNode(s.options[s.selectedIndex].text));
			//style.height = 20+'px';
			style.fontSize = o.fontSize+'px';
			style.fontFamily = 'Dotum';
			style.color = '#666666';
			style.letterSpacing = 0;
			style.paddingLeft = 5+'px';
			style.overflow = 'hidden';
			style.marginTop = Math.max(Math.floor((o.height-offsetHeight)/2),0)+'px';
			style.marginLeft = style.marginTop;
		}
		c.appendChild($c('div')).style.clear = 'both';

		// re-margin
		var im = $c('img');
		im.onload = function(){b.style.width=im.width+'px'}
		im.src = o.skinFormat.replace('%s', 'bt');

		// options
		this._list_element = document.body.appendChild($c('div'));
		Element.setCSS(this._list_element, {
			position : 'absolute',
			border   : '1px solid #ddd',
			display  : 'none',
			overflow : 'auto',
			fontSize : o.fontSize+'px'
		});
		//this._list_element.style.fontSize = 11+'px';
		this._list_element.onmousedown = this.onscrollbar.bindForEvent(this);
		this.paint();

		// event binding
		this._event_onmousedown = this.onmousedown.bindForEvent(this);
	},
	onmousedown : function(e) {
		if (!Element.visible(this._list_element)) {
			var p = Element.realPos(this._element);

			this.paint();
			Element.show(this._list_element);
			if (this._list_element.offsetWidth < this._element.offsetWidth) {
				this._list_element.style.width = this._element.offsetWidth+'px';
			};
			Element.setCSS(this._list_element, {
				top : p.top+this._element.offsetHeight+'px',
				left : p.left+'px',
				zIndex : 1000
			});
		} else {
			Element.hide(this._list_element);
			Event.unregister(document.body, 'mousedown', this._event_onmousedown);
		}
	},
	onmouseup : function() {
		if (Element.visible(this._list_element)) {
			Event.register(document.body, 'mousedown', this._event_onmousedown);
		} 
	},
	onselect : function(e) {
		var el=e.element, o=this.options, s=this._source;
		
		s.selectedIndex = el._index;
		this._txt_element.firstChild.nodeValue = s.options[s.selectedIndex].text;

		this.onmousedown();
		if (this._source.onchange) this._source.onchange();
	},
	onover : function(e) {
		var el=e.element, c=[].load(el.parentNode.childNodes), i=el._index, o=this.options;
		c.map(function(v) {
			v.style.color = o.optTxtColor;
			v.style.background = o.optBgColor;
			return v;
		});
		el.style.color = o.optTxtHover;
		el.style.background = o.optBgHover;
	},
	onscrollbar : function(e) {
		e.stop();
	},
	paint : function() {
		var o=this.options,s=this._source,op;
		this._list_element.innerHTML = '';
		this._list_element.style.width = '';
		this._list_element.style.height = '';
		//this._list_element.style.fontSize = 9+'px';
		for(var i=0; i < s.options.length; i++) {
			op = this._makeOption(s.options[i].value, s.options[i].text);
			op._index  = i;
			Element.setCSS(op, {
				padding : '0px 5px',
				cursor  : 'default',
				fontSize: '11px',
				fontFamily: 'Dotum',
				letterSpacing: '0',
				color : (i==this._source.selectedIndex)?o.optTxtHover:o.optTxtColor,
				background : (i==this._source.selectedIndex)?o.optBgHover:o.optBgColor
			});
			this._list_element.appendChild(op);
		}

		var old_display = this._list_element.style.display;
		Element.show(this._list_element);
		if ((this._list_element.offsetHeight-2) > op.offsetHeight * o.listSize) {
			this._list_element.style.height = op.offsetHeight*o.listSize;
		}
		this._list_element.style.display = old_display;
	},
	refresh : function() {
		var s=this._source;
		
		this._txt_element.firstChild.nodeValue = s.options[s.selectedIndex].text;
	},
	_makeOption : function(value, text) {
		var o = $c('div'), t = this;
		o._value = value;
		o.appendChild(document.createTextNode(text));

		Event.register(o, 'mouseover', this.onover.bindForEvent(this));
		Event.register(o, 'mousedown', this.onselect.bindForEvent(this));

		return o;
	}
});


/* 2009-06-02 추가 */
var Loadbox2 = Class({
	__const : function(id) {
		var s = this._source  = $(id);
		this.options = Class.extend({
			height      : s.offsetHeight,
			width       : s.offsetWidth,
			fontSize    : 13,
			fontFamily	: 'Gulim',
			listSize    : 8,
			skinActive  : false,
			skinFormat  : '/img/common/ic/ic_down_arr.gif', // left, right, up, down, bt
			borderActive: true,
			borderColor : '#fff',
			optTxtColor : '#666',
			optBgColor  : 'white',
			optTxtHover : 'black',
			optBgHover  : '#B4EF62'
		}, arguments[1]);

		var o = this.options;
		var e = this._element = $c('div');
		var c = e.appendChild($c('div')); // container
		var p = Element.realPos(this._source);

		// replace html element
		this._source.parentNode.insertBefore(e, s);
		this._source.style.display = 'none';

		// border
		if (o.borderActive) {
			e.style.border = '1px solid '+o.borderColor;
		}

		Element.setCSS(e, {
			top : p.top+'px',
			left : p.left+'px',
			width : o.width+'px',
			height : (o.height-2)+'px',
			background : o.optBgColor
		});

		Element.setCSS(c, {
			width  : o.width+'px',
			height : (o.height-2)+'px',
			fontSize : o.fontSize+'px',
			overflow : 'hidden',
			cursor   : 'default'
		});
		c.onmousedown = this.onmousedown.bindForEvent(this);
		c.onmouseup   = this.onmouseup.bind(this);

		// button layer
		var b = c.appendChild($c('div'));
		Element.setCSS(b, {
			height     : '100%',
			background : 'no-repeat url('+o.skinFormat.replace('%s', 'bt')+') 50% 50%',
			cssFloat   : 'right',
			styleFloat : 'right'
		});

		// text box
		this._txt_element = c.appendChild($c('div'));
		with(this._txt_element) {
			appendChild(document.createTextNode(s.options[s.selectedIndex].text));
			//style.height = 20+'px';
			style.fontSize = o.fontSize+'px';
			style.fontFamily = 'Gulim';
			style.color = '#666666';
			style.letterSpacing = 0;
			style.paddingLeft = 5+'px';
			style.overflow = 'hidden';
			style.marginTop = Math.max(Math.floor((o.height-offsetHeight)/2),0)+'px';
			style.marginLeft = style.marginTop;
		}
		c.appendChild($c('div')).style.clear = 'both';

		// re-margin
		var im = $c('img');
		im.onload = function(){b.style.width=im.width+'px'}
		im.src = o.skinFormat.replace('%s', 'bt');

		// options
		this._list_element = document.body.appendChild($c('div'));
		Element.setCSS(this._list_element, {
			position : 'absolute',
			border   : '1px solid #ddd',
			display  : 'none',
			overflow : 'auto',
			fontSize : o.fontSize+'px'
		});
		//this._list_element.style.fontSize = 13+'px';
		this._list_element.onmousedown = this.onscrollbar.bindForEvent(this);
		this.paint();

		// event binding
		this._event_onmousedown = this.onmousedown.bindForEvent(this);
	},
	onmousedown : function(e) {
		if (!Element.visible(this._list_element)) {
			var p = Element.realPos(this._element);

			this.paint();
			Element.show(this._list_element);
			if (this._list_element.offsetWidth < this._element.offsetWidth) {
				this._list_element.style.width = this._element.offsetWidth+'px';
			};
			Element.setCSS(this._list_element, {
				top : p.top+this._element.offsetHeight+'px',
				left : p.left+'px',
				zIndex : 1000
			});
		} else {
			Element.hide(this._list_element);
			Event.unregister(document.body, 'mousedown', this._event_onmousedown);
		}
	},
	onmouseup : function() {
		if (Element.visible(this._list_element)) {
			Event.register(document.body, 'mousedown', this._event_onmousedown);
		} 
	},
	onselect : function(e) {
		var el=e.element, o=this.options, s=this._source;
		
		s.selectedIndex = el._index;
		this._txt_element.firstChild.nodeValue = s.options[s.selectedIndex].text;

		this.onmousedown();
		if (this._source.onchange) this._source.onchange();
	},
	onover : function(e) {
		var el=e.element, c=[].load(el.parentNode.childNodes), i=el._index, o=this.options;
		c.map(function(v) {
			v.style.color = o.optTxtColor;
			v.style.background = o.optBgColor;
			return v;
		});
		el.style.color = o.optTxtHover;
		el.style.background = o.optBgHover;
	},
	onscrollbar : function(e) {
		e.stop();
	},
	paint : function() {
		var o=this.options,s=this._source,op;
		this._list_element.innerHTML = '';
		this._list_element.style.width = '';
		this._list_element.style.height = '';
		//this._list_element.style.fontSize = 9+'px';
		for(var i=0; i < s.options.length; i++) {
			op = this._makeOption(s.options[i].value, s.options[i].text);
			op._index  = i;
			Element.setCSS(op, {
				padding : '0px 5px',
				cursor  : 'default',
				fontSize: '13px',
				fontFamily: 'Gulim',
				letterSpacing: '0',
				color : (i==this._source.selectedIndex)?o.optTxtHover:o.optTxtColor,
				background : (i==this._source.selectedIndex)?o.optBgHover:o.optBgColor
			});
			this._list_element.appendChild(op);
		}

		var old_display = this._list_element.style.display;
		Element.show(this._list_element);
		if ((this._list_element.offsetHeight-2) > op.offsetHeight * o.listSize) {
			this._list_element.style.height = op.offsetHeight*o.listSize;
		}
		this._list_element.style.display = old_display;
	},
	refresh : function() {
		var s=this._source;
		
		this._txt_element.firstChild.nodeValue = s.options[s.selectedIndex].text;
	},
	_makeOption : function(value, text) {
		var o = $c('div'), t = this;
		o._value = value;
		o.appendChild(document.createTextNode(text));

		Event.register(o, 'mouseover', this.onover.bindForEvent(this));
		Event.register(o, 'mousedown', this.onselect.bindForEvent(this));

		return o;
	}
});

/* 2009-10-16 통합검색 개편 */
var Loadbox3 = Class({
	__const : function(id) {
		var s = this._source  = $(id);
		this.options = Class.extend({
			height: s.offsetHeight,
			width: s.offsetWidth,
			fontSize: 11,
			fontFamily: 'Dotum',
			listSize: 8,
			skinActive: false,
			skinFormat: '/img/common/ic/icon_arrow03.gif', // left, right, up, down, bt
			borderActive: true,
			borderColor: '#fff',
			optTxtColor: '#666',
			optBgColor: 'white',
			optTxtHover: 'black',
			optBgHover: '#B4EF62'
		}, arguments[1]);

		var o = this.options;
		var e = this._element = $c('div');
		var c = e.appendChild($c('div')); // container
		var p = Element.realPos(this._source);

		// replace html element
		this._source.parentNode.insertBefore(e, s);
		this._source.style.display = 'none';

		// border
		if (o.borderActive) {
			e.style.border = '1px solid '+o.borderColor;
		}

		Element.setCSS(e, {
			top : p.top+'px',
			left : p.left+'px',
			width : o.width+'px',
			height : (o.height-2)+'px',
			background : o.optBgColor
		});

		Element.setCSS(c, {
			width  : o.width+'px',
			height : (o.height-2)+'px',
			fontSize : o.fontSize+'px',
			overflow : 'hidden',
			cursor   : 'default'
		});
		c.onmousedown = this.onmousedown.bindForEvent(this);
		c.onmouseup   = this.onmouseup.bind(this);

		// button layer
		var b = c.appendChild($c('div'));
		Element.setCSS(b, {
			height     : '100%',
			background : 'no-repeat url('+o.skinFormat.replace('%s', 'bt')+') 50% 50%',
			cssFloat   : 'right',
			styleFloat : 'right'
		});

		// text box
		this._txt_element = c.appendChild($c('div'));
		with(this._txt_element) {
			appendChild(document.createTextNode(s.options[s.selectedIndex].text));
			//style.height = 20+'px';
			style.fontSize = o.fontSize+'px';
			style.fontFamily = 'Dotum';
			style.color = '#484848';
			//style.paddingLeft = 5+'px';
			style.overflow = 'hidden';
			style.marginTop = Math.max(Math.floor((o.height-offsetHeight)/2),0)+'px';
			style.marginLeft = style.marginTop;
		}
		c.appendChild($c('div')).style.clear = 'both';

		// re-margin
		var im = $c('img');
		im.onload = function(){b.style.width=im.width+'px'}
		im.src = o.skinFormat.replace('%s', 'bt');

		// options
		this._list_element = document.body.appendChild($c('div'));
		Element.setCSS(this._list_element, {
			position: 'absolute',
			border: '1px solid '+o.borderColor,
			display: 'none',
			overflow: 'auto',
			fontSize: o.fontSize+'px'
		});
		//this._list_element.style.fontSize = 11+'px';
		this._list_element.onmousedown = this.onscrollbar.bindForEvent(this);
		this.paint();

		// event binding
		this._event_onmousedown = this.onmousedown.bindForEvent(this);
	},
	onmousedown : function(e) {
		if (!Element.visible(this._list_element)) {
			var p = Element.realPos(this._element);

			this.paint();
			Element.show(this._list_element);
			if (this._list_element.offsetWidth < this._element.offsetWidth) {
				this._list_element.style.width = this._element.offsetWidth+'px';
			};
			Element.setCSS(this._list_element, {
				top : p.top+this._element.offsetHeight+'px',
				left : p.left+'px',
				zIndex : 1000
			});
		} else {
			Element.hide(this._list_element);
			Event.unregister(document.body, 'mousedown', this._event_onmousedown);
		}
	},
	onmouseup : function() {
		if (Element.visible(this._list_element)) {
			Event.register(document.body, 'mousedown', this._event_onmousedown);
		} 
	},
	onselect : function(e) {
		var el=e.element, o=this.options, s=this._source;
		
		s.selectedIndex = el._index;
		this._txt_element.firstChild.nodeValue = s.options[s.selectedIndex].text;

		this.onmousedown();
		if (this._source.onchange) this._source.onchange();
	},
	onover : function(e) {
		var el=e.element, c=[].load(el.parentNode.childNodes), i=el._index, o=this.options;
		c.map(function(v) {
			v.style.color = o.optTxtColor;
			v.style.background = o.optBgColor;
			return v;
		});
		el.style.color = o.optTxtHover;
		el.style.background = o.optBgHover;
	},
	onscrollbar : function(e) {
		e.stop();
	},
	paint : function() {
		var o=this.options,s=this._source,op;
		this._list_element.innerHTML = '';
		this._list_element.style.width = '';
		this._list_element.style.height = '';
		//this._list_element.style.fontSize = 9+'px';
		for(var i=0; i < s.options.length; i++) {
			op = this._makeOption(s.options[i].value, s.options[i].text);
			op._index  = i;
			Element.setCSS(op, {
				padding : '2px 5px',
				cursor  : 'default',
				fontSize: '11px',
				fontFamily: 'Dotum',
				color : (i==this._source.selectedIndex)?o.optTxtHover:o.optTxtColor,
				background : (i==this._source.selectedIndex)?o.optBgHover:o.optBgColor
			});
			this._list_element.appendChild(op);
		}

		var old_display = this._list_element.style.display;
		Element.show(this._list_element);
		if ((this._list_element.offsetHeight-2) > op.offsetHeight * o.listSize) {
			this._list_element.style.height = op.offsetHeight*o.listSize;
		}
		this._list_element.style.display = old_display;
	},
	refresh : function() {
		var s=this._source;
		
		this._txt_element.firstChild.nodeValue = s.options[s.selectedIndex].text;
	},
	_makeOption : function(value, text) {
		var o = $c('div'), t = this;
		o._value = value;
		o.appendChild(document.createTextNode(text));

		Event.register(o, 'mouseover', this.onover.bindForEvent(this));
		Event.register(o, 'mousedown', this.onselect.bindForEvent(this));

		return o;
	}
});