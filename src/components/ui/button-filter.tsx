import { BsFilter } from "react-icons/bs";
import { Button } from "./button";

export function ButtonFilter() {
  return (
    <Button className="flex items-center gap-1 py-0" variant="ghost">
      <BsFilter /> Filters
    </Button>
  );
}
