'use client';

import { siteConfig } from '@/config/site.config';
import hideRechartsConsoleError from '@/utils/recharts-console-error';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

hideRechartsConsoleError();

export function ThemeProvider({ children }: React.PropsWithChildren<{}>) {
  const session = useSession() as any;
  const router = useRouter();

  const sessionStatus = session.status;

  const redirection = () => {
    if (sessionStatus === 'unauthenticated') {
      router.push('/signin');
    }
  };
  useEffect(() => {
    redirection();
  }, [sessionStatus]);

  return (
    <NextThemeProvider
      enableSystem={false}
      defaultTheme={String(siteConfig.mode)}
    >
      {children}
    </NextThemeProvider>
  );
}
