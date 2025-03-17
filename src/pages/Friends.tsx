import React, { useState } from "react";
import ThreeColumnLayout from "../components/layout/ThreeColumnLayout";
import { Avatar } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Search,
  UserPlus,
  UserCheck,
  UserX,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Friend {
  id: string;
  name: string;
  avatar: string;
  mutualFriends: number;
  status: "friend" | "request" | "suggestion";
}

interface FriendsProps {
  initialTab?: string;
}

const Friends = ({ initialTab = "all" }: FriendsProps) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock friends data
  const allFriends: Friend[] = [
    {
      id: "1",
      name: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      mutualFriends: 5,
      status: "friend",
    },
    {
      id: "2",
      name: "Sarah Miller",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      mutualFriends: 3,
      status: "friend",
    },
    {
      id: "3",
      name: "Michael Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      mutualFriends: 8,
      status: "friend",
    },
    {
      id: "4",
      name: "Emily Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      mutualFriends: 2,
      status: "friend",
    },
    {
      id: "5",
      name: "David Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      mutualFriends: 4,
      status: "friend",
    },
    {
      id: "6",
      name: "Sophia Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
      mutualFriends: 6,
      status: "friend",
    },
    {
      id: "7",
      name: "James Taylor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      mutualFriends: 7,
      status: "friend",
    },
    {
      id: "8",
      name: "Olivia Parker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
      mutualFriends: 9,
      status: "friend",
    },
    {
      id: "9",
      name: "William Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=William",
      mutualFriends: 1,
      status: "friend",
    },
    {
      id: "10",
      name: "Emma Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      mutualFriends: 3,
      status: "friend",
    },
    {
      id: "11",
      name: "Daniel Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
      mutualFriends: 5,
      status: "friend",
    },
    {
      id: "12",
      name: "Ava Thompson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava",
      mutualFriends: 2,
      status: "friend",
    },
  ];

  const friendRequests: Friend[] = [
    {
      id: "13",
      name: "Noah Garcia",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah",
      mutualFriends: 4,
      status: "request",
    },
    {
      id: "14",
      name: "Isabella Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
      mutualFriends: 7,
      status: "request",
    },
    {
      id: "15",
      name: "Ethan Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
      mutualFriends: 3,
      status: "request",
    },
  ];

  const suggestions: Friend[] = [
    {
      id: "16",
      name: "Mia Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
      mutualFriends: 8,
      status: "suggestion",
    },
    {
      id: "17",
      name: "Lucas Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
      mutualFriends: 5,
      status: "suggestion",
    },
    {
      id: "18",
      name: "Charlotte Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlotte",
      mutualFriends: 6,
      status: "suggestion",
    },
    {
      id: "19",
      name: "Benjamin Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Benjamin",
      mutualFriends: 4,
      status: "suggestion",
    },
    {
      id: "20",
      name: "Amelia Thompson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amelia",
      mutualFriends: 3,
      status: "suggestion",
    },
  ];

  // Filter friends based on search query
  const filterFriends = (friends: Friend[]) => {
    if (!searchQuery) return friends;
    return friends.filter((friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  // Get friends based on active tab
  const getDisplayedFriends = () => {
    switch (activeTab) {
      case "all":
        return filterFriends(allFriends);
      case "requests":
        return filterFriends(friendRequests);
      case "suggestions":
        return filterFriends(suggestions);
      default:
        return filterFriends(allFriends);
    }
  };

  const displayedFriends = getDisplayedFriends();

  return (
    <div className="min-h-screen bg-gray-100">
      <ThreeColumnLayout>
        <div className="w-full max-w-[950px] mx-auto p-4">
          <Card className="mb-4">
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold mb-4">
                {t("friends.title") || "Friends"}
              </h1>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder={t("friends.searchFriends") || "Search friends"}
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Tabs
                defaultValue="all"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="all" className="flex-1">
                    {t("friends.allFriends") || "All Friends"} (
                    {allFriends.length})
                  </TabsTrigger>
                  <TabsTrigger value="requests" className="flex-1">
                    {t("friends.requests") || "Requests"} (
                    {friendRequests.length})
                  </TabsTrigger>
                  <TabsTrigger value="suggestions" className="flex-1">
                    {t("friends.suggestions") || "Suggestions"} (
                    {suggestions.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-0">
                  {displayedFriends.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      {searchQuery
                        ? t("friends.noSearchResults") ||
                          "No friends match your search."
                        : t("friends.noFriends") ||
                          "You don't have any friends yet."}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {displayedFriends.map((friend) => (
                        <div
                          key={friend.id}
                          className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <Link to={`/profile/${friend.id}`}>
                              <Avatar className="h-12 w-12">
                                <img
                                  src={friend.avatar}
                                  alt={friend.name}
                                  className="rounded-full"
                                />
                              </Avatar>
                            </Link>
                            <div>
                              <Link
                                to={`/profile/${friend.id}`}
                                className="font-medium hover:underline"
                              >
                                {friend.name}
                              </Link>
                              <p className="text-xs text-gray-500">
                                {friend.mutualFriends}{" "}
                                {t("friends.mutualFriends") || "mutual friends"}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-pink-500 border-pink-300 hover:bg-pink-50"
                            >
                              <MessageCircle className="h-4 w-4 mr-1" />
                              <span className="hidden sm:inline">
                                {t("friends.message") || "Message"}
                              </span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="requests" className="space-y-4">
                  {displayedFriends.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      {searchQuery
                        ? t("friends.noSearchResults") ||
                          "No friend requests match your search."
                        : t("friends.noRequests") ||
                          "You don't have any friend requests."}
                    </div>
                  ) : (
                    displayedFriends.map((friend) => (
                      <div
                        key={friend.id}
                        className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <Link to={`/profile/${friend.id}`}>
                            <Avatar className="h-12 w-12">
                              <img
                                src={friend.avatar}
                                alt={friend.name}
                                className="rounded-full"
                              />
                            </Avatar>
                          </Link>
                          <div>
                            <Link
                              to={`/profile/${friend.id}`}
                              className="font-medium hover:underline"
                            >
                              {friend.name}
                            </Link>
                            <p className="text-xs text-gray-500">
                              {friend.mutualFriends}{" "}
                              {t("friends.mutualFriends") || "mutual friends"}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-pink-500 hover:bg-pink-600 text-white"
                          >
                            <UserCheck className="h-4 w-4 mr-1" />
                            <span>{t("friends.accept") || "Accept"}</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:bg-gray-50"
                          >
                            <UserX className="h-4 w-4 mr-1" />
                            <span>{t("friends.decline") || "Decline"}</span>
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="suggestions" className="space-y-4">
                  {displayedFriends.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      {searchQuery
                        ? t("friends.noSearchResults") ||
                          "No suggestions match your search."
                        : t("friends.noSuggestions") ||
                          "We don't have any friend suggestions for you right now."}
                    </div>
                  ) : (
                    displayedFriends.map((friend) => (
                      <div
                        key={friend.id}
                        className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <Link to={`/profile/${friend.id}`}>
                            <Avatar className="h-12 w-12">
                              <img
                                src={friend.avatar}
                                alt={friend.name}
                                className="rounded-full"
                              />
                            </Avatar>
                          </Link>
                          <div>
                            <Link
                              to={`/profile/${friend.id}`}
                              className="font-medium hover:underline"
                            >
                              {friend.name}
                            </Link>
                            <p className="text-xs text-gray-500">
                              {friend.mutualFriends}{" "}
                              {t("friends.mutualFriends") || "mutual friends"}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-pink-500 hover:bg-pink-600 text-white"
                          >
                            <UserPlus className="h-4 w-4 mr-1" />
                            <span>
                              {t("friends.addFriend") || "Add Friend"}
                            </span>
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </ThreeColumnLayout>
    </div>
  );
};

export default Friends;
