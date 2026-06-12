'use client';

import { useEditor, TemplateElement } from '@/context/EditorContext';
import { Rnd } from 'react-rnd';
import { useState, useEffect } from 'react';

export default function Canvas() {
  const {
    pageSetup,
    setPageSetup,
    elements,
    updateElement,
    selectedElementId,
    setSelectedElementId,
    takeSnapshot,
  } = useEditor();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setScale(
        Math.min(
          1,
          (window.innerWidth - 600) / pageSetup.width,
          (window.innerHeight - 150) / pageSetup.height,
        ),
      );
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pageSetup.width, pageSetup.height]);

  const handleDragStop = (id: string, d: { x: number; y: number }) => {
    updateElement(id, { x: d.x, y: d.y });
  };

  const handleResizeStop = (
    id: string,
    ref: HTMLElement,
    position: { x: number; y: number },
  ) => {
    updateElement(id, {
      width: parseInt(ref.style.width, 10),
      height: parseInt(ref.style.height, 10),
      x: position.x,
      y: position.y,
    });
  };

  const renderElement = (el: TemplateElement) => {
    if (el.type === 'text') {
      return (
        <div
          className="w-full h-full p-1"
          style={{
            fontSize: `${el.fontSize}px`,
            color: el.color,
            textAlign: el.textAlign,
            fontWeight: el.fontWeight,
            display: 'flex',
            alignItems: 'center',
            wordBreak: 'break-word',
          }}
        >
          {el.content}
        </div>
      );
    }

    if (el.type === 'image') {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={el.content}
          alt="element"
          crossOrigin="anonymous"
          className="w-full h-full object-contain pointer-events-none"
        />
      );
    }
  };

  return (
    <div
      className="relative shadow-2xl bg-white overflow-hidden transition-all flex-shrink-0"
      style={{
        width: `${pageSetup.width}px`,
        height: `${pageSetup.height}px`,
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
      }}
      id="template-canvas"
      onClick={() => setSelectedElementId(null)}
    >
      {pageSetup.backgroundUrl && (
        <Rnd
          key="background-rnd"
          size={{
            width: pageSetup.bgWidth ?? pageSetup.width,
            height: pageSetup.bgHeight ?? pageSetup.height,
          }}
          position={{
            x: pageSetup.bgX ?? 0,
            y: pageSetup.bgY ?? 0,
          }}
          onDragStart={() => takeSnapshot()}
          onDragStop={(e, d) => {
            setPageSetup((prev) => ({ ...prev, bgX: d.x, bgY: d.y }));
          }}
          onResizeStart={() => takeSnapshot()}
          onResizeStop={(e, direction, ref, delta, position) => {
            setPageSetup((prev) => ({
              ...prev,
              bgWidth: parseInt(ref.style.width, 10),
              bgHeight: parseInt(ref.style.height, 10),
              bgX: position.x,
              bgY: position.y,
            }));
          }}
          bounds="parent"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            setSelectedElementId('background');
          }}
          style={{
            border:
              selectedElementId === 'background'
                ? '2px solid #3b82f6'
                : '1px dashed transparent',
            zIndex: 0,
            outline: 'none',
          }}
          className={`group hover:border-blue-300 ${
            selectedElementId === 'background' ? '!border-blue-500' : ''
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pageSetup.backgroundUrl}
            alt="background"
            crossOrigin="anonymous"
            className="w-full h-full object-fill pointer-events-none"
          />
        </Rnd>
      )}

      {elements.map((el) => (
        <Rnd
          key={el.id}
          size={{ width: el.width, height: el.height }}
          position={{ x: el.x, y: el.y }}
          onDragStart={() => takeSnapshot()}
          onDragStop={(e, d) => handleDragStop(el.id, d)}
          onResizeStart={() => takeSnapshot()}
          onResizeStop={(e, direction, ref, delta, position) =>
            handleResizeStop(el.id, ref, position)
          }
          bounds="parent"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            setSelectedElementId(el.id);
          }}
          style={{
            border:
              selectedElementId === el.id
                ? '2px solid #3b82f6'
                : '1px dashed transparent',
            zIndex: selectedElementId === el.id ? 10 : 1,
            outline: 'none',
          }}
          className={`group hover:border-blue-300 ${
            selectedElementId === el.id ? '!border-blue-500' : ''
          }`}
        >
          {renderElement(el)}
        </Rnd>
      ))}
    </div>
  );
}
