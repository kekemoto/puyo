!function(){var t={me:{ja:"私",en:"me",zh:"我"},you:{ja:"あなた",en:"you",zh:"你"}};function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function n(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],i=!0,r=!1,o=void 0;try{for(var a,u=t[Symbol.iterator]();!(i=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);i=!0);}catch(t){r=!0,o=t}finally{try{i||null==u.return||u.return()}finally{if(r)throw o}}return n}(t,e)||c(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&r(t,e)}function r(t,e){return(r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function o(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,i=l(t);if(e){var r=l(this).constructor;n=Reflect.construct(i,arguments,r)}else n=i.apply(this,arguments);return a(this,n)}}function a(t,n){return!n||"object"!==e(n)&&"function"!=typeof n?u(t):n}function u(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=c(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,u=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return a=t.done,t},e:function(t){u=!0,o=t},f:function(){try{a||null==n.return||n.return()}finally{if(u)throw o}}}}function c(t,e){if(t){if("string"==typeof t)return h(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(t,e):void 0}}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function d(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function y(t,e,n){return e&&d(t.prototype,e),n&&d(t,n),t}function v(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var w,p,m,g,k,b,A,S,x,F,P="rgba(".concat(245,", ").concat(245,", ").concat(245,", 0.05)");(p=w||(w={}))[p.First=0]="First",p[p.Second=1]="Second",(g=m||(m={}))[g.Play=0]="Play",g[g.GameSet=1]="GameSet",(b=k||(k={}))[b.Init=0]="Init",b[b.Play=1]="Play",b[b.GameSet=2]="GameSet",(S=A||(A={}))[S.Play=0]="Play",S[S.Done=1]="Done",S[S.Abort=2]="Abort",(F=x||(x={}))[F.ToggleField=0]="ToggleField",F[F.ToggleTurn=1]="ToggleTurn";var W=function(){function e(){f(this,e),v(this,"i18nText",t),this.setCountry()}return y(e,[{key:"setCountry",value:function(t){t?this.country=t:(t=window.navigator.language,this.country=t&&""!==t?t.slice(0,2):"ja")}},{key:"get",value:function(e){var n,i=t[e];return void 0===i&&ot("i18n keyword is undefined. keyword: ".concat(e)),null!==(n=i[this.country])&&void 0!==n?n:i.ja}}]),e}(),C=function(){function t(){f(this,t),v(this,"callbacks",new Map)}return y(t,[{key:"set",value:function(t,e){var n,i=null!==(n=this.callbacks.get(frameCount+t))&&void 0!==n?n:[];i.push(e),this.callbacks.set(frameCount+t,i)}},{key:"nextFrame",value:function(t){this.set(1,t)}},{key:"check",value:function(){var t=this.callbacks.get(frameCount);if(void 0!==t){var e,n=s(t);try{for(n.s();!(e=n.n()).done;){(0,e.value)()}}catch(t){n.e(t)}finally{n.f()}this.callbacks.delete(frameCount)}}}]),t}(),E=function(){function t(){f(this,t),v(this,"listeners",new Map),v(this,"onceListeners",new Map)}return y(t,[{key:"on",value:function(t,e){var n,i=null!==(n=this.listeners.get(t))&&void 0!==n?n:[];i.push(e),this.listeners.set(t,i)}},{key:"onOnce",value:function(t,e){var n,i=null!==(n=this.onceListeners.get(t))&&void 0!==n?n:[];i.push(e),this.onceListeners.set(t,i)}},{key:"emit",value:function(t){for(var e,n,i=null!==(e=this.listeners.get(t))&&void 0!==e?e:[],r=arguments.length,o=new Array(r>1?r-1:0),a=1;a<r;a++)o[a-1]=arguments[a];var u,l=s(i);try{for(l.s();!(u=l.n()).done;){var c=u.value;c.apply(void 0,o)}}catch(t){l.e(t)}finally{l.f()}var h,f=s(i=null!==(n=this.onceListeners.get(t))&&void 0!==n?n:[]);try{for(f.s();!(h=f.n()).done;){var d=h.value;d.apply(void 0,o)}}catch(t){f.e(t)}finally{f.f()}this.onceListeners.delete(t)}}]),t}(),D=function(){function t(){f(this,t)}return y(t,[{key:"setup",value:function(){this.audioElements={token:this.setupAudioElement("token"),laser:this.setupAudioElement("laser"),gameset:this.setupAudioElement("gameset"),blink:this.setupAudioElement("blink")}}},{key:"play",value:function(t){var e,n=null!==(e=this.audioElements[t])&&void 0!==e?e:ot();n.readyState===HTMLMediaElement.HAVE_ENOUGH_DATA&&(n.currentTime=0,n.play())}},{key:"stop",value:function(t){var e,n=null!==(e=this.audioElements[t])&&void 0!==e?e:ot();n.readyState===HTMLMediaElement.HAVE_ENOUGH_DATA&&n.pause()}},{key:"setupAudioElement",value:function(t){var e,n=null!==(e=document.getElementById("audio-".concat(t)))&&void 0!==e?e:ot();if(n instanceof HTMLAudioElement)return n;ot()}}]),t}(),T=function(t){i(n,t);var e=o(n);function n(t,i){var r;return f(this,n),(r=e.call(this)).handler=t,r.params=null!=i?i:{},r.init(),r}return y(n,[{key:"play",value:function(){return this.isPlay=!0,this.startFrameCount=frameCount,this.emit(A.Play),this}},{key:"abort",value:function(){return this.init,this.emit(A.Abort),this}},{key:"draw",value:function(){this.isPlay&&(this.handler(frameCount-this.startFrameCount,this.params)&&(this.init(),this.emit(A.Done,this)))}},{key:"init",value:function(){this.isPlay=!1,this.startFrameCount=0}}],[{key:"doneAll",value:function(t,e){var n=t.length,i=0;t.forEach((function(t){t.onOnce(A.Done,(function(){n<=(i+=1)&&e()}))}))}},{key:"playParallel",value:function(t,e){var n=this;if(0!==t.length)return t.length<=1?nt(t).play():(nt(t).play(),ct.set(e,(function(){n.playParallel(it(t),e)})),rt(t));ot('"animes" should be one or more arrays')}}]),n}(E),O=function(){function t(){f(this,t),v(this,"animes",new Set)}return y(t,[{key:"add",value:function(t){var e=this;this.animes.add(t),t.onOnce(A.Done,(function(){e.animes.delete(t)})),t.onOnce(A.Abort,(function(){e.animes.delete(t)}))}},{key:"draw",value:function(){var t,e=s(this.animes);try{for(e.s();!(t=e.n()).done;){t.value.draw()}}catch(t){e.e(t)}finally{e.f()}}}]),t}(),Y=function(){function t(){f(this,t),v(this,"x",0),v(this,"y",0),v(this,"startX",0),v(this,"startY",0),v(this,"oldX",0),v(this,"oldY",0)}return y(t,[{key:"init",value:function(){this.x=0,this.y=0,this.startX=0,this.startY=0,this.oldX=0,this.oldY=0}},{key:"touchStarted",value:function(){this.startX=mouseX,this.startY=mouseY,this.oldX=this.x,this.oldY=this.y}},{key:"touchMoved",value:function(){cursor("grabbing"),this.x=this.oldX+mouseX-this.startX,this.y=this.oldY+mouseY-this.startY}},{key:"touchEnded",value:function(){cursor("auto")}}]),t}(),H=function(){function t(){f(this,t)}return y(t,[{key:"baseX",get:function(){return this.x-lt.x}},{key:"baseY",get:function(){return this.y-lt.y}},{key:"centerX",get:function(){return this.baseX+30}},{key:"centerY",get:function(){return this.baseY+30}}]),t}(),X=function(t){i(n,t);var e=o(n);function n(){var t;f(this,n),t=e.call(this);return t.blinkAnime=new T((function(e){if(1===e&&ht.play("blink"),stroke(255),strokeWeight(30*e/10),fill(t.color),rect(t.x,t.y,60,60),10<=e)return ht.stop("blink"),!0})),t}return y(n,[{key:"draw",value:function(){this.blinkAnime.isPlay?this.blinkAnime.draw():(stroke(245),strokeWeight(1),fill(this.color),rect(this.x,this.y,60,60))}}]),n}(H),j=function(t){i(n,t);var e=o(n);function n(){var t;f(this,n);for(var i=arguments.length,r=new Array(i),o=0;o<i;o++)r[o]=arguments[o];return v(u(t=e.call.apply(e,[this].concat(r))),"player",w.First),v(u(t),"color","hsl(0, 75%, 65%)"),t}return n}(X),R=function(t){i(n,t);var e=o(n);function n(){var t;f(this,n);for(var i=arguments.length,r=new Array(i),o=0;o<i;o++)r[o]=arguments[o];return v(u(t=e.call.apply(e,[this].concat(r))),"player",w.Second),v(u(t),"color","hsl(180, 75%, 65%)"),t}return n}(X),M=function(t){i(n,t);var e=o(n);function n(){var t;f(this,n),v(u(t=e.call(this)),"player",void 0);var i=[150,250,400];return t.anime=new T((function(e){e%=i[i.length-1];var n=color(ut.player===w.First?"hsl(0, 75%, 65%)":"hsl(180, 75%, 65%)");if(e<=i[0]){var r=i[0],o=(r-e)/r;n.setAlpha(76.5*o+20)}else if(e<=i[1])n.setAlpha(20);else{var a=i[1],u=(e-a)/(i[2]-a);n.setAlpha(76.5*u+20)}fill(n),noStroke(),rect(t.x,t.y,60,60)})),t}return y(n,[{key:"play",value:function(){return this.anime.play()}},{key:"abort",value:function(){return this.anime.abort()}},{key:"draw",value:function(){this.anime.draw()}}]),n}(H);var _=function(){function t(){f(this,t),this.init()}return y(t,[{key:"init",value:function(){this.data=[[new M]]}},{key:"set",value:function(t,e,n){e<0||n<0||(void 0===this.data[e]&&(this.data[e]=[]),this.data[e][n]=t)}},{key:"add",value:function(t,e,n){void 0===this.get(e,n)&&this.set(t,e,n)}},{key:"get",value:function(t,e){var n;if(!(t<0)&&!(e<0))return(null!==(n=this.data[t])&&void 0!==n?n:[])[e]}},{key:"forEach",value:function(t){this.data.forEach((function(e,n){void 0!==e&&e.forEach((function(e,i){t(e,n,i)}))}))}},{key:"getComboLines",value:function(t,e,n){var i=this,r=[],o=[];return o=et(-(n-=1),n).map((function(n){return i.get(t+n,e)})),r.push(o),o=et(-n,n).map((function(n){return i.get(t,e+n)})),r.push(o),o=et(-n,n).map((function(n){return i.get(t+n,e+n)})),r.push(o),o=et(-n,n).map((function(n){return i.get(t-n,e+n)})),r.push(o),r}}]),t}(),I=function(t){i(n,t);var e=o(n);function n(){var t;return f(this,n),(t=e.call(this)).windowResized(),t.fieldData=new _,t}return y(n,[{key:"x",get:function(){return this.baseX+lt.x}},{key:"y",get:function(){return this.baseY+lt.y}},{key:"add",value:function(t,e,n){var i=this;if(ut.canPutField===this.player){this.fieldData.set(t,e,n);var r=function(t,e,n,i){var r,o=s(i.getComboLines(e,n,5));try{for(o.s();!(r=o.n()).done;){var a=r.value,u=U(t,a,5);if(0<u.length)return u}}catch(t){o.e(t)}finally{o.f()}return[]}(ut.player,e,n,this.fieldData);0<r.length?this.emit(k.GameSet,r):(this.addCandidates(e,n),ct.nextFrame((function(){var t=function(t,e,n,i){if(ut.player!==ut.canPutField)return[];var r,o=[],a=s(i.getComboLines(e,n,4));try{for(a.s();!(r=a.n()).done;){var u=r.value,l=u.slice(0,4);V(t,l,4)&&(u=u.slice(3)),l=u.slice(-4),V(t,l,4)&&(u=u.slice(0,-3));var c=U(t,u,3);0<c.length&&o.push(c)}}catch(t){a.e(t)}finally{a.f()}return o}(ut.player,e,n,i.fieldData);!function t(e){if(0===e.length)return;1===e.length?Q(nt(e)):Q(nt(e)).onOnce(A.Done,(function(){t(it(e))}))}(t),ut.addComboCount(t.length),ut.action(),i.guideAnimePlay(),ht.play("token")})))}}},{key:"addCandidates",value:function(t,e){this.fieldData.add(new M,t+1,e),this.fieldData.add(new M,t-1,e),this.fieldData.add(new M,t,e+1),this.fieldData.add(new M,t,e-1)}},{key:"guideAnimePlay",value:function(){this.fieldData.forEach((function(t){t instanceof M&&t.play()}))}},{key:"init",value:function(){this.fieldData.init(),this.enable=!0,this.guideAnimePlay()}},{key:"mouseClicked",value:function(){var t=this.toCell(mouseX,mouseY),e=t.column,n=t.row;if(!(e<0)&&!(n<0))return this.fieldData.get(e,n)instanceof M?(this.add(function(){switch(ut.player){case w.First:return new j;case w.Second:return new R;default:return ot()}}(),e,n),!1):void 0}}]),n}(E),L=function(t){i(n,t);var e=o(n);function n(){var t;return f(this,n),(t=e.call(this)).player=w.First,t}return y(n,[{key:"toCell",value:function(t,e){return{column:floor((this.x-t)/60),row:floor((this.y-e)/60)}}},{key:"draw",value:function(){var t=this;if(this.enable){ut.canPutField===this.player&&(fill(P),noStroke(),rect(0,0,this.x,this.y));var e=ut.canPutField===this.player;e?(strokeWeight(5),ut.player===w.First?stroke("hsl(0, 75%, 65%)"):stroke("hsl(180, 75%, 65%)")):(strokeWeight(1),stroke(245)),line(this.x,this.y,this.x,0),line(this.x,this.y,0,this.y),strokeWeight(1),stroke(245),this.fieldData.forEach((function(n,i,r){void 0!==n&&(n instanceof M&&!e||(n.x=t.x-60*(i+1),n.y=t.y-60*(r+1),n.draw()))}))}}},{key:"windowResized",value:function(){this.baseX=windowWidth/2-30,this.baseY=windowHeight-60}}]),n}(I),z=function(t){i(n,t);var e=o(n);function n(){var t;return f(this,n),(t=e.call(this)).player=w.Second,t}return y(n,[{key:"toCell",value:function(t,e){return{column:floor((t-this.x)/60),row:floor((this.y-e)/60)}}},{key:"draw",value:function(){var t=this;if(this.enable){ut.canPutField===this.player&&(fill(P),noStroke(),rect(this.x,0,windowWidth-lt.x,this.y));var e=ut.canPutField===this.player;e?(strokeWeight(5),ut.player===w.First?stroke("hsl(0, 75%, 65%)"):stroke("hsl(180, 75%, 65%)")):(strokeWeight(1),stroke(245)),line(this.x,this.y,this.x,0),line(this.x,this.y,windowWidth,this.y),strokeWeight(1),stroke(245),this.fieldData.forEach((function(n,i,r){void 0!==n&&(n instanceof M&&!e||(n.x=t.x+60*i,n.y=t.y-60*(r+1),n.draw()))}))}}},{key:"windowResized",value:function(){this.baseX=windowWidth/2+30,this.baseY=windowHeight-60}}]),n}(I),G=function(t){i(n,t);var e=o(n);function n(){var t;return f(this,n),v(u(t=e.call(this)),"showAnime",new T((function(e){if(t.coreDraw(e/30),30<=e)return!0}))),v(u(t),"hideAnime",new T((function(e){t.coreDraw(1);var n,i=e/20;if(i=(n=i)<.5?16*n*n*n*n*n:1+16*--n*n*n*n*n,fill(50),rect(0,0,windowWidth/2*i,windowHeight),rect(windowWidth-windowWidth/2*i,0,windowWidth,windowHeight),20<=e)return!0}))),t.init(),t}return y(n,[{key:"init",value:function(){this.enable=!1,this.player=void 0}},{key:"show",value:function(t){this.enable=!0,this.player=t,this.showAnime.play()}},{key:"hide",value:function(){var t=this;this.hideAnime.onOnce(A.Done,(function(){t.enable=!1,t.player=void 0,t.emit(k.Init)})),this.hideAnime.play()}},{key:"mouseClicked",value:function(){if(this.enable)return this.hide(),!1}},{key:"draw",value:function(){this.enable&&(this.showAnime.isPlay?this.showAnime.draw():this.hideAnime.isPlay?this.hideAnime.draw():this.coreDraw(1))}},{key:"coreDraw",value:function(t){var e=floor(min([windowWidth,windowHeight])/5);background(245),textSize(e),noStroke();var n=color(50);n.setAlpha(255*t),fill(n),text("Game Set",windowWidth/2,windowHeight/2-e),stroke(n),strokeWeight(8),this.player==w.First?((n=color("hsl(0, 75%, 65%)")).setAlpha(255*t),fill(n),text("Win : Red",windowWidth/2,windowHeight/2+e)):((n=color("hsl(180, 75%, 65%)")).setAlpha(255*t),fill(n),text("Win : Blue",windowWidth/2,windowHeight/2+e))}}]),n}(E),B=function(t){i(n,t);var e=o(n);function n(){var t;return f(this,n),(t=e.call(this)).init(),t}return y(n,[{key:"init",value:function(){this.player=w.First,this.actionCount=1,this.canPutField=w.First}},{key:"action",value:function(){this.actionCount-=1,this.actionCount<=0&&this.toggleTurn()}},{key:"addComboCount",value:function(t){0!==t&&(this.actionCount+=t,this.toggleField())}},{key:"toggleField",value:function(){this.canPutField=this.canPutField===w.First?w.Second:w.First,this.emit(x.ToggleField)}},{key:"toggleTurn",value:function(){this.player=this.player===w.First?w.Second:w.First,this.actionCount=1,this.canPutField!==this.player&&(this.canPutField=this.player,this.emit(x.ToggleField)),this.emit(x.ToggleTurn)}}]),n}(E),N=function(){function t(e,n,i){f(this,t),v(this,"gameState",m.Play),this.firstField=e,this.secondField=n,this.gameSetScene=i}return y(t,[{key:"init",value:function(){lt.init(),ut.init(),this.gameSetScene.init(),this.secondField.init(),this.firstField.init()}},{key:"gameSet",value:function(t){var e=this,i=nt(t).player===w.First?0:200,r=new T((function(e){var r,o=q(nt(t).centerX+lt.x,nt(t).centerY+lt.y,rt(t).centerX+lt.x,rt(t).centerY+lt.y);if(e<=4){r=e/4;var a=n(o(0),2),u=a[0],l=a[1],s=n(o(windowWidth*r),2);K(u,l,s[0],s[1],i)}else if(e<=34){5===e&&ht.play("laser");var c=n(o(0),2),h=c[0],f=c[1],d=n(o(windowWidth),2);K(h,f,d[0],d[1],i)}else if(e<=84){38===e&&ht.play("gameset"),r=(e-34)/50;var y=n(o(0),2),v=y[0],w=y[1],p=n(o(windowWidth),2),m=p[0],g=p[1],k=2.5*max([windowWidth,windowHeight]);K(v,w,m,g,i,k*r)}else{if(!(e<=94))return!0;var b=n(o(0),2),A=b[0],S=b[1],x=n(o(windowWidth),2),F=x[0],P=x[1],W=2.5*max([windowWidth,windowHeight]);K(A,S,F,P,i,W)}}));st.add(r),r.on(A.Done,(function(){e.firstField.enable=!1,e.secondField.enable=!1,e.gameSetScene.show(nt(t).player)}));var o=t.map((function(t){return t.blinkAnime}));o.push(r),T.playParallel(o,10)}}]),t}();function U(t,e,n){var i,r=[],o=s(e);try{for(o.s();!(i=o.n()).done;){var a=i.value;if(void 0!==a){if(a.player===t?r.push(a):r=[],n<=r.length)return r}else r=[]}}catch(t){o.e(t)}finally{o.f()}return[]}function V(t,e,n){return 0<U(t,e,n).length}var $=function(t,e){var i;1===t&&ht.play("laser");var r=q(e.x1+lt.x,e.y1+lt.y,e.x2+lt.x,e.y2+lt.y);if(t<=4){i=t/4;var o=n(r(0),2),a=o[0],u=o[1],l=n(r(windowWidth*i),2);K(a,u,l[0],l[1],e.hue)}else if(t<=64){var s=n(r(0),2),c=s[0],h=s[1],f=n(r(windowWidth),2);K(c,h,f[0],f[1],e.hue)}else{if(!(t<=68))return!0;i=(t-64)/4;var d=n(r(windowWidth*i),2),y=d[0],v=d[1],w=n(r(windowWidth),2);K(y,v,w[0],w[1],e.hue)}};function q(t,e,n,i){return t===n?function(e){return[t,windowHeight*e/windowHeight]}:function(r){return[r,(i-e)*(r-t)/(n-t)+e]}}function J(t,e,n,i,r){t===n?(line(t+r,e,n+r,i),line(t-r,e,n-r,i)):(line(t,e+r,n,i+r),line(t,e-r,n,i-r))}function K(t,e,n,i,r){var o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:void 0,a=[5,2,6,6],u=a.reduce((function(t,e){return e+t})),l=void 0===o?60:o*u/a[0],s=a.map((function(t){return l*t/u/2})),c=s[0]/2;stroke("hsl(".concat(r,", 100%, 100%)")),strokeWeight(s[0]),J(t,e,n,i,c),c+=s[0]/2+s[1]/2,stroke("hsl(".concat(r,", 100%, 50%)")),strokeWeight(s[1]),J(t,e,n,i,c),c+=s[1]/2+s[2]/2,stroke("hsla(".concat(r,", 100%, 50%, 0.5)")),strokeWeight(s[2]),J(t,e,n,i,c),c+=s[2]/2+s[3]/2,stroke("hsla(".concat(r,", 100%, 50%, 0.2)")),strokeWeight(s[3]),J(t,e,n,i,c)}function Q(t){t.length<2&&ot("You need at least two tokens. size: ".concat(t.length));var e=t.map((function(t){return t.blinkAnime})),n=rt(e),i=new T($,{x1:nt(t).centerX,y1:nt(t).centerY,x2:rt(t).centerX,y2:rt(t).centerY,hue:nt(t).player===w.First?0:200});return st.add(i),e.push(i),T.playParallel(e,10),n}function Z(t,e){var n,i=s(e);try{for(i.s();!(n=i.n()).done;){if(!1===tt(n.value,t))return!1}}catch(t){i.e(t)}finally{i.f()}}function tt(t,e){if(void 0!==t&&t[e]instanceof Function){for(var n=arguments.length,i=new Array(n>2?n-2:0),r=2;r<n;r++)i[r-2]=arguments[r];return t[e].apply(t,i)}}function et(t,e){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,i=[],r=0;r<=e-t;r+=n)i.push(t+r);return i}function nt(t){return t[0]}function it(t){return t.slice(1)}function rt(t){return t[t.length-1]}function ot(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"It cannot be reached.";throw new Error(t)}var at=[],ut=new B,lt=new Y,st=new O,ct=new C,ht=new D;new W;window.setup=function(){createCanvas(windowWidth,windowHeight),textAlign(CENTER,CENTER),textFont("Ranchers"),frameRate(60);var t=new G,e=new L,n=new z,i=new N(e,n,t);i.init(),e.on(k.GameSet,(function(t){i.gameSet(t)})),n.on(k.GameSet,(function(t){i.gameSet(t)})),t.on(k.Init,(function(){i.init()})),ht.setup(),at.push(e),at.push(n),at.push(st),at.push(t)},window.draw=function(){clear(),background(50),Z("draw",at),ct.check()},window.mouseClicked=function(){return Z("mouseClicked",at.reverse())},window.touchStarted=function(){lt.touchStarted()},window.touchMoved=function(){return lt.touchMoved(),!1},window.touchEnded=function(){lt.touchEnded()},window.windowResized=function(){return resizeCanvas(windowWidth,windowHeight),Z("windowResized",at)}}();
//# sourceMappingURL=front.efba4208.js.map
