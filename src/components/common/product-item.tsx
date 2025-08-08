"use client";
import { productTable, productVariantTable } from "@/db/schema";
import Link from "next/link";
import Image from "next/image";
import { formatCentsToBRL } from "@/helpers/money";

//  produtos e variantes
interface ProductListProps {
  title: string;
  products: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
}

export default function ProductItem({ products }: ProductListProps) {
  const firstVariant = products.variants[0];
  return (
    <div className="">
      <Link href={"/"} className="flex flex-col gap-4">
        <Image
          src={firstVariant.imageUrl}
          alt={firstVariant.name}
          width={200}
          height={200}
          className="rounded-3xl"
        />

        <div className="flex max-w-[200px] flex-col gap-1">
          <p className="truncatte text-sm font-medium">{products.name}</p>

          <p className="text-muted-forenground truncate text-xs font-medium">
            {products.description}
          </p>

          <p className="truncate text-sm font-semibold">
            {formatCentsToBRL(firstVariant.priceInCents)}
          </p>
        </div>
      </Link>
    </div>
  );
}
