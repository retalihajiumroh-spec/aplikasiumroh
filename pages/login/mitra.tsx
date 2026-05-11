import Head from "next/head";
import { RoleLoginPage } from "@/components/auth/role-login-page";

export default function MitraLoginPage() {
  return (
    <>
      <Head>
        <title>Login Mitra | SA&apos;YA Umroh OS</title>
        <meta name="description" content="Masuk ke portal mitra & reseller SA'YA Umroh OS." />
      </Head>
      <RoleLoginPage
        title="Login Mitra"
        description="Portal reseller & mitra — komisi, materi, dan performa cabang."
        emailPlaceholder="mitra@perusahaan.id"
        expectedRoles={["mitra"]}
        demoRedirectTo="/dashboard/reseller"
        quickLinks={[
          { href: "/login/head-office", label: "Owner/Admin HO" },
          { href: "/login/cabang", label: "Login Cabang" },
          { href: "/login/jamaah-free", label: "Jamaah Free" },
          { href: "/", label: "← Hub" },
        ]}
      />
    </>
  );
}
