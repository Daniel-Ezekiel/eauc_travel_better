import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useLocation } from "react-router";

export const Header = () => {
  const { pathname } = useLocation();

  const isHome = pathname === "/";

  console.log(pathname, isHome);

  return (
    <header>
      <nav className="flex justify-between">
        <Link to="/" className="grid place-items-center max-w-fit relative">
          <img src="/logo.png" alt="EAUC Logo" className="w-38" />
          <span className="font-bold text-midnight text-2xl absolute -right-9 -bottom-3">
            Travel Better
          </span>
        </Link>

        {!isHome && (
          <Link to="/" className="flex gap-2 items-center max-w-fit">
            <FaArrowLeftLong /> Back{" "}
            <span className="inline-block sm:hidden">Home</span>
            <span className="hidden sm:inline-block">to all assessments</span>
          </Link>
        )}
      </nav>
    </header>
  );
};
