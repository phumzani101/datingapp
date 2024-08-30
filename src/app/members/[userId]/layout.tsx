import UserSidebar from "@/components/members/UserSidebar";
import { userByIdAction } from "@/server/actions/userAction";
import { notFound } from "next/navigation";

export default async function UserLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { userId: string };
}>) {
  const data = await userByIdAction({ userId: params.userId });

  if (!data?.user) {
    return notFound();
  }
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      <UserSidebar user={data.user} />
      <div className="bg-background p-6 rounded-l-lg md:p-12 flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
