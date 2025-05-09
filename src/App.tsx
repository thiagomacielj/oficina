import React, { useState, useEffect } from 'react';
import './App.css';
import { AgendamentoCalendario } from './components/AgendamentoCalendario';
import { FormularioAgendamento, AgendamentoFormValues } from './components/FormularioAgendamento';
import { ListaAgendamentos } from './components/ListaAgendamentos';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

function App() {
  const [agendamentos, setAgendamentos] = useState<AgendamentoFormValues[]>([]);
  const [dataSelecionadaCalendario, setDataSelecionadaCalendario] = useState<Date | undefined>(new Date());

  // Carregar agendamentos do LocalStorage ao iniciar
  useEffect(() => {
    const agendamentosGuardados = localStorage.getItem('agendamentosOficina');
    if (agendamentosGuardados) {
      try {
        const parsedAgendamentos = JSON.parse(agendamentosGuardados);
        // Certificar que as datas são objetos Date
        const agendamentosComDatasCorretas = parsedAgendamentos.map((ag: any) => ({
          ...ag,
          dataAgendamento: new Date(ag.dataAgendamento),
        }));
        setAgendamentos(agendamentosComDatasCorretas);
      } catch (error) {
        console.error("Erro ao carregar agendamentos do localStorage:", error);
        setAgendamentos([]); // Reset em caso de erro de parsing
        localStorage.removeItem('agendamentosOficina'); // Limpa dados inválidos
      }
    }
  }, []);

  // Guardar agendamentos no LocalStorage sempre que a lista for alterada
  useEffect(() => {
    if (agendamentos.length > 0) {
        localStorage.setItem('agendamentosOficina', JSON.stringify(agendamentos));
    } else {
        // Se não houver agendamentos, podemos remover a chave do localStorage
        // ou manter uma lista vazia, dependendo da preferência.
        // Aqui, opto por remover para manter limpo.
        localStorage.removeItem('agendamentosOficina');
    }
  }, [agendamentos]);

  const handleNovoAgendamento = (data: AgendamentoFormValues) => {
    // Simples validação de conflito (mesma data e hora)
    const conflito = agendamentos.find(
      (ag) => 
        new Date(ag.dataAgendamento).toDateString() === new Date(data.dataAgendamento).toDateString() &&
        ag.horaAgendamento === data.horaAgendamento
    );

    if (conflito) {
      toast.error("Erro ao agendar!", { description: "Já existe um agendamento para esta data e hora." });
      return;
    }

    setAgendamentos(prevAgendamentos => [...prevAgendamentos, data].sort((a, b) => new Date(a.dataAgendamento).getTime() - new Date(b.dataAgendamento).getTime() || a.horaAgendamento.localeCompare(b.horaAgendamento)));
    toast.success("Agendamento realizado com sucesso!");
  };

  // Atualiza a data selecionada no formulário quando o calendário muda
  useEffect(() => {
    // Este useEffect já existe no FormularioAgendamento.tsx, mas podemos manter aqui
    // para garantir que o formulário é atualizado se for renderizado condicionalmente
    // ou se a prop dataSelecionada for usada de forma mais complexa no futuro.
  }, [dataSelecionadaCalendario]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">Sistema de Agendamento da Oficina</h1>
      </header>

      <main className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-1 space-y-6">
          <AgendamentoCalendario />
        </section>

        <section className="lg:col-span-2 space-y-6">
          <FormularioAgendamento onSubmit={handleNovoAgendamento} dataSelecionada={dataSelecionadaCalendario} />
          <ListaAgendamentos agendamentos={agendamentos} />
        </section>
      </main>
      <Toaster richColors />
      <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Oficina Mecânica. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;

