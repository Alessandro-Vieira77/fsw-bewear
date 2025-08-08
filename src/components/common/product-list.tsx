"use client";

import { productTable, productVariantTable } from "@/db/schema";
import ProductItem from "./product-item";

//  produtos e variantes
interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

export default function ProductList({ title, products }: ProductListProps) {
  return (
    <div className="space-y-6">
      <h3 className="px-5 font-semibold">{title}</h3>
      <div className="flex w-full gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <ProductItem key={product.id} products={product} title="" />
        ))}
      </div>
    </div>
  );
}
