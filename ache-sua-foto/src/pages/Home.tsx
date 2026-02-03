import React, { useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../services/firebase";

export const Home = () => {
  const [day, setDay] = useState("07");
  const [searchCode, setSearchCode] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCode.length < 5) return alert("Digite o código de 5 dígitos");

    setLoading(true);
    setError("");
    setPhotoUrl("");

    try {
      const fileName = `BBD_${searchCode}.jpg`;
      const fileRef = ref(storage, `${day}/${fileName}`);
      const url = await getDownloadURL(fileRef);
      setPhotoUrl(url);
    } catch (err) {
      setError("Foto não encontrada. Verifique o código e o dia selecionado.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (url: string, code: string) => {
    setIsDownloading(true);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `foto-evento-${day}-${code}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      alert("Erro ao processar o arquivo. Tente novamente.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans text-gray-800">
      <div className="max-w-md mx-auto pt-10 text-center">
        <h1 className="text-3xl font-black text-blue-900 mb-2">
          ACHE SUA FOTO
        </h1>
        <p className="text-gray-600 mb-8">
          Digite o código de 5 dígitos do seu cartão
        </p>

        <div className="flex justify-center gap-4 mb-8">
          {["07", "08"].map((d) => (
            <button
              key={d}
              onClick={() => {
                setDay(d);
                setPhotoUrl("");
              }}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                day === d
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-400 border"
              }`}
            >
              Dia {d}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Ex: 12345"
            maxLength={5}
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value.replace(/\D/g, ""))}
            className="w-full p-4 text-center text-3xl font-bold tracking-[0.5em] rounded-2xl border-2 border-gray-200 focus:border-blue-500 outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={loading || searchCode.length < 5}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-black py-4 rounded-2xl shadow-xl transition-all active:scale-95"
          >
            {loading ? "LOCALIZANDO FOTO..." : "BUSCAR MINHA FOTO"}
          </button>
        </form>

        {error && (
          <p className="mt-6 text-red-500 font-bold bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}

        {photoUrl && (
          <div className="mt-8 animate-in fade-in zoom-in duration-300">
            <div className="bg-white p-3 rounded-3xl shadow-2xl border border-gray-100">
              <img
                src={photoUrl}
                alt="Sua foto"
                className="w-full rounded-2xl mb-4 shadow-inner"
              />
              <button
                onClick={() => handleDownload(photoUrl, searchCode)}
                disabled={isDownloading}
                className={`w-full font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all ${
                  isDownloading
                    ? "bg-gray-100 text-gray-400 cursor-wait"
                    : "bg-green-500 hover:bg-green-600 text-white shadow-lg active:scale-95"
                }`}
              >
                {isDownloading ? (
                  <>
                    <span className="animate-spin text-2xl">⏳</span>
                    PREPARANDO DOWNLOAD...
                  </>
                ) : (
                  <>
                    <span className="text-2xl">📥</span>
                    DOWNLOAD
                  </>
                )}
              </button>
              <p className="mt-3 text-xs text-gray-400 font-medium">
                * A foto será salva na sua galeria com o código {searchCode}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
