'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import Image from 'next/image';

interface WatsonChatInstance {
    changeView: (view: string) => void;
    restartConversation: (...args: unknown[]) => Promise<void>;
    send: (message: { input: { message_type: string; text: string } }, options: { silent: boolean }) => Promise<void>;
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
  
const Page = () => {
const [chatInstance, setChatInstance] = useState<WatsonChatInstance | null>(null);
  const [loading, setLoading] = useState(false);
  const isRendered = useRef(false);

  useEffect(() => {
    if (window.watsonAssistantChatOptions) return;

    window.watsonAssistantChatOptions = {
      integrationID: 'debfed34-0092-4b97-9961-867deb3d6e6d',
      region: 'wxo-us-south',
      serviceInstanceID: '727fcb04-1caa-4c7b-8051-138f5a41ee3d',
      showLauncher: false,
      onLoad: async (instance: WatsonChatInstance) => {
        window.webChatInstance = instance;
        setChatInstance(instance);
        await instance.updateLocale('es');
      },
    };

    const script = document.createElement('script');
    script.src = 'https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const handleStart = async () => {
    if (!chatInstance) return;

    setLoading(true);

    // Simula 3 segundos de carga antes de mostrar el chatbot
    setTimeout(async () => {
      const alreadySent = sessionStorage.getItem('ibm_message_sent');
      if (!alreadySent) {
        await chatInstance.send({ input: { message_type: 'text', text: 'demo2' } }, { silent: true });
        sessionStorage.setItem('ibm_message_sent', 'true');
      }

      if (!isRendered.current) {
        await chatInstance.render();
        isRendered.current = true;
      }

      await chatInstance.changeView('mainWindow');
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <CircularProgress size={60} />
        </Box>
      )}

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          fontFamily: `'Inter', 'Roboto', 'Helvetica Neue', sans-serif`,
          bgcolor: '#f6f9fc',
        }}
      >
        {/* Columna izquierda */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 4, md: 10 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 4,
            bgcolor: '#ffffff',
          }}
        >
          <Typography variant="h3" fontWeight="bold" color="#007eae" sx={{ lineHeight: 1.2 }}>
            Bienvenido a tu asistente legal
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 480, color: '#4a4a4a', fontSize: '1.1rem' }}>
            Resuelve dudas de contrato, envía correos y programa recordatorios con ayuda de inteligencia artificial.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              width: 'fit-content',
              backgroundColor: '#007eae',
              fontWeight: 'bold',
              textTransform: 'none',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: '#004b88',
              },
            }}
            onClick={handleStart}
          >
            Iniciar asistente
          </Button>
        </Box>

        {/* Columna derecha */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#e9f4fb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 6,
          }}
        >
          <Box
            sx={{
              backgroundColor: '#fff',
              borderRadius: '1rem',
              p: 4,
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            }}
          >
            <Image
              src="/logos/bot.svg.png"
              alt="Bank Bot"
              width={300}
              height={300}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Page;