import { Button } from "@/components/ui/button";
import { useSettingsStore } from "@/store/useSettingsStore";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) => {
  const { layout } = useSettingsStore();
  const spacingClass = layout === "compact" ? "gap-1" : "gap-2";

  const handlePrevious = () => {
    const newPage = Math.max(1, currentPage - 1);
    if (newPage !== currentPage) {
      onPageChange(newPage);
    }
  };

  const handleNext = () => {
    const newPage = Math.min(totalPages, currentPage + 1);
    if (newPage !== currentPage) {
      onPageChange(newPage);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <nav
    
      className={`flex justify-between items-center mt-6 ${spacingClass} ${className}`}
      aria-label="Pagination"
    >
      <Button
        variant="outline"
        size={layout === "compact" ? "sm" : "default"}
        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        disabled={currentPage === 1}
        onClick={handlePrevious}
        aria-label="Previous page"
      >
        Previous
      </Button>

      <span
        className={`px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300 ${
          layout === "compact" ? "text-xs px-2" : "text-sm px-3"
        }`}
        aria-current="page"
      >
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        size={layout === "compact" ? "sm" : "default"}
        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        disabled={currentPage === totalPages}
        onClick={handleNext}
        aria-label="Next page"
      >
        Next
      </Button>
    </nav>
  );
};

export default Pagination;
