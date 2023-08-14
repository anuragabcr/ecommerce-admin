import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params: { sizeId } }: { params: { sizeId: string } }
) {
  try {
    if (!sizeId) {
      return new NextResponse("sizeId is required", { status: 400 });
    }

    const size = await prismadb.size.findMany({
      where: {
        id: sizeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET]", error);
    return new NextResponse("Inter Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params: { storeId, sizeId },
  }: { params: { storeId: string; sizeId: string } }
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

    if (!sizeId) {
      return new NextResponse("sizeId is required", { status: 400 });
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

    const size = await prismadb.size.updateMany({
      where: {
        id: sizeId,
      },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[size_PATCH]", error);
    return new NextResponse("Inter Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params: { storeId, sizeId },
  }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("sizeId is required", { status: 400 });
    }

    const storeByUserID = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserID) {
      return new NextResponse("You cann't delete a size in this store", {
        status: 401,
      });
    }

    const size = await prismadb.size.delete({
      where: {
        id: sizeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return new NextResponse("Inter Error", { status: 500 });
  }
}
