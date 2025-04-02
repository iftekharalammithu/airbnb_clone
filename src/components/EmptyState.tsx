"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Exact Matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
}) => {
  const router = useRouter();

  return <div></div>;
};

export default EmptyState;
