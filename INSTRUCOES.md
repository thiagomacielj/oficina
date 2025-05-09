# Sistema de Agendamento para Oficina Mecânica - Instruções

## 1. Visão Geral

Este documento fornece as instruções necessárias para instalar, executar e utilizar o Sistema de Agendamento para Oficina Mecânica. A aplicação foi desenvolvida em React e permite aos utilizadores visualizar um calendário, agendar serviços, e ver a lista de agendamentos existentes. Os dados são armazenados localmente no navegador do utilizador (LocalStorage).

## 2. Tecnologias Utilizadas

- **React:** Biblioteca JavaScript para construção de interfaces de utilizador.
- **Vite:** Ferramenta de build e servidor de desenvolvimento rápido para projetos web modernos.
- **TypeScript:** Superset de JavaScript que adiciona tipagem estática.
- **Tailwind CSS:** Framework CSS utility-first para estilização rápida e moderna.
- **shadcn/ui:** Coleção de componentes de UI reutilizáveis construídos com Radix UI e Tailwind CSS.
- **Lucide React:** Biblioteca de ícones SVG.
- **React Hook Form & Zod:** Para gestão e validação de formulários.
- **date-fns:** Para manipulação de datas.
- **LocalStorage:** Para persistência de dados no navegador.

## 3. Pré-requisitos

Antes de começar, certifique-se de que tem o seguinte software instalado no seu sistema:

- **Node.js:** Versão 18.x ou superior (inclui npm). Pode ser descarregado de [https://nodejs.org/](https://nodejs.org/)
- **pnpm:** Gestor de pacotes rápido e eficiente em disco. Após instalar o Node.js, pode instalar o pnpm globalmente com o comando:
  ```bash
  npm install -g pnpm
  ```

## 4. Instruções de Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto localmente:

1.  **Obter os Ficheiros do Projeto:**
    Descarregue e extraia o arquivo ZIP do projeto para um diretório à sua escolha no seu computador.

2.  **Navegar para o Diretório do Projeto:**
    Abra o seu terminal ou linha de comandos e navegue para o diretório raiz do projeto (onde se encontra o ficheiro `package.json`).
    ```bash
    cd caminho/para/oficina-agendamento
    ```

3.  **Instalar Dependências:**
    Execute o seguinte comando para instalar todas as dependências do projeto utilizando o pnpm:
    ```bash
    pnpm install
    ```
    Este comando irá ler o ficheiro `pnpm-lock.yaml` e instalar as versões exatas das dependências necessárias.

4.  **Iniciar o Servidor de Desenvolvimento:**
    Após a instalação bem-sucedida das dependências, inicie o servidor de desenvolvimento com o comando:
    ```bash
    pnpm run dev
    ```
    Este comando iniciará a aplicação em modo de desenvolvimento. O terminal indicará o URL local onde a aplicação está a ser executada (geralmente `http://localhost:5173/`). Abra este URL no seu navegador web.

## 5. Funcionalidades do Sistema

O sistema de agendamento oferece as seguintes funcionalidades principais:

-   **Visualização de Calendário:**
    -   Um calendário interativo é exibido, permitindo ao utilizador ver os dias do mês.
    -   Ao clicar num dia no calendário, essa data é selecionada e refletida no formulário de agendamento.

-   **Criar Novo Agendamento:**
    -   Um formulário permite inserir os detalhes para um novo agendamento:
        -   **Nome do Cliente:** Nome completo do cliente.
        -   **Contacto (Telefone/Email):** Informação de contacto do cliente.
        -   **Tipo de Serviço:** Descrição do serviço a ser realizado (ex: Mudança de óleo, Revisão completa).
        -   **Data do Agendamento:** Selecionada através de um seletor de datas (pop-up de calendário), pré-preenchida com a data selecionada no calendário principal ou o dia atual.
        -   **Hora do Agendamento:** Campo para inserir a hora no formato HH:MM (ex: 09:30, 14:00).
    -   O formulário possui validações para garantir que os dados inseridos são válidos (ex: nome com pelo menos 2 caracteres, formato de hora correto).
    -   Ao submeter o formulário, o sistema verifica se já existe um agendamento para a mesma data e hora. Se houver conflito, uma mensagem de erro é exibida. Caso contrário, o agendamento é adicionado.

-   **Visualizar Lista de Agendamentos:**
    -   Abaixo do formulário, uma tabela exibe todos os agendamentos marcados.
    -   A lista inclui o nome do cliente, contacto, tipo de serviço, data e hora do agendamento.
    -   Os agendamentos são ordenados cronologicamente por data e, em seguida, por hora.
    -   Se não houver agendamentos, uma mensagem indicando isso é exibida.

-   **Persistência de Dados (LocalStorage):**
    -   Todos os agendamentos criados são guardados no LocalStorage do navegador.
    -   Isto significa que, se fechar o navegador ou atualizar a página, os agendamentos permanecerão listados.
    -   **Nota Importante:** O LocalStorage é específico do navegador e do computador onde a aplicação está a ser acedida. Os dados não são partilhados entre diferentes navegadores ou utilizadores.

-   **Notificações:**
    -   O sistema utiliza notificações (toasts) para informar o utilizador sobre o sucesso ou falha das operações (ex: agendamento bem-sucedido, erro de conflito).

## 6. Estrutura do Projeto (Principais Diretórios)

-   `public/`: Contém ficheiros estáticos públicos.
-   `src/`: Contém o código fonte da aplicação.
    -   `src/assets/`: Imagens e outros recursos estáticos.
    -   `src/components/`: Componentes React reutilizáveis da aplicação.
        -   `src/components/ui/`: Componentes da biblioteca shadcn/ui.
        -   `AgendamentoCalendario.tsx`: Componente do calendário principal.
        -   `FormularioAgendamento.tsx`: Componente do formulário de novo agendamento.
        -   `ListaAgendamentos.tsx`: Componente que exibe a lista de agendamentos.
    -   `src/lib/`: Utilitários e lógica partilhada (ex: `utils.ts` do shadcn/ui).
    -   `src/App.tsx`: Componente principal da aplicação, onde o layout e a lógica de estado são geridos.
    -   `src/main.tsx`: Ponto de entrada da aplicação React.
-   `vite.config.ts`: Ficheiro de configuração do Vite.
-   `tailwind.config.js`: Ficheiro de configuração do Tailwind CSS.
-   `package.json`: Define os metadados do projeto, scripts e dependências.

## 7. Notas Adicionais

-   **Armazenamento de Dados:** Como mencionado, esta versão utiliza o LocalStorage para armazenar dados. Para um sistema multiutilizador ou com necessidade de persistência de dados mais robusta e centralizada, seria necessário implementar um backend com uma base de dados.
-   **Limpeza do LocalStorage:** Para limpar todos os agendamentos guardados, pode abrir as ferramentas de desenvolvimento do seu navegador, ir à aba "Application" (ou similar), encontrar "LocalStorage", selecionar o URL da aplicação e apagar a entrada `agendamentosOficina`.

Esperamos que estas instruções sejam úteis. Se encontrar algum problema ou tiver sugestões, por favor, entre em contacto.

