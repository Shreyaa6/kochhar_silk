export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  category: 'Saree' | 'Lehenga' | 'Suit';
  image: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  description: string;
  highlights: string[];
  specs: {
    [key: string]: string;
  };
  sizes: string[];
  inStock: boolean;
  colors: string[];
  fabric: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Royal Crimson Banarasi Katan Silk Saree",
    price: 24500,
    originalPrice: 29900,
    category: "Saree",
    image: "/saree_banarasi.png",
    images: ["/saree_banarasi.png", "/hero_banner.png"],
    rating: 4.9,
    reviewsCount: 142,
    description: "An heirloom masterpiece, handwoven in pure Banarasi Katan silk. Featuring an exquisite crimson body adorned with intricate gold zari (brocade) weaving, floral buttis, and a heavy pallu reflecting classic Mughal aesthetics.",
    highlights: [
      "100% Handwoven Pure Katan Silk",
      "Real Gold zari border detailing",
      "Accompanied by a running silk blouse piece",
      "Woven by master artisans in Varanasi"
    ],
    specs: {
      "Fabric": "Pure Katan Silk",
      "Weave Type": "Banarasi Brocade (Kadhwa)",
      "Saree Length": "5.5 meters",
      "Blouse Length": "0.8 meters (unstitched)",
      "Zari Type": "Tested Metallic Gold Zari",
      "Care": "Dry Clean Only"
    },
    sizes: ["Standard Drape"],
    inStock: true,
    colors: ["Crimson Red", "Royal Maroon"],
    fabric: "Banarasi Silk"
  },
  {
    id: 2,
    title: "Emerald Forest Kanjeevaram Silk Saree",
    price: 28900,
    originalPrice: 34500,
    category: "Saree",
    image: "/saree_kanjeevaram.png",
    images: ["/saree_kanjeevaram.png"],
    rating: 4.8,
    reviewsCount: 96,
    description: "Handcrafted from pure mulberry silk in Kanchipuram, this emerald green saree exhibits a grand gold zari border woven in traditional temple patterns and korvai joint technique, blending cultural heritage with absolute luxury.",
    highlights: [
      "Authentic Kanchipuram Handloom silk",
      "Traditional Korvai temple borders",
      "Certified Silk Mark purity assured",
      "Heavy zari pallu with peacock and checks motifs"
    ],
    specs: {
      "Fabric": "Double Warp Mulberry Silk",
      "Weave Type": "Kanjeevaram Handloom",
      "Saree Length": "5.5 meters",
      "Blouse Length": "80 cm matching silk",
      "Weight": "780 grams (Heavy luxurious drape)",
      "Care": "Dry Clean Only, store in muslin fabric"
    },
    sizes: ["Standard Drape"],
    inStock: true,
    colors: ["Emerald Green", "Peacock Teal"],
    fabric: "Kanjeevaram Silk"
  },
  {
    id: 3,
    title: "Blush Rose Embroidered Organza Saree",
    price: 16800,
    category: "Saree",
    image: "/saree_organza.png",
    images: ["/saree_organza.png"],
    rating: 4.7,
    reviewsCount: 78,
    description: "An elegant blend of modernity and tradition. Woven in sheer rose pink organza, this saree boasts exquisite hand-embroidered floral vines in soft champagne gold threads, complete with delicate scalloped lace borders.",
    highlights: [
      "Lightweight, semi-transparent premium organza",
      "Intricate floral scalloped hand-embroidery",
      "Includes designer raw silk blouse piece",
      "Modern minimalist luxury drape"
    ],
    specs: {
      "Fabric": "Premium sheer Organza Silk",
      "Weave Type": "Machine-loom organza base with hand-embroidery",
      "Saree Length": "5.5 meters",
      "Blouse Length": "85 cm unstitched raw silk",
      "Embroidery": "Resham & Dabka work",
      "Care": "Dry Clean Only, iron on low heat"
    },
    sizes: ["Standard Drape"],
    inStock: true,
    colors: ["Blush Pink", "Champagne Beige"],
    fabric: "Organza"
  },
  {
    id: 4,
    title: "Burgundy Velvet Royal Bridal Lehenga",
    price: 85000,
    originalPrice: 98000,
    category: "Lehenga",
    image: "/lehenga_velvet.png",
    images: ["/lehenga_velvet.png", "/lehenga_ivory.png"],
    rating: 5.0,
    reviewsCount: 34,
    description: "Designed for a royal entrance, this heavy bridal lehenga is tailored from premium micro-velvet in deep burgundy. Embellished with dense handworked zardozi, metal wire threads, and semi-precious beads. Features double dupatta styling in soft crimson net.",
    highlights: [
      "Premium heavyweight micro-velvet",
      "Intricate handworked Zardozi and Dabka",
      "Includes double dupattas (Velvet + Net)",
      "Custom semi-stitched skirt with can-can layering"
    ],
    specs: {
      "Skirt Fabric": "Premium Heavy Velvet",
      "Dupatta Fabric": "Tulle Net (with velvet embroidered borders)",
      "Blouse Fabric": "Burgundy Velvet (unstitched)",
      "Embroidery Details": "Zardozi, Salma, Gota Patti, and stone highlight",
      "Skirt Waist/Length": "Semi-stitched (fits waist up to 42 inches)",
      "Care": "Dry Clean Only, keep padded"
    },
    sizes: ["S", "M", "L", "XL", "Custom Measure"],
    inStock: true,
    colors: ["Deep Burgundy", "Royal Crimson"],
    fabric: "Velvet"
  },
  {
    id: 5,
    title: "Midnight Plum Silk Anarkali Suit Set",
    price: 18500,
    category: "Suit",
    image: "/suit_anarkali.png",
    images: ["/suit_anarkali.png"],
    rating: 4.6,
    reviewsCount: 59,
    description: "A silhouette that flows with grace. This floor-length Anarkali set is cut from handspun silk in a rich midnight plum tone, featuring traditional Mughal paisley motifs on the neck panel and hemline. Paired with a delicate organza dupatta.",
    highlights: [
      "Soft, breathable pure silk base",
      "Gota patti and zari detailing along panels",
      "Includes silk churidar and embroidered organza dupatta",
      "Flattering 24-kali flare silhouette"
    ],
    specs: {
      "Suit Fabric": "Pure Handloom Silk",
      "Dupatta Fabric": "Embroidered Organza",
      "Pant Fabric": "Santoon Silk",
      "Length": "52 inches",
      "Sleeve": "Full sleeves with gota detailing",
      "Care": "Dry Clean Only"
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    colors: ["Midnight Plum", "Wine Plum"],
    fabric: "Handspun Silk"
  },
  {
    id: 6,
    title: "Mustard Gold Tussar Raw Silk Saree",
    price: 14500,
    originalPrice: 17800,
    category: "Saree",
    image: "/saree_tussar.png",
    images: ["/saree_tussar.png"],
    rating: 4.8,
    reviewsCount: 51,
    description: "Celebrate earthy elegance with this handspun Tussar raw silk saree. Dyed in a luminous warm mustard gold, it is defined by its organic slub texture and a contrasting deep burgundy border with temple pattern weaving.",
    highlights: [
      "100% Wild Tussar Silk (Bhagalpuri handloom)",
      "Natural organic texture and matte sheen",
      "Contrasting burgundy borders and pallu",
      "Perfect for premium corporate or festive wear"
    ],
    specs: {
      "Fabric": "Wild Tussar Silk (Raw Silk)",
      "Weave Type": "Handloom flat weave",
      "Saree Length": "5.5 meters",
      "Blouse Length": "80 cm unstitched burgundy silk",
      "Texture": "Earthy, slubbed raw silk texture",
      "Care": "Dry Clean Only, store in paper wraps"
    },
    sizes: ["Standard Drape"],
    inStock: true,
    colors: ["Mustard Gold", "Ochre Yellow"],
    fabric: "Tussar Silk"
  },
  {
    id: 7,
    title: "Ivory & Gold Banarasi Silk Lehenga Set",
    price: 62000,
    category: "Lehenga",
    image: "/lehenga_ivory.png",
    images: ["/lehenga_ivory.png", "/lehenga_velvet.png"],
    rating: 4.9,
    reviewsCount: 22,
    description: "An epitome of sophistication, this ivory and gold lehenga is woven from pure Banarasi silk brocade. The skirt features alternate stripes of floral patterns and royal motifs, paired with a matching blouse and a sheer tissue-silk gold dupatta.",
    highlights: [
      "Banarasi Silk Brocade handloom skirt",
      "Ivory and gold royal color block theme",
      "Includes gold tissue silk dupatta with border trim",
      "Semi-stitched, customizable waist sizing"
    ],
    specs: {
      "Skirt Fabric": "Pure Silk Brocade",
      "Dupatta Fabric": "Golden Tissue Silk",
      "Blouse Fabric": "Brocade Silk (unstitched)",
      "Skirt Flare": "4.2 meters circumference",
      "Zari Type": "Zari brocade weaving",
      "Care": "Dry Clean Only"
    },
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    colors: ["Ivory White", "Cream Gold"],
    fabric: "Banarasi Silk"
  }
];
