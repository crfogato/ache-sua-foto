import { useState } from "react";
import { usePhotoUpload } from "../hooks/usePhotoUpload";
import { Camera, CheckCircle2, Loader2 } from "lucide-react";

export const UploadCard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [resultCode, setResultCode] = useState<string | null>(null);
  const { uploadPhoto } = usePhotoUpload();

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      const code = await uploadPhoto("07", file);
      setResultCode(code || null);
      setFile(null);
    } catch (error) {
      alert("Erro ao subir foto!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      {!resultCode ? (
        <div className="space-y-4">
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-blue-200 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors">
            <Camera className="w-12 h-12 text-blue-400 mb-2" />
            <span className="text-sm text-gray-500">
              {file ? file.name : "Clique para selecionar a foto"}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold disabled:bg-gray-300 flex justify-center items-center gap-2"
          >
            {isUploading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Enviar Foto e Gerar Código"
            )}
          </button>
        </div>
      ) : (
        <div className="text-center space-y-4 animate-in fade-in zoom-in">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
          <p className="text-gray-600 font-medium">Foto enviada! O número é:</p>
          <div className="text-6xl font-black text-blue-700 tracking-widest bg-blue-50 py-6 rounded-2xl">
            {resultCode}
          </div>
          <button
            onClick={() => setResultCode(null)}
            className="text-blue-600 font-semibold underline"
          >
            Tirar próxima foto
          </button>
        </div>
      )}
    </div>
  );
};
