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

    // Search
    "search.keywords": "Keywords",
    "search.keyword": "Keyword",
    "search.people": "People",
    "search.person": "Person",
    "search.posts": "Posts",
    "search.post": "Post",
    "search.groups": "Groups",
    "search.group": "Group",
    "search.games": "Games",
    "search.game": "Game",
    "search.viewAll": "View all results",
    "search.results": "Search Results",
    "search.placeholder": "Search on PinkSocial...",
    "search.search": "Search",
    "search.all": "All",
    "search.filters": "Filters",
    "search.date": "Date",
    "search.anyTime": "Any time",
    "search.past24h": "Past 24 hours",
    "search.pastWeek": "Past week",
    "search.pastMonth": "Past month",
    "search.source": "Source",
    "search.fromFriends": "From friends",
    "search.fromGroups": "From groups",
    "search.public": "Public",
    "search.seeAll": "See all",

    // Time translations
    "time.just now": "just now",
    "time.1 minute ago": "1 minute ago",
    "time.2 minutes ago": "2 minutes ago",
    "time.5 minutes ago": "5 minutes ago",
    "time.10 minutes ago": "10 minutes ago",
    "time.15 minutes ago": "15 minutes ago",
    "time.30 minutes ago": "30 minutes ago",
    "time.45 minutes ago": "45 minutes ago",
    "time.1 hour ago": "1 hour ago",
    "time.2 hours ago": "2 hours ago",
    "time.3 hours ago": "3 hours ago",
    "time.4 hours ago": "4 hours ago",
    "time.5 hours ago": "5 hours ago",
    "time.yesterday": "yesterday",
    "time.2 days ago": "2 days ago",
    "time.3 days ago": "3 days ago",
    "time.last week": "last week",
    "time.2 weeks ago": "2 weeks ago",
    "time.last month": "last month",
    "time.2 months ago": "2 months ago",
    "time.3 months ago": "3 months ago",
    "time.last year": "last year",
    "time.2 years ago": "2 years ago",
    "time.3 years ago": "3 years ago",
    "time.a long time ago": "a long time ago",

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
    "post.viewDetails": "View Post Details",
    "post.copyLink": "Copy link",
    "post.linkCopied": "Link copied!",
    "post.shareOnFacebook": "Share on Facebook",
    "post.shareOnTwitter": "Share on Twitter",
    "post.shareViaEmail": "Share via email",
    "post.shareOptions": "Share options",
    "post.closeShareOptions": "Close share options",
    "post.viewPostDetails": "View Post Details",

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
    "friends.online": "Online",
    "friends.offline": "Offline",

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

    // Search
    "search.keywords": "Từ khóa",
    "search.keyword": "Từ khóa",
    "search.people": "Người dùng",
    "search.person": "Người dùng",
    "search.posts": "Bài viết",
    "search.post": "Bài viết",
    "search.groups": "Nhóm",
    "search.group": "Nhóm",
    "search.games": "Trò chơi",
    "search.game": "Trò chơi",
    "search.viewAll": "Xem tất cả kết quả",
    "search.results": "Kết quả tìm kiếm",
    "search.placeholder": "Tìm kiếm trên PinkSocial...",
    "search.search": "Tìm kiếm",
    "search.all": "Tất cả",
    "search.filters": "Bộ lọc",
    "search.date": "Thời gian",
    "search.anyTime": "Bất kỳ lúc nào",
    "search.past24h": "24 giờ qua",
    "search.pastWeek": "Tuần qua",
    "search.pastMonth": "Tháng qua",
    "search.source": "Nguồn",
    "search.fromFriends": "Từ bạn bè",
    "search.fromGroups": "Từ nhóm",
    "search.public": "Công khai",
    "search.seeAll": "Xem tất cả",

    // Time translations
    "time.just now": "vừa xong",
    "time.1 minute ago": "1 phút trước",
    "time.2 minutes ago": "2 phút trước",
    "time.5 minutes ago": "5 phút trước",
    "time.10 minutes ago": "10 phút trước",
    "time.15 minutes ago": "15 phút trước",
    "time.30 minutes ago": "30 phút trước",
    "time.45 minutes ago": "45 phút trước",
    "time.1 hour ago": "1 giờ trước",
    "time.2 hours ago": "2 giờ trước",
    "time.3 hours ago": "3 giờ trước",
    "time.4 hours ago": "4 giờ trước",
    "time.5 hours ago": "5 giờ trước",
    "time.yesterday": "hôm qua",
    "time.2 days ago": "2 ngày trước",
    "time.3 days ago": "3 ngày trước",
    "time.last week": "tuần trước",
    "time.2 weeks ago": "2 tuần trước",
    "time.last month": "tháng trước",
    "time.2 months ago": "2 tháng trước",
    "time.3 months ago": "3 tháng trước",
    "time.last year": "năm trước",
    "time.2 years ago": "2 năm trước",
    "time.3 years ago": "3 năm trước",
    "time.a long time ago": "rất lâu trước đây",

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
    "post.viewDetails": "Xem chi tiết bài viết",
    "post.copyLink": "Sao chép liên kết",
    "post.linkCopied": "Đã sao chép liên kết!",
    "post.shareOnFacebook": "Chia sẻ lên Facebook",
    "post.shareOnTwitter": "Chia sẻ lên Twitter",
    "post.shareViaEmail": "Chia sẻ qua email",
    "post.shareOptions": "Tùy chọn chia sẻ",
    "post.closeShareOptions": "Đóng tùy chọn chia sẻ",
    "post.viewPostDetails": "View Post Details",

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
    "friends.online": "Trực tuyến",
    "friends.offline": "Ngoại tuyến",

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

// Export as a named function component for consistent exports
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("english");

  // Define t function directly in the component body
  function t(key: string): string {
    return translations[language][key] || key;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Export as a named function for consistent exports
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
