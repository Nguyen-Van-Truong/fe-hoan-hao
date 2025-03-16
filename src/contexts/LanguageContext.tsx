import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "english" | "vietnamese";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const translations: Record<Language, Record<string, string>> = {
  english: {
    // Navigation
    "nav.home": "Home",
    "nav.friends": "Friends",
    "nav.groups": "Groups",
    "nav.games": "Games",
    "nav.search": "Search...",

    // User Profile
    "profile.profile": "Profile",
    "profile.language": "Language",
    "profile.logout": "Logout",

    // Post Creator
    "post.whatsOnYourMind": "What's on your mind?",
    "post.liveVideo": "Live Video",
    "post.photoVideo": "Photo/Video",
    "post.feelingActivity": "Feeling/Activity",
    "post.createPost": "Create Post",
    "post.addToYourPost": "Add to your post",
    "post.post": "Post",
    "post.public": "Public",
    "post.writeAComment": "Write a comment...",
    "post.viewMoreComments": "View more comments",
    "post.reply": "Reply",

    // Post Actions
    "post.like": "Like",
    "post.comment": "Comment",
    "post.share": "Share",
    "post.likes": "likes",
    "post.comments": "comments",
    "post.shares": "shares",
    "post.savePost": "Save Post",
    "post.hidePost": "Hide Post",
    "post.reportPost": "Report Post",

    // Suggested Friends
    "friends.suggestedFriends": "Suggested Friends",
    "friends.seeAll": "See All",
    "friends.mutualFriends": "mutual friends",
    "friends.add": "Add",

    // Footer
    "footer.copyright": "© 2023 PinkSocial",
  },
  vietnamese: {
    // Navigation
    "nav.home": "Trang chủ",
    "nav.friends": "Bạn bè",
    "nav.groups": "Nhóm",
    "nav.games": "Trò chơi",
    "nav.search": "Tìm kiếm...",

    // User Profile
    "profile.profile": "Trang cá nhân",
    "profile.language": "Ngôn ngữ",
    "profile.logout": "Đăng xuất",

    // Post Creator
    "post.whatsOnYourMind": "Bạn đang nghĩ gì?",
    "post.liveVideo": "Video trực tiếp",
    "post.photoVideo": "Hình ảnh/Video",
    "post.feelingActivity": "Cảm xúc/Hoạt động",
    "post.createPost": "Tạo bài viết",
    "post.addToYourPost": "Thêm vào bài viết của bạn",
    "post.post": "Đăng",
    "post.public": "Công khai",
    "post.writeAComment": "Viết bình luận...",
    "post.viewMoreComments": "Xem thêm bình luận",
    "post.reply": "Phản hồi",

    // Post Actions
    "post.like": "Thích",
    "post.comment": "Bình luận",
    "post.share": "Chia sẻ",
    "post.likes": "lượt thích",
    "post.comments": "bình luận",
    "post.shares": "lượt chia sẻ",
    "post.savePost": "Lưu bài viết",
    "post.hidePost": "Ẩn bài viết",
    "post.reportPost": "Báo cáo bài viết",

    // Suggested Friends
    "friends.suggestedFriends": "Gợi ý kết bạn",
    "friends.seeAll": "Xem tất cả",
    "friends.mutualFriends": "bạn chung",
    "friends.add": "Thêm",

    // Footer
    "footer.copyright": "© 2023 PinkSocial",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("english");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
