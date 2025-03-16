import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Home, Users, UsersRound, Gamepad2, Search } from "lucide-react";
import { Input } from "../ui/input";

const LeftNavigation = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      icon: <Home className="h-6 w-6" />,
      label: t("nav.home") || "Home",
      path: "/",
    },
    {
      icon: <Users className="h-6 w-6" />,
      label: t("nav.friends") || "Friends",
      path: "/friends",
    },
    {
      icon: <UsersRound className="h-6 w-6" />,
      label: t("nav.groups") || "Groups",
      path: "/groups",
    },
    {
      icon: <Gamepad2 className="h-6 w-6" />,
      label: t("nav.games") || "Games",
      path: "/games",
    },
  ];

  return (
    <div
      className="w-[280px] h-screen p-4 flex flex-col sticky top-0 overflow-y-auto"
      style={{ backgroundColor: "#f2a2d2" }}
    >
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-2xl font-bold text-white">PinkSocial</h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          placeholder={t("nav.search") || "Search..."}
          className="pl-10 bg-white/80 border-0"
        />
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive(item.path) ? "bg-white/20 font-medium" : "hover:bg-white/10"}`}
          >
            <span className="text-white">{item.icon}</span>
            <span className="text-white">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-4">
        <Link
          to="/profile"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
        >
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser"
            alt="Current User"
            className="h-8 w-8 rounded-full"
          />
          <span className="text-white font-medium">Jane Doe</span>
        </Link>
      </div>
    </div>
  );
};

export default LeftNavigation;
