"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";

export const FileComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileInput = React.useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        console.log("success");
      } else {
        console.log("upload failed");
      }
    }
    console.log("success");
  };
  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <form onSubmit={handleSubmit}>
        <Input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
