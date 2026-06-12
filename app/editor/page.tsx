'use client';

import { useEffect } from 'react';
import { useEditor } from '@/context/EditorContext';
import Sidebar from '@/components/editor/Sidebar';
import Canvas from '@/components/editor/Canvas';
import PropertiesPanel from '@/components/editor/PropertiesPanel';
import Topbar from '@/components/editor/Topbar';

export default function EditorPage() {
  const { pageSetup, undo, redo, removeElement, selectedElementId } =
    useEditor();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if we're typing inside an input/textarea
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT';

      // Undo/Redo logic
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        if (!isInput) {
          e.preventDefault();
          if (e.shiftKey) {
            redo();
          } else {
            undo();
          }
        }
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'y') {
        if (!isInput) {
          e.preventDefault();
          redo();
        }
      }

      // Delete element
      if (e.key === 'Backspace' || e.key === 'Delete') {
        if (!isInput && selectedElementId) {
          e.preventDefault();
          removeElement(selectedElementId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, removeElement, selectedElementId]);

  if (!pageSetup) return null;

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-gray-100">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto flex items-center justify-center p-8">
          <Canvas />
        </main>
        <PropertiesPanel />
      </div>
    </div>
  );
}
