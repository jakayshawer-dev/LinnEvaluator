// Supabase 配置
window.SUPABASE_URL = 'https://xjjnzqhqgywvsmhwrfhd.supabase.co';
window.SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhqam56cWhxZ3l3dnNtaHdyZmhkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzYyMzk4OSwiZXhwIjoyMDkzMTk5OTg5fQ.6IW4XS-RmoU6BTEmHHxooiz2t8hKncinGZBT2dmYL1w';
window.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhqam56cWhxZ3l3dnNtaHdyZmhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MjM5ODksImV4cCI6MjA5MzE5OTk4OX0.H8lwPg5rtNcFm77O-pmLY-TVNeqTawopDuNdofvTRrU';

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
      url += `&${k}]=${encodeURIComponent(v)}`;
    });
  }
  if (order) url += `&order(${order.field})=${order.direction || 'asc'}`;
  if (limit) url += `&limit=${limit}`;
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
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