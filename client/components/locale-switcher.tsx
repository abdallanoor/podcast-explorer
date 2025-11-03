"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTransition } from "react";
import { Languages } from "lucide-react";

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <button
      disabled={isPending}
      onClick={() => onSelectChange(locale === "en" ? "ar" : "en")}
      className="cursor-pointer flex items-center justify-center gap-1 p-1 rounded-sm text-sm text-primary/70 hover:text-primary disabled:text-primary/70 transition-colors duration-300 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
    >
      <Languages className="size-3.5" />
      {locale === "ar" ? "English" : "العربية"}
    </button>
  );
}
