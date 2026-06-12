"use client";

import { useEditor } from "@/context/EditorContext";
import { Type, Image as ImageIcon, Briefcase, FileType, CheckSquare, Hash, Calendar, GraduationCap } from "lucide-react";

const componentsList = [
  { label: "Full Name", content: "{{full_name}}", icon: Type },
  { label: "Roll No.", content: "{{roll}}", icon: Hash },
  { label: "Class", content: "{{class}}", icon: GraduationCap },
  { label: "Section", content: "{{section}}", icon: Briefcase },
  { label: "ID Number", content: "{{id_number}}", icon: FileType },
  { label: "Reg. Number", content: "{{registration_number}}", icon: Hash },
  { label: "Date", content: "{{date}}", icon: Calendar },
  { label: "Custom Text", content: "Double click to edit", icon: Type },
];

export default function Sidebar() {
  const { addElement } = useEditor();

  const handleAddText = (content: string) => {
    addElement({
      type: "text",
      content,
      x: 100,
      y: 100,
      width: 200,
      height: 40,
      fontSize: 24,
      color: "#000000",
      textAlign: "left",
      fontWeight: "normal",
    });
  };

  const handleAddImage = (type: "logo" | "signature") => {
    addElement({
      type: "image",
      content: type === "logo" ? "https://placehold.co/150x150?text=Logo" : "https://placehold.co/200x80?text=Signature",
      x: 100,
      y: 100,
      width: type === "logo" ? 100 : 150,
      height: type === "logo" ? 100 : 60,
    });
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shrink-0 shadow-sm z-10 overflow-y-auto">
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Fields</h2>
        <p className="text-xs text-gray-700 mt-1">Click to add to canvas</p>
      </div>

      <div className="p-4 flex flex-col gap-2">
        {componentsList.map((comp, idx) => (
          <button
            key={idx}
            onClick={() => handleAddText(comp.content)}
            className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 hover:border-gray-300 transition text-sm text-gray-900 text-left"
          >
            <comp.icon size={16} className="text-gray-700" />
            {comp.label}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-gray-100 mt-auto">
        <h2 className="font-semibold text-gray-800 mb-3">Images</h2>
        <div className="flex gap-2">
          <button
            onClick={() => handleAddImage("logo")}
            className="flex-1 flex flex-col items-center justify-center gap-1 p-2 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 transition text-xs text-gray-900"
          >
            <ImageIcon size={18} className="text-gray-700" />
            Logo
          </button>
          <button
            onClick={() => handleAddImage("signature")}
            className="flex-1 flex flex-col items-center justify-center gap-1 p-2 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 transition text-xs text-gray-900"
          >
            <CheckSquare size={18} className="text-gray-700" />
            Signature
          </button>
        </div>
      </div>
    </div>
  );
}
