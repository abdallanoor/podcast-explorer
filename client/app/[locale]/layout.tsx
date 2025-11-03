import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import NextTopLoader from "nextjs-toploader";
import MobileNav from "@/components/mobile-nav";

const ibmSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-sans",
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    // description: t("description"),
    icons: {
      icon: "/favicon.ico",
      // apple: "/coding.png",
    },
    // openGraph: {
    //   title: t("title"),
    //   description: t("description"),
    //   url: "https://iabdallah.vercel.app",
    //   siteName: t("title"),
    //   images: [
    //     {
    //       url: "/coding.png",
    //       width: 1200,
    //       height: 630,
    //       alt: t("description"),
    //     },
    //   ],
    //   type: "website",
    // },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  const isRTL = locale === "ar";
  const direction = isRTL ? "rtl" : "ltr";

  const fontVariables = `${ibmSansArabic.variable}`;

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className={`${fontVariables} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader
              color="currentColor"
              height={2}
              showSpinner={false}
              shadow={false}
            />
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset className="flex h-screen flex-col">
                {children}
                <MobileNav />
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
