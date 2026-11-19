// Sample product data (frontend-only project, so no database needed).
const SIZES = ["S", "M", "L", "XL"];
const DRESS_SIZES = ["XS", "S", "M", "L"];
const PRODUCTS = [
  { id: 1, name: "Everyday Crew Tee", category: "Tops", type: "tee", price: 399, color: "#F2F4F7", sizes: SIZES, featured: true, desc: "Midweight cotton tee with a relaxed fit. Machine washable." },
  { id: 2, name: "Indigo Oxford Shirt", category: "Tops", type: "tee", price: 899, color: "#3B5B8C", sizes: SIZES, desc: "Button-down oxford with a soft collar. Smart enough for class presentations." },
  { id: 3, name: "Heather Hoodie", category: "Outerwear", type: "hoodie", price: 1299, color: "#8A94A6", sizes: SIZES, featured: true, desc: "Brushed fleece inside, kangaroo pocket, and a roomy hood." },
  { id: 4, name: "Canvas Chore Jacket", category: "Outerwear", type: "hoodie", price: 1899, color: "#A9784B", sizes: SIZES, desc: "Sturdy cotton canvas with four pockets. Gets better with every wash." },
  { id: 5, name: "Straight Denim Jeans", category: "Bottoms", type: "pants", price: 1499, color: "#2B4C7E", sizes: SIZES, featured: true, desc: "Classic straight cut in mid-weight denim with a little stretch." },
  { id: 6, name: "Pleated Chino Pants", category: "Bottoms", type: "pants", price: 1199, color: "#C8B28A", sizes: SIZES, desc: "Light twill chinos with a tapered leg." },
  { id: 7, name: "Linen Wrap Dress", category: "Dresses", type: "dress", price: 1699, color: "#C7D3C0", sizes: DRESS_SIZES, featured: true, desc: "Breathable linen blend with an adjustable wrap waist." },
  { id: 8, name: "Ribbed Midi Dress", category: "Dresses", type: "dress", price: 1399, color: "#14202E", sizes: DRESS_SIZES, desc: "Stretch rib knit that follows your shape without feeling tight." },
  { id: 9, name: "Striped Long-Sleeve Tee", category: "Tops", type: "tee", price: 549, color: "#E8E2D0", sizes: SIZES, desc: "Breton-style stripes in soft jersey cotton." },
  { id: 10, name: "Fleece Zip Hoodie", category: "Outerwear", type: "hoodie", price: 1599, color: "#2E6F6B", sizes: SIZES, desc: "Full-zip fleece with side pockets for cool evenings." },
  { id: 11, name: "Cargo Joggers", category: "Bottoms", type: "pants", price: 1099, color: "#4B5563", sizes: SIZES, desc: "Elastic cuffs, drawstring waist, and two roomy cargo pockets." },
  { id: 12, name: "Floral Sundress", category: "Dresses", type: "dress", price: 999, color: "#E9A8A1", sizes: DRESS_SIZES, desc: "Lightweight sundress with adjustable straps." }
];
const CATEGORIES = ["Tops", "Bottoms", "Outerwear", "Dresses"];
