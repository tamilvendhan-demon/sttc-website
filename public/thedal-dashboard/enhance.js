(()=>{
'use strict';
const src='https://raw.githubusercontent.com/tamilvendhan-demon/sttc-website/173a98f2381e7b80af70bff64f409b3a0b25b8cf/public/thedal-dashboard/enhance.js';
fetch(src,{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('feature engine load failed');return r.text()}).then(code=>{(0,eval)(code)}).catch(err=>{console.error('Thedal feature engine:',err);const x=document.createElement('div');x.style='position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;padding:12px 16px;background:#112d4e;color:#fff;border-radius:10px;font:13px Arial';x.textContent='Thedal features could not load. Please refresh.';document.body.appendChild(x)})
})();