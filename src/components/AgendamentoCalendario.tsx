import React from "react";
import { Calendar } from "@/components/ui/calendar";

export function AgendamentoCalendario() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="p-4 border rounded-md">
      <h2 className="mb-4 text-lg font-semibold">Calendário de Agendamentos</h2>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      {date && <p className="mt-4 text-sm">Data selecionada: {date.toLocaleDateString()}</p>}
    </div>
  );
}

