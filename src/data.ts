import { Product, Farmer, Service, PortfolioItem, Testimonial, BlogPost } from './types';

export const farmersData: Farmer[] = [
  {
    id: 'f1',
    name: 'John Miller',
    location: 'Green Valley, OR',
    specialty: 'Leafy Greens & Root Vegetables',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=400',
    bio: 'Third generation organic grower utilizing regenerative agriculture techniques that improve soil health year after year.',
    story: '“We refuse to use artificial pesticides. By switching to Natural Grocery, we went from selling at local weekend fairs to serving over 500 households, increasing our farm income by 40%.”',
    productsCount: 14,
    rating: 4.9,
    yearsPartnered: 5
  },
  {
    id: 'f2',
    name: 'Elena Rostova',
    location: 'Hood River, OR',
    specialty: 'Vine Fruits & Organic Berries',
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=400',
    bio: 'Passionate horticulturalist obsessed with maintaining natural orchards that buzz with organic bees, butterflies, and rich biodiversity.',
    story: '“Our sweet strawberries and honeycrisp apples have a shorter shelf-life because we let them ripen fully on the branch. Deliveries with Natural Grocery occur on the same day they are picked.”',
    productsCount: 10,
    rating: 4.8,
    yearsPartnered: 3
  },
  {
    id: 'f3',
    name: 'Marcus Vance',
    location: 'Sonoma Hills, CA',
    specialty: 'Grass-fed Dairy & Raw Honey',
    image: 'https://images.unsplash.com/photo-1500937386664-56d15943747d?auto=format&fit=crop&q=80&w=400',
    bio: 'Committed to happy cows, non-homogenized dairy, and maintaining wildflower meadows for a thriving honey bee population.',
    story: '“With direct farm-to-consumer delivery, we cut out three layers of grocery store middlemen. That savings is directly split between fairer prices for buyers and sustainable wages for our hands.”',
    productsCount: 8,
    rating: 4.9,
    yearsPartnered: 4
  },
  {
    id: 'f4',
    name: 'Sofia Chen',
    location: 'Yuba County, CA',
    specialty: 'Ancient Grains & Culinary Herbs',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    bio: 'Food scientist turned farmer, specializing in organic, heirloom grains and fresh-cut medical-grade seasoning herbs.',
    story: '“Scaling up wheatgrass and wild grains needs strict quality monitoring. Modern logistics from Natural Grocery helps us verify safe shipping temperature at every node.”',
    productsCount: 12,
    rating: 4.7,
    yearsPartnered: 2
  }
];

export const productsData: Product[] = [
  {
    id: 'p1',
    name: 'Organic Vine Ripe Tomatoes',
    category: 'Vegetables',
    price: 3.99,
    unit: 'lb',
    rating: 4.9,
    reviewCount: 124,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600',
    description: 'Freshly harvested, deeply fragrant field-grown red tomatoes. Kept on the vine for optimal sugar content and full, juicy tomato flavor.',
    farmName: 'Green Valley Farms',
    farmerId: 'f1',
    nutrition: {
      calories: '22 kcal',
      carbs: '4.8g',
      protein: '1.1g',
      fat: '0.2g'
    },
    inStock: true,
    isPopular: true
  },
  {
    id: 'p2',
    name: 'Crisp Organic Broccoli Crowns',
    category: 'Vegetables',
    price: 2.49,
    unit: 'bunch',
    rating: 4.8,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&q=80&w=600',
    description: 'High-fiber, mineral-rich deep green broccoli crowns of clean premium quality. Hand-harvested early in the morning cold.',
    farmName: 'Green Valley Farms',
    farmerId: 'f1',
    nutrition: {
      calories: '34 kcal',
      carbs: '6.6g',
      protein: '2.8g',
      fat: '0.4g'
    },
    inStock: true,
    isPopular: false
  },
  {
    id: 'p3',
    name: 'Sweet heirloom Carrots',
    category: 'Vegetables',
    price: 1.89,
    unit: 'bunch',
    rating: 4.7,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=600',
    description: 'Multi-colored heirloom carrot varieties. Incredibly crunchy, loaded with beta-carotene, and delightfully sweet.',
    farmName: 'Green Valley Farms',
    farmerId: 'f1',
    nutrition: {
      calories: '41 kcal',
      carbs: '9.6g',
      protein: '0.9g',
      fat: '0.2g'
    },
    inStock: true,
    isPopular: true
  },
  {
    id: 'p4',
    name: 'Organic Honeycrisp Apples',
    category: 'Fruits',
    price: 4.29,
    unit: 'lb',
    rating: 4.9,
    reviewCount: 204,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=600',
    description: 'The golden standard of crisp apples. Phenomenally sweet, delightfully tart, and super-hydrating. Direct from our late spring orchard trees.',
    farmName: 'Hood River Orchards',
    farmerId: 'f2',
    nutrition: {
      calories: '52 kcal',
      carbs: '14g',
      protein: '0.3g',
      fat: '0.2g'
    },
    inStock: true,
    isPopular: true
  },
  {
    id: 'p5',
    name: 'Fresh Organic Strawberries',
    category: 'Fruits',
    price: 4.99,
    unit: '16oz pack',
    rating: 4.6,
    reviewCount: 155,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=600',
    description: 'Plump, naturally sweet red strawberries. Grown strictly under compost and natural beneficial predator pest control, never synthetic chemicals.',
    farmName: 'Hood River Orchards',
    farmerId: 'f2',
    nutrition: {
      calories: '32 kcal',
      carbs: '7.7g',
      protein: '0.7g',
      fat: '0.3g'
    },
    inStock: true,
    isPopular: true
  },
  {
    id: 'p6',
    name: 'Organic Hass Avocados',
    category: 'Fruits',
    price: 5.49,
    unit: 'pack of 4',
    rating: 4.8,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=600',
    description: 'Rich, buttery Hass avocados. Arrive slightly firm and ready to ripen perfectly over your kitchen counter in 2-3 days.',
    farmName: 'Hood River Orchards',
    farmerId: 'f2',
    nutrition: {
      calories: '160 kcal',
      carbs: '8.5g',
      protein: '2.0g',
      fat: '14.7g'
    },
    inStock: true,
    isPopular: false
  },
  {
    id: 'p7',
    name: 'A-Grade Quinoa Grains',
    category: 'Grains',
    price: 3.49,
    unit: 'lb',
    rating: 4.7,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600',
    description: 'Triple-rinsed organic white quinoa grains. An incredible source of all nine essential body amino acids, perfect for healthy bowls.',
    farmName: 'Ancient Sown Co.',
    farmerId: 'f4',
    nutrition: {
      calories: '120 kcal',
      carbs: '21.3g',
      protein: '4.4g',
      fat: '1.9g'
    },
    inStock: true,
    isPopular: false
  },
  {
    id: 'p8',
    name: 'Spelt & Steel Cut Organic Oats',
    category: 'Grains',
    price: 2.99,
    unit: '24oz pack',
    rating: 4.8,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=600',
    description: 'Perfectly whole kernel organic oats with a delicious nutty flavor and dense chew texture. Keeps blood sugar clean and stable.',
    farmName: 'Ancient Sown Co.',
    farmerId: 'f4',
    nutrition: {
      calories: '150 kcal',
      carbs: '27g',
      protein: '5g',
      fat: '2.5g'
    },
    inStock: true,
    isPopular: false
  },
  {
    id: 'p9',
    name: 'Artisanal Golden Raw Honey',
    category: 'Honey & Natural Foods',
    price: 7.99,
    unit: '12oz jar',
    rating: 5.0,
    reviewCount: 230,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600',
    description: 'Raw, unpasteurized honey harvested carefully from wildflower hives. Rich in live enzyme complexes, pollen and natural anti-toxins.',
    farmName: 'Sonoma Pastures',
    farmerId: 'f3',
    nutrition: {
      calories: '64 kcal',
      carbs: '17g',
      protein: '0g',
      fat: '0g'
    },
    inStock: true,
    isPopular: true
  },
  {
    id: 'p10',
    name: 'A2 Grass-Fed Whole Milk',
    category: 'Dairy',
    price: 4.89,
    unit: 'half gal',
    rating: 4.9,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600',
    description: 'Rich, non-homogenized cream-top milk from certified Jersey cows pasture-grazed all year. Healthy A2 protein structure is pleasant on digestion systems.',
    farmName: 'Sonoma Pastures',
    farmerId: 'f3',
    nutrition: {
      calories: '150 kcal',
      carbs: '12g',
      protein: '8g',
      fat: '8g'
    },
    inStock: true,
    isPopular: true
  },
  {
    id: 'p11',
    name: 'Free-Range Forest Brown Eggs',
    category: 'Dairy',
    price: 5.99,
    unit: 'dozen',
    rating: 4.9,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=600',
    description: 'Eggs with deep, rich marigold yolks from hens authorized to forage freely on woodland pastures for grass, sprouts, insects, and clean seeds.',
    farmName: 'Sonoma Pastures',
    farmerId: 'f3',
    nutrition: {
      calories: '70 kcal',
      carbs: '0.6g',
      protein: '6g',
      fat: '5g'
    },
    inStock: true,
    isPopular: true
  },
  {
    id: 'p12',
    name: 'Sun-dried Ground Turmeric',
    category: 'Spices',
    price: 3.49,
    unit: '4oz jar',
    rating: 4.8,
    reviewCount: 65,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=600',
    description: 'Vibrant organic turmeric root, dried under pure solar heat and finely powdered. Extremely rich in active therapeutic curcumin.',
    farmName: 'Ancient Sown Co.',
    farmerId: 'f4',
    nutrition: {
      calories: '11 kcal',
      carbs: '2.2g',
      protein: '0.3g',
      fat: '0.1g'
    },
    inStock: true,
    isPopular: false
  }
];

export const servicesData: Service[] = [
  {
    id: 's1',
    title: 'Organic Fruits & Vegetables',
    description: 'Freshly harvested daily and immediately packed to keep the absolute biological peak flavor and health benefits.',
    iconName: 'Apple'
  },
  {
    id: 's2',
    title: 'Farm Fresh Dairy Products',
    description: 'Raw materials, non-homogenized cold milk, rich natural butter, and standard forest farm eggs of pasture graze quality.',
    iconName: 'Sparkles'
  },
  {
    id: 's3',
    title: 'Natural Grains & Pulses',
    description: 'Slow grown heirloom seed varieties, harvested using sustainable threshing methods and zero storage additives.',
    iconName: 'Wheat'
  },
  {
    id: 's4',
    title: 'Home Delivery Service',
    description: 'Clean eco-friendly electric vehicles deliver orders directly from farmers’ hubs to your doorstep within 8 hours.',
    iconName: 'Truck'
  },
  {
    id: 's5',
    title: 'Farmer Marketplace',
    description: 'A dedicated seller interface empowering small rural family homesteads to set their own fair marketplace prices.',
    iconName: 'Users'
  },
  {
    id: 's6',
    title: 'Bulk Orders for Businesses',
    description: 'Cost-saving scale packs for healthy workspace cafeterias, juice bars, craft bakeries, and organic bistro operations.',
    iconName: 'Briefcase'
  }
];

export const portfolioData: PortfolioItem[] = [
  {
    id: 'pt1',
    title: 'Restoring Hive Population',
    category: 'Biodiversity',
    metric: '2.4M Bees Saved',
    description: 'Through chemical-free organic farming practices across our partner acreage, we helped re-establish 40 active colonies in localized valleys.',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'pt2',
    title: 'Packaging Waste Reduction',
    category: 'Sustainability',
    metric: '18 Tons Plastic Avoided',
    description: 'By switching our full supply chain to zero-plastic compostable bags and reusable glass bottle deposits, we clean our land paths.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'pt3',
    title: 'Farmer Wealth Creation',
    category: 'Fair Wages',
    metric: '+38% Higher Income',
    description: 'Eliminating commercial wholesale distribution pipelines translates into record-high margins immediately payout to soil stewards.',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'pt4',
    title: 'Local Solar Deliveries',
    category: 'Decarbonization',
    metric: '-22,000 lbs CO2',
    description: 'Deploying optimized localized micro-delivery hubs powered by decentralized solar panels drastically reduces aggregate route miles.',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&q=80&w=400'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    name: 'Melissa Thorne',
    role: 'Customer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    content: '“The absolute difference in taste is mindblowing! The carrots are sweet like apples, and the whole dairy milk has that rich, delicious cream collar on top that reminds me of my grandmother’s dairy.”',
    location: 'Portland, OR'
  },
  {
    id: 't2',
    name: 'Dave & Amy Vance',
    role: 'Farmer',
    avatar: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    content: '“Natural Grocery made agricultural logistics simple. We receive orders on our dashboard at 5:00 AM, pick what is fresh, and load the clean delivery vans by 8:00 AM. It keeps our product in perfect quality!”',
    location: 'Sonoma Hills, CA'
  },
  {
    id: 't3',
    name: 'Chef Lucas Gregory',
    role: 'Business Owner',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    content: '“Sourcing heirloom herbs and farm vine tomatoes reliably at bulk scale used to be a weekly nightmare of calling 8 distinct farms. This catalog consolidates our organic kitchen flawlessly.”',
    location: 'San Francisco, CA'
  }
];

export const blogData: BlogPost[] = [
  {
    id: 'b1',
    title: 'How Regenerative Agriculture Protects Local Ecosystems',
    category: 'Organic Farming',
    excerpt: 'Deep-dive into the biological mechanics of cover cropping, low-till, and rotative grazing to combat climate erosion.',
    content: `Organic farming isn’t just about avoiding artificial herbicides; it is about building active life within our topsoil. Regenerative farming uses practices that restore biological activity.

### 1. The Carbon Sponge
Soils with high organic matter hold massive amounts of rainwater. This protects crops during hot summer droughts and prevents topsoil runoff during heavy spring torrents.

### 2. Multi-species cover cropping
By planting radish, oats, rye, and clover, farmers feed underground fungi networks. In turn, these soil organisms trade vital trace elements with crops.

### 3. Rotational Grazing
Moving cattle frequently simulates herds in nature, which naturally aerates soil and deposits nitrogen compost safely without burning young shoots.`,
    author: 'Sofia Chen',
    date: 'May 12, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b2',
    title: 'A Guide to Eating Nutrition by the Seasons',
    category: 'Seasonal Produce Guide',
    excerpt: 'Why raw foods harvested during their native seasonal window contain up to three times the micronutrient density.',
    content: `In our hyper-connected logistics world, you can buy strawberries in the cold depths of December. But nature designed specific nutrients for specific climates.

### Why Eat Seasonally?
* **Pristine Micronutrients:** Out-of-season produce is picked green and spent weeks in low-oxygen chilling containers, depleting vitamins B and C.
* **Gut Health Boost:** Rotating foods naturally matches our body enzyme transitions, supporting gut microbiome diversity.
* **True Local Economics:** Buying seasonal bounty saves shipping costs, driving down prices for high-quality food.`,
    author: 'Dr. Jane Holloway',
    date: 'June 02, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b3',
    title: 'Easy Tips to Drastically Reduce Food Packaging Waste',
    category: 'Sustainable Food Practices',
    excerpt: 'Simple steps to shift your home kitchen into a zero-plastic sanctuary with minimal effort and major ecological output.',
    content: `Single-use grocery store plastics dominate landfill deposits. We can design beautiful, waste-free kitchens.

### Actionable Hub Guidelines:
1. **Transition to Glass Keepers:** Transfer grains, grains, and nuts from paper bags immediately to glass canisters to keep pantry bugs out.
2. **Accept Reusable Box Cargo:** When you purchase from Natural Grocery, return your previous wax-crates and glass milk bottles to our delivery associate.
3. **Compost Wet Trimmings:** Create a small, sealed under-sink compost bowl. This diverts organic material into nourishing fertilizers and keeps trash cans clean.`,
    author: 'Chef Lucas Gregory',
    date: 'June 09, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=600'
  }
];
