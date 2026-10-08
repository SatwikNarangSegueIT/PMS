import { Suspense } from "react";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

type Props = PageProps<"/admin/users/[userId]">;

export default function Page({ params }: Props) {
  return (
    <Suspense>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: Pick<Props, "params">) {
  const { userId } = await params;
  return <PlaceholderPage title={`User ${userId}`} />;
}
