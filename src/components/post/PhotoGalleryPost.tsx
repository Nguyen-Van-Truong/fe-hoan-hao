import React, { useState } from "react";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Heart, MessageCircle, MoreVertical, Share2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PhotoViewer from "./PhotoViewer";

interface PhotoGalleryPostProps {
  author?: {
    name: string;
    avatar: string;
    timestamp: string;
  };
  content?: string;
  images?: string[];
  totalImages?: number;
  likes?: number;
  comments?: number;
  shares?: number;
}

const PhotoGalleryPost = ({
  author = {
    name: "Jane Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    timestamp: "2 hours ago",
  },
  content = "Just had an amazing weekend with friends! Here are some highlights from our trip to the mountains. The views were breathtaking and the weather was perfect!",
  images = [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80",
    "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=500&q=80",
    "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?w=500&q=80",
    "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=500&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80",
    "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=500&q=80",
    "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?w=500&q=80",
    "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=500&q=80",
  ],
  totalImages = 8,
  likes = 124,
  comments = 43,
  shares = 12,
}: PhotoGalleryPostProps) => {
  const { t } = useLanguage();
  const [photoViewerOpen, setPhotoViewerOpen] = useState(false);
  const [initialPhotoIndex, setInitialPhotoIndex] = useState(0);

  // Number of images to display in the gallery
  const displayCount = Math.min(6, images.length);
  const displayedImages = images.slice(0, displayCount);
  const remainingCount = totalImages - displayCount;

  const handleImageClick = (index: number) => {
    setInitialPhotoIndex(index);
    setPhotoViewerOpen(true);
  };

  return (
    <Card className="w-full mb-4 overflow-hidden bg-white">
      <div className="p-4">
        {/* Post Header with Author Info and Menu */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-[#f2a2d2]">
              <img src={author.avatar} alt={author.name} />
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">{author.name}</h3>
              <p className="text-xs text-gray-500">{author.timestamp}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>{t("post.savePost")}</DropdownMenuItem>
              <DropdownMenuItem>{t("post.hidePost")}</DropdownMenuItem>
              <DropdownMenuItem>{t("post.reportPost")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Post Content */}
        <div className="mb-3">
          <p className="text-sm">{content}</p>
        </div>

        {/* Photo Gallery */}
        <div
          className={`grid ${images.length === 1 ? "grid-cols-1" : images.length === 2 ? "grid-cols-2" : "grid-cols-3"} gap-1 mb-3`}
        >
          {displayedImages.map((image, index) => (
            <div
              key={index}
              className={`relative aspect-square overflow-hidden ${index === displayCount - 1 && remainingCount > 0 ? "relative" : ""} cursor-pointer`}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {index === displayCount - 1 && remainingCount > 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                  <span className="text-white font-semibold text-xl">
                    +{remainingCount}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Photo Viewer */}
        <PhotoViewer
          isOpen={photoViewerOpen}
          onClose={() => setPhotoViewerOpen(false)}
          images={images}
          initialIndex={initialPhotoIndex}
        />

        {/* Engagement Metrics */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div>
            {likes} {t("post.likes")}
          </div>
          <div>
            {comments} {t("post.comments")} • {shares} {t("post.shares")}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex border-t border-gray-100 pt-3">
          <Button
            variant="ghost"
            className="flex-1 flex items-center justify-center gap-2 text-gray-600 hover:bg-pink-50"
          >
            <Heart className="h-5 w-5" />
            <span>{t("post.like")}</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-1 flex items-center justify-center gap-2 text-gray-600 hover:bg-pink-50"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{t("post.comment")}</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-1 flex items-center justify-center gap-2 text-gray-600 hover:bg-pink-50"
          >
            <Share2 className="h-5 w-5" />
            <span>{t("post.share")}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PhotoGalleryPost;
