"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useRepositoriesStore } from "@/store/useRepositoriesStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Star } from "lucide-react";
import Pagination from "@/common/pagination";

export default function RepositoriesPage() {
  const { theme } = useSettingsStore();
  const { repositories, loading, error, fetchRepositories } =
    useRepositoriesStore();

  const [search, setSearch] = useState("");
  const [usernameSearch, setUsernameSearch] = useState("Jimm");
  const [sort, setSort] = useState("stars");
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    if (usernameSearch && !repositories.length) {
      fetchRepositories(usernameSearch);
    }
  }, [usernameSearch, fetchRepositories, repositories.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameSearch.trim()) {
      fetchRepositories(usernameSearch);
    }
  };

  const filteredRepos = repositories
    .filter((repo) => repo.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === "stars"
        ? b.stargazers_count - a.stargazers_count
        : new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );

  const totalPages = Math.ceil(filteredRepos.length / perPage);
  const paginatedRepos = filteredRepos.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div
      className={`min-h-screen p-3 bg-gray-50 dark:bg-gray-900 ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Repositories
            </CardTitle>
            <p className="text-gray-500 dark:text-gray-400">
              Browse and search through your GitHub repositories
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 flex-1"
              >
                <Input
                  placeholder="Search by username..."
                  value={usernameSearch}
                  onChange={(e) => setUsernameSearch(e.target.value)}
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                />
                <Button
                  type="submit"
                  className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                >
                  Search
                </Button>
              </form>
              <div className="flex gap-4 flex-1">
                <Input
                  placeholder="Search repositories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sort by: {sort === "stars" ? "Stars" : "Date"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    align="end"
                  >
                    <DropdownMenuItem
                      className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setSort("stars")}
                    >
                      Stars (High to Low)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setSort("date")}
                    >
                      Date (Newest First)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Card
                    key={i}
                    className="p-4 border-gray-200 dark:border-gray-700"
                  >
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full mt-2" />
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-red-500 dark:text-red-400 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                {error}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedRepos.map((repo, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="hover:shadow-md dark:hover:shadow-gray-700/30"
                  >
                    <Card className="p-4 border-gray-200 dark:border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-white">
                          {repo.name}
                        </CardTitle>
                        <p className="text-gray-500 dark:text-gray-400">
                          {repo.description || "No description"}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap justify-between gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                            {repo.language || "Unknown"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(repo.updated_at).toLocaleDateString()}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              repo.visibility === "public"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {repo.visibility}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {filteredRepos.length > 0 && (
              // <div className="mt-6 flex justify-center">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              // </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}