"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
interface Props {
  url: string;
}

const DeleteButton = ({ url }: Props) => {
  const [loading, isLoading] = useState(false);
  const router = useRouter();
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        isLoading(true);
        const response = await fetch("api/upload", {
          method: "DELETE",
          body: JSON.stringify({ url }),
        });
        isLoading(false);
        router.refresh();
      }}
    >
      {loading ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteButton;
