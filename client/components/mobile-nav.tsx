"use client";

import { Link, usePathname } from "@/i18n/routing";
import { Heart, LayoutGrid, Search } from "lucide-react";
import React, { useMemo } from "react";
import { useTranslations } from "use-intl";

export default function MobileNav() {
  const pathname = usePathname();
  const t = useTranslations("");

  const navItems = useMemo(
    () => [
      {
        title: t("links.discover"),
        icon: LayoutGrid,
        url: "/",
      },
      {
        title: t("links.favorites"),
        icon: Heart,
        url: "/favorites",
      },
      {
        title: t("links.search"),
        icon: Search,
        url: "/search",
      },
    ],
    [t]
  );

  const updatedNavItems = useMemo(
    () =>
      navItems.map((item) => {
        const isHome = item.url === "/";
        return {
          ...item,
          isActive: isHome
            ? pathname === item.url
            : pathname.startsWith(item.url),
        };
      }),
    [pathname, navItems]
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-sidebar border-t z-30 flex justify-around items-center px-4 h-16">
      {updatedNavItems.map((item, i) => (
        <Link
          key={i}
          href={item.url}
          className={`flex flex-col items-center gap-1 justify-center p-2 text-xs font-medium`}
        >
          <item.icon
            className={`size-6 ${item.isActive && "fill-foreground"}`}
          />
          {item.title}
        </Link>
      ))}
    </div>
  );
}
