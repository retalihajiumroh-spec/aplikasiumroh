import Head from "next/head";
import { RoleLoginPage } from "@/components/auth/role-login-page";

export default function HeadOfficeLoginPage() {
  return (
    <>
      <Head>
        <title>Login Owner/Admin HO | SA&apos;YA Umroh OS</title>
        <meta name="description" content="Masuk ke portal owner dan admin head office SA'YA Umroh OS." />
      </Head>
      <RoleLoginPage
        title="Login Owner / Admin Head Office"
        description="Portal eksekutif untuk owner dan admin pusat (head office)."
        emailPlaceholder="admin.ho@sayaumroh.id"
        expectedRoles={["owner", "admin_head_office"]}
        demoRedirectTo="/dashboard/owner"
        quickLinks={[
          { href: "/login/cabang", label: "Login Cabang" },
          { href: "/login/mitra", label: "Login Mitra" },
          { href: "/login/jamaah-free", label: "Jamaah Free" },
          { href: "/", label: "← Hub" },
        ]}
      />
    </>
  );
}
