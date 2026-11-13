"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUp, ArrowUpRight, Shirt, Coffee, Search, ShoppingBag, X, Plus, Minus, Heart, ChevronDown, Check, ImageIcon, Shuffle, Link, MessageCircle } from "lucide-react";

import ShopHeroArt from "../components/shop-hero-art";
import { useScrollReveal } from "../hooks/use-scroll-reveal";

type Product = { id: number; name: string; type: string; era: string; meme: string; price: number; color: string; design: string; bg: string; mockup?: string; colorName?: string };
const products: Product[] = [
  { id: 1, meme: "67", name: "The 6–7 Tee", type: "T-shirts", era: "Gen Alpha", price: 28, color: "#000000", design: "67", bg: "#90e0ef", mockup: "67 Tee.png" },
  { id: 2, meme: "Brainrot", name: "Certified Brainrot Hoodie", type: "Hoodies", era: "Gen Z", price: 58, color: "#73764e", design: "brainrot", bg: "#90e0ef" },
  { id: 3, meme: "Millennial classics", name: "This Is Fine Mug", type: "Mugs", era: "Millennial", price: 18, color: "#eee9dc", design: "fine", bg: "#90e0ef" },
  { id: 4, meme: "Delulu", name: "Delulu Is the Solulu Tee", type: "T-shirts", era: "Gen Z", price: 28, color: "#f0b8c3", design: "delulu", bg: "#90e0ef" },
  { id: 5, meme: "Verity", name: "Verity Energy Tee", type: "T-shirts", era: "Gen Z", price: 30, color: "#ede9db", design: "verity", bg: "#90e0ef" },
  { id: 6, meme: "67", name: "6–7 Braincell Hoodie", type: "Hoodies", era: "Gen Alpha", price: 58, color: "#393746", design: "67", bg: "#90e0ef" },
  { id: 7, meme: "Millennial classics", name: "Error 404: Brain Not Found", type: "Mugs", era: "Millennial", price: 18, color: "#ffffff", design: "404", bg: "#90e0ef", mockup: "error-404-mug-refined.webp", colorName: "White" },
  {"id":9,"name":"Skibidi Toilet Tee","meme":"Skibidi","mockup":"Skibidi Toilet Tee.png","type":"T-shirts","era":"Gen Alpha","price":28,"color":"#000000","design":"Skibidi Toilet Tee","bg":"#90e0ef"},
  {"id":10,"name":"Skibidi Tee","meme":"Skibidi","mockup":"Skibidi Tee.png","type":"T-shirts","era":"Gen Alpha","price":28,"color":"#000000","design":"Skibidi Tee","bg":"#90e0ef"},
  {"id":11,"name":"This Is Fine Tee","meme":"Millennial classics","mockup":"This is Fine Tee.png","type":"T-shirts","era":"Millennial","price":28,"color":"#000000","design":"This Is Fine Tee","bg":"#90e0ef"},
  {"id":12,"name":"Tung Tung Tung Sahur Tee","meme":"Italian brainrot","mockup":"Tung Tung Tung sahur (1).png","type":"T-shirts","era":"Gen Alpha","price":28,"color":"#000000","design":"Tung Tung Tung Sahur Tee","bg":"#90e0ef"},
  {"id":13,"name":"Tralalero Tralala Tee","meme":"Italian brainrot","mockup":"Tralalero Tralala.png","type":"T-shirts","era":"Gen Alpha","price":28,"color":"#000000","design":"Tralalero Tralala Tee","bg":"#90e0ef"},
  {"era":"Gen Z","color":"#000000","bg":"#90e0ef","design":"Tuff cat","id":14,"name":"Tuff Cat Tee","meme":"Tuff cat","type":"T-shirts","price":28,"mockup":"tuff-cat-tee.webp"},
  {"era":"Gen Z","color":"#00b4c2","bg":"#90e0ef","design":"Delulu","id":15,"name":"Delulu Is the Solulu Hoodie","meme":"Delulu","type":"Hoodies","price":58,"mockup":"delulu-hoodie.webp","colorName":"Turquoise"},
  {"era":"Gen Z","color":"#ffffff","bg":"#90e0ef","design":"Capybara","id":16,"name":"Capybara Life Tee","meme":"Capybara","type":"T-shirts","price":28,"mockup":"capybara-life-tee.webp","colorName":"White"},
  {"era":"Gen Z","color":"#000000","bg":"#90e0ef","design":"Daily dose of memes","id":17,"name":"Daily Dose of Memes Tee","meme":"Daily dose of memes","type":"T-shirts","price":28,"mockup":"daily-dose-of-memes-tee.webp"},
];
const money = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
type CartItem = { product: number; size: string; quantity: number };

const stockPhotos: Record<string, {src:string; alt:string}> = {
  "T-shirts": {src:"images/stock-shirt.jpg",alt:"Plain black T-shirt on a white background"},
  "Hoodies": {src:"images/stock-hoodie.jpg",alt:"Plain brown pullover hoodie worn by a model"},
  "Mugs": {src:"images/stock-mug.jpg",alt:"White ceramic mug on a table"},
};
function ProductImage({ product }: { product: Product }) {
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const photo = product.mockup ? {src: `images/mockups/normalized/${encodeURIComponent(product.mockup.replace(/\.png$/, "-cutout.webp"))}`, alt: `${product.colorName || "Black"} ${product.name} design mockup`} : stockPhotos[product.type];
  useEffect(() => { setFailed(false); setReady(false); }, [photo.src]);
  return <div className={`stock-photo mockup-${product.id} ${ready ? "image-ready" : ""} ${product.mockup ? "design-mockup" : ""} stock-${product.type === "T-shirts" ? "shirt" : product.type === "Hoodies" ? "hoodie" : "mug"}`}>
    {failed ? <div className="product-placeholder"><ImageIcon size={30} aria-hidden="true"/><span>Image unavailable</span></div> : <img src={photo.src} alt={product.mockup ? photo.alt : `${photo.alt}; stock reference for ${product.name}`} loading="lazy" decoding="async" onLoad={() => setReady(true)} onError={() => setFailed(true)}/>}
    <span className="stock-label">{product.mockup ? "Design mockup" : "Stock photo"}</span>
  </div>;
}

export default function Home() {
  const [category, setCategory] = useState("All goods");
  const [meme, setMeme] = useState("All memes");
  const [sort, setSort] = useState("Default order");
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [info, setInfo] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackKind, setFeedbackKind] = useState("Something is broken");
  const [shareFallback, setShareFallback] = useState("");
  const shopRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);
  const [pendingCollection, setPendingCollection] = useState<string | null>(null);
  const scrollBehavior = (): ScrollBehavior => window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${distance > 0 ? Math.min(1, window.scrollY / distance) : 0})`;
      setShowTop(window.scrollY > window.innerHeight);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const resize = new ResizeObserver(onScroll);
    resize.observe(document.body);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  useEffect(() => {
    if (!pendingCollection) return;
    const section = document.getElementById(pendingCollection);
    section?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    section?.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
    window.history.replaceState(null, "", `#${pendingCollection}`);
    setPendingCollection(null);
  }, [pendingCollection]);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => { try { const saved = JSON.parse(localStorage.getItem("brainrot-cart") || "[]"); if (Array.isArray(saved)) setCart(saved.filter((x: CartItem) => products.some(p => p.id === x.product) && Number.isInteger(x.quantity) && x.quantity > 0 && x.quantity <= 20 && ["S","M","L","XL","2XL","11 oz"].includes(x.size))); const f = JSON.parse(localStorage.getItem("brainrot-faves") || "[]"); if (Array.isArray(f)) setFavorites(f.filter((x: number) => products.some(p => p.id === x))); } catch {} setLoaded(true); }, []);
  useEffect(() => { if (loaded) { try { localStorage.setItem("brainrot-cart", JSON.stringify(cart)); localStorage.setItem("brainrot-faves", JSON.stringify(favorites)); } catch {} } }, [cart, favorites, loaded]);
  useEffect(() => {
    const sync = () => { const id = Number(new URLSearchParams(window.location.hash.slice(1)).get("product")); const p = products.find(p => p.id === id); setSelected(p || null); setShareFallback(""); if (p) { setSize(p.type === "Mugs" ? "11 oz" : "M"); setQuantity(1); setCartOpen(false); setInfo(null); } };
    sync(); window.addEventListener("hashchange", sync); window.addEventListener("popstate", sync);
    return () => { window.removeEventListener("hashchange", sync); window.removeEventListener("popstate", sync); };
  }, []);
  const overlay = !!selected || cartOpen || !!info;
  useEffect(() => { document.body.style.overflow = overlay ? "hidden" : ""; const close = (event: KeyboardEvent) => { if (event.key === "Escape") { closeProduct(); setCartOpen(false); setInfo(null); } }; document.addEventListener("keydown", close); return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", close); }; }, [overlay]);
  const dialogKey = info || (cartOpen ? "cart" : selected ? `product-${selected.id}` : null);
  useEffect(() => { if (!dialogKey) return; const previous = document.activeElement as HTMLElement; const timer = requestAnimationFrame(() => { (document.querySelector('[role="dialog"] button') as HTMLElement)?.focus({ preventScroll: true }); }); const trap = (e: KeyboardEvent) => { if (e.key !== "Tab") return; const nodes = document.querySelector('[role="dialog"]')?.querySelectorAll<HTMLElement>('button:not(:disabled), input, textarea, select, a[href]'); if (!nodes?.length) return; const first = nodes[0], last = nodes[nodes.length - 1]; if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } }; document.addEventListener("keydown", trap); return () => { cancelAnimationFrame(timer); document.removeEventListener("keydown", trap); if (previous?.isConnected) previous.focus({ preventScroll: true }); }; }, [dialogKey]);
  function notify(message: string) { setToast(message); if (toastTimer.current) clearTimeout(toastTimer.current); toastTimer.current = setTimeout(() => setToast(""), 3000); }
  function openProduct(p: Product) { window.history.pushState(null, "", `#product=${p.id}`); setShareFallback(""); setSelected(p); setSize(p.type === "Mugs" ? "11 oz" : "M"); setQuantity(1); }
  function closeProduct() { setSelected(null); setShareFallback(""); if (new URLSearchParams(window.location.hash.slice(1)).has("product")) window.history.replaceState(null, "", window.location.pathname + window.location.search); }
  async function shareProduct() { if (!selected) return; const url = new URL(window.location.href); url.hash = "product=" + selected.id; try { await navigator.clipboard.writeText(url.href); notify("Product link copied."); } catch { setShareFallback(url.href); } }
  function randomProduct() { openProduct(products[Math.floor(Math.random() * products.length)]); }
  function resetFilters() { setSearch(""); setCategory("All goods"); setMeme("All memes"); setOnlyFavorites(false); setSort("Default order"); }
  function add() { if (!selected) return; setCart(current => { const found = current.find(x => x.product === selected.id && x.size === size); return found ? current.map(x => x === found ? { ...x, quantity: Math.min(20, x.quantity + quantity) } : x) : [...current, { product: selected.id, size, quantity }]; }); notify("Added to bag."); closeProduct(); }
  function changeQuantity(index: number, delta: number) { setCart(current => current.map((x, i) => i === index ? { ...x, quantity: Math.min(20, x.quantity + delta) } : x).filter(x => x.quantity > 0)); }
  function shop(newCategory = "All goods", newMeme = "All memes") { setCategory(newCategory); setMeme(newMeme); setOnlyFavorites(false); setSearch(""); document.getElementById("shop")?.scrollIntoView({ behavior: scrollBehavior() }); }
  const visible = products.filter(p => (category === "All goods" || p.type === category) && (meme === "All memes" || p.meme === meme) && (!onlyFavorites || favorites.includes(p.id)) && `${p.name} ${p.meme} ${p.era} ${p.design === "67" ? "67 6–7" : ""}`.toLowerCase().includes(search.toLowerCase())).sort((a,b) => sort === "Price: low to high" ? a.price-b.price : sort === "Price: high to low" ? b.price-a.price : Number(!!b.mockup)-Number(!!a.mockup) || a.id-b.id);
  const total = cart.reduce((sum, x) => sum + products.find(p => p.id === x.product)!.price * x.quantity, 0);
  const count = cart.reduce((sum, x) => sum + x.quantity, 0);

  const filtering = category !== "All goods" || meme !== "All memes" || !!search || onlyFavorites || sort !== "Default order";
  useScrollReveal(shopRef, `${category}|${meme}|${sort}|${search}|${onlyFavorites}|${visible.map(p => p.id).join(",")}`);
  const collections = [
    {id:"tees", title:"T-shirts", items:products.filter(p => p.mockup && p.type === "T-shirts")},
    {id:"hoodies", title:"Hoodies", items:products.filter(p => p.type === "Hoodies")},
    {id:"mugs", title:"Mugs", items:products.filter(p => p.type === "Mugs")},
    {id:"tee-concepts", title:"More tee concepts", items:products.filter(p => p.type === "T-shirts" && !p.mockup)},
  ];
  function renderProduct(p: Product) { return <article className="product-card" key={p.id}><div className="product-image" style={{ background: p.bg }}><button className={`favorite ${favorites.includes(p.id) ? "is-saved" : ""}`} aria-label={`${favorites.includes(p.id) ? "Unsave" : "Save"} ${p.name}`} aria-pressed={favorites.includes(p.id)} onClick={() => setFavorites(f => f.includes(p.id) ? f.filter(x => x !== p.id) : [...f,p.id])}><Heart size={18} fill={favorites.includes(p.id) ? "currentColor" : "none"}/></button><button className="art-button" onClick={() => openProduct(p)} aria-label={`View ${p.name}`}><ProductImage product={p}/></button><button className="quick-add" aria-label={`Choose options for ${p.name}`} onClick={() => openProduct(p)}><Plus size={21}/></button><span className="product-color" style={{ background:p.color }}/></div><div className="product-meta"><span>{p.type === "T-shirts" ? "TEE" : p.type === "Hoodies" ? "HOODIE" : "MUG"} / {p.meme.toUpperCase()}</span><span>{money(p.price)}</span></div><button className="product-name" onClick={() => openProduct(p)}>{p.name}</button></article>; }
  return <>
    <div className="scroll-progress" aria-hidden="true"><div ref={progressRef}/></div>
    <div className="preview-banner"><strong>Store preview</strong><span>Orders aren’t open yet. Sample prices · Mockups and stock photos.</span></div>
    <header className="header">
      <a href="#" className="logo" aria-label="Brainrot Supply home"><span className="logo-mark">b<span>®</span></span><span>BRAINROT<br/>SUPPLY<span className="logo-dot">.</span></span></a>
      <div className="header-actions"><button className="icon-button" aria-label="Search products" onClick={() => { setSearchOpen(!searchOpen); document.getElementById("shop")?.scrollIntoView({ behavior: scrollBehavior() }); }}><Search size={21}/></button><button className={`icon-button favorites-nav ${onlyFavorites ? "active" : ""}`} aria-label="View saved products" onClick={() => { setOnlyFavorites(!onlyFavorites); setCategory("All goods"); setMeme("All memes"); setSearch(""); document.getElementById("shop")?.scrollIntoView({ behavior: scrollBehavior() }); }}><Heart size={21}/></button><button className="bag-button" aria-label={`Shopping bag, ${count} items`} onClick={() => { setCartOpen(true); setCheckout(false); }}><ShoppingBag size={19}/><span>Bag</span><b key={count}>{count}</b></button></div>
    </header>
    <main>
      <section ref={shopRef} id="shop" className="shop section-pad">
        <div className="section-heading shop-intro"><h1><span className="highlight-word">Internet memes</span> on shirts, hoodies, and mugs</h1><div className="shop-doodle"><ShopHeroArt/></div></div>
        <nav className="collection-nav" aria-label="Browse collections">{[["tees","T-shirts"],["hoodies","Hoodies"],["mugs","Mugs"]].map(([id,label]) => <a key={id} href={"#"+id} onClick={e => { e.preventDefault(); resetFilters(); setPendingCollection(id); }}>{id === "mugs" ? <Coffee size={18}/> : <Shirt size={18}/>} {label}<ArrowRight size={16}/></a>)}</nav>
        <details className="browse-filters"><summary>Filter & sort <ChevronDown size={16}/></summary><div className="filter-fields"><label>Product type<select value={category} onChange={e => setCategory(e.target.value)}>{["All goods","T-shirts","Hoodies","Mugs"].map(x=><option key={x}>{x}</option>)}</select></label><label>Meme<select aria-label="Filter by meme" value={meme} onChange={e=>setMeme(e.target.value)}>{["All memes",...Array.from(new Set(products.map(p=>p.meme)))].map(x=><option key={x}>{x}</option>)}</select></label><label>Sort by<select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort products"><option>Default order</option><option>Price: low to high</option><option>Price: high to low</option></select></label><button onClick={()=>{resetFilters();setSort("Default order");}}>Reset filters</button></div></details>
        {(searchOpen || search || onlyFavorites) && <div className="search-row">{onlyFavorites && <button className="saved-filter" onClick={() => setOnlyFavorites(false)}>Saved goods <X size={14}/></button>}<Search size={18}/><input autoFocus={searchOpen} type="search" placeholder="Search products" aria-label="Search the shop" value={search} onChange={e => setSearch(e.target.value)}/><button className="icon-button" aria-label="Close search" onClick={() => { setSearchOpen(false); setSearch(""); }}><X size={18}/></button></div>}
        {filtering && <div className="results-line"><span role="status">{visible.length} matching products</span><button onClick={resetFilters}>Clear filters</button></div>}
        {filtering ? <div className="product-grid">{visible.map(renderProduct)}</div> : collections.map(collection => <section key={collection.id} id={collection.id} className="merch-collection" aria-label={collection.title}><div className="collection-title"><h2 tabIndex={-1}>{collection.title}</h2><span>{collection.items.length} products</span></div><div className="product-grid">{collection.items.map(renderProduct)}</div></section>)}

        {visible.length === 0 && <div className="empty-state"><h3>{onlyFavorites ? "No saved products here yet." : "No products found."}</h3><p>{onlyFavorites ? "Tap a heart on a product to save it, or clear your filters to browse." : "Try another search, meme, or product type."}</p><button className="primary" onClick={resetFilters}>Clear filters <ArrowRight size={18}/></button></div>}
      </section>
    </main>
    <footer className="footer section-pad"><div className="footer-top"><a href="#" className="logo footer-logo"><span className="logo-mark">b<span>®</span></span><span>BRAINROT<br/>SUPPLY.</span></a><div className="footer-links"><button onClick={randomProduct}>Pick a random meme <Shuffle size={15}/></button><button onClick={() => setInfo("Send feedback")}>Send feedback <MessageCircle size={15}/></button><button onClick={() => setInfo("The details")}>The details <ArrowUpRight size={15}/></button><button onClick={() => setInfo("Size guide")}>Size guide <ArrowUpRight size={15}/></button><button onClick={() => setInfo("About this store")}>About this store <ArrowUpRight size={15}/></button></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} BRAINROT SUPPLY</span><span>CONCEPT STORE · USD</span></div></footer>
    {selected && <div className="overlay" onClick={closeProduct}><section className="product-modal" role="dialog" aria-modal="true" aria-label={selected.name} onClick={e => e.stopPropagation()}><button className="close-modal icon-button" aria-label="Close product" onClick={closeProduct}><X size={22}/></button><div className="modal-art" style={{ background: selected.bg }}><ProductImage product={selected}/></div><div className="modal-copy"><span className="eyebrow">{selected.era} / {selected.type}</span><h2>{selected.name}</h2><p className="modal-price">{money(selected.price)}</p><div className="color-label"><span className="swatch" style={{ background:selected.color }}/> {selected.mockup ? selected.colorName || "Black" : selected.id === 1 ? "Washed charcoal" : selected.id === 2 ? "Moss" : selected.id === 3 ? "Natural" : selected.id === 4 ? "Dusty rose" : selected.id === 5 ? "Oat" : selected.id === 6 ? "Midnight" : selected.id === 7 ? "Marigold" : "Matcha"}</div><div className="size-heading"><strong>{selected.type === "Mugs" ? "Capacity" : "Select size"}</strong>{selected.type !== "Mugs" && <button onClick={() => { closeProduct(); setInfo("Size guide"); }}>Size guide ↗</button>}</div><div className="size-options">{(selected.type === "Mugs" ? ["11 oz"] : ["S","M","L","XL","2XL"]).map(s => <button key={s} className={size === s ? "selected" : ""} onClick={() => setSize(s)}>{s}</button>)}</div><div className="add-row"><div className="quantity"><button aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity(q => q-1)}><Minus size={15}/></button><span>{quantity}</span><button aria-label="Increase quantity" disabled={quantity >= 20} onClick={() => setQuantity(q => q+1)}><Plus size={15}/></button></div><button className="primary" onClick={add}>Add to bag <ShoppingBag size={18}/></button></div><button className="utility-button share-product" onClick={shareProduct}><Link size={18}/>Copy product link</button>{shareFallback && <label className="share-fallback">Copy this link<input readOnly value={shareFallback} onFocus={e => e.target.select()}/></label>}<p className="concept-note">Concept merch · Sample pricing · Payments aren’t live yet.</p></div></section></div>}
    {cartOpen && <div className="overlay cart-overlay" onClick={() => setCartOpen(false)}><section className="cart-drawer" role="dialog" aria-modal="true" aria-label={checkout ? "Checkout preview" : "Shopping bag"} onClick={e => e.stopPropagation()}><div className="drawer-heading"><h2>{checkout ? "Checkout preview" : <>Your bag <span>({count})</span></>}</h2><button className="icon-button" aria-label="Close bag" onClick={() => setCartOpen(false)}><X size={22}/></button></div>{!cart.length ? <div className="empty-bag"><ShoppingBag size={42}/><h3>Your bag has zero lore.</h3><p>Add a product to try out the preview bag.</p><button className="primary" onClick={() => { setCartOpen(false); shop(); }}>View products <ArrowRight size={18}/></button></div> : <><div className="cart-items">{checkout && <div className="checkout-notice"><div><strong>Orders are unavailable.</strong><p>This concept store isn’t taking orders yet. Payments, shipping, and fulfillment need to be connected before launch. Your bag is saved on this browser.</p></div></div>}{cart.map((item,i) => { const p = products.find(x => x.id === item.product)!; return <article className="cart-item" key={`${item.product}-${item.size}`}><div className="cart-art" style={{ background:p.bg }}><ProductImage product={p}/></div><div className="cart-item-info"><strong>{p.name}</strong><p>{item.size} · {money(p.price)}</p><div className="cart-item-bottom"><div className="quantity"><button aria-label={`Decrease ${p.name} quantity`} disabled={item.quantity <= 1} onClick={() => changeQuantity(i,-1)}><Minus size={13}/></button><span>{item.quantity}</span><button aria-label={`Increase ${p.name} quantity`} disabled={item.quantity >= 20} onClick={() => changeQuantity(i,1)}><Plus size={13}/></button></div><button className="remove" aria-label={`Remove ${p.name} (${item.size})`} onClick={() => setCart(c => c.filter((_,index) => index !== i))}>Remove</button></div></div><strong>{money(p.price*item.quantity)}</strong></article>; })}</div><div className="cart-summary"><div><strong>Item subtotal</strong><strong>{money(total)}</strong></div><p>Sample prices in USD. Shipping and taxes aren’t calculated.</p><button className="primary" onClick={() => checkout ? setCheckout(false) : setCheckout(true)}>{checkout ? "Back to bag" : "Preview checkout"}<ArrowRight size={19}/></button><button className="continue" onClick={() => { setCartOpen(false); }}>Close bag</button></div></>}</section></div>}
    {info && <div className="overlay" onClick={() => setInfo(null)}><section className="info-modal" role="dialog" aria-modal="true" aria-label={info} onClick={e => e.stopPropagation()}><button className="close-modal icon-button" aria-label="Close information" onClick={() => setInfo(null)}><X size={22}/></button><div className="eyebrow">BRAINROT SUPPLY</div><h2>{info}</h2>{info === "Send feedback" ? <form className="feedback-form" action="https://github.com/Rishaanbit/brainrot-supply/issues/new" method="get" target="_blank" rel="noopener noreferrer"><p>Found a bug or something confusing? This opens a public GitHub report for you to review and submit. A GitHub account is required. Don’t include personal information.</p><label>What’s this about?<select name="title" value={feedbackKind} onChange={e => setFeedbackKind(e.target.value)}><option>Something is broken</option><option>Something is confusing</option><option>A feature idea</option></select></label><label>Your feedback<textarea required minLength={10} maxLength={2000} name="body" value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Tell us what happened and what you expected." rows={5}/></label><button className="primary" type="submit">Continue to GitHub <ArrowUpRight size={18}/></button><p>Your report isn’t sent until you submit it on GitHub.</p></form> : info === "Size guide" ? <><p>Illustrative unisex sizing for tees and hoodies. Final garment measurements will be confirmed before orders open.</p><table><thead><tr><th>Size</th><th>Chest (in)</th><th>Length (in)</th></tr></thead><tbody>{[["S","36–38","27"],["M","39–41","28"],["L","42–44","29"],["XL","45–48","30"],["2XL","49–52","31"]].map(row => <tr key={row[0]}>{row.map((cell,i) => i === 0 ? <th key={i}>{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table><p>Chest measurements refer to your body. For a looser fit, size up.</p></> : info === "The details" ? <><h3>The merch</h3><p>Tees, hoodies, and 11 oz mugs featuring original concept graphics inspired by internet culture.</p><h3>Orders & shipping</h3><p>This is a concept storefront. No payments or orders are collected. Shipping regions, delivery times, materials, and return policies will be set when the store launches.</p></> : <><p>Products marked “Design mockup” show our proposed designs. Other images are stock references. Mockups are previews, not photographs of printed samples. Prices and sizing are samples. Payments and fulfillment are not connected, and no purchase is made through this preview.</p></>}</section></div>}
    {showTop && !overlay && <button className="back-to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: scrollBehavior() })}><ArrowUp size={20}/><span>Up we go</span></button>}
    <div className={`toast ${toast ? "show" : ""}`} role="status"><Check size={18}/>{toast}</div>
  </>;
}
