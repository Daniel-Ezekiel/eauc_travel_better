import { Link } from "react-router";

export const Footer = () => {
  return (
    <footer className="mt-8 pt-4 border-t border-midnight">
      <p className="flex justify-center items-center gap-2">
        Powered by
        <Link to="https://eauc.org.uk" target="_blank">
          <img src="/logo.png" alt="EAUC Logo" className="w-38" />
        </Link>
      </p>
    </footer>
  );
};
