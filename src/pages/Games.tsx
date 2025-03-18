import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GamepadIcon,
  Trophy,
  Users,
  Star,
  Clock,
  ArrowRight,
  Search,
} from "lucide-react";
import ThreeColumnLayout from "../components/layout/ThreeColumnLayout";
import GameDialog from "@/components/games/GameDialog";

interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  players: number;
  category: string;
  rating: number;
  playTime: string;
}

const GAMES_DATA: Game[] = [
  {
    id: "1",
    title: "Cờ Caro",
    description:
      "Trò chơi cờ caro cổ điển, người chơi đầu tiên tạo được 5 quân liên tiếp sẽ thắng.",
    image:
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=500&q=80",
    players: 2,
    category: "Cờ",
    rating: 4.8,
    playTime: "5-15 phút",
  },
  {
    id: "2",
    title: "Đoán Từ",
    description: "Trò chơi đoán từ vui nhộn, thử thách vốn từ vựng của bạn.",
    image:
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=500&q=80",
    players: 2,
    category: "Từ vựng",
    rating: 4.5,
    playTime: "10-20 phút",
  },
  {
    id: "3",
    title: "Xếp Hình",
    description:
      "Trò chơi xếp hình giúp rèn luyện tư duy logic và khả năng phản xạ.",
    image:
      "https://images.unsplash.com/photo-1642456074142-92f75cb84ad2?w=500&q=80",
    players: 1,
    category: "Giải đố",
    rating: 4.7,
    playTime: "Không giới hạn",
  },
  {
    id: "4",
    title: "Đua Xe",
    description: "Trò chơi đua xe hấp dẫn với nhiều cấp độ và thử thách.",
    image:
      "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=500&q=80",
    players: 1,
    category: "Đua xe",
    rating: 4.6,
    playTime: "5-10 phút",
  },
  {
    id: "5",
    title: "Bắn Bóng",
    description: "Trò chơi bắn bóng màu sắc, phá hủy các nhóm bóng cùng màu.",
    image:
      "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=500&q=80",
    players: 1,
    category: "Giải trí",
    rating: 4.4,
    playTime: "Không giới hạn",
  },
  {
    id: "6",
    title: "Sudoku",
    description: "Trò chơi giải đố Sudoku kinh điển với nhiều cấp độ khó.",
    image:
      "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=500&q=80",
    players: 1,
    category: "Giải đố",
    rating: 4.9,
    playTime: "15-30 phút",
  },
];

const GameCard = ({
  game,
  onPlay,
}: {
  game: Game;
  onPlay: (game: Game) => void;
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-bold">{game.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {game.category}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm line-clamp-2">{game.description}</p>
        <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{game.players} người chơi</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-500" />
            <span>{game.rating}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{game.playTime}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-primary hover:bg-primary-dark"
          onClick={() => onPlay(game)}
        >
          Chơi ngay
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const Games = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const filtered =
      activeTab === "all"
        ? GAMES_DATA
        : GAMES_DATA.filter(
            (game) => game.category.toLowerCase() === activeTab,
          );

    if (searchQuery.trim() === "") {
      setSearchResults(filtered);
    } else {
      const query = searchQuery.toLowerCase().trim();
      const results = filtered.filter(
        (game) =>
          game.title.toLowerCase().includes(query) ||
          game.description.toLowerCase().includes(query) ||
          game.category.toLowerCase().includes(query),
      );
      setSearchResults(results);
    }
  }, [searchQuery, activeTab]);

  const handlePlayGame = (game: Game) => {
    setSelectedGame(game);
    setDialogOpen(true);
  };

  const filteredGames = searchResults;

  const categories = [
    "all",
    ...new Set(GAMES_DATA.map((game) => game.category.toLowerCase())),
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <ThreeColumnLayout>
        <div className="w-full max-w-[950px] mx-auto p-4">
          <Card className="mb-4">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-primary">
                      Trò chơi
                    </h1>
                    <p className="text-muted-foreground mt-2">
                      Khám phá và thư giãn với các trò chơi hấp dẫn
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    <span className="font-medium">Bảng xếp hạng</span>
                  </div>
                </div>

                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm trò chơi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full bg-white"
                  />
                </div>
              </div>

              <Tabs defaultValue="all" className="mb-8">
                <TabsList className="mb-6">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      onClick={() => setActiveTab(category)}
                      className="capitalize"
                    >
                      {category === "all" ? "Tất cả" : category}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value={activeTab} className="mt-0">
                  {filteredGames.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredGames.map((game) => (
                        <GameCard
                          key={game.id}
                          game={game}
                          onPlay={handlePlayGame}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <GamepadIcon className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">
                        Không tìm thấy trò chơi
                      </h3>
                      <p className="text-muted-foreground mt-2 max-w-md">
                        Không có trò chơi nào phù hợp với tìm kiếm của bạn. Hãy
                        thử tìm kiếm khác hoặc xem tất cả trò chơi.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setSearchQuery("")}
                      >
                        Xem tất cả trò chơi
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <div className="mt-12 bg-pink-50 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary rounded-full p-3">
                    <GamepadIcon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold">
                    Trò chơi đề xuất cho bạn
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {GAMES_DATA.slice(0, 3).map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      onPlay={handlePlayGame}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ThreeColumnLayout>

      {selectedGame && (
        <GameDialog
          game={selectedGame}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </div>
  );
};

export default Games;
