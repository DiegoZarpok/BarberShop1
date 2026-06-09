const DB_SEED = {
  usuarios: [
    {
      id: 1,
      nome: "Professor Unex",
      email: "professorunex@gmail.com",
      senha: "123456",
      telefone: "(73)99818-9060",
      plano: "gratis",
      membroDesde: "2026",
      cortesRealizados: 2,
      barbasFeitas: 1,
      foto: null
    }
  ],
  barbeiros: [
    { id: 1, nome: "João",  disponivel: true, foto: null },
    { id: 2, nome: "Luan",  disponivel: true, foto: null },
    { id: 3, nome: "Pedro", disponivel: true, foto: null }
  ],
  horarios: [],
  reservas: [],
  codigos_verificacao: []
};

function dbInit() {
  if (!localStorage.getItem('bs_initialized')) {
    Object.keys(DB_SEED).forEach(function(col) {
      localStorage.setItem('bs_' + col, JSON.stringify(DB_SEED[col]));
    });
    localStorage.setItem('bs_initialized', '1');
  }
}

function dbRead(col) {
  const raw = localStorage.getItem('bs_' + col);
  return raw ? JSON.parse(raw) : [];
}

function dbWrite(col, data) {
  localStorage.setItem('bs_' + col, JSON.stringify(data));
}

function nextId(col) {
  const rows = dbRead(col);
  return rows.length === 0 ? 1 : Math.max.apply(null, rows.map(function(r){ return r.id || 0; })) + 1;
}

function parseQuery(qs) {
  const params = {};
  if (!qs) return params;
  qs.split('&').forEach(function(pair) {
    const parts = pair.split('=');
    if (parts.length === 2) {
      params[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    }
  });
  return params;
}

function delay(ms) {
  return new Promise(function(resolve){ setTimeout(resolve, ms || 120); });
}

async function apiGet(endpoint) {
  dbInit();
  await delay();

  const [pathPart, qsPart] = endpoint.split('?');
  const segments = pathPart.split('/');
  const col = segments[0];
  const id = segments[1] ? parseInt(segments[1]) : null;

  const rows = dbRead(col);

  if (id !== null && !isNaN(id)) {
    const item = rows.find(function(r){ return r.id === id; });
    if (!item) throw new Error('404');
    return JSON.parse(JSON.stringify(item));
  }

  let result = rows;

  if (qsPart) {
    const params = parseQuery(qsPart);
    Object.keys(params).forEach(function(key) {
      const val = params[key];
      result = result.filter(function(r) {
        return String(r[key]) === String(val);
      });
    });
  }

  return JSON.parse(JSON.stringify(result));
}

async function apiPost(endpoint, dados) {
  dbInit();
  await delay();

  const col = endpoint.split('?')[0].split('/')[0];
  const rows = dbRead(col);
  const novo = Object.assign({}, dados, { id: nextId(col) });
  rows.push(novo);
  dbWrite(col, rows);
  return JSON.parse(JSON.stringify(novo));
}

async function apiPatch(endpoint, dados) {
  dbInit();
  await delay();

  const segments = endpoint.split('?')[0].split('/');
  const col = segments[0];
  const id = parseInt(segments[1]);

  const rows = dbRead(col);
  const idx = rows.findIndex(function(r){ return r.id === id; });
  if (idx === -1) throw new Error('404');

  rows[idx] = Object.assign({}, rows[idx], dados);
  dbWrite(col, rows);
  return JSON.parse(JSON.stringify(rows[idx]));
}

async function apiDelete(endpoint) {
  dbInit();
  await delay();

  const segments = endpoint.split('?')[0].split('/');
  const col = segments[0];
  const id = parseInt(segments[1]);

  const rows = dbRead(col);
  const novo = rows.filter(function(r){ return r.id !== id; });
  dbWrite(col, novo);
  return true;
}
