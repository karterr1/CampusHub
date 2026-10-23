import {demoApi,demoRestore} from './demo';
export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE !== 'false';
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';
let accessToken = null;
let refreshPromise = null;
export const setToken = token => { accessToken = token; };
export const getToken = () => accessToken;
async function refresh() {
  if (!refreshPromise) refreshPromise = fetch(`${BASE}/auth/refresh`, {method:'POST', credentials:'include'})
    .then(async r => { if (!r.ok) throw Error('Сессия истекла'); const j=await r.json(); accessToken=j.data.accessToken; return j.data; })
    .finally(()=>{refreshPromise=null;});
  return refreshPromise;
}
export async function api(path, {method='GET', body, auth=true, retry=true}={}) {
  if (DEMO_MODE) return demoApi(path,{method,body,auth,retry});
  const headers={};
  if(body !== undefined && !(body instanceof FormData)) headers['Content-Type']='application/json';
  if(auth && accessToken) headers.Authorization=`Bearer ${accessToken}`;
  let r;
  try {r=await fetch(`${BASE}${path}`,{method,headers,credentials:path.startsWith('/auth/')?'include':'same-origin',body:body===undefined?undefined:body instanceof FormData?body:JSON.stringify(body)});}catch {throw Error('Не удалось подключиться к серверу. Проверьте backend на localhost:8080.');}
  if(r.status===401 && retry && auth && !path.startsWith('/auth/')) {
    try {await refresh();return api(path,{method,body,auth,retry:false});}catch {accessToken=null;throw Error('Войдите в аккаунт повторно');}
  }
  if(r.status===204) return null;
  const j=await r.json().catch(()=>({}));
  if(!r.ok) throw Error(j.error?.message || `Ошибка HTTP ${r.status}`);
  return j;
}
export const qs = params => '?' + new URLSearchParams(Object.entries(params).filter(([,v])=>v!=='' && v!==undefined && v!==null)).toString();
export const restore = async () => {if(DEMO_MODE)return demoRestore();try{return await refresh();}catch{return null;}};
