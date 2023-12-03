import{a as p,S as h,i as y}from"./assets/vendor-add33973.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();const g=document.getElementById("search-form"),c=document.querySelector(".load-more"),u=document.getElementById("gallery");let l=1,a="";const b="https://pixabay.com/api/",L="41042730-e71566aaa26e0b69c1c299757",m=async(r,t,n=20)=>{try{return(await p.get(b,{params:{key:L,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:n}})).data}catch(o){return console.error("Error fetching images:",o),[]}},f=r=>{const t=r.map(o=>`
    <div class="photo-card">
      <a href="${o.largeImageURL}" data-lightbox="image">
        <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${o.likes}</p>
        <p class="info-item"><b>Views:</b> ${o.views}</p>
        <p class="info-item"><b>Comments:</b> ${o.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${o.downloads}</p>
      </div>
    </div>
  `).join("");u.insertAdjacentHTML("beforeend",t),new h(".gallery a").refresh()},i=r=>{y.info({message:r,theme:"dark",position:"topCenter"})};c.style.display="none";g.addEventListener("submit",async r=>{if(r.preventDefault(),a=r.target.elements.searchQuery.value.trim(),a===""){i("Please enter a search term");return}l=1;const t=await m(a,l);if(t.totalHits===0){i("Sorry, there are no images matching your search query. Please try again."),u.innerHTML="";return}u.innerHTML="",f(t.hits),i(`Hooray! We found ${t.totalHits} images.`),c.style.display="block"});c.addEventListener("click",async()=>{l++;const r=await m(a,l);if(r.hits.length===0){i("We're sorry, but you've reached the end of search results."),c.style.display="none";return}f(r.hits);const{height:t}=document.querySelector(".photo-card").getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})});
//# sourceMappingURL=commonHelpers.js.map
