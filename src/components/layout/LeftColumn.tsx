import React from "react";
import { Search, Home, Users, UsersRound, GamepadIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useLocation } from "react-router-dom";

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const NavLink = ({ icon, label, to }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
        isActive
          ? "bg-pink-100 text-pink-700 font-medium"
          : "hover:bg-pink-50 text-gray-700 hover:text-pink-600",
      )}
    >
      <div className="text-xl">{icon}</div>
      <span>{label}</span>
    </Link>
  );
};

interface LeftColumnProps {
  className?: string;
}

const LeftColumn = ({ className }: LeftColumnProps) => {
  const { t } = useLanguage();

  return (
    <div
      className={cn(
        "w-[280px] h-full p-4 flex flex-col border-r shadow-md rounded-lg",
        className,
      )}
      style={{ backgroundColor: "#f2a2d2" }}
    >
      {/* Logo */}
      <div className="mb-6 px-4">
        <Link to="/">
          <img src="/logoleftcolumn.png" alt="PinkSocial" className="h-10" />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={t("nav.search")}
          className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        <NavLink icon={<Home />} label={t("nav.home")} to="/" />
        <NavLink icon={<Users />} label={t("nav.friends")} to="/friends" />
        <NavLink icon={<UsersRound />} label={t("nav.groups")} to="/groups" />
        <NavLink icon={<GamepadIcon />} label={t("nav.games")} to="/games" />
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-gray-100 text-xs text-gray-400 px-4">
        {t("footer.copyright")}
      </div>
    </div>
  );
};

export default LeftColumn;
