"use client";

import { useState, useEffect } from "react";
import { api } from "@/service/api";
import { User, TipoUsuario } from "@/types";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  userToEdit: User | null;
  tiposDeUsuario: TipoUsuario[];
};

const initialState = {
  nome: "",
  email: "",
  senha: "",
  telefone: "",
  tipoDeProfissionalId: "",
  situacao: true,
};

export function UserFormModal({ isOpen, onClose, onSave, userToEdit, tiposDeUsuario }: Props) {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        nome: userToEdit.nome,
        email: userToEdit.email,
        telefone: userToEdit.telefone || "",
        tipoDeProfissionalId: userToEdit.tipoDeProfissional.id,
        situacao: userToEdit.situacao,
        senha: "",
      });
    } else {
      setFormData(initialState);
    }
  }, [userToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.email.trim() || !formData.tipoDeProfissionalId) {
        toast.error("Nome, email e tipo de profissional são obrigatórios.");
        return;
    }
    setLoading(true);
    setError(null);

    const dataToSend: any = { ...formData };
    if (!dataToSend.senha) {
      delete dataToSend.senha;
    }

    try {
      let response;
      const successMessage = userToEdit ? "Usuário atualizado com sucesso!" : "Usuário criado com sucesso!";
      if (userToEdit) {
        response = await api.patch(`/users/${userToEdit.id}`, dataToSend);
      } else {
        response = await api.post('/users', dataToSend);
      }
      toast.success(successMessage);
      onSave(response.data);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Ocorreu um erro ao salvar o usuário.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative bg-gray-900 w-full max-w-lg rounded-2xl p-6 shadow-lg border border-gray-700">
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-400 hover:text-white text-3xl transition-colors">&times;</button>
        <h2 className="text-2xl font-semibold mb-6 text-white">
          {userToEdit ? "Editar Usuário" : "Criar Novo Usuário"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Nome</label>
            <input name="nome" type="text" value={formData.nome} onChange={handleChange} className="w-full input-style" required />
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full input-style" required readOnly={!!userToEdit} />
            {userToEdit && <p className="text-xs text-gray-500 mt-1">O e-mail não pode ser alterado.</p>}
          </div>
           {/* Senha */}
           <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Senha (Opcional)</label>
            <input 
              name="senha" 
              type="password" 
              value={formData.senha} 
              onChange={handleChange} 
              className="w-full input-style" 
              placeholder={userToEdit ? "Deixe em branco para não alterar" : "Para usuários que farão login"} 
              
            />
          </div>
          {/* Telefone e Tipo de Profissional */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Telefone</label>
              <input name="telefone" type="text" value={formData.telefone} onChange={handleChange} className="w-full input-style" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Tipo de Profissional</label>
              <select name="tipoDeProfissionalId" value={formData.tipoDeProfissionalId} onChange={handleChange} className="w-full input-style" required>
                <option value="" disabled>Selecione um tipo</option>
                {tiposDeUsuario.map(tipo => (
                  <option className="text-black font-bold" key={tipo.id} value={tipo.id}>{tipo.descricao}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Situação */}
          <div className="flex items-center gap-3">
            <input name="situacao" type="checkbox" checked={formData.situacao} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500" />
            <label className="text-sm text-gray-300">Usuário Ativo</label>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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