import React from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { userListAction } from "@/server/actions/userAction";
import MembersContainer from "@/components/members/MembersContainer";
import MembersFilter from "@/components/members/MembersFilter";

const MembersPage = async () => {
  const data = (await userListAction({})) as any;
  return (
    <div className="users flex-1">
      <MembersFilter />
      <MembersContainer users={data.users} />
    </div>
  );
};

export default MembersPage;
