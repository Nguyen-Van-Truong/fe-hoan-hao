import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  ExternalLink,
  Link as LinkIcon,
  Facebook,
  Twitter,
  Mail,
  Copy,
  Check,
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
  const location = useLocation();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [visibleComments, setVisibleComments] = useState(2); // Show first 2 comments initially
  const [liked, setLiked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate a unique post ID based on content (in a real app, this would come from the database)
  const postId = btoa(encodeURIComponent(content.substring(0, 20)))
    .replace(/[^a-zA-Z0-9]/g, "")
    .substring(0, 10);

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

  const handleCopyLink = () => {
    const postUrl = `${window.location.origin}/post/${author.name.toLowerCase().replace(" ", "-")}/${postId}`;
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  return (
    <Card className="w-full mb-4 bg-white border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center space-x-3 p-4">
        <Avatar className="h-10 w-10">
          <Link to={`/profile/${author.name.toLowerCase().replace(" ", "-")}`}>
            <img
              src={author.avatar}
              alt={author.name}
              className="rounded-full"
            />
          </Link>
        </Avatar>
        <div className="flex flex-col">
          <Link
            to={`/profile/${author.name.toLowerCase().replace(" ", "-")}`}
            className="font-semibold text-sm hover:underline"
          >
            {author.name}
          </Link>
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
              <DropdownMenuItem asChild>
                <Link
                  to={`/post/${author.name.toLowerCase().replace(" ", "-")}/${postId}`}
                >
                  {t("post.viewDetails") || "View Post Details"}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {!location.pathname.includes("/post/") ? (
          <Link
            to={`/post/${author.name.toLowerCase().replace(" ", "-")}/${postId}`}
            className="group"
          >
            <p className="text-sm group-hover:text-pink-500 transition-colors">
              {content}
            </p>
            <div className="mt-2 text-xs text-gray-500 flex items-center group-hover:text-pink-500">
              <ExternalLink className="h-3 w-3 mr-1" />
              {t("post.viewFullPost") || "View full post"}
            </div>
          </Link>
        ) : (
          <p className="text-sm">{content}</p>
        )}
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
            <span>{t("post.like") || "Like"}</span>
            <span className="text-xs ml-1">
              ({liked ? engagement.likes + 1 : engagement.likes})
            </span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-pink-500"
            onClick={toggleComments}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            <span>{t("post.comment") || "Comment"}</span>
            <span className="text-xs ml-1">({engagement.comments})</span>
          </Button>
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-pink-500"
              onClick={toggleShareOptions}
            >
              <Share2 className="h-4 w-4 mr-1" />
              <span>{t("post.share") || "Share"}</span>
              <span className="text-xs ml-1">({engagement.shares})</span>
            </Button>

            {showShareOptions && (
              <div className="absolute bottom-full left-0 mb-2 bg-white shadow-lg rounded-lg p-2 w-48 z-10 border border-gray-200">
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-gray-600 hover:text-pink-500"
                    onClick={handleCopyLink}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    {copied
                      ? t("post.linkCopied") || "Link copied!"
                      : t("post.copyLink") || "Copy link"}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-gray-600 hover:text-blue-600"
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/post/${author.name.toLowerCase().replace(" ", "-")}/${postId}`)}`,
                      )
                    }
                  >
                    <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                    {t("post.shareOnFacebook") || "Share on Facebook"}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-gray-600 hover:text-blue-400"
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(`${window.location.origin}/post/${author.name.toLowerCase().replace(" ", "-")}/${postId}`)}`,
                      )
                    }
                  >
                    <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                    {t("post.shareOnTwitter") || "Share on Twitter"}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-gray-600 hover:text-gray-800"
                    onClick={() =>
                      window.open(
                        `mailto:?subject=${encodeURIComponent(author.name + "'s post")}&body=${encodeURIComponent(`Check out this post: ${window.location.origin}/post/${author.name.toLowerCase().replace(" ", "-")}/${postId}`)}`,
                      )
                    }
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    {t("post.shareViaEmail") || "Share via email"}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-gray-600 hover:text-pink-500"
                    asChild
                  >
                    <Link
                      to={`/post/${author.name.toLowerCase().replace(" ", "-")}/${postId}`}
                    >
                      <LinkIcon className="h-4 w-4 mr-2 text-pink-500" />
                      {t("post.viewFullPost") || "View full post"}
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
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
