/*! For license information please see alien.js.LICENSE.txt */
(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=n(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return s=t.done,t},e:function(t){c=!0,a=t},f:function(){try{s||null==r.return||r.return()}finally{if(c)throw a}}}}function n(t,e){if(t){if("string"==typeof t)return r(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}function o(){o=function(){return n};var e,n={},r=Object.prototype,i=r.hasOwnProperty,a=Object.defineProperty||function(t,e,n){t[e]=n.value},s="function"==typeof Symbol?Symbol:{},c=s.iterator||"@@iterator",l=s.asyncIterator||"@@asyncIterator",u=s.toStringTag||"@@toStringTag";function f(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(e){f=function(t,e,n){return t[e]=n}}function h(t,e,n,r){var o=e&&e.prototype instanceof w?e:w,i=Object.create(o.prototype),s=new U(r||[]);return a(i,"_invoke",{value:P(t,n,s)}),i}function p(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}n.wrap=h;var d="suspendedStart",v="suspendedYield",m="executing",y="completed",g={};function w(){}function b(){}function S(){}var k={};f(k,c,(function(){return this}));var x=Object.getPrototypeOf,L=x&&x(x(j([])));L&&L!==r&&i.call(L,c)&&(k=L);var O=S.prototype=w.prototype=Object.create(k);function E(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function T(e,n){function r(o,a,s,c){var l=p(e[o],e,a);if("throw"!==l.type){var u=l.arg,f=u.value;return f&&"object"==t(f)&&i.call(f,"__await")?n.resolve(f.__await).then((function(t){r("next",t,s,c)}),(function(t){r("throw",t,s,c)})):n.resolve(f).then((function(t){u.value=t,s(u)}),(function(t){return r("throw",t,s,c)}))}c(l.arg)}var o;a(this,"_invoke",{value:function(t,e){function i(){return new n((function(n,o){r(t,e,n,o)}))}return o=o?o.then(i,i):i()}})}function P(t,n,r){var o=d;return function(i,a){if(o===m)throw Error("Generator is already running");if(o===y){if("throw"===i)throw a;return{value:e,done:!0}}for(r.method=i,r.arg=a;;){var s=r.delegate;if(s){var c=I(s,r);if(c){if(c===g)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===d)throw o=y,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=m;var l=p(t,n,r);if("normal"===l.type){if(o=r.done?y:v,l.arg===g)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(o=y,r.method="throw",r.arg=l.arg)}}}function I(t,n){var r=n.method,o=t.iterator[r];if(o===e)return n.delegate=null,"throw"===r&&t.iterator.return&&(n.method="return",n.arg=e,I(t,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),g;var i=p(o,t.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,g;var a=i.arg;return a?a.done?(n[t.resultName]=a.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,g):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,g)}function A(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function N(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function U(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(A,this),this.reset(!0)}function j(n){if(n||""===n){var r=n[c];if(r)return r.call(n);if("function"==typeof n.next)return n;if(!isNaN(n.length)){var o=-1,a=function t(){for(;++o<n.length;)if(i.call(n,o))return t.value=n[o],t.done=!1,t;return t.value=e,t.done=!0,t};return a.next=a}}throw new TypeError(t(n)+" is not iterable")}return b.prototype=S,a(O,"constructor",{value:S,configurable:!0}),a(S,"constructor",{value:b,configurable:!0}),b.displayName=f(S,u,"GeneratorFunction"),n.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,S):(t.__proto__=S,f(t,u,"GeneratorFunction")),t.prototype=Object.create(O),t},n.awrap=function(t){return{__await:t}},E(T.prototype),f(T.prototype,l,(function(){return this})),n.AsyncIterator=T,n.async=function(t,e,r,o,i){void 0===i&&(i=Promise);var a=new T(h(t,e,r,o),i);return n.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},E(O),f(O,u,"Generator"),f(O,c,(function(){return this})),f(O,"toString",(function(){return"[object Generator]"})),n.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},n.values=j,U.prototype={constructor:U,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(N),!t)for(var n in this)"t"===n.charAt(0)&&i.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function r(r,o){return s.type="throw",s.arg=t,n.next=r,o&&(n.method="next",n.arg=e),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var c=i.call(a,"catchLoc"),l=i.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!l)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&i.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),N(n),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;N(n)}return o}}throw Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:j(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),g}},n}function i(t,e,n,r,o,i,a){try{var s=t[i](a),c=s.value}catch(t){return void n(t)}s.done?e(c):Promise.resolve(c).then(r,o)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function s(t){i(a,r,o,s,c,"next",t)}function c(t){i(a,r,o,s,c,"throw",t)}s(void 0)}))}}var s="<% site.href %>",c=function(t,e,n){toastr.error("Fehler beim ".concat(t," von ").concat(e,": ").concat(n.status," | ").concat(n.statusText,"."))},l=function(t){return new Promise((function(e){return setTimeout(e,t)}))},u=function(){var t=a(o().mark((function t(e,n){var r;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([e,l(n)]);case 2:return r=t.sent,t.abrupt("return",r[0]);case 4:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),f=function(t){var e=$(t).find("form");return{secretKey:e.find('[name="secretKey"]').val(),action:e.find('[name="action"]').val(),key:e.find('[name="key"]').val(),skinset:e.find('[name="skinset"]').val(),module:e.find('[name="module"]').val(),title:e.find('[name="title"]').val(),description:e.find('[name="description"]').val(),skin:e.find('[name="skin"]').val(),save:e.find('[name="save"]').val()}},h=function(){return new Promise((function(t,e){$.get("".concat(s,"layouts/alien/skins/edit?key=Site.implant"),(function(e){var n=f(e);t(n)})).fail((function(t,n,r){c("Lesen(get)","Skin Site.implant",t),e()}))}))},p=function(t){return new Promise((function(e,n){$.post("".concat(s,"layouts/alien/skins/edit?key=Site.implant"),t,(function(){e()})).fail((function(t,e,r){c("Update(post)","Skin Site.implant",t),n()}))}))},d=function(){return new Promise((function(t,e){$.get("".concat(s,"layouts/alien/skins/edit?key=Site.stories"),(function(e){var n=f(e),r=JSON.parse(n.skin||"[]");r.forEach((function(t){t.published=new Date(t.published)})),t({params:n,skinStories:r})})).fail((function(t,n,r){c("Lesen(get)","Skin Site.stories",t),e()}))}))},v=function(t){return new Promise((function(e,n){$.post("".concat(s,"layouts/alien/skins/edit?key=Site.stories"),t,(function(){e()})).fail((function(t,e,r){c("Update(post)","Skin Site.stories",t),n()}))}))},m=function(t,e,n){n.log("!Story comparison rss vs. skin:");var r=t.reduce((function(t,e){return t[w(e.published)]=e,t}),{});return n.options.debug&&console.table(r),e.reduce((function(t,e){var r=w(e.published);return t.hasOwnProperty(r)&&function(t,e){if(n.options.debug){var r={title:t.title,comments:t.comments,snippet:t.contentSnippet},o={title:e.title,comments:e.comments,snippet:e.contentSnippet};console.table({rss:r,skin:o})}return t.comments===e.comments&&t.title===e.title&&t.contentSnippet===e.contentSnippet}(t[r],e)&&(delete t[r],n.log("".concat(r,": unchanged / no update."))),t}),r)},y=function(t,e){return new Promise((function(r,o){$.get("".concat(s,"stories/main"),(function(o){var i={};$(o).find(".admin").find(".storyData").each((function(){var t,r,o=(t=this.innerText.split(":¦:"),r=3,function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i,a,s=[],c=!0,l=!1;try{if(i=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=i.call(n)).done)&&(s.push(r.value),s.length!==e);c=!0);}catch(t){l=!0,o=t}finally{try{if(!c&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return s}}(t,r)||n(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=o[0],s=o[1],c=o[2];c=c.trim(),i[c]=s,e.log("tdStory> title: ".concat(a.trim(),", pubDate: ").concat(c,", id: ").concat(s))}));var a=Object.keys(t).reduce((function(n,r){var o=t[r],a=i.hasOwnProperty(r);return a&&(o.id=i[r]),e.log('!Story "'.concat(o.title,'", published: ').concat(r,", ").concat(a?"exists @ id: "+o.id:"is new")),n.push(o),n}),[]);r(a)})).fail((function(t,e,n){c("Lesen(get)","Twoday Beitragsübersicht",t),o()}))}))},g=function(t){var e=$(t).find("form"),n=e.find('[name="discussions"]');return{secretKey:e.find('[name="secretKey"]').val(),content_title:e.find('[name="content_title"]').val(),modNiceUrls_urlid:e.find('[name="modNiceUrls_urlid"]').val(),content_text:e.find('[name="content_text"]').val(),addToFront:e.find('[name="addToFront"]').val(),checkbox_addToFront:e.find('[name="checkbox_addToFront"]').val(),addToTopic:e.find('[name="addToTopic"]').val(),topic:e.find('[name="topic"]').val(),editableby:e.find('[name="editableby"]').val(),discussions:n.prop("checked")?n.val():null,checkbox_discussions:e.find('[name="checkbox_discussions"]').val(),createtime:e.find('[name="createtime"]').val(),publish:e.find('[name="publish"]').val()}},w=function(t){var e=t.toLocaleString("de-DE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"});return e.slice(0,10).split(".").reverse().join("-")+e.slice(-6)},b=function(t,e,n){var r=n.titlePrefix.replace("$comments",e),o=n.titlePostfix.replace("$comments",e);return"".concat(r).concat(t||"...").concat(o)},S=function(){var t=a(o().mark((function t(e,n){var r,i,a,l,f,h;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={false:{url:"stories/".concat(e.id,"/edit"),text:"aktualisiert",method:"update"},true:{url:"stories/create",text:"neu angelegt",method:"create"}},i=!e.hasOwnProperty("id"),a="".concat(s).concat(r[i].url),l=function(){return new Promise((function(t,o){$.get(a,(function(r){e.alienLastUpdate=(new Date).toISOString();var o,i,a,s=g(r);s.content_title=b(e.title,e.comments,n),s.content_text=(i={title:(o=e).title,published:o.published,link:o.link,comments:o.comments,postid:o.postid},a=o.contentSnippet||"...","<p>".concat(a,'</p>\n<div style="text-align:center"><a target="_blank" href="').concat(o.link,'">&raquo; Beitrag</a>&emsp;&emsp;<a target="_blank" href="').concat(o.commentUrl,'">&raquo; Kommentare</a></div>\n<div class="alienStatus" style="display:none">').concat(JSON.stringify(i,null,2),"</div>")),s.createtime=w(e.published),n.allowComments&&null!=s.discussions||delete s.discussions,t(s)})).fail((function(t,n,a){c("".concat(r[i].method,"(GET)"),'Twoday-Beitrag "'.concat(e.title,'"'),t),o()}))}))},f=function(t){return new Promise((function(n,o){$.post(a,t,(function(){toastr.info("Beitrag ".concat(e.title," vom ").concat(e.published.toLocaleString()," in Twoday ").concat(r[i].text,".")),n()})).fail((function(t,n,a){c("".concat(r[i].method,"(POST)"),'Twoday-Beitrag "'.concat(e.title,'"'),t),o()}))}))},t.next=7,u(l(),n.delayBetweenUpdates);case 7:return h=t.sent,t.next=10,u(f(h),n.delayBetweenUpdates);case 10:return t.abrupt("return",t.sent);case 11:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),k=function(){var t=a(o().mark((function t(n,r){var i,a,s,c,l,f,h,p,g;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u(d(),r.options.delayBetweenUpdates);case 3:if(i=t.sent,a=i.params,s=i.skinStories,r.log(s,"!Saved stories from last sync:"),c=m(n,s,r),!Object.keys(c).length){t.next=32;break}return t.next=11,u(y(c,r),r.options.delayBetweenUpdates);case 11:l=t.sent,r.log(l,"!Final stories to create or update:"),f=e(l),t.prev=14,f.s();case 16:if((h=f.n()).done){t.next=22;break}return p=h.value,t.next=20,u(S(p,r.options),r.options.delayBetweenUpdates);case 20:t.next=16;break;case 22:t.next=27;break;case 24:t.prev=24,t.t0=t.catch(14),f.e(t.t0);case 27:return t.prev=27,f.f(),t.finish(27);case 30:t.next=34;break;case 32:r.log("!No new stories or updates found."),toastr.info("Keine neuen zu synchronisierenden Änderungen gefunden!");case 34:if(g=JSON.stringify(n,null,2),a.skin===g){t.next=39;break}return a.skin=g,t.next=39,u(v(a),r.options.delayBetweenUpdates);case 39:toastr.success("Synchronisation erfolgreich abgeschlossen."),t.next=45;break;case 42:t.prev=42,t.t1=t.catch(0),toastr.error("Synchronisation endete mit Fehler: ".concat(t.t1.toString(),"."));case 45:case"end":return t.stop()}}),t,null,[[0,42],[14,24,27,30]])})));return function(e,n){return t.apply(this,arguments)}}(),x=function(t,e){return(t.match(/[a-zA-Z]*\s*:\s*.*/g)||[]).reduce((function(t,n){var r=n.trim();","===r.slice(-1)&&(r=r.slice(0,-1));var o=r.split(":"),i=o[0].trim();if(i in e){var a=o.slice(1).join(":").trim();t.push({key:i,setting:a})}return t}),[])},L=function(t,e,n){var r=x(e,n);console.log("User Alien Options BEFORE Upgrade:\n",r),r.forEach((function(e){var n=new RegExp("".concat(e.key,"\\s*:\\s*(.*)")),r=t.skin.match(n);if(r){var o=","===r[0].slice(-1);t.skin=t.skin.replace(r[0],"".concat(e.key,": ").concat(e.setting).concat(o?",":""))}})),console.log("\nUser Alien Options AFTER Upgrade:\n",x(t.skin,n))};function O(t){return O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},O(t)}function E(){E=function(){return e};var t,e={},n=Object.prototype,r=n.hasOwnProperty,o=Object.defineProperty||function(t,e,n){t[e]=n.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function l(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,n){return t[e]=n}}function u(t,e,n,r){var i=e&&e.prototype instanceof y?e:y,a=Object.create(i.prototype),s=new U(r||[]);return o(a,"_invoke",{value:P(t,n,s)}),a}function f(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}e.wrap=u;var h="suspendedStart",p="suspendedYield",d="executing",v="completed",m={};function y(){}function g(){}function w(){}var b={};l(b,a,(function(){return this}));var S=Object.getPrototypeOf,k=S&&S(S(j([])));k&&k!==n&&r.call(k,a)&&(b=k);var x=w.prototype=y.prototype=Object.create(b);function L(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function T(t,e){function n(o,i,a,s){var c=f(t[o],t,i);if("throw"!==c.type){var l=c.arg,u=l.value;return u&&"object"==O(u)&&r.call(u,"__await")?e.resolve(u.__await).then((function(t){n("next",t,a,s)}),(function(t){n("throw",t,a,s)})):e.resolve(u).then((function(t){l.value=t,a(l)}),(function(t){return n("throw",t,a,s)}))}s(c.arg)}var i;o(this,"_invoke",{value:function(t,r){function o(){return new e((function(e,o){n(t,r,e,o)}))}return i=i?i.then(o,o):o()}})}function P(e,n,r){var o=h;return function(i,a){if(o===d)throw Error("Generator is already running");if(o===v){if("throw"===i)throw a;return{value:t,done:!0}}for(r.method=i,r.arg=a;;){var s=r.delegate;if(s){var c=I(s,r);if(c){if(c===m)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===h)throw o=v,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=d;var l=f(e,n,r);if("normal"===l.type){if(o=r.done?v:p,l.arg===m)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(o=v,r.method="throw",r.arg=l.arg)}}}function I(e,n){var r=n.method,o=e.iterator[r];if(o===t)return n.delegate=null,"throw"===r&&e.iterator.return&&(n.method="return",n.arg=t,I(e,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),m;var i=f(o,e.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,m;var a=i.arg;return a?a.done?(n[e.resultName]=a.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,m):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,m)}function A(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function N(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function U(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(A,this),this.reset(!0)}function j(e){if(e||""===e){var n=e[a];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function n(){for(;++o<e.length;)if(r.call(e,o))return n.value=e[o],n.done=!1,n;return n.value=t,n.done=!0,n};return i.next=i}}throw new TypeError(O(e)+" is not iterable")}return g.prototype=w,o(x,"constructor",{value:w,configurable:!0}),o(w,"constructor",{value:g,configurable:!0}),g.displayName=l(w,c,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,l(t,c,"GeneratorFunction")),t.prototype=Object.create(x),t},e.awrap=function(t){return{__await:t}},L(T.prototype),l(T.prototype,s,(function(){return this})),e.AsyncIterator=T,e.async=function(t,n,r,o,i){void 0===i&&(i=Promise);var a=new T(u(t,n,r,o),i);return e.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},L(x),l(x,c,"Generator"),l(x,a,(function(){return this})),l(x,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},e.values=j,U.prototype={constructor:U,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(N),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function o(r,o){return s.type="throw",s.arg=e,n.next=r,o&&(n.method="next",n.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),l=r.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!l)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),N(n),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;N(n)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:j(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),m}},e}function T(t,e,n,r,o,i,a){try{var s=t[i](a),c=s.value}catch(t){return void n(t)}s.done?e(c):Promise.resolve(c).then(r,o)}function P(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){T(i,r,o,a,s,"next",t)}function s(t){T(i,r,o,a,s,"throw",t)}a(void 0)}))}}function I(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,A(r.key),r)}}function A(t){var e=function(t,e){if("object"!=O(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=O(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==O(e)?e:e+""}var N=function(){return t=function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.defaults={targetUrl:"https://die-netzialisten.de",rssFeedUrl:"feed",titleField:"title",publishedField:"pubDate",commentsField:"comments",counterField:"commentCount",allowComments:!0,pauseChecks:12e4,syncStories:3,targetStory:!0,titlePrefix:"✉ $comments - ",titlePostfix:"",colorAlias:"#f7cf5e",colorNavIcon:"#f7cf5e",positionToast:"toast-top-full-width",menuOffsetTop:0,menuOffsetRight:0,delayNewRelease:1728e5,delayBetweenUpdates:400,redirectToNewSite:!0,needUpdateLevel:"Owner",debug:!1,isTest:!1,testUser:"NeonWilderness"},this.providerPostIdReg={wordpress:/\?p=([0-9]*)/,nuxtjs:/\/([^/]+)\/?$/,blogger:/post-([0-9]*)/,tumblr:/post\/([0-9]*)/},this.functionUrl="https://statuesque-maamoul-5ba7b4.netlify.app/.netlify/functions/getrss",this.appUser="YWxleGJsdWU3MXxibG9lZGJhYmJsZXJ8Zm91bmRhdGlvbnxLdWx0dXJmbGFuZXVyfG1tbXxOYmVybGlufE5lb25XaWxkZXJuZXNzfG5vZW1peHxzcGllZ2VsZWl8dGFsa3N0cmFpZ2h0fHdlbHRlbnRhbno=",this.noAlien="PGltZyBzcmM9Ii9sYXlvdXRzL2FsaWVuL2ltYWdlcy9ub2FsaWVuIiB3aWR0aD0iMTAwJSIgLz4=",this.alias=""},e=[{key:"log",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n="font-weight:bold; margin:1em 0 .2em";if(this.options.debug){var r=e;r.startsWith("!")&&(console.log("%c".concat(r.slice(1)),n),r=""),Array.isArray(t)?t.length&&console.table(t):"string"==typeof t&&t.startsWith("!")?console.log("%c".concat(t.slice(1)),n):console.log("".concat(r).concat(t))}}},{key:"checkNewVersionAvailability",value:function(){var t=localStorage.getItem("delayAlienRelease");if(!(t&&Date.now()<=Number(t))){var e=this;$.getJSON("https://cdn.jsdelivr.net/gh/NeonWilderness/tdalien@latest/package.json",(function(t){e.parseVersion(t.version)>e.options.version&&($("#btnClose, #btnCancel").on("click",(function(t){if(t.preventDefault(),$("#newVersion").fadeOut(),"btnClose"===t.target.id){var n=Date.now()+e.options.delayNewRelease;localStorage.setItem("delayAlienRelease",n)}})),$("#btnUpdate").on("click",(function(t){t.preventDefault(),$("#msgNewVersion").fadeOut(),$("#msgUpdate").fadeIn().css("display","inline-block")})),$("#btnSaveParams").on("click",(function(t){t.preventDefault(),e.saveCurrentParams()})),$("#newVersion").fadeIn(900))}))}}},{key:"getFeedsPostIdSelector",value:function(t){for(var e=Object.keys(this.providerPostIdReg),n="",r=0;!n&&r<e.length;){var o=e[r];t.indexOf(o)>=0&&(n=o),r++}return n?this.providerPostIdReg[n]:null}},{key:"getNewBlogAlias",value:function(){var t=this.options.targetUrl.replace("www.","").match(/https?:\/\/(.*?)\./i);return t?t[1]:""}},{key:"implant",value:function(t){var e=this;if(this.options=Object.assign({},this.defaults,t),this.options.newBlogAlias=this.getNewBlogAlias(),this.options.version=this.parseVersion(document.body.dataset.version),this.navIcon=$("#showMenu"),this.options.isTest&&(this.options.debug=!0),this.log(JSON.stringify(this.options,null,2),"!Alien Tool Options:"),!this.isAppUser())return $("#frame").attr("srcdoc",window.atob(this.noAlien)),void this.navIcon.attr("title","Zur Layoutübersicht").on("click",(function(){window.location.href="/layouts"}));var n=this.options.targetUrl;if(window.location.pathname.toLowerCase().startsWith("/stories")&&this.options.targetStory){var r=$(".alienStatus").text();if(r)try{var o=JSON.parse(r);o.link&&(n=o.link)}catch(t){}}this.log("Using iframe url: ".concat(n));var i=this.options.needUpdateLevel.toString().toLowerCase().substr(0,5),a="<% username %>"===$("#createInfo>a").text(),s=this.isUserAdministrator(),c=this.options.isTest&&"<% username %>"===this.options.testUser,l="owner"===i&&a||"admin"===i&&s||c;if(!l&&this.options.redirectToNewSite)return this.log("Redirecting to new site."),window.location.replace(n),!1;this.options.colorAlias=this.options.colorAlias.toLowerCase(),this.options.colorAlias!==this.defaults.colorAlias&&$("#alias").css("color",this.options.colorAlias),this.options.colorNavIcon=this.options.colorNavIcon.toLowerCase(),this.options.colorNavIcon!==this.defaults.colorNavIcon&&this.navIcon.css("color",this.options.colorNavIcon),this.options.menuOffsetTop&&this.navIcon.css("top",8+this.options.menuOffsetTop),this.options.menuOffsetRight&&this.navIcon.css("right",25+this.options.menuOffsetRight),$(".alien").each((function(t,r){switch(r.tagName){case"A":r.href=e.options.targetUrl,e.options.newBlogAlias.length&&(r.innerHTML=r.innerHTML.replace("<% site.alias %>",e.options.newBlogAlias));break;case"IFRAME":r.src=n;var o=e;r.addEventListener("load",(function(){$("#wpadminbar")&&(o.options.menuOffsetTop+=24,o.navIcon.css("top",8+o.options.menuOffsetTop)),o.navIcon.removeClass("faded")}),{once:!0})}})),toastr.options={closeButton:!1,newestOnTop:!1,positionClass:this.options.positionToast,progressBar:!0,timeOut:8e3},$(".sign".concat("out")).show(0).css("display","block"),this.initClickFunctions(),setTimeout((function(){if(l){$(".adminOnly").show(0).css("display","block"),e.checkNewVersionAvailability(),e.restoreSavedParams();var t=$("#menuParams");e.options.targetUrl===e.defaults.targetUrl?(t.addClass("highlight"),toastr.warning('<div style="text-align:center">Bitte klicken Sie im Menü auf <b>Parameter/Einstellungen</b>, um <b>Ihren eigenen Blog</b> zu aktivieren!</div>')):(t.removeClass("highlight"),e.maySyncNow()&&e.readAlienRSS())}}),1e3)}},{key:"initClickFunctions",value:function(){var t=this,e=!1,n=this.navIcon.find("i");this.navIcon.on("click",(function(r){e?document.body.classList.remove("show-menu"):document.body.classList.add("show-menu"),t.navIcon.attr("title","Menü ".concat(e?"ein":"aus","blenden")),n.addClass("fa-spin"),setTimeout((function(){n.toggleClass("fa-navicon fa-close"),n.removeClass("fa-spin"),t.options.menuOffsetTop&&t.navIcon.css("top",8+Number(!e)*t.options.menuOffsetTop),t.options.menuOffsetRight&&t.navIcon.css("right",25+Number(!e)*t.options.menuOffsetRight)}),500),e=!e}))}},{key:"isAppUser",value:function(){return this.alias=document.getElementById("alias").innerText||"N/A",window.atob(this.appUser).split("|").indexOf(this.alias)>=0}},{key:"isUserAdministrator",value:function(){var t=document.getElementById("loginStatus").innerText.match(/\((.*)\)/);return!!t&&"Administrator"===t[1]}},{key:"maySyncNow",value:function(){if(this.options.syncStories<1)return!1;var t=localStorage.getItem("lastAlienSync"),e=new Date,n=!t||new Date(t).getTime()+this.options.pauseChecks<e.getTime();return n&&localStorage.setItem("lastAlienSync",e.toString()),n}},{key:"parseVersion",value:function(t){return t.split(".").reduce((function(t,e,n){return t+e*Math.pow(100,2-n)}),0)}},{key:"readAlienRSS",value:function(){var t=this;$.getJSON("".concat(this.functionUrl,"?url=").concat(function(){return function(t){var e=[];if(0===t.length)return"";if("string"!=typeof t[0])throw new TypeError("Url must be a string. Received "+t[0]);if(t[0].match(/^[^/:]+:\/*$/)&&t.length>1){var n=t.shift();t[0]=n+t[0]}t[0].match(/^file:\/\/\//)?t[0]=t[0].replace(/^([^/:]+):\/*/,"$1:///"):t[0]=t[0].replace(/^([^/:]+):\/*/,"$1://");for(var r=0;r<t.length;r++){var o=t[r];if("string"!=typeof o)throw new TypeError("Url must be a string. Received "+o);""!==o&&(r>0&&(o=o.replace(/^[\/]+/,"")),o=r<t.length-1?o.replace(/[\/]+$/,""):o.replace(/[\/]+$/,"/"),e.push(o))}var i=e.join("/"),a=(i=i.replace(/\/(\?|&|#[^!])/g,"$1")).split("?");return a.shift()+(a.length>0?"?":"")+a.join("&")}("object"==typeof arguments[0]?arguments[0]:[].slice.call(arguments))}(this.options.targetUrl,this.options.rssFeedUrl),"&alias=").concat(this.alias),(function(e){if(e.items&&e.items.length>0){var n=t.readStoriesFromRssData(e);t.log(n,"!Parsed RSS stories (".concat(t.options.syncStories," to sync):")),k(n,t)}})).fail((function(e){console.error("Netlify getrss error: ".concat(e.status," | ").concat(e.statusText,".")),toastr.error("Das Lesen des RSS Feeds endete mit Fehler: ".concat(e.status," | ").concat(e.statusText,".")),500===e.status&&(toastr.error('Eventuell wurde der Blog "'.concat(t.options.newBlogAlias,'" auf PRIVAT gestellt.')),setTimeout((function(){window.location.replace(t.options.targetUrl)}),2e3))}))}},{key:"readStoriesFromRssData",value:function(t){var e=this;this.log(JSON.stringify(t,null,2),"!Netlify getrss items:");var n=this.getFeedsPostIdSelector(t.generator.toLowerCase());return t.items.reduce((function(r,o){var i="";if(n){var a=(o.guid||o.id).match(n);a&&(i=a[1])}!i&&o.postid&&o.postid._&&(i=o.postid._);var s=new Date(o[e.options.publishedField]);s.setSeconds(0,0);var c="string"!=typeof o.contentSnippet?"...":o.contentSnippet.replace(/ Werbeanzeigen/gi,"");c.slice(-3).includes("…")||(c+="…");var l={postid:i,link:o.link||t.link,contentSnippet:c,title:o[e.options.titleField]||"...",published:s,commentUrl:o[e.options.commentsField]||"".concat(o.link,"#comments"),comments:o[e.options.counterField]||0};return e.log(JSON.stringify(l,null,2),"rss story: "),r.push(l),r}),[]).sort((function(t,e){return e.published.getTime()-t.published.getTime()})).slice(0,this.options.syncStories)}},{key:"restoreSavedParams",value:(r=P(E().mark((function t(){var e,n,r,o,i,a;return E().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,e=localStorage.getItem("savedAlienVersion"),n=localStorage.getItem("savedAlienSkinStories"),r=localStorage.getItem("savedAlienSkinParams"),e&&n&&r){t.next=6;break}return t.abrupt("return");case 6:if(!(this.parseVersion(document.body.dataset.version)<=this.parseVersion(e))){t.next=8;break}return t.abrupt("return");case 8:return t.next=10,u(d(),this.options.delayBetweenUpdates);case 10:return o=t.sent,(i=o.params).skin=n,t.next=15,u(v(i),this.options.delayBetweenUpdates);case 15:return t.next=17,u(h(),this.options.delayBetweenUpdates);case 17:return a=t.sent,L(a,r,this.options),t.next=21,u(p(a),this.options.delayBetweenUpdates);case 21:localStorage.removeItem("savedAlienVersion"),toastr.success("Ihre Parameter und Einstellungen wurden erfolgreich wiederhergestellt!"),toastr.info('Bitte laden Sie nun die Seite neu per "Hard-Reload" (Windows: Strg-F5, Mac: Cmd-R).'),t.next=29;break;case 26:t.prev=26,t.t0=t.catch(0),toastr.error("Die Wiederherstellung der Parameter/Einstellungen endete mit Fehler: ".concat(t.t0.toString(),"."));case 29:case"end":return t.stop()}}),t,this,[[0,26]])}))),function(){return r.apply(this,arguments)})},{key:"saveCurrentParams",value:(n=P(E().mark((function t(){var e,n,r;return E().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u(d(),this.options.delayBetweenUpdates);case 3:return e=t.sent,n=e.skinStories,localStorage.setItem("savedAlienSkinStories",JSON.stringify(n)),t.next=8,u(h(),this.options.delayBetweenUpdates);case 8:r=t.sent,localStorage.setItem("savedAlienSkinParams",r.skin),localStorage.setItem("savedAlienVersion",document.body.dataset.version),toastr.success("Ihre Parameter und Einstellungen wurden erfolgreich gesichert!"),t.next=17;break;case 14:t.prev=14,t.t0=t.catch(0),toastr.error("Die Sicherung der Parameter/Einstellungen endete mit Fehler: ".concat(t.t0.toString(),"."));case 17:case"end":return t.stop()}}),t,this,[[0,14]])}))),function(){return n.apply(this,arguments)})}],e&&I(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e,n,r}();jQuery.fn.alien=function(){var t=new N;return{implant:t.implant.bind(t)}}})();