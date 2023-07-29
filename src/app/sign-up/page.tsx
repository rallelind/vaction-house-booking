import { SignUp } from "@clerk/nextjs";
import LoginLayout from "@/components/layouts/LoginLayout";

export default function Page() {
  return (
    <LoginLayout>
      <SignUp signInUrl="/sign-in" />
    </LoginLayout>
  );
}
