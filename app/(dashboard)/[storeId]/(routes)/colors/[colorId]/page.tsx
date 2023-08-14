import { ColorForm } from "./components/ColorForm";
import prismadb from "@/lib/prismadb";
import React from "react";

const ColorPage = async ({
  params: { colorId },
}: {
  params: { colorId: string };
}) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
