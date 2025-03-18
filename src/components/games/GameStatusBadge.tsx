import { Badge } from "@/components/ui/badge";
import { GameStatus } from "@/data/games";
import { Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface GameStatusBadgeProps {
  status: GameStatus;
}

export default function GameStatusBadge({ status }: GameStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "playable":
        return {
          label: "Có thể chơi",
          variant: "success" as const,
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
        };
      case "coming_soon":
        return {
          label: "Sắp ra mắt",
          variant: "secondary" as const,
          icon: <Clock className="h-3.5 w-3.5 mr-1" />,
        };
      case "maintenance":
        return {
          label: "Bảo trì",
          variant: "destructive" as const,
          icon: <AlertTriangle className="h-3.5 w-3.5 mr-1" />,
        };
      default:
        return {
          label: "Không xác định",
          variant: "outline" as const,
          icon: null,
        };
    }
  };

  const { label, variant, icon } = getStatusConfig();

  return (
    <Badge variant={variant} className="flex items-center text-xs font-medium">
      {icon}
      {label}
    </Badge>
  );
}
