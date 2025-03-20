import React from "react";
import { Link } from "react-router-dom"; // ✅ Use React Router instead of Next.js Link
import { Button } from "../components/ui/button"; // ✅ Adjust import paths
import { ThemeToggle } from "../theme/theme-toggle";

export default function Header() {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/home" className="text-2xl font-bold text-primary">
              StudentSwap
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link
              to="#features"
              className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              List With Us
            </Link>
            <Link
              to="#testimonials"
              className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contracts
            </Link>
            <Link
              to="#pricing"
              className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Account
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" className="hidden sm:inline-flex">
              Log in
            </Button>
            <Button>Sign up</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

