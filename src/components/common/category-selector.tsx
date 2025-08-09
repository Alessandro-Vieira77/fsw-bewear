import { categoryTable } from "@/db/schema";
import { Button } from "../ui/button";
import Link from "next/link";

interface CategorySelectorProps {
  categorys: (typeof categoryTable.$inferSelect)[];
}

export default function CategorySelector({ categorys }: CategorySelectorProps) {
  return (
    <div className="rounded-3xl bg-[#F4EFFF] p-5">
      <div className="grid grid-cols-2 gap-3">
        {categorys.map((category) => (
          <Link key={category.id} href={`/category/${category.slug}`}>
            <Button
              variant={"ghost"}
              className="w-full rounded-full bg-white text-xs font-semibold"
            >
              {category.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
