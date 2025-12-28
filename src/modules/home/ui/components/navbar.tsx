"use client";

import { Button } from "@/components/ui/button";
import { UserControl } from "@/components/user-control";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import {
  ClerkProvider,
  SignIn,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  const isScrolled = useScroll();
  return (
    <>
      <nav
        className={cn(
          "p-4 bg-transparent fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-transparent",
          isScrolled && "bg-background border-border"
        )}
      >
        <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
          <Link href={"/"} className="flex items-center gap-2">
            <Image src={"/logo.svg"} alt="Kikaku" width={40} height={40} />
            <span className="font-semibold">
              <h2> Kikaku</h2>
            </span>
          </Link>
          <SignedOut>
            <div className="flex gap-2">
              <SignUpButton>
                <Button variant={"outline"} size={"sm"}>
                  Sign up
                </Button>
              </SignUpButton>
              <SignInButton>
                <Button size={"sm"}>Sign in</Button>
              </SignInButton>
            </div>
          </SignedOut>
          <SignedIn>
            <UserControl showname />
          </SignedIn>
        </div>
      </nav>
    </>
  );
};
