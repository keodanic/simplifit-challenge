"use client";

import { useState, useEffect } from "react";
import { api } from "@/service/api";
import { TipoUsuario } from "@/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tipo: TipoUsuario) => void; 
  tipoToEdit: TipoUsuario | null;
};

export function TypeUserFormModal({ isOpen, onClose, onSave, tipoToEdit }: Props) {
  const [descricao, setDescricao] = useState("");
  const [situacao, setSituacao] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (tipoToEdit) {
      setDescricao(tipoToEdit.descricao);
      setSituacao(tipoToEdit.situacao);
    } else {
     
      setDescricao("");
      setSituacao(true);
    }
  }, [tipoToEdit, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = { descricao, situacao };

    try {
      let response;
      if (tipoToEdit) {
       
        response = await api.patch(`/type-users/${tipoToEdit.id}`, data);
      } else {
        
        response = await api.post('/type-users', data);
      }
      onSave(response.data);
      onClose(); 
    } catch (err: any) {
      setError(err.response?.data?.message || "Ocorreu um erro.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative bg-gray-900 w-full max-w-md rounded-2xl p-6 shadow-lg border border-gray-700">
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-400 hover:text-white text-3xl transition-colors">&times;</button>
        <h2 className="text-2xl font-semibold mb-6 text-white">
          {tipoToEdit ? "Editar Tipo de Usuário" : "Criar Novo Tipo de Usuário"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-300 mb-1">Descrição</label>
            <input
              id="descricao"
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              id="situacao"
              type="checkbox"
              checked={situacao}
              onChange={(e) => setSituacao(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <label htmlFor="situacao" className="text-sm text-gray-300">Ativo</label>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="border border-gray-600 text-white hover:bg-gray-800 bg-transparent font-semibold py-2 px-4 rounded-md transition-colors">Cancelar</button>
            <button type="submit" disabled={loading} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:bg-red-800">
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}