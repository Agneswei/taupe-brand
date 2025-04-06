export type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
    category: string;
    subcategory?: string;
  };
  
  const rawProducts = [
    {
      name: "Tricia Breathable Knit Tank",
      image: "/clothing/triciablack.png",
      price: 990,
      category: "Tops",
      subcategory: "Tank Tops"
    },
    {
      name: "Lena Button Back top",
      image: "/clothing/lena.png",
      price: 1090,
      category: "Tops",
      subcategory: "Shirts & Blouses"
    },
    {
      name: "Elisa Super Soft Sweater",
      image: "/clothing/elisa.png",
      price: 1090,
      category: "Tops",
      subcategory: "Shirts & Blouses"
    },
    {
      name: "Mira Cardigan",
      image: "/clothing/mira.png",
      price: 1390,
      category: "Tops",
      subcategory: "Cardigans & Sweaters"
    },
    {
      name: "Greta Wide Leg Pants",
      image: "/clothing/gretawhite.png",
      price: 1690,
      category: "Pants"
    },
    {
      name: "Evelyn Straight Leg Pants",
      image: "/clothing/evelyn.png",
      price: 1390,
      category: "Pants"
    },
  ];
  

  export const products: Product[] = rawProducts.map((product, index) => ({
    id: index + 1,
    ...product,
  }));