import { SignIn } from "@clerk/nextjs";
import LoginLayout from "@/components/layouts/LoginLayout";

export default function Page() {
  return (
    <LoginLayout>
      <SignIn signUpUrl="/sign-up" />
    </LoginLayout>
  );
}