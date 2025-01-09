// app/routes/__root.tsx
import {
  Link,
  Outlet,
  ScrollRestoration,
  createRootRoute,
  useNavigate,
} from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";
import appCss from "../app.css?url";
import poppins100 from "@fontsource/poppins/100.css?url";
import poppins200 from "@fontsource/poppins/200.css?url";
import poppins300 from "@fontsource/poppins/300.css?url";
import poppins400 from "@fontsource/poppins/400.css?url";
import poppins500 from "@fontsource/poppins/500.css?url";
import poppins600 from "@fontsource/poppins/600.css?url";
import poppins700 from "@fontsource/poppins/700.css?url";
import poppins800 from "@fontsource/poppins/800.css?url";
import poppins900 from "@fontsource/poppins/900.css?url";
import { ChartColumnBigIcon } from "lucide-react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/tanstack-start";
import { Button } from "@/components/ui/button";
import { getSignedInUserId } from "@/data/getSignedInUserId";
import { Toaster } from "@/components/ui/toaster";

export const Route = createRootRoute({
  pendingMs: 0,
  notFoundComponent() {
    return (
      <div className="text-3xl text-center py-10 text-muted-foreground">
        Oops! Page not found
      </div>
    );
  },
  beforeLoad: async () => {
    const userId = await getSignedInUserId();
    return {
      userId,
    };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "stylesheet", href: poppins100 },
      { rel: "stylesheet", href: poppins200 },
      { rel: "stylesheet", href: poppins300 },
      { rel: "stylesheet", href: poppins400 },
      { rel: "stylesheet", href: poppins500 },
      { rel: "stylesheet", href: poppins600 },
      { rel: "stylesheet", href: poppins700 },
      { rel: "stylesheet", href: poppins800 },
      { rel: "stylesheet", href: poppins900 },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const navigate = useNavigate();
  return (
    <ClerkProvider>
      <html>
        <head>
          <Meta />
        </head>
        <body>
          <nav className="bg-primary p-4 h-20 text-white flex items-center justify-between">
            <Link to="/" className="flex gap-1 items-center font-bold text-2xl">
              <ChartColumnBigIcon className="text-lime-500" /> TanTracker
            </Link>
            <div>
              <SignedOut>
                <div className="text-white flex items-center">
                  <Button asChild variant="link" className="text-white">
                    <SignInButton />
                  </Button>
                  <div className="w-[1px] h-8 bg-zinc-700" />
                  <Button asChild variant="link" className="text-white">
                    <SignUpButton />
                  </Button>
                </div>
              </SignedOut>
              <SignedIn>
                <UserButton
                  showName
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        border: "1px solid white",
                      },
                      userButtonOuterIdentifier: {
                        color: "white",
                      },
                    },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="Dashboard"
                      labelIcon={<ChartColumnBigIcon size={16} />}
                      onClick={() => {
                        navigate({
                          to: "/dashboard",
                        });
                      }}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </SignedIn>
            </div>
          </nav>
          {children}
          <Toaster />
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </ClerkProvider>
  );
}
