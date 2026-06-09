function renderizarSidebar(paginaAtiva) {
  const usuario = obterSessao();
  if (!usuario) return;

  const paginas = {
    dashboard: 'dashboard.html',
    agendar: 'agendarhorario.html',
    reservas: 'minhasreservas.html',
    perfil: 'perfil.html'
  };

  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <span class="sidebar-logo-texto">✂ BarberShop</span>
    </div>
    <nav class="sidebar-nav">
      <a href="${paginas.dashboard}" class="sidebar-item ${paginaAtiva === 'dashboard' ? 'ativo' : ''}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        Dashboard
      </a>
      <a href="${paginas.agendar}" class="sidebar-item ${paginaAtiva === 'agendar' ? 'ativo' : ''}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        Agendar Horário
      </a>
      <a href="${paginas.reservas}" id="sidebar-reservas" class="sidebar-item ${paginaAtiva === 'reservas' ? 'ativo' : ''}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        Minhas Reservas
      </a>
      <a href="${paginas.perfil}" class="sidebar-item ${paginaAtiva === 'perfil' ? 'ativo' : ''}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        Perfil
      </a>
      <div class="sidebar-item-premium">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        PREMIUM
        <span class="sidebar-badge-beta">BETA</span>
      </div>
    </nav>
    <div class="sidebar-footer">
      <button class="sidebar-item" onclick="logout()" style="width:100%; background:none; border:none; cursor:pointer;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        Sair
      </button>
    </div>
  `;

  verificarReservasParaSidebar(usuario.id);
}

async function verificarReservasParaSidebar(usuarioId) {
  try {
    const reservas = await apiGet(`reservas?usuario_id=${usuarioId}`);
    const item = document.getElementById('sidebar-reservas');
    if (!item) return;
    if (reservas.length === 0) {
      item.classList.add('desabilitado');
    } else {
      item.classList.remove('desabilitado');
    }
  } catch (_) {}
}
