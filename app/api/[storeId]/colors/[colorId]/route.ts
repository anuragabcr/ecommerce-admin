import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params: { colorId } }: { params: { colorId: string } }
) {
  try {
    if (!colorId) {
      return new NextResponse("colorId is required", { status: 400 });
    }

    const color = await prismadb.color.findMany({
      where: {
        id: colorId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET]", error);
    return new NextResponse("Inter Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params: { storeId, colorId },
  }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("value is required", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("colorId is required", { status: 400 });
    }

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

    const color = await prismadb.color.updateMany({
      where: {
        id: colorId,
      },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_PATCH]", error);
    return new NextResponse("Inter Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params: { storeId, colorId },
  }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("colorId is required", { status: 400 });
    }

    const storeByUserID = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserID) {
      return new NextResponse("You cann't delete a color in this store", {
        status: 401,
      });
    }

    const color = await prismadb.color.delete({
      where: {
        id: colorId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return new NextResponse("Inter Error", { status: 500 });
  }
}
