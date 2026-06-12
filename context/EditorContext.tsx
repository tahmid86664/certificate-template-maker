'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ElementType = 'text' | 'image';

export interface TemplateElement {
  id: string;
  type: ElementType;
  content: string; // text content or image URL
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export interface PageSetup {
  format: 'A4' | 'Letter' | 'Custom';
  orientation: 'landscape' | 'portrait';
  width: number; // in pixels (at 96dpi or similar for preview)
  height: number;
  backgroundUrl: string | null;
  bgX?: number;
  bgY?: number;
  bgWidth?: number;
  bgHeight?: number;
}

interface HistoryState {
  elements: TemplateElement[];
  pageSetup: PageSetup;
}

interface EditorContextType {
  pageSetup: PageSetup;
  setPageSetup: React.Dispatch<React.SetStateAction<PageSetup>>;
  elements: TemplateElement[];
  setElements: React.Dispatch<React.SetStateAction<TemplateElement[]>>;
  selectedElementId: string | null;
  setSelectedElementId: React.Dispatch<React.SetStateAction<string | null>>;
  addElement: (element: Omit<TemplateElement, 'id'>) => void;
  updateElement: (id: string, updates: Partial<TemplateElement>) => void;
  removeElement: (id: string) => void;
  takeSnapshot: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const defaultPageSetup: PageSetup = {
  format: 'A4',
  orientation: 'landscape',
  width: 1123, // A4 Landscape at 96 DPI: 1123x794
  height: 794,
  backgroundUrl: null,
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [pageSetup, setPageSetup] = useState<PageSetup>(defaultPageSetup);
  const [elements, setElements] = useState<TemplateElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null,
  );

  const [past, setPast] = useState<HistoryState[]>([]);
  const [future, setFuture] = useState<HistoryState[]>([]);

  const takeSnapshot = () => {
    setPast((prev) => [...prev, { elements, pageSetup }]);
    setFuture([]);
  };

  const undo = () => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    setFuture((prev) => [{ elements, pageSetup }, ...prev]);
    setPast(newPast);
    setElements(previous.elements);
    setPageSetup(previous.pageSetup);
  };

  const redo = () => {
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);

    setPast((prev) => [...prev, { elements, pageSetup }]);
    setFuture(newFuture);
    setElements(next.elements);
    setPageSetup(next.pageSetup);
  };

  const addElement = (element: Omit<TemplateElement, 'id'>) => {
    takeSnapshot();
    const newElement: TemplateElement = {
      ...element,
      id: Math.random().toString(36).substr(2, 9),
    };
    setElements((prev) => [...prev, newElement]);
    setSelectedElementId(newElement.id);
  };

  const updateElement = (id: string, updates: Partial<TemplateElement>) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el)),
    );
  };

  const removeElement = (id: string) => {
    if (elements.some((el) => el.id === id)) {
      takeSnapshot();
      setElements((prev) => prev.filter((el) => el.id !== id));
      if (selectedElementId === id) setSelectedElementId(null);
    }
  };

  return (
    <EditorContext.Provider
      value={{
        pageSetup,
        setPageSetup,
        elements,
        setElements,
        selectedElementId,
        setSelectedElementId,
        addElement,
        updateElement,
        removeElement,
        takeSnapshot,
        undo,
        redo,
        canUndo: past.length > 0,
        canRedo: future.length > 0,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
