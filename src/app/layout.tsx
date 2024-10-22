import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import ptBR from "antd/lib/locale/pt_BR";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Dashboard Financeiro",
  description: "Dashboard Financeiro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${rubik.className}`}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: "var(--font-rubik)",
                colorPrimary: "#285caa",
              },
            }}
            locale={ptBR}
          >
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
