'use client';

import { EditorProvider } from '@/context/EditorContext';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return <EditorProvider>{children}</EditorProvider>;
}
