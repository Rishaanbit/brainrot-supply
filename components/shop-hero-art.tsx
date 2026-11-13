export default function ShopHeroArt(){return <svg className="shop-hero-art" viewBox="0 0 320 260" fill="none" aria-hidden="true">
<g stroke="#03045e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
<path d="M38 25h238l-3 212H36Z" fill="#f5fcff"/><path d="M58 25v212" stroke="#00b4d8" strokeWidth="1"/>
{[60,90,120,150,180,210].map(y=><path key={y} d={`M39 ${y}h232`} stroke="#90e0ef" strokeWidth="1"/>)}
{[45,80,115,150,185,220].map(y=><path key={y} d={`M30 ${y}q-15-12 0-16h14`} stroke="#0077b6"/>)}
<g className="art-face">
<path d="M109 210c-12-29-4-68 11-85l88-7c24 27 24 63 13 91Z" fill="#90e0ef"/>
<path d="M112 85c-18-29 11-40 22-14m55-1c12-31 39-13 24 12" fill="#90e0ef"/>
<path d="M112 80c15-22 84-24 100 3l11 44c5 24-22 39-59 37-40-2-64-16-59-39Z" fill="#caf0f8"/>
<path d="M119 84q3-9 9-7m72 0q7-2 7 8" stroke="#0077b6"/>
<path d="M124 110h20m35 0h20"/><ellipse cx="136" cy="114" rx="3" ry="5" fill="#03045e"/><ellipse cx="187" cy="114" rx="3" ry="5" fill="#03045e"/>
<path d="M149 131q13-9 25 0l-12 8Z" fill="#0077b6"/><path d="M162 139v8m-12-2q12 11 23-1"/>
<path d="m117 182 16 18m69-18-13 18"/>
<path d="M140 176h46v36h-46Z" fill="#fff"/><path d="M186 181h8q16 12 0 23h-8" fill="#fff"/><path d="m155 188 4 4m12-4-4 4m-12 9q8 7 15 0" strokeWidth="2"/>
<path d="M120 215h22m45 0h25"/>
</g>
<g className="art-spark"><path d="m240 65 4 10 11 3-11 4-4 11-3-11-10-4 10-3Z" fill="#00b4d8"/><path d="m81 149 3 8 9 3-9 3-3 9-3-9-9-3 9-3Z" fill="#90e0ef"/></g>
<path d="M239 112h17l-15 17h18m-13 10h11l-10 12h11" stroke="#0077b6" strokeWidth="2"/>
</g></svg>}
