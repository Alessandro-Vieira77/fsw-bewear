import Header from "@/components/common/header";
import ProductItem from "@/components/common/product-item";
import { db } from "@/db";
import { categoryTable, productTable } from "@/db/schema";
import { eq, Param } from "drizzle-orm";
import { notFound } from "next/navigation";

interface CategoryParamsProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: CategoryParamsProps) => {
  const { slug } = await params;
  //   buscar categoria
  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });

  if (!category) {
    return notFound();
  }

  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      <div className="space-y-4 px-5">
        <h2 className="font-semibold">{category.name}</h2>
        <div className="grid grid-cols-2 gap-2">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              products={product}
              title=""
              textContainerClassName="max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
