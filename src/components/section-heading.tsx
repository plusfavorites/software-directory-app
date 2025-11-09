import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  actionSlot?: ReactNode;
};

export function SectionHeading({ title, description, actionSlot }: Props) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        {description ? (
          <p className="text-sm text-slate-500">{description}</p>
        ) : null}
      </div>
      {actionSlot}
    </div>
  );
}
