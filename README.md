<div align="center">
  <h1>✂ BarberShop — Sistema de Agendamento</h1>
  <p>Sistema web de agendamento de barbearia desenvolvido com HTML, CSS e JavaScript puro.<br>
  Funciona 100% no navegador, sem necessidade de servidor — publicado via GitHub Pages.</p>

  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/GitHub%20Pages-181717?style=for-the-badge&logo=github&logoColor=white"/>
</div>

---

## 🔗 Links

- **Deploy:** [https://diegozarpok.github.io/BarberShop1/](https://diegozarpok.github.io/BarberShop1/)
- **Repositório:** [https://github.com/DiegoZarpok/barbershop](https://github.com/DiegoZarpok/barbershop)

---

## 📋 Sobre o Projeto

Sistema web completo de agendamento para barbearia com:

- Autenticação de usuário (cadastro, login, recuperação de senha via código OTP)
- Painel de controle com resumo das próximas reservas
- Agendamento de horários com seleção de barbeiro, serviço e tipo de corte
- Horários disponíveis de **Segunda a Sábado, das 07h às 18h** (de hora em hora)
- Bloqueio automático de horários já agendados por barbeiro
- Gerenciamento de reservas com **edição** e **cancelamento**
- Perfil do usuário com foto e histórico de atendimentos
- Todos os dados salvos no `localStorage` do navegador

---

## 💈 Serviços e Preços

| Serviço | Tipo | Preço |
|---|---|---|
| Corte | Máquina | R$ 20,00 |
| Corte | Tesoura | R$ 35,00 |
| Corte | Tesoura + Máquina | R$ 60,00 |
| Barba | — | R$ 30,00 |
| Corte e Barba | Qualquer tipo | Soma com 10% de desconto |

---

## 🛠 Tecnologias Utilizadas

- **HTML5** — estrutura semântica das páginas
- **CSS3** — variáveis CSS, Flexbox, Grid Layout
- **JavaScript ES6+** — lógica, validações, manipulação do DOM
- **localStorage** — persistência de dados no navegador (simula API REST)
- **Google Fonts** — Playfair Display + DM Sans

---

## 🚀 Como Rodar Localmente

Não precisa instalar nada. Basta:

1. Baixar ou clonar o repositório
2. Abrir o arquivo `index.html` no navegador

**Recomendado:** usar a extensão **Live Server** no VS Code para melhor experiência.

```bash
# Clonar o repositório
git clone https://github.com/DiegoZarpok/BarberShop1.git

# Entrar na pasta
cd barbershop

# Abrir no VS Code
code .
```

Depois clique com o botão direito no `index.html` → **"Open with Live Server"**.

---

## 🔑 Credenciais para Teste

| Campo | Valor |
|---|---|
| **Email** | professorunex@gmail.com |
| **Senha** | 123456 |

> Os dados são inicializados automaticamente no primeiro acesso. Você também pode criar uma conta nova pelo cadastro.

---

## 📁 Estrutura de Arquivos

```
barbershop/
├── index.html              # Login
├── cadastro.html           # Cadastro de novo usuário
├── verificacao.html        # Recuperação de senha (OTP)
├── alterarsenha.html       # Definir nova senha
├── dashboard.html          # Painel principal
├── perfil.html             # Perfil do usuário com foto
├── agendarhorario.html     # Formulário de agendamento
├── minhasreservas.html     # Lista de reservas (editar/cancelar)
├── css/
│   ├── global.css          # Variáveis, reset, componentes base
│   ├── auth.css            # Estilos das páginas públicas
│   └── app.css             # Estilos das páginas com sidebar
└── js/
    ├── api.js              # Camada de dados (localStorage)
    ├── auth.js             # Autenticação, sessão e validações
    └── sidebar.js          # Componente de navegação lateral
```

---

## 🔌 Camada de API (localStorage)

O arquivo `js/api.js` simula uma API REST completa usando o `localStorage` do navegador. As funções mantêm a mesma interface de uma API real:

| Função | Equivalente REST | Descrição |
|---|---|---|
| `apiGet('usuarios')` | GET /usuarios | Lista registros |
| `apiGet('usuarios/1')` | GET /usuarios/1 | Busca por ID |
| `apiGet('reservas?usuario_id=1')` | GET /reservas?usuario_id=1 | Filtra por campo |
| `apiPost('reservas', dados)` | POST /reservas | Cria registro |
| `apiPatch('reservas/1', dados)` | PATCH /reservas/1 | Atualiza registro |
| `apiDelete('codigos_verificacao/1')` | DELETE /codigos_verificacao/1 | Remove registro |

---

## 👥 Integrantes do Grupo

- Diego Barbosa, Pedro Costa, Alexandre Muniz.

---

## 📄 Descrição do Projeto

Sistema web de agendamento de barbearia com autenticação completa de usuário (cadastro, login e recuperação de senha via código OTP de 6 dígitos), painel de controle com resumo das próximas reservas e total de visitas, perfil do cliente com foto e status do plano, formulário de agendamento com seleção de barbeiro, serviço, tipo de corte e horário disponível, verificação automática de conflitos de horário por barbeiro, gerenciamento de reservas com opção de edição (troca de data/horário) e cancelamento, além de feedback visual completo com estados de loading, erro e sucesso em todas as interações.

---

<div align="center">
  <p>Desenvolvido para a disciplina <strong>Projeto de Interfaces Gráficas para Web</strong></p>
</div>
