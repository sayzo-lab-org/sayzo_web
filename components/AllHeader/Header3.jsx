"use client";

import Link from "next/link";
import { Search, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeaderSearch = () => {
  return (
    <header className="w-full border-b border-border bg-background">
      <div className=" max-w-320 mx-auto">
        <div className="h-16 flex items-center justify-between gap-6">
          
          {/* LEFT: Logo */}
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

          {/* CENTER: Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="What do you need help with?"
                className="w-full h-10 rounded-full bg-muted pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/category"
              className="text-sm font-medium text-foreground hover:text-primary transition"
            >
                <Button  size="sm"  className="gap-1.5 bg-transparent text-black hover:bg-transparent">
              Uses Cases
              </Button>
            </Link>
            

            <Button size="sm" className="gap-2 bg-primary-btn">
              <Plus className="h-4 w-4" />
              Post Task
            </Button>

            <Button variant="outline" size="sm"  className="gap-1.5">
              <User className="h-4 w-4" />
              Join Waitlist
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSearch;
