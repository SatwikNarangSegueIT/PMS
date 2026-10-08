import { ComingSoon } from "@/components/feedback/coming-soon";
import { PageHeader } from "./page-header";

/** Temporary page body used until a feature screen is built. */
export function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <ComingSoon />
    </>
  );
}
