!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([function(e,t,n){var i,o,r;r=function(){return function(){return function(e){var t=[];if(e[0].match(/^[^/:]+:\/*$/)&&e.length>1){var n=e.shift();e[0]=n+e[0]}e[0].match(/^file:\/\/\//)?e[0]=e[0].replace(/^([^/:]+):\/*/,"$1:///"):e[0]=e[0].replace(/^([^/:]+):\/*/,"$1://");for(var i=0;i<e.length;i++){var o=e[i];if("string"!=typeof o)throw new TypeError("Url must be a string. Received "+o);""!==o&&(i>0&&(o=o.replace(/^[\/]+/,"")),o=i<e.length-1?o.replace(/[\/]+$/,""):o.replace(/[\/]+$/,"/"),t.push(o))}var r=t.join("/"),s=(r=r.replace(/\/(\?|&|#[^!])/g,"$1")).split("?");return r=s.shift()+(s.length>0?"?":"")+s.join("&")}("object"==typeof arguments[0]?arguments[0]:[].slice.call(arguments))}},void 0!==e&&e.exports?e.exports=r():void 0===(o="function"==typeof(i=r)?i.call(t,n,t,e):i)||(e.exports=o)},function(e,t,n){var i;i=function(){var e=JSON.parse('{"$":"dollar","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","џ":"dz","Ґ":"G","ґ":"g","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","‘":"\'","’":"\'","“":"\\"","”":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₹":"indian rupee","₽":"russian ruble","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial"}');function t(t,n){if("string"!=typeof t)throw new Error("slugify: string argument expected");n="string"==typeof n?{replacement:n}:n||{};var i=t.split("").reduce(function(t,i){return t+(e[i]||i).replace(n.remove||/[^\w\s$*_+~.()'"!\-:@]/g,"")},"").replace(/^\s+|\s+$/g,"").replace(/[-\s]+/g,n.replacement||"-").replace("#{replacement}$","");return n.lower?i.toLowerCase():i}return t.extend=function(t){for(var n in t)e[n]=t[n]},t},e.exports=i(),e.exports.default=i()},function(e,t,n){"use strict";var i=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],i=!0,o=!1,r=void 0;try{for(var s,a=e[Symbol.iterator]();!(i=(s=a.next()).done)&&(n.push(s.value),!t||n.length!==t);i=!0);}catch(e){o=!0,r=e}finally{try{!i&&a.return&&a.return()}finally{if(o)throw r}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=n(1),r=function(e){return'<div class="alienStatus" style="display:none">'+JSON.stringify(e,null,2)+"</div>"},s=function(e,t,n){toastr.error("Fehler beim "+e+" von "+t+": "+n.status+" | "+n.statustext+".")},a=function(e){var t=$(e).find("form");return{secretKey:t.find("[name=secretKey]").val(),action:t.find('[name="action"]').val(),key:t.find('[name="key"]').val(),skinset:t.find('[name="skinset"]').val(),module:t.find('[name="module"]').val(),title:t.find('[name="title"]').val(),description:t.find('[name="description"]').html(),skin:t.find("[name=skin]").val(),save:t.find('[name="save"]').val()}},l=function(){return new Promise(function(e,t){var n=$.get("/layouts/alien/skins/edit?key=Site.stories",function(t){var n=a(t),i=JSON.parse(n.skin);i.forEach(function(e){e.published=new Date(e.published)}),console.log("readStoriesSkinContent: ",i),e({params:n,skinStories:i})}).fail(function(){s("Lesen(get)","Skin Site.stories",n),t()})})},u=function(e){return new Promise(function(t,n){var i=$.post("/layouts/alien/skins/edit?key=Site.stories",e,function(){t()}).fail(function(){s("Update(post)","Skin Site.stories",i),n()})})},c=function(e){return o(e||"...")},f=function(e){var t=$(e).find("form");return{secretKey:t.find('[name="secretKey"]').val(),content_title:t.find('[name="content_title"]').val(),modNiceUrls_urlid:t.find('[name="modNiceUrls_urlid"]').val(),content_text:t.find('[name="content_text"]').val(),addToFront:t.find('[name="addToFront"]').val(),checkbox_addToFront:t.find('[name="checkbox_addToFront"]').val(),addToTopic:t.find('[name="addToTopic"]').val(),topic:t.find('[name="topic"]').val(),editableby:t.find('[name="editableby"]').val(),discussions:t.find('[name="discussions"]').val(),checkbox_discussions:t.find('[name="checkbox_discussions"]').val(),createtime:t.find('[name="createtime"]').val(),publish:t.find('[name="publish"]').val()}};e.exports={readStoriesSkin:function(e){var t={};l().then(function(n){var o=n.params,r=n.skinStories;t=o;var a=function(e,t){var n=e.reduce(function(e,t){return e[t.published.getTime()]=t,e},{});return t.reduce(function(e,t){var n=t.published.getTime();return e.hasOwnProperty(n)&&(e[n].hasOwnProperty("comments")?e[n].comments==t.comments&&delete e[n]:delete e[n]),e},n)}(e,r);if(Object.keys(a).length>0)return function(e){return new Promise(function(t,n){var o=$.get("/stories/main",function(n){var o={};$(n).find(".admin").find(".storyData").each(function(){var e=this.innerText.split("|"),t=i(e,2),n=t[0],r=t[1],s=c(n);o[s]=r,console.log("title:",n,"slug:",s,"id:",r)});var r=Object.keys(e).reduce(function(t,n){var i=e[n],r=c(i.title);return console.log("Searching slug:",r,"found:",o.hasOwnProperty(r)),o.hasOwnProperty(r)&&(i.id=o[r]),t.push(i),t},[]);t(r)}).fail(function(){s("Lesen(get)","Twoday Beitragsübersicht",o),n()})})}(a)}).then(function(e){if(console.log("finalStories: ",e),e&&e.length){var t=e.map(function(e){return e.hasOwnProperty("id")?function(e){return new Promise(function(t,n){var i="/stories/"+e.id+"/edit",o=$.get(i,function(a){e.alienLastUpdate=(new Date).toISOString();var l=f(a),u=$("<div>"+l.content_text+"</div>"),c=u.find(".alienStatus");c.length?c.text(JSON.stringify(e,null,2)):u.append(r(e)),l.content_title=e.title||"...",l.content_text=u.html(),l.createtime=e.published.toISOString().substr(0,10)+" "+e.published.toTimeString().substr(0,5),o=$.post(i,l,function(){toastr.info("Beitrag "+e.title+" vom "+e.published.toLocaleString()+" in Twoday aktualisiert."),t()}).fail(function(){s("Update(post)","Twoday-Beitrags "+e.id,o),n()})}).fail(function(){s("Update(get)","Twoday-Beitrags "+e.id,o),n()})})}(e):function(e){return new Promise(function(t,n){var i=$.get("/stories/create",function(o){e.alienLastUpdate=(new Date).toISOString();var a=f(o);a.content_title=e.title||"...",a.content_text=r(e),a.createtime=e.published.toISOString().substr(0,10)+" "+e.published.toTimeString().substr(0,5),i=$.post("/stories/create",a,function(){toastr.info("Beitrag "+e.title+" vom "+e.published.toLocaleString()+" in Twoday neu angelegt."),t()}).fail(function(){s("Anlegen(post)","Twoday-Beitrags "+e.id,i),n()})}).fail(function(){s("Anlegen(get)","Twoday-Beitrags "+e.id,i),n()})})}(e)});return Promise.all(t)}return toastr.info("Keine neuen zu synchronisierenden Änderungen gefunden!"),!1}).then(function(){return t.skin=JSON.stringify(e,null,2),u(t)}).then(function(){toastr.success("Synchronisation erfolgreich abgeschlossen.")}).catch(function(e){return toastr.error("Synchronisation endete mit Fehler: "+e+".")})},readStoriesSkinContent:l,saveStoriesSkinContent:u,readParamsSkinContent:function(){return new Promise(function(e,t){var n=$.get("/layouts/alien/skins/edit?key=Site.implant",function(t){var n=a(t);e(n)}).fail(function(){s("Lesen(get)","Skin Site.implant",n),t()})})},saveParamsSkinContent:function(e){return new Promise(function(t,n){var i=$.post("/layouts/alien/skins/edit?key=Site.implant",e,function(){t()}).fail(function(){s("Update(post)","Skin Site.implant",i),n()})})}}},,function(e,t,n){},function(e,t,n){"use strict";var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();n(4);var o=n(2);var r=n(0),s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.defaults={targetUrl:"https://die-netzialisten.de",rssFeedUrl:"feed",titleField:"title",publishedField:"pubDate",commentsField:"comments",multiParts:["commentUrl","comments"],pauseChecks:12e4,syncStories:3,colorAlias:"#13c4a5",colorNavIcon:"#13c4a5",forceHttp:!1,positionToast:"toast-top-full-width",menuOffsetTop:0,menuOffsetRight:0,debug:!1}}return i(e,[{key:"checkNewVersionAvailability",value:function(){var e=function(e){return parseInt(e.replace(/\./g,""))},t=this;$.getJSON("https://rawgit.com/NeonWilderness/tdalien/master/package.json",function(n){var i=e(document.body.dataset.version);e(n.version)>i&&($("#btnClose, #btnCancel").on("click",function(e){e.preventDefault(),$("#newVersion").fadeOut()}),$("#btnUpdate").on("click",function(e){e.preventDefault(),$("#msgNewVersion").fadeOut(),$("#msgUpdate").fadeIn()}),$("#btnSaveParams").on("click",function(e){e.preventDefault(),t.saveCurrentParams()}),$("#newVersion").fadeIn(900))})}},{key:"getNewBlogAlias",value:function(){var e=this.options.targetUrl.replace("www.","").match(/https?:\/\/(.*?)\./i);return e?e[1]:""}},{key:"implant",value:function(e){var t=this;this.options=Object.assign({},this.defaults,e),this.options.newBlogAlias=this.getNewBlogAlias(),this.options.debug&&console.log("Alien Options: "+JSON.stringify(this.options,null,2)),this.options.forceHttp&&"https:"===location.protocol&&(location.protocol="http:"),this.options.colorAlias=this.options.colorAlias.toLowerCase(),this.options.colorAlias!==this.defaults.colorAlias&&$("#alias").css("color",this.options.colorAlias);var n=$("#showMenu");this.options.colorNavIcon=this.options.colorNavIcon.toLowerCase(),this.options.colorNavIcon!==this.defaults.colorNavIcon&&n.css("color",this.options.colorNavIcon),this.options.menuOffsetTop&&n.css("top",8+this.options.menuOffsetTop),this.options.menuOffsetRight&&n.css("right",25+this.options.menuOffsetRight),$(".alien").each(function(e,n){switch(n.tagName){case"A":n.href=t.options.targetUrl,t.options.newBlogAlias.length&&(n.innerHTML=n.innerHTML.replace("<% site.alias %>",t.options.newBlogAlias));break;case"IFRAME":n.src=t.options.targetUrl}}),toastr.options={closeButton:!1,newestOnTop:!1,positionClass:this.options.positionToast,progressBar:!0,timeOut:"8000"},this.initClickFunctions(),setTimeout(function(){if(t.isUserAdministrator()){t.checkNewVersionAvailability(),t.restoreSavedParams();var e=$("#menuParams");t.options.targetUrl===t.defaults.targetUrl?(e.addClass("highlight"),toastr.warning('<div style="text-align:center">Bitte klicken Sie im Menü auf <b>Parameter/Einstellungen</b>, um <b>Ihren eigenen Blog</b> zu aktivieren!</div>')):(e.removeClass("highlight"),t.maySyncNow()&&t.readAlienRSS())}},2e3)}},{key:"initClickFunctions",value:function(){var e=this,t=!1,n=$("#showMenu"),i=n.find("i");n.on("click",function(o){t?document.body.classList.remove("show-menu"):document.body.classList.add("show-menu"),n.attr("title","Menü "+(t?"ein":"aus")+"blenden"),i.addClass("fa-spin"),setTimeout(function(){i.toggleClass("fa-navicon fa-close"),i.removeClass("fa-spin"),e.options.menuOffsetTop&&n.css("top",8+Number(!t)*e.options.menuOffsetTop),e.options.menuOffsetRight&&n.css("right",25+Number(!t)*e.options.menuOffsetRight)},500),t=!t})}},{key:"isUserAdministrator",value:function(){var e=document.getElementById("loginStatus").innerText.match(/\((.*)\)/);return!!e&&"Administrator"===e[1]}},{key:"maySyncNow",value:function(){if(this.options.syncStories<1)return!1;var e=localStorage.getItem("lastAlienSync"),t=new Date,n=!e||new Date(e).getTime()+this.options.pauseChecks<t.getTime();return n&&localStorage.setItem("lastAlienSync",t),n}},{key:"readAlienRSS",value:function(){var e="select "+this.options.titleField+", "+this.options.publishedField+(this.options.commentsField.length?", ":"")+this.options.commentsField+' from rss where url="'+r(this.options.targetUrl,this.options.rssFeedUrl,"?d="+(new Date).getTime())+'"',t="https://query.yahooapis.com/v1/public/yql?q="+encodeURIComponent(e)+"&format=json&"+encodeURIComponent("env=store://datatables.org/alltableswithkeys"),n=this;$.ajax({type:"GET",url:t,dataType:"json",success:function(e){if(e.query.count>0){var t=n.readStoriesFromRssData(e.query.results.item);n.options.debug&&console.log("Parsed RSS stories: ",t),(0,o.readStoriesSkin)(t)}}}).fail(function(e,t,n){console.error("YQL console error: "+t+" | "+n+".")})}},{key:"readStoriesFromRssData",value:function(e){var t=this,n=this.options.multiParts.length>1;this.options.debug&&console.log("YQL JSON: "+JSON.stringify(e,null,2));var i=e.reduce(function(e,i){var o=i[t.options.publishedField].split(":");o[o.length-1]="00 "+o[o.length-1].substr(3);var r={title:i[t.options.titleField]||"...",published:new Date(o.join(":"))};if(i.hasOwnProperty(t.options.commentsField)){var s=t.options.multiParts[0];n&&$.isNumeric(i[t.options.commentsField])&&(s=t.options.multiParts[1]),r[s]=i[t.options.commentsField]}return e[r.published]=e.hasOwnProperty(r.published)?Object.assign(r,e[r.published]):r,e},{});return Object.keys(i).map(function(e){return Object.assign({comments:"0",commentUrl:""},i[e])}).sort(function(e,t){return t.published.getTime()-e.published.getTime()}).slice(0,this.options.syncStories)}},{key:"restoreSavedParams",value:function(){var e=localStorage.getItem("savedAlienVersion"),t=localStorage.getItem("savedAlienSkinStories"),n=localStorage.getItem("savedAlienSkinParams");e&&t&&n&&(0,o.readStoriesSkinContent)().then(function(e){var n=e.params;return n.skin=t,(0,o.saveStoriesSkinContent)(n)}).then(function(){return(0,o.readParamsSkinContent)()}).then(function(e){return e.skin=n,(0,o.saveParamsSkinContent)(e)}).then(function(){localStorage.removeItem("savedVersion"),toastr.success("Ihre Parameter und Einstellungen wurden erfolgreich wiederhergestellt!"),toastr.info('Bitte laden Sie nun die Seite neu per "Hard-Reload" (Windows: Strg-F5, Mac: Cmd-R).')}).catch(function(e){return toastr.error("Die Wiederherstellung der Parameter/Einstellungen endete mit Fehler: "+e+".")})}},{key:"saveCurrentParams",value:function(){(0,o.readStoriesSkinContent)().then(function(e){var t=e.skinStories;return localStorage.setItem("savedAlienSkinStories",JSON.stringify(t)),(0,o.readParamsSkinContent)()}).then(function(e){localStorage.setItem("savedAlienSkinParams",e.skin),localStorage.setItem("savedAlienVersion",document.body.dataset.version),toastr.success("Ihre Parameter und Einstellungen wurden erfolgreich gesichert!")}).catch(function(e){return toastr.error("Die Sicherung der Parameter/Einstellungen endete mit Fehler: "+e+".")})}}]),e}();jQuery.fn.alien=function(){var e=new s;return{implant:e.implant.bind(e)}}}]);