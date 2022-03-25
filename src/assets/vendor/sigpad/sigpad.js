/*! signature-pad.js - 0.0.1 - 2014-10-13 - motdotla */
 	var MicroEvent = function() {};
 MicroEvent.prototype = {
 	bind: function(event, fct) {
 		this._events = this._events || {};
 		this._events[event] = this._events[event] || [];
 		this._events[event].push(fct);
 	},
 	unbind: function(event, fct) {
 		this._events = this._events || {};
 		if (event in this._events === false) return;
 		this._events[event].splice(this._events[event].indexOf(fct), 1);
 	},
 	trigger: function(event /* , args... */ ) {
 		this._events = this._events || {};
 		if (event in this._events === false) return;
 		for (var i = 0; i < this._events[event].length; i++) {
 			this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
 		}
 	}
 };
 /**
  * mixin will delegate all MicroEvent.js function in the destination object
  *
  * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
  *
  * @param {Object} the object which will support MicroEvent
  */
 MicroEvent.mixin = function(destObject) {
 	var props = ['bind', 'unbind', 'trigger'];
 	for (var i = 0; i < props.length; i++) {
 		if (typeof destObject === 'function') {
 			destObject.prototype[props[i]] = MicroEvent.prototype[props[i]];
 		} else {
 			destObject[props[i]] = MicroEvent.prototype[props[i]];
 		}
 	}
 };
 // export in common js
 if (typeof module !== "undefined" && ('exports' in module)) {
 	module.exports = MicroEvent;
 }
 /*! signature-mark.js - 0.0.1 - 2014-10-12 - motdotla */
 (function(exports) {
 	var SignatureMark = function(canvas) {
 		if (!(this instanceof SignatureMark)) {
 			return new SignatureMark(canvas);
 		}
 		var canElement = document.getElementById("signature-canvas-0de4ce7e-4832-4cd2-82b6-74b0949f965a");
 		canElement = canvas;
 		this.init();
 		return this;
 	};
 	SignatureMark.prototype.init = function() {
 		this.initVariables();
 		this.initPainters();
 		this.initEvents();
 	};
 	exports.SignatureMark = SignatureMark;
 }(this));
 (function(SignatureMark) {
 	SignatureMark.prototype.initEvents = function() {
 		var self = this;
 		document.getElementById("signature-canvas-0de4ce7e-4832-4cd2-82b6-74b0949f965a").addEventListener(self.mouse_down, function(e) {
 			self.onCanvasMouseDown(self, e);
 		}, false);
 		document.getElementById("signature-canvas-0de4ce7e-4832-4cd2-82b6-74b0949f965a").addEventListener(self.mouse_move, function(e) {
 			self.onCanvasMouseMove(self, e);
 		}, false);
 		document.getElementById("signature-canvas-0de4ce7e-4832-4cd2-82b6-74b0949f965a").addEventListener('contextmenu', function(e) {
 			self.preventRightClick(self, e);
 		}, false);
 		document.addEventListener(self.mouse_up, function(e) {
 			self.onCanvasMouseUp(self, e);
 		}, false);
 		document.getElementById("signature-canvas-0de4ce7e-4832-4cd2-82b6-74b0949f965a").addEventListener(self.mouse_up, function(e) {
 			self.onCanvasMouseUp(self, e);
 		}, false);
 	};
 	SignatureMark.prototype.preventRightClick = function(self, e) {
 		e.preventDefault();
 	};
 	SignatureMark.prototype.onCanvasMouseDown = function(self, e) {
 		e.preventDefault();
 		self.setCanvasOffset(self);
 		self.startDrawingStroke(self);
 		self.setMouseXAndMouseY(self, e);
 		self.setPainters(self);
 	};
 	SignatureMark.prototype.onCanvasMouseMove = function(self, e) {
 		e.preventDefault();
 		self.setMouseXAndMouseY(self, e);
 	};
 	SignatureMark.prototype.onCanvasMouseUp = function(self, e) {
 		self.stopDrawingStroke(self);
 	};
 	SignatureMark.prototype.setMouseXAndMouseY = function(self, event) {
 		if (!!self.touch_supported) {
 			target = event.touches[0];
 			self.mouseX = target.pageX - self.canvasOffsetLeft;
 			self.mouseY = target.pageY - self.canvasOffsetTop;
 		} else {
 			self.mouseX = event.pageX - self.canvasOffsetLeft;
 			self.mouseY = event.pageY - self.canvasOffsetTop;
 		}
 	};
 	SignatureMark.prototype.setCanvasOffset = function(self) {
 		canvasOffset = self.Offset(document.getElementById("signature-canvas-0de4ce7e-4832-4cd2-82b6-74b0949f965a"));
 		self.canvasOffsetLeft = canvasOffset.left;
 		self.canvasOffsetTop = canvasOffset.top;
 	};
 }(SignatureMark));
 (function(SignatureMark) {
 	SignatureMark.prototype.Offset = function(element) {
 		if (element === undefined) return null;
 		var obj = element.getBoundingClientRect();
 		return {
 			left: obj.left + window.pageXOffset,
 			top: obj.top + window.pageYOffset
 		};
 	};
 }(SignatureMark));
 (function(SignatureMark) {
 	SignatureMark.prototype.initPainters = function() {
 		this.painters = [];
 		for (var i = 0; i < this.max_strokes; i++) {
 			var ease = Math.random() * 0.05 + this.easing;
 			this.painters.push({
 				dx: 0,
 				dy: 0,
 				ax: 0,
 				ay: 0,
 				div: 0.1,
 				ease: ease
 			});
 		}
 	};
 	SignatureMark.prototype.setPainters = function(self) {
 		for (var i = 0; i < self.painters.length; i++) {
 			pntr = self.painters[i];
 			pntr.dx = self.mouseX;
 			pntr.dy = self.mouseY;
 		}
 	};
 }(SignatureMark));
 (function(SignatureMark) {
 	SignatureMark.prototype.drawStroke = function(self) {
 		var i;
 		for (i = 0; i < self.painters.length; i++) {
 			self.context.beginPath();
 			pntr = self.painters[i];
 			self.context.moveTo(pntr.dx, pntr.dy);
 			var dx1 = pntr.ax = (pntr.ax + (pntr.dx - self.mouseX) * pntr.div) * pntr.ease;
 			pntr.dx -= dx1;
 			var dx2 = pntr.dx;
 			var dy1 = pntr.ay = (pntr.ay + (pntr.dy - self.mouseY) * pntr.div) * pntr.ease;
 			pntr.dy -= dy1;
 			var dy2 = pntr.dy;
 			self.context.lineTo(dx2, dy2);
 			self.context.stroke();
 		}
 	};
 	SignatureMark.prototype.startDrawingStroke = function(self) {
 		var interval = setInterval(function() {
 			self.drawStroke(self);
 		}, self.refresh_rate);
 		self.strokeIntervals.push(interval);
 	};
 	SignatureMark.prototype.stopDrawingStroke = function(self) {
 		for (var i = 0; i < self.strokeIntervals.length; i++) {
 			clearInterval(self.strokeIntervals[i]);
 		}
 	};
 }(SignatureMark));
 (function(SignatureMark) {
 	SignatureMark.prototype.initVariables = function() {
 		this.touch_supported = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) ? true : false;
 		var canvElement = document.getElementById("signature-canvas-0de4ce7e-4832-4cd2-82b6-74b0949f965a");
 		this.context = canvElement.getContext('2d');
 		this.color = [0, 0, 0];
 		this.brush_pressure = 0.5;
 		this.context.strokeStyle = "rgba(" + this.color[0] + ", " + this.color[1] + ", " + this.color[2] + ", " + this.brush_pressure + ")";
 		this.context.lineWidth = 2.5; // brush size
 		this.painters = [];
 		this.mouseX = 0;
 		this.mouseY = 0;
 		this.strokeIntervals = [];
 		this.refresh_rate = 5;
 		this.max_strokes = 12;
 		this.easing = 0.7;
 		this.mouse_down = "mousedown";
 		this.mouse_move = "mousemove";
 		this.mouse_up = "mouseup";
 		if (!!this.touch_supported) {
 			this.mouse_down = "touchstart";
 			this.mouse_move = "touchmove";
 			this.mouse_up = "touchend";
 		} else {
 			this.refresh_rate = 10;
 			this.max_strokes = 100;
 		}
 	};
 }(SignatureMark));
 (function(exports) {
 	var SignaturePad = function() {
 		if (!(this instanceof SignaturePad)) {
 			return new SignaturePad();
 		}
 		this.uuid = "0de4ce7e-4832-4cd2-82b6-74b0949f965a"; //this.Uuid();
 		this.script = this.CurrentlyExecutedScript();
 		this.init();
 		return this;
 	};
 	SignaturePad.prototype.init = function() {
 		if (this.script) {
 			this.script.className += " signature-pad-script";
 			this.script.id = "signature-pad-script-" + this.uuid;
 			this.events();
 			var canvElement = document.getElementById("signature-canvas-0de4ce7e-4832-4cd2-82b6-74b0949f965a");
 			SignatureMark(canvElement);
 		} else {
 			console.error("Could not find script tag to initialize on.");
 		}
 	};
 	MicroEvent.mixin(SignaturePad);
 	exports.SignaturePad = SignaturePad;
 }(this));
 (function(SignaturePad) {
 	var DEFAULT_SIGNATURE = "data:image/gif;base64,R0lGODlhRAIEAaIAAOLi1v7+5enp2ubm2Pf34e7u3QAAAAAAACH5BAAHAP8ALAAAAABEAgQBAAP/GLrc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAMKHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mix/6PHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJs6fPn0CDCh1KtKjRo0iTKl3KtKnTp1CjSp1KtarVq1izat3KtavXr2DDih1LtqzZs2jTql3Ltq3bt3Djyp1Lt67du3jz6t3Lt6/fv4ADCx5MuLDhw4gTK17MuLHjx5AjS55MubLly5gza97MubPnz6BDix5NurTp06hTq17NurXr17Bjy55Nu7bt27hz697Nu7fv38CDCx9OvLjx48iTK1/OvLnz59CjS59Ovbr169g5CADAnUCE7QAEZE9DgDuAARAKmB+vZoB57w3Ud2dP3rx4BuXn009jHgD8AP/5AVDAfmrIF94C5g1IoBr9eQfefQumYWABBkbIRn/vWbgGeBlqqEaAAnq4BogKingGiNyZiAaG+qk4xoMBoueiGPLJ2OCMYBgIn4EQ4rhFgP8FcKOPWgRYogITEqlFgg/0pyQWD6bHZAMsYuhAlVZSieV6Wm4JwJVeftnllmB6WSaZY2J5ppppVrmmm22y+KaccWbJQJhi3hnmnHYiuGedTgLKpZ5mCpqioXn6WSihaDLKpqNwQkrnC1FGEKiklyraqKaPchqpp5OC2qcCePKZKal/YnqqkKmKumqpiJo6qKuzoroorYeqWiurt9q6qa+dAvupsKESOyqvvyIbrLKKwzJbLAsERDtBtNIaKmuuuCZq7KutbrsrrLpi6624zh4LbrbXalsut72u+2237pJ77rjqzhtvvfDaq2++/LZr75MAByzwwAQXbPDBCCes8MIMN+zwwxBHLPHEFFds8cUYZ6zxxhx37PHHIIcs8sgkl2zyySinrPLKLLfs8sswxyzzzDTXbPPNbiUAADs=";
 }(SignaturePad));
 (function(SignaturePad) {
 	var self;
 	var CLICK = "click";
 	var TOUCH_SUPPORTED = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) ? true : false;
 	if (!!TOUCH_SUPPORTED) {
 		CLICK = "touchend";
 	}
 	SignaturePad.prototype.events = function() {
 		self = this;
 		document.getElementById("sign").addEventListener(CLICK, this.show, false);
 		document.getElementById("add-signature-btn-0de4ce7e-4832-4cd2-82b6-74b0949f965a").addEventListener(CLICK, this.saveSignature, false);
 		document.getElementById("close-signature-btn-0de4ce7e-4832-4cd2-82b6-74b0949f965a").addEventListener(CLICK, this.hide, false);
 		document.getElementById("clear-signature-btn-0de4ce7e-4832-4cd2-82b6-74b0949f965a").addEventListener(CLICK, this.clear, false);
 		document.getElementById("signature-wrapper-0de4ce7e-4832-4cd2-82b6-74b0949f965a").addEventListener(CLICK, function(e) {
 			e.stopPropagation();
 		}, false);
 		document.getElementById("signature-rotator-close-0de4ce7e-4832-4cd2-82b6-74b0949f965a").addEventListener(CLICK, this.hideRotatorAndPad, false);
 		document.getElementById("signature-rotator-close-0de4ce7e-4832-4cd2-82b6-74b0949f965a").addEventListener(CLICK, this.hideRotatorAndPad, false);
 		window.onresize = function(e) {
 			self.showOrHideRotator(e);
 		};
 	};
 	SignaturePad.prototype.saveSignature = function(e) {
 		var data_url = document.getElementById("signature-canvas-0de4ce7e-4832-4cd2-82b6-74b0949f965a").toDataURL("png");
 		self.trigger("signature_pad.data_url", data_url);
 		self.hide(e);
 		document.getElementById("signature-pad-img-0de4ce7e-4832-4cd2-82b6-74b0949f965a").src = data_url;
 	};
 	SignaturePad.prototype.show = function(e) {
 		if (e) {
 			e.preventDefault();
 		}
 		document.getElementById("signature-overlay-0de4ce7e-4832-4cd2-82b6-74b0949f965a").className += " signature-show";
 		self.showOrHideRotator();
 	};
 	SignaturePad.prototype.hide = function(e) {
 		if (e) {
 			e.preventDefault();
 		}
 		document.getElementById("signature-overlay-0de4ce7e-4832-4cd2-82b6-74b0949f965a").className = "signature-overlay";
 	};
 	SignaturePad.prototype.clear = function(e) {
 		if (e) {
 			e.preventDefault();
 		}
 		var context = document.getElementById("signature-canvas-0de4ce7e-4832-4cd2-82b6-74b0949f965a").getContext("2d");
 		context.clearRect(0, 0, document.getElementById("signature-canvas-0de4ce7e-4832-4cd2-82b6-74b0949f965a").width, document.getElementById("signature-canvas-0de4ce7e-4832-4cd2-82b6-74b0949f965a").height);
 	};
 	SignaturePad.prototype.showOrHideRotator = function(e) {
 		if (e) {
 			e.preventDefault();
 		}
 		if (!self.StandardScreen() && self.visible()) {
 			var mql = window.matchMedia("(orientation: portrait)");
 			if (mql.matches) {
 				self.showRotator();
 			} else {
 				self.hideRotator();
 			}
 		} else {
 			self.hideRotator();
 		}
 	};
 	SignaturePad.prototype.visible = function(e) {
 		if (e) {
 			e.preventDefault();
 		}
 		return document.getElementById("signature-overlay-0de4ce7e-4832-4cd2-82b6-74b0949f965a").className.indexOf("signature-show") > 0;
 	};
 	SignaturePad.prototype.showRotator = function(e) {
 		if (e) {
 			e.preventDefault();
 		}
 		if (self.visible()) {
 			document.getElementById("signature-rotator-0de4ce7e-4832-4cd2-82b6-74b0949f965a").className += " signature-show";
 		}
 	};
 	SignaturePad.prototype.hideRotator = function(e) {
 		if (e) {
 			e.preventDefault();
 		}
 		document.getElementById("signature-rotator-0de4ce7e-4832-4cd2-82b6-74b0949f965a").className = "signature-rotator";
 		//  self.rotator.className = "signature-rotator";
 	};
 	SignaturePad.prototype.hideRotatorAndPad = function(e) {
 		if (e) {
 			e.preventDefault();
 		}
 		self.hide();
 		self.hideRotator();
 	};
 }(SignaturePad));
 (function(SignaturePad) {
 	SignaturePad.prototype.CurrentlyExecutedScript = function() {
 		var script;
 		if (document) {
 			var scripts = document.getElementsByTagName('script');
 			script = scripts[scripts.length - 1];
 		}
 		return script;
 	};
 	SignaturePad.prototype.InsertAfter = function(reference_node, new_node) {
 		return reference_node.parentNode.insertBefore(new_node, reference_node.nextSibling);
 	};
 	SignaturePad.prototype.StandardScreen = function() {
 		return document.body.clientWidth >= 580;
 	};
 	SignaturePad.prototype.FireEvent = function(name, target, data) {
 		//Create a generic event
 		var bubbles = true;
 		var cancelable = true;
 		var event = document.createEvent("Events");
 		//Initialize it to be the event we want
 		event.initEvent(name, bubbles, cancelable);
 		event.data = data;
 		//FIRE!
 		target.dispatchEvent(event);
 	};
 }(SignaturePad));
 var signature_pad = SignaturePad(); 