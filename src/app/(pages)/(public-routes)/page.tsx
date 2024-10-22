"use client";
import { Form } from "antd";
import { Footer, ImageBg, LoginCard, LoginContent, MainContent } from "./style";
import Logo from "@/Components/Logo";
import FormLogin from "@/Components/FormLogin";
import Image from "next/image";
import { useAuthContext } from "@/Contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const [form] = Form.useForm();
  const router = useRouter();

  const { signIn } = useAuthContext();

  const onFinish = async (values: Contexts.AuthContext.LoginValues) => {
    const result = await signIn(values);
    if (result.success && result.token) {
      router.push("/dashboard");
    }
  };

  return (
    <MainContent>
      <ImageBg>
        <Image
          src={"/background.jpg"}
          fill
          alt="image"
          style={{ filter: "blur(2px)", objectFit: "cover" }}
        />
      </ImageBg>
      <LoginContent>
        <Logo />
        <LoginCard>
          <h2>Dashboard Financeiro</h2>

          <FormLogin form={form} onFinish={onFinish} />
        </LoginCard>
        <Footer>Armando Neto Dev - 2024</Footer>
      </LoginContent>
    </MainContent>
  );
}
