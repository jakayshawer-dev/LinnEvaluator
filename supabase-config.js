// Supabase 配置（替换 Airtable）
window.SUPABASE_URL = 'https://uyktwvnllouhvovqpnrd.supabase.co';
window.SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5a3R3dm5sbG91aHZvdnFwbnJkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMwMDA3OCwiZXhwIjoyMDkwODc2MDc4fQ.hwQjlY84DxY-uMwXPTtACnoDvKlYMBPfDY6_tJjtR68';
window.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5a3R3dm5sbG91aHZvdnFwbnJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMDAwNzgsImV4cCI6MjA5MDg3NjA3OH0.V6M9zBZekUHvJ7Xz9kge0_cqBbMbX-2MxUl1rWhxt-0';

// 获取当前使用哪个数据库
function getDbType() {
  if (localStorage.getItem('linn_use_supabase') === 'true') return 'supabase';
  if (localStorage.getItem('linn_airtable_key')) return 'airtable';
  return 'demo';
}

// 通用 Supabase Fetch
async function supabaseFetch(table, options = {}) {
  const { method = 'GET', body, filters, select = '*', order, limit } = options;
  let url = `${SUPABASE_URL}/rest/v1/${table}?select=${select}`;
  if (filters) {
    Object.entries(filters).forEach(([k, v]) => {
      url += `&${k]=${encodeURIComponent(v)}`;
    });
  }
  if (order) url += `&order(${order.field})=${order.direction || 'asc'}`;
  if (limit) url += `&limit=${limit}`;
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Prefer': method === 'POST' ? 'return=representation' : ''
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  return res.json();
}
