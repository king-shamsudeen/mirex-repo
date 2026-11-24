import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'santal-imperial',
    number: 'No. 01',
    name: 'Santal Impérial',
    frenchTitle: 'Sable d’Or',
    family: 'Woody & Amber',
    subtitle: 'Creamy Mysore Sandalwood & Golden Sunlit Amber',
    description: 'A distinguished, warm architectural fragrance built upon aged Mysore sandalwood, spiced cardamom, and golden amber resins.',
    story: 'Inspired by warm Mediterranean stone bathed in twilight warmth. It opens with bright Sicilian bergamot and dry cardamom, unfolding into a creamy heart of iris concrete before resting on rich Australian sandalwood and aged amber crystals.',
    variants: [
      { volume: '50ml', price: 135 },
      { volume: '100ml', price: 195 },
      { volume: '10ml Travel', price: 42 }
    ],
    defaultVolume: '100ml',
    image: '/src/assets/images/perfume_santal_imperial_1794472843058.jpg',
    pyramid: {
      top: ['Cardamom Pods', 'Calabrian Bergamot', 'Violet Leaves'],
      heart: ['Tuscan Iris Concrete', 'Papyrus', 'Moroccan Cedarwood'],
      base: ['Mysore Sandalwood', 'Ambergris Accord', 'Bourbon Amber']
    },
    longevity: '14 - 18 Hours',
    sillage: 'Enveloping & Sophisticated',
    concentration: 'Extrait de Parfum (32% Oil)',
    inStock: true,
    stockNote: 'Ready to Dispatch · Batch No. 08',
    featured: true
  },
  {
    id: 'oud-nocturne',
    number: 'No. 02',
    name: 'Oud Nocturne',
    frenchTitle: 'Ambre Nuit',
    family: 'Smoky Oud',
    subtitle: 'Smoked Cambodian Agarwood, Saffron & Black Amber',
    description: 'An alluring evening statement scent. Hypnotic Cambodian oud steeped in crimson saffron and dark honeyed resins.',
    story: 'A dark, sensual masterwork crafted for after-hours elegance. Pure wild agarwood is married with smoky incense smoke and precious Iranian saffron, mellowed by rich Madagascar vanilla pods and black amber.',
    variants: [
      { volume: '50ml', price: 155 },
      { volume: '100ml', price: 225 },
      { volume: '10ml Travel', price: 48 }
    ],
    defaultVolume: '100ml',
    image: '/src/assets/images/perfume_oud_nocturne_1794472842498.jpg',
    pyramid: {
      top: ['Iranian Red Saffron', 'Frankincense', 'Black Pepper'],
      heart: ['Damascus Rose Absolute', 'Wild Cambodian Oud', 'Cistus Labdanum'],
      base: ['Smoked Leather', 'Black Amber', 'Madagascar Vanilla Pods']
    },
    longevity: '18 - 24 Hours',
    sillage: 'Deep & Intoxicating',
    concentration: 'Extrait de Parfum (35% Oil)',
    inStock: true,
    stockNote: 'Rare Artisanal Batch · 7 Bottles Left',
    featured: true
  },
  {
    id: 'rose-ancienne',
    number: 'No. 03',
    name: 'Rose Ancienne & Pivoine',
    frenchTitle: 'Rose Impériale',
    family: 'Floral Elegance',
    subtitle: 'Centifolia Rose, Lychee Dew & Cashmere Musk',
    description: 'A modern, poetic floral fragrance capturing fresh morning dew on velvety Grasse rose petals and sun-warmed cashmere.',
    story: 'Harvested at dawn in Grasse, France. Centifolia rose petals are cold-extracted to preserve their fresh, natural green crispness, intertwined with peppery peony and settled on a skin-close bed of cashmere wood and sensual white musk.',
    variants: [
      { volume: '50ml', price: 125 },
      { volume: '100ml', price: 180 },
      { volume: '10ml Travel', price: 38 }
    ],
    defaultVolume: '50ml',
    image: '/src/assets/images/perfume_velvet_rose_1794472844184.jpg',
    pyramid: {
      top: ['Pink Pepper', 'Sweet Lychee', 'Crisp Pear Dew'],
      heart: ['Grasse Centifolia Rose', 'White Peony', 'Magnolia Petals'],
      base: ['Cashmere Wood', 'White Amber', 'Clean Velvet Musk']
    },
    longevity: '12 - 14 Hours',
    sillage: 'Airy & Romantic',
    concentration: 'Extrait de Parfum (28% Oil)',
    inStock: true,
    stockNote: 'In Stock · Ready to Dispatch',
    featured: true
  },
  {
    id: 'discovery-atelier',
    number: 'Collection',
    name: 'Discovery Atelier Trio',
    frenchTitle: 'Coffret Découverte',
    family: 'Discovery Sets',
    subtitle: 'The Signature Trinity (3 × 10ml Artisanal Vials)',
    description: 'Experience the full olfactory spectrum of MIREX SCENT before committing to a full-sized flacon. Includes luxury presentation box.',
    story: 'Hand-curated for the connoisseur. Three 10ml frosted glass atomizers featuring Santal Impérial, Oud Nocturne, and Rose Ancienne. Includes a voucher redeemable on WhatsApp towards any full 100ml bottle.',
    variants: [
      { volume: '3 × 10ml Set', price: 65 }
    ],
    defaultVolume: '3 × 10ml Set',
    image: '/src/assets/images/perfume_discovery_set_1794472844487.jpg',
    pyramid: {
      top: ['Curated Citrus & Spices', 'Morning Dew', 'Saffron'],
      heart: ['Tuscan Iris', 'Grasse Rose', 'Wild Agarwood'],
      base: ['Mysore Sandalwood', 'Black Amber', 'Cashmere Musk']
    },
    longevity: '12 - 24 Hours (Varied)',
    sillage: 'Versatile Day-to-Night',
    concentration: 'Pure Extrait de Parfum',
    inStock: true,
    stockNote: 'Popular Gift Set · In Stock',
    featured: true
  },
  {
    id: 'solstice-blanc',
    number: 'No. 04',
    name: 'Solstice Blanc & Ambre',
    frenchTitle: 'Solstice Doré',
    family: 'Woody & Amber',
    subtitle: 'French Clary Sage, Sunlit Amber & Sea Salt Driftwood',
    description: 'A luminous, clean warmth reminiscent of afternoon sunshine on sea-sprayed coastal cliffs and dried sun-baked woods.',
    story: 'Crafted for timeless everyday distinction. Crisp sage leaves blend with subtle sea-salt mineral notes and clean ambrette seeds, warming gradually into white amber and silky driftwood.',
    variants: [
      { volume: '50ml', price: 130 },
      { volume: '100ml', price: 190 },
      { volume: '10ml Travel', price: 40 }
    ],
    defaultVolume: '100ml',
    image: '/src/assets/images/hero_perfume_pedestal_1794472841165.jpg',
    pyramid: {
      top: ['Sunlit Clary Sage', 'Grapefruit Peel', 'Sea Mineral Accord'],
      heart: ['Ambrette Seed', 'Dried Thyme', 'Cedar Needle'],
      base: ['Warm Driftwood', 'White Amber', 'Skin Musks']
    },
    longevity: '12 - 16 Hours',
    sillage: 'Fresh & Lingering',
    concentration: 'Extrait de Parfum (30% Oil)',
    inStock: true,
    stockNote: 'In Stock · Ready to Dispatch'
  },
  {
    id: 'citrus-bergamote',
    number: 'No. 05',
    name: 'Bergamote & Néroli Vivant',
    frenchTitle: 'Éclat Solaire',
    family: 'Fresh Citrus',
    subtitle: 'Cold-Pressed Bergamot, Tunisian Neroli & Crisp Vetiver',
    description: 'An invigorating blast of sparkling citrus backed by noble woods and green orange blossoms that stays radiant all day.',
    story: 'Unlike fleeting traditional colognes, this high-concentration extrait anchors sparkling Mediterranean citrus with organic Haitian vetiver and warm musk so the uplifting freshness lasts beyond sunset.',
    variants: [
      { volume: '50ml', price: 115 },
      { volume: '100ml', price: 165 },
      { volume: '10ml Travel', price: 36 }
    ],
    defaultVolume: '50ml',
    image: '/src/assets/images/perfume_santal_imperial_1794472843058.jpg',
    pyramid: {
      top: ['Calabrian Bergamot', 'Bitter Orange Peel', 'Mint Leaf'],
      heart: ['Tunisian Neroli', 'Petitgrain', 'Orange Blossom'],
      base: ['Haitian Vetiver', 'Cedar Heart', 'Clean Ambergris']
    },
    longevity: '10 - 12 Hours',
    sillage: 'Crisp & Energizing',
    concentration: 'Extrait de Parfum (26% Oil)',
    inStock: true,
    stockNote: 'Fresh Batch · In Stock'
  }
];

export const SCENT_FAMILIES = [
  'All',
  'Woody & Amber',
  'Smoky Oud',
  'Floral Elegance',
  'Fresh Citrus',
  'Discovery Sets'
] as const;
