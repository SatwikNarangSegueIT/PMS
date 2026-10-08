import { Suspense } from "react";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

type Props = PageProps<"/office/products/[productId]">;

export default function Page({ params }: Props) {
  return (
    <Suspense>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: Pick<Props, "params">) {
  const { productId } = await params;
  return <PlaceholderPage title={`Product ${productId}`} />;
}
