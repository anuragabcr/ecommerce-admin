import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  const { userId } = auth();
  const body = await req.json();
  const { label, imageUrl } = body;

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!storeId) {
    return new NextResponse("StoreId is required", { status: 400 });
  }

  if (!label) {
    return new NextResponse("Label is required", { status: 400 });
  }

  if (!imageUrl) {
    return new NextResponse("imageUrl is required", { status: 400 });
  }

  try {
    const storeByUserID = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserID) {
      return new NextResponse("You cann't create a billboard in this store", {
        status: 401,
      });
    }

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_POST]", error);
    return new NextResponse("Inter Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  try {
    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId,
      },
    });
    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Inter Error", { status: 500 });
  }
}
