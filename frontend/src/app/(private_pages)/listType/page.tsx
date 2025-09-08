"use client";

import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiToggleLeft, FiToggleRight } from "react-icons/fi";
import { api } from "@/service/api";
import { useAuth } from "@/contexts/AuthContext";
import { DeleteModal } from "@/components/deleteModal";
import { TypeUserFormModal } from "@/components/TypeUserModal"; 
import { TipoUsuario } from "@/types";

export default function TypeUsersPage() {
  const { user: loggedInUser } = useAuth();
  const isSuperAdmin = loggedInUser?.role === 'SUPERADMIN';

  const [tipos, setTipos] = useState<TipoUsuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tipoToDelete, setTipoToDelete] = useState<TipoUsuario | null>(null);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [editingTipo, setEditingTipo] = useState<TipoUsuario | null>(null);

  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/type-users');
        setTipos(response.data);
      } catch (err) {
        setError("Falha ao carregar os tipos de usuário.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  
  const handleOpenCreateModal = () => {
    setEditingTipo(null);
    setFormModalOpen(true);
  };
  const handleOpenEditModal = (tipo: TipoUsuario) => {
    setEditingTipo(tipo);
    setFormModalOpen(true);
  };
  const handleCloseFormModal = () => {
    setFormModalOpen(false);
  };
  const handleSave = (savedTipo: TipoUsuario) => {
    if (editingTipo) {
      
      setTipos(tipos.map(t => t.id === savedTipo.id ? savedTipo : t));
    } else {
      
      setTipos([...tipos, savedTipo]);
    }
  };

  
  const handleOpenDeleteModal = (tipo: TipoUsuario) => {
    setTipoToDelete(tipo);
    setDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  const handleConfirmDelete = async () => {
    if (!tipoToDelete) return;
    try {
      await api.delete(`/type-users/${tipoToDelete.id}`);
      setTipos(tipos.filter(t => t.id !== tipoToDelete.id));
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Falha ao deletar tipo:", error);
      
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-red-500">Tipos de Usuário</h1>
        {isSuperAdmin && (
          <button onClick={handleOpenCreateModal} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">
            + Novo Tipo
          </button>
        )}
      </div>

      {loading && <p className="text-center py-10">Carregando...</p>}
      {error && <p className="text-center py-10 text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-3 text-red-500 font-medium">Descrição</th>
                <th className="text-left p-3 text-red-500 font-medium">Situação</th>
                {isSuperAdmin && <th className="text-left p-3 text-red-500 font-medium">Ações</th>}
              </tr>
            </thead>
            <tbody>
              {tipos.map((tipo) => (
                <tr key={tipo.id} className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
                  <td className="p-3 text-white">{tipo.descricao}</td>
                  <td className="p-3">
                    {tipo.situacao ? 
                      <span className="flex items-center gap-2 text-green-400"><FiToggleRight size={20}/> Ativo</span> : 
                      <span className="flex items-center gap-2 text-gray-500"><FiToggleLeft size={20}/> Inativo</span>
                    }
                  </td>
                  {isSuperAdmin && (
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleOpenEditModal(tipo)} className="text-gray-400 hover:text-white hover:bg-gray-700 p-2 rounded-md transition-colors">
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleOpenDeleteModal(tipo)} className="text-gray-400 hover:text-red-400 hover:bg-gray-700 p-2 rounded-md transition-colors">
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Renderização dos Modais */}
      <TypeUserFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSave={handleSave}
        tipoToEdit={editingTipo}
      />
      
      {tipoToDelete && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          itemName={tipoToDelete.descricao}
          itemType="tipo de usuário"
        />
      )}
    </div>
  );
}