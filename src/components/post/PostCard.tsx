import React, { useState } from "react";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Textarea } from "../ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Heart,
  MessageCircle,
  MoreVertical,
  Share2,
  Send,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
}

interface PostCardProps {
  author?: {
    name: string;
    avatar: string;
    timestamp: string;
  };
  content?: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
  comments?: Comment[];
}

const PostCard = ({
  author = {
    name: "Jane Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    timestamp: "2 hours ago",
  },
  content = "Just had the most amazing day! The weather was perfect for a picnic in the park. Anyone else enjoying this beautiful day? #SunnyDays #WeekendVibes",
  engagement = {
    likes: 42,
    comments: 12,
    shares: 5,
  },
  comments = [
    {
      id: "1",
      author: {
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
      content: "Looks amazing! Where was this?",
      timestamp: "1 hour ago",
      likes: 3,
    },
    {
      id: "2",
      author: {
        name: "Sarah Miller",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      content: "Beautiful day indeed! I went hiking today.",
      timestamp: "45 minutes ago",
      likes: 2,
    },
  ],
}: PostCardProps) => {
  const { t } = useLanguage();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [visibleComments, setVisibleComments] = useState(2); // Show first 2 comments initially
  const [liked, setLiked] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      // In a real app, you would send this to a server
      // For now, we'll just clear the input
      setCommentText("");
    }
  };

  const loadMoreComments = () => {
    setVisibleComments(comments.length);
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <Card className="w-full mb-4 bg-white border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center space-x-3 p-4">
        <Avatar className="h-10 w-10">
          <a href={`/profile/${author.name.toLowerCase().replace(" ", "-")}`}>
            <img
              src={author.avatar}
              alt={author.name}
              className="rounded-full"
            />
          </a>
        </Avatar>
        <div className="flex flex-col">
          <a
            href={`/profile/${author.name.toLowerCase().replace(" ", "-")}`}
            className="font-semibold text-sm hover:underline"
          >
            {author.name}
          </a>
          <span className="text-xs text-gray-500">{author.timestamp}</span>
        </div>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-5 w-5 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                {t("post.savePost") || "Save Post"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {t("post.hidePost") || "Hide Post"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {t("post.reportPost") || "Report Post"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm">{content}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col border-t border-gray-100">
        <div className="flex justify-between w-full">
          <Button
            variant="ghost"
            size="sm"
            className={`text-gray-600 hover:text-pink-500 ${liked ? "text-pink-500" : ""}`}
            onClick={toggleLike}
          >
            <Heart
              className={`h-4 w-4 mr-1 ${liked ? "fill-pink-500 text-pink-500" : ""}`}
            />
            <span>{liked ? engagement.likes + 1 : engagement.likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-pink-500"
            onClick={toggleComments}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            <span>{engagement.comments}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-pink-500"
          >
            <Share2 className="h-4 w-4 mr-1" />
            <span>{engagement.shares}</span>
          </Button>
        </div>

        {showComments && (
          <div className="mt-3 w-full">
            <div className="flex items-center space-x-2 mb-3">
              <Avatar className="h-8 w-8">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser"
                  alt="Current User"
                  className="rounded-full"
                />
              </Avatar>
              <div className="flex-1 relative">
                <Textarea
                  placeholder={t("post.writeAComment") || "Write a comment..."}
                  className="min-h-[40px] py-2 pr-10 resize-none rounded-full bg-gray-100 border-0 focus-visible:ring-0"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-pink-500"
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {comments.slice(0, visibleComments).map((comment) => (
                <div key={comment.id} className="flex space-x-2">
                  <Avatar className="h-8 w-8">
                    <a
                      href={`/profile/${comment.author.name.toLowerCase().replace(" ", "-")}`}
                    >
                      <img
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        className="rounded-full"
                      />
                    </a>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-2xl px-3 py-2">
                      <a
                        href={`/profile/${comment.author.name.toLowerCase().replace(" ", "-")}`}
                        className="font-semibold text-xs hover:underline"
                      >
                        {comment.author.name}
                      </a>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-gray-500 space-x-3">
                      <span>{comment.timestamp}</span>
                      <button className="font-semibold hover:text-gray-700">
                        {t("post.like") || "Like"}
                      </button>
                      <button className="font-semibold hover:text-gray-700">
                        {t("post.reply") || "Reply"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {comments.length > visibleComments && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-pink-500 hover:text-pink-600 flex items-center mx-auto"
                  onClick={loadMoreComments}
                >
                  <ChevronDown className="h-4 w-4 mr-1" />
                  {t("post.viewMoreComments") || "View more comments"}
                </Button>
              )}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
