import { Suspense, useEffect } from "react";
import { Routes, Route, useLocation, useRoutes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import PostDetail from "./pages/PostDetail";
import routes from "tempo-routes";
import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
  const location = useLocation();

  useEffect(() => {
    // Update page title based on current route
    let pageTitle = "Trang chủ";

    if (location.pathname === "/profile") {
      pageTitle = "Hồ sơ";
    } else if (location.pathname.startsWith("/friends")) {
      pageTitle = "Bạn bè";
    } else if (location.pathname === "/groups") {
      pageTitle = "Nhóm";
    } else if (location.pathname === "/games") {
      pageTitle = "Trò chơi";
    } else if (location.pathname.startsWith("/post/")) {
      // Post detail pages will set their own title in the component
      return;
    }

    document.title = `${pageTitle} | Hoàn Hảo`;
  }, [location]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LanguageProvider>
        <>
          {/* For the tempo routes */}
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile isCurrentUser={true} />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/friends" element={<Friends />} />
            <Route
              path="/friends/suggestions"
              element={<Friends initialTab="suggestions" />}
            />
            <Route
              path="/friends/requests"
              element={<Friends initialTab="requests" />}
            />
            <Route path="/post/:username/:postId" element={<PostDetail />} />
            <Route path="/post/:username" element={<PostDetail />} />
          </Routes>
        </>
      </LanguageProvider>
    </Suspense>
  );
}

export default App;
