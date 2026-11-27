// ===== SOKRAT STUDY — je li ovo token korisnikovog AI-ja? (F6 ①/2, ADR-038 ④) =====
//
// ZAŠTO POSTOJI: brava nad AI-tokenom živi u BAZI (uloga `mcp_klijent` kroz Custom Access Token
// Hook), ali Edge Functions nisu iza Postgresa. Izmjereno iz dokumentacije i potvrđeno na
// stagingu 18.09.: `verify_jwt` na gatewayu provjerava SAMO POTPIS — token s bilo kojom ulogom
// prolazi i stiže do koda. `delete-account` zatim radi `service_role`-om, dakle brava u bazi ga
// uopće ne dodiruje: s AI-tokenom je račun obrisan (HTTP 200, izmjereno).
//
// Zato dvije funkcije koje rade nešto NEPOVRATNO ili prema van (`delete-account`,
// `send-notification`) pitaju ovaj modul. Jedan modul, dva čitatelja — nikad dvije kopije pravila.
//
// ─── ZAŠTO SE POTPIS OVDJE NE PROVJERAVA ────────────────────────────────────────────────────────
// Obje funkcije imaju `verify_jwt = true`, pa je potpis provjerio gateway PRIJE nas, a identitet
// svejedno dolazi iz `auth.getUser()`. Ovdje se čita SAMO jedan biljeg iz tereta: `client_id`
// (OAuth klijent) ili uloga koja nije `authenticated`. Neispravan teret = ZABRANA (fail-closed):
// token koji se ne da pročitati nema što raditi na nepovratnom putu.

export interface TokenBiljeg {
  aiToken: boolean;
  razlog: string;
}

/** Teret JWT-a bez provjere potpisa (potpis je već provjerio gateway). */
function teret(authHeader: string): Record<string, unknown> | null {
  const token = authHeader.replace(/^[Bb]earer\s+/, '').trim();
  const dio = token.split('.')[1];
  if (!dio) return null;
  try {
    const pad = dio.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(pad + '='.repeat((4 - pad.length % 4) % 4)));
  } catch (_e) {
    return null;
  }
}

/**
 * Nosi li zahtjev token izdan AI-klijentu (OAuth 2.1), umjesto obične korisnikove sesije.
 * `client_id` je pouzdan biljeg i pri prvom izdavanju i pri obnovi tokena (GoTrue ga prosljeđuje
 * iz sesije); uloga `mcp_klijent` je ono što od njega napravi naš hook.
 */
export function biljegTokena(authHeader: string): TokenBiljeg {
  const t = teret(authHeader);
  if (!t) return { aiToken: true, razlog: 'token_unreadable' };
  if (typeof t.client_id === 'string' && t.client_id) return { aiToken: true, razlog: 'oauth_client' };
  if (t.role !== 'authenticated') return { aiToken: true, razlog: 'role_' + String(t.role ?? 'none') };
  return { aiToken: false, razlog: 'session' };
}
