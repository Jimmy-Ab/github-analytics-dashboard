"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Link as LinkIcon, Search, Github, Users, GitBranch } from "lucide-react";
import Link from "next/link";
import { useGitHubStore } from "@/store/useOverviewStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Overview: React.FC = () => {
  const {
    username,
    user,
    topRepos,
    loading,
    error,
    setUsername,
    fetchUserData,
  } = useGitHubStore();
  const [searchValue, setSearchValue] = useState(username);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchValue.trim() === "") return;
    setUsername(searchValue);
    fetchUserData();
  };

  useEffect(() => {
    setUsername("Jimm");
    fetchUserData();
  }, [setUsername, fetchUserData]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      {/* Search Section */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Github className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">GitHub Profile Viewer</h1>
        </div>
        <form 
          onSubmit={handleSearch} 
          className="w-full max-w-md flex items-center gap-2"
        >
          <Input
            placeholder="Enter GitHub username..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
          <Button 
            type="submit" 
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </form>
      </div>

      {/* Profile Card */}
      <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Profile Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ) : error ? (
            <div className="text-red-500 dark:text-red-400 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              {error}
            </div>
          ) : user ? (
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-2 border-blue-500 dark:border-blue-400">
                <AvatarImage src={user.avatar_url} alt={user.name} />
                <AvatarFallback className="text-xl">
                  {user?.name?.charAt(0) || '?'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user.name}
                  </h3>
                  {user.bio && (
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {user.bio}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Users className="h-5 w-5" />
                    <span>
                      <span className="font-semibold">{user.followers}</span> followers
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Users className="h-5 w-5" />
                    <span>
                      <span className="font-semibold">{user.following}</span> following
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <GitBranch className="h-5 w-5" />
                    <span>
                      <span className="font-semibold">{user.public_repos}</span> public Repos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No user data found
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Repositories */}
      <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Top Repositories
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4 border rounded-lg dark:border-gray-700">
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex gap-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500 dark:text-red-400 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              {error}
            </div>
          ) : topRepos.length > 0 ? (
            <div className="space-y-4">
              {topRepos
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 3)
                .map((repo) => (
                  <div 
                    key={repo.name} 
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow dark:border-gray-700 dark:hover:shadow-gray-700/30"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {repo.name}
                      </h4>
                      <Link 
                        href={repo.html_url} 
                        target="_blank"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                      >
                        <LinkIcon className="h-5 w-5" />
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {repo.description || "No description provided"}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      {repo.language && (
                        <div className="flex items-center gap-1">
                          <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                          <span>{repo.language}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No repositories found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;