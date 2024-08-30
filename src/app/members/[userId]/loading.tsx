import { Progress } from "@/components/ui/progress";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80dvh] bg-background">
      <div className="flex flex-col items-center space-y-4">
        <HeartIcon className="h-12 w-12 text-primary animate-pulse" />
        <Progress value={50} className="w-32 animate-pulse" />
      </div>
    </div>
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
