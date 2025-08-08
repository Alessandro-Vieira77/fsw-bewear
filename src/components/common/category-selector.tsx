import { categoryTable } from "@/db/schema";
import { Button } from "../ui/button";

interface CategorySelectorProps {
  categorys: (typeof categoryTable.$inferSelect)[];
}

export default function CategorySelector({ categorys }: CategorySelectorProps) {
  return (
    <div className="rounded-3xl bg-[#F4EFFF] p-5">
      <div className="grid grid-cols-2 gap-3">
        {categorys.map((category) => (
          <Button
            key={category.id}
            variant={"ghost"}
            className="rounded-full bg-white text-xs font-semibold"
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
