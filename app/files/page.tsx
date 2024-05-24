import React from "react";
import { list } from "@vercel/blob";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import Convert from "@/components/Convert";

const Files = async () => {
  const { blobs } = await list();
  return (
    <section>
      {blobs.map((blob) => (
        <Card key={blob.pathname} className="flex p-4">
          <Link href={blob.url}>
            {" "}
            <CardTitle>{blob.pathname}</CardTitle>
          </Link>

          <CardFooter className="flex space-x-4">
            <DeleteButton url={blob.url} />
            <Convert url={blob.url} />
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};

export default Files;
