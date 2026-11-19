"use client";

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  SignedOut,
  SignedIn,
  useUser,
} from "@clerk/nextjs";
import { cn } from "cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Library", href: "/" },
  { label: "Add New", href: "/books/new" },
  { label: "Pricing", href: "/subscriptions" },
];

export default function Navbar() {
  const pathName = usePathname();
  const { user } = useUser();

  return (
    <header className="w-full fixed z-50 bg-(--bg-primary)">
      <div className="wrapper navbar-height py-4 flex justify-between items-center">
        <Link href="/" className="flex gap-0.5 items-center">
          <Image src="/assets/logo.png" alt="Bookfied" width={42} height={26} />
          <span className="logo-text">BookTalk</span>
        </Link>

        <nav className="w-fit flex gap-7.5 items-center">
          {navItems.map(({ label, href }) => {
            const isActive =
              pathName === href || (href !== "/" && pathName.startsWith(href));

            return (
              <Link
                href={href}
                key={label}
                className={cn(
                  "nav-link-base",
                  isActive ? "nav-link-active" : "text-black hover:opacity-70",
                )}
              >
                {label}
              </Link>
            );
          })}
          <Show when="signed-out">
            <SignInButton mode="redirect">
              <button className="nav-btn">Sign In</button>
            </SignInButton>
            <SignUpButton mode="redirect">
              <button className="nav-btn text-(--color-brand)">Sign Up</button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <div className="nav-user-link">
              <UserButton />
              {user?.firstName && (
                <Link href="/subscriptions" className="nav-user-name">
                  {user.firstName[0].toUpperCase() + user.firstName.slice(1)}
                </Link>
              )}
            </div>
          </Show>

          {/* <div className="flex gap-7.5 items-center">
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
            <SignedIn>
              <div className="nav-user-link">
                <UserButton />
                {user?.firstName && (
                  <Link href="/subscriptions" className="nav-user-name">
                    {user.firstName}
                  </Link>
                )}
              </div>
            </SignedIn>
          </div> */}
        </nav>
      </div>
    </header>
  );
}
