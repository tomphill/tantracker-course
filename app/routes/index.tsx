import { createFileRoute, Link } from "@tanstack/react-router";
import cover from "@/assets/cover.webp";
import { ChartColumnBigIcon } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/tanstack-start";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-[400px] h-[calc(100vh-80px)] flex items-center justify-center relative">
      <img
        src={cover}
        alt=""
        className="absolute top-0 left-0 object-cover object-center size-full opacity-50"
      />
      <div className="flex flex-col gap-4 text-center relative z-10">
        <h1 className="text-5xl font-bold flex gap-1 items-center">
          <ChartColumnBigIcon size={60} className="text-lime-500" /> TanTracker
        </h1>
        <p className="text-2xl">Track your finances with ease</p>
        <SignedIn>
          <Button asChild size="lg">
            <Link to="/dashboard">Go To Your Dashboard</Link>
          </Button>
        </SignedIn>
        <SignedOut>
          <div className="flex gap-2 items-center justify-center">
            <Button asChild size="lg" className="bg-lime-600 hover:bg-lime-700">
              <SignInButton />
            </Button>
            <Button asChild size="lg">
              <SignUpButton />
            </Button>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}
