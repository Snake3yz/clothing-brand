// KAYOO ARCHIVE — Official Brand Data Store
// Kampuchea Aspire Youth Original Outfit (KAYOO)
// 100% Authentic Photoshoot Catalog from /image cloths

export const CATEGORIES = [
  { id: 'all', name: 'All Pieces', count: 12, slug: 'all' },
  { id: 'tops', name: 'Tops & Tees', count: 6, slug: 'tops' },
  { id: 'trousers', name: 'Pants & Bottoms', count: 4, slug: 'trousers' },
  { id: 'accessories', name: 'Headwear & Caps', count: 1, slug: 'accessories' },
  { id: 'sale', name: 'Archive Drops', count: 8, slug: 'sale' },
];

export const COLLECTIONS = [
  {
    id: 'kayoo-archive',
    title: 'KAYOO Core Archive 2026',
    subtitle: 'Kampuchea Aspire Youth Original Outfit',
    tagline: 'Angkorian Stone Heritage Meets Raw Urban Streetwear',
    description: 'Conceived in Cambodia, the KAYOO collection fuses ancient Khmer architectural heritage with contemporary youth streetwear. Heavyweight boxy silhouettes, bold starburst iconography, and authentic self-expression.',
    season: 'Core Drop 2026',
    heroImage: '/products/kayoo-tee-temple.jpeg',
    thumbnail: '/products/kayoo-tee-mirror.jpeg',
    curatedProductIds: ['prod-kayoo-tee', 'prod-kayoo-jersey', 'prod-kayoo-temple', 'prod-kayoo-joggers']
  },
  {
    id: 'underground-drift',
    title: 'Underground Tuner & Drift Capsule',
    subtitle: 'Automotive Street Division',
    tagline: 'Dropped Shoulders, Speedway Red, & Raw Concrete',
    description: 'Photographed in metropolitan underground subterranean garages. Boxy cuts engineered with high-density 320GSM cotton built to endure the vibration of midnight street culture.',
    season: 'Garage Series 2026',
    heroImage: '/products/kayoo-tee-car-front.jpeg',
    thumbnail: '/products/kayoo-tee-car-back.jpeg',
    curatedProductIds: ['prod-kayoo-garage', 'prod-kayoo-shorts', 'prod-kayoo-cap']
  },
  {
    id: 'angkor-sanctuary',
    title: 'Angkor Sanctuary Heritage Drop',
    subtitle: 'Sacred Stone Collective',
    tagline: 'Monumental Bas-Reliefs & Khmer Cultural Pride',
    description: 'Shot on location upon the sacred stairways and ancient stone sandstone carvings of Angkor Wat, honoring our roots and timeless youth resilience.',
    season: 'Heritage Drop',
    heroImage: '/products/kayoo-tee-temple.jpeg',
    thumbnail: '/products/IMG_90E839521ACA-1.jpeg',
    curatedProductIds: ['prod-kayoo-temple', 'prod-kayoo-tee', 'prod-kayoo-jersey']
  },
  {
    id: 'lakeside-solitude',
    title: 'Tonle Sap Waterside Retreat',
    subtitle: 'Lakeside Breeze Capsule',
    tagline: 'Water Pavilion Fluidity & Relaxed Oversized Drape',
    description: 'Tranquil moments suspended over open waters. The breathable custom-carded weave allows effortless airflow while retaining its signature boxy silhouette.',
    season: 'Summer Archive',
    heroImage: '/products/kayoo-tee-lake.jpeg',
    thumbnail: '/products/IMG_90E839521ACA-17.jpeg',
    curatedProductIds: ['prod-kayoo-lake', 'prod-kayoo-tee']
  },
  {
    id: 'hanuman-performance',
    title: 'King of Hanuman Athletic Series',
    subtitle: 'Official Performance Drop',
    tagline: 'Cambodian Kbach Motifs & Hydro-Wick Jacquard',
    description: 'Honoring the strength and agility of Hanuman. Intricate geometric stone temple motifs sublimated into high-performance sportswear for the pitch and the street.',
    season: 'Sport Capsule',
    heroImage: '/products/kayoo-jersey-hanuman.jpeg',
    thumbnail: '/products/kayoo-jersey-hanuman.jpeg',
    curatedProductIds: ['prod-kayoo-jersey', 'prod-kayoo-joggers']
  },
  {
    id: 'nocturnal-run',
    title: 'Nocturnal Alleyway "Phantom Run"',
    subtitle: 'Midnight Neon Syndicate',
    tagline: 'Pitch-Black Obsidian Dyes & High-Vis Starburst',
    description: 'Documenting the crew as they navigate the shadowed back-alleys and neon thoroughfares of the capital after dark.',
    season: 'Midnight Capsule',
    heroImage: '/products/kayoo-night-walk.jpeg',
    thumbnail: '/products/IMG_90E839521ACA-2.jpeg',
    curatedProductIds: ['prod-kayoo-night', 'prod-kayoo-cargo', 'prod-kayoo-cap']
  }
];

export const PRODUCTS = [
  {
    id: 'prod-kayoo-tee',
    sku: 'KY-TEE-001',
    name: 'KAYOO Starburst "Rock-On" Heavyweight Oversized Tee',
    category: 'tops',
    gender: 'unisex',
    price: 28,
    compareAtPrice: 38,
    isSale: true,
    isNew: true,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 54,
    badge: 'FLAGSHIP ICON',
    summary: 'Boxy streetwear silhouette in 320GSM combed cotton featuring the signature lilac KA🤟OO chest insignia and giant back starburst graphic.',
    description: 'The definitive hallmark piece of the KAYOO (Kampuchea Aspire Youth Original Outfit) archive. Photographed on location from the ancient stone stairways of Angkor Wat to neon-lit city corridors. Engineered with an architectural dropped-shoulder cut, ultra-dense 320GSM carded cotton, and a 3.5cm double-ribbed crew neckline that retains its shape indefinitely. Front features the lilac "KA🤟OO" hand-sign graphic, while the back commands attention with the colossal high-density silkscreen starburst crest.',
    materials: '100% Ultra-Heavyweight Combed Organic Cotton (320 GSM). Pre-shrunk garment wash. Flexible crack-resistant plastisol & puff-ink silkscreen prints.',
    care: 'Machine wash cold inside out with similar dark colors. Do not iron directly on silkscreen graphics. Line dry in shade to preserve deep obsidian hue.',
    stock: 58,
    images: [
      '/products/kayoo-tee-duo.jpeg',
      '/products/kayoo-tee-mirror.jpeg',
      '/products/kayoo-tee-stairs.jpeg',
      '/products/IMG_90E839521ACA-7.jpeg',
      '/products/IMG_90E839521ACA-12.jpeg',
      '/products/kayoo-tee-stairs-portrait.jpeg'
    ],
    colors: [
      { name: 'Obsidian Black & Electric Lilac', hex: '#121214' }
    ],
    sizes: [
      { size: 'S', stock: 12 },
      { size: 'M', stock: 24 },
      { size: 'L', stock: 16 },
      { size: 'XL', stock: 6 }
    ],
    collections: ['kayoo-archive', 'angkor-sanctuary'],
    hotspots: [
      { id: 'h1', x: 50, y: 35, title: 'KA🤟OO Lilac Chest Insignia', desc: 'High-density screen-printed rock-on hand graphic in signature electric lilac.' },
      { id: 'h2', x: 50, y: 55, title: 'Colossal Back Starburst Crest', desc: 'Oversized silkscreen starburst artwork engineered across the upper back and shoulder blades.' },
      { id: 'h3', x: 50, y: 80, title: '320GSM Heavyweight Combed Cotton', desc: 'Custom dense knit provides a structured, drape-retaining boxy streetwear silhouette.' }
    ]
  },
  {
    id: 'prod-kayoo-jersey',
    sku: 'KY-JSY-002',
    name: 'KAYOO Official Athletic Jersey — "King of Hanuman"',
    category: 'tops',
    gender: 'unisex',
    price: 11.49,
    compareAtPrice: 15.00,
    isSale: true,
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 39,
    badge: 'OFFICIAL DROP',
    summary: 'Official performance sport polo jersey featuring authentic Khmer Kbach background motif, King of Hanuman crest, and electric violet aerodynamic trim.',
    description: 'The official Kampuchea Aspire Youth Original Outfit (KAYOO) "King of Hanuman" sport performance polo jersey. Designed as a wearable cultural tribute, this jersey marries ancient Angkorian decorative Kbach motifs with modern aerodynamic racing lines. Features a structured rib-knit polo collar, moisture-wicking jacquard mesh for tropical climates, vivid purple side-body accents, and bold "KING OF HANUMAN" typographic back detailing.',
    materials: '100% Breathable Micro-Mesh Performance Polyester with Hydro-Wick finish. Full sublimation print with fade-proof Japanese inks.',
    care: 'Cold gentle cycle. Do not bleach. Air dry only. No iron needed.',
    stock: 82,
    images: [
      '/products/kayoo-jersey-hanuman.jpeg'
    ],
    colors: [
      { name: 'Onyx Black & Electric Violet', hex: '#1E192B' }
    ],
    sizes: [
      { size: 'S', stock: 15 },
      { size: 'M', stock: 35 },
      { size: 'L', stock: 22 },
      { size: 'XL', stock: 10 }
    ],
    collections: ['hanuman-performance', 'kayoo-archive'],
    hotspots: [
      { id: 'h1', x: 42, y: 38, title: 'King of Hanuman Crest', desc: 'Shield emblem honoring Hanuman, the symbol of courage, agility, and Cambodian folklore.' },
      { id: 'h2', x: 50, y: 55, title: 'Traditional Khmer Kbach Motif', desc: 'Subtle all-over geometric stone temple lattice pattern sublimated in tonal charcoal.' },
      { id: 'h3', x: 50, y: 85, title: 'Kampuchea Aspire Youth Emblem', desc: 'Official brand signature marking genuine cultural youth design.' }
    ]
  },
  {
    id: 'prod-kayoo-temple',
    sku: 'KY-TEE-003',
    name: 'KAYOO "Angkor Sanctuary" Heritage Edition Tee',
    category: 'tops',
    gender: 'unisex',
    price: 32,
    compareAtPrice: 42,
    isSale: true,
    isNew: true,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 42,
    badge: 'LIMITED RUN',
    summary: 'Historic collective edition photographed on the sacred stone stairways of Angkor Wat with full crew.',
    description: 'Immortalized at the crown of Angkor Wat. This heritage edition celebrates unity, pride, and Cambodian youth identity against a backdrop of ancient stone bas-reliefs. Features reinforced collar tape and an oversized cut that commands presence in any setting.',
    materials: '100% Premium Combed Cotton (320 GSM). Eco-dyed organic inks.',
    care: 'Cold wash inside out. Hang dry in shade.',
    stock: 24,
    images: [
      '/products/kayoo-tee-temple.jpeg',
      '/products/IMG_90E839521ACA-1.jpeg',
      '/products/kayoo-tee-duo.jpeg'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#121214' }
    ],
    sizes: [
      { size: 'S', stock: 6 },
      { size: 'M', stock: 10 },
      { size: 'L', stock: 6 },
      { size: 'XL', stock: 2 }
    ],
    collections: ['angkor-sanctuary', 'kayoo-archive']
  },
  {
    id: 'prod-kayoo-garage',
    sku: 'KY-TEE-004',
    name: 'KAYOO "Red Horizon" Underground Drift Tee',
    category: 'tops',
    gender: 'unisex',
    price: 29,
    compareAtPrice: 36,
    isSale: true,
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 31,
    badge: 'GARAGE EDITION',
    summary: 'Underground tuner shoot pairing the dropped-shoulder tee with automotive street culture.',
    description: 'Engineered for night runs and subterranean garage meets. Styled alongside high-gloss automotive machinery, the heavyweight boxy drape gives a bold stance that maintains clean lines from every perspective.',
    materials: '320GSM Heavyweight Combed Cotton. Silkscreen puff ink detailing.',
    care: 'Cold wash. Dry flat.',
    stock: 33,
    images: [
      '/products/kayoo-tee-car-front.jpeg',
      '/products/kayoo-tee-car-back.jpeg',
      '/products/IMG_90E839521ACA-5.jpeg',
      '/products/IMG_90E839521ACA-6.jpeg',
      '/products/IMG_90E839521ACA-4.jpeg'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#121214' }
    ],
    sizes: [
      { size: 'S', stock: 8 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 7 },
      { size: 'XL', stock: 3 }
    ],
    collections: ['underground-drift']
  },
  {
    id: 'prod-kayoo-lake',
    sku: 'KY-TEE-005',
    name: 'KAYOO "Lakeside Solitude" Dual-Silhouette Tee',
    category: 'tops',
    gender: 'unisex',
    price: 28,
    compareAtPrice: null,
    isSale: false,
    isNew: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 27,
    badge: 'RETREAT DROP',
    summary: 'Lakeside pavilion editorial highlighting the relaxed silhouette and all-weather drape over open water.',
    description: 'A serene study in contrast: heavy streetwear silhouette set against peaceful ripples and bamboo floating huts. The breathable cotton provides pure thermal comfort across tropical days and breezy twilights.',
    materials: '100% Breathable Combed Cotton (320 GSM). Pre-washed softness.',
    care: 'Machine wash cold. Do not tumble dry.',
    stock: 29,
    images: [
      '/products/kayoo-tee-lake.jpeg',
      '/products/IMG_90E839521ACA-17.jpeg',
      '/products/IMG_90E839521ACA-18.jpeg'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#121214' }
    ],
    sizes: [
      { size: 'S', stock: 7 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 8 },
      { size: 'XL', stock: 2 }
    ],
    collections: ['lakeside-solitude', 'kayoo-archive']
  },
  {
    id: 'prod-kayoo-joggers',
    sku: 'KY-BTM-006',
    name: 'KAYOO Pure-Chalk Heavyweight Street Joggers',
    category: 'trousers',
    gender: 'unisex',
    price: 38,
    compareAtPrice: 48,
    isSale: true,
    isNew: true,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 46,
    badge: 'KAYOO STREET BOTTOMS',
    summary: 'Tailored white fleece sweatpants engineered with gathered ankle cuffs and architectural drape.',
    description: 'The definitive bottom piece seen across our flagship lookbook shoots. Cut from high-density 380GSM cotton fleece with a structured elasticated waistband, tonal drawstrings, deep welt hand pockets, and ribbed taper cuffs that frame low and high-top sneakers with razor-sharp definition.',
    materials: '100% Dense Brushed French Terry Cotton (380 GSM). Pre-shrunk chalk white dye.',
    care: 'Wash cold with whites only. Do not bleach. Tumble dry gentle.',
    stock: 40,
    images: [
      '/products/IMG_90E839521ACA-13.jpeg',
      '/products/IMG_90E839521ACA-21.jpeg',
      '/products/IMG_90E839521ACA-24.jpeg',
      '/products/IMG_90E839521ACA-12.jpeg'
    ],
    colors: [
      { name: 'Pure Chalk White', hex: '#F6F6F4' }
    ],
    sizes: [
      { size: 'S', stock: 10 },
      { size: 'M', stock: 16 },
      { size: 'L', stock: 11 },
      { size: 'XL', stock: 3 }
    ],
    collections: ['kayoo-archive', 'hanuman-performance']
  },
  {
    id: 'prod-kayoo-shorts',
    sku: 'KY-BTM-007',
    name: 'KAYOO Vintage Acid-Wash Denim Skater Shorts',
    category: 'trousers',
    gender: 'unisex',
    price: 34,
    compareAtPrice: 44,
    isSale: true,
    isNew: false,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 38,
    badge: 'SUMMER DROP',
    summary: 'Light indigo knee-length washed denim shorts with raw finished hems and relaxed skate fit.',
    description: 'Worn by the crew in both underground garage and Angkor temple campaigns. Cut roomy through the thigh to hit just at the knee, featuring 13oz premium ring-spun cotton denim with genuine stone-wash fading and custom copper hardware.',
    materials: '100% Heavy Ring-Spun Cotton Denim (13 oz). Antique brass button fly.',
    care: 'Cold wash. Line dry in shade.',
    stock: 25,
    images: [
      '/products/IMG_90E839521ACA-4.jpeg',
      '/products/IMG_90E839521ACA-1.jpeg'
    ],
    colors: [
      { name: 'Washed Light Indigo', hex: '#8FA9C4' }
    ],
    sizes: [
      { size: '28', stock: 5 },
      { size: '30', stock: 8 },
      { size: '32', stock: 9 },
      { size: '34', stock: 3 }
    ],
    collections: ['underground-drift', 'kayoo-archive']
  },
  {
    id: 'prod-kayoo-cargo',
    sku: 'KY-BTM-008',
    name: 'KAYOO Tactical Concrete Cargo Trousers',
    category: 'trousers',
    gender: 'unisex',
    price: 42,
    compareAtPrice: 52,
    isSale: true,
    isNew: false,
    isFeatured: false,
    rating: 4.8,
    reviewCount: 22,
    badge: 'UTILITY ARCHIVE',
    summary: 'Relaxed khaki cargo trousers with articulated knees, skate aesthetic, and durable ripstop cotton.',
    description: 'Featured in our concrete overhead flatlay editorial. Crafted with dual pleated bellows cargo pockets, reinforced knee stitching, and an internal ankle bungee for custom tapered or straight leg stacking over skate shoes.',
    materials: '100% Cotton Ripstop (260 GSM). Heavy-duty YKK zipper.',
    care: 'Machine wash cold. Hang dry.',
    stock: 18,
    images: [
      '/products/kayoo-tee-flatlay.jpeg',
      '/products/IMG_90E839521ACA-15.jpeg'
    ],
    colors: [
      { name: 'Washed Sandstone Khaki', hex: '#B5A995' }
    ],
    sizes: [
      { size: '28', stock: 4 },
      { size: '30', stock: 6 },
      { size: '32', stock: 5 },
      { size: '34', stock: 3 }
    ],
    collections: ['nocturnal-run']
  },
  {
    id: 'prod-kayoo-cap',
    sku: 'KY-ACC-009',
    name: 'KAYOO "Shark Crest" Embroidered Stealth Cap',
    category: 'accessories',
    gender: 'unisex',
    price: 18,
    compareAtPrice: 24,
    isSale: true,
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 51,
    badge: 'STREET ESSENTIAL',
    summary: 'Structured 6-panel black cotton twill dad cap featuring embroidered white shark insignia and antique brass clasp.',
    description: 'The signature headwear piece worn by our models across the stairs, car, and architectural mirror lookbook series. Tailored with a low-crown profile, pre-curved brim, embroidered eyelets for breathability, and an adjustable self-fabric strap with custom matte-metal buckle.',
    materials: '100% Heavy Brushed Cotton Twill. High-density 3D satin embroidery.',
    care: 'Spot clean with damp cloth. Air dry.',
    stock: 65,
    images: [
      '/products/IMG_90E839521ACA-21.jpeg',
      '/products/IMG_90E839521ACA-13.jpeg',
      '/products/IMG_90E839521ACA-5.jpeg'
    ],
    colors: [
      { name: 'Pitch Black & White Crest', hex: '#121214' }
    ],
    sizes: [
      { size: 'One Size (Adjustable)', stock: 65 }
    ],
    collections: ['underground-drift', 'nocturnal-run']
  },
  {
    id: 'prod-kayoo-night',
    sku: 'KY-TEE-010',
    name: 'KAYOO "Midnight Phantom" Alleyway Boxy Tee',
    category: 'tops',
    gender: 'unisex',
    price: 30,
    compareAtPrice: 38,
    isSale: true,
    isNew: true,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 34,
    badge: 'NOCTURNAL DROP',
    summary: 'Cinematic nocturnal alleyway piece with high-visibility starburst back artwork and stealth chest badge.',
    description: 'Documenting the crew as they navigate the shadowed alleys and neon corridors of Phnom Penh after midnight. Extra-wide dropped shoulders and dense 320GSM cotton ensure that the silhouette never falters in low-light environments.',
    materials: '100% Super-Carded Cotton (320 GSM). Light-reactive plastisol inks.',
    care: 'Cold wash. Line dry in shade.',
    stock: 21,
    images: [
      '/products/kayoo-night-walk.jpeg',
      '/products/IMG_90E839521ACA-2.jpeg'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#121214' }
    ],
    sizes: [
      { size: 'S', stock: 5 },
      { size: 'M', stock: 9 },
      { size: 'L', stock: 5 },
      { size: 'XL', stock: 2 }
    ],
    collections: ['nocturnal-run']
  },
  {
    id: 'prod-kayoo-atrium',
    sku: 'KY-TEE-011',
    name: 'KAYOO Glass-Atrium Architectural Relaxed Tee',
    category: 'tops',
    gender: 'unisex',
    price: 28,
    compareAtPrice: 35,
    isSale: true,
    isNew: false,
    isFeatured: false,
    rating: 4.8,
    reviewCount: 19,
    badge: 'URBAN SILHOUETTE',
    summary: 'Modern glass atrium and botanical water garden shoot capturing pure streetwear proportions.',
    description: 'Shot in a tranquil glass atrium courtyard surrounded by lotus pools and orchids. Cut with wide arm openings and seamless lateral drape, creating an effortless transition from casual lounge to city gallery.',
    materials: '100% Dense Combed Cotton (320 GSM). Seamless tubular torso knit.',
    care: 'Machine wash cold. Dry flat.',
    stock: 28,
    images: [
      '/products/kayoo-tee-courtyard.jpeg',
      '/products/IMG_90E839521ACA-14.jpeg',
      '/products/IMG_90E839521ACA-23.jpeg'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#121214' }
    ],
    sizes: [
      { size: 'S', stock: 6 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 7 },
      { size: 'XL', stock: 3 }
    ],
    collections: ['kayoo-archive']
  },
  {
    id: 'prod-kayoo-jeans',
    sku: 'KY-BTM-012',
    name: 'KAYOO Seam-Treated Straight-Leg Light Denim',
    category: 'trousers',
    gender: 'unisex',
    price: 45,
    compareAtPrice: 58,
    isSale: true,
    isNew: false,
    isFeatured: false,
    rating: 4.9,
    reviewCount: 25,
    badge: 'CORE DENIM',
    summary: 'Vintage mineral-washed straight leg jeans with center seam front detailing and relaxed break over sneakers.',
    description: 'Pioneering structural street denim. Features an architectural pinched center vertical seam running down each leg, giving an elongated silhouette that breaks cleanly over retro court sneakers. Heavy 13.5oz ring-spun denim with soft washed hand.',
    materials: '100% Premium Cotton Denim (13.5 oz). Custom debossed KAYOO leather back patch.',
    care: 'Wash cold inside out. Hang dry to maintain structural center crease.',
    stock: 19,
    images: [
      '/products/IMG_90E839521ACA-22.jpeg',
      '/products/IMG_90E839521ACA-6.jpeg'
    ],
    colors: [
      { name: 'Mineral Stone Wash', hex: '#9BB2C9' }
    ],
    sizes: [
      { size: '28', stock: 3 },
      { size: '30', stock: 6 },
      { size: '32', stock: 7 },
      { size: '34', stock: 3 }
    ],
    collections: ['kayoo-archive']
  }
];

export const LOOKBOOK_LOOKS = [
  {
    id: 'look-kayoo-temple',
    title: 'Look 01: Angkorian Youth Heritage Collective',
    season: 'KAYOO Core Drop 2026',
    editorialImage: '/products/kayoo-tee-temple.jpeg',
    location: 'Angkor Wat Ancient Sanctuary Steps, Siem Reap',
    photographer: 'KAYOO Youth Collective',
    pins: [
      { x: 50, y: 52, productId: 'prod-kayoo-tee', label: 'KAYOO Starburst Tee', price: '$28' },
      { x: 74, y: 68, productId: 'prod-kayoo-temple', label: 'Angkor Sanctuary Edition', price: '$32' }
    ]
  },
  {
    id: 'look-kayoo-mirror',
    title: 'Look 02: Duality & Architectural Reflection',
    season: 'KAYOO Core Drop 2026',
    editorialImage: '/products/kayoo-tee-mirror.jpeg',
    location: 'Contemporary Gallery Promenade',
    photographer: 'KAYOO Visuals',
    pins: [
      { x: 52, y: 48, productId: 'prod-kayoo-tee', label: 'KAYOO Starburst Tee (Back Graphic)', price: '$28' },
      { x: 28, y: 50, productId: 'prod-kayoo-joggers', label: 'Pure-Chalk Joggers', price: '$38' }
    ]
  },
  {
    id: 'look-kayoo-car',
    title: 'Look 03: Underground Tuner & Garage Meets',
    season: 'KAYOO Core Drop 2026',
    editorialImage: '/products/kayoo-tee-car-back.jpeg',
    location: 'Metropolitan Underground Level P1',
    photographer: 'KAYOO Street Division',
    pins: [
      { x: 62, y: 45, productId: 'prod-kayoo-garage', label: 'Red Horizon Drift Tee', price: '$29' }
    ]
  },
  {
    id: 'look-kayoo-lake',
    title: 'Look 04: Twilight Floating Pavilion',
    season: 'KAYOO Core Drop 2026',
    editorialImage: '/products/kayoo-tee-lake.jpeg',
    location: 'Tonle Sap Waterside, Cambodia',
    photographer: 'KAYOO Visuals',
    pins: [
      { x: 42, y: 62, productId: 'prod-kayoo-lake', label: 'Lakeside Solitude Tee', price: '$28' },
      { x: 66, y: 64, productId: 'prod-kayoo-tee', label: 'KAYOO Starburst Tee', price: '$28' }
    ]
  },
  {
    id: 'look-kayoo-courtyard',
    title: 'Look 05: Modern Courtyard Glass Promenade',
    season: 'KAYOO Core Drop 2026',
    editorialImage: '/products/kayoo-tee-courtyard.jpeg',
    location: 'Urban Botanical Atrium & Lotus Pool',
    photographer: 'KAYOO Visuals',
    pins: [
      { x: 50, y: 45, productId: 'prod-kayoo-atrium', label: 'Glass-Atrium Relaxed Tee', price: '$28' },
      { x: 50, y: 78, productId: 'prod-kayoo-joggers', label: 'Pure-Chalk Joggers', price: '$38' }
    ]
  },
  {
    id: 'look-kayoo-night',
    title: 'Look 06: Nocturnal Alleyway Crew Syndicate',
    season: 'KAYOO Core Drop 2026',
    editorialImage: '/products/kayoo-night-walk.jpeg',
    location: 'Downtown Alleyway Phantom Run',
    photographer: 'KAYOO Street Syndicate',
    pins: [
      { x: 50, y: 60, productId: 'prod-kayoo-night', label: 'Midnight Phantom Tee', price: '$30' }
    ]
  }
];

export const REVIEWS = [
  {
    id: 'rev-ky-1',
    productId: 'prod-kayoo-tee',
    author: 'Vireak K.',
    rating: 5,
    date: '2026-03-29',
    verified: true,
    title: 'The weight and drape are unreal — proud to wear KAYOO',
    comment: 'The 320GSM cotton holds that perfect boxy drape without sagging. The back starburst print with the rock-on symbol gets stopped on the street everywhere in Phnom Penh and Siem Reap. Collar doesn’t bacon after multiple cold washes.',
    fitFeedback: 'True to oversized streetwear cut — order standard size for intended drape.'
  },
  {
    id: 'rev-ky-2',
    productId: 'prod-kayoo-tee',
    author: 'Sophea N.',
    rating: 5,
    date: '2026-03-24',
    verified: true,
    title: 'Insane quality silkscreen and breathable heavy cotton',
    comment: 'Bought this after seeing the photoshoot at Angkor Wat. The contrast between the deep obsidian fabric and the electric lilac starburst hand is phenomenal.',
    fitFeedback: 'Boxy relaxed fit.'
  },
  {
    id: 'rev-ky-3',
    productId: 'prod-kayoo-jersey',
    author: 'Chan Dara',
    rating: 5,
    date: '2026-03-27',
    verified: true,
    title: 'Masterpiece jersey — King of Hanuman detailing is legendary',
    comment: 'The Khmer traditional kbach pattern woven into the dark mesh background is so subtle and sick. Moisture wicking works great in hot weather and the purple accents look electric on the pitch.',
    fitFeedback: 'Athletic true-to-size fit.'
  },
  {
    id: 'rev-ky-4',
    productId: 'prod-kayoo-joggers',
    author: 'Rothana M.',
    rating: 5,
    date: '2026-03-20',
    verified: true,
    title: 'Cleanest white sweatpants on the market',
    comment: 'Super thick 380GSM fleece that isn’t see-through at all. The taper cuff stacks perfectly on Dunk Lows and Jordans.',
    fitFeedback: 'True to size.'
  },
  {
    id: 'rev-ky-5',
    productId: 'prod-kayoo-garage',
    author: 'Tola S.',
    rating: 5,
    date: '2026-03-15',
    verified: true,
    title: 'Streetwear staple for car meets',
    comment: 'The puff ink on the back graphic pops when camera flash hits it. 10/10 boxy cut.',
    fitFeedback: 'Oversized fit.'
  },
  {
    id: 'rev-ky-6',
    productId: 'prod-kayoo-cap',
    author: 'Piseth B.',
    rating: 5,
    date: '2026-03-11',
    verified: true,
    title: 'Shark embroidery is crisp and subtle',
    comment: 'Great low-profile dad cap. Wears it daily with the starburst tee.',
    fitFeedback: 'Adjustable fit.'
  }
];

export const MOCK_ORDERS = [
  {
    id: 'KY-8921-FX',
    orderNumber: 'KY-8921',
    date: '2026-03-24',
    status: 'In Transit',
    timelineStep: 3,
    carrier: 'KAYOO Express Courier',
    trackingNumber: '7829-0192-4821',
    estimatedDelivery: 'March 30, 2026',
    items: [
      {
        id: 'prod-kayoo-tee',
        name: 'KAYOO Starburst "Rock-On" Heavyweight Oversized Tee',
        color: 'Obsidian Black & Electric Lilac',
        size: 'L',
        price: 28,
        quantity: 1,
        image: '/products/kayoo-tee-duo.jpeg'
      },
      {
        id: 'prod-kayoo-jersey',
        name: 'KAYOO Official Athletic Jersey — "King of Hanuman"',
        color: 'Onyx Black & Electric Violet',
        size: 'M',
        price: 11.49,
        quantity: 1,
        image: '/products/kayoo-jersey-hanuman.jpeg'
      }
    ],
    shippingAddress: {
      fullName: 'Vireak Kem',
      address1: 'No. 42 Street 214, Daun Penh',
      city: 'Phnom Penh',
      state: 'Phnom Penh',
      postalCode: '120207',
      country: 'Cambodia'
    },
    subtotal: 39.49,
    discount: 3.95,
    shippingFee: 0,
    tax: 3.55,
    total: 39.09,
    paymentMethod: 'ABA PAY / KHQR'
  }
];

export const PROMO_CODES = [
  { code: 'KAYOO10', discountPercent: 10, description: '10% off your entire order' },
  { code: 'AURA10', discountPercent: 10, description: '10% off your entire order' },
  { code: 'KAYOO20', discountPercent: 20, description: '20% off for core community members' },
  { code: 'FREESHIP', freeShipping: true, description: 'Complimentary courier shipping on all orders over $50' }
];

export const STORES = [
  {
    city: 'Phnom Penh',
    name: 'KAYOO Flagship Studio & Concept Space',
    address: 'Bassac Lane & Street 308, Chamkarmon, Phnom Penh, Cambodia',
    hours: 'Daily: 10:00 – 21:00',
    phone: '+855 23 888 919',
    email: 'studio@kayoo-cambodia.com'
  },
  {
    city: 'Siem Reap',
    name: 'KAYOO Angkor Heritage Residency',
    address: 'Old Market Area, Pokambor Ave, Krong Siem Reap, Cambodia',
    hours: 'Daily: 09:30 – 22:00',
    phone: '+855 63 969 008',
    email: 'angkor@kayoo-cambodia.com'
  }
];

export const FAQS = [
  {
    category: 'Orders & Shipping',
    question: 'How fast is courier delivery across Cambodia and worldwide?',
    answer: 'Same-day or next-day delivery across Phnom Penh via local courier. 1–2 business days to provinces across Cambodia (Siem Reap, Battambang, Sihanoukville). Worldwide priority courier delivery via DHL Express takes 3–5 business days.'
  },
  {
    category: 'Orders & Shipping',
    question: 'What payment methods do you accept?',
    answer: 'We accept ABA PAY, KHQR, Cash on Delivery (COD) across Cambodia, as well as Visa, Mastercard, and Apple Pay for international collectors.'
  },
  {
    category: 'Sizing & Tailoring',
    question: 'How do KAYOO oversized silhouettes fit?',
    answer: 'Our tees are cut with an intentional boxy dropped-shoulder streetwear fit using ultra-dense 320GSM cotton. If you prefer a relaxed oversized drape, choose your standard size. If you prefer a fitted look, consider sizing down one notch.'
  },
  {
    category: 'Craftsmanship & Ethics',
    question: 'Where are KAYOO pieces crafted?',
    answer: 'KAYOO garments are proudly developed in Cambodia using custom-milled 320GSM combed cotton, high-density silkscreen printing, and precision technical embroidery.'
  }
];

export const DEMO_USER = {
  name: 'Vireak Kem',
  email: 'vireak.kem@kayoo.com',
  memberSince: '2026',
  loyaltyTier: 'KAYOO Syndicate Member',
  points: 480,
  nextTierPoints: 1000,
  phone: '+855 (12) 345-678',
  defaultAddress: {
    fullName: 'Vireak Kem',
    address1: 'No. 42 Street 214, Daun Penh',
    city: 'Phnom Penh',
    state: 'Phnom Penh',
    postalCode: '120207',
    country: 'Cambodia'
  },
  savedCards: [
    { id: 'card-1', brand: 'ABA KHQR', last4: '8821', exp: '12/28', default: true }
  ]
};
