import { Suspense } from "react";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

type Props = PageProps<"/hq/promotions/[promotionId]">;

export default function Page({ params }: Props) {
  return (
    <Suspense>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: Pick<Props, "params">) {
  const { promotionId } = await params;
  return <PlaceholderPage title={`Promotion ${promotionId}`} />;
}
