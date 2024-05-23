"use client";

import { checkReadability } from "@/lib/chechReadabilty";
import { converter } from "@/lib/wroker";
import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";
import { Input } from "./ui/input";
import { Button, buttonVariants } from "./ui/button";
import { Card, CardDescription, CardTitle } from "./ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Label } from "./ui/label";

export default function FileComponent() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [text, setText] = useState<any | null>(null);
  const [Level, setLevel] = useState(Number);
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState<any>();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    try {
      event.preventDefault();
      isLoading(true);
      if (!inputFileRef.current?.files) {
        throw new Error("No file selected");
      }

      const file = inputFileRef.current.files[0];

      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const newBlob = (await response.json()) as PutBlobResult;

      const res = await converter(newBlob?.url || "");
      const level = await checkReadability(res!);
      setText(res);
      setLevel(level);
      setBlob(newBlob);
      isLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      isLoading(false);
    }
  };
  return (
    <>
      <div className="grid gap-4 py-8">
        <Label className="text-center text-4xl">
          Image Readability Checker
        </Label>
        <div className="flex">
          <form onSubmit={handleSubmit} className="flex">
            <Input name="file" ref={inputFileRef} type="file" required />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="submit">
              {loading ? "Loading..." : "Check Readability"}
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </form>
          <Link
            className={cn(buttonVariants({ variant: "default" }))}
            href="/files"
          >
            View Files
          </Link>
        </div>{" "}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {blob && (
          <Card className="p-5 grid gap-4">
            <CardTitle className="flex gap-4">
              Image Name: {blob.pathname}
            </CardTitle>
            <CardDescription className="py-5 text-xl">
              Image url: <Link href={blob.url}>{blob.url}</Link>
            </CardDescription>
          </Card>
        )}
        {text && (
          <Card className="p-5 grid gap-4">
            {" "}
            <CardTitle>Text Extracted</CardTitle>
            <CardDescription className="py-5 text-xl">
              {text}
            </CardDescription>{" "}
          </Card>
        )}
        {Level && (
          <Card className="p-5 grid grid-row-2 gap-4">
            <CardDescription className="py-5 text-xl">
              Image Visibility Level
            </CardDescription>
            <CardTitle>{Level}</CardTitle>
          </Card>
        )}
        {error && (
          <Card className="p-5 grid grid-row-2 gap-4">
            <CardTitle>Something went wrong</CardTitle>
            <CardDescription className="py-5 text-xl">{error}</CardDescription>
          </Card>
        )}
      </div>
    </>
  );
}
