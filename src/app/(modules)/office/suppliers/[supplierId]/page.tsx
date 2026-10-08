import { Suspense } from "react";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

type Props = PageProps<"/office/suppliers/[supplierId]">;

export default function Page({ params }: Props) {
  return (
    <Suspense>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: Pick<Props, "params">) {
  const { supplierId } = await params;
  return <PlaceholderPage title={`Supplier ${supplierId}`} />;
}
