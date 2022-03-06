import { useRouter } from "next/router";
import React from "react";

const Topic = () => {
  const router = useRouter();

  return <div>{router.query.topic}</div>;
};

export default Topic;
