"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Moon, Sun, LayoutDashboard, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useEffect } from "react";

const Settings: React.FC = () => {
  const { theme, layout, setTheme, setLayout } = useSettingsStore();
  const [cacheCleared, setCacheCleared] = useState(true);

  // Apply layout class to root element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("compact-layout", "comfortable-layout");
    root.classList.add(`${layout}-layout`);
  }, [layout]);

  const handleClearCache = () => {
    setCacheCleared(true);
    setTimeout(() => {
      toast.success("All cached data has been removed");
      setCacheCleared(false);
    }, 1500);
  };

  return (
    <div className="p-[var(--card-padding)]">
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">
            Settings
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Customize your application preferences
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Theme Preference */}
          <div className="space-y-2">
            <Label className="text-gray-900 dark:text-white">
              Theme Preference
            </Label>
            <div className="flex gap-[var(--spacing-unit)]">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                className={`flex items-center gap-2 ${
                  theme === "light" ? "bg-blue-600 text-white" : ""
                }`}
                onClick={() => setTheme("light")}
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                className={`flex items-center gap-2 ${
                  theme === "dark" ? "bg-blue-600 text-white" : ""
                }`}
                onClick={() => setTheme("dark")}
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
            </div>
          </div>

          <Separator className="bg-gray-200 dark:bg-gray-700" />

          {/* Layout Preference */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label
                  htmlFor="layout-preference"
                  className="text-gray-900 dark:text-white"
                >
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                    <span>Compact Layout</span>
                  </div>
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {layout === "compact"
                    ? "Using space-efficient compact view"
                    : "Using spacious comfortable view"}
                </p>
              </div>
              <Switch
                id="layout-preference"
                checked={layout === "compact"}
                onCheckedChange={(checked) => {
                  const newLayout = checked ? "compact" : "comfortable";
                  setLayout(newLayout);
                  toast.success(`Layout changed to ${newLayout}`);
                }}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
          </div>

          <Separator className="bg-gray-200 dark:bg-gray-700" />

          {/* Clear Cache */}
          <div className="space-y-2">
            <Label className="text-gray-900 dark:text-white">
              Data Management
            </Label>
            <Button
              variant="destructive"
              onClick={handleClearCache}
              disabled={cacheCleared}
              className="w-full sm:w-auto"
            >
              {cacheCleared ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Clearing...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All Cached Data
                </>
              )}
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Remove all locally stored data and refresh from server
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;