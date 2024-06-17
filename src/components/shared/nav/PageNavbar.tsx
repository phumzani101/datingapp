/**
 * v0 by Vercel.
 * @see https://v0.dev/t/M9h82ZZbeTX
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { GiMatchTip } from "react-icons/gi";

export default function PageNavbar() {
  return (
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6 bg-gradient-to-r from-purple-400 to-purple-700">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <HeartIcon className="h-6 w-6 text-pink-500" />
          <span className="text-2xl font-bold">Heartbeat</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex text-white">
          <Link
            href="/members"
            className="text-sm uppercase font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
            prefetch={false}
          >
            Matches
          </Link>
          <Link
            href="/lists"
            className="text-sm uppercase font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
            prefetch={false}
          >
            Lists
          </Link>
          <Link
            href="/messages"
            className="text-sm uppercase font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
            prefetch={false}
          >
            Messages
          </Link>
        </nav>
        <div className="flex justify-end">
          <Link href="/auth/signin">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-4 p-4">
            <Link
              href="#"
              className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
              prefetch={false}
            >
              Matches
            </Link>
            <Link
              href="#"
              className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
              prefetch={false}
            >
              Lists
            </Link>
            <Link
              href="#"
              className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
              prefetch={false}
            >
              Messages
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
