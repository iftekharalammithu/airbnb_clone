"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Exact Matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div className=" h-[60vh] flex flex-col items-center justify-center gap-2">
      <Heading title={title} subtitle={subtitle} center></Heading>
      <div className=" w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove All Filters"
            onClick={() => router.push("/")}
          ></Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
