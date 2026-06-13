'use client';

import { useEditor } from '@/context/EditorContext';
import { Trash2 } from 'lucide-react';

export default function PropertiesPanel() {
  const {
    elements,
    selectedElementId,
    updateElement,
    removeElement,
    pageSetup,
    setPageSetup,
    takeSnapshot,
  } = useEditor();

  const selectedElement = elements.find((el) => el.id === selectedElementId);

  const handleBgUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    takeSnapshot();
    setPageSetup({
      ...pageSetup,
      backgroundUrl: e.target.value,
      bgWidth: pageSetup.width,
      bgHeight: pageSetup.height,
      bgX: 0,
      bgY: 0,
    });
  };

  if (!selectedElement && selectedElementId !== 'background') {
    return (
      <div className="w-64 bg-white border-l border-gray-200 p-4 shrink-0 shadow-sm z-10 overflow-y-auto hidden md:block">
        <h2 className="font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">
          Page Properties
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Canvas Size
            </label>
            <div className="text-sm bg-gray-50 p-2 border border-gray-200 rounded">
              {pageSetup.width} x {pageSetup.height} px <br />
              <span className="text-gray-800 capitalize">
                {pageSetup.orientation}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Background Image URL
            </label>
            <input
              onFocus={() => takeSnapshot()}
              type="text"
              value={pageSetup.backgroundUrl || ''}
              onChange={handleBgUrlChange}
              placeholder="https://example.com/bg.png"
              className="w-full text-sm text-gray-900 border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <p className="text-sm text-gray-800 mt-8 text-center bg-gray-50 py-4 rounded border border-dashed border-gray-200">
          Select an element on the canvas to see its properties.
        </p>
      </div>
    );
  }

  if (selectedElementId === 'background') {
    return (
      <div className="w-64 bg-white border-l border-gray-200 p-4 shrink-0 shadow-sm z-10 overflow-y-auto">
        <div className="flex items-center justify-between font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">
          <h2>Background Properties</h2>
          <button
            onClick={() => {
              takeSnapshot();
              setPageSetup({ ...pageSetup, backgroundUrl: null });
            }}
            className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded"
            title="Delete Background"
          >
            <Trash2 size={16} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Background Image URL
            </label>
            <input
              onFocus={() => takeSnapshot()}
              type="text"
              value={pageSetup.backgroundUrl || ''}
              onChange={handleBgUrlChange}
              placeholder="https://example.com/bg.png"
              className="w-full text-sm text-gray-900 border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100">
            <div>
              <label className="block text-xs text-gray-700 mb-1">Width</label>
              <input
                type="number"
                onFocus={() => takeSnapshot()}
                value={Math.round(pageSetup.bgWidth ?? pageSetup.width)}
                onChange={(e) =>
                  setPageSetup({
                    ...pageSetup,
                    bgWidth: Number(e.target.value),
                  })
                }
                className="w-full text-sm text-gray-900 border border-gray-300 rounded p-1"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-700 mb-1">Height</label>
              <input
                type="number"
                onFocus={() => takeSnapshot()}
                value={Math.round(pageSetup.bgHeight ?? pageSetup.height)}
                onChange={(e) =>
                  setPageSetup({
                    ...pageSetup,
                    bgHeight: Number(e.target.value),
                  })
                }
                className="w-full text-sm text-gray-900 border border-gray-300 rounded p-1"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-700 mb-1">X Pos</label>
              <input
                type="number"
                onFocus={() => takeSnapshot()}
                value={Math.round(pageSetup.bgX ?? 0)}
                onChange={(e) =>
                  setPageSetup({ ...pageSetup, bgX: Number(e.target.value) })
                }
                className="w-full text-sm text-gray-900 border border-gray-300 rounded p-1"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-700 mb-1">Y Pos</label>
              <input
                type="number"
                onFocus={() => takeSnapshot()}
                value={Math.round(pageSetup.bgY ?? 0)}
                onChange={(e) =>
                  setPageSetup({ ...pageSetup, bgY: Number(e.target.value) })
                }
                className="w-full text-sm text-gray-900 border border-gray-300 rounded p-1"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedElement) return null;

  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4 shrink-0 shadow-sm z-10 overflow-y-auto">
      <div className="flex items-center justify-between font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">
        <h2>Element Properties</h2>
        <button
          onClick={() => removeElement(selectedElement.id)}
          className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded"
          title="Delete element"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {selectedElement.type === 'text' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Variable ID
              </label>
              <input
                onFocus={() => takeSnapshot()}
                type="text"
                value={selectedElement.variableId || ''}
                readOnly
                className="w-full text-sm text-gray-500 bg-gray-100 border border-gray-300 rounded p-2 cursor-not-allowed"
                title="This determines the dynamic variable for JSON"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Content
              </label>
              <textarea
                onFocus={() => takeSnapshot()}
                value={selectedElement.content}
                onChange={(e) =>
                  updateElement(selectedElement.id, { content: e.target.value })
                }
                className="w-full text-sm text-gray-900 border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Font Size
                </label>
                <input
                  onFocus={() => takeSnapshot()}
                  type="number"
                  value={selectedElement.fontSize || 16}
                  onChange={(e) =>
                    updateElement(selectedElement.id, {
                      fontSize: Number(e.target.value),
                    })
                  }
                  className="w-full text-sm text-gray-900 border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Color
                </label>
                <input
                  onFocus={() => takeSnapshot()}
                  type="color"
                  value={selectedElement.color || '#000000'}
                  onChange={(e) =>
                    updateElement(selectedElement.id, { color: e.target.value })
                  }
                  className="w-full h-[38px] text-gray-900 border border-gray-300 rounded p-1"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Alignment
              </label>
              <select
                onFocus={() => takeSnapshot()}
                value={selectedElement.textAlign || 'left'}
                onChange={(e) =>
                  updateElement(selectedElement.id, {
                    textAlign: e.target.value as 'left' | 'center' | 'right',
                  })
                }
                className="w-full text-sm text-gray-900 border border-gray-300 rounded p-2"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Font Weight
              </label>
              <select
                onFocus={() => takeSnapshot()}
                value={selectedElement.fontWeight || 'normal'}
                onChange={(e) =>
                  updateElement(selectedElement.id, {
                    fontWeight: e.target.value,
                  })
                }
                className="w-full text-sm text-gray-900 border border-gray-300 rounded p-2"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="100">Light</option>
                <option value="300">Thin</option>
                <option value="semibold">Semibold</option>
                <option value="900">Black</option>
              </select>
            </div>
          </>
        )}

        {selectedElement.type === 'image' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Variable ID
              </label>
              <input
                onFocus={() => takeSnapshot()}
                type="text"
                value={selectedElement.variableId || ''}
                readOnly
                className="w-full text-sm text-gray-500 bg-gray-100 border border-gray-300 rounded p-2 cursor-not-allowed"
                title="This determines the dynamic variable for JSON"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Image URL
              </label>
              <input
                onFocus={() => takeSnapshot()}
                type="text"
                value={selectedElement.content}
                onChange={(e) =>
                  updateElement(selectedElement.id, { content: e.target.value })
                }
                className="w-full text-sm text-gray-900 border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </>
        )}

        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100">
          <div>
            <label className="block text-xs text-gray-800 mb-1">Width</label>
            <input
              onFocus={() => takeSnapshot()}
              type="number"
              value={Math.round(selectedElement.width)}
              onChange={(e) =>
                updateElement(selectedElement.id, {
                  width: Number(e.target.value),
                })
              }
              className="w-full text-sm text-gray-900 border border-gray-300 rounded p-1"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-800 mb-1">Height</label>
            <input
              onFocus={() => takeSnapshot()}
              type="number"
              value={Math.round(selectedElement.height)}
              onChange={(e) =>
                updateElement(selectedElement.id, {
                  height: Number(e.target.value),
                })
              }
              className="w-full text-sm text-gray-900 border border-gray-300 rounded p-1"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-800 mb-1">
              X Position
            </label>
            <input
              onFocus={() => takeSnapshot()}
              type="number"
              value={Math.round(selectedElement.x)}
              onChange={(e) =>
                updateElement(selectedElement.id, { x: Number(e.target.value) })
              }
              className="w-full text-sm text-gray-900 border border-gray-300 rounded p-1"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-800 mb-1">
              Y Position
            </label>
            <input
              onFocus={() => takeSnapshot()}
              type="number"
              value={Math.round(selectedElement.y)}
              onChange={(e) =>
                updateElement(selectedElement.id, { y: Number(e.target.value) })
              }
              className="w-full text-sm text-gray-900 border border-gray-300 rounded p-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
