(()=>{"use strict";const e=35.6895,t=139.69171,s=`${e.toFixed(5)}, 139.69171`,a="Ошибка загрузки данных с сервера!",r=["gif","jpg","jpeg","png"],o={flat:1e3,bungalow:0,house:5e3,palace:1e4,hotel:3e3},n={lat:e,lng:t},c=document.querySelector(".success"),i=document.querySelector(".error"),l=document.querySelector(".error-data"),p=e=>{e.classList.add("hidden")},u=e=>{const t=(s=()=>{p(e)},e=>{e.preventDefault(),s()});var s;const a=t=>{(e=>"Escape"===e.key||"Esc"===e.key)(t)&&(t.preventDefault(),p(e))};e.classList.remove("hidden"),document.addEventListener("keydown",a,!0),e.addEventListener("click",t,!0),setTimeout((()=>{document.removeEventListener("keydown",a,!0),e.removeEventListener("click",t,!0)}),5e3)},d=document.querySelector(".ad-form"),m=document.querySelector(".map__filters"),h=[...d.children],y=[...m.children],v=d.querySelector("#address"),f=d.querySelector(".ad-form-header__preview img"),g=d.querySelector(".ad-form__photo"),_=d.querySelector("#avatar"),b=d.querySelector("#images"),w=d.querySelector("#type"),k=d.querySelector("#price"),$=d.querySelector("#timein"),E=d.querySelector("#timeout"),S=d.querySelector("#title"),q=d.querySelector("#room_number"),x=d.querySelector("#capacity"),F=d.querySelector(".ad-form__reset"),T=(e,t,s)=>{e.forEach((e=>e.disabled=s)),s?t.classList.add(`${t.className}--disabled`):t.classList.remove(`${t.classList[1]}`)},j=(e=>{let t=[];return s=>{t.forEach((e=>{e.disabled=!1}));const a=e.findIndex((e=>e.value===s)),r=-1!==a?e.slice(a+1):e.slice(0,e.length-1);r.forEach((e=>{e.disabled=!0})),t=[...r]}})([...x]);j(q.value);const D=()=>{const e=S.value.length;e<30?S.setCustomValidity(`Ещё ${30-e} симв.`):e>100?S.setCustomValidity(`Удалите лишние ${e-100} симв.`):S.setCustomValidity(""),S.reportValidity()},V=e=>{const t=e.target,s=t.value;switch(t){case w:(e=>{const t=o[e];k.min=t,k.placeholder=t})(s);break;case $:case E:(e=>{E.value=e,$.value=e})(s);break;case q:(e=>{x.value=100==+e?0:e,j(e)})(s);break;case _:(()=>{const e=_.files[0],t=e.name;if(B(t)){const t=new FileReader;t.addEventListener("load",(()=>{f.src=t.result})),t.readAsDataURL(e)}})();break;case b:(()=>{const e=b.files[0],t=e.name;if(B(t)){const t=new FileReader;t.addEventListener("load",(()=>{const e=t.result;g.insertAdjacentHTML("beforeend",`<img src="${e}" alt="Фотография жилья" width="100%" height="100%">`)})),t.readAsDataURL(e)}})()}},A=e=>{e.preventDefault(),W()},R=e=>{e.preventDefault(),Q((()=>J(c)),(()=>J(i)),new FormData(e.target))};d.addEventListener("focus",(()=>{d.addEventListener("change",V),d.addEventListener("submit",R),S.addEventListener("input",D),F.addEventListener("click",A)}),!0),d.addEventListener("blur",(()=>{d.removeEventListener("change",V,!0),d.removeEventListener("submit",R,!0),S.removeEventListener("input",D,!0),F.removeEventListener("click",A,!0)}));const C=(e,t)=>{const s=(e,t,s)=>"any"===s?e:e.filter((e=>e[t]===+s)),a={result:[],byType(e){return this.result=((e,t,s)=>"any"===s?e:e.filter((e=>e.type===s)))(this.result,0,e),this},byPrice(e){return this.result=((e,t,s)=>"any"===s?e:e.filter((e=>{switch(s){case"low":return+e.price<1e4;case"high":return+e.price>5e4;case"middle":return+e.price<=5e4&&+e.price>=1e4}})))(this.result,0,e),this},byRooms(e){return this.result=s(this.result,"rooms",e),this},byGuests(e){return this.result=s(this.result,"guests",e),this},byFeatures(){return this.result=((e,t)=>{const s=[...m.querySelectorAll('input[type="checkbox"]:checked')],a=s.map((e=>e.value));return 0===s.length?e:e.filter((e=>e.features.some((e=>a.some((t=>t===e))))))})(this.result),this}};m.addEventListener("change",function(e,t=500){let s;return(...a)=>{clearTimeout(s),s=setTimeout((()=>e.apply(this,a)),t)}}((()=>{let s=[...t];const r={type:"any",price:"any",rooms:"any",guests:"any"};return t=>{const{param:o,value:n}=(e=>{const t=e.target;return{param:t.name.replace(/housing-/,""),value:t.value}})(t);M(s),a.result=[...e],r[o]=n,a.byType(r.type).byPrice(r.price).byRooms(r.rooms).byGuests(r.guests).byFeatures(),s=I(a.result),G(s)}})(),500),!0)};T(h,d,!0),T(y,m,!0);const O=L.map("map-canvas").on("load",(()=>{T(h,d,!1),T(y,m,!1),v.value=s})).setView(n,13);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>'}).addTo(O);const P=L.icon({iconUrl:"./img/main-pin.svg",iconSize:[52,52],iconAnchor:[26,52]}),U=L.marker(n,{draggable:!0,icon:P}),z=L.icon({iconUrl:"./img/pin.svg",iconSize:[40,40],iconAnchor:[20,40]});U.addTo(O),U.on("move",(e=>{const t=e.target.getLatLng();v.value=`${t.lat.toFixed(5)}, ${t.lng.toFixed(5)}`}));const I=e=>e.map((e=>L.marker({lat:e.lat,lng:e.lng},{icon:z}).bindPopup((e=>{const{avatar:t,title:s,description:a,price:r,type:o,address:n,photos:c,features:i,capacity:l,time:p}=e;return`<article class="popup">\n      <img src="${t}" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">\n      <h3 class="popup__title">${s}</h3>\n      <p class="popup__text popup__text--address">${n}</p>\n      <p class="popup__text popup__text--price">${r} <span>₽/ночь</span></p>\n      <h4 class="popup__type">${o}</h4>\n      <p class="popup__text popup__text--capacity">${l}</p>\n      <p class="popup__text popup__text--time">${p}</p>\n      <ul class="popup__features">\n        ${i?i.map((e=>`<li class="popup__feature popup__feature--${e}"></li>`)).join(""):""}\n      </ul>\n      <p class="popup__description">${a}</p>\n      <div class="popup__photos">\n        ${c?c.map((e=>`<img src="${e}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`)).join(""):""}\n      </div>\n    </article>`})(e),{keepInView:!0}))),G=e=>e.slice(0,10).forEach((e=>e.addTo(O))),M=e=>e.forEach((e=>e.remove())),H=()=>{O.setView(n,13);const s=new L.LatLng(e,t);U.setLatLng(s),K((e=>{const t=I(e);G(t),C(e,t)}),(()=>{u(l),T(y,m,!0)}))},N=(e,t)=>{let s;switch(t){case 1:s=`${t} комната - `;break;case 2:case 3:case 4:s=`${t} комнаты - `;break;case 100:s=`${t} комнат не для гостей.`;break;default:s=`${t} комнат - `}return"number"==typeof e?s+`для ${e} гост${1===e?"я":"ей"}.`:s},W=()=>{d.reset(),m.reset(),v.value=s,f.src="img/muffin-grey.svg",g.textContent="",H()},B=e=>(e.toLowerCase(),r.some((t=>e.endsWith(t)))),J=e=>{e===c?(u(e),W(),H()):u(e),setTimeout((()=>{p(e)}),5e3)},K=async(e,t)=>{try{const s=await fetch("https://23.javascript.pages.academy/keksobooking/data"),r=s.ok?await s.json():await t(a);e(await(e=>e.map((e=>{const{author:t,offer:s,location:a,extended:r}=e;return void 0===s.features&&(s.features=[]),Object.assign({},t,s,a,r)})))(r.map((e=>(e=>Object.assign({},e,{extended:{capacity:N(e.offer.guests,e.offer.rooms),time:`Заезд после ${e.offer.checkin}, выезд до ${e.offer.checkout}`}}))(e)))))}catch(e){t(a)}},Q=async(e,t,s)=>{try{(await fetch("https://23.javascript.pages.academy/keksobooking",{method:"POST",body:s})).ok?await e():await t(a)}catch(e){t("Не удалось отправить форму. Попробуйте ещё раз.")}};K((e=>{const t=I(e);G(t),C(e,t)}),(()=>{u(l),T(y,m,!0)}))})();
//# sourceMappingURL=main.bundle.js.map