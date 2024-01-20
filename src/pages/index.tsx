import { Inter } from "next/font/google";
import LoginPages from "./login/login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main className={inter.className}>
          <LoginPages/>
      </main>
    </>
  );
}
