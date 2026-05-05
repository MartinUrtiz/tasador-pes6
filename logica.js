const STATS = [
  { key: 'ataque', label: 'Ataque' },
  { key: 'defensa', label: 'Defensa' },
  { key: 'estabilidad', label: 'Estabilidad' },
  { key: 'resistencia', label: 'Resistencia' },
  { key: 'vel_maxima', label: 'Vel. máxima' },
  { key: 'aceleracion', label: 'Aceleración' },
  { key: 'respuesta', label: 'Respuesta' },
  { key: 'agilidad', label: 'Agilidad' },
  { key: 'prec_conduccion', label: 'Prec. conducción' },
  { key: 'vel_conduccion', label: 'Vel. conducción' },
  { key: 'prec_pase_corto', label: 'Prec. pase corto' },
  { key: 'vel_pase_corto', label: 'Vel. pase corto' },
  { key: 'prec_pase_largo', label: 'Prec. pase largo' },
  { key: 'vel_pase_largo', label: 'Vel. pase largo' },
  { key: 'precision_tiro', label: 'Precisión en el tiro' },
  { key: 'potencia_tiro', label: 'Potencia en el tiro' },
  { key: 'tecnica_disparo', label: 'Técnica de disparo' },
  { key: 'prec_saq_falta', label: 'Prec. saq. falta' },
  { key: 'efecto', label: 'Efecto' },
  { key: 'cabezazo', label: 'Cabezazo' },
  { key: 'salto', label: 'Salto' },
  { key: 'tecnica', label: 'Técnica' },
  { key: 'agresividad', label: 'Agresividad' },
  { key: 'mentalidad', label: 'Mentalidad' },
  { key: 'cualidades_portero', label: 'Cualidades de portero' },
  { key: 'trabajo_equipo', label: 'Trabajo en equipo' },
  { key: 'estabilidad_2', label: 'Estabilidad (2)' },
  { key: 'prec_pie_malo', label: 'Prec. pie malo' },
  { key: 'frec_pie_malo', label: 'Frec. pie malo' }
];

const POSICIONES = {
  'POR': {
    mult: 0.55,
    label: 'Portero',
    stats: {
      cualidades_portero: 3, salto: 2, respuesta: 2, agilidad: 2,
      estabilidad: 1, mentalidad: 1, resistencia: 1, defensa: 1,
      cabezazo: 1, prec_pase_largo: 1
    }
  },
  'DFC': {
    mult: 0.70,
    label: 'Defensor central',
    stats: {
      defensa: 3, cabezazo: 2, salto: 2, estabilidad: 2,
      agresividad: 2, mentalidad: 1, respuesta: 1, resistencia: 1,
      vel_maxima: 1, aceleracion: 1, prec_pase_corto: 1, trabajo_equipo: 1
    }
  },
  'LD': {
    mult: 0.70,
    label: 'Lateral',
    stats: {
      defensa: 2, vel_maxima: 2, aceleracion: 2, resistencia: 2,
      agilidad: 1, respuesta: 1, estabilidad: 1, prec_pase_corto: 1,
      prec_pase_largo: 1, prec_conduccion: 1, vel_conduccion: 1, trabajo_equipo: 1
    }
  },
  'MCD': {
    mult: 0.75,
    label: 'Medio defensivo',
    stats: {
      defensa: 2, mentalidad: 2, respuesta: 2, estabilidad: 2,
      prec_pase_corto: 2, prec_pase_largo: 2, agresividad: 1,
      resistencia: 1, trabajo_equipo: 1, cabezazo: 1, ataque: 1
    }
  },
  'MC': {
    mult: 0.90,
    label: 'Mediocampista',
    stats: {
      prec_pase_corto: 2, prec_pase_largo: 2, tecnica: 2, respuesta: 2,
      agilidad: 1, resistencia: 1, vel_pase_corto: 1, vel_pase_largo: 1,
      prec_conduccion: 1, trabajo_equipo: 1, ataque: 1, defensa: 1, mentalidad: 1
    }
  },
  'MO': {
    mult: 1.00,
    label: 'Mediapunta',
    stats: {
      ataque: 2, tecnica: 2, prec_pase_corto: 2, prec_conduccion: 2,
      agilidad: 1, respuesta: 1, vel_pase_corto: 1, prec_pase_largo: 1,
      precision_tiro: 1, efecto: 1, prec_saq_falta: 1, tecnica_disparo: 1
    }
  },
  'EXT': {
    mult: 1.00,
    label: 'Extremo',
    stats: {
      vel_maxima: 2, aceleracion: 2, agilidad: 2, prec_conduccion: 2,
      vel_conduccion: 2, tecnica: 1, ataque: 1, prec_pase_corto: 1,
      respuesta: 1, precision_tiro: 1, efecto: 1, resistencia: 1
    }
  },
  'DC': {
    mult: 1.00,
    label: 'Delantero',
    stats: {
      ataque: 3, precision_tiro: 2, potencia_tiro: 2, tecnica_disparo: 2,
      cabezazo: 2, salto: 1, respuesta: 1, agilidad: 1,
      vel_maxima: 1, aceleracion: 1, tecnica: 1, mentalidad: 1, efecto: 1
    }
  }
};

const state = {
  posicion: 'DC',
  valores: {}
};
STATS.forEach(s => state.valores[s.key] = '');

function tierFromValue(v) {
  const tiers = [
    { min: 0,  max: 60, name: 'Horrible',              cls: 'horrible',  baseMin: -400, baseMax: -300 },
    { min: 60, max: 65, name: 'Muy malo',              cls: 'muymalo',   baseMin: -300, baseMax: -150 },
    { min: 65, max: 70, name: 'Malo',                  cls: 'malo',      baseMin: -150, baseMax: -50  },
    { min: 70, max: 75, name: 'Normal',                cls: 'normal',    baseMin: -50,  baseMax: 150  },
    { min: 75, max: 80, name: 'Decente',               cls: 'decente',   baseMin: 150,  baseMax: 350  },
    { min: 80, max: 85, name: 'Bueno',                 cls: 'bueno',     baseMin: 350,  baseMax: 700  },
    { min: 85, max: 90, name: 'Muy bueno',             cls: 'muybueno',  baseMin: 700,  baseMax: 1300 },
    { min: 90, max: 95, name: 'Excelente',             cls: 'excelente', baseMin: 1300, baseMax: 3400 },
    { min: 95, max: 99, name: 'Extremadamente bueno',  cls: 'extremo',   baseMin: 3400, baseMax: 9800 },
  ];

  const tier = tiers.find(t => v < t.max) || tiers[tiers.length - 1];
  const t = (v - tier.min) / (tier.max - tier.min);  // 0.0 → 1.0 dentro del rango
  const base = Math.round(tier.baseMin + t * (tier.baseMax - tier.baseMin));

  return { name: tier.name, cls: tier.cls, base };
}

function calcular() {
  const pos = POSICIONES[state.posicion];
  const importantes = pos.stats;
  let total = 0;
  let countValid = 0;
  const desglose = {};

  Object.keys(importantes).forEach(key => {
    const peso = importantes[key];
    const v = parseInt(state.valores[key]);
    if (!isNaN(v) && v > 0) {
      const tier = tierFromValue(v);
      total += tier.base * peso;
      countValid++;
      desglose[key] = { valor: v, tier: tier.name, cls: tier.cls, peso };
    } else {
      desglose[key] = { valor: null, tier: 'Sin dato', cls: 'horrible', peso };
    }
  });

  const totalRel = Object.keys(importantes).length;
  let bonus = 1.0;
  if (countValid === totalRel && countValid > 0) bonus = 1.15;

  // total ya está en "miles" (base negativos hasta 4500), lo escalamos a unidades reales (x1000)
  // valor mínimo: 50.000 (= 0,05M) para que un jugador muy malo igual tenga un precio simbólico
  const mult = pos.mult || 1.0;
  const calculado = Math.round(total * bonus * mult * 1000);
  const valorFinal = Math.max(50000, calculado);
  return { valorFinal, desglose, importantes };
}

function tierGlobal() {
  const importantes = POSICIONES[state.posicion].stats;
  let suma = 0, peso = 0;
  Object.keys(importantes).forEach(key => {
    const v = parseInt(state.valores[key]);
    const w = importantes[key];
    if (!isNaN(v) && v > 0) { suma += v * w; peso += w; }
  });
  if (peso === 0) return null;
  return tierFromValue(suma / peso);
}

function fmt(n) {
  // Mostrar en millones: si es >= 100M sin decimales, si no con 1 o 2 decimales
  if (n === 0) return '0';
  const millones = n / 1000000;
  if (millones >= 100) return millones.toFixed(0);
  if (millones >= 10) return millones.toFixed(1);
  if (millones >= 1) return millones.toFixed(2);
  // menos de 1M: mostrar con 2-3 decimales
  if (millones >= 0.01) return millones.toFixed(3);
  return millones.toFixed(4);
}

function renderPosiciones() {
  const grid = document.getElementById('pos-grid');
  grid.innerHTML = '';
  Object.keys(POSICIONES).forEach(k => {
    const btn = document.createElement('button');
    btn.className = 'pos-btn' + (state.posicion === k ? ' active' : '');
    btn.innerHTML = k + '<small>' + POSICIONES[k].label + '</small>';
    btn.onclick = () => {
      state.posicion = k;
      renderPosiciones();
      renderStats();
      update();
    };
    grid.appendChild(btn);
  });
}

function renderStats() {
  const grid = document.getElementById('stats-grid');
  grid.innerHTML = '';
  const importantes = POSICIONES[state.posicion].stats;

  // ordenar: clave (peso 3) > importantes (peso 2,1) > resto
  const sorted = [...STATS].sort((a, b) => {
    const wa = importantes[a.key] || 0;
    const wb = importantes[b.key] || 0;
    if (wa !== wb) return wb - wa;
    return 0;
  });

  sorted.forEach(s => {
    const peso = importantes[s.key];
    const row = document.createElement('div');
    let cls = 'stat-row';
    if (peso) {
      cls += ' important';
      if (peso === 2) cls += ' weight-2';
      if (peso === 3) cls += ' weight-3';
    } else {
      cls += ' dim';
    }
    row.className = cls;

    const stars = peso ? '★'.repeat(peso) : '·';
    const weight = document.createElement('span');
    weight.className = 'stat-weight';
    weight.textContent = stars;

    const label = document.createElement('span');
    label.className = 'stat-label';
    label.textContent = s.label;
    label.title = s.label;

    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'stat-input';
    input.min = '1';
    input.max = '99';
    input.step = '1';
    input.value = state.valores[s.key];
    input.placeholder = '–';
    input.oninput = (e) => {
      let v = e.target.value;
      if (v !== '') {
        let n = parseInt(v);
        if (isNaN(n)) state.valores[s.key] = '';
        else state.valores[s.key] = String(Math.max(1, Math.min(99, n)));
      } else {
        state.valores[s.key] = '';
      }
      update();
    };

    row.appendChild(weight);
    row.appendChild(label);
    row.appendChild(input);
    grid.appendChild(row);
  });
}

function update() {
  const { valorFinal, desglose, importantes } = calcular();
  const tg = tierGlobal();

  document.getElementById('price').textContent = fmt(valorFinal);

  const tierBadge = document.getElementById('tier-badge');
  const tierText = document.getElementById('tier-text');
  if (tg) {
    tierText.textContent = tg.name;
    tierBadge.className = 'price-tier t-' + tg.cls;
  } else {
    tierText.textContent = 'Cargá las stats';
    tierBadge.className = 'price-tier t-normal';
  }

  // header meta
  document.getElementById('meta-pos').textContent =
    state.posicion + ' · ' + POSICIONES[state.posicion].label.toUpperCase();
  document.getElementById('meta-stats').textContent =
    Object.keys(importantes).length;
  document.getElementById('meta-tier').textContent =
    tg ? tg.name.toUpperCase() : '—';

  // breakdown
  const bd = document.getElementById('breakdown');
  bd.innerHTML = '';

  // ordenar el desglose por peso descendente
  const orderedKeys = Object.keys(importantes).sort((a, b) => importantes[b] - importantes[a]);

  orderedKeys.forEach(key => {
    const d = desglose[key];
    const stat = STATS.find(s => s.key === key);
    const row = document.createElement('div');
    row.className = 'bd-row';

    const name = document.createElement('div');
    name.className = 'bd-name';
    name.innerHTML = '<span class="bd-stars">' + '★'.repeat(d.peso) + '</span>' +
                     '<span style="overflow:hidden;text-overflow:ellipsis;">' + stat.label + '</span>';

    const num = document.createElement('div');
    num.className = 'bd-num';
    num.textContent = d.valor !== null ? d.valor : '–';

    const tier = document.createElement('div');
    if (d.valor !== null) {
      tier.className = 'bd-tier bg-' + d.cls;
      tier.textContent = d.tier;
    } else {
      tier.className = 'bd-empty';
      tier.textContent = 'sin dato';
    }

    row.appendChild(name);
    row.appendChild(num);
    row.appendChild(tier);
    bd.appendChild(row);
  });
}

document.getElementById('btn-reset').onclick = () => {
  STATS.forEach(s => state.valores[s.key] = '');
  renderStats();
  update();
};
document.getElementById('btn-fill').onclick = () => {
  STATS.forEach(s => state.valores[s.key] = '70');
  renderStats();
  update();
};

renderPosiciones();
renderStats();
update();