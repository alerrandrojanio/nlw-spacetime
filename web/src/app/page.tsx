import { EmptyMemories } from "@/components/EmptyMemories";
import { MemoriesTimeline } from "@/components/MemoriesTimeline";
import { cookies } from "next/headers";

export default function Home() {
  const isAuthenticated = cookies().has("token");

  if (!isAuthenticated) {
    return <EmptyMemories />;
  }

  return <MemoriesTimeline />;
}
