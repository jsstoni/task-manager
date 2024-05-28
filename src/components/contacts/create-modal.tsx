"use client";

import { BsPlusLg } from "react-icons/bs";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { useState } from "react";
import { Input } from "../ui/input";

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
        <form action="">
          <label htmlFor="name">Name</label>
          <Input name="name" id="name" />

          <label htmlFor="mail">Email</label>
          <Input name="mail" id="mail" />

          <Button variant="secondary" className="mt-4">
            Save
          </Button>
        </form>
      </Modal>
    </>
  );
}
