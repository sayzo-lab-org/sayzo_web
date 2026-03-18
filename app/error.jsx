"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "../components/ui/button";

export default function Error({ error, reset }) {
  useEffect(() => {
    // console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mb-8">
          We're sorry, but something unexpected happened. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
           size="sayzobtn"
            onClick={reset}
            className="flex items-center gap-2  bg-black text-white  hover:bg-gray-800 transition font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>

          <Button
           size="sayzobtn"
           variant="outline"
           >
            <Link
            href="/"
            className="flex items-center gap-2  text-gray-700  transition font-medium"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
