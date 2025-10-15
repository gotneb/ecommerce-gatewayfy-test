import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to buy page
  redirect("/buy");
}
