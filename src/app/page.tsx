import CategorySelector from "@/components/common/category-selector";
import Header from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import Image from "next/image";

export default async function Home() {
  // chamada para buscar os produtos do banco de dados
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const categorys = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <div className="space-y-4">
        {/* config para a image se adaptar a tela sem quebrar */}
        <div className="px-5">
          <Image
            alt="Leve uma vida com estilo"
            src={"/banner01.png"}
            height={0}
            width={0}
            sizes="100vh"
            className="h-auto w-full"
          />
        </div>

        <ProductList products={products} title="Mais vendidos" />

        {/* categorys */}
        <div className="px-5">
          <CategorySelector categorys={categorys} />
        </div>

        <div className="px-5">
          <Image
            alt="Leve uma vida com estilo"
            src={"/banner02.png"}
            height={0}
            width={0}
            sizes="100vh"
            className="h-auto w-full"
          />
        </div>
      </div>
    </>
  );
}
