import { ShoppingBasketIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

export default function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent></SheetContent>
    </Sheet>
  );
}
