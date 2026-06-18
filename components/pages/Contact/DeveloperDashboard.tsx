"use client";

import { useEffect, useState } from "react";
import { Terminal, Clock, Server, Monitor, Code, Globe, ShieldAlert } from "lucide-react";

export const DeveloperDashboard = () => {
  const [time, setTime] = useState("");
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    // Real-time updating clock for Maharashtra (India) - IST (UTC+5:30)
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    // Dynamic fake uptime count
    const startTime = Date.now();
    const uptimeInterval = setInterval(() => {
      setUptime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(uptimeInterval);
    };
  }, []);

  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}h ${mins}m ${secs}s`;
  };

  return (
    <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-indigo-950/10 backdrop-blur-md p-6 font-mono text-xs sm:text-sm text-gray-300 shadow-2xl hover:border-blue-500/30 hover:shadow-[0_0_45px_rgba(59,130,246,0.1)] transition-all duration-500 flex flex-col gap-6 z-50">
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-400" />
          <span className="text-white font-bold tracking-wider">DEV_SESSION // ACTIVE</span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
      </div>

      {/* Grid Layout of Metrics */}
      <div className="grid grid-cols-2 gap-4">
        {/* Metric 1: System Status */}
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-wider">
            <Server className="w-3.5 h-3.5 text-green-400" />
            System Status
          </div>
          <div className="flex items-center gap-2 text-white font-semibold mt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            ONLINE
          </div>
        </div>

        {/* Metric 2: Local Time */}
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            Local Time (IST)
          </div>
          <span className="text-white font-semibold mt-1 text-sm sm:text-base">
            {time || "00:00:00"}
          </span>
        </div>

        {/* Metric 3: Session Uptime */}
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-wider">
            <Monitor className="w-3.5 h-3.5 text-indigo-400" />
            Session Uptime
          </div>
          <span className="text-white font-semibold mt-1 text-xs">
            {formatUptime(uptime)}
          </span>
        </div>

        {/* Metric 4: Dev Environment */}
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            Location
          </div>
          <span className="text-white font-semibold mt-1 text-xs truncate">
            MH, India
          </span>
        </div>
      </div>

      {/* Terminal Console Output */}
      <div className="p-4 rounded-xl border border-white/5 bg-black/40 text-gray-400 flex flex-col gap-2 leading-relaxed">
        <div className="flex items-center gap-2 text-white/60 text-[10px] uppercase tracking-wider mb-1">
          <Code className="w-3.5 h-3.5 text-cyan-400" />
          Console Log
        </div>
        <p className="text-[11px]"><span className="text-blue-400">$</span> fetch stack_focus --active</p>
        <p className="text-[11px] text-green-400/80">{"=>"} [&quot;NextJS&quot;, &quot;React&quot;, &quot;TypeScript&quot;, &quot;NodeJS&quot;]</p>
        <p className="text-[11px]"><span className="text-blue-400">$</span> check connection_sec</p>
        <p className="text-[11px] text-green-400/80">{"=>"} SSL // TLS 1.3 active & secure</p>
        <div className="flex items-center gap-1.5 text-[11px] text-yellow-500/80 mt-1">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Listening for inbound collaboration requests...</span>
        </div>
      </div>
    </div>
  );
};
