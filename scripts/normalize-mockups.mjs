import sharp from 'sharp';
import fs from 'node:fs/promises';
const dir='public/images/mockups';
const originals=(await fs.readdir(dir)).filter(f=>f.endsWith('-cutout.webp'));
const newer=['tuff-cat-tee','delulu-hoodie','capybara-life-tee','daily-dose-of-memes-tee','error-404-mug'];
await fs.mkdir(`${dir}/normalized`,{recursive:true});
for(const name of [...originals,...newer.map(n=>n+'.webp')]){
 let {data,info}=await sharp(`${dir}/${name}`).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 const {width:w,height:h}=info;
 if(!name.endsWith('-cutout.webp')&&name!=='error-404-mug.webp'){
  const outside=new Uint8Array(w*h),q=new Int32Array(w*h);let head=0,tail=0;
  const dark=name==='capybara-life-tee.webp';
  const visit=i=>{if(outside[i])return;let r=data[i*4],g=data[i*4+1],b=data[i*4+2];if(dark?Math.max(r,g,b)<38:Math.min(r,g,b)>220){outside[i]=1;q[tail++]=i;}};
  for(let x=0;x<w;x++){visit(x);visit((h-1)*w+x)}for(let y=0;y<h;y++){visit(y*w);visit(y*w+w-1)}
  while(head<tail){let i=q[head++],x=i%w,y=Math.floor(i/w);if(x)visit(i-1);if(x<w-1)visit(i+1);if(y)visit(i-w);if(y<h-1)visit(i+w)}
  for(let i=0;i<w*h;i++)if(outside[i])data[i*4+3]=0;
 }
 if(name==='error-404-mug.webp'){
  // Trace the silhouette and handle opening; retain the photographed print.
  const svg=`<svg width="${w}" height="${h}" viewBox="0 0 500 707"><path fill="white" fill-rule="evenodd" d="M114 299 C111 281 208 218 255 211 C264 210 271 221 283 245 C319 227 349 253 372 288 C398 325 401 357 374 371 L360 377 L371 394 C375 406 233 480 217 476 Z M293 266 L350 356 C370 355 379 342 369 320 C354 288 330 253 293 266 Z"/></svg>`;
  const mask=await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer();for(let i=0;i<w*h;i++)data[i*4+3]=mask[i*4+3];
 }
 if(name==='capybara-life-tee.webp'){const seen=new Uint8Array(w*h),queue=new Int32Array(w*h);let largest=[];for(let seed=0;seed<w*h;seed++){if(seen[seed]||data[seed*4+3]<10)continue;let head=0,tail=0;queue[tail++]=seed;seen[seed]=1;while(head<tail){let i=queue[head++],x=i%w;for(const j of [x?i-1:-1,x<w-1?i+1:-1,i-w,i+w])if(j>=0&&j<w*h&&!seen[j]&&data[j*4+3]>10){seen[j]=1;queue[tail++]=j}}if(tail>largest.length)largest=Array.from(queue.subarray(0,tail))}const keep=new Uint8Array(w*h);for(const i of largest)keep[i]=1;for(let i=0;i<w*h;i++)if(!keep[i])data[i*4+3]=0;}
 let left=w,top=h,right=0,bottom=0;for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(data[(y*w+x)*4+3]>10){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y)}
 const subject=await sharp(data,{raw:{width:w,height:h,channels:4}}).extract({left,top,width:right-left+1,height:bottom-top+1}).resize(820,820,{fit:'inside'}).png().toBuffer();
 const m=await sharp(subject).metadata();
 await sharp({create:{width:1000,height:1000,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite([{input:subject,left:Math.round((1000-m.width)/2),top:Math.round((1000-m.height)/2)}]).webp({lossless:true}).toFile(`${dir}/normalized/${name}`);
 console.log(name);
}
