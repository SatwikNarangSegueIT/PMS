import { redirect } from "next/navigation";

// TODO(auth): send users to the first module they have access to.
export default function Home() {
  redirect("/dispense");
}
