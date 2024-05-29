"use client";

import { BsPlusLg } from "react-icons/bs";
import { Button, FormContact } from "@/components";
import { useState } from "react";

export function CreateModal() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button variant="ghost" className="ml-auto" onClick={() => setOpen(true)}>
        <BsPlusLg />
      </Button>

      <FormContact open={open} close={() => setOpen(false)} />
    </>
  );
}
