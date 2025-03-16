import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import routes from "tempo-routes";
import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LanguageProvider>
        <>
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
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </LanguageProvider>
    </Suspense>
  );
}

export default App;
