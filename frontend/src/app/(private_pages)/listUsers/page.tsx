"use client";

import { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { api } from "@/service/api";
import { useAuth } from "@/contexts/AuthContext";
import { DeleteModal } from "@/components/deleteModal";
import { UserFormModal } from "@/components/UserModal";
import { User, TipoUsuario } from "@/types";
import toast from "react-hot-toast";


export default function UsersPage() {
    const { user: loggedInUser } = useAuth();
    const isSuperAdmin = loggedInUser?.role === 'SUPERADMIN';

    
    const [users, setUsers] = useState<User[]>([]);
    const [tiposDeUsuario, setTiposDeUsuario] = useState<TipoUsuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    
    const [tipoIdSelecionado, setTipoIdSelecionado] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    
    
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [isFormModalOpen, setFormModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    
   
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const tiposPromise = api.get('/type-users');
                
                const queryParams = new URLSearchParams();
                if (debouncedSearchTerm) queryParams.append('nome', debouncedSearchTerm);
                if (tipoIdSelecionado) queryParams.append('tipoId', tipoIdSelecionado);
                const usersPromise = api.get(`/users?${queryParams.toString()}`);

                const [tiposResponse, usersResponse] = await Promise.all([tiposPromise, usersPromise]);
                
                setTiposDeUsuario(tiposResponse.data);
                setUsers(usersResponse.data);
            } catch (err) {
                console.error("Falha ao carregar dados:", err);
                setError("Falha ao carregar os dados. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [debouncedSearchTerm, tipoIdSelecionado]);

  
    const handleOpenCreateModal = () => {
        setEditingUser(null);
        setFormModalOpen(true);
    };
    const handleOpenEditModal = (user: User) => {
        setEditingUser(user);
        setFormModalOpen(true);
    };
    const handleCloseFormModal = () => {
        setFormModalOpen(false);
    };
    const handleSaveUser = (savedUser: User) => {
        if (editingUser) {
            setUsers(users.map(u => u.id === savedUser.id ? savedUser : u));
        } else {
            setUsers([...users, savedUser]);
        }
    };


    const handleOpenDeleteModal = (user: User) => {
        setUserToDelete(user);
        setDeleteModalOpen(true);
    };
    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    };
    const handleConfirmDelete = async () => {
  if (!userToDelete) return;
  try {
    await api.delete(`/users/${userToDelete.id}`);
    setUsers(currentUsers => currentUsers.filter(u => u.id !== userToDelete.id));
    handleCloseDeleteModal();
    toast.success('Usuário excluído com sucesso!'); 
  } catch (error) {
    console.error("Falha ao deletar usuário:", error);
    toast.error('Falha ao excluir o usuário.'); 
  }
};

    // Formata os tipos para o componente SearchFilter
    const filterOptions = tiposDeUsuario.map(tipo => ({
        value: tipo.id,
        label: tipo.descricao,
    }));

    return (
        <div className="min-h-screen bg-black text-white p-6">
            {/* Cabeçalho com título e botões de ação */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <h1 className="text-2xl font-bold text-red-500">Usuários</h1>
                <div className="flex gap-3 w-full sm:w-auto">
                    {isSuperAdmin && (
                        <button className="flex-1 sm:flex-none border border-gray-600 text-white hover:bg-gray-800 bg-transparent font-semibold py-2 px-4 rounded-md transition-colors">
                            + Novo Tipo
                        </button>
                    )}
                    <button onClick={handleOpenCreateModal} className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                        + Novo Usuário
                    </button>
                </div>
            </div>

            {/* Feedback de Carregamento e Erro */}
            {loading && <p className="text-center py-10">Carregando usuários...</p>}
            {error && <p className="text-center py-10 text-red-500">{error}</p>}

            {/* Tabela de Usuários */}
            {!loading && !error && (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="text-left p-3 text-red-500 font-medium">Nome</th>
                                <th className="text-left p-3 text-red-500 font-medium">Tipo</th>
                                <th className="text-left p-3 text-red-500 font-medium">Email</th>
                                <th className="text-left p-3 text-red-500 font-medium">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
                                    <td className="p-3 text-white">{user.nome}</td>
                                    <td className="p-3 text-white">{user.tipoDeProfissional.descricao}</td>
                                    <td className="p-3 text-white">{user.email}</td>
                                    <td className="p-3">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleOpenEditModal(user)} className="text-gray-400 hover:text-white hover:bg-gray-700 p-2 rounded-md transition-colors">
                                                <FiEdit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleOpenDeleteModal(user)} className="text-gray-400 hover:text-red-400 hover:bg-gray-700 p-2 rounded-md transition-colors">
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Renderização dos Modais */}
            <UserFormModal
                isOpen={isFormModalOpen}
                onClose={handleCloseFormModal}
                onSave={handleSaveUser}
                userToEdit={editingUser}
                tiposDeUsuario={tiposDeUsuario}
            />
            
            {userToDelete && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={handleCloseDeleteModal}
                    onConfirm={handleConfirmDelete}
                    itemName={userToDelete.nome}
                    itemType="usuário"
                />
            )}
        </div>
    );
}