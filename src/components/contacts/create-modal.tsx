"use client";

import { BsPlusLg } from "react-icons/bs";
import { Button, Modal, FormContact } from "@/components";
import { useState } from "react";

export function CreateModal() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button variant="ghost" className="ml-auto" onClick={() => setOpen(true)}>
        <BsPlusLg />
      </Button>

      <Modal
        title="Create contact"
        size="xs"
        isOpen={open}
        close={() => setOpen(false)}
      >
        <FormContact />
      </Modal>
    </>
  );
}
