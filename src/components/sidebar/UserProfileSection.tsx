import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { LogOut, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface UserProfileSectionProps {
  user?: {
    name: string;
    username: string;
    avatar: string;
  };
  onLanguageChange?: (language: string) => void;
  onLogout?: () => void;
}

const UserProfileSection = ({
  user = {
    name: "Jane Doe",
    username: "@janedoe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  },
  onLanguageChange = () => {},
  onLogout = () => {},
}: UserProfileSectionProps) => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as "english" | "vietnamese");
    onLanguageChange(value);
  };

  return (
    <div className="p-4 rounded-lg bg-white shadow-sm w-full">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 border-2 border-[#f2a2d2]">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-[#f2a2d2]/20 text-[#f2a2d2]">
            {user.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.username}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-[#f2a2d2] border-[#f2a2d2] hover:bg-[#f2a2d2]/10 flex items-center gap-1"
            >
              {t("profile.profile")} <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 p-2" align="end">
            <DropdownMenuItem
              className="cursor-pointer flex items-center gap-2 hover:bg-[#f2a2d2]/10"
              onClick={() => {}}
            >
              <span>{t("profile.profile")}</span>
            </DropdownMenuItem>
            <div className="mb-2 px-2 py-1.5 mt-2">
              <p className="text-sm font-medium mb-1">
                {t("profile.language")}
              </p>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="vietnamese">Tiếng Việt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DropdownMenuItem
              className="cursor-pointer flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={onLogout}
            >
              <LogOut size={16} />
              <span>{t("profile.logout")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default UserProfileSection;
