// "use client";

// import { ReactNode } from "react";
// import { Clock, Star, GitBranchIcon, MessageSquare, AlertCircle } from "lucide-react";

// interface ActivityItemProps {
//   type: "fork" | "star" | "commit" | "comment" | "issue";
//   repoName: string;
//   timeAgo: string;
//   commitsCount?: number;
// }

// const iconMap: Record<ActivityItemProps["type"], ReactNode> = {
//   fork: <GitBranchIcon className="text-orange-400 w-5 h-5" />,
//   star: <Star className="text-yellow-400 w-5 h-5" />,
//   commit: <Clock className="text-blue-400 w-5 h-5" />,
//   comment: <MessageSquare className="text-green-400 w-5 h-5" />,
//   issue: <AlertCircle className="text-red-400 w-5 h-5" />,
// };

// const ActivityItem: React.FC<ActivityItemProps> = ({ type, repoName, timeAgo, commitsCount }) => {
//   return (
//     <div className="flex items-center gap-2 p-2 border-b border-gray-100 bg-gray-100 rounded-md">
//       <span className="flex-shrink-0">{iconMap[type]}</span>
//       <p className="text-gray-900 text-sm">
//         {type === "commit" ? (
//           <>
//             Pushed <span className="font-bold">{commitsCount}</span> commits to{" "}
//             <span className="text-blue-600 font-medium">{repoName}</span>
//           </>
//         ) : type === "fork" ? (
//           <>
//             Forked <span className="text-blue-400 font-medium">{repoName}</span>
//           </>
//         ) : type === "star" ? (
//           <>
//             Starred <span className="text-blue-400 font-medium">{repoName}</span>
//           </>
//         ) : type === "comment" ? (
//           <>
//             Commented on an issue in <span className="text-blue-400 font-medium">{repoName}</span>
//           </>
//         ) : (
//           <>
//             Opened an issue in <span className="text-blue-400 font-medium">{repoName}</span>
//           </>
//         )}
//       </p>
//       <span className="ml-auto text-gray-500 text-xs">{timeAgo}</span>
//     </div>
//   );
// };

// export default ActivityItem;
"use client";

import { GitFork, Star, GitCommit, MessageSquare, AlertCircle, Tag } from "lucide-react";
import Link from "next/link";

interface ActivityItemProps {
  type: string;
  repoName: string;
  timeAgo: string;
  commitsCount?: number;
}

const ActivityItem = ({ type, repoName, timeAgo, commitsCount }: ActivityItemProps) => {
  const iconMap = {
    fork: <GitFork className="h-5 w-5 text-blue-500" />,
    star: <Star className="h-5 w-5 text-yellow-500" />,
    commit: <GitCommit className="h-5 w-5 text-green-500" />,
    comment: <MessageSquare className="h-5 w-5 text-blue-400" />,
    issue: <AlertCircle className="h-5 w-5 text-red-500" />,
    release: <Tag className="h-5 w-5 text-purple-500" />,
  };

  const activityText = {
    fork: `Forked ${repoName}`,
    star: `Starred ${repoName}`,
    commit: `Made ${commitsCount} ${commitsCount === 1 ? 'commit' : 'commits'} to ${repoName}`,
    comment: `Commented on ${repoName}`,
    issue: `Opened an issue on ${repoName}`,
    release: `Created a release on ${repoName}`,
  };

  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow dark:border-gray-700 dark:hover:shadow-gray-700/30">
      <div className="flex items-start gap-4">
        <div className="mt-1">
          {iconMap[type as keyof typeof iconMap]}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900 dark:text-white">
              {activityText[type as keyof typeof activityText]}
            </h4>
            <Link 
              href={`https://github.com/${repoName}`} 
              target="_blank"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              View
            </Link>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {timeAgo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;