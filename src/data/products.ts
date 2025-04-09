
export type Product = {
    id: number;
    name: string;
    image: string;
    additionalImages?: string[];
    price: number;
    category: string;
    subcategory?: string;
    variants?: {
      colors?: { name: string; code: string; image: string; additionalImages?: string[]; }[];
      sizes?: string[];
    };
    collection?: string;
  };
  
  const rawProducts = [
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
      category: "Bottoms",
      subcategory: "Pants",
      collection: "Bare Essentials",
    },
    {
      name: "Evelyn Straight Leg Pant",
      image: "/clothing/evelyn.png",
      price: 1390,
      category: "Bottoms",
      subcategory: "Pants",
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
          { name: "Black", code: "#000000", image: "/clothing/RM/zoeBlack.png"}
          
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
      name: "Selina Skort",
      image: "/clothing/BE/selinaKhaki.png",
      price: 890,
      category: "Bottoms",
      subcategory: "Skirts",      
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
          { name: "Kahki", code: "#958258", image: "clothing/VE/jenny.png" },        
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
          { name: "black", code: "#000000", image: "clothing/VE/chloeBlack.png" },        
          { name: "white", code: "#ffffff", image: "clothing/VE/chloeWhite.png" },        
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
          { name: "black", code: "#000000", image: "clothing/VE/luna1.png" },        
        ],
        sizes: ["Free Size"] 
      },
      collection: "Vie Elegante",
    },
    {
      name: "Selina Skirt",
      image: "/clothing/VE/selina.png",
      price: 690,
      category: "Bottoms",
      subcategory: "Skirts",
      variants: {
        colors: [
          { name: "beige", code: "#d4bb93", image: "clothing/VE/selina.png" },        
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
  
  ];
  

  export const products: Product[] = rawProducts.map((product, index) => ({
    id: index + 1,
    ...product,
  }));