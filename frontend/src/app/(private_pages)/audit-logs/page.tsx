"use client";

import { useState, useEffect } from "react";
import { api } from "@/service/api";
import { FiClock, FiUser, FiInfo } from "react-icons/fi";


interface AuditLog {
  id: string;
  acao: string;
  detalhes: {
    message: string;
  };
  timestamp: string;
  realizadoPor: {
    nome: string;
  };
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/audit-logs');
        setLogs(response.data);
      } catch (err) {
        setError("Você não tem permissão para ver os logs ou ocorreu um erro.");
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-red-500 mb-6">Logs de Auditoria</h1>

      {loading && <p className="text-center">Carregando logs...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {!loading && !error && (
        <div className="space-y-4">
          {logs.map(log => (
            <div key={log.id} className="bg-gray-900 border border-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-white">{log.acao}</p>
                  <p className="text-sm text-gray-300 mt-1">{log.detalhes.message}</p>
                </div>
                <div className="text-right text-xs text-gray-400">
                  <p className="flex items-center justify-end gap-1.5">
                    <FiUser /> {log.realizadoPor.nome}
                  </p>
                  <p className="flex items-center justify-end gap-1.5 mt-1">
                    <FiClock /> {new Date(log.timestamp).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-center py-10 border-2 border-dashed border-gray-700 rounded-lg">
                <FiInfo className="mx-auto text-4xl text-gray-500 mb-2" />
                <p className="text-gray-400">Nenhum registro de auditoria encontrado.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}