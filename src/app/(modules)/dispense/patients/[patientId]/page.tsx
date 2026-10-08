import { Suspense } from "react";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

type Props = PageProps<"/dispense/patients/[patientId]">;

export default function Page({ params }: Props) {
  return (
    <Suspense>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: Pick<Props, "params">) {
  const { patientId } = await params;
  return <PlaceholderPage title={`Patient ${patientId}`} />;
}
