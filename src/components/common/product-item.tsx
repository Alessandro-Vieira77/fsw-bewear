"use client";
import { productTable, productVariantTable } from "@/db/schema";
import Link from "next/link";
import Image from "next/image";
import { formatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";

//  produtos e variantes
interface ProductListProps {
  title: string;
  products: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassName?: string;
}

export default function ProductItem({
  products,
  textContainerClassName,
}: ProductListProps) {
  const firstVariant = products.variants[0];
  return (
    <div className="">
      <Link
        href={`/product-variants/${firstVariant.slug}`}
        className="flex flex-col gap-4"
      >
        <Image
          src={firstVariant.imageUrl}
          alt={firstVariant.name}
          sizes="100vh"
          width={0}
          height={0}
          className="h-auto w-auto rounded-3xl"
        />

        <div
          className={cn(
            "flex max-w-[200px] flex-col gap-1",
            textContainerClassName,
          )}
        >
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
