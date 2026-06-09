function salvarSessao(usuario) {
  sessionStorage.setItem('usuario', JSON.stringify({
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    telefone: usuario.telefone,
    plano: usuario.plano
  }));
}

function obterSessao() {
  const dados = sessionStorage.getItem('usuario');
  return dados ? JSON.parse(dados) : null;
}

function protegerRota() {
  const usuario = obterSessao();
  if (!usuario) {
    window.location.href = 'index.html';
    return null;
  }
  return usuario;
}

function logout() {
  sessionStorage.clear();
  window.location.href = 'index.html';
}

function mostrarBtnLoading(btn) {
  btn.disabled = true;
  btn.dataset.textoOriginal = btn.innerHTML;
  btn.innerHTML = '<span class="loading-spinner"></span>';
}

function esconderBtnLoading(btn) {
  btn.disabled = false;
  btn.innerHTML = btn.dataset.textoOriginal;
}

function mostrarAlerta(containerId, mensagem, tipo) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const icone = tipo === 'success'
    ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 12 4 10"></polyline></svg>'
    : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
  el.innerHTML = `<div class="alert alert-${tipo === 'success' ? 'success' : 'error'}">${icone} ${mensagem}</div>`;
  el.classList.remove('hidden');
}

function limparAlerta(containerId) {
  const el = document.getElementById(containerId);
  if (el) { el.innerHTML = ''; el.classList.add('hidden'); }
}

function marcarErro(inputId, msg) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.classList.add('erro');
  const erroEl = document.getElementById(inputId + '-erro');
  if (erroEl) erroEl.textContent = msg;
}

function limparErro(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.classList.remove('erro');
  const erroEl = document.getElementById(inputId + '-erro');
  if (erroEl) erroEl.textContent = '';
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function verificarForcaSenha(senha) {
  if (senha.length < 6) return 'fraca';
  if (senha.length >= 8 && /[A-Z]/.test(senha) && /[0-9]/.test(senha)) return 'forte';
  return 'media';
}

function atualizarForcaSenha(inputId, barraId, textoId) {
  const input = document.getElementById(inputId);
  const barra = document.getElementById(barraId);
  const texto = document.getElementById(textoId);
  if (!input || !barra || !texto) return;

  input.addEventListener('input', () => {
    const forca = verificarForcaSenha(input.value);
    barra.className = 'forca-senha-fill ' + forca;
    const labels = { fraca: 'Fraca', media: 'Média', forte: 'Forte' };
    texto.textContent = input.value ? 'Força: ' + labels[forca] : '';
    texto.className = 'forca-senha-texto ' + forca;
  });
}

function toggleSenha(inputId, btnId) {
  const input = document.getElementById(inputId);
  const btn = document.getElementById(btnId);
  if (!input || !btn) return;
  const visivel = input.type === 'text';
  input.type = visivel ? 'password' : 'text';
  btn.innerHTML = visivel ? iconOlho() : iconOlhoFechado();
}

function iconOlho() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
}

function iconOlhoFechado() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
}

function aplicarMascaraTelefone(input) {
  input.addEventListener('input', () => {
    let v = input.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length >= 7) {
      v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    } else if (v.length >= 3) {
      v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    } else if (v.length >= 1) {
      v = `(${v}`;
    }
    input.value = v;
  });
}

function gerarCodigo6Digitos() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function mascararEmail(email) {
  const [user, dominio] = email.split('@');
  const mascarado = user[0] + '*'.repeat(Math.max(user.length - 1, 3)) + user.slice(-1);
  return `${mascarado}@${dominio}`;
}
