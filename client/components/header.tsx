"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { ArrowLeft, Podcast } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Fragment } from "react";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcher from "./locale-switcher";
import { useTheme } from "next-themes";

interface HeaderProps {
  breadcrumbs?: { label: string; href?: string }[];
  showBackButton?: boolean;
  backButtonLabel?: string;
  onBackClick?: () => void;
}

export default function Header({
  breadcrumbs,
  showBackButton = false,
  backButtonLabel = "Back",
  onBackClick,
}: HeaderProps) {
  const router = useRouter();
  const locale = useLocale();
  const { setTheme } = useTheme();
  const t = useTranslations("");

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      {/* <SidebarTrigger /> */}
      {/* {breadcrumbs && (
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-4"
        />
      )} */}
      {showBackButton && (
        <>
          <Button variant="ghost" size="sm" onClick={handleBackClick}>
            <ArrowLeft className="h-4 w-4" />
            {backButtonLabel}
          </Button>
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-4"
          />
        </>
      )}
      {breadcrumbs && (
        <Breadcrumb className="hidden md:block">
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <Fragment key={index}>
                {index > 0 && (
                  <BreadcrumbSeparator
                    className={`${locale === "ar" && "rotate-180"}`}
                  />
                )}
                <BreadcrumbItem>
                  {breadcrumb.href ? (
                    <BreadcrumbLink asChild className="truncate">
                      <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}

      <Link href="/" className="md:hidden">
        <h1 className="text-xl flex items-center gap-2 select-none font-medium">
          <span className="bg-red-700 p-1 rounded-md text-white">
            <Podcast className="size-6" />
          </span>
          {t("metadata.title")}
        </h1>
      </Link>
      <div className="ms-auto flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="group/toggle extend-touch-target size-7 ml-auto"
          onClick={() =>
            setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
          }
          title="Toggle theme"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4.5"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M12 3l0 18" />
            <path d="M12 9l4.65 -4.65" />
            <path d="M12 14.3l7.37 -7.37" />
            <path d="M12 19.6l8.85 -8.85" />
          </svg>
          <span className="sr-only">Toggle theme</span>
        </Button>
        <LocaleSwitcher />
      </div>
    </header>
  );
}
