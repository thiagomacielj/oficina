import React from "react";
import { AgendamentoFormValues } from "./FormularioAgendamento"; // Assuming this type is exported
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ListaAgendamentosProps {
  agendamentos: AgendamentoFormValues[];
}

export function ListaAgendamentos({ agendamentos }: ListaAgendamentosProps) {
  if (!agendamentos || agendamentos.length === 0) {
    return (
      <div className="p-4 border rounded-md mt-6">
        <p className="text-sm text-muted-foreground">Nenhum agendamento encontrado.</p>
      </div>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Agendamentos Marcados</CardTitle>
        <CardDescription>Lista de todos os agendamentos registados no sistema.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Hora</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agendamentos.map((agendamento, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{agendamento.nomeCliente}</TableCell>
                <TableCell>{agendamento.contactoCliente}</TableCell>
                <TableCell>{agendamento.tipoServico}</TableCell>
                <TableCell>{new Date(agendamento.dataAgendamento).toLocaleDateString()}</TableCell>
                <TableCell>{agendamento.horaAgendamento}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

