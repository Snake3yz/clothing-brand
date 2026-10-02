// KAYOO STUDIO — Product & Commerce Service Layer
// Kampuchea Aspire Youth Original Outfit — Streetwear Syndicate

import {
  PRODUCTS,
  CATEGORIES,
  COLLECTIONS,
  REVIEWS,
  LOOKBOOK_LOOKS,
  MOCK_ORDERS,
  PROMO_CODES,
  FAQS,
  STORES
} from '../data/mockData';

// Simulated network latency (can be set to 0 for instant tests, or 100ms for realistic smoothness)
const delay = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms));

const STORAGE_KEY_PRODUCTS = 'kayoo_products_inventory';

/**
 * Visual presets of authentic KAYOO garment photography from image archive
 */
export const PRESET_KAYOO_IMAGES = [
  { label: 'Look 1 — Denim Skater', path: '/products/IMG_90E839521ACA-1.jpeg' },
  { label: 'Look 2 — Night Walk Front', path: '/products/IMG_90E839521ACA-2.jpeg' },
  { label: 'Look 3 — Car Hood Pose', path: '/products/IMG_90E839521ACA-3.jpeg' },
  { label: 'Look 4 — Temple Steps', path: '/products/IMG_90E839521ACA-4.jpeg' },
  { label: 'Look 5 — Temple Close-up', path: '/products/IMG_90E839521ACA-5.jpeg' },
  { label: 'Look 6 — Architectural Steps', path: '/products/IMG_90E839521ACA-6.jpeg' },
  { label: 'Look 7 — Courtyard Sitting', path: '/products/IMG_90E839521ACA-7.jpeg' },
  { label: 'Look 8 — Car Hood Angled', path: '/products/IMG_90E839521ACA-8.jpeg' },
  { label: 'Look 9 — Lake Waterfront', path: '/products/IMG_90E839521ACA-9.jpeg' },
  { label: 'Look 10 — Athletic Jersey Detail', path: '/products/IMG_90E839521ACA-10.jpeg' },
  { label: 'Look 11 — Staircase Fit', path: '/products/IMG_90E839521ACA-11.jpeg' },
  { label: 'Look 12 — Street Concrete', path: '/products/IMG_90E839521ACA-12.jpeg' },
  { label: 'Look 13 — Pure Chalk Joggers', path: '/products/IMG_90E839521ACA-13.jpeg' },
  { label: 'Look 14 — Courtyard Close', path: '/products/IMG_90E839521ACA-14.jpeg' },
  { label: 'Look 15 — Graphic Tee Flatlay', path: '/products/IMG_90E839521ACA-15.jpeg' },
  { label: 'Look 16 — Waterfront Portrait', path: '/products/IMG_90E839521ACA-16.jpeg' },
  { label: 'Look 17 — Vintage Wash Skater', path: '/products/IMG_90E839521ACA-17.jpeg' },
  { label: 'Look 18 — Alleyway Shadows', path: '/products/IMG_90E839521ACA-18.jpeg' },
  { label: 'Look 19 — Syndicate Tee Duo', path: '/products/IMG_90E839521ACA-19.jpeg' },
  { label: 'Look 20 — Mirror Reflection', path: '/products/IMG_90E839521ACA-20.jpeg' },
  { label: 'Look 21 — White Fleece Fit', path: '/products/IMG_90E839521ACA-21.jpeg' },
  { label: 'Look 22 — Night Street Flash', path: '/products/IMG_90E839521ACA-22.jpeg' },
  { label: 'Look 23 — Balcony Portrait', path: '/products/IMG_90E839521ACA-23.jpeg' },
  { label: 'Look 24 — Studio Joggers', path: '/products/IMG_90E839521ACA-24.jpeg' },
  { label: 'Signature Starburst Duo', path: '/products/kayoo-tee-duo.jpeg' },
  { label: 'Official Athletic Jersey (Hanuman)', path: '/products/kayoo-jersey-hanuman.jpeg' },
  { label: 'KAYOO Brand Campaign Banner', path: '/products/kayoo-brand-banner.jpeg' }
];

/**
 * Retrieve the active catalog of products (saved in localStorage or default initial catalog)
 */
export function getActiveProducts() {
  if (typeof window === 'undefined') return [...PRODUCTS];
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load products from storage:', err);
  }
  return [...PRODUCTS];
}

/**
 * Persist active catalog and notify listeners
 */
export function saveActiveProducts(productsList) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(productsList));
    window.dispatchEvent(new CustomEvent('kayoo:products_updated', { detail: productsList }));
  } catch (err) {
    console.error('Failed to save products to storage:', err);
  }
}

/**
 * Insert a brand new product into the active catalog
 */
export async function addProduct(productPayload) {
  await delay(20);
  const current = getActiveProducts();
  const timestamp = Date.now();
  const category = productPayload.category || 'tops';
  const prefix = category === 'tops' ? 'TEE' : category === 'trousers' ? 'BTM' : category === 'accessories' ? 'ACC' : 'STY';
  const generatedSku = productPayload.sku || `KY-${prefix}-${Math.floor(100 + Math.random() * 900)}`;

  const newProduct = {
    id: productPayload.id || `prod-kayoo-${timestamp}`,
    sku: generatedSku,
    name: productPayload.name || 'Untitled KAYOO Creation',
    category,
    gender: productPayload.gender || 'unisex',
    price: Number(productPayload.price) || 28,
    compareAtPrice: productPayload.compareAtPrice ? Number(productPayload.compareAtPrice) : null,
    isSale: Boolean(productPayload.compareAtPrice && Number(productPayload.compareAtPrice) > Number(productPayload.price)),
    isNew: productPayload.isNew !== undefined ? productPayload.isNew : true,
    isFeatured: productPayload.isFeatured !== undefined ? productPayload.isFeatured : true,
    rating: productPayload.rating || 5.0,
    reviewCount: productPayload.reviewCount || 0,
    badge: productPayload.badge || 'NEW DROP',
    summary: productPayload.summary || productPayload.description || 'Exclusive KAYOO archival piece.',
    description: productPayload.description || 'Engineered with 320GSM custom combed cotton, reinforced seams, and silkscreen hand-prints by KAYOO Studio Phnom Penh.',
    materials: productPayload.materials || '100% Dense Combed Cotton (320 GSM). Pre-shrunk bio-wash finish.',
    care: productPayload.care || 'Machine wash cold inside out with like colors. Do not iron directly on print. Hang dry in shade.',
    stock: Number(productPayload.stock) || 24,
    images: Array.isArray(productPayload.images) && productPayload.images.length > 0 
      ? productPayload.images 
      : ['/products/kayoo-tee-duo.jpeg'],
    colors: Array.isArray(productPayload.colors) && productPayload.colors.length > 0
      ? productPayload.colors
      : [{ name: 'Obsidian Black', hex: '#161618' }],
    sizes: Array.isArray(productPayload.sizes) && productPayload.sizes.length > 0
      ? productPayload.sizes
      : [
          { size: 'S', stock: Math.ceil((Number(productPayload.stock) || 24) / 4) },
          { size: 'M', stock: Math.ceil((Number(productPayload.stock) || 24) / 4) },
          { size: 'L', stock: Math.ceil((Number(productPayload.stock) || 24) / 4) },
          { size: 'XL', stock: Math.ceil((Number(productPayload.stock) || 24) / 4) }
        ],
    collections: productPayload.collections || ['syndicate-core'],
    createdAt: new Date().toISOString()
  };

  const updated = [newProduct, ...current];
  saveActiveProducts(updated);
  return newProduct;
}

/**
 * Update an existing product
 */
export async function updateProduct(id, productPayload) {
  await delay(20);
  const current = getActiveProducts();
  const updated = current.map((p) => (p.id === id ? { ...p, ...productPayload } : p));
  saveActiveProducts(updated);
  return updated.find((p) => p.id === id);
}

/**
 * Delete a product from inventory
 */
export async function deleteProduct(id) {
  await delay(20);
  const current = getActiveProducts();
  const updated = current.filter((p) => p.id !== id);
  saveActiveProducts(updated);
  return true;
}

/**
 * Restore catalog to factory default products
 */
export async function resetProductsToDefault() {
  await delay(20);
  saveActiveProducts([...PRODUCTS]);
  return [...PRODUCTS];
}

/**
 * Fetch all products with optional filters, search, and sorting
 */
export async function getProducts({
  category = 'all',
  gender = 'all',
  collection = null,
  search = '',
  minPrice = 0,
  maxPrice = Infinity,
  sizes = [],
  colors = [],
  inStockOnly = false,
  sortBy = 'featured',
  page = 1,
  limit = 24
} = {}) {
  await delay(30);

  let results = [...getActiveProducts()];

  // Category filter
  if (category && category !== 'all') {
    if (category === 'sale') {
      results = results.filter((p) => p.isSale);
    } else {
      results = results.filter((p) => p.category === category);
    }
  }

  // Gender filter
  if (gender && gender !== 'all') {
    results = results.filter((p) => p.gender === gender || p.gender === 'unisex');
  }

  // Collection filter
  if (collection) {
    results = results.filter((p) => p.collections && p.collections.includes(collection));
  }

  // Search filter
  if (search && search.trim() !== '') {
    const q = search.toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.sku && p.sku.toLowerCase().includes(q)) ||
        (p.materials && p.materials.toLowerCase().includes(q))
    );
  }

  // Price range filter
  if (minPrice > 0 || maxPrice < Infinity) {
    results = results.filter((p) => p.price >= minPrice && p.price <= maxPrice);
  }

  // Size filter
  if (sizes && sizes.length > 0) {
    results = results.filter((p) =>
      p.sizes && p.sizes.some((s) => sizes.includes(s.size) && s.stock > 0)
    );
  }

  // Color filter
  if (colors && colors.length > 0) {
    results = results.filter((p) =>
      p.colors && p.colors.some((c) => colors.includes(c.name))
    );
  }

  // In-stock only
  if (inStockOnly) {
    results = results.filter((p) => p.stock > 0);
  }

  // Sorting
  switch (sortBy) {
    case 'price-asc':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case 'rating':
      results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case 'featured':
    default:
      results.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      break;
  }

  const total = results.length;
  const startIndex = (page - 1) * limit;
  const paginatedResults = results.slice(startIndex, startIndex + limit);

  return {
    products: paginatedResults,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  };
}

/**
 * Fetch a single product by its ID or slug
 */
export async function getProductById(id) {
  await delay(20);
  const all = getActiveProducts();
  const product = all.find((p) => p.id === id || (p.sku && p.sku.toLowerCase() === id.toLowerCase()));
  return product || null;
}

/**
 * Fetch related products for recommendations
 */
export async function getRelatedProducts(productId, limit = 4) {
  await delay(20);
  const all = getActiveProducts();
  const current = all.find((p) => p.id === productId);
  if (!current) return all.slice(0, limit);

  const related = all.filter(
    (p) => p.id !== productId && (p.category === current.category || p.gender === current.gender)
  );

  return related.slice(0, limit);
}

/**
 * Fetch featured products for homepage spotlight
 */
export async function getFeaturedProducts(limit = 8) {
  await delay(20);
  const all = getActiveProducts();
  const featured = all.filter((p) => p.isFeatured);
  return featured.length > 0 ? featured.slice(0, limit) : all.slice(0, limit);
}

/**
 * Fetch new arrivals
 */
export async function getNewArrivals(gender = 'all', limit = 8) {
  await delay(20);
  const all = getActiveProducts();
  let list = all.filter((p) => p.isNew);
  if (gender !== 'all') {
    list = list.filter((p) => p.gender === gender || p.gender === 'unisex');
  }
  return list.length > 0 ? list.slice(0, limit) : all.slice(0, limit);
}

/**
 * Fetch categories
 */
export async function getCategories() {
  await delay(10);
  return CATEGORIES;
}

/**
 * Fetch all collections
 */
export async function getCollections() {
  await delay(20);
  return COLLECTIONS;
}

/**
 * Fetch collection by ID with enriched product details
 */
export async function getCollectionById(collectionId) {
  await delay(20);
  const coll = COLLECTIONS.find((c) => c.id === collectionId);
  if (!coll) return null;

  const all = getActiveProducts();
  const curatedProducts = all.filter((p) =>
    coll.curatedProductIds.includes(p.id) || (p.collections && p.collections.includes(collectionId))
  );

  return {
    ...coll,
    products: curatedProducts
  };
}

/**
 * Fetch lookbook outfits
 */
export async function getLookbook() {
  await delay(20);
  return LOOKBOOK_LOOKS;
}

/**
 * Fetch product customer reviews
 */
export async function getProductReviews(productId) {
  await delay(20);
  return REVIEWS.filter((r) => r.productId === productId);
}

/**
 * Add a new review (demo local submission)
 */
export async function submitProductReview(productId, reviewData) {
  await delay(50);
  const newReview = {
    id: `rev-${Date.now()}`,
    productId,
    author: reviewData.author || 'Anonymous Guest',
    rating: Number(reviewData.rating) || 5,
    date: new Date().toISOString().split('T')[0],
    verified: true,
    title: reviewData.title,
    comment: reviewData.comment,
    fitFeedback: reviewData.fitFeedback || 'True to size.'
  };
  return newReview;
}

/**
 * Validate promotional discount code
 */
export async function validatePromoCode(inputCode) {
  await delay(30);
  const code = (inputCode || '').trim().toUpperCase();
  const match = PROMO_CODES.find((p) => p.code === code);
  if (match) {
    return { valid: true, ...match };
  }
  return { valid: false, message: 'Invalid or expired promotional code.' };
}

/**
 * Fetch order tracking information
 */
export async function getOrderTracking(orderQuery) {
  await delay(40);
  const q = (orderQuery || '').trim().toUpperCase();
  const found = MOCK_ORDERS.find(
    (o) =>
      o.id.toUpperCase() === q ||
      o.orderNumber.toUpperCase() === q ||
      o.trackingNumber === q
  );

  if (found) return found;

  // If user typed a custom number, return a dynamically generated realistic tracking status
  const prefix = q.startsWith('KY-') || q.startsWith('AUR-') ? q : `KY-${q}`;
  return {
    id: prefix,
    orderNumber: prefix,
    date: '2026-03-28',
    status: 'In Transit',
    timelineStep: 3,
    carrier: 'KAYOO Express Courier',
    trackingNumber: '7942-8812-3904',
    estimatedDelivery: 'April 3, 2026',
    items: [
      {
        id: 'prod-kayoo-tee',
        name: 'KAYOO Starburst "Rock-On" Heavyweight Oversized Tee',
        color: 'Obsidian Black & Electric Lilac',
        size: 'L',
        price: 28,
        quantity: 1,
        image: '/products/kayoo-tee-duo.jpeg'
      }
    ],
    shippingAddress: {
      fullName: 'Valued Client',
      address1: 'No. 42 Street 214',
      city: 'Phnom Penh',
      state: 'Phnom Penh',
      postalCode: '120207',
      country: 'Cambodia'
    },
    subtotal: 28,
    discount: 2.8,
    shippingFee: 0,
    tax: 2.52,
    total: 27.72,
    paymentMethod: 'ABA PAY / KHQR'
  };
}

/**
 * Fetch customer orders
 */
export async function getCustomerOrders() {
  await delay(30);
  return MOCK_ORDERS;
}

/**
 * Save new placed order (demo)
 */
export async function createOrder(orderPayload) {
  await delay(100);
  const newOrderNumber = `KY-${Math.floor(1000 + Math.random() * 9000)}`;
  const newOrder = {
    id: `${newOrderNumber}-FX`,
    orderNumber: newOrderNumber,
    date: new Date().toISOString().split('T')[0],
    status: 'Processing',
    timelineStep: 1,
    carrier: 'KAYOO Express Courier',
    trackingNumber: `79${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    estimatedDelivery: '2–3 Business Days',
    ...orderPayload
  };
  return newOrder;
}

/**
 * Fetch store locations
 */
export async function getStores() {
  await delay(10);
  return STORES;
}

/**
 * Fetch FAQs
 */
export async function getFAQs() {
  await delay(10);
  return FAQS;
}
