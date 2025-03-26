"use client";

import { useState, useEffect } from "react";
import { useActivityStore } from "@/store/useActivityStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ActivityItem from "@/components/activity-item";
import { Input } from "@/components/ui/input";
import { Github, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "@/common/pagination";

const tabs = ["All", "Commits", "PRs", "Issues", "Releases", "Forks", "Stars"];

const tabTypeMap: Record<string, string> = {
  All: "all",
  Commits: "commit",
  PRs: "pr",
  Issues: "issue",
  Releases: "release",
  Forks: "fork",
  Stars: "star",
};

const ActivityTimeline = () => {
  const { activities, loading, error, fetchActivities } = useActivityStore();
  const [activeTab, setActiveTab] = useState("All");
  const [page, setPage] = useState(1);
  const [username, setUsername] = useState("Jimm");
  const perPage = 7;

  useEffect(() => {
    fetchActivities(username);
  }, [username, fetchActivities]);

  const filteredActivities =
    activeTab === "All"
      ? activities
      : activities.filter(
          (activity) => activity.type === tabTypeMap[activeTab]
        );

  const paginatedActivities = filteredActivities.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8 ">
      {/* Header Section */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Github className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            GitHub Activity Timeline
          </h1>
        </div>

        {/* Search Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchActivities(username);
          }}
          className="w-full max-w-md flex items-center gap-2"
        >
          <Input
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </form>
      </div>

      {/* Activity Card */}
      <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                onClick={() => {
                  setActiveTab(tab);
                  setPage(1);
                }}
                className={
                  activeTab !== tab
                    ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    : ""
                }
              >
                {tab}
              </Button>
            ))}
          </div>

          {/* Content */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="p-4 border rounded-lg dark:border-gray-700"
                >
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500 dark:text-red-400 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              {error}
            </div>
          ) : paginatedActivities.length > 0 ? (
            <div className="space-y-4">
              {paginatedActivities.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No activities found for this filter
            </div>
          )}

          {/* Pagination */}
          {filteredActivities.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={perPage}
              onPageChange={setPage}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityTimeline;
