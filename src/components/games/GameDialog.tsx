import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Star, Clock, Trophy, GamepadIcon } from "lucide-react";

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

interface GameDialogProps {
  game: Game;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GameDialog = ({ game, open, onOpenChange }: GameDialogProps) => {
  const handleStartGame = () => {
    // Implement actual game start logic here
    console.log(`Starting game: ${game.title}`);

    // For now, we'll just simulate a game starting by showing an alert
    alert(`Bắt đầu chơi: ${game.title}`);

    // Close the dialog after starting the game
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <div className="relative h-56 -mt-6 -mx-6 mb-4 overflow-hidden rounded-t-lg">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6">
              <Badge className="bg-primary hover:bg-primary mb-2">
                {game.category}
              </Badge>
              <h2 className="text-2xl font-bold text-white">{game.title}</h2>
            </div>
          </div>
        </div>

        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{game.title}</DialogTitle>
          <DialogDescription className="text-base">
            {game.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 my-6">
          <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
            <Users className="h-6 w-6 text-primary mb-2" />
            <span className="text-sm font-medium">
              {game.players} người chơi
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
            <Star className="h-6 w-6 text-yellow-500 mb-2" />
            <span className="text-sm font-medium">{game.rating}/5</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
            <Clock className="h-6 w-6 text-primary mb-2" />
            <span className="text-sm font-medium">{game.playTime}</span>
          </div>
        </div>

        <div className="bg-primary/10 p-4 rounded-lg mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <h3 className="font-medium">Bảng xếp hạng</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Chơi và đạt điểm cao để lên bảng xếp hạng. Người chơi hàng đầu sẽ
            nhận được phần thưởng đặc biệt!
          </p>
        </div>

        <DialogFooter className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GamepadIcon className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">
              {Math.floor(Math.random() * 100) + 50} người đang chơi
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Đóng
            </Button>
            <Button
              onClick={handleStartGame}
              className="bg-primary hover:bg-primary-dark"
            >
              Bắt đầu chơi
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameDialog;
