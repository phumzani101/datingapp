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

const MembersFilter = () => {
  return (
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
  )
}

export default MembersFilter