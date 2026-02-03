import React, { useState, useRef } from "react";
import { usePhotoUpload } from "../hooks/usePhotoUpload";

export const Admin = () => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedDay, setSelectedDay] = useState("07");
  const [uploading, setUploading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadPhoto } = usePhotoUpload();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const code = await uploadPhoto(selectedDay, file);
      setGeneratedCode(code);
    } catch (error) {
      alert("Erro no upload. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setGeneratedCode("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-xl rounded-2xl mt-10 border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Upload do Fotógrafo
      </h1>

      <div className="flex justify-center gap-6 mb-8 p-2 bg-gray-50 rounded-lg">
        {["07", "08"].map((day) => (
          <label
            key={day}
            className="flex items-center gap-2 cursor-pointer font-semibold text-gray-700"
          >
            <input
              type="radio"
              value={day}
              checked={selectedDay === day}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-5 h-5 text-blue-600"
            />
            Dia {day}
          </label>
        ))}
      </div>

      {!generatedCode ? (
        <>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative border-4 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer
              ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}
              ${file ? "bg-green-50 border-green-300" : ""}
            `}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              accept="image/*"
            />

            <div className="space-y-2">
              <span className="text-4xl">📸</span>
              <p className="text-gray-600 font-medium">
                {file
                  ? file.name
                  : "Arraste a foto aqui ou clique para selecionar"}
              </p>
            </div>
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg
              ${!file || uploading ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}
            `}
          >
            {uploading ? "Processando..." : "ENVIAR E GERAR CÓDIGO"}
          </button>
        </>
      ) : (
        <div className="text-center py-6 animate-in fade-in zoom-in duration-300">
          <div className="bg-green-100 text-green-800 p-8 rounded-2xl mb-6">
            <p className="text-sm font-bold uppercase tracking-widest mb-2">
              Código da Foto - Dia {selectedDay}
            </p>
            <h2 className="text-6xl font-black">{generatedCode}</h2>
          </div>

          <button
            onClick={handleReset}
            className="w-full bg-gray-800 text-white py-4 rounded-xl font-bold hover:bg-black transition-all"
          >
            + ENVIAR OUTRA FOTO
          </button>
        </div>
      )}
    </div>
  );
};

export default Admin;
