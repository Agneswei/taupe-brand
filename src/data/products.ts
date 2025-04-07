export type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
    category: string;
    subcategory?: string;
    variants?: {
      colors?: { name: string; code: string; image: string }[];
      sizes?: string[];
    };
    collection?: string;
  };
  
  const rawProducts = [
    {
      name: "Tricia Breathable Knit Tank",
      image: "/clothing/triciablack.png",
      price: 990,
      category: "Tops",
      subcategory: "Tank Tops",
      variants: {
        colors: [
          { name: "Black", code: "#000000", image: "/clothing/triciablack.png" },
          { name: "Gray", code: "#bcbcbc", image: "/clothing/triciagray.png" },
        ],
        sizes: ["XS", "S", "M", "L"] 
      },
      collection: "Bare Essentials",
 
    },
    {
      name: "Lena Button Back top",
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
      name: "Greta Wide Leg Pants",
      image: "/clothing/gretawhite.png",
      price: 1690,
      category: "Bottoms",
      subcategory: "Pants",
      collection: "Bare Essentials",
    },
    {
      name: "Evelyn Straight Leg Pants",
      image: "/clothing/evelyn.png",
      price: 1390,
      category: "Bottoms",
      subcategory: "Pants",
      collection: "Bare Essentials",
    },
    {
      name: "Gina Shorts",
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
      collection: "Vie Elegante",
    },
    {
      name: "Margaux Set",
      image: "/clothing/margauxgray.png",
      price: 2590,
      category: "Sets",
      variants: {
        colors: [
          { name: "Gray", code: "#dbd4ca", image: "/clothing/margauxgray.png" },
          { name: "Ivory", code: "#ecebe7", image: "/clothing/margauxivory.png" },
          { name: "Brown", code: "#6d4e1d", image: "/clothing/margauxbrown.png" },
        ],
        sizes: ["S", "M"] 
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
      name: "Alie Set",
      image: "/clothing/SM/allieWhite.png",
      price: 1290,
      category: "Sets",
      variants: {
        colors: [
          { name: "White", code: "#ffffff", image: "/clothing/SM/allieWhite.png" },
          { name: "Black", code: "#000000", image: "/clothing/SM/allieBlack.png" },
          { name: "Beige", code: "#d4bb93", image: "/clothing/SM/allieBeige.png" },
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
      image: "/clothing/SM/tiara.png",
      price: 790,
      category: "Dresses",
      variants: {
        colors: [
          { name: "Ivory", code: "#ecebe7", image: "/clothing/SM/tiaraIvory.png" },
          { name: "Green", code: "#8ca382", image: "/clothing/SM/tiaraGreen.png" },
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
  ];
  

  export const products: Product[] = rawProducts.map((product, index) => ({
    id: index + 1,
    ...product,
  }));