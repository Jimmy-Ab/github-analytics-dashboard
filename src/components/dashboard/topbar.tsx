import React from "react";
import { Moon, Sun, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/authStore";
import { useSettingsStore } from "@/store/useSettingsStore";

const Topbar: React.FC = () => {
  const { username, logout } = useAuthStore();
  const { theme, setTheme } = useSettingsStore();

  const handleLogout = () => {
    logout();
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div
      className={`
      h-16 border-b 
      border-gray-200 dark:border-gray-800 
      flex items-center justify-between px-6 
      sticky top-0 z-20 
      bg-white/80 dark:bg-gray-900 
      backdrop-blur-md
    `}
    >
      {/* Left side */}
      <div>
        <h1 className="text-xl font-medium text-gray-900 dark:text-white">
          GitHub Analytics
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          onClick={toggleTheme}
          aria-label={
            theme === "light" ? "Switch to dark mode" : "Switch to light mode"
          }
        >
          {theme === "light" ? (
            <Moon size={20} className="text-gray-700 dark:text-gray-300" />
          ) : (
            <Sun size={20} className="text-gray-700 dark:text-gray-300" />
          )}
        </Button>
        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                  {getInitials(username || "User")}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal bg-white dark:bg-gray-800">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">
                  {username}
                </p>
                <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                  @{username?.toLowerCase()}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
            <DropdownMenuItem
              className="cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Topbar;
