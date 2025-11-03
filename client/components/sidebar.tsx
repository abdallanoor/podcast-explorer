"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Heart, LayoutGrid, Podcast, Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useMemo } from "react";

export function AppSidebar({ ...props }) {
  const locale = useLocale();
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
    <Sidebar side={locale === "ar" ? "right" : "left"} {...props}>
      <SidebarHeader className="border-b h-16">
        <div className="relative h-12 w-32 mx-auto flex items-center justify-center">
          <Link href="/">
            <h1 className="text-xl flex items-center gap-2 select-none font-medium">
              <span className="bg-red-700 p-1 rounded-md text-white">
                <Podcast className="size-6" />
              </span>
              {t("metadata.title")}
            </h1>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {updatedNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className="py-5 hover:bg-transparent font-medium text-foreground/70 hover:text-foreground peer-data-[active=true]:text-foreground transition-all duration-300"
                  >
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon
                        className={`${item.isActive && "fill-foreground"}`}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
