import Head from "next/head";
import { RoleLoginPage } from "@/components/auth/role-login-page";

export default function JamaahFreeLoginPage() {
  return (
    <>
      <Head>
        <title>Login Jamaah Free | SA&apos;YA Umroh OS</title>
        <meta name="description" content="Masuk ke portal jamaah free SA'YA Umroh OS." />
      </Head>
      <RoleLoginPage
        title="Login Jamaah Free"
        description="Akses fitur dasar jamaah: perjalanan, paket, dan status persiapan."
        emailPlaceholder="jamaah.free@email.com"
        expectedRoles={["jamaah_free", "jamaah"]}
        demoRedirectTo="/dashboard/jamaah/free"
        quickLinks={[
          { href: "/login/jamaah-pro", label: "Login Jamaah Pro" },
          { href: "/login/head-office", label: "Owner/Admin HO" },
          { href: "/login/cabang", label: "Login Cabang" },
          { href: "/login/mitra", label: "Login Mitra" },
          { href: "/", label: "← Hub" },
        ]}
      />
    </>
  );
}
