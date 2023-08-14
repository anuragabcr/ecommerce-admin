import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  const { userId } = auth();
  const body = await req.json();
  const { name, value } = body;

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!storeId) {
    return new NextResponse("StoreId is required", { status: 400 });
  }

  if (!name) {
    return new NextResponse("name is required", { status: 400 });
  }

  if (!value) {
    return new NextResponse("value is required", { status: 400 });
  }

  try {
    const storeByUserID = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserID) {
      return new NextResponse("You cann't create a Size in this store", {
        status: 401,
      });
    }

    const size = await prismadb.size.create({
      data: {
        name,
        value,
        storeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_POST]", error);
    return new NextResponse("Inter Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  try {
    const sizes = await prismadb.size.findMany({
      where: {
        storeId,
      },
    });
    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZE_GET]", error);
    return new NextResponse("Inter Error", { status: 500 });
  }
}
