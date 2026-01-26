import { LandingPage } from "@/components/landing-page";
import {auth} from "@/auth";
import { redirect } from "next/navigation";

export default async function page() {
  return <LandingPage />;
}
