import "@/app/ui/global.css";

import Providers from "@/app/providers";
import { inter } from "@/app/ui/fonts";
import { getServerSession } from "next-auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <Providers session={session}>
        <body className={`${inter.className} antialiased`}>{children}</body>
      </Providers>
    </html>
  );
}
