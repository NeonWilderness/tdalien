!function(e){var t={};function i(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=2)}([function(e,t,i){},function(e,t,i){var n,s,o;o=function(){return function(){return function(e){var t=[];if(e[0].match(/^[^\/:]+:\/*$/)&&e.length>1){var i=e.shift();e[0]=i+e[0]}e[0].match(/^file:\/\/\//)?e[0]=e[0].replace(/^([^\/:]+):\/*/,"$1:///"):e[0]=e[0].replace(/^([^\/:]+):\/*/,"$1://");for(var n=0;n<e.length;n++){var s=e[n];if("string"!=typeof s)throw new TypeError("Url must be a string. Received "+s);""!==s&&(n>0&&(s=s.replace(/^[\/]+/,"")),s=n<e.length-1?s.replace(/[\/]+$/,""):s.replace(/[\/]+$/,"/"),t.push(s))}var o=t.join("/"),r=(o=o.replace(/\/(\?|&|#[^!])/g,"$1")).split("?");return o=r.shift()+(r.length>0?"?":"")+r.join("&")}("object"==typeof arguments[0]?arguments[0]:[].slice.call(arguments))}},e.exports?e.exports=o():void 0===(s="function"==typeof(n=o)?n.call(t,i,t,e):n)||(e.exports=s)},function(e,t,i){"use strict";i.r(t);i(0);const n=(e,t,i)=>{toastr.error(`Fehler beim ${e} von ${t}: ${i.status} | ${i.statustext}.`)},s=e=>{let t=$(e).find("form");return{secretKey:t.find("[name=secretKey]").val(),action:t.find('[name="action"]').val(),key:t.find('[name="key"]').val(),skinset:t.find('[name="skinset"]').val(),module:t.find('[name="module"]').val(),title:t.find('[name="title"]').val(),description:t.find('[name="description"]').html(),skin:t.find("[name=skin]").val(),save:t.find('[name="save"]').val()}},o=()=>new Promise((e,t)=>{let i=$.get("/layouts/alien/skins/edit?key=Site.implant",function(t){let i=s(t);e(i)}).fail(()=>{n("Lesen(get)","Skin Site.implant",i),t()})}),r=e=>new Promise((t,i)=>{let s=$.post("/layouts/alien/skins/edit?key=Site.implant",e,function(){t()}).fail(()=>{n("Update(post)","Skin Site.implant",s),i()})}),l=()=>new Promise((e,t)=>{let i=$.get("/layouts/alien/skins/edit?key=Site.stories",function(t){let i=s(t),n=JSON.parse(i.skin||"[]");n.forEach(e=>{e.published=new Date(e.published)}),e({params:i,skinStories:n})}).fail(()=>{n("Lesen(get)","Skin Site.stories",i),t()})}),a=e=>new Promise((t,i)=>{let s=$.post("/layouts/alien/skins/edit?key=Site.stories",e,function(){t()}).fail(()=>{n("Update(post)","Skin Site.stories",s),i()})}),c=(e,t,i)=>{i.debug&&console.log("=> Story comparison rss/skin:");let n=e.reduce((e,t)=>(e[t.published.getTime()]=t,e),{});return t.reduce((e,t)=>{let n=t.published.getTime();return e.hasOwnProperty(n)&&((e,t)=>{if(i.debug){let i={title:e.title,comments:e.comments,snippet:e.contentSnippet},n={title:t.title,comments:t.comments,snippet:t.contentSnippet};console.table({rss:i,skin:n})}return e.comments===t.comments&&e.title===t.title&&e.contentSnippet===t.contentSnippet})(e[n],t)&&delete e[n],e},n)},d=(e,t)=>new Promise((i,s)=>{let o=$.get("/stories/main",function(n){let s={};$(n).find(".admin").find(".storyData").each(function(){let[e,i,n]=this.innerText.split("|"),o=new Date(n).getTime().toString();s[o]=i,t.debug&&console.log(`storyData> title: ${e}, pubDate: ${n}(${o}), id: ${i}`)});let o=Object.keys(e).reduce((i,n)=>{let o=e[n],r=o.published.getTime().toString();return t.debug&&console.log(`Searching story: ${o.title}, published: ${o.published} (${r}), found: ${s.hasOwnProperty(r)}`),s.hasOwnProperty(r)&&(o.id=s[r]),i.push(o),i},[]);i(o)}).fail(()=>{n("Lesen(get)","Twoday Beitragsübersicht",o),s()})}),u=(e,t)=>{const i={false:{url:`/stories/${e.id}/edit`,text:"aktualisiert",method:"update"},true:{url:"/stories/create",text:"neu angelegt",method:"create"}},s=!e.hasOwnProperty("id");return new Promise((o,r)=>{let l=$.get(i[s].url,function(a){e.alienLastUpdate=(new Date).toISOString();let c=(e=>{let t=$(e).find("form"),i=t.find('[name="discussions"]');return{secretKey:t.find('[name="secretKey"]').val(),content_title:t.find('[name="content_title"]').val(),modNiceUrls_urlid:t.find('[name="modNiceUrls_urlid"]').val(),content_text:t.find('[name="content_text"]').val(),addToFront:t.find('[name="addToFront"]').val(),checkbox_addToFront:t.find('[name="checkbox_addToFront"]').val(),addToTopic:t.find('[name="addToTopic"]').val(),topic:t.find('[name="topic"]').val(),editableby:t.find('[name="editableby"]').val(),discussions:i.prop("checked")?i.val():null,checkbox_discussions:t.find('[name="checkbox_discussions"]').val(),createtime:t.find('[name="createtime"]').val(),publish:t.find('[name="publish"]').val()}})(a);c.content_title=((e,t,i)=>{return`${i.titlePrefix.replace("$comments",t)}${e||"..."}${i.titlePostfix.replace("$comments",t)}`})(e.title,e.comments,t),c.content_text=(e=>{let t={title:e.title,published:e.published,link:e.link,comments:e.comments,postid:e.postid};return`<p>${e.contentSnippet||"..."}</p>\n<div style="text-align:center"><a target="_blank" href="${e.link}">&raquo; Beitrag</a>&emsp;&emsp;<a target="_blank" href="${e.commentUrl}">&raquo; Kommentare</a></div>\n<div class="alienStatus" style="display:none">${JSON.stringify(t,null,2)}</div>`})(e),c.createtime=(e=>{let t=e.toLocaleString("de-DE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"});return t.substr(0,10).split(".").reverse().join("-")+t.substr(-6)})(e.published),t.allowComments&&null!=c.discussions||delete c.discussions,l=$.post(i[s].url,c,function(){toastr.info(`Beitrag ${e.title} vom ${e.published.toLocaleString()} in Twoday ${i[s].text}.`),o()}).fail(()=>{n(`${i[s].method}(POST)`,`Twoday-Beitrag "${e.title}"`,l),r()})}).fail(()=>{n(`${i[s].method}(GET)`,`Twoday-Beitrag "${e.title}"`,l),r()})})},p=(e,t)=>{var i={};l().then(({params:n,skinStories:s})=>{t.debug&&console.log("readStoriesSkinContent: ",s),i=n;const o=c(e,s,t);return Object.keys(o).length>0?d(o,t):Promise.resolve([])}).then(e=>{if(t.debug&&console.log("finalStories: ",e),e&&e.length){let i=e.map(e=>u(e,t));return Promise.all(i)}return toastr.info("Keine neuen zu synchronisierenden Änderungen gefunden!"),!1}).then(()=>{let t=JSON.stringify(e,null,2);return i.skin!==t?(i.skin=t,a(i)):Promise.resolve()}).then(()=>{toastr.success("Synchronisation erfolgreich abgeschlossen.")}).catch(e=>toastr.error(`Synchronisation endete mit Fehler: ${e}.`))},m=i(1);class h{constructor(){this.defaults={targetUrl:"https://die-netzialisten.de",rssFeedUrl:"feed",titleField:"title",publishedField:"pubDate",commentsField:"comments",counterField:"commentCount",allowComments:!0,pauseChecks:12e4,syncStories:3,targetStory:!0,titlePrefix:"",titlePostfix:" - ✉ $comments",colorAlias:"#13c4a5",colorNavIcon:"#13c4a5",positionToast:"toast-top-full-width",menuOffsetTop:0,menuOffsetRight:0,delayNewRelease:1728e5,debug:!1},this.providerPostIdReg={wordpress:/\?p=([0-9]*)/,nuxtjs:/\/([^\/]+)\/?$/,blogger:/post-([0-9]*)/,tumblr:/post\/([0-9]*)/},this.webtaskUrl="https://wt-061cbc2118e775aa9f3fe9182b7691db-0.sandbox.auth0-extend.com/getrss"}checkNewVersionAvailability(){let e=localStorage.getItem("delayAlienRelease");if(e&&Date.now()<=e)return;let t=this;$.getJSON("https://cdn.jsdelivr.net/gh/NeonWilderness/tdalien@latest/package.json",function(e){t.parseVersion(e.version)>t.options.version&&($("#btnClose, #btnCancel").on("click",function(e){if(e.preventDefault(),$("#newVersion").fadeOut(),"btnClose"===e.target.id){let e=Date.now()+t.options.delayNewRelease;localStorage.setItem("delayAlienRelease",e)}}),$("#btnUpdate").on("click",function(e){e.preventDefault(),$("#msgNewVersion").fadeOut(),$("#msgUpdate").fadeIn().css("display","inline-block")}),$("#btnSaveParams").on("click",function(e){e.preventDefault(),t.saveCurrentParams()}),$("#newVersion").fadeIn(900))})}getFeedsPostIdSelector(e){let t=Object.keys(this.providerPostIdReg),i="",n=0;for(;!i&&n<t.length;){let s=t[n];e.indexOf(s)>=0&&(i=s),n++}return i?this.providerPostIdReg[i]:null}getNewBlogAlias(){let e=this.options.targetUrl.replace("www.","").match(/https?:\/\/(.*?)\./i);return e?e[1]:""}gotoStory(e){$.get(e,function(t){let i=$(t).find(".alienStatus").text();if(i)try{let t=JSON.parse(i);window.location=t.link}catch(t){console.log(`Error parsing alienStatus of "${e}": ${t}.`)}})}implant(e){this.options=Object.assign({},this.defaults,e),this.options.newBlogAlias=this.getNewBlogAlias(),this.options.version=this.parseVersion(document.body.dataset.version),this.options.debug&&console.log(`Alien Options: ${JSON.stringify(this.options,null,2)}`);let t=location.pathname.toLowerCase();if(this.options.targetStory&&/\/stories\//.test(t)){let e=t.split("/"),i=e.slice(0,e.indexOf("stories")+2).join("/");this.gotoStory(i)}this.options.colorAlias=this.options.colorAlias.toLowerCase(),this.options.colorAlias!==this.defaults.colorAlias&&$("#alias").css("color",this.options.colorAlias);let i=$("#showMenu");this.options.colorNavIcon=this.options.colorNavIcon.toLowerCase(),this.options.colorNavIcon!==this.defaults.colorNavIcon&&i.css("color",this.options.colorNavIcon),this.options.menuOffsetTop&&i.css("top",8+this.options.menuOffsetTop),this.options.menuOffsetRight&&i.css("right",25+this.options.menuOffsetRight),$(".alien").each((e,t)=>{switch(t.tagName){case"A":t.href=this.options.targetUrl,this.options.newBlogAlias.length&&(t.innerHTML=t.innerHTML.replace("<% site.alias %>",this.options.newBlogAlias));break;case"IFRAME":t.src=this.options.targetUrl}}),toastr.options={closeButton:!1,newestOnTop:!1,positionClass:this.options.positionToast,progressBar:!0,timeOut:"8000"},$(`.sign${"<% username %>".length>0?"out":"in"}`).show(0).css("display","block"),this.initClickFunctions(),setTimeout(()=>{if(this.isUserAdministrator()){$(".adminOnly").show(0).css("display","block"),this.checkNewVersionAvailability(),this.restoreSavedParams();let e=$("#menuParams");this.options.targetUrl===this.defaults.targetUrl?(e.addClass("highlight"),toastr.warning('<div style="text-align:center">Bitte klicken Sie im Menü auf <b>Parameter/Einstellungen</b>, um <b>Ihren eigenen Blog</b> zu aktivieren!</div>')):(e.removeClass("highlight"),this.maySyncNow()&&this.readAlienRSS())}},2e3)}initClickFunctions(){let e=!1,t=$("#showMenu"),i=t.find("i"),n=()=>{e?document.body.classList.remove("show-menu"):document.body.classList.add("show-menu"),t.attr("title",`Menü ${e?"ein":"aus"}blenden`),i.addClass("fa-spin"),setTimeout(()=>{i.toggleClass("fa-navicon fa-close"),i.removeClass("fa-spin"),this.options.menuOffsetTop&&t.css("top",8+Number(!e)*this.options.menuOffsetTop),this.options.menuOffsetRight&&t.css("right",25+Number(!e)*this.options.menuOffsetRight)},500),e=!e};t.on("click",function(e){n()})}isUserAdministrator(){let e=document.getElementById("loginStatus").innerText.match(/\((.*)\)/);return!!e&&"Administrator"===e[1]}maySyncNow(){if(this.options.syncStories<1)return!1;let e=localStorage.getItem("lastAlienSync"),t=new Date,i=!e||new Date(e).getTime()+this.options.pauseChecks<t.getTime();return i&&localStorage.setItem("lastAlienSync",t),i}parseVersion(e){return parseInt(e.replace(/\./g,""))}readAlienRSS(){let e=this;$.getJSON(`${this.webtaskUrl}?url=${m(this.options.targetUrl,this.options.rssFeedUrl)}`,function(t){if(t.items&&t.items.length>0){let i=e.readStoriesFromRssData(t);e.options.debug&&console.log("Parsed RSS stories: ",i),p(i,e.options)}}).fail(function(e,t,i){console.error(`Webtask getrss error: ${t} | ${i}.`)})}readStoriesFromRssData(e){this.options.debug&&console.log(`Webtask getrss items: ${JSON.stringify(e,null,2)}`);let t=this.getFeedsPostIdSelector(e.generator);return e.items.reduce((i,n)=>{let s="";if(t){let e=(n.guid||n.id).match(t);e&&(s=e[1])}let o=n[this.options.publishedField].split(":");o[o.length-1]="00 "+o[o.length-1].substr(3);let r={postid:s,link:n.link||e.link,contentSnippet:n.contentSnippet.replace(/ Werbeanzeigen/gi,""),title:n[this.options.titleField]||"...",published:new Date(o.join(":")),commentUrl:n[this.options.commentsField]||`${n.link}#comments`,comments:n[this.options.counterField]||0};return i.push(r),i},[]).sort((e,t)=>t.published.getTime()-e.published.getTime()).slice(0,this.options.syncStories)}restoreSavedParams(){let e=localStorage.getItem("savedAlienVersion"),t=localStorage.getItem("savedAlienSkinStories"),i=localStorage.getItem("savedAlienSkinParams");e&&t&&i&&(this.parseVersion(document.body.dataset.version)<=this.parseVersion(e)||l().then(({params:e})=>(e.skin=t,a(e))).then(()=>o()).then(e=>(e.skin=i,r(e))).then(()=>{localStorage.removeItem("savedAlienVersion"),toastr.success("Ihre Parameter und Einstellungen wurden erfolgreich wiederhergestellt!"),toastr.info('Bitte laden Sie nun die Seite neu per "Hard-Reload" (Windows: Strg-F5, Mac: Cmd-R).')}).catch(e=>toastr.error(`Die Wiederherstellung der Parameter/Einstellungen endete mit Fehler: ${e}.`)))}saveCurrentParams(){l().then(({skinStories:e})=>(localStorage.setItem("savedAlienSkinStories",JSON.stringify(e)),o())).then(e=>{localStorage.setItem("savedAlienSkinParams",e.skin),localStorage.setItem("savedAlienVersion",document.body.dataset.version),toastr.success("Ihre Parameter und Einstellungen wurden erfolgreich gesichert!")}).catch(e=>toastr.error(`Die Sicherung der Parameter/Einstellungen endete mit Fehler: ${e}.`))}}jQuery.fn.alien=function(){let e=new h;return{implant:e.implant.bind(e)}}}]);