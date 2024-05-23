"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { converter } from "@/lib/wroker";
interface Props {
  url: string;
}

const Convert = ({ url }: Props) => {
  const [data, setData] = useState<Object>("");
  return (
    <Button
      variant="default"
      onClick={async () => {
        const res = await converter(url);
        console.log(res);
      }}
    >
      Convert
    </Button>
  );
};

export default Convert;
