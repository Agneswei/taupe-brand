export type Accessory = {
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

const rawAccessories = [
 {
    name: "Velvet Box Bag",
    image: "/clothing/bags/velvetGold.png",
    price: 1790,
    category: "Accessories",
    subcategory: "Bags",      
    variants: {
        colors: [
        { name: "Golden Brown", code: "#958258", image: "/clothing/bags/velvetGold.png" },
        { name: "Brown", code: "#6d4e1d", image: "/clothing/bags/velvetBrown.png" },
        { name: "Black", code: "#000000", image: "/clothing/bags/velvetBlack.png" },        
        ],
    },
 },
];

export const accessories: Accessory[] = rawAccessories.map((accessory, index) => ({
  id: index + 1,
  ...accessory,
}));
