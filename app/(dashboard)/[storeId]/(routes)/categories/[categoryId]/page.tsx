import prismadb from "@/lib/prismadb";
import React from "react";
import { CategoryForm } from "./components/CategoryForm";

const CategoryPage = async ({
  params: { categoryId, storeId },
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const catogery = await prismadb.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={catogery} billboards={billboards} />
      </div>
    </div>
  );
};

export default CategoryPage;
