"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true

    // Simulate login process (you can replace this with real logic)
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        login(username);
        router.push("/dashboard");
      } else {
        setError("Invalid credentials. Try again.");
      }
      setIsLoading(false); // Set loading state to false after the operation
    }, 1500); // Simulate a delay
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary/50 dark:bg-secondary-dark">
      <Card className="w-96 bg-white dark:bg-gray-900 shadow-lg rounded-lg border-none">
        <CardHeader>
          <CardTitle className="text-center text-gray-900 dark:text-white text-xl">
            GitHub Analytics
          </CardTitle>
          <p className="text-center text-gray-700 dark:text-gray-400 text-sm">
            Sign in to your account
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 rounded-md p-2"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 rounded-md p-2"
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-blue-700 text-white hover:bg-blue-500 dark:bg-blue-800 dark:hover:bg-blue-600 transition-all py-2 rounded-md"
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? (
                <div className="flex justify-center items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-t-2 border-white rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
