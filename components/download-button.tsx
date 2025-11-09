import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { DownloadLink } from '@/types/sanity';

interface DownloadButtonProps {
  link: DownloadLink;
}

export function DownloadButton({ link }: DownloadButtonProps) {
  return (
    <Button
      asChild
      className="w-full justify-between bg-slate-800 text-slate-100 hover:bg-slate-700"
    >
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        <span className="font-semibold">{link.name}</span>
        <ExternalLink className="h-4 w-4" />
      </a>
    </Button>
  );
}
