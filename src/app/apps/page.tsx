import type { Metadata } from "next";
import { getApps } from "@/lib/sanity";
import { AppCard } from "@/components/app-card";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "All software downloads",
  description:
    "Browse every curated desktop app in the FileWave catalog with full changelogs and mirror links.",
};

export default async function AppsPage() {
  const apps = await getApps();

  return (
    <div className="space-y-8">
      <SectionHeading
        title="All downloads"
        description={`${apps.length} curated releases available to download.`}
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {apps.map((app) => (
          <AppCard key={app._id} app={app} showCategory />
        ))}
      </div>
    </div>
  );
}
