import sharp from 'sharp';

// Select the ceramic within a generous silhouette, retain its largest connected
// region, and fill only small holes (printed letters), leaving the handle open.
export async function refineMugMask(data, w, h) {
const n=w*h;
const svg=`<svg width="${w}" height="${h}" viewBox="0 0 500 707"><path fill="white" d="M105 300C105 275 209 205 260 204C275 203 282 230 284 238C322 220 360 253 384 296C406 337 402 369 369 383L380 398C380 416 232 487 210 483Z"/></svg>`;
const envelope=await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer();let candidate=new Uint8Array(n);for(let i=0;i<n;i++){let r=data[4*i],g=data[4*i+1],b=data[4*i+2];candidate[i]=envelope[4*i+3]&&b+10>=r&&b+15>=g&&r+g+b>150?255:0}
candidate=await sharp(candidate,{raw:{width:w,height:h,channels:1}}).median(3).toColourspace('b-w').raw().toBuffer();
const q=new Int32Array(n),seen=new Uint8Array(n);let largest=[];
function component(seed,value){let head=0,tail=0;q[tail++]=seed;seen[seed]=1;while(head<tail){const i=q[head++],x=i%w;for(const j of [x?i-1:-1,x<w-1?i+1:-1,i-w,i+w])if(j>=0&&j<n&&!seen[j]&&(candidate[j]>127)===value){seen[j]=1;q[tail++]=j}}return Array.from(q.subarray(0,tail))}
for(let i=0;i<n;i++)if(!seen[i]&&candidate[i]>127){const c=component(i,true);if(c.length>largest.length)largest=c}
candidate.fill(0);for(const i of largest)candidate[i]=255;seen.fill(0);
for(let i=0;i<n;i++)if(!seen[i]&&!candidate[i]){const c=component(i,false);if(c.length<6000)for(const j of c)candidate[j]=255}
const alpha=await sharp(candidate,{raw:{width:w,height:h,channels:1}}).blur(.4).toColourspace('b-w').raw().toBuffer();for(let i=0;i<n;i++)data[i*4+3]=alpha[i];

return data;
}
