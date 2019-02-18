!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();n(1);var o=n(2);var r=n(4),s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.defaults={targetUrl:"https://die-netzialisten.de",rssFeedUrl:"feed",titleField:"title",publishedField:"pubDate",commentsField:"comments",counterField:"commentCount",allowComments:!0,pauseChecks:12e4,syncStories:3,colorAlias:"#13c4a5",colorNavIcon:"#13c4a5",positionToast:"toast-top-full-width",menuOffsetTop:0,menuOffsetRight:0,debug:!1},this.providerPostIdReg={wordpress:/\?p=([0-9]*)/,nuxtjs:/\/([^\/]+)\/?$/,blogger:/post-([0-9]*)/,tumblr:/post\/([0-9]*)/},this.webtaskUrl="https://wt-061cbc2118e775aa9f3fe9182b7691db-0.sandbox.auth0-extend.com/getrss"}return i(e,[{key:"checkNewVersionAvailability",value:function(){var e=this;$.getJSON("https://cdn.jsdelivr.net/gh/NeonWilderness/tdalien@master/package.json",function(t){var n=e.parseVersion(document.body.dataset.version);e.parseVersion(t.version)>n&&($("#btnClose, #btnCancel").on("click",function(e){e.preventDefault(),$("#newVersion").fadeOut()}),$("#btnUpdate").on("click",function(e){e.preventDefault(),$("#msgNewVersion").fadeOut(),$("#msgUpdate").fadeIn().css("display","inline-block")}),$("#btnSaveParams").on("click",function(t){t.preventDefault(),e.saveCurrentParams()}),$("#newVersion").fadeIn(900))})}},{key:"getFeedsPostIdSelector",value:function(e){for(var t=Object.keys(this.providerPostIdReg),n="",i=0;!n&&i<t.length;){var o=t[i];e.indexOf(o)>=0&&(n=o),i++}return n?this.providerPostIdReg[n]:null}},{key:"getNewBlogAlias",value:function(){var e=this.options.targetUrl.replace("www.","").match(/https?:\/\/(.*?)\./i);return e?e[1]:""}},{key:"gotoStory",value:function(e){}},{key:"implant",value:function(e){var t=this;this.options=Object.assign({},this.defaults,e),this.options.newBlogAlias=this.getNewBlogAlias(),this.options.debug&&console.log("Alien Options: "+JSON.stringify(this.options,null,2)),this.options.targetStory&&/\/stories\/[0-9]*/.test(location.pathname)&&this.gotoStory(location.pathname),this.options.colorAlias=this.options.colorAlias.toLowerCase(),this.options.colorAlias!==this.defaults.colorAlias&&$("#alias").css("color",this.options.colorAlias);var n=$("#showMenu");this.options.colorNavIcon=this.options.colorNavIcon.toLowerCase(),this.options.colorNavIcon!==this.defaults.colorNavIcon&&n.css("color",this.options.colorNavIcon),this.options.menuOffsetTop&&n.css("top",8+this.options.menuOffsetTop),this.options.menuOffsetRight&&n.css("right",25+this.options.menuOffsetRight),$(".alien").each(function(e,n){switch(n.tagName){case"A":n.href=t.options.targetUrl,t.options.newBlogAlias.length&&(n.innerHTML=n.innerHTML.replace("<% site.alias %>",t.options.newBlogAlias));break;case"IFRAME":n.src=t.options.targetUrl}}),toastr.options={closeButton:!1,newestOnTop:!1,positionClass:this.options.positionToast,progressBar:!0,timeOut:"8000"},$(".sign"+("<% username %>".length>0?"out":"in")).show(0).css("display","block"),this.initClickFunctions(),setTimeout(function(){if(t.isUserAdministrator()){$(".adminOnly").show(0).css("display","block"),t.checkNewVersionAvailability(),t.restoreSavedParams();var e=$("#menuParams");t.options.targetUrl===t.defaults.targetUrl?(e.addClass("highlight"),toastr.warning('<div style="text-align:center">Bitte klicken Sie im Menü auf <b>Parameter/Einstellungen</b>, um <b>Ihren eigenen Blog</b> zu aktivieren!</div>')):(e.removeClass("highlight"),t.maySyncNow()&&t.readAlienRSS())}},2e3)}},{key:"initClickFunctions",value:function(){var e=this,t=!1,n=$("#showMenu"),i=n.find("i");n.on("click",function(o){t?document.body.classList.remove("show-menu"):document.body.classList.add("show-menu"),n.attr("title","Menü "+(t?"ein":"aus")+"blenden"),i.addClass("fa-spin"),setTimeout(function(){i.toggleClass("fa-navicon fa-close"),i.removeClass("fa-spin"),e.options.menuOffsetTop&&n.css("top",8+Number(!t)*e.options.menuOffsetTop),e.options.menuOffsetRight&&n.css("right",25+Number(!t)*e.options.menuOffsetRight)},500),t=!t})}},{key:"isUserAdministrator",value:function(){var e=document.getElementById("loginStatus").innerText.match(/\((.*)\)/);return!!e&&"Administrator"===e[1]}},{key:"maySyncNow",value:function(){if(this.options.syncStories<1)return!1;var e=localStorage.getItem("lastAlienSync"),t=new Date,n=!e||new Date(e).getTime()+this.options.pauseChecks<t.getTime();return n&&localStorage.setItem("lastAlienSync",t),n}},{key:"parseVersion",value:function(e){return parseInt(e.replace(/\./g,""))}},{key:"readAlienRSS",value:function(){var e=this;$.getJSON(this.webtaskUrl+"?url="+r(this.options.targetUrl,this.options.rssFeedUrl),function(t){if(t.items&&t.items.length>0){var n=e.readStoriesFromRssData(t);e.options.debug&&console.log("Parsed RSS stories: ",n),(0,o.readStoriesSkin)(n,e.options)}}).fail(function(e,t,n){console.error("Webtask getrss error: "+t+" | "+n+".")})}},{key:"readStoriesFromRssData",value:function(e){var t=this;this.options.debug&&console.log("Webtask getrss items: "+JSON.stringify(e,null,2));var n=this.getFeedsPostIdSelector(e.generator);return e.items.reduce(function(i,o){var r="";if(n){var s=(o.guid||o.id).match(n);s&&(r=s[1])}var a=o[t.options.publishedField].split(":");a[a.length-1]="00 "+a[a.length-1].substr(3);var l={postid:r,link:o.link||e.link,contentSnippet:o.contentSnippet.replace(/(Read More|Weiterlesen)/gi,""),title:o[t.options.titleField]||"...",published:new Date(a.join(":")),commentUrl:o[t.options.commentsField]||o.link+"#comments",comments:o[t.options.counterField]||0};return i.push(l),i},[]).sort(function(e,t){return t.published.getTime()-e.published.getTime()}).slice(0,this.options.syncStories)}},{key:"restoreSavedParams",value:function(){var e=localStorage.getItem("savedAlienVersion"),t=localStorage.getItem("savedAlienSkinStories"),n=localStorage.getItem("savedAlienSkinParams");e&&t&&n&&(this.parseVersion(document.body.dataset.version)<=this.parseVersion(e)||(0,o.readStoriesSkinContent)().then(function(e){var n=e.params;return n.skin=t,(0,o.saveStoriesSkinContent)(n)}).then(function(){return(0,o.readParamsSkinContent)()}).then(function(e){return e.skin=n,(0,o.saveParamsSkinContent)(e)}).then(function(){localStorage.removeItem("savedAlienVersion"),toastr.success("Ihre Parameter und Einstellungen wurden erfolgreich wiederhergestellt!"),toastr.info('Bitte laden Sie nun die Seite neu per "Hard-Reload" (Windows: Strg-F5, Mac: Cmd-R).')}).catch(function(e){return toastr.error("Die Wiederherstellung der Parameter/Einstellungen endete mit Fehler: "+e+".")}))}},{key:"saveCurrentParams",value:function(){(0,o.readStoriesSkinContent)().then(function(e){var t=e.skinStories;return localStorage.setItem("savedAlienSkinStories",JSON.stringify(t)),(0,o.readParamsSkinContent)()}).then(function(e){localStorage.setItem("savedAlienSkinParams",e.skin),localStorage.setItem("savedAlienVersion",document.body.dataset.version),toastr.success("Ihre Parameter und Einstellungen wurden erfolgreich gesichert!")}).catch(function(e){return toastr.error("Die Sicherung der Parameter/Einstellungen endete mit Fehler: "+e+".")})}}]),e}();jQuery.fn.alien=function(){var e=new s;return{implant:e.implant.bind(e)}}},function(e,t,n){},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],i=!0,o=!1,r=void 0;try{for(var s,a=e[Symbol.iterator]();!(i=(s=a.next()).done)&&(n.push(s.value),!t||n.length!==t);i=!0);}catch(e){o=!0,r=e}finally{try{!i&&a.return&&a.return()}finally{if(o)throw r}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=n(3),r=function(e){var t={title:e.title,published:e.published,link:e.link,comments:e.comments,postid:e.postid};return"<p>"+(e.contentSnippet||"...")+'</p>\n<div style="text-align:center"><a target="_blank" href="'+e.link+'">&raquo; Beitrag</a>&emsp;&emsp;<a target="_blank" href="'+e.commentUrl+'">&raquo; Kommentare</a></div>\n<div class="alienStatus" style="display:none">'+JSON.stringify(t,null,2)+"</div>"},s=function(e,t,n){toastr.error("Fehler beim "+e+" von "+t+": "+n.status+" | "+n.statustext+".")},a=function(e){var t=$(e).find("form");return{secretKey:t.find("[name=secretKey]").val(),action:t.find('[name="action"]').val(),key:t.find('[name="key"]').val(),skinset:t.find('[name="skinset"]').val(),module:t.find('[name="module"]').val(),title:t.find('[name="title"]').val(),description:t.find('[name="description"]').html(),skin:t.find("[name=skin]").val(),save:t.find('[name="save"]').val()}},l=function(){return new Promise(function(e,t){var n=$.get("/layouts/alien/skins/edit?key=Site.stories",function(t){var n=a(t),i=JSON.parse(n.skin);i.forEach(function(e){e.published=new Date(e.published)}),e({params:n,skinStories:i})}).fail(function(){s("Lesen(get)","Skin Site.stories",n),t()})})},u=function(e){return new Promise(function(t,n){var i=$.post("/layouts/alien/skins/edit?key=Site.stories",e,function(){t()}).fail(function(){s("Update(post)","Skin Site.stories",i),n()})})},c=function(e){return o(e||"...")},d=function(e){var t=$(e).find("form"),n=t.find('[name="discussions"]');return{secretKey:t.find('[name="secretKey"]').val(),content_title:t.find('[name="content_title"]').val(),modNiceUrls_urlid:t.find('[name="modNiceUrls_urlid"]').val(),content_text:t.find('[name="content_text"]').val(),addToFront:t.find('[name="addToFront"]').val(),checkbox_addToFront:t.find('[name="checkbox_addToFront"]').val(),addToTopic:t.find('[name="addToTopic"]').val(),topic:t.find('[name="topic"]').val(),editableby:t.find('[name="editableby"]').val(),discussions:n.prop("checked")?n.val():null,checkbox_discussions:t.find('[name="checkbox_discussions"]').val(),createtime:t.find('[name="createtime"]').val(),publish:t.find('[name="publish"]').val()}};t.readStoriesSkin=function(e,t){var n={};l().then(function(o){var r=o.params,a=o.skinStories;t.debug&&console.log("readStoriesSkinContent: ",a),n=r;var l=function(e,t){var n=e.length&&e[0].postid.length&&(0===t.length||t.length&&"postid"in t[0]&&t[0].postid.length)?function(e){return e.postid}:function(e){return e.published.getTime()},i=e.reduce(function(e,t){return e[n(t)]=t,e},{});return t.reduce(function(e,t){var i,o,r=n(t);return e.hasOwnProperty(r)&&(i=e[r],o=t,i.comments==o.comments&&i.title==o.title&&i.contentSnippet==o.contentSnippet)&&delete e[r],e},i)}(e,a);return Object.keys(l).length>0?function(e,t){return new Promise(function(n,o){var r=$.get("/stories/main",function(o){var r={};$(o).find(".admin").find(".storyData").each(function(){var e=this.innerText.split("|"),n=i(e,2),o=n[0],s=n[1],a=c(o);r[a]=s,t.debug&&console.log("title:",o,"slug:",a,"id:",s)});var s=Object.keys(e).reduce(function(n,i){var o=e[i],s=c(o.title);return t.debug&&console.log("Searching slug:",s,"found:",r.hasOwnProperty(s)),r.hasOwnProperty(s)&&(o.id=r[s]),n.push(o),n},[]);n(s)}).fail(function(){s("Lesen(get)","Twoday Beitragsübersicht",r),o()})})}(l,t):Promise.resolve([])}).then(function(e){if(t.debug&&console.log("finalStories: ",e),e&&e.length){var n=e.map(function(e){return e.hasOwnProperty("id")?function(e,t){return new Promise(function(t,n){var i="/stories/"+e.id+"/edit",o=$.get(i,function(a){e.alienLastUpdate=(new Date).toISOString();var l=d(a),u=$("<div>"+l.content_text+"</div>"),c=u.find(".alienStatus");c.length?c.text(JSON.stringify(e,null,2)):u.append(r(e)),l.content_title=e.title||"...",l.content_text=u.html(),l.createtime=e.published.toISOString().substr(0,10)+" "+e.published.toTimeString().substr(0,5),null==l.discussions&&delete l.discussions,o=$.post(i,l,function(){toastr.info("Beitrag "+e.title+" vom "+e.published.toLocaleString()+" in Twoday aktualisiert."),t()}).fail(function(){s("Update(post)","Twoday-Beitrags "+e.id,o),n()})}).fail(function(){s("Update(get)","Twoday-Beitrags "+e.id,o),n()})})}(e):function(e,t){return new Promise(function(n,i){var o=$.get("/stories/create",function(a){e.alienLastUpdate=(new Date).toISOString();var l=d(a);l.content_title=e.title||"...",l.content_text=r(e),l.createtime=e.published.toISOString().substr(0,10)+" "+e.published.toTimeString().substr(0,5),t.allowComments||delete l.discussions,o=$.post("/stories/create",l,function(){toastr.info("Beitrag "+e.title+" vom "+e.published.toLocaleString()+" in Twoday neu angelegt."),n()}).fail(function(){s("Anlegen(post)","Twoday-Beitrags "+e.id,o),i()})}).fail(function(){s("Anlegen(get)","Twoday-Beitrags "+e.id,o),i()})})}(e,t)});return Promise.all(n)}return toastr.info("Keine neuen zu synchronisierenden Änderungen gefunden!"),!1}).then(function(){var t=JSON.stringify(e,null,2);return n.skin!==t?(n.skin=t,u(n)):Promise.resolve()}).then(function(){toastr.success("Synchronisation erfolgreich abgeschlossen.")}).catch(function(e){return toastr.error("Synchronisation endete mit Fehler: "+e+".")})},t.readStoriesSkinContent=l,t.saveStoriesSkinContent=u,t.readParamsSkinContent=function(){return new Promise(function(e,t){var n=$.get("/layouts/alien/skins/edit?key=Site.implant",function(t){var n=a(t);e(n)}).fail(function(){s("Lesen(get)","Skin Site.implant",n),t()})})},t.saveParamsSkinContent=function(e){return new Promise(function(t,n){var i=$.post("/layouts/alien/skins/edit?key=Site.implant",e,function(){t()}).fail(function(){s("Update(post)","Skin Site.implant",i),n()})})}},function(e,t,n){var i;i=function(){var e=JSON.parse('{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","џ":"dz","Ґ":"G","ґ":"g","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","‘":"\'","’":"\'","“":"\\"","”":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₹":"indian rupee","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial"}');function t(t,n){if("string"!=typeof t)throw new Error("slugify: string argument expected");n="string"==typeof n?{replacement:n}:n||{};var i=t.split("").reduce(function(t,i){return t+(e[i]||i).replace(n.remove||/[^\w\s$*_+~.()'"!\-:@]/g,"")},"").trim().replace(/[-\s]+/g,n.replacement||"-");return n.lower?i.toLowerCase():i}return t.extend=function(t){for(var n in t)e[n]=t[n]},t},e.exports=i(),e.exports.default=i()},function(e,t,n){var i,o,r;r=function(){return function(){return function(e){var t=[];if(e[0].match(/^[^\/:]+:\/*$/)&&e.length>1){var n=e.shift();e[0]=n+e[0]}e[0].match(/^file:\/\/\//)?e[0]=e[0].replace(/^([^\/:]+):\/*/,"$1:///"):e[0]=e[0].replace(/^([^\/:]+):\/*/,"$1://");for(var i=0;i<e.length;i++){var o=e[i];if("string"!=typeof o)throw new TypeError("Url must be a string. Received "+o);""!==o&&(i>0&&(o=o.replace(/^[\/]+/,"")),o=i<e.length-1?o.replace(/[\/]+$/,""):o.replace(/[\/]+$/,"/"),t.push(o))}var r=t.join("/"),s=(r=r.replace(/\/(\?|&|#[^!])/g,"$1")).split("?");return r=s.shift()+(s.length>0?"?":"")+s.join("&")}("object"==typeof arguments[0]?arguments[0]:[].slice.call(arguments))}},e.exports?e.exports=r():void 0===(o="function"==typeof(i=r)?i.call(t,n,t,e):i)||(e.exports=o)}]);