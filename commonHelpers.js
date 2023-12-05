import{S as h,a as y,i as g}from"./assets/vendor-aa7a424a.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const b=document.getElementById("search-form"),c=document.querySelector(".load-more"),u=document.getElementById("gallery");let l=1,a="";const m=new h(".gallery a"),L="https://pixabay.com/api/",w="41042730-e71566aaa26e0b69c1c299757",f=async(r,t,o=40)=>{try{return(await y.get(L,{params:{key:w,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:o}})).data}catch(n){return console.error("Error fetching images:",n),[]}},p=r=>{const t=r.map(o=>`
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
  `).join("");u.insertAdjacentHTML("beforeend",t)},i=r=>{g.info({message:r,theme:"dark",position:"topCenter"})};c.style.display="none";b.addEventListener("submit",async r=>{if(r.preventDefault(),a=r.target.elements.searchQuery.value.trim(),a===""){i("Please enter a search term");return}l=1;const t=await f(a,l);if(t.totalHits===0){i("Sorry, there are no images matching your search query. Please try again."),u.innerHTML="";return}u.innerHTML="",p(t.hits),m.refresh(),i(`Hooray! We found ${t.totalHits} images.`),c.style.display="block"});c.addEventListener("click",async()=>{l++;const r=await f(a,l);if(r.hits.length===0){i("We're sorry, but you've reached the end of search results."),c.style.display="none";return}p(r.hits),m.refresh();const{height:t}=document.querySelector(".photo-card").getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})});
//# sourceMappingURL=commonHelpers.js.map
