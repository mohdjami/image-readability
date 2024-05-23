"use client";
import React from "react";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
interface Props {
  url: string;
}

const DeleteButton = ({ url }: Props) => {
  const router = useRouter();
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        const response = await fetch("api/upload", {
          method: "DELETE",
          body: JSON.stringify({ url }),
        });
        router.refresh();
      }}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
