"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type StatusType = "ready" | "break" | "not ready" | "wrap up";

interface TimerState {
  [key: string]: number;
}

export default function StatusDropdown() {
  const [status, setStatus] = useState<StatusType>("not ready");
  const [timers, setTimers] = useState<TimerState>({
    ready: 0,
    break: 0,
    "not ready": 0,
    "wrap up": 0,
  });

  // Handle timer increments for active status
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => ({
        ...prev,
        [status]: prev[status] + 1,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return [hrs, mins, secs].map((v) => String(v).padStart(2, "0")).join(":");
  };

  const statusColors: Record<StatusType, string> = {
    ready: "bg-green-500",
    break: "bg-yellow-500",
    "not ready": "bg-red-500",
    "wrap up": "bg-blue-500",
  };

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-9 min-w-[140px] gap-2 bg-gray-50 border-gray-300 hover:bg-slate-100 hover:text-gray-950 transition text-sm",
              status === "ready" && "border-green-400",
              status === "break" && "border-yellow-400",
              status === "not ready" && "border-red-400",
              status === "wrap up" && "border-blue-400"
            )}
          >
            <div className={cn("w-2 h-2 rounded-full", statusColors[status])} />
            <span className="capitalize truncate">{status}</span>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>

        {/* ✅ Increased width to avoid text breaking */}
        <DropdownMenuContent align="start" className="w-48">
          {(["ready", "break", "not ready", "wrap up"] as StatusType[]).map(
            (s) => (
              <DropdownMenuItem
                key={s}
                onClick={() => setStatus(s)}
                className="flex justify-between items-center"
              >
                <div className="flex items-center">
                  <div
                    className={cn("w-2 h-2 rounded-full mr-2", statusColors[s])}
                  />
                  <span className="capitalize">{s}</span>
                </div>
                {/* <span className="text-xs text-gray-500">
                  {formatTime(timers[s])}
                </span> */}
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <span
        className={cn(
          "text-sm font-medium",
          status === "ready"
            ? "text-green-600"
            : status === "break"
            ? "text-yellow-600"
            : status === "not ready"
            ? "text-red-600"
            : "text-blue-600"
        )}
      >
        {formatTime(timers[status])}
      </span>
    </div>
  );
}
