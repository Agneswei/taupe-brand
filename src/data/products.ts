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
      subcaterory: "Tank Tops",
    },
    {
        name: "Lena Button Back top",
        image: "/clothing/lena.png",
        price: 1090,
        category: "Tops",
        subcaterory: "Shirts & Blouses",

    },
    {
        name: "Elisa Super Soft Sweater",
        image: "/clothing/elisa.png",
        price: 1090,
        category: "Tops",
        subcaterory: "Shirts & Blouses",

    },
    {
        name: "Mira Cardigan",
        image: "/clothing/mira.png",
        price: 1390,
        category: "Tops",
        subcaterory: "Cardigans & Sweaters",

    },
  ];
  

  export const products: Product[] = rawProducts.map((product, index) => ({
    id: index + 1,
    ...product,
  }));