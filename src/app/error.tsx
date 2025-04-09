"use client";

import EmptyState from "@/components/EmptyState";
import { useEffect } from "react";

interface ErrorProps {
  error: Error;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title="Something went wrong"
      subtitle="Try again later"
    ></EmptyState>
  );
};

export default Error;
