"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun, Github, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function LandingPage() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { layout } = useSettingsStore();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className={`min-h-screen ${layout}-layout transition-all duration-300`}>
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
          <Github className="h-8 w-8" />
          <span className="text-xl font-bold">GitHub Analytics</span>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button onClick={handleLogin}>
            Sign In <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-20 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          GitHub Insights
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10">
          Unlock powerful analytics for your GitHub repositories. Track
          contributions, visualize activity, and gain deeper insights into your
          projects.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" onClick={handleLogin}>
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} GitHub Analytics. All rights reserved.</p>
      </footer>
    </div>
  );
}