import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  nomeCliente: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  contactoCliente: z.string().min(9, { message: "O contacto deve ser válido." }),
  tipoServico: z.string().min(3, { message: "Descreva o tipo de serviço." }),
  dataAgendamento: z.date({
    required_error: "A data do agendamento é obrigatória.",
  }),
  horaAgendamento: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Formato de hora inválido (HH:MM)." }),
});

export type AgendamentoFormValues = z.infer<typeof formSchema>;

interface AgendamentoFormProps {
  onSubmit: (data: AgendamentoFormValues) => void;
  dataSelecionada?: Date;
}

export function FormularioAgendamento({ onSubmit, dataSelecionada }: AgendamentoFormProps) {
  const form = useForm<AgendamentoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeCliente: "",
      contactoCliente: "",
      tipoServico: "",
      dataAgendamento: dataSelecionada || new Date(),
      horaAgendamento: "09:00",
    },
  });

  React.useEffect(() => {
    if (dataSelecionada) {
      form.setValue("dataAgendamento", dataSelecionada);
    }
  }, [dataSelecionada, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4 border rounded-md">
        <h2 className="mb-4 text-lg font-semibold">Novo Agendamento</h2>
        <FormField
          control={form.control}
          name="nomeCliente"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Cliente</FormLabel>
              <FormControl>
                <Input placeholder="Nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactoCliente"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contacto (Telefone/Email)</FormLabel>
              <FormControl>
                <Input placeholder="Telefone ou email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tipoServico"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Serviço</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Mudança de óleo, Revisão completa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dataAgendamento"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data do Agendamento</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Escolha uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="horaAgendamento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hora do Agendamento</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormDescription>
                Formato HH:MM (ex: 14:30)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Agendar</Button>
      </form>
    </Form>
  );
}

