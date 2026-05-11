import Head from "next/head";
import { RoleLoginPage } from "@/components/auth/role-login-page";

export default function CabangLoginPage() {
  return (
    <>
      <Head>
        <title>Login Cabang | SA&apos;YA Umroh OS</title>
        <meta name="description" content="Masuk ke portal operasional kantor cabang SA'YA Umroh OS." />
      </Head>
      <RoleLoginPage
        title="Login Cabang"
        description="Portal staf kantor cabang — jamaah, booking, dan laporan harian."
        emailPlaceholder="staf.cabang@sayaumroh.id"
        expectedRoles={["cabang"]}
        demoRedirectTo="/dashboard"
        quickLinks={[
          { href: "/login/head-office", label: "Owner/Admin HO" },
          { href: "/login/mitra", label: "Login Mitra" },
          { href: "/login/jamaah-free", label: "Jamaah Free" },
          { href: "/", label: "← Hub" },
        ]}
      />
    </>
  );
}
