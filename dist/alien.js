!function(e){var t={};function n(i){if(t[i])return t[i].exports;var s=t[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(i,s,function(t){return e[t]}.bind(null,s));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){},function(e,t,n){var i,s,o;o=function(){return function(){return function(e){var t=[];if(e[0].match(/^[^\/:]+:\/*$/)&&e.length>1){var n=e.shift();e[0]=n+e[0]}e[0].match(/^file:\/\/\//)?e[0]=e[0].replace(/^([^\/:]+):\/*/,"$1:///"):e[0]=e[0].replace(/^([^\/:]+):\/*/,"$1://");for(var i=0;i<e.length;i++){var s=e[i];if("string"!=typeof s)throw new TypeError("Url must be a string. Received "+s);""!==s&&(i>0&&(s=s.replace(/^[\/]+/,"")),s=i<e.length-1?s.replace(/[\/]+$/,""):s.replace(/[\/]+$/,"/"),t.push(s))}var o=t.join("/"),r=(o=o.replace(/\/(\?|&|#[^!])/g,"$1")).split("?");return o=r.shift()+(r.length>0?"?":"")+r.join("&")}("object"==typeof arguments[0]?arguments[0]:[].slice.call(arguments))}},e.exports?e.exports=o():void 0===(s="function"==typeof(i=o)?i.call(t,n,t,e):i)||(e.exports=s)},function(e,t,n){"use strict";n.r(t);n(0);const i=(e,t,n)=>{toastr.error(`Fehler beim ${e} von ${t}: ${n.status} | ${n.statustext}.`)},s=e=>{let t=$(e).find("form");return{secretKey:t.find("[name=secretKey]").val(),action:t.find('[name="action"]').val(),key:t.find('[name="key"]').val(),skinset:t.find('[name="skinset"]').val(),module:t.find('[name="module"]').val(),title:t.find('[name="title"]').val(),description:t.find('[name="description"]').html(),skin:t.find("[name=skin]").val(),save:t.find('[name="save"]').val()}},o=()=>new Promise((e,t)=>{let n=$.get("/layouts/alien/skins/edit?key=Site.implant",function(t){let n=s(t);e(n)}).fail(()=>{i("Lesen(get)","Skin Site.implant",n),t()})}),r=e=>new Promise((t,n)=>{let s=$.post("/layouts/alien/skins/edit?key=Site.implant",e,function(){t()}).fail(()=>{i("Update(post)","Skin Site.implant",s),n()})}),l=()=>new Promise((e,t)=>{let n=$.get("/layouts/alien/skins/edit?key=Site.stories",function(t){let n=s(t),i=JSON.parse(n.skin||"[]");i.forEach(e=>{e.published=new Date(e.published)}),e({params:n,skinStories:i})}).fail(()=>{i("Lesen(get)","Skin Site.stories",n),t()})}),a=e=>new Promise((t,n)=>{let s=$.post("/layouts/alien/skins/edit?key=Site.stories",e,function(){t()}).fail(()=>{i("Update(post)","Skin Site.stories",s),n()})}),c=(e,t,n)=>{n.debug&&console.log("=> Story comparison rss/skin:");let i=e.reduce((e,t)=>(e[u(t.published)]=t,e),{});return t.reduce((e,t)=>{let i=u(t.published);return e.hasOwnProperty(i)&&((e,t)=>{if(n.debug){let n={title:e.title,comments:e.comments,snippet:e.contentSnippet},i={title:t.title,comments:t.comments,snippet:t.contentSnippet};console.table({rss:n,skin:i})}return e.comments===t.comments&&e.title===t.title&&e.contentSnippet===t.contentSnippet})(e[i],t)&&delete e[i],e},i)},d=(e,t)=>new Promise((n,s)=>{let o=$.get("/stories/main",function(i){let s={};$(i).find(".admin").find(".storyData").each(function(){let[e,n,i]=this.innerText.split("|");i=i.trim(),s[i]=n,t.debug&&console.log(`storyData> title: ${e}, pubDate: ${i}, id: ${n}`)});let o=Object.keys(e).reduce((n,i)=>{let o=e[i];return t.debug&&console.log(`Searching story: ${o.title}, published: ${i}, found: ${s.hasOwnProperty(i)}`),s.hasOwnProperty(i)&&(o.id=s[i]),n.push(o),n},[]);n(o)}).fail(()=>{i("Lesen(get)","Twoday Beitragsübersicht",o),s()})}),u=e=>{let t=e.toLocaleString("de-DE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"});return t.substr(0,10).split(".").reverse().join("-")+t.slice(-6)},p=(e,t)=>{const n={false:{url:`/stories/${e.id}/edit`,text:"aktualisiert",method:"update"},true:{url:"/stories/create",text:"neu angelegt",method:"create"}},s=!e.hasOwnProperty("id");return new Promise((o,r)=>{let l=$.get(n[s].url,function(a){e.alienLastUpdate=(new Date).toISOString();let c=(e=>{let t=$(e).find("form"),n=t.find('[name="discussions"]');return{secretKey:t.find('[name="secretKey"]').val(),content_title:t.find('[name="content_title"]').val(),modNiceUrls_urlid:t.find('[name="modNiceUrls_urlid"]').val(),content_text:t.find('[name="content_text"]').val(),addToFront:t.find('[name="addToFront"]').val(),checkbox_addToFront:t.find('[name="checkbox_addToFront"]').val(),addToTopic:t.find('[name="addToTopic"]').val(),topic:t.find('[name="topic"]').val(),editableby:t.find('[name="editableby"]').val(),discussions:n.prop("checked")?n.val():null,checkbox_discussions:t.find('[name="checkbox_discussions"]').val(),createtime:t.find('[name="createtime"]').val(),publish:t.find('[name="publish"]').val()}})(a);c.content_title=((e,t,n)=>{return`${n.titlePrefix.replace("$comments",t)}${e||"..."}${n.titlePostfix.replace("$comments",t)}`})(e.title,e.comments,t),c.content_text=(e=>{let t={title:e.title,published:e.published,link:e.link,comments:e.comments,postid:e.postid};return`<p>${e.contentSnippet||"..."}</p>\n<div style="text-align:center"><a target="_blank" href="${e.link}">&raquo; Beitrag</a>&emsp;&emsp;<a target="_blank" href="${e.commentUrl}">&raquo; Kommentare</a></div>\n<div class="alienStatus" style="display:none">${JSON.stringify(t,null,2)}</div>`})(e),c.createtime=u(e.published),t.allowComments&&null!=c.discussions||delete c.discussions,l=$.post(n[s].url,c,function(){toastr.info(`Beitrag ${e.title} vom ${e.published.toLocaleString()} in Twoday ${n[s].text}.`),o()}).fail(()=>{i(`${n[s].method}(POST)`,`Twoday-Beitrag "${e.title}"`,l),r()})}).fail(()=>{i(`${n[s].method}(GET)`,`Twoday-Beitrag "${e.title}"`,l),r()})})},m=(e,t)=>{var n={};l().then(({params:i,skinStories:s})=>{t.debug&&console.log("readStoriesSkinContent: ",s),n=i;const o=c(e,s,t);return Object.keys(o).length>0?d(o,t):Promise.resolve([])}).then(e=>{if(t.debug&&console.log("finalStories: ",e),e&&e.length){let n=e.map((e,n)=>(e=>new Promise(t=>setTimeout(t,e)))(n*t.delayBetweenUpdates).then(()=>p(e,t)));return Promise.all(n)}return toastr.info("Keine neuen zu synchronisierenden Änderungen gefunden!"),!1}).then(()=>{let t=JSON.stringify(e,null,2);return n.skin!==t?(n.skin=t,a(n)):Promise.resolve()}).then(()=>{toastr.success("Synchronisation erfolgreich abgeschlossen.")}).catch(e=>toastr.error(`Synchronisation endete mit Fehler: ${e}.`))},h=n(1);class f{constructor(){this.defaults={targetUrl:"https://die-netzialisten.de",rssFeedUrl:"feed",titleField:"title",publishedField:"pubDate",commentsField:"comments",counterField:"commentCount",allowComments:!0,pauseChecks:12e4,syncStories:3,targetStory:!0,titlePrefix:"",titlePostfix:" - ✉ $comments",colorAlias:"#13c4a5",colorNavIcon:"#13c4a5",positionToast:"toast-top-full-width",menuOffsetTop:0,menuOffsetRight:0,delayNewRelease:1728e5,delayBetweenUpdates:200,debug:!1},this.providerPostIdReg={wordpress:/\?p=([0-9]*)/,nuxtjs:/\/([^\/]+)\/?$/,blogger:/post-([0-9]*)/,tumblr:/post\/([0-9]*)/},this.webtaskUrl="https://wt-061cbc2118e775aa9f3fe9182b7691db-0.sandbox.auth0-extend.com/getrss"}checkNewVersionAvailability(){let e=localStorage.getItem("delayAlienRelease");if(e&&Date.now()<=e)return;let t=this;$.getJSON("https://cdn.jsdelivr.net/gh/NeonWilderness/tdalien@latest/package.json",function(e){t.parseVersion(e.version)>t.options.version&&($("#btnClose, #btnCancel").on("click",function(e){if(e.preventDefault(),$("#newVersion").fadeOut(),"btnClose"===e.target.id){let e=Date.now()+t.options.delayNewRelease;localStorage.setItem("delayAlienRelease",e)}}),$("#btnUpdate").on("click",function(e){e.preventDefault(),$("#msgNewVersion").fadeOut(),$("#msgUpdate").fadeIn().css("display","inline-block")}),$("#btnSaveParams").on("click",function(e){e.preventDefault(),t.saveCurrentParams()}),$("#newVersion").fadeIn(900))})}getFeedsPostIdSelector(e){let t=Object.keys(this.providerPostIdReg),n="",i=0;for(;!n&&i<t.length;){let s=t[i];e.indexOf(s)>=0&&(n=s),i++}return n?this.providerPostIdReg[n]:null}getNewBlogAlias(){let e=this.options.targetUrl.replace("www.","").match(/https?:\/\/(.*?)\./i);return e?e[1]:""}implant(e){this.options=Object.assign({},this.defaults,e),this.options.newBlogAlias=this.getNewBlogAlias(),this.options.version=this.parseVersion(document.body.dataset.version),this.options.debug&&console.log(`Alien Options: ${JSON.stringify(this.options,null,2)}`),this.options.colorAlias=this.options.colorAlias.toLowerCase(),this.options.colorAlias!==this.defaults.colorAlias&&$("#alias").css("color",this.options.colorAlias);let t=$("#showMenu");this.options.colorNavIcon=this.options.colorNavIcon.toLowerCase(),this.options.colorNavIcon!==this.defaults.colorNavIcon&&t.css("color",this.options.colorNavIcon),this.options.menuOffsetTop&&t.css("top",8+this.options.menuOffsetTop),this.options.menuOffsetRight&&t.css("right",25+this.options.menuOffsetRight);let n=this.options.targetUrl;if(this.options.targetStory){let e=$(".alienStatus").text();if(e)try{let t=JSON.parse(e);t.link&&(n=t.link)}catch(e){}}this.options.debug&&console.log(`Using iframe url: ${n}.`),$(".alien").each((e,t)=>{switch(t.tagName){case"A":t.href=this.options.targetUrl,this.options.newBlogAlias.length&&(t.innerHTML=t.innerHTML.replace("<% site.alias %>",this.options.newBlogAlias));break;case"IFRAME":t.src=n}}),toastr.options={closeButton:!1,newestOnTop:!1,positionClass:this.options.positionToast,progressBar:!0,timeOut:"8000"},$(`.sign${"<% username %>".length>0?"out":"in"}`).show(0).css("display","block"),this.initClickFunctions(),setTimeout(()=>{if(this.isUserAdministrator()){$(".adminOnly").show(0).css("display","block"),this.checkNewVersionAvailability(),this.restoreSavedParams();let e=$("#menuParams");this.options.targetUrl===this.defaults.targetUrl?(e.addClass("highlight"),toastr.warning('<div style="text-align:center">Bitte klicken Sie im Menü auf <b>Parameter/Einstellungen</b>, um <b>Ihren eigenen Blog</b> zu aktivieren!</div>')):(e.removeClass("highlight"),this.maySyncNow()&&this.readAlienRSS())}},2e3)}initClickFunctions(){let e=!1,t=$("#showMenu"),n=t.find("i"),i=()=>{e?document.body.classList.remove("show-menu"):document.body.classList.add("show-menu"),t.attr("title",`Menü ${e?"ein":"aus"}blenden`),n.addClass("fa-spin"),setTimeout(()=>{n.toggleClass("fa-navicon fa-close"),n.removeClass("fa-spin"),this.options.menuOffsetTop&&t.css("top",8+Number(!e)*this.options.menuOffsetTop),this.options.menuOffsetRight&&t.css("right",25+Number(!e)*this.options.menuOffsetRight)},500),e=!e};t.on("click",function(e){i()})}isUserAdministrator(){let e=document.getElementById("loginStatus").innerText.match(/\((.*)\)/);return!!e&&"Administrator"===e[1]}maySyncNow(){if(this.options.syncStories<1)return!1;let e=localStorage.getItem("lastAlienSync"),t=new Date,n=!e||new Date(e).getTime()+this.options.pauseChecks<t.getTime();return n&&localStorage.setItem("lastAlienSync",t),n}parseVersion(e){return parseInt(e.replace(/\./g,""))}readAlienRSS(){let e=this;$.getJSON(`${this.webtaskUrl}?url=${h(this.options.targetUrl,this.options.rssFeedUrl)}`,function(t){if(t.items&&t.items.length>0){let n=e.readStoriesFromRssData(t);e.options.debug&&console.log("Parsed RSS stories: ",n),m(n,e.options)}}).fail(function(e,t,n){console.error(`Webtask getrss error: ${t} | ${n}.`)})}readStoriesFromRssData(e){this.options.debug&&console.log(`Webtask getrss items: ${JSON.stringify(e,null,2)}`);let t=this.getFeedsPostIdSelector(e.generator);return e.items.reduce((n,i)=>{let s="";if(t){let e=(i.guid||i.id).match(t);e&&(s=e[1])}!s&&i.postid&&i.postid._&&(s=i.postid._);let o=i[this.options.publishedField].split(":");o[o.length-1]="00 "+o[o.length-1].substr(3);let r={postid:s,link:i.link||e.link,contentSnippet:i.contentSnippet.replace(/ Werbeanzeigen/gi,""),title:i[this.options.titleField]||"...",published:new Date(o.join(":")),commentUrl:i[this.options.commentsField]||`${i.link}#comments`,comments:i[this.options.counterField]||0};return n.push(r),n},[]).sort((e,t)=>t.published.getTime()-e.published.getTime()).slice(0,this.options.syncStories)}restoreSavedParams(){let e=localStorage.getItem("savedAlienVersion"),t=localStorage.getItem("savedAlienSkinStories"),n=localStorage.getItem("savedAlienSkinParams");e&&t&&n&&(this.parseVersion(document.body.dataset.version)<=this.parseVersion(e)||l().then(({params:e})=>(e.skin=t,a(e))).then(()=>o()).then(e=>(e.skin=n,r(e))).then(()=>{localStorage.removeItem("savedAlienVersion"),toastr.success("Ihre Parameter und Einstellungen wurden erfolgreich wiederhergestellt!"),toastr.info('Bitte laden Sie nun die Seite neu per "Hard-Reload" (Windows: Strg-F5, Mac: Cmd-R).')}).catch(e=>toastr.error(`Die Wiederherstellung der Parameter/Einstellungen endete mit Fehler: ${e}.`)))}saveCurrentParams(){l().then(({skinStories:e})=>(localStorage.setItem("savedAlienSkinStories",JSON.stringify(e)),o())).then(e=>{localStorage.setItem("savedAlienSkinParams",e.skin),localStorage.setItem("savedAlienVersion",document.body.dataset.version),toastr.success("Ihre Parameter und Einstellungen wurden erfolgreich gesichert!")}).catch(e=>toastr.error(`Die Sicherung der Parameter/Einstellungen endete mit Fehler: ${e}.`))}}jQuery.fn.alien=function(){let e=new f;return{implant:e.implant.bind(e)}}}]);