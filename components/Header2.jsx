"use client";

import { useState } from "react";
import { Menu, X, Users } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { categories } from "@/public/data/categories";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import WaitlistModal from "./JoinWaitList/WaitlistModal";

const Header2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  

  return (
    <>
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border ">
      <div className="container px-4 mx-auto  max-w-320 mx-auto">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-btn">
              <span className="font-display text-base font-bold text-primary-foreground">
                S
              </span>
            </div>
            <span className="font-display text-xl font-bold text-foreground tracking-tight">
              SAYZO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Browse Categories */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    Browse Categories
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <div className="w-[600px] p-4">
                      <div className="grid grid-cols-3 gap-2">
                        {categories.slice(0, 12).map((category) => (
                          <NavigationMenuLink asChild key={category.slug}>
                            <Link
                              href={`/category/${category.slug}`}
                              className="block p-3 rounded-lg hover:bg-muted transition-colors"
                            >
                              <p className="font-medium text-sm text-foreground">
                                {category.name}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {category.subCategories.length} services
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>

                      {categories.length > 12 && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <Link
                            href="/category"
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            View all {categories.length} categories →
                          </Link>
                        </div>
                      )}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* How it Works */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/#how-it-works"
                      className="inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                    >
                      How it Works
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Earn */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/#earn"
                      className="inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                    >
                      Earn with Sayzo
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button onClick={() => setIsModalOpen(true)} variant="ghost" size="sm">
              Join Waitlist
            </Button>
            <Link href="https://chat.whatsapp.com/LWT16zuqwdxDbBdAxGbLce" target="black"> <Button size="sm" className="gap-2 bg-primary-btn">
              <Users className="h-4 w-4" />
              Join Community
            </Button></Link>
           
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden border-t border-border py-4 space-y-4">
            {/* Categories */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2">
                Browse Categories
              </p>

              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 8).map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    onClick={() => setOpen(false)}
                    className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <p className="font-medium text-sm text-foreground">
                      {category.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {category.subCategories.length} services
                    </p>
                  </Link>
                ))}
              </div>

              <Link
                href="/category"
                onClick={() => setOpen(false)}
                className="block text-sm font-medium text-primary px-2 py-2"
              >
                View all categories →
              </Link>
            </div>

            {/* Quick Links */}
            <div className="space-y-2 pt-2 border-t border-border">
              <Link
                href="/#how-it-works"
                onClick={() => setOpen(false)}
                className="block px-2 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                How it Works
              </Link>
              <Link
                href="/#earn"
                onClick={() => setOpen(false)}
                className="block px-2 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Earn with Sayzo
              </Link>
            </div>

            {/* Mobile CTAs */}
            <div className="space-y-2 pt-2 border-t border-border">
              <Link  href="https://chat.whatsapp.com/LWT16zuqwdxDbBdAxGbLce" target="black"><Button className="w-full gap-2 bg-primary-btn hover:bg-primary-btn">
                <Users className="h-4 w-4" />
                Join the Sayzo Community
              </Button></Link>
              
              <Button onClick={() => setIsModalOpen(true)} variant="outline" className="w-full">
                Join the Waitlist
              </Button>
            </div>
          </div>
        )}
      </div>
    
    </header>
    <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header2;
