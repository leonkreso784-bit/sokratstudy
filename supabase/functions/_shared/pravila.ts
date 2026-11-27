// GENERIRANO — NE UREĐUJ RUČNO. Izvori: js/card-limits.js · js/utils.js (KURIRANE_BOJE) · js/fill-blanks.js (normFill).
// Regeneriraj: npm run build:pravila · brana: npm run build:pravila -- --check (preflight). Zašto: scripts/build-pravila.js.

const SOFT = 200;
const HARD = 500;

/** Mekani prag kartice: iznad njega upozorenje, ne odbijanje. */
export const KARTICA_SOFT = SOFT;
/** Tvrdi strop kartice: točno 500 prolazi, 501 ne. */
export const KARTICA_HARD = HARD;

/** Mjera jednog polja kartice (podrezana duljina), ista kao `SokratCardLimits.measure` u pregledniku. */
export const mjeriKarticu = function measure(text: unknown) {
    var len = (typeof text === 'string') ? text.trim().length : 0;
    /** @type {'ok'|'warn'|'over'} */
    var state = (len > HARD) ? 'over' : (len > SOFT ? 'warn' : 'ok');
    return { len: len, state: state, blocked: (state === 'over'), soft: SOFT, hard: HARD };
  };

/** Kurirana paleta boja (lekcije i materijali). */
export const KURIRANE_BOJE: readonly string[] = Object.freeze(['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#a855f7']);

/** Normalizacija odgovora dopune: dva odgovora su ista ako su im ovi oblici jednaki. */
export function normFill(s: unknown): string { return String(s).trim().toLowerCase().replace(/[-\s]+/g, ' ').trim(); }
