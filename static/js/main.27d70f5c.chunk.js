(this.webpackJsonpkryptokombajn=this.webpackJsonpkryptokombajn||[]).push([[0],{14:function(e,a,t){e.exports=t(39)},19:function(e,a,t){},20:function(e,a,t){},21:function(e,a,t){},39:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(13),o=t.n(c),l=(t(19),t(20),t(3)),s=(t(21),t(2)),i=t.n(s);function m(e){var a=Object(n.useState)([]),t=Object(l.a)(a,2),c=t[0],o=t[1],s=Object(n.useState)(""),m=Object(l.a)(s,2);m[0],m[1];return Object(n.useEffect)((function(){var a=u(e.pairSymbol,"1h"),t=u(e.pairSymbol,"4h"),n=u(e.pairSymbol,"1d");function r(e){var a=parseFloat(e[e.length-1][4]),t=e.map((function(e){return parseFloat(e[2])})).sort(S)[e.length-1],n=e.map((function(e){return parseFloat(e[3])})).sort(S)[0];return 100*(a-n)/(t-n)}i.a.all([a,t,n]).then(i.a.spread((function(){for(var a=arguments.length,t=new Array(a),n=0;n<a;n++)t[n]=arguments[n];var c=t.map((function(e){return r(e.data)}));return{symbol:e.pairSymbol,countedStochs:c}}))).then((function(e){o(e.countedStochs)}))}),[e.pairSymbol]),r.a.createElement("div",{className:"stoch-value-container"},r.a.createElement("span",{className:"pair-symbol"},e.pairSymbol),c.map((function(e){return r.a.createElement("span",{key:10*Math.random(),className:"stoch-value",style:p(e)},e.toFixed(2))})));function u(e,a){return i.a.get("https://api.binance.com/api/v1/klines",{params:{symbol:e,interval:a,limit:14}})}function p(e){return{backgroundColor:e<=20?"rgba(0,255,0,".concat(1-3*e/100,")"):"inherit"}}function S(e,a){return e-a}}var u=function(){var e=["XVSUSDT","WNXMUSDT","WINGUSDT","UNFIUSDT","SUSHIUSDT","SUSDUSDT","SUNUSDT","NBSUSDT","HARDUSDT","FLMUSDT"];return r.a.createElement("div",{className:"App"},r.a.createElement("h2",null,"Stoch index for 1h, 4h, 1d periods"),r.a.createElement("div",{className:"table-container"},r.a.createElement("div",{className:"stoch-value-container header"},r.a.createElement("span",{className:"pair-symbol"},"Pair symbol"),r.a.createElement("span",{className:"stoch-value"},"Stoch 1h"),r.a.createElement("span",{className:"stoch-value"},"Stoch 4h"),r.a.createElement("span",{className:"stoch-value"},"Stoch 1d")),e.map((function(e){return r.a.createElement(m,{key:e,pairSymbol:e})}))))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(u,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.27d70f5c.chunk.js.map