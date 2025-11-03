import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("metadata");
  const breadcrumbs = [
    { label: "iTunes Search", href: "/" },
    { label: "Browse" },
  ];

  return (
    <>
      <Header breadcrumbs={breadcrumbs} />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <h1 className="text-3xl font-bold">{t("title")}</h1>
        </div>
      </div>
    </>
  );
}
