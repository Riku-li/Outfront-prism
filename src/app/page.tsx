"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";

interface WatsonChatInstance {
  changeView: (view: string) => void;
  restartConversation: (...args: unknown[]) => Promise<void>;
  send: (
    message: { input: { message_type: string; text: string } },
    options: { silent: boolean }
  ) => Promise<void>;
  updateLocale: (locale: string) => Promise<void>;
  render: () => Promise<void>;
}

declare global {
  interface Window {
    webChatInstance?: WatsonChatInstance;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    watsonAssistantChatOptions?: any;
  }
}

export default function Page() {
  const isRendered = useRef(false);
  const [, setChatInstance] = useState<WatsonChatInstance | null>(null);
  useEffect(() => {
    if (window.watsonAssistantChatOptions) return;

    window.watsonAssistantChatOptions = {
      integrationID: "d32d12d2-3994-4eaa-8a99-a52f1e74d478",
      region: "wxo-au-syd",
      serviceInstanceID: "295771ac-d74d-4be7-a099-462113a456ac",
      orchestrateUIAgentExtensions: false,
      showLauncher: true,
      onLoad: async (instance: WatsonChatInstance) => {
        window.webChatInstance = instance;
        setChatInstance(instance);

        try {
          await instance.updateLocale("en");
        } catch {}

        if (!isRendered.current) {
          await instance.render();
          isRendered.current = true;
        }
      },
    };

    const s = document.createElement("script");
    const ver =
      (window.watsonAssistantChatOptions &&
        window.watsonAssistantChatOptions.clientVersion) ||
      "latest";
    s.src = `https://web-chat.global.assistant.watson.appdomain.cloud/versions/${ver}/WatsonAssistantChatEntry.js`;
    s.async = true;
    document.head.appendChild(s);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        fontFamily: `'Inter', 'Roboto', 'Helvetica Neue', sans-serif`,
        bgcolor: "#f6f9fc",
      }}
    >
      {/* Left column */}
      <Box
        sx={{
          flex: 1,
          p: { xs: 4, md: 10 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 3,
          bgcolor: "#ffffff",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          color="#ffcc00
"
          sx={{ lineHeight: 1.2 }}
        >
          Outfront Solutions · Prism Assistant
        </Typography>
        <Typography
          variant="body1"
          sx={{ maxWidth: 520, color: "#4a4a4a", fontSize: "1.05rem" }}
        >
          Ask questions about Outfront. The chat launcher is available at the
          bottom-right corner. Click it to start.
        </Typography>
      </Box>

      {/* Right column (visual only) */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#fff8deff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 6,
        }}
      ></Box>
    </Box>
  );
}
