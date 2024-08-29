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
import Image from "next/image";
import { calculateAge } from "@/lib/utils";

const MembersContainer = ({ users = [] }: { users: any }) => {
  return (
    <section className="grid gap-8 py-12 px-4 md:px-6">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {users.map((user: any) => (
          <div
            className="bg-background rounded-lg overflow-hidden group"
            key={user._id}
          >
            <Link
              href={`/members/${user._id}`}
              className="block relative"
              prefetch={false}
            >
              <Image
                src={user?.image || user?.avatar || "/images/user.png"}
                width={300}
                height={300}
                alt="Profile picture"
                className="w-full h-[300px] aspect-square object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="sm">
                  View Profile
                </Button>
              </div>
            </Link>
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                {user.name}, {calculateAge(user?.dateOfBirth)}
              </h3>
              <p className="text-muted-foreground line-clamp-2">{user.city}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </section>
  );
};

export default MembersContainer;
