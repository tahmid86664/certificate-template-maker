"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEditor, PageSetup } from "@/context/EditorContext";

type Format = "A4" | "Letter" | "Custom";
type Orientation = "landscape" | "portrait";

export default function Home() {
  const router = useRouter();
  const { setPageSetup } = useEditor();
  const [showModal, setShowModal] = useState(false);

  const [setup, setSetup] = useState<PageSetup>({
    format: "A4",
    orientation: "landscape",
    width: 1123,
    height: 794,
    backgroundUrl: null,
  });

  const handleFormatChange = (format: Format, orientation: Orientation) => {
    let width = 1123;
    let height = 794;
    
    if (format === "A4") {
      width = orientation === "landscape" ? 1123 : 794;
      height = orientation === "landscape" ? 794 : 1123;
    } else if (format === "Letter") {
      width = orientation === "landscape" ? 1056 : 816;
      height = orientation === "landscape" ? 816 : 1056;
    }

    setSetup({ ...setup, format, orientation, width, height });
  };

  const handleStart = () => {
    setPageSetup(setup);
    router.push("/editor");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50 text-gray-900">
      <h1 className="text-4xl font-bold mb-4">Certificate & Card Maker</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl text-center">
        Create beautiful certificates, ID cards, office cards, and more with our perfect template making editor. Drag, drop, and export your designs easily.
      </p>
      
      <button
        onClick={() => setShowModal(true)}
        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition"
      >
        Start Creating
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Page Setup</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                <select
                  value={setup.format}
                  onChange={(e) => handleFormatChange(e.target.value as Format, setup.orientation)}
                  className="w-full border border-gray-300 rounded p-2"
                >
                  <option value="A4">A4</option>
                  <option value="Letter">Letter</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Orientation</label>
                <select
                  value={setup.orientation}
                  onChange={(e) => handleFormatChange(setup.format, e.target.value as Orientation)}
                  className="w-full border border-gray-300 rounded p-2"
                >
                  <option value="landscape">Landscape</option>
                  <option value="portrait">Portrait</option>
                </select>
              </div>

              {setup.format === "Custom" && (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Width (px)</label>
                    <input
                      type="number"
                      value={setup.width}
                      onChange={(e) => setSetup({ ...setup, width: Number(e.target.value) })}
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height (px)</label>
                    <input
                      type="number"
                      value={setup.height}
                      onChange={(e) => setSetup({ ...setup, height: Number(e.target.value) })}
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleStart}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Continue to Editor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
