import sharp from 'sharp';
import fs from 'node:fs/promises';
const directory = 'public/images/mockups';
const { data, info } = await sharp(`${directory}/67 Tee.png`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const n = width * height;
const black = new Uint8Array(n), outside = new Uint8Array(n), queue = new Int32Array(n);
for (let i=0;i<n;i++) black[i] = data[i*4] < 15 && data[i*4+1] < 15 && data[i*4+2] < 15 ? 1 : 0;
let head=0,tail=0;
function visit(i) { if (!outside[i] && !black[i]) { outside[i]=1;queue[tail++]=i; } }
for(let x=0;x<width;x++){visit(x);visit((height-1)*width+x);}
for(let y=0;y<height;y++){visit(y*width);visit(y*width+width-1);}
while(head<tail){const i=queue[head++],x=i%width,y=Math.floor(i/width);if(x)visit(i-1);if(x<width-1)visit(i+1);if(y)visit(i-width);if(y<height-1)visit(i+width);}
// All six exports use the same shirt silhouette. Fill enclosed artwork areas;
// only remove pixels connected to the exterior, never pixels inside the shirt.
const files=(await fs.readdir(directory)).filter(f=>f.endsWith('.png'));
for(const file of files){
 const input=await sharp(`${directory}/${file}`).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 if(input.info.width!==width||input.info.height!==height)throw Error(`Unexpected dimensions: ${file}`);
 for(let i=0;i<n;i++)if(outside[i])input.data[i*4+3]=0;
 const out=`${directory}/${file.replace(/\.png$/, '-cutout.webp')}`;
 await sharp(input.data,{raw:{width,height,channels:4}}).webp({lossless:true}).toFile(out);
 const verify=await sharp(out).ensureAlpha().raw().toBuffer();
 for(let i=0;i<n;i++)if(!outside[i])for(let c=0;c<4;c++)if(verify[i*4+c]!==input.data[i*4+c])throw Error(`Artwork changed: ${file}`);
 console.log(`${file}: artwork pixels preserved`);
}
