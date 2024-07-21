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

const MembersPage = () => {
  return (
    <main className="flex-1">
      <section className="bg-muted py-8 px-4 md:px-6">
        <div className="grid gap-6">
          <div className="grid gap-4">
            <h1 className="text-3xl font-bold">Find your perfect match</h1>
            <p className="text-muted-foreground">
              Use our advanced filters to find the right person for you.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18-25">18-25</SelectItem>
                  <SelectItem value="26-35">26-35</SelectItem>
                  <SelectItem value="36-45">36-45</SelectItem>
                  <SelectItem value="46-55">46-55</SelectItem>
                  <SelectItem value="56+">56+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="los-angeles">Los Angeles</SelectItem>
                  <SelectItem value="chicago">Chicago</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="tokyo">Tokyo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="interests">Interests</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any interests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="art">Art</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="relationship">Relationship</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="dating">Dating</SelectItem>
                  <SelectItem value="engaged">Engaged</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Apply Filters</Button>
          </div>
        </div>
      </section>
      <section className="grid gap-8 py-12 px-4 md:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-background rounded-lg overflow-hidden group">
            <Link href="#" className="block relative" prefetch={false}>
              <img
                src="/placeholder.svg"
                width={300}
                height={300}
                alt="Profile picture"
                className="w-full h-[300px] object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="sm">
                  View Profile
                </Button>
              </div>
            </Link>
            <div className="p-4">
              <h3 className="text-lg font-semibold">Jane Doe</h3>
              <p className="text-muted-foreground line-clamp-2">
                Hi, I&apos;m Jane! I love traveling, trying new foods, and
                spending time with my friends. Let&apos;s chat and see if we
                click!
              </p>
            </div>
          </div>
          <div className="bg-background rounded-lg overflow-hidden group">
            <Link href="#" className="block relative" prefetch={false}>
              <img
                src="/placeholder.svg"
                width={300}
                height={300}
                alt="Profile picture"
                className="w-full h-[300px] object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="sm">
                  View Profile
                </Button>
              </div>
            </Link>
            <div className="p-4">
              <h3 className="text-lg font-semibold">John Smith</h3>
              <p className="text-muted-foreground line-clamp-2">
                Hey there! I&apos;m John, an adventurous guy who loves the
                outdoors. I&apos;m looking for someone to share my passions
                with. Let&apos;s connect!
              </p>
            </div>
          </div>
          <div className="bg-background rounded-lg overflow-hidden group">
            <Link href="#" className="block relative" prefetch={false}>
              <img
                src="/placeholder.svg"
                width={300}
                height={300}
                alt="Profile picture"
                className="w-full h-[300px] object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="sm">
                  View Profile
                </Button>
              </div>
            </Link>
            <div className="p-4">
              <h3 className="text-lg font-semibold">Sarah Lee</h3>
              <p className="text-muted-foreground line-clamp-2">
                Hi, I&apos;m Sarah! I&apos;m a creative soul who loves art,
                music, and good conversation. I&apos;m looking for someone who
                shares my passions. Let&apos;s chat!
              </p>
            </div>
          </div>
          <div className="bg-background rounded-lg overflow-hidden group">
            <Link href="#" className="block relative" prefetch={false}>
              <img
                src="/placeholder.svg"
                width={300}
                height={300}
                alt="Profile picture"
                className="w-full h-[300px] object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="sm">
                  View Profile
                </Button>
              </div>
            </Link>
            <div className="p-4">
              <h3 className="text-lg font-semibold">Michael Chen</h3>
              <p className="text-muted-foreground line-clamp-2">
                Hey there! I&apos;m Michael, a tech-savvy guy who loves learning
                new things. I&apos;m looking for someone who shares my curiosity
                and sense of adventure. Let&apos;s connect!
              </p>
            </div>
          </div>
          <div className="bg-background rounded-lg overflow-hidden group">
            <Link href="#" className="block relative" prefetch={false}>
              <img
                src="/placeholder.svg"
                width={300}
                height={300}
                alt="Profile picture"
                className="w-full h-[300px] object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="sm">
                  View Profile
                </Button>
              </div>
            </Link>
            <div className="p-4">
              <h3 className="text-lg font-semibold">Emily Wang</h3>
              <p className="text-muted-foreground line-clamp-2">
                Hi, I&apos;m Emily! I&apos;m a foodie who loves trying new
                cuisines and exploring different cultures. I&apos;m looking for
                someone who shares my passion for adventure. Let&apos;s chat!
              </p>
            </div>
          </div>
          <div className="bg-background rounded-lg overflow-hidden group">
            <Link href="#" className="block relative" prefetch={false}>
              <img
                src="/placeholder.svg"
                width={300}
                height={300}
                alt="Profile picture"
                className="w-full h-[300px] object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="sm">
                  View Profile
                </Button>
              </div>
            </Link>
            <div className="p-4">
              <h3 className="text-lg font-semibold">David Kim</h3>
              <p className="text-muted-foreground line-clamp-2">
                Hey there! I&apos;m David, a fitness enthusiast who loves
                staying active. I&apos;m looking for someone who shares my
                passion for a healthy lifestyle. Let&apos;s connect and see
                where it goes!
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button variant="outline">Load More</Button>
        </div>
      </section>
    </main>
  );
};

export default MembersPage;
