import { Link } from "react-router";

export const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/" className="grid place-items-center max-w-fit relative">
          <img src="/logo.png" alt="EAUC Logo" className="w-38" />
          <span className="font-bold text-midnight text-2xl absolute -right-9 -bottom-3">
            Travel Better
          </span>
        </Link>
      </nav>
    </header>
  );
};
