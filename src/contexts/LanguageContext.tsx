import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Language = "english" | "vietnamese";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LANGUAGE_STORAGE_KEY = "language";

const translations: Record<Language, Record<string, string>> = {
  english: {
    // Navigation
    "nav.home": "Home",
    "nav.messages": "Messages",
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

    // Messages
    "messages.timeline": "Timeline",
    "messages.messages": "Messages",
    "messages.conversations": "Conversations",
    "messages.searchMessages": "Search messages",
    "messages.whatsHappening": "What's happening?",
    "messages.send": "Send",
    "messages.typeMessage": "Type a message...",
    "messages.noMessages": "No messages yet.",
    "messages.noSearchResults": "No messages match your search.",
    "messages.noConversations": "No conversations yet.",
    "messages.selectConversation": "Select a conversation to start messaging",
    "messages.userAvatar": "User avatar",
    "messages.user.janeDoe": "Jane Doe",
    "messages.user.johnSmith": "John Smith",
    "messages.user.sarahJohnson": "Sarah Johnson",
    "messages.user.michaelChen": "Michael Chen",
    "messages.user.currentUser": "Current User",
    "messages.sampleText.greeting": "Hey, how are you doing today?",
    "messages.sampleText.movie":
      "Did you see the new movie that just came out?",
    "messages.sampleText.thanks": "Thanks for the help with the project!",
    "messages.sampleText.coffee": "Let's meet up for coffee next week!",
    "messages.sampleText.dayGoing": "Hey there! How's your day going?",
    "messages.sampleText.appFeatures":
      "Hi Jane! It's going pretty well, thanks for asking. Just working on some new features for the app.",
    "messages.sampleText.whatFeatures":
      "That sounds exciting! What kind of features are you working on?",
    "messages.sampleText.messagingSystem":
      "I'm adding a new messaging system with better media sharing.",
    "messages.sampleText.testIt":
      "That sounds really cool! I'd love to test it out when it's ready.",
    "messages.sampleText.notYet": "Not yet! Is it good?",
    "messages.sampleText.tuesday": "Sounds good! How about Tuesday at 2pm?",
    "messages.sampleText.usualPlace":
      "Perfect! See you then at the usual place.",

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
    "profile.editProfile": "Edit Profile",
    "profile.editProfileDesc":
      "Update your personal information and profile pictures.",
    "profile.basicInfo": "Basic Info",
    "profile.details": "Details",
    "profile.photos": "Photos",
    "profile.name": "Name",
    "profile.namePlaceholder": "Your full name",
    "profile.bio": "Bio",
    "profile.bioPlaceholder": "Tell us about yourself",
    "profile.location": "Location",
    "profile.locationPlaceholder": "City, Country",
    "profile.work": "Work",
    "profile.workPlaceholder": "Company or occupation",
    "profile.education": "Education",
    "profile.educationPlaceholder": "School or university",
    "profile.selectStatus": "Select status",
    "profile.single": "Single",
    "profile.inRelationship": "In a relationship",
    "profile.engaged": "Engaged",
    "profile.married": "Married",
    "profile.complicated": "It's complicated",
    "profile.profilePicture": "Profile Picture",
    "profile.uploadPhoto": "Upload Photo",
    "profile.cancel": "Cancel",
    "profile.coverPhoto": "Cover Photo",
    "profile.uploadCover": "Upload Cover",
    "profile.saveChanges": "Save Changes",
    "profile.updateSuccess": "Profile updated successfully",
    "post.noPosts": "No posts to show yet.",
    "profile.about": "About",
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
    "games.explore": "Explore and relax with exciting games",
    "games.searchGames": "Search games...",
    "games.type": "Type",
    "games.status": "Status",
    "games.all": "All",
    "games.browser": "Browser",
    "games.embedded": "Embedded",
    "games.desktop": "Desktop",
    "games.playable": "Playable",
    "games.comingSoon": "Coming Soon",
    "games.maintenance": "Maintenance",
    "games.undefined": "Undefined",
    "games.noGamesFound": "No games found",
    "games.noGamesFoundDesc":
      "No games match your search. Try a different search or view all games.",
    "games.clearSearch": "Clear search",
    "games.clearFilters": "Clear filters",
    "games.viewAll": "View all",
    "games.browserGames": "Browser Games",
    "games.playInstantly": "Play instantly without installation",
    "games.playInBrowser": "Play directly in browser",
    "games.noInstallation": "No installation required",
    "games.smoothExperience": "Smooth experience",
    "games.embeddedGames": "Embedded Games",
    "games.fromGameService": "From GameService, play directly",
    "games.integratedFromGameService": "Integrated from GameService",
    "games.playDirectly": "Play directly in interface",
    "games.continuousUpdates": "Continuous updates",
    "games.desktopGames": "Desktop Games",
    "games.downloadAndPlay": "Download and play on your computer",
    "games.highQualityGraphics": "High quality graphics",
    "games.downloadFromGameService": "Download from GameService",
    "games.fullGameExperience": "Full game experience",
    "games.downloadComplete": "Download complete",
    "games.openToPlay": "Open file to play",

    // Footer
    "footer.copyright": "© 2023 PinkSocial",
  },
  vietnamese: {
    // Navigation
    "nav.home": "Trang chủ",
    "nav.messages": "Tin nhắn",
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

    // Messages
    "messages.timeline": "Dòng thời gian",
    "messages.messages": "Tin nhắn",
    "messages.conversations": "Cuộc trò chuyện",
    "messages.searchMessages": "Tìm kiếm tin nhắn",
    "messages.whatsHappening": "Điều gì đang xảy ra?",
    "messages.send": "Gửi",
    "messages.typeMessage": "Nhập tin nhắn...",
    "messages.noMessages": "Chưa có tin nhắn nào.",
    "messages.noSearchResults":
      "Không có tin nhắn nào phù hợp với tìm kiếm của bạn.",
    "messages.noConversations": "Chưa có cuộc trò chuyện nào.",
    "messages.selectConversation":
      "Chọn một cuộc trò chuyện để bắt đầu nhắn tin",
    "messages.userAvatar": "Ảnh đại diện người dùng",
    "messages.user.janeDoe": "Jane Doe",
    "messages.user.johnSmith": "John Smith",
    "messages.user.sarahJohnson": "Sarah Johnson",
    "messages.user.michaelChen": "Michael Chen",
    "messages.user.currentUser": "Người dùng hiện tại",
    "messages.sampleText.greeting": "Chào bạn, hôm nay bạn thế nào?",
    "messages.sampleText.movie": "Bạn đã xem bộ phim mới ra mắt chưa?",
    "messages.sampleText.thanks": "Cảm ơn vì đã giúp đỡ với dự án!",
    "messages.sampleText.coffee": "Hẹn gặp nhau uống cà phê vào tuần sau nhé!",
    "messages.sampleText.dayGoing": "Chào! Ngày hôm nay của bạn thế nào?",
    "messages.sampleText.appFeatures":
      "Chào Jane! Mình khỏe, cảm ơn đã hỏi thăm. Mình đang làm một số tính năng mới cho ứng dụng.",
    "messages.sampleText.whatFeatures":
      "Nghe thú vị đấy! Bạn đang làm những tính năng gì vậy?",
    "messages.sampleText.messagingSystem":
      "Mình đang thêm hệ thống nhắn tin mới với khả năng chia sẻ phương tiện tốt hơn.",
    "messages.sampleText.testIt":
      "Nghe thật tuyệt! Mình rất muốn thử nó khi nó sẵn sàng.",
    "messages.sampleText.notYet": "Chưa! Nó có hay không?",
    "messages.sampleText.tuesday":
      "Nghe tốt đấy! Thứ Ba lúc 2 giờ chiều được không?",
    "messages.sampleText.usualPlace":
      "Tuyệt! Hẹn gặp tại địa điểm thường lệ nhé.",

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
    "profile.editProfile": "Chỉnh sửa trang cá nhân",
    "profile.editProfileDesc":
      "Cập nhật thông tin cá nhân và hình ảnh của bạn.",
    "profile.basicInfo": "Thông tin cơ bản",
    "profile.details": "Chi tiết",
    "profile.photos": "Hình ảnh",
    "profile.name": "Tên",
    "profile.namePlaceholder": "Tên đầy đủ của bạn",
    "profile.bio": "Tiểu sử",
    "profile.bioPlaceholder": "Hãy kể về bản thân bạn",
    "profile.location": "Vị trí",
    "profile.locationPlaceholder": "Thành phố, Quốc gia",
    "profile.work": "Công việc",
    "profile.workPlaceholder": "Công ty hoặc nghề nghiệp",
    "profile.education": "Học vấn",
    "profile.educationPlaceholder": "Trường học hoặc đại học",
    "profile.selectStatus": "Chọn trạng thái",
    "profile.single": "Độc thân",
    "profile.inRelationship": "Đang hẹn hò",
    "profile.engaged": "Đã đính hôn",
    "profile.married": "Đã kết hôn",
    "profile.complicated": "Phức tạp",
    "profile.profilePicture": "Ảnh đại diện",
    "profile.uploadPhoto": "Tải ảnh lên",
    "profile.cancel": "Hủy",
    "profile.coverPhoto": "Ảnh bìa",
    "profile.uploadCover": "Tải ảnh bìa",
    "profile.saveChanges": "Lưu thay đổi",
    "profile.updateSuccess": "Cập nhật trang cá nhân thành công",
    "post.noPosts": "Chưa có bài viết nào để hiển thị.",

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
    "games.explore": "Khám phá và thư giãn với các trò chơi hấp dẫn",
    "games.searchGames": "Tìm kiếm trò chơi...",
    "games.type": "Loại",
    "games.status": "Trạng thái",
    "games.all": "Tất cả",
    "games.browser": "Trình duyệt",
    "games.embedded": "Tích hợp",
    "games.desktop": "Máy tính",
    "games.playable": "Có thể chơi",
    "games.comingSoon": "Sắp ra mắt",
    "games.maintenance": "Bảo trì",
    "games.undefined": "Không xác định",
    "games.noGamesFound": "Không tìm thấy trò chơi",
    "games.noGamesFoundDesc":
      "Không có trò chơi nào phù hợp với tìm kiếm của bạn. Hãy thử tìm kiếm khác hoặc xem tất cả trò chơi.",
    "games.clearSearch": "Xóa tìm kiếm",
    "games.clearFilters": "Xóa bộ lọc",
    "games.viewAll": "Xem tất cả",
    "games.browserGames": "Trò chơi trình duyệt",
    "games.playInstantly": "Chơi ngay không cần cài đặt",
    "games.playInBrowser": "Chơi trực tiếp trên trình duyệt",
    "games.noInstallation": "Không cần cài đặt",
    "games.smoothExperience": "Trải nghiệm mượt mà",
    "games.embeddedGames": "Game tích hợp",
    "games.fromGameService": "Từ GameService, chơi trực tiếp",
    "games.integratedFromGameService": "Tích hợp từ GameService",
    "games.playDirectly": "Chơi ngay trên giao diện",
    "games.continuousUpdates": "Cập nhật liên tục",
    "games.desktopGames": "Game máy tính",
    "games.downloadAndPlay": "Tải về và chơi trên máy tính",
    "games.highQualityGraphics": "Đồ họa chất lượng cao",
    "games.downloadFromGameService": "Tải về từ GameService",
    "games.fullGameExperience": "Trải nghiệm game đầy đủ",
    "games.downloadComplete": "Tải xuống hoàn tất",
    "games.openToPlay": "Mở tệp để chơi",

    // Footer
    "footer.copyright": "© 2023 PinkSocial",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Create the hook first, then use it in the provider
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Helper function to detect user's country based on timezone
const detectUserCountry = async (): Promise<string> => {
  try {
    // Use the Geolocation API to get user's location
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    return data.country_code;
  } catch (error) {
    console.error("Error detecting user country:", error);
    // Fallback to timezone detection if API fails
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Vietnam timezone is Asia/Ho_Chi_Minh
    return timeZone.includes("Ho_Chi_Minh") ? "VN" : "OTHER";
  }
};

// Use const declaration for consistent component export
const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setInternalLanguage] = useState<Language>(() => {
    // Try to get language from localStorage first
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (
      savedLanguage &&
      (savedLanguage === "english" || savedLanguage === "vietnamese")
    ) {
      return savedLanguage as Language;
    }
    // Default to english until we detect location
    return "english";
  });

  // Set language and save to localStorage
  const setLanguage = (newLanguage: Language) => {
    setInternalLanguage(newLanguage);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
  };

  // Effect to detect user's country and set language if not already set
  useEffect(() => {
    const detectAndSetLanguage = async () => {
      // Only run country detection if no language preference is saved
      if (!localStorage.getItem(LANGUAGE_STORAGE_KEY)) {
        const countryCode = await detectUserCountry();
        // If user is in Vietnam, set language to Vietnamese
        if (countryCode === "VN") {
          setLanguage("vietnamese");
        } else {
          setLanguage("english");
        }
      }
    };

    detectAndSetLanguage();
  }, []);

  // Define t function directly in the component body
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageProvider };
