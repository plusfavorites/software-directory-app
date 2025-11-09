import { DownloadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DownloadLink } from "@/types/content";

type Props = {
  links: DownloadLink[];
};

export function DownloadLinks({ links }: Props) {
  return (
    <div className="space-y-3">
      {links.map((link) => (
        <Button
          key={link.name}
          asChild
          className="w-full justify-between"
        >
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            <span>{link.name}</span>
            <DownloadCloud className="h-4 w-4" />
          </a>
        </Button>
      ))}
    </div>
  );
}
