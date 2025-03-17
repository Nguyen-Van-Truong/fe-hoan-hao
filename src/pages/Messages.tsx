import React, { useState } from "react";
import ThreeColumnLayout from "../components/layout/ThreeColumnLayout";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, Send, Image, Smile } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MessageItem from "../components/messages/MessageItem";
import ConversationList from "../components/messages/ConversationList";

const Messages = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  // Mock data for conversations
  const conversations = [
    {
      id: "c1",
      user: {
        name: "Jane Doe",
        username: "janedoe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      },
      lastMessage: {
        text: "Hey, how are you doing today?",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        isRead: false,
      },
      isActive: true,
    },
    {
      id: "c2",
      user: {
        name: "John Smith",
        username: "johnsmith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      lastMessage: {
        text: "Did you see the new movie that just came out?",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: true,
      },
      isActive: false,
    },
    {
      id: "c3",
      user: {
        name: "Sarah Johnson",
        username: "sarahj",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      lastMessage: {
        text: "Thanks for the help with the project!",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        isRead: true,
      },
      isActive: false,
    },
    {
      id: "c4",
      user: {
        name: "Michael Chen",
        username: "mikechen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      },
      lastMessage: {
        text: "Let's meet up for coffee next week!",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        isRead: true,
      },
      isActive: false,
    },
  ];

  // Initial conversation messages
  const initialConversationMessages = {
    c1: [
      {
        id: "m1",
        author: {
          name: "Jane Doe",
          username: "janedoe",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
        },
        content: "Hey there! How's your day going?",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: "m2",
        author: {
          name: "Current User",
          username: "currentuser",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser",
        },
        content:
          "Hi Jane! It's going pretty well, thanks for asking. Just working on some new features for the app.",
        timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      },
      {
        id: "m3",
        author: {
          name: "Jane Doe",
          username: "janedoe",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
        },
        content:
          "That sounds exciting! What kind of features are you working on?",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
      {
        id: "m4",
        author: {
          name: "Current User",
          username: "currentuser",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser",
        },
        content: "I'm adding a new messaging system with better media sharing.",
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
      },
      {
        id: "m5",
        author: {
          name: "Jane Doe",
          username: "janedoe",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
        },
        content:
          "That sounds really cool! I'd love to test it out when it's ready.",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
      },
    ],
    c2: [
      {
        id: "m6",
        author: {
          name: "John Smith",
          username: "johnsmith",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        },
        content: "Did you see the new movie that just came out?",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: "m7",
        author: {
          name: "Current User",
          username: "currentuser",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser",
        },
        content: "Not yet! Is it good?",
        timestamp: new Date(Date.now() - 1.8 * 60 * 60 * 1000),
      },
    ],
    c3: [
      {
        id: "m8",
        author: {
          name: "Sarah Johnson",
          username: "sarahj",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        },
        content: "Thanks for the help with the project!",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ],
    c4: [
      {
        id: "m9",
        author: {
          name: "Michael Chen",
          username: "mikechen",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        },
        content: "Let's meet up for coffee next week!",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: "m10",
        author: {
          name: "Current User",
          username: "currentuser",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser",
        },
        content: "Sounds good! How about Tuesday at 2pm?",
        timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000),
      },
      {
        id: "m11",
        author: {
          name: "Michael Chen",
          username: "mikechen",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        },
        content: "Perfect! See you then at the usual place.",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ],
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const newMsg = {
        id: `m${Date.now()}`,
        author: {
          name: "Current User",
          username: "currentuser",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser",
        },
        content: newMessage,
        timestamp: new Date(),
      };

      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    setMessages(
      initialConversationMessages[
        id as keyof typeof initialConversationMessages
      ] || [],
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newMessage.trim()) {
      handleSendMessage();
    }
  };

  const isCurrentUser = (username: string) => username === "currentuser";

  return (
    <div className="min-h-screen bg-gray-100">
      <ThreeColumnLayout>
        <div className="w-full max-w-[950px] mx-auto bg-white min-h-screen flex flex-col">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder={
                  t("messages.searchMessages") || "Tìm kiếm tin nhắn"
                }
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Messages Interface */}
          <div className="flex-1 flex flex-col">
            <div className="flex h-full">
              <div className="w-1/3 border-r border-gray-200 h-full">
                <ConversationList
                  conversations={conversations}
                  onSelectConversation={handleSelectConversation}
                  selectedConversationId={selectedConversation}
                />
              </div>

              <div className="w-2/3 h-full flex flex-col">
                {selectedConversation ? (
                  <>
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img
                            src={
                              conversations.find(
                                (c) => c.id === selectedConversation,
                              )?.user.avatar
                            }
                            alt="User avatar"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <h2 className="font-bold">
                          {
                            conversations.find(
                              (c) => c.id === selectedConversation,
                            )?.user.name
                          }
                        </h2>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto bg-white p-2">
                      {messages.map((message) => (
                        <MessageItem
                          key={message.id}
                          message={message}
                          isCurrentUser={isCurrentUser(message.author.username)}
                        />
                      ))}
                    </div>

                    <div className="border-t border-gray-200 p-4 bg-white">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-500"
                        >
                          <Image className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-500"
                        >
                          <Smile className="h-5 w-5" />
                        </Button>
                        <Input
                          placeholder={
                            t("messages.typeMessage") || "Nhập tin nhắn..."
                          }
                          className="flex-1"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                        <Button
                          className="bg-pink-500 hover:bg-pink-600"
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    {t("messages.selectConversation") ||
                      "Chọn một cuộc trò chuyện để bắt đầu nhắn tin"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ThreeColumnLayout>
    </div>
  );
};

export default Messages;
