'use client';

import { useEditor } from '@/context/EditorContext';
import { Download, FileJson, ArrowLeft, Undo2, Redo2 } from 'lucide-react';
import Link from 'next/link';
import { toCanvas } from 'html-to-image';
import jsPDF from 'jspdf';

export default function Topbar() {
  const { elements, pageSetup, undo, redo, canUndo, canRedo } = useEditor();

  const handleDownloadJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify({ pageSetup, elements }, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'template.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleExportPDF = async () => {
    const canvasNode = document.getElementById('template-canvas');
    if (!canvasNode) return;

    try {
      const canvas = await toCanvas(canvasNode, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        cacheBust: true,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
      });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: pageSetup.orientation,
        unit: 'px',
        format: [pageSetup.width, pageSetup.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, pageSetup.width, pageSetup.height);
      pdf.save('certificate.pdf');
    } catch (error) {
      console.error('Error exporting to PDF:', error);
    }
  };

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-900 transition flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          <span>Home</span>
        </Link>
        <div className="h-6 w-px bg-gray-300"></div>
        <h1 className="font-semibold text-lg text-gray-800">Template Editor</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 border-r border-gray-200 pr-3 mr-1">
          <button
            onClick={undo}
            disabled={!canUndo}
            className={`p-1.5 rounded transition ${
              canUndo
                ? 'hover:bg-gray-100 text-gray-700'
                : 'text-gray-300 cursor-not-allowed'
            }`}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 size={18} />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className={`p-1.5 rounded transition ${
              canRedo
                ? 'hover:bg-gray-100 text-gray-700'
                : 'text-gray-300 cursor-not-allowed'
            }`}
            title="Redo (Ctrl+Y or Ctrl+Shift+Z)"
          >
            <Redo2 size={18} />
          </button>
        </div>

        <button
          onClick={handleDownloadJSON}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition"
        >
          <FileJson size={16} /> JSON
        </button>
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          <Download size={16} /> Export PDF
        </button>
      </div>
    </div>
  );
}
