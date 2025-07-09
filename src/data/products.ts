
export type Product = {
    id: number;
    name: string;
    image: string;
    additionalImages?: string[];
    soldOut?: boolean;
    price: number;
    priceUSD?: number; 
    priceSGD?: number; 
    category: string;
    subcategory?: string;
    description?: string;
    fabric?: string;
    sizesInfo?: string;
    careInstructions?: string[];
    variants?: {
      colors?: { name: string; code: string; image: string; additionalImages?: string[]; }[];
      sizes?: string[];
    };
    collection?: string;
  };
  
  const rawProducts = [
    {
      name: "TEST",
      image: "/clothing/BE/triciaBlack.png",
      price: 0,
      category: "Tops",
      subcategory: "Tank Tops",
      variants: {
        colors: [
          { name: "Black", code: "#000000", image: "/clothing/BE/triciaBlack.png",
            additionalImages: ["/clothing/BE/triciaB1.png", "/clothing/BE/triciaB2.png"]
            
           },
          { name: "Gray", code: "#bcbcbc", image: "/clothing/BE/triciagray.png" },
          { name: "White", code: "#ffffff", image: "/clothing/BE/triciaWhite.png",
            additionalImages: ["/clothing/BE/triciaW1.png", "/clothing/BE/triciaW2.png"]
           },
        ],
        sizes: ["XS", "S", "M", "L"] 
      },
      collection: "Bare Essentials",
 
    },
    {
      name: "Tricia Breathable Knit Tank",
      image: "/clothing/BE/triciaBlack.png",
      
      price: 990,
      category: "Tops",
      subcategory: "Tank Tops",
      variants: {
        colors: [
          { name: "Black", code: "#000000", image: "/clothing/BE/triciaBlack.png",
            additionalImages: ["/clothing/BE/triciaB1.png", "/clothing/BE/triciaB2.png"]
            
           },
          { name: "Gray", code: "#bcbcbc", image: "/clothing/BE/triciagray.png" },
          { name: "White", code: "#ffffff", image: "/clothing/BE/triciaWhite.png",
            additionalImages: ["/clothing/BE/triciaW1.png", "/clothing/BE/triciaW2.png"]
           },
        ],
        sizes: ["XS", "S", "M", "L"] 
      },
      collection: "Bare Essentials",
 
    },
    {
      name: "Lena Button Back Top",
      image: "/clothing/lenagray.png",
      price: 1090,
      category: "Tops",
      subcategory: "Shirts & Blouses",
      variants: {
        colors: [
          { name: "Gray", code: "#444444", image: "/clothing/lenagray.png" },
          { name: "Black", code: "#000000", image: "/clothing/lenablack.png" },
          { name: "Cream", code: "#f1ead6", image: "/clothing/lenacream.png" },
        ],
        sizes: ["XS", "S", "M", "L"] 
      },
      collection: "Bare Essentials",

    },
    {
      name: "Elisa Super Soft Sweater",
      image: "/clothing/elisawhite.png",
      price: 1090,
      category: "Tops",
      subcategory: "Shirts & Blouses",
      variants: {
        colors: [
          { name: "White", code: "#ffffff", image: "/clothing/elisawhite.png" },
          { name: "Black", code: "#000000", image: "/clothing/elisablack.png" },
        ],
        sizes: ["XS", "S", "M", "L"] 
      },
      collection: "Bare Essentials",
    },
    {
      name: "Mira Cardigan",
      image: "/clothing/mira.png",
      price: 1390,
      category: "Tops",
      subcategory: "Cardigans | Sweaters",
      collection: "Bare Essentials",
    },
    {
      name: "Be That Light T-Shirt",
      image: "/clothing/btl.png",
      price: 1390,
      category: "Tops",
      subcategory: "T-Shirts",
    },
    {
      name: "Greta Wide Leg Pant",
      image: "/clothing/gretawhite.png",
      price: 1690,
      priceUSD: 55,
      category: "Bottoms",
      subcategory: "Pants",
      description: "Wide-leg tailored trousers with included belt. Lightweight suit fabric that resists wrinkles with elegant front pleats for a structured silhouette.",
      fabric: "Cotton blended suit fabric",
      sizesInfo: "S: Waist 24”-25” | Hips 36”-37” | Length 39”; M: Waist 26”-27” | Hips 38”-39” | Length 40”; L: Waist 28”-29” | Hips 40”-41” | Length 41”",
      careInstructions: ["Dry clean or gentle hand wash recommended. Do not tumble dry."],
      collection: "Bare Essentials",
    },
    {
      name: "Evelyn Straight Leg Pant",
      image: "/clothing/evelyn.png",
      price: 1390,
      priceUSD: 45,
      category: "Bottoms",
      subcategory: "Pants",
      description: "Mid-straight leg trousers with front zipper, crafted from premium Korean fabric with subtle woven texture. Soft, thick, and stretchy for a luxurious feel.",
      fabric: "Cotton blended fabric",
      sizesInfo: "S: Waist 25”-26” | Hips 35”-36” | Length 42”; M: Waist 27”-28” | Hips 37”-38” | Length 42”; L: Waist 29”-30” | Hips 39”-40” | Length 42”",
      careInstructions: ["Machine wash cold. Gentle cycle. Hang to dry."],
      collection: "Bare Essentials",
    },
    {
      name: "Gina Short",
      image: "/clothing/ginablack.png",
      price: 790,
      category: "Bottoms",
      subcategory: "Shorts",
      variants: {
        colors: [
          { name: "Black", code: "#000000", image: "/clothing/ginablack.png" },
          { name: "White", code: "#ffffff", image: "/clothing/ginawhite.png" },
        ],
        sizes: ["XS", "S", "M", "L"] 
      },
      collection: "Uncomplicated",
    },
    {
      name: "Margaux Set",
      image: "/clothing/TT/margauxGray.jpg",
      price: 2590,
      category: "Sets",
      variants: {
        colors: [
          { name: "Gray", code: "#dbd4ca", image: "/clothing/TT/margauxGray.jpg",
            additionalImages: ["/clothing/margauxG1.jpg", "/clothing/margauxG2.jpg"]
           },
          { name: "Ivory", code: "#ecebe7", image: "/clothing/TT/margauxIvory.jpg",
            additionalImages: ["/clothing/TT/margauxI1.jpg", "/clothing/TT/margauxI2.jpg"]
           },
          { name: "Brown", code: "#6d4e1d", image: "/clothing/TT/margauxBrown.jpg",
            additionalImages: ["/clothing/TT/margauxB1.jpg", "/clothing/TT/margauxB2.jpg", "/clothing/TT/margauxB3.jpg", "/clothing/TT/margauxB4.jpg"]
           },
        ],
        sizes: ["S", "M"] 
      },
      collection: "The Tailored",
    },
    {
      name: "Audrey Top",
      image: "/clothing/TT/audrey.jpg",
      additionalImages: ["/clothing/TT/audrey1.jpg", "/clothing/TT/audrey2.jpg", "/clothing/TT/audrey3.jpg"],
      price: 1290,
      category: "Tops",
      variants: {
        colors: [
          { name: "Ivory", code: "#ecebe7", image: "/clothing/TT/audrey.jpg",
           },
        ],
        sizes: ["Free Size"] 
      },
      collection: "The Tailored",
    },
    {
      name: "Dahlia Set",
      image: "/clothing/dahlia.png",
      price: 2590,
      category: "Sets",
      variants: {
        colors: [
          { name: "Ivory", code: "#ecebe7", image: "/clothing/margauxivory.png" },
        ],
        sizes: ["S", "M"] 
      },
      collection: "The Tailored",
    },
    {
      name: "Amber Set",
      image: "/clothing/SM/amber.png",
      price: 1190,
      category: "Sets",
      variants: {
        colors: [
          { name: "White", code: "#ffffff", image: "/clothing/SM/amber.png" },
        ],
        sizes: ["Free Size"] 
      },
      collection: "Summer Mood",
    },
    {
      name: "Allie Set",
      image: "/clothing/SM/allieWhite.jpg",
      additionalImages: ["/clothing/SM/allie1.jpg", "/clothing/SM/allie2.jpg"],
      price: 1290,
      category: "Sets",
      variants: {
        colors: [
          { name: "White", code: "#ffffff", image: "/clothing/SM/allieWhite.jpg",
            additionalImages: ["/clothing/SM/allieW1.jpg", "/clothing/SM/allieW2.jpg", "/clothing/SM/allieW3.jpg"]
           },
          { name: "Black", code: "#000000", image: "/clothing/SM/allieBlack.jpg" },
          { name: "Beige", code: "#d4bb93", image: "/clothing/SM/allieBeige.jpg",
            additionalImages: ["/clothing/SM/allieB1.jpg"]
           },
        ],
        sizes: ["Free Size"] 
      },
      collection: "Summer Mood",
    },
    {
      name: "Weldean Pant",
      image: "/clothing/SM/weldean.jpg",
      additionalImages: ["/clothing/SM/weldean1.jpg"],
      price: 1490,
      category: "Bottoms",
      subcategory: "Pants",
      variants: {
        colors: [
          { name: "Beige", code: "#d4bb93", image: "/clothing/SM/weldean.jpg",
            additionalImages: ["/clothing/SM/weldeanB1.jpg", "/clothing/SM/weldeanB2.jpg"]
          },
          { name: "Khaki", code: "#958258", image: "/clothing/SM/weldeanKhaki.jpg",
            additionalImages: ["/clothing/SM/weldeanK1.jpg"]
          }
          
        ],
        sizes: ["S", "M", "L", "XL"] 
      },
      collection: "Summer Mood",
    },
    {
      name: "Zoe Wide Leg Pant",
      image: "/clothing/RM/zoeGray.jpg",
      additionalImages: ["/clothing/RM/zoeG3.jpg"],
      price: 1890,
      category: "Bottoms",
      subcategory: "Pants",
      variants: {
        colors: [
          { name: "Gray", code: "#bcbcbc", image: "/clothing/RM/zoeGray.jpg",
            additionalImages: ["/clothing/RM/zoeG1.jpg", "/clothing/RM/zoeG2.jpg"]
          },
          { name: "Black", code: "#000000", image: "/clothing/gigi/zoeBlack.jpg",
            additionalImages: ["/clothing/gigi/zoeB1.jpg", "/clothing/gigi/zoeB2.jpg"]
          }
          
        ],
        sizes: ["S", "M"] 
      },
      collection: "Romance Mansion",
    },
    {
      name: "Adele Shirt",
      image: "/clothing/RM/adele.jpg",
      additionalImages: ["/clothing/RM/adele1.jpg", "/clothing/RM/adele2.jpg"],
      price: 1590,
      category: "Tops",
      subcategory: "Shirts & Blouses",
      variants: {
        colors: [
          { name: "White", code: "#ffffff", image: "/clothing/RM/zoeGray.jpg"}         
        ],
        sizes: ["Free Size"] 
      },
      collection: "Romance Mansion",
    },
    {
      name: "Alicia Knit Set",
      image: "/clothing/RM/alicia.jpg",
      additionalImages: ["/clothing/RM/alicia1.jpg", "/clothing/RM/alicia2.jpg"],
      price: 1490,
      category: "Sets",
      variants: {
        colors: [
          { name: "White", code: "#ffffff", image: "/clothing/RM/aliciaWhite.jpg",
            additionalImages: ["/clothing/RM/aliciaW1.jpg", "/clothing/RM/aliciaW2.jpg", "/clothing/RM/aliciaW3.jpg", "/clothing/RM/aliciaW4.jpg"]
          },  
          { name: "Taupe", code: "#8b7069", image: "/clothing/RM/aliciaTaupe.png"},         
          { name: "Black", code: "#000000", image: "/clothing/RM/aliciaBlack.png"},         
       
        ],
        sizes: ["Free Size"] 
      },
      collection: "Romance Mansion",
    },
    {
      name: "Kelly Set",
      image: "/clothing/SM/kelly.png",
      price: 890,
      category: "Sets",
      variants: {
        colors: [
          { name: "Blue", code: "#9fc5e8", image: "/clothing/SM/kelly.png" },
        ],
        sizes: ["Free Size"] 
      },
      collection: "Summer Mood",
    },
    {
      name: "Tiara Dress",
      image: "/clothing/SM/tiaraGreen.jpg",
      additionalImages: ["/clothing/SM/tiara1.jpg", "/clothing/SM/tiara2.jpg"],
      price: 790,
      category: "Dresses",
      variants: {
        colors: [
          { name: "Ivory", code: "#ecebe7", image: "/clothing/SM/tiaraIvory.jpg",
            additionalImages: ["/clothing/SM/tiaraI1.jpg", "/clothing/SM/tiaraI2.jpg"]
          },
          { name: "Green", code: "#8ca382", image: "/clothing/SM/tiaraGreen.jpg",
            additionalImages: ["/clothing/SM/tiaraG1.jpg", "/clothing/SM/tiaraG2.jpg", "/clothing/SM/tiaraG3.jpg"]

           },
        ],
        sizes: ["Free Size"] 
      },
      collection: "Summer Mood",
    },
    {
      name: "Daisy Blouse",
      image: "/clothing/SM/daisyTop.png",
      price: 1490,
      category: "Tops",
      subcategory: "Shirts & Blouses",      
      variants: {
        colors: [
          { name: "Ivory", code: "#ecebe7", image: "/clothing/SM/daisyTop.png" },
        ],
        sizes: ["S", "M", "L"] 
      },
      collection: "Summer Mood",
    },
    {
      name: "Daisy Short",
      image: "/clothing/SM/daisyShort.png",
      price: 890,
      category: "Bottoms",
      subcategory: "Shorts",      
      variants: {
        colors: [
          { name: "Ivory", code: "#ecebe7", image: "/clothing/SM/daisyShort.png" },
        ],
        sizes: ["S", "M", "L"] 
      },
      collection: "Summer Mood",
    },
    {
      name: "Selina Skort with Belt",
      image: "/clothing/BE/selinaKhaki.png",
      price: 1290,
      category: "Bottoms",
      subcategory: "Skirts",  
      description: "High-waisted skort with included belt. Quality fabric with inner lining for comfort and structure. Suitable for work or casual styling.",
      fabric: "Cotton Blend with fabric lining",
      sizesInfo: "S: Waist 25” | Hips 33”-34” | Length 15”; M: Waist 27” | Hips 35”-36” | Length 16”; L: Waist 29” | Hips 37”-38” | Length 17”",
      careInstructions: ["Hand wash cold. Do not bleach"],   
      variants: {
        colors: [
          { name: "Kahki", code: "#958258", image: "/clothing/BE/selinaKhaki.png" },
          { name: "Brown", code: "#6d4e1d", image: "/clothing/BE/selinaBrown.png" },
          { name: "White", code: "#ffffff", image: "/clothing/BE/selinaWhite.png" },        
        ],
        sizes: ["S", "M", "L"] 
      },
      collection: "Bare Essentials",
    },
    {
      name: "Jenny Top",
      image: "/clothing/VE/jenny.png",
      price: 790,
      category: "Tops",
      subcategory: "Shirts & Blouses",      
      variants: {
        colors: [
          { name: "Kahki", code: "#958258", image: "/clothing/VE/jenny.png" },        
        ],
        sizes: ["Free Size"] 
      },
      collection: "Vie Elegante",
    },
    {
      name: "Chloe Top",
      image: "/clothing/VE/chloeBlack.png",
      price: 590,
      category: "Tops",
      subcategory: "Shirts & Blouses",      
      variants: {
        colors: [
          { name: "black", code: "#000000", image: "/clothing/VE/chloeBlack.png" },        
          { name: "white", code: "#ffffff", image: "/clothing/VE/chloeWhite.png" },        
        ],
        sizes: ["Free Size"] 
      },
      collection: "Vie Elegante",
    },
    {
      name: "Luna Top",
      image: "/clothing/VE/luna1.png",
      price: 690,
      category: "Tops",
      subcategory: "Shirts & Blouses",      
      variants: {
        colors: [
          { name: "black", code: "#000000", image: "/clothing/VE/luna1.png" },        
        ],
        sizes: ["Free Size"] 
      },
      collection: "Vie Elegante",
    },
    {
      name: "Selina Skirt",
      image: "/clothing/gigi/selinaPearl3.jpg",
      price: 1490,
      priceUSD: 50,
      category: "Bottoms",
      subcategory: "Skirts",
      description: "Premium-weight satin skirt with a beautiful drape, side zipper, and inner elastic waistband. Easy to style for work or casual days.",
      fabric: "Satin",
      sizesInfo: "S: Waist 24”-25” | Hips 38” | Length 40”; M: Waist 26”-27” | Hips 40” | Length 40”",
      careInstructions: ["Hand wash cold. Do not bleach. Hang to dry."],
      variants: {
        colors: [
          { name: "Pearl", code: "#f8f2ec", image: "/clothing/gigi/selinaPearl.jpg",
            additionalImages: ["/clothing/gigi/selinaPearl1.jpg", "/clothing/gigi/selinaPearl2.jpg"]
          }, 
          { name: "Misty Rose", code: "#d8a697", image: "/clothing/gigi/selinaRose.jpg",
            additionalImages: ["/clothing/gigi/selinaRose1.jpg"]
           },        
        ],
        sizes: ["Free Size"] 
      },
      collection: "Vie Elegante",
    },
    {
      name: "Dolce Pleat Pant",
      image: "/clothing/glam/dolce1.jpg",
      additionalImages: ["/clothing/glam/dolce2.jpg"],
      price: 1690,
      category: "Bottoms",
      subcategory: "Pants",
      variants: {
        sizes: ["S", "M", "L"] 
      },
      collection: "Romance Mansion",
    },
    {
      name: "Celine Short",
      image: "/clothing/gigi/celine1.jpg",
      additionalImages: ["/clothing/gigi/celine2.jpg", "/clothing/gigi/celine3.jpg"],
      price: 890,
      priceUSD: 30,
      category: "Bottoms",
      subcategory: "Shorts",
      description: "Must-have high-waisted shorts with perfect length. Premium Kenny fabric – thick, structured, durable, with folded hems for a polished finish.",
      fabric: "Premium Kenny",
      sizesInfo: "S: Waist 24”-25” | Hips 35”-36” | Length 15”; M: Waist 26”-27” | Hips 37”-38” | Length 15”; L: Waist 28”-29” | Hips 39”-40” | Length 16”; XL: Waist 30”-31” | Hips 41”-42” | Length 16”",
      careInstructions: ["Machine wash cold. Gentle cycle. Tumble dry low or hang to dry."],
      variants: {
        sizes: ["S", "M", "L", "XL"] 
      },
      collection: "Gigi's Favorite Collection",
    },
    {
      name: "Jolin Short",
      image: "/clothing/gigi/jolin1.jpg",
      additionalImages: ["/clothing/gigi/jolin2.jpg", "/clothing/gigi/jolin3.jpg"],
      price: 690,
      priceUSD: 25,
      category: "Bottoms",
      subcategory: "Shorts",
      description: "New linen shorts with flattering cut and perfect length. Easy to style with bikinis, shirts, or cropped tanks.",
      fabric: "Linen",
      sizesInfo: "S: Waist 24”-25” | Hips 34” | Length 16”; M: Waist 26”-27” | Hips 36” | Length 16”; L: Waist 28”-29” | Hips 38” | Length 17”",
      careInstructions: ["Hand wash cold. Do not bleach. Line dry."],
      variants: {
        sizes: ["S", "M", "L"] 
      },
      collection: "Gigi's Favorite Collection",
    },
   {
      name: "Maisei Top",
      image: "/clothing/gigi/maisei1.jpg",
      additionalImages: ["/clothing/gigi/maisei2.jpg", "/clothing/gigi/maisei3.jpg"],
      price: 790,
      priceUSD: 25,
      category: "Tops",
      subcategory: "Tank Tops",
      description: "Soft knit tank top with straight-line pattern for a slimming effect. Comfortable and easy to style with any outfit.",
      fabric: "Knit",
      sizesInfo: "Free size – Bust 30”-36”",
      careInstructions: ["Hand wash cold. Do not bleach. Lay flat to dry."],
      variants: {
        sizes: ["Freesize"] 
      },
      collection: "Gigi's Favorite Collection",
    },
    {
      name: "Ms. Gigi Cardigan",
      image: "/clothing/gigi/cherry.jpg",
        additionalImages: ["/clothing/gigi/charcoal.jpg", "/clothing/gigi/cafe2.jpg"],
      price: 1490,
      priceUSD: 50,
      category: "Tops",
      subcategory: "Cardigans | Sweaters",
      description: "A Korean-style short-sleeve cardigan that gives an effortlessly polished look. Medium-thick soft knit fabric with elegant gold buttons. Wear it buttoned up or open for versatile styling.",
      fabric: "Soft Knit",
      sizesInfo: "Free size ; Neck width: 6” (15.5 cm), Bust before stretch: 38” (97 cm), Sleeve width: 4.5” (11 cm), Length: 22”",
      careInstructions: ["Hand wash cold. Do not bleach. Lay flat to dry."],
      variants: {
        colors: [
          { name: "Almond Milk", code: "#f8f2ec", image: "/clothing/gigi/almond.jpg",
            additionalImages: ["/clothing/gigi/almond1.jpg", "/clothing/gigi/almond2.jpg", "/clothing/gigi/almond3.jpg"]
           },        
          { name: "Black Charcoal", code: "#000000", image: "/clothing/gigi/charcoal.jpg",
            additionalImages: ["/clothing/gigi/charcoal1.jpg", "/clothing/gigi/charcoal2.jpg", "/clothing/gigi/charcoal3.jpg", "/clothing/gigi/charcoal4.jpg"]
           },  
          { name: "Bubble Tea", code: "#cab7a4", image: "/clothing/gigi/boba.jpg",
            additionalImages: ["/clothing/gigi/boba1.jpg", "/clothing/gigi/boba2.jpg", "/clothing/gigi/boba3.jpg"]
           },        
          { name: "Cafe Latte", code: "#7a6956", image: "/clothing/gigi/cafe.jpg",
            additionalImages: ["/clothing/gigi/cafe1.jpg", "/clothing/gigi/cafe2.jpg"]
           },        
          { name: "cinnamon", code: "#855858", image: "/clothing/gigi/cinnamon.jpg", 
            additionalImages: ["/clothing/gigi/cinnamon1.jpg", "/clothing/gigi/cinnamon2.jpg", "/clothing/gigi/cinnamon3.jpg"]
          },        
          { name: "Cherry Tomato", code: "#aa1a0b", image: "/clothing/gigi/cherry.jpg",
            soldOut: true
           },        
          { name: "Oat Cream", code: "#e5c8aa", image: "/clothing/gigi/oat.jpg",
            additionalImages: ["/clothing/gigi/oat1.jpg", "/clothing/gigi/oat2.jpg"]
           },        
          { name: "Rosy Berry", code: "#edaacb", image: "/clothing/gigi/rosy.jpg",
            additionalImages: ["/clothing/gigi/rosy1.jpg", "/clothing/gigi/rosy2.jpg"]
           },        

        ],
        sizes: ["Free Size"] 
      },
      collection: "Gigi's Favorite Collection",
    },
    {
      name: "Ms. Gigi Cotton Skirt",
      image: "/clothing/gigi/cotton.jpg",
        additionalImages: ["/clothing/gigi/cotton1.jpg", "/clothing/gigi/cotton2.jpg"],
      price: 990,
      category: "Bottoms",
      subcategory: "Skirts",
      description: "Tiered long cotton skirt with elastic back waistband and hidden side zipper. Easy to match for a refined Taupe look.",
      fabric: "Cotton",
      sizesInfo: "Free size – Waist 25”-32”, Hips 32”-40”, Length 37” (Unlined)",
      careInstructions: ["Machine wash cold with like colors. Tumble dry low or line dry."],
      variants: {
        sizes: ["Free Size"] 
      },
      collection: "Gigi's Favorite Collection",
    },
    {
      name: "Ms. Gigi Knit Vest",
      image: "/clothing/gigi/vestBlack.jpg",
        additionalImages: ["/clothing/gigi/vestWhite.jpg"],
      price: 1390,
      priceUSD: 45,
      category: "Tops",
      subcategory: "Shirts & Blouses",
      description: "Long V-neck Korean-style knit vest with elegant gold buttons and adjustable back buckle. Lightweight, soft, and easy to style for work or outings.",
      fabric: "Soft Knit",
      sizesInfo: "Free size – Neck depth: 8” (20.5 cm), Bust before stretch: 28” (36 cm) (Recommended under 32”), Armhole width: 9” (23 cm) stretchable 1-3”, Length: 23.5”",
      careInstructions: ["Hand wash cold. Do not bleach. Lay flat to dry."],
      variants: {
        colors: [
          { name: "Black", code: "#000000", image: "/clothing/gigi/vestBlack.jpg",
            additionalImages: ["/clothing/gigi/vestB1.jpg", "/clothing/gigi/vestB2.jpg"]
           },        
          { name: "White", code: "#ffffff", image: "/clothing/gigi/vestWhite.jpg",
            additionalImages: ["/clothing/gigi/vestW1.jpg", "/clothing/gigi/vestW2.jpg"]
           },        
          { name: "Beige", code: "#d4bb93", image: "/clothing/gigi/vestBeige.jpg",
            additionalImages: ["/clothing/gigi/vestBe1.jpg", "/clothing/gigi/vestBe2.jpg"]
           }
        ],
        sizes: ["Free Size"] 
      },
      collection: "Gigi's Favorite Collection",
    },
    {
      name: "Ms. Gigi Tank Top",
      image: "/clothing/gigi/tank.jpg",
        additionalImages: ["/clothing/gigi/tank1.jpg", "/clothing/gigi/tank2.jpg"],
      price: 790,
      priceUSD: 25,
      category: "Tops",
      subcategory: "Tank Top",
      variants: {
        sizes: ["Free Size"] 
      },
      collection: "Gigi's Favorite Collection",
    },
    {
      name: "Twilight Skirt",
      image: "/clothing/gigi/silverGray.jpg",
      price: 1590,
      priceUSD: 50,
      category: "Bottoms",
      subcategory: "Skirts",
      description: "Premium thick satin skirt with glossy finish. Flat waistband with hidden elastic, side zipper, and lightweight flared hem for a graceful look.",
      fabric: "Satin",
      sizesInfo: "S: Waist 25”-26” | Hips 36”-38” | Length 36”; M: Waist 27”-28” | Hips 38”-40” | Length 36”",
      careInstructions: ["Hand wash cold. Do not bleach. Hang to dry."],
      variants: {
        colors: [
           { name: "Frost White", code: "#ffffff", image: "/clothing/gigi/frostWhite.jpg",
            additionalImages: ["/clothing/gigi/frostWhite1.jpg"]
           },        
          { name: "Silver Gray", code: "#7c7575", image: "/clothing/gigi/silverGray.jpg",
            additionalImages: ["/clothing/gigi/silverGray1.jpg"]
           },        
          { name: "Enigma Black", code: "#000000", image: "/clothing/gigi/vestBeige.jpg",
            additionalImages: ["/clothing/gigi/vestBe1.jpg", "/clothing/gigi/vestBe2.jpg"]
           }
        ],
        sizes: ["Free Size"] 
      },
      collection: "Gigi's Favorite Collection",
    },
  ];
  

  export const products: Product[] = rawProducts.map((product, index) => ({
    id: index + 1,
    ...product,
  }));