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
    "profile.about": "About",
    "profile.friends": "Friends",
    "profile.photos": "Photos",
    "profile.posts": "Posts",
    "profile.allPhotos": "All Photos",
    "profile.detailedInfo": "Detailed Information",
    "profile.personalInfo": "Personal Information",
    "profile.changeCover": "Change Cover",
    "profile.addStory": "Add Story",
    "profile.addFriend": "Add Friend",
    "profile.message": "Message",
    "profile.videos": "Videos",
    "profile.seeAllFriends": "See All Friends",
    "profile.seeAllPhotos": "See All Photos",
    "profile.livesIn": "Lives in",
    "profile.works": "Works at",
    "profile.studied": "Studied at",
    "profile.from": "From",
    "profile.relationship": "Relationship",
    "profile.joined": "Joined",

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
    "post.loadingMorePosts": "Loading more posts...",

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
    "post.viewFullPost": "View full post",
    "post.backToFeed": "Back to Feed",
    "post.relatedPosts": "Related Posts",
    "post.noRelatedPosts": "No related posts to show right now.",

    // Friends Page
    "friends.title": "Friends",
    "friends.suggestedFriends": "Suggested Friends",
    "friends.seeAll": "See All",
    "friends.mutualFriends": "mutual friends",
    "friends.add": "Add",
    "friends.yourFriends": "Your Friends",
    "friends.requests": "Friend Requests",
    "friends.suggestions": "Suggestions",
    "friends.allFriends": "All Friends",
    "friends.searchFriends": "Search friends",
    "friends.noSearchResults": "No friends match your search.",
    "friends.noFriends": "You don't have any friends yet.",
    "friends.noRequests": "You don't have any friend requests.",
    "friends.noSuggestions":
      "We don't have any friend suggestions for you right now.",
    "friends.message": "Message",
    "friends.accept": "Accept",
    "friends.decline": "Decline",
    "friends.addFriend": "Add Friend",

    // Groups Page
    "groups.title": "Groups",
    "groups.create": "Create Group",
    "groups.myGroups": "My Groups",
    "groups.discover": "Discover",
    "groups.yourGroups": "Your Groups",
    "groups.upcomingEvents": "Upcoming Events",
    "groups.recentDiscussions": "Recent Discussions",
    "groups.suggested": "Suggested Groups",

    // Games Page
    "games.title": "Games",
    "games.popular": "Popular",
    "games.new": "New",
    "games.myGames": "My Games",
    "games.trending": "Trending Games",
    "games.categories": "Categories",
    "games.leaderboard": "Leaderboard",
    "games.newReleases": "New Releases",
    "games.recentlyPlayed": "Recently Played",
    "games.recommended": "Recommended For You",
    "games.achievements": "Your Achievements",
    "games.friends": "Friends Playing",

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
    "profile.about": "Giới thiệu",
    "profile.friends": "Bạn bè",
    "profile.photos": "Hình ảnh",
    "profile.posts": "Bài viết",
    "profile.allPhotos": "Tất cả hình ảnh",
    "profile.detailedInfo": "Thông tin chi tiết",
    "profile.personalInfo": "Thông tin cá nhân",
    "profile.changeCover": "Thay đổi ảnh bìa",
    "profile.addStory": "Thêm tin",
    "profile.addFriend": "Kết bạn",
    "profile.message": "Nhắn tin",
    "profile.videos": "Video",
    "profile.seeAllFriends": "Xem tất cả bạn bè",
    "profile.seeAllPhotos": "Xem tất cả hình ảnh",
    "profile.livesIn": "Sống tại",
    "profile.works": "Làm việc tại",
    "profile.studied": "Đã học tại",
    "profile.from": "Đến từ",
    "profile.relationship": "Tình trạng mối quan hệ",
    "profile.joined": "Đã tham gia",

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
    "post.loadingMorePosts": "Đang tải thêm bài viết...",

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
    "post.viewFullPost": "Xem bài viết đầy đủ",
    "post.backToFeed": "Quay lại bảng tin",
    "post.relatedPosts": "Bài viết liên quan",
    "post.noRelatedPosts": "Không có bài viết liên quan nào để hiển thị.",

    // Friends Page
    "friends.title": "Bạn bè",
    "friends.suggestedFriends": "Gợi ý kết bạn",
    "friends.seeAll": "Xem tất cả",
    "friends.mutualFriends": "bạn chung",
    "friends.add": "Thêm",
    "friends.yourFriends": "Bạn bè của bạn",
    "friends.requests": "Lời mời kết bạn",
    "friends.suggestions": "Gợi ý",
    "friends.allFriends": "Tất cả bạn bè",
    "friends.searchFriends": "Tìm kiếm bạn bè",
    "friends.noSearchResults": "Không tìm thấy bạn bè phù hợp.",
    "friends.noFriends": "Bạn chưa có bạn bè nào.",
    "friends.noRequests": "Bạn không có lời mời kết bạn nào.",
    "friends.noSuggestions":
      "Hiện tại chúng tôi không có gợi ý kết bạn nào cho bạn.",
    "friends.message": "Nhắn tin",
    "friends.accept": "Chấp nhận",
    "friends.decline": "Từ chối",
    "friends.addFriend": "Kết bạn",

    // Groups Page
    "groups.title": "Nhóm",
    "groups.create": "Tạo nhóm",
    "groups.myGroups": "Nhóm của tôi",
    "groups.discover": "Khám phá",
    "groups.yourGroups": "Nhóm của bạn",
    "groups.upcomingEvents": "Sự kiện sắp tới",
    "groups.recentDiscussions": "Thảo luận gần đây",
    "groups.suggested": "Nhóm được đề xuất",

    // Games Page
    "games.title": "Trò chơi",
    "games.popular": "Phổ biến",
    "games.new": "Mới",
    "games.myGames": "Trò chơi của tôi",
    "games.trending": "Trò chơi thịnh hành",
    "games.categories": "Danh mục",
    "games.leaderboard": "Bảng xếp hạng",
    "games.newReleases": "Mới phát hành",
    "games.recentlyPlayed": "Đã chơi gần đây",
    "games.recommended": "Đề xuất cho bạn",
    "games.achievements": "Thành tích của bạn",
    "games.friends": "Bạn bè đang chơi",

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
