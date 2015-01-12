define("TimingFunctionUtils",["require","exports","module"],function(t,e){function i(t){if("string"!=typeof t)return{isNumber:!1,value:null};var e=parseFloat(+t,10),i="number"==typeof e&&!isNaN(e)&&1/0!==e&&e!==-1/0;return{isNumber:i,value:e}}function n(t){var e,n,o=[".42","0",".58","1"],s=t.index,r=t[0];if(t&&(t=t[1].split(",")),t)for(n=0;3>=n;n++)t[n]&&(t[n]=t[n].trim(),e=i(t[n]),e.isNumber?(0===n||2===n)&&(e.value<0?t[n]="0":e.value>1&&(t[n]="1")):t[n]=void 0),t[n]||(t[n]=o[n]);else t=o;return t=t.splice(0,4),t="cubic-bezier("+t.join(", ")+")",t=t.match(m),t?(t.index=s,t.originalString=r,t):null}function o(t){var e=i(t[1]),n=i(t[2]),o=i(t[3]),s=i(t[4]);return e.isNumber&&n.isNumber&&o.isNumber&&s.isNumber?e.value<0||e.value>1||o.value<0||o.value>1?!1:!0:!1}function s(t){var e,n=["5","end"],o=n,s=t.index,r=t[0];return t&&(t=t[1].split(",")),t&&(t[0]&&(e=t[0].replace(/[\s\"']/g,""),e=i(e),e.isNumber?e.value&&(e.value=Math.floor(e.value)):e.value=n[0],e.value<1&&(e.value=n[0]),o[0]=e.value),t[1]&&(e=t[1].replace(/[\s\"']/g,""),e=e.substr(0,1),o[1]="s"===e?"start":"end")),o="steps("+o.join(", ")+")",o=o.match(w),o?(o.index=s,o.originalString=r,o):null}function r(t){var e=i(t[1]);return!e.isNumber||e.value<1||Math.floor(e.value)!==e.value?!1:t[2]&&"start"!==t[2]&&"end"!==t[2]?!1:!0}function a(t,e,i,n){t&&t.elem&&(e?(t.shown=!0,t.animationInProgress=!1,t.elem.removeClass("fadeout"),t.elem.html(p.format(d.INLINE_TIMING_EDITOR_INVALID,i,n)),t.elem.css("display","block")):t.shown?(t.animationInProgress=!0,g.animateUsingClass(t.elem[0],"fadeout",750).done(function(){t.animationInProgress&&t.elem.hide(),t.shown=!1,t.animationInProgress=!1})):t.elem.hide())}function c(t,e){switch(e){case P:t.isBezier=!0;break;case T:t.isStep=!0}return t}function u(t,e){var i;if(i=t.match(m),i&&o(i))return c(i,P);if(i=t.match(f)){if(i=n(i),i&&o(i))return c(i,P);window.console.log("brackets-cubic-bezier: TimingFunctionUtils._getValidBezierParams created invalid code")}if(e){if(i=t.match(b))return c(i,P)}else if(i=t.match(v))return c(t.match(b),P);if(e){if(i=t.match(C))return c(i,P)}else if(i=t.match(_))return c(t.match(C),P);return null}function h(t,e){var i;if(i=t.match(w),i&&r(i))return c(i,T);if(i=t.match(E)){if(i=s(i),i&&r(i))return c(i,T);window.console.log("brackets-steps: TimingFunctionUtils._getValidStepsParams created invalid code")}if(e){if(i=t.match(y))return c(i,T)}else if(i=t.match(x))return c(t.match(y),T);return null}function l(t,e){return u(t,e)||h(t,e)}var d=brackets.getModule("strings"),p=brackets.getModule("utils/StringUtils"),g=brackets.getModule("utils/AnimationUtils"),m=/cubic-bezier\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/,f=/cubic-bezier\((.*)\)/,v=/[: ,]ease(?:-in)?(?:-out)?[ ,;]/,b=/ease(?:-in)?(?:-out)?/,_=/transition.*?[: ,]linear[ ,;]/,C=/linear/,w=/steps\(\s*(\d+)\s*(?:,\s*(\w+)\s*)?\)/,E=/steps\((.*)\)/,x=/[: ,](?:step-start|step-end)[ ,;]/,y=/step-start|step-end/,P=1,T=2;e.timingFunctionMatch=l,e.bezierCurveMatch=u,e.stepsMatch=h,e.showHideHint=a}),define("text",["module"],function(t){var e,i,n,o,s,r=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],a=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,c=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,u="undefined"!=typeof location&&location.href,h=u&&location.protocol&&location.protocol.replace(/\:/,""),l=u&&location.hostname,d=u&&(location.port||void 0),p={},g=t.config&&t.config()||{};return e={version:"2.0.10",strip:function(t){if(t){t=t.replace(a,"");var e=t.match(c);e&&(t=e[1])}else t="";return t},jsEscape:function(t){return t.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:g.createXhr||function(){var t,e,i;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(e=0;3>e;e+=1){i=r[e];try{t=new ActiveXObject(i)}catch(n){}if(t){r=[i];break}}return t},parseName:function(t){var e,i,n,o=!1,s=t.indexOf("."),r=0===t.indexOf("./")||0===t.indexOf("../");return-1!==s&&(!r||s>1)?(e=t.substring(0,s),i=t.substring(s+1,t.length)):e=t,n=i||e,s=n.indexOf("!"),-1!==s&&(o="strip"===n.substring(s+1),n=n.substring(0,s),i?i=n:e=n),{moduleName:e,ext:i,strip:o}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(t,i,n,o){var s,r,a,c=e.xdRegExp.exec(t);return c?(s=c[2],r=c[3],r=r.split(":"),a=r[1],r=r[0],!(s&&s!==i||r&&r.toLowerCase()!==n.toLowerCase()||(a||r)&&a!==o)):!0},finishLoad:function(t,i,n,o){n=i?e.strip(n):n,g.isBuild&&(p[t]=n),o(n)},load:function(t,i,n,o){if(o.isBuild&&!o.inlineText)return void n();g.isBuild=o.isBuild;var s=e.parseName(t),r=s.moduleName+(s.ext?"."+s.ext:""),a=i.toUrl(r),c=g.useXhr||e.useXhr;return 0===a.indexOf("empty:")?void n():void(!u||c(a,h,l,d)?e.get(a,function(i){e.finishLoad(t,s.strip,i,n)},function(t){n.error&&n.error(t)}):i([r],function(t){e.finishLoad(s.moduleName+"."+s.ext,s.strip,t,n)}))},write:function(t,i,n){if(p.hasOwnProperty(i)){var o=e.jsEscape(p[i]);n.asModule(t+"!"+i,"define(function () { return '"+o+"';});\n")}},writeFile:function(t,i,n,o,s){var r=e.parseName(i),a=r.ext?"."+r.ext:"",c=r.moduleName+a,u=n.toUrl(r.moduleName+a)+".js";e.load(c,n,function(){var i=function(t){return o(u,t)};i.asModule=function(t,e){return o.asModule(t,u,e)},e.write(t,c,i,s)},s)}},"node"===g.env||!g.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]?(i=require.nodeRequire("fs"),e.get=function(t,e,n){try{var o=i.readFileSync(t,"utf8");0===o.indexOf("﻿")&&(o=o.substring(1)),e(o)}catch(s){n(s)}}):"xhr"===g.env||!g.env&&e.createXhr()?e.get=function(t,i,n,o){var s,r=e.createXhr();if(r.open("GET",t,!0),o)for(s in o)o.hasOwnProperty(s)&&r.setRequestHeader(s.toLowerCase(),o[s]);g.onXhr&&g.onXhr(r,t),r.onreadystatechange=function(){var e,o;4===r.readyState&&(e=r.status,e>399&&600>e?(o=new Error(t+" HTTP status: "+e),o.xhr=r,n(o)):i(r.responseText),g.onXhrComplete&&g.onXhrComplete(r,t))},r.send(null)}:"rhino"===g.env||!g.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?e.get=function(t,e){var i,n,o="utf-8",s=new java.io.File(t),r=java.lang.System.getProperty("line.separator"),a=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s),o)),c="";try{for(i=new java.lang.StringBuffer,n=a.readLine(),n&&n.length()&&65279===n.charAt(0)&&(n=n.substring(1)),null!==n&&i.append(n);null!==(n=a.readLine());)i.append(r),i.append(n);c=String(i.toString())}finally{a.close()}e(c)}:("xpconnect"===g.env||!g.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(n=Components.classes,o=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),s="@mozilla.org/windows-registry-key;1"in n,e.get=function(t,e){var i,r,a,c={};s&&(t=t.replace(/\//g,"\\")),a=new FileUtils.File(t);try{i=n["@mozilla.org/network/file-input-stream;1"].createInstance(o.nsIFileInputStream),i.init(a,1,0,!1),r=n["@mozilla.org/intl/converter-input-stream;1"].createInstance(o.nsIConverterInputStream),r.init(i,"utf-8",i.available(),o.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),r.readString(i.available(),c),r.close(),i.close(),e(c.value)}catch(u){throw new Error((a&&a.path||"")+": "+u)}}),e}),define("text!BezierCurveEditorTemplate.html",[],function(){return'<div tabindex="-1" class="bezier-curve-editor">\n    <div class="cubic-bezier">\n        <div class="coordinate-plane">\n            <span   class="control-point P0"></span>\n            <button class="control-point P1"></button>\n            <button class="control-point P2"></button>\n            <span   class="control-point P3"></span>\n            <canvas height="300" width="150" class="curve"></canvas>\n        </div>\n        <div class="info">\n            <p>{{{BEZIER_EDITOR_INFO}}}</p>\n            <div class="hint"></div>\n        </div>\n    </div>\n</div>\n'}),define("BezierCurveEditor",["require","exports","module","TimingFunctionUtils","text!BezierCurveEditorTemplate.html"],function(t,e){function i(t){if(this.coordinates="string"==typeof t?t.split(","):t,!this.coordinates)throw"No offsets were defined";this.coordinates=this.coordinates.map(function(t){return+t});var e;for(e=3;e>=0;e--){var i=this.coordinates[e];if(isNaN(i)||e%2===0&&(0>i||i>1))throw"Wrong coordinate at "+e+"("+i+")"}}function n(t,e,i){this.canvas=t,this.bezier=e,this.padding=this.getPadding(i);var n=this.canvas.getContext("2d"),o=this.padding;n.scale(t.width*(1-o[1]-o[3]),.5*-t.height*(1-o[0]-o[2])),n.translate(o[3]/(1-o[1]-o[3]),-1-o[0]/(1-o[0]-o[2])-.5)}function o(t){function e(t,e,i,n){return Math.sqrt(Math.pow(t-i,2)+Math.pow(e-n,2))}var i=t.target,n=i.bezierEditor,o=n._getCurveBoundingBox(),s=o.left,r=o.top,a=t.pageX-s,c=t.pageY-r-v,u=$(n.P1),h=$(n.P2),l=e(a,c,parseInt(u.css("left"),10),parseInt(u.css("top"),10)),d=e(a,c,parseInt(h.css("left"),10),parseInt(h.css("top"),10)),p=d>l?u:h;p.css({left:a+"px",top:c+"px"}),p.get(0).focus(),n._cubicBezierCoords=n.bezierCanvas.offsetsToCoordinates(n.P1).concat(n.bezierCanvas.offsetsToCoordinates(n.P2)),n._commitTimingFunction(),n._updateCanvas()}function s(t,e,i){function n(){return s.dragElement?(s._commitTimingFunction(),s._updateCanvas(),void(w=window.requestAnimationFrame(n))):void(w=null)}var o=t.target,s=o.bezierEditor;return s.dragElement&&1!==t.which?(s.dragElement=null,s._commitTimingFunction(),s._updateCanvas(),void(s=null)):(e=Math.min(Math.max(0,e),C),s.dragElement&&$(s.dragElement).css({left:e+"px",top:i+"px"}),s._cubicBezierCoords=s.bezierCanvas.offsetsToCoordinates(s.P1).concat(s.bezierCanvas.offsetsToCoordinates(s.P2)),void(w||(w=window.requestAnimationFrame(n))))}function r(t,e,i){var n=Math.round(100*e/C),o=Math.round(100*((_-i)/_));n=Math.min(Math.max(0,n),100),t.parentNode.setAttribute("data-time",n),t.parentNode.setAttribute("data-progression",o)}function a(t){var e=t.target,i=e.bezierEditor,n=i._getCurveBoundingBox(),o=n.left,a=n.top,c=t.pageX-o,u=t.pageY-a-v;if(r(e,c,u),i.dragElement){if(0===t.pageX&&0===t.pageY)return;s(t,c,u)}}function c(t){var e=t.target,i=e.bezierEditor,n=i._getCurveBoundingBox(),o=n.left,a=n.top,c=t.pageX-o,u=t.pageY-a-v;r(i.curve,c,u),(0!==t.pageX||0!==t.pageY)&&s(t,c,u)}function u(t){var e=t.target;e.bezierEditor.dragElement=e}function h(t){var e=t.target;e.focus(),e.bezierEditor.dragElement&&(e.bezierEditor.dragElement=null,e.bezierEditor._commitTimingFunction(),e.bezierEditor._updateCanvas())}function l(t){var e=t.keyCode,i=t.target,n=i.bezierEditor;if(e>=p.DOM_VK_LEFT&&e<=p.DOM_VK_DOWN){t.preventDefault();var o,s=$(t.target),r=parseInt(s.css("left"),10),a=parseInt(s.css("top"),10),c=t.shiftKey?15:3;switch(e){case p.DOM_VK_LEFT:if(o=Math.max(0,r-c),r===o)return!1;s.css({left:o+"px"});break;case p.DOM_VK_UP:if(o=Math.max(-v,a-c),a===o)return!1;s.css({top:o+"px"});break;case p.DOM_VK_RIGHT:if(o=Math.min(C,r+c),r===o)return!1;s.css({left:o+"px"});break;case p.DOM_VK_DOWN:if(o=Math.min(_+b,a+c),a===o)return!1;s.css({top:o+"px"})}return n._cubicBezierCoords=n.bezierCanvas.offsetsToCoordinates(n.P1).concat(n.bezierCanvas.offsetsToCoordinates(n.P2)),n._commitTimingFunction(),n._updateCanvas(),!0}return e===p.DOM_VK_ESCAPE?!0:e!==p.DOM_VK_TAB||t.ctrlKey||t.metaKey||t.altKey?!1:($(t.target).hasClass("P1")?$(".P2").focus():$(".P1").focus(),t.preventDefault(),!0)}function d(t,e,i){this.$element=$(Mustache.render(f,g)),t.append(this.$element),this._callback=i,this.dragElement=null,this._cubicBezierCoords=this._getCubicBezierCoords(e),this.hint={},this.hint.elem=$(".hint",this.$element),e.originalString?m.showHideHint(this.hint,!0,e.originalString,"cubic-bezier("+this._cubicBezierCoords.join(", ")+")"):m.showHideHint(this.hint,!1),this.P1=this.$element.find(".P1")[0],this.P2=this.$element.find(".P2")[0],this.curve=this.$element.find(".curve")[0],this.P1.bezierEditor=this.P2.bezierEditor=this.curve.bezierEditor=this,this.bezierCanvas=new n(this.curve,null,[0,0]),this._updateCanvas(),$(this.curve).on("click",o).on("mousemove",a),$(this.P1).on("mousemove",c).on("mousedown",u).on("mouseup",h).on("keydown",l),$(this.P2).on("mousemove",c).on("mousedown",u).on("mouseup",h).on("keydown",l)}var p=brackets.getModule("utils/KeyEvent"),g=brackets.getModule("strings"),m=t("TimingFunctionUtils"),f=t("text!BezierCurveEditorTemplate.html"),v=75,b=75,_=150,C=150,w=null;n.prototype={getOffsets:function(){var t=this.padding,e=this.canvas.width,i=.5*this.canvas.height;return[{left:e*(this.bezier.coordinates[0]*(1-t[3]-t[1])-t[3])+"px",top:i*(1-this.bezier.coordinates[1]*(1-t[0]-t[2])-t[0])+"px"},{left:e*(this.bezier.coordinates[2]*(1-t[3]-t[1])-t[3])+"px",top:i*(1-this.bezier.coordinates[3]*(1-t[0]-t[2])-t[0])+"px"}]},prettify:function(t){return(Math.round(100*t)/100).toString().replace(/^0\./,".")},offsetsToCoordinates:function(t){var e=this.padding,i=this.canvas.width,n=.5*this.canvas.height;return e=e.map(function(t,e){return t*(e%2?i:n)}),[this.prettify((parseInt($(t).css("left"),10)-e[3])/(i+e[1]+e[3])),this.prettify((n-parseInt($(t).css("top"),10)-e[2])/(n-e[0]-e[2]))]},plot:function(t){var e,i=this.bezier.coordinates,n=this.canvas.getContext("2d"),o={handleTimingFunction:"#2893ef",handleThickness:.008,vBorderThickness:.02,hBorderThickness:.01,bezierTimingFunction:"#2893ef",bezierThickness:.03};t=t||{};for(e in o)o.hasOwnProperty(e)&&(t.hasOwnProperty(e)||(t[e]=o[e]));n.clearRect(-.5,-.5,2,2),n.beginPath(),n.fillStyle=t.handleTimingFunction,n.lineWidth=t.handleThickness,n.strokeStyle=t.handleTimingFunction,n.moveTo(0,0),n.lineTo(i[0],i[1]),n.moveTo(1,1),n.lineTo(i[2],i[3]),n.stroke(),n.closePath(),n.beginPath(),n.arc(i[0],i[1],1.5*t.handleThickness,0,2*Math.PI,!1),n.closePath(),n.fill(),n.beginPath(),n.arc(i[2],i[3],1.5*t.handleThickness,0,2*Math.PI,!1),n.closePath(),n.fill(),n.beginPath(),n.lineWidth=t.bezierThickness,n.strokeStyle=t.bezierColor,n.moveTo(0,0),n.bezierCurveTo(i[0],i[1],i[2],i[3],1,1),n.stroke(),n.closePath()},getPadding:function(t){var e="number"==typeof t?[t]:t;return 1===e.length&&(e[1]=e[0]),2===e.length&&(e[2]=e[0]),3===e.length&&(e[3]=e[1]),e}},d.prototype.destroy=function(){this.P1.bezierEditor=this.P2.bezierEditor=this.curve.bezierEditor=null,$(this.curve).off("click",o).off("mousemove",a),$(this.P1).off("mousemove",c).off("mousedown",u).off("mouseup",h).off("keydown",l),$(this.P2).off("mousemove",c).off("mousedown",u).off("mouseup",h).off("keydown",l)},d.prototype.getRootElement=function(){return this.$element},d.prototype.focus=function(){return this.P1.focus(),!0},d.prototype._commitTimingFunction=function(){var t="cubic-bezier("+this._cubicBezierCoords[0]+", "+this._cubicBezierCoords[1]+", "+this._cubicBezierCoords[2]+", "+this._cubicBezierCoords[3]+")";this._callback(t),m.showHideHint(this.hint,!1)},d.prototype._getCubicBezierCoords=function(t){if(t[0].match(/^cubic-bezier/))return t.slice(1,5);switch(t[0]){case"linear":return["0","0","1","1"];case"ease":return[".25",".1",".25","1"];case"ease-in":return[".42","0","1","1"];case"ease-out":return["0","0",".58","1"];case"ease-in-out":return[".42","0",".58","1"]}return window.console.log("brackets-cubic-bezier: getCubicBezierCoords() passed invalid RegExp match array"),["0","0","0","0"]},d.prototype._getCurveBoundingBox=function(){var t=this.$element.find(".curve"),e=t.offset();return{left:e.left,top:e.top,width:t.width(),height:t.height()}},d.prototype._updateCanvas=function(){if(this._cubicBezierCoords){this.bezierCanvas.bezier=window.bezier=new i(this._cubicBezierCoords);var t=this.bezierCanvas.getOffsets();$(this.P1).css({left:t[0].left,top:t[0].top}),$(this.P2).css({left:t[1].left,top:t[1].top}),this.bezierCanvas.plot()}},d.prototype.handleExternalUpdate=function(t){this._cubicBezierCoords=this._getCubicBezierCoords(t),this._updateCanvas(),t.originalString?m.showHideHint(this.hint,!0,t.originalString,"cubic-bezier("+this._cubicBezierCoords.join(", ")+")"):m.showHideHint(this.hint,!1)},e.BezierCurveEditor=d}),define("text!StepEditorTemplate.html",[],function(){return'<div tabindex="-1" class="step-editor">\n    <div class="steps-func">\n        <div class="coordinate-plane">\n            <canvas height="180" width="180" class="steps" tabindex="1"></canvas>\n        </div>\n        <div class="info">\n            <p>{{{STEPS_EDITOR_INFO}}}</p>\n            <div class="hint"></div>\n        </div>\n    </div>\n</div>\n'}),define("StepEditor",["require","exports","module","TimingFunctionUtils","text!StepEditorTemplate.html"],function(t,e){function i(t){if(!t)throw"No parameters were defined";this.count=t.count,this.timing=t.timing}function n(t,e,i){this.canvas=t,this.stepParams=e,this.padding=this.getPadding(i);var n=this.canvas.getContext("2d"),o=this.padding;n.scale(t.width*(1-o[1]-o[3]),-t.height*(1-o[0]-o[2])),n.translate(o[3]/(1-o[1]-o[3]),-1-o[0]/(1-o[0]-o[2]))}function o(t){var e=t.keyCode,i=t.target,n=i.stepEditor;if(e>=r.DOM_VK_LEFT&&e<=r.DOM_VK_DOWN){switch(t.preventDefault(),e){case r.DOM_VK_LEFT:n.stepCanvas.stepParams.timing="start";break;case r.DOM_VK_UP:n.stepCanvas.stepParams.count++;break;case r.DOM_VK_RIGHT:n.stepCanvas.stepParams.timing="end";break;case r.DOM_VK_DOWN:n.stepCanvas.stepParams.count>1&&n.stepCanvas.stepParams.count--}return n._stepParams=n.stepCanvas.stepParams,n._commitTimingFunction(),n._updateCanvas(),!0}return e===r.DOM_VK_ESCAPE?!0:!1}function s(t,e,i){this.$element=$(Mustache.render(u,a)),t.append(this.$element),this._callback=i,this._stepParams=this._getStepParams(e),this.hint={},this.hint.elem=$(".hint",this.$element),e.originalString?c.showHideHint(this.hint,!0,e.originalString,"steps("+this._stepParams.count.toString()+", "+this._stepParams.timing+")"):c.showHideHint(this.hint,!1),this.canvas=this.$element.find(".steps")[0],this.canvas.stepEditor=this,this.stepCanvas=new n(this.canvas,null,[.1]),this._updateCanvas(),$(this.canvas).on("keydown",o)}var r=brackets.getModule("utils/KeyEvent"),a=brackets.getModule("strings"),c=t("TimingFunctionUtils"),u=t("text!StepEditorTemplate.html"),h=1,l=2;n.prototype={drawBackground:function(){this.ctx.beginPath(),this.ctx.lineWidth=this.settings.borderWidth,this.ctx.strokeStyle=this.settings.borderColor,this.ctx.fillStyle=this.settings.bgColor,this.ctx.moveTo(0,0),this.ctx.lineTo(0,1),this.ctx.lineTo(1,1),this.ctx.lineTo(1,0),this.ctx.lineTo(0,0),this.ctx.stroke(),this.ctx.fill(),this.ctx.closePath()},drawPoint:function(t,e,i){this.ctx.beginPath(),this.ctx.lineWidth=this.settings.pointLineWidth,this.ctx.strokeStyle=this.settings.stepColor,this.ctx.arc(t,e,this.settings.pointRadius,0,2*Math.PI,!1),this.ctx.stroke(),i&&(this.ctx.fillStyle=this.settings.stepColor,this.ctx.fill()),this.ctx.closePath()},drawLine:function(t,e,i,n,o){this.ctx.beginPath(),o===h?(this.ctx.lineWidth=this.settings.stepLineWidth,this.ctx.strokeStyle=this.settings.stepColor):o===l&&(this.ctx.lineWidth=this.settings.dashLineWidth,this.ctx.strokeStyle=this.settings.dashColor),this.ctx.moveTo(t,e),this.ctx.lineTo(i,n),this.ctx.stroke(),this.ctx.closePath()},drawStartInterval:function(t,e,i,n){var o=this.settings.pointRadius;this.drawPoint(t,e,!1),this.drawLine(t,e+o,t,n,l),this.drawPoint(t,n,!0),this.drawLine(t,n,i-o,n,h)},drawEndInterval:function(t,e,i,n){var o=this.settings.pointRadius;this.drawPoint(t,e,!0),this.drawLine(t,e,i-o,e,h),this.drawPoint(i,e,!1),this.drawLine(i,e+o,i,n,l)},plot:function(t){var e,i,n,o,s,r=this.stepParams,a="start"===r.timing,c=[],u={bgColor:"transparent",borderColor:"#bbb",stepColor:"#2893ef",dashColor:"#b8b8b8",borderWidth:.00667,stepLineWidth:.02,dashLineWidth:.008,pointLineWidth:.008,pointRadius:.015};this.settings=t||{};for(e in u)u.hasOwnProperty(e)&&(this.settings.hasOwnProperty(e)||(this.settings[e]=u[e]));for(this.ctx=this.canvas.getContext("2d"),c[0]={x:0,y:0},i=1;i<=r.count;i++)s=i/r.count,c[i]={x:s,y:s};for(this.ctx.clearRect(-.5,-.5,2,2),this.drawBackground(),o=c.length-1,i=0,n=1;o>i;i++,n++)a?this.drawStartInterval(c[i].x,c[i].y,c[n].x,c[n].y):this.drawEndInterval(c[i].x,c[i].y,c[n].x,c[n].y);this.drawPoint(c[o].x,c[o].y,!0)},getPadding:function(t){var e="number"==typeof t?[t]:t;return 1===e.length&&(e[1]=e[0]),2===e.length&&(e[2]=e[0]),3===e.length&&(e[3]=e[1]),e}},s.prototype.destroy=function(){this.canvas.stepEditor=null,$(this.canvas).off("keydown",o)},s.prototype.getRootElement=function(){return this.$element},s.prototype.focus=function(){return this.canvas.focus(),!0},s.prototype._commitTimingFunction=function(){var t="steps("+this._stepParams.count.toString()+", "+this._stepParams.timing+")";this._callback(t),c.showHideHint(this.hint,!1)},s.prototype._getStepParams=function(t){if(t[0].match(/^steps/))return{count:parseInt(t[1],10),timing:t[2]||"end"};switch(t[0]){case"step-start":return{count:1,timing:"start"};case"step-end":return{count:1,timing:"end"}}return window.console.log("step timing function: _getStepParams() passed invalid RegExp match array"),{count:1,timing:"end"}},s.prototype._getCanvasBoundingBox=function(){var t=this.$element.find(".steps"),e=t.offset();return{left:e.left,top:e.top,width:t.width(),height:t.height()}},s.prototype._updateCanvas=function(){this._stepParams&&(this.stepCanvas.stepParams=window.stepParams=new i(this._stepParams),this.stepCanvas.plot())},s.prototype.handleExternalUpdate=function(t){this._stepParams=this._getStepParams(t),this._updateCanvas(),t.originalString?c.showHideHint(this.hint,!0,t.originalString,"steps("+this._stepParams.count.toString()+", "+this._stepParams.timing+")"):c.showHideHint(this.hint,!1)},e.StepEditor=s}),define("InlineTimingFunctionEditor",["require","exports","module","BezierCurveEditor","StepEditor","TimingFunctionUtils"],function(t,e){function i(t,e,i){this._timingFunction=t,this._startBookmark=e,this._endBookmark=i,this._isOwnChange=!1,this._isHostChange=!1,this._origin="+InlineTimingFunctionEditor_"+a++,this._handleTimingFunctionChange=this._handleTimingFunctionChange.bind(this),this._handleHostDocumentChange=this._handleHostDocumentChange.bind(this),n.call(this)}var n=brackets.getModule("editor/InlineWidget").InlineWidget,o=t("BezierCurveEditor").BezierCurveEditor,s=t("StepEditor").StepEditor,r=t("TimingFunctionUtils"),a=1;i.prototype=Object.create(n.prototype),i.prototype.constructor=i,i.prototype.parentClass=n.prototype,i.prototype.timingFunctionEditor=null,i.prototype._timingFunction=null,i.prototype._startBookmark=null,i.prototype._endBookmark=null,i.prototype._isOwnChange=null,i.prototype._isHostChange=null,i.prototype._origin=null,i.prototype.getCurrentRange=function(){var t,e;if(t=this._startBookmark.find(),!t)return null;e=this._endBookmark.find(),e||(e={line:t.line});var i,n=this.hostEditor.document.getLine(t.line),o=r.timingFunctionMatch(n.substr(t.ch),!0);return o?(i=o.originalString&&o.originalString.length||o[0].length,(void 0===e.ch||e.ch-t.ch!==i)&&(e.ch=t.ch+i,this._endBookmark.clear(),this._endBookmark=this.hostEditor._codeMirror.setBookmark(e)),void 0===e.ch?null:{start:t,end:e,match:o,originalLength:i}):null},i.prototype._handleTimingFunctionChange=function(t){var e=this,i=r.timingFunctionMatch(t,!0);if(i!==this._timingFunction){var n=this.getCurrentRange();if(!n)return;this._isHostChange||(this._isOwnChange=!0,this.hostEditor.document.batchOperation(function(){e.hostEditor.document.replaceRange(t,n.start,n.end,e._origin);var i={line:n.start.line,ch:n.start.ch+t.length};e.hostEditor.setSelection(n.start,i,!1,0,e._origin)}),this._isOwnChange=!1),this._timingFunction=i}},i.prototype.load=function(){i.prototype.parentClass.load.apply(this,arguments),this._timingFunction.isBezier?this.timingFunctionEditor=new o(this.$htmlContent,this._timingFunction,this._handleTimingFunctionChange):this._timingFunction.isStep?this.timingFunctionEditor=new s(this.$htmlContent,this._timingFunction,this._handleTimingFunctionChange):window.console.log("InlineTimingFunctionEditor.load tried to load an unkown timing function type")},i.prototype.onAdded=function(){i.prototype.parentClass.onAdded.apply(this,arguments);var t=this.hostEditor.document;t.addRef(),t.on("change",this._handleHostDocumentChange),this.hostEditor.setInlineWidgetHeight(this,this.timingFunctionEditor.getRootElement().outerHeight(),!0),this.timingFunctionEditor.focus()},i.prototype.onClosed=function(){i.prototype.parentClass.onClosed.apply(this,arguments),this.timingFunctionEditor.destroy(),this._startBookmark&&this._startBookmark.clear(),this._endBookmark&&this._endBookmark.clear();var t=this.hostEditor.document;t.off("change",this._handleHostDocumentChange),t.releaseRef()},i.prototype._handleHostDocumentChange=function(){if(!this._isOwnChange){var t=this.getCurrentRange();t?t.match!==this._timingFunction&&(this._isHostChange=!0,this._isHostChange=!1,this._timingFunction=t.match,this.timingFunctionEditor.handleExternalUpdate(t.match)):this.close()}},e.InlineTimingFunctionEditor=i}),define("text!Localized.css",[],function(){return".bezier-curve-editor .coordinate-plane:after,\n.step-editor .coordinate-plane:after {\n    content: '{{INLINE_TIMING_EDITOR_TIME}}';\n}\n\n.bezier-curve-editor .coordinate-plane:hover:before {\n    content: '{{INLINE_TIMING_EDITOR_PROGRESSION}} (' attr(data-progression) '%)';\n}\n\n.bezier-curve-editor .coordinate-plane:before,\n.step-editor .coordinate-plane:before {\n    content: '{{INLINE_TIMING_EDITOR_PROGRESSION}}';\n}\n\n.bezier-curve-editor .coordinate-plane:hover:after {\n    content: '{{INLINE_TIMING_EDITOR_TIME}} (' attr(data-time) '%)';\n}\n"}),define("main",["require","exports","module","InlineTimingFunctionEditor","TimingFunctionUtils","text!Localized.css"],function(t,e,i){function n(t,e){var i,n,o,s,r,a,u,l=t._codeMirror;if(n=t.getSelection(),n.start.line!==n.end.line)return{timingFunction:null,reason:null};if(i=t.document.getLine(e.line),!i.match(/cubic-bezier|linear|ease|step/))return{timingFunction:null,reason:null};if(u=h.timingFunctionMatch(i,!1),!u)return{timingFunction:null,reason:c.ERROR_TIMINGQUICKEDIT_INVALIDSYNTAX};for(var d=0,p=u.originalString&&u.originalString.length||u[0].length;e.ch>u.index+p+d;){var g=i.substring(u.index+p+d),m=h.timingFunctionMatch(g,!1);if(!m)break;d+=u.index+p,u=$.extend(!0,[],m)}return u.lineOffset=d,o={line:e.line,ch:d+u.index},s={line:e.line,ch:d+u.index+p},r=l.setBookmark(o),a=l.setBookmark(s),t.setSelection(o,s),{timingFunction:u,start:r,end:a}}function o(t,e){var i,o,s=n(t,e);return s.timingFunction?(i=new u(s.timingFunction,s.start,s.end),i.load(t),o=new $.Deferred,o.resolve(i),o.promise()):s.reason||null}function s(){a.loadStyleSheet(i,"main.less"),a.addEmbeddedStyleSheet(Mustache.render(l,c)),r.registerInlineEditProvider(o)}var r=brackets.getModule("editor/EditorManager"),a=brackets.getModule("utils/ExtensionUtils"),c=brackets.getModule("strings"),u=t("InlineTimingFunctionEditor").InlineTimingFunctionEditor,h=t("TimingFunctionUtils"),l=t("text!Localized.css");s(),e.inlineTimingFunctionEditorProvider=o});