import prismadb from "@/lib/prismadb";

const DashboardPage = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
    },
  });

  return <div>Active Store: {store?.id}</div>;
};

export default DashboardPage;
