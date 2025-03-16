import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface FriendSuggestion {
  id: string;
  name: string;
  avatar: string;
  mutualFriends: number;
}

interface SuggestedFriendsSectionProps {
  suggestions?: FriendSuggestion[];
  onSeeAll?: () => void;
  onAddFriend?: (id: string) => void;
}

const SuggestedFriendsSection = ({
  suggestions = [
    {
      id: "1",
      name: "Emma Thompson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      mutualFriends: 12,
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      mutualFriends: 8,
    },
    {
      id: "3",
      name: "Sophia Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
      mutualFriends: 5,
    },
    {
      id: "4",
      name: "James Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      mutualFriends: 3,
    },
    {
      id: "5",
      name: "Olivia Parker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
      mutualFriends: 7,
    },
  ],
  onSeeAll = () => console.log("See all friends clicked"),
  onAddFriend = (id) => console.log(`Add friend ${id} clicked`),
}: SuggestedFriendsSectionProps) => {
  const { t } = useLanguage();

  return (
    <Card className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {t("friends.suggestedFriends")}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-pink-500 hover:text-pink-600 hover:bg-pink-50"
          onClick={onSeeAll}
        >
          {t("friends.seeAll")}
        </Button>
      </div>

      <div className="space-y-3">
        {suggestions.map((friend) => (
          <div key={friend.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-sm text-gray-800">
                  {friend.name}
                </p>
                <p className="text-xs text-gray-500">
                  {friend.mutualFriends} {t("friends.mutualFriends")}
                </p>
              </div>
            </div>
            <Button
              size="sm"
              className="bg-[#f2a2d2] hover:bg-pink-400 text-white"
              onClick={() => onAddFriend(friend.id)}
            >
              {t("friends.add")}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SuggestedFriendsSection;
