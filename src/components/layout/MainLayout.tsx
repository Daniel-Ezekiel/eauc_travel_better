import { Header } from "./Header";
import { Footer } from "./Footer";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="grid gap-5">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};
