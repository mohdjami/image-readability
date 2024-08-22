"use client";
import { Progress } from "@/components/ui/progress";

import { checkReadability } from "@/lib/chechReadabilty";
import { converter } from "@/lib/wroker";
import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";
import { Input } from "./ui/input";
import { Button, buttonVariants } from "./ui/button";
import { Card, CardDescription, CardTitle } from "./ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Console } from "console";

export default function FileComponent() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [text, setText] = useState<any | null>(null);
  const [level, setLevel] = useState("");
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [score, setScore] = useState(1);

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
      const { Level, Score } = await checkReadability(res!);
      console.log(Level, Score);
      setLevel(Level);
      setScore(+Score);
      setText(res);
      setBlob(newBlob);
      isLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      isLoading(false);
    }
  };
  return (
    <main className="m-10">
      <div className="mx-40">
        <CardTitle className="">
          <div
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 flex items-center justify-between flex-col"
            role="alert"
          >
            <Label className="text-center text-lg lg:text-4xl">
              Image Readability Checker
            </Label>
          </div>
          <Card className="bg-yellow-200 text-yellow-700 rounded-full p-2 hover:bg-yellow-300 focus:outline-none items-center text-center">
            <p>Use Images which include Texts.</p>
          </Card>
        </CardTitle>
      </div>{" "}
      <section className="h-full w-full">
        <div className="grid gap-4 py-2 m-32">
          <div className="gap-4">
            <form
              onSubmit={handleSubmit}
              className="grid lg:grid-cols-3 lg:gap-4"
            >
              <Input name="file" ref={inputFileRef} type="file" required />
              <Button type="submit">
                {loading ? "Loading..." : "Check Readability"}
              </Button>
              <Link
                className={cn(buttonVariants({ variant: "default" }))}
                href="/files"
              >
                View Files
              </Link>
            </form>
          </div>{" "}
        </div>
      </section>
      <section>
        <div className="grid lg:grid-cols-3 gap-4 justify-between items-center">
          {blob ? (
            <Card className="p-5 grid gap-4">
              <CardTitle>Image Name: &nbsp; {blob.pathname}</CardTitle>
              <CardDescription className="py-5 lg:text-xl text-sm">
                Image url: <Link href={blob.url}>{blob.url}</Link>
              </CardDescription>
            </Card>
          ) : (
            <Card className="p-5 grid gap-4 lg:h-[200px] lg:w-[200px] h-auto w-auto">
              <CardTitle className="flex gap-4"></CardTitle>
              <CardDescription className="py-5 lg:text-xl text-sm">
                {/* Image url: <Link href={blob.url}>{blob.url}</Link> */}
              </CardDescription>
            </Card>
          )}
          {text ? (
            <Card className="p-5 grid gap-4">
              {" "}
              <CardTitle>Text Extracted</CardTitle>
              <CardDescription className="py-5 lg:text-xl text-sm">
                {text}
              </CardDescription>{" "}
            </Card>
          ) : (
            <Card className="p-5 grid gap-4 lg:h-[200px] lg:w-[200px] h-auto w-auto">
              <CardTitle className="flex gap-4"></CardTitle>
              <CardDescription className="py-5 lg:text-xl text-sm">
                {/* Image url: <Link href={blob.url}>{blob.url}</Link> */}
              </CardDescription>
            </Card>
          )}

          <div className="flex items-center justify-center">
            {level ? (
              <Card className="p-5 grid grid-row-2 gap-4">
                <CardDescription className="py-5 lg:text-xl text-sm">
                  Image Visibility Level
                  <Progress value={score} />
                </CardDescription>
                <CardTitle>{level}</CardTitle>
              </Card>
            ) : (
              <Card className="p-5 grid gap-4 lg:h-[200px] lg:w-[200px] h-auto w-auto">
                <CardTitle className="flex gap-4"></CardTitle>
                <CardDescription className="py-5 lg:text-xl text-sm">
                  {/* Image url: <Link href={blob.url}>{blob.url}</Link> */}
                </CardDescription>
              </Card>
            )}
          </div>
          {error && (
            <Card className="p-5 grid grid-row-2 gap-4">
              <CardTitle>Something went wrong</CardTitle>
              <CardDescription className="py-5 lg:text-xl text-sm">
                {error}
              </CardDescription>
            </Card>
          )}
        </div>
      </section>
    </main>
  );
}
