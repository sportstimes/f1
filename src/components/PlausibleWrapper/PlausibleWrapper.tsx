'use client';

import PlausibleProvider from 'next-plausible';

export default function PlausibleWrapper({ children }: { children: React.ReactNode }) {
  return <PlausibleProvider>{children}</PlausibleProvider>;
}
