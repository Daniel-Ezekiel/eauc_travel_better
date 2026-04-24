import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useLocation } from "react-router";
import Logo from "../../assets/img/logo.png";

export const Header = () => {
  const { pathname } = useLocation();

  const isHome = pathname === "/";

  return (
    <header>
      <nav className="flex justify-between">
        <Link to="/" className="grid place-items-center max-w-fit relative">
          <img src={Logo} alt="EAUC Logo" className="w-38" />
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
