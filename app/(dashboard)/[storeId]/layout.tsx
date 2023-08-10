import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const DashboardLayout = async ({
  children,
  params: { storeId },
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <div>DashboardLayout</div>
      {children}
    </>
  );
};

export default DashboardLayout;
