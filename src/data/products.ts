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
      collection: "Bare Essentials",  
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
      subcategory: "Shorts",
      variants: {
        colors: [
          { name: "Gray", code: "#aea08b", image: "/clothing/margauxgray.png" },
          { name: "Ivory", code: "#ecebe7", image: "/clothing/margauxivory.png" },
        ],
        sizes: ["S", "M"] 
      },
      collection: "Vie Elegante",

    },
  ];
  

  export const products: Product[] = rawProducts.map((product, index) => ({
    id: index + 1,
    ...product,
  }));