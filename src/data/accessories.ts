export type Accessory = {
  id: number;
  name: string;
  image: string;
  price: number;
  priceUSD?: number; 
  priceSGD?: number; 
  soldOut?: boolean;
  category: string;
  subcategory?: string;
  variants?: {
    colors?: { name: string; code: string; image: string }[];
    sizes?: string[];
  };
  collection?: string;
};

const rawAccessories = [
 {
    name: "Velvet Box Bag",
    image: "/clothing/bags/velvetGold.png",
    price: 1790,
    category: "Bags", 
    variants: {
        colors: [
        { name: "Golden Brown", code: "#958258", image: "/clothing/bags/velvetGold.png" },
        { name: "Brown", code: "#6d4e1d", image: "/clothing/bags/velvetBrown.png" },
        { name: "Black", code: "#000000", image: "/clothing/bags/velvetBlack.png" },        
        ],
    },
 },
  {
    name: "Gigi's Nomad Bag",
    image: "/clothing/bags/nomadBeige.jpg",
    additionalImages: ["/clothing/bags/nomadBeige1.jpg"],
    price: 1790,
    priceUSD: 60, 
    category: "Bags", 
    variants: {
      colors: [
        { name: "Beige", code: "#e0d7bf", image: "/clothing/bags/nomadBeige.png", 
          additionalImages: ["/clothing/Gigi/nomadBeige1.png", "/clothing/bags/nomadBeige2.png"], 
          },
        { name: "Brown", code: "#6d4e1d", image: "/clothing/BE/selinaBrown.png" },
        { name: "White", code: "#ffffff", image: "/clothing/BE/selinaWhite.png" },        
      ],
    },
    collection: "Gigi's Favorite Collection",
  },
];

export const accessories: Accessory[] = rawAccessories.map((accessory, index) => ({
  id: index + 1,
  ...accessory,
}));