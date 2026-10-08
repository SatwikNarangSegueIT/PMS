import { Construction } from "lucide-react";

export function ComingSoon({ note }: { note?: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-12 text-center">
      <Construction className="size-8 text-muted-foreground" />
      <p className="font-medium">Not built yet</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        {note ?? "This screen is a placeholder."}
      </p>
    </div>
  );
}
