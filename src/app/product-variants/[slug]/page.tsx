import Header from "@/components/common/header";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatCentsToBRL } from "@/helpers/money";
import { Button } from "@/components/ui/button";
import ProductList from "@/components/common/product-list";
import Footer from "@/components/common/footer";
import VariantSelector from "@/app/category/components/variant-selector";
import QuantitySelector from "@/app/category/components/quantity-selector";

interface ProductsVariantsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductVariantsPage({
  params,
}: ProductsVariantsPageProps) {
  const { slug } = await params;

  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      {/* Image : para ter um melhor controle sobre o tamaho da imagem*/}

      <div className="flex flex-col space-y-6">
        <Image
          alt={productVariant.slug}
          src={productVariant.imageUrl}
          width={0}
          height={0}
          sizes="100vh"
          className="h-auto w-full"
        />

        <div className="px-5">
          <VariantSelector
            selectedVariantSlug={productVariant.slug}
            variants={productVariant.product.variants}
          />
        </div>

        <div className="px-5">
          {/* descrição */}
          <h2 className="text-lg font-semibold">
            {productVariant.product.name}
          </h2>
          <h3 className="text-muted-foreground text-sm">
            {productVariant.name}
          </h3>
          <h3 className="text-lg font-semibold">
            {formatCentsToBRL(productVariant.priceInCents)}
          </h3>
        </div>

        <div className="px-5">
          <QuantitySelector />
        </div>

        <div className="flex flex-col space-y-4 px-5">
          {/* botões */}
          <Button className="rounded-full" variant={"outline"} size={"lg"}>
            Adicionar á sacola
          </Button>
          <Button className="rounded-full" size={"lg"}>
            Comprar agora
          </Button>
        </div>

        <div className="px-5">
          <p className="text-shadow-amber-500">
            {productVariant.product.description}
          </p>
        </div>

        <ProductList title="Talvez você goste" products={likelyProducts} />

        <Footer />
      </div>
    </>
  );
}
