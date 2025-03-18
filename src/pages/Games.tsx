import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Globe,
  Laptop,
  Server,
  Download,
  Play,
  Filter,
} from "lucide-react";
import ThreeColumnLayout from "../components/layout/ThreeColumnLayout";
import GameDialog from "@/components/games/GameDialog";
import { Game, GameType, GAMES_DATA } from "@/data/games";

const getGameTypeIcon = (gameType: GameType) => {
  switch (gameType) {
    case "browser":
      return <Globe className="h-4 w-4 text-blue-500" />;
    case "embedded":
      return <Server className="h-4 w-4 text-green-500" />;
    case "desktop":
      return <Laptop className="h-4 w-4 text-purple-500" />;
    default:
      return <GamepadIcon className="h-4 w-4 text-primary" />;
  }
};

const getGameTypeLabel = (gameType: GameType) => {
  switch (gameType) {
    case "browser":
      return "Chơi trên trình duyệt";
    case "embedded":
      return "Game tích hợp";
    case "desktop":
      return "Tải về máy tính";
    default:
      return "";
  }
};

const getActionButton = (gameType: GameType, onPlay: () => void) => {
  switch (gameType) {
    case "browser":
      return (
        <Button
          onClick={onPlay}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          <Play className="mr-2 h-4 w-4" />
          Chơi ngay
        </Button>
      );
    case "embedded":
      return (
        <Button
          onClick={onPlay}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          <Play className="mr-2 h-4 w-4" />
          Chơi ngay
        </Button>
      );
    case "desktop":
      return (
        <Button
          onClick={onPlay}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          <Download className="mr-2 h-4 w-4" />
          Tải xuống
        </Button>
      );
    default:
      return (
        <Button
          onClick={onPlay}
          className="w-full bg-primary hover:bg-primary-dark"
        >
          Chơi ngay
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      );
  }
};

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
        <div className="absolute top-2 right-2">
          <Badge
            className={`
              ${game.gameType === "browser" ? "bg-blue-600 hover:bg-blue-600" : ""}
              ${game.gameType === "embedded" ? "bg-green-600 hover:bg-green-600" : ""}
              ${game.gameType === "desktop" ? "bg-purple-600 hover:bg-purple-600" : ""}
            `}
          >
            <div className="flex items-center gap-1">
              {getGameTypeIcon(game.gameType)}
              <span className="text-xs">
                {getGameTypeLabel(game.gameType).split(" ")[0]}
              </span>
            </div>
          </Badge>
        </div>
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
        {getActionButton(game.gameType, () => onPlay(game))}
      </CardFooter>
    </Card>
  );
};

const Games = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [activeTypeFilter, setActiveTypeFilter] = useState<GameType | "all">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    let filtered = GAMES_DATA;

    // Filter by category
    if (activeTab !== "all") {
      filtered = filtered.filter(
        (game) => game.category.toLowerCase() === activeTab,
      );
    }

    // Filter by game type
    if (activeTypeFilter !== "all") {
      filtered = filtered.filter((game) => game.gameType === activeTypeFilter);
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (game) =>
          game.title.toLowerCase().includes(query) ||
          game.description.toLowerCase().includes(query) ||
          game.category.toLowerCase().includes(query),
      );
    }

    setSearchResults(filtered);
  }, [searchQuery, activeTab, activeTypeFilter]);

  const handlePlayGame = (game: Game) => {
    if (game.gameType === "browser") {
      // For browser games, navigate to the game detail page
      navigate(`/games/${game.id}`);
    } else {
      // For other game types, show the dialog
      setSelectedGame(game);
      setDialogOpen(true);
    }
  };

  const filteredGames = searchResults;

  const categories = [
    "all",
    ...new Set(GAMES_DATA.map((game) => game.category.toLowerCase())),
  ];

  const gameTypes: (GameType | "all")[] = [
    "all",
    "browser",
    "embedded",
    "desktop",
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

                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Tìm kiếm trò chơi..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full bg-white"
                    />
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {gameTypes.map((type) => (
                      <Badge
                        key={type}
                        variant={
                          activeTypeFilter === type ? "default" : "outline"
                        }
                        className={`cursor-pointer px-3 py-1 ${type === "browser" && activeTypeFilter === type ? "bg-blue-600" : ""} ${type === "embedded" && activeTypeFilter === type ? "bg-green-600" : ""} ${type === "desktop" && activeTypeFilter === type ? "bg-purple-600" : ""}`}
                        onClick={() => setActiveTypeFilter(type)}
                      >
                        {type === "all" ? (
                          <>
                            <Filter className="h-3 w-3 mr-1" />
                            Tất cả
                          </>
                        ) : type === "browser" ? (
                          <>
                            <Globe className="h-3 w-3 mr-1" />
                            Trình duyệt
                          </>
                        ) : type === "embedded" ? (
                          <>
                            <Server className="h-3 w-3 mr-1" />
                            Tích hợp
                          </>
                        ) : (
                          <>
                            <Laptop className="h-3 w-3 mr-1" />
                            Máy tính
                          </>
                        )}
                      </Badge>
                    ))}
                  </div>
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
                      <div className="flex gap-3 mt-4">
                        <Button
                          variant="outline"
                          onClick={() => setSearchQuery("")}
                        >
                          Xóa tìm kiếm
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setActiveTab("all");
                            setActiveTypeFilter("all");
                          }}
                        >
                          Xóa bộ lọc
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary rounded-full p-3">
                    <GamepadIcon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold">
                    Trò chơi đề xuất cho bạn
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="overflow-hidden border-blue-200 bg-gradient-to-b from-blue-50 to-white">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold text-blue-700">
                          Trò chơi trình duyệt
                        </CardTitle>
                        <Globe className="h-5 w-5 text-blue-500" />
                      </div>
                      <CardDescription>
                        Chơi ngay không cần cài đặt
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          Chơi trực tiếp trên trình duyệt
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          Không cần cài đặt
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          Trải nghiệm mượt mà
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Globe className="mr-2 h-4 w-4" />
                        Xem tất cả
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="overflow-hidden border-green-200 bg-gradient-to-b from-green-50 to-white">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold text-green-700">
                          Game tích hợp
                        </CardTitle>
                        <Server className="h-5 w-5 text-green-500" />
                      </div>
                      <CardDescription>
                        Từ GameService, chơi trực tiếp
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          Tích hợp từ GameService
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          Chơi ngay trên giao diện
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          Cập nhật liên tục
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Server className="mr-2 h-4 w-4" />
                        Xem tất cả
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="overflow-hidden border-purple-200 bg-gradient-to-b from-purple-50 to-white">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold text-purple-700">
                          Game máy tính
                        </CardTitle>
                        <Laptop className="h-5 w-5 text-purple-500" />
                      </div>
                      <CardDescription>
                        Tải về và chơi trên máy tính
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                          Đồ họa chất lượng cao
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                          Tải về từ GameService
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                          Trải nghiệm game đầy đủ
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        <Download className="mr-2 h-4 w-4" />
                        Xem tất cả
                      </Button>
                    </CardFooter>
                  </Card>
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
