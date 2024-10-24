import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import ptBR from "antd/lib/locale/pt_BR";
import { AuthContextProvider } from "@/Contexts/AuthContext";
import { cookies } from "next/headers";
import { AppContextProvider } from "@/Contexts/AppContext";

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
  const token = cookies().get("token");

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
            <StyledComponentsRegistry>
              <AppContextProvider>
                <AuthContextProvider token={token?.value}>
                  {children}
                </AuthContextProvider>
              </AppContextProvider>
            </StyledComponentsRegistry>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
