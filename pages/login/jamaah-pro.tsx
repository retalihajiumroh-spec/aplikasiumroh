import Head from "next/head";
import { RoleLoginPage } from "@/components/auth/role-login-page";

export default function JamaahProLoginPage() {
  return (
    <>
      <Head>
        <title>Login Jamaah Pro | SA&apos;YA Umroh OS</title>
        <meta name="description" content="Masuk ke portal jamaah pro SA'YA Umroh OS." />
      </Head>
      <RoleLoginPage
        title="Login Jamaah Pro"
        description="Akses fitur jamaah pro: komunitas, konten premium, dan booking lanjutan."
        emailPlaceholder="jamaah.pro@email.com"
        expectedRoles={["jamaah_pro"]}
        demoRedirectTo="/dashboard/jamaah/pro"
        quickLinks={[
          { href: "/login/jamaah-free", label: "Login Jamaah Free" },
          { href: "/login/head-office", label: "Owner/Admin HO" },
          { href: "/login/cabang", label: "Login Cabang" },
          { href: "/login/mitra", label: "Login Mitra" },
          { href: "/", label: "← Hub" },
        ]}
      />
    </>
  );
}
