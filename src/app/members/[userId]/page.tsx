import MemberContainer from "@/components/members/MemberContainer";
import { userByIdAction } from "@/server/actions/userAction";
import { notFound } from "next/navigation";
import React from "react";

const UserPage = async ({ params }: { params: { userId: string } }) => {
  const data = await userByIdAction({ userId: params.userId });

  if (!data?.user) {
    return notFound();
  }

  return (
    <div>
      <MemberContainer user={data?.user} />
    </div>
  );
};

export default UserPage;
