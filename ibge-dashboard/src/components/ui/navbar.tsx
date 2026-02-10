import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import Logo from "../../images/logo.png";

export function Navbar() {
  return (
    <header className="bg-navbar text-navbar shadow-sm sticky top-0 w-full">
      <div className="mx-auto flex h-14 max-w-8xl items-center justify-between px-4">
        {/* Logo */}
        <span className="flex gap-1 text-lg font-semibold">
          <img className="w-24" src={Logo} />
        </span>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? "text-foreground font-bold"
                  : "text-muted hover:text-foreground"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? "text-foreground font-bold"
                  : "text-muted hover:text-foreground"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/map"
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? "text-foreground font-bold"
                  : "text-muted hover:text-foreground"
              }`
            }
          >
            Map
          </NavLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
