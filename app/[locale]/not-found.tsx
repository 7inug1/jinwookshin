import Link from "next/link";
import { defaultLocale } from "@/content/i18n";
import { ui } from "@/content/ui";

export default function NotFound() {
  return (
    <>
      <p className="label">404</p>
      <h1 className="display mt-gap-2">{ui.notFound[defaultLocale]}</h1>
      <p className="mt-gap-3">
        <Link href={`/${defaultLocale}`}>{ui.goHome[defaultLocale]}</Link>
      </p>
    </>
  );
}
