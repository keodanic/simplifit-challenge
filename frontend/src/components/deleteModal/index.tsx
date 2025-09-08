"use client";

import { useState, useEffect } from "react";


type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;  
  itemType: string;  
};

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType
}: DeleteModalProps) {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "auto";
      setInputText(""); 
      setError(null);   
      return;
    }
    
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleDelete = () => {
    if (inputText === "EXCLUIR") {
      onConfirm(); 
    } else {
      setError("Texto incorreto. Digite EXCLUIR para confirmar.");
    }
  };

  if (!isOpen) return null;

  return (
    
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 backdrop-blur-sm p-4">
      {/* Card do Modal com tema escuro */}
      <div className="relative bg-gray-900 w-full max-w-md rounded-2xl p-6 text-center shadow-lg border border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-3xl transition-colors"
        >
          &times;
        </button>

        {/* Textos dinâmicos baseados nas props */}
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Deseja mesmo excluir?
        </h2>
        <p className="text-gray-300 mb-6">
          Você está prestes a excluir o {itemType} <br/>
          <strong className="font-bold text-red-500">{itemName}</strong>.
          <br />
          Esta ação não pode ser desfeita.
        </p>

        <label className="block font-semibold text-gray-200 mb-2">
          Digite <span className="text-white font-bold">EXCLUIR</span> para confirmar:
        </label>
        <input
          type="text"
          placeholder="Digite aqui..."
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            if (error) setError(null);
          }}
          className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500 mb-2"
        />
        
        {/* Mensagem de erro inline */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleDelete}
          className="w-full bg-red-600 text-white font-medium py-3 rounded-xl hover:bg-red-700 transition-transform active:scale-[0.98]"
        >
          Excluir Permanentemente
        </button>
      </div>
    </div>
  );
}