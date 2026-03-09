// ─── Panchang Calculation Engine ─────────────────────────────────────────────
// Pure TypeScript — no React. Uses simplified Jean Meeus algorithms.

// ─── Lookup Tables ────────────────────────────────────────────────────────────

export const TITHI_NAMES = [
  "Pratipada", "Dvitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dvadashi", "Trayodashi", "Chaturdashi", "Purnima",
  "Pratipada", "Dvitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dvadashi", "Trayodashi", "Chaturdashi", "Amavasya",
];

export const NAKSHATRA_NAMES = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishtha",
  "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
];

export const YOGA_NAMES = [
  "Vishkamba", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda",
  "Sukarma", "Dhriti", "Shula", "Ganda", "Vriddhi", "Dhruva",
  "Vyaghata", "Harshana", "Vajra", "Siddhi", "Vyatipata", "Variyan",
  "Parigha", "Shiva", "Siddha", "Sadhya", "Shubha", "Shukla",
  "Brahma", "Indra", "Vaidhriti",
];

export const KARANA_NAMES = [
  "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti",
  "Shakuni", "Chatushpada", "Naga", "Kimstughna",
];

export const VARA_NAMES = [
  "Ravivara", "Somavara", "Mangalavara", "Budhavara",
  "Guruvara", "Shukravara", "Shanivara",
];

export const HINDU_MONTHS = [
  "Chaitra", "Vaishakha", "Jyeshtha", "Ashadha", "Shravana", "Bhadrapada",
  "Ashwin", "Kartika", "Margashirsha", "Pausha", "Magha", "Phalguna",
];

// ─── Choghadiya Tables ────────────────────────────────────────────────────────

export type ChoghadiyaName = "Amrit" | "Shubh" | "Laabh" | "Chal" | "Udveg" | "Roga" | "Kaal";
export type ChoghadiyaType = "excellent" | "good" | "neutral" | "bad";

// Daytime Choghadiya sequence per weekday (0=Sun … 6=Sat)
export const DAY_CHOGHADIYA: ChoghadiyaName[][] = [
  ["Udveg", "Amrit", "Roga", "Laabh", "Udveg", "Shubh", "Amrit", "Chal"],   // Sun
  ["Amrit", "Kaal",  "Shubh", "Roga", "Amrit", "Chal",  "Kaal",  "Laabh"],  // Mon
  ["Roga",  "Laabh", "Chal",  "Kaal", "Roga",  "Amrit", "Laabh", "Udveg"],  // Tue
  ["Laabh", "Udveg", "Amrit", "Shubh","Laabh", "Roga",  "Udveg", "Kaal"],   // Wed
  ["Shubh", "Shubh", "Roga",  "Kaal", "Shubh", "Laabh", "Roga",  "Udveg"],  // Thu
  ["Chal",  "Roga",  "Kaal",  "Laabh","Chal",  "Udveg", "Roga",  "Shubh"],  // Fri
  ["Kaal",  "Chal",  "Laabh", "Udveg","Kaal",  "Amrit", "Chal",  "Roga"],   // Sat
];

// Nighttime Choghadiya sequence per weekday (0=Sun … 6=Sat)
export const NIGHT_CHOGHADIYA: ChoghadiyaName[][] = [
  ["Shubh", "Amrit", "Chal",  "Roga", "Kaal",  "Laabh", "Udveg", "Amrit"],  // Sun
  ["Laabh", "Shubh", "Amrit", "Chal", "Roga",  "Kaal",  "Laabh", "Udveg"],  // Mon
  ["Kaal",  "Laabh", "Shubh", "Amrit","Chal",  "Roga",  "Kaal",  "Laabh"],  // Tue
  ["Amrit", "Chal",  "Laabh", "Shubh","Amrit", "Roga",  "Chal",  "Kaal"],   // Wed
  ["Roga",  "Kaal",  "Laabh", "Amrit","Chal",  "Shubh", "Roga",  "Amrit"],  // Thu
  ["Udveg", "Roga",  "Kaal",  "Shubh","Laabh", "Amrit", "Udveg", "Chal"],   // Fri
  ["Amrit", "Udveg", "Roga",  "Laabh","Shubh", "Chal",  "Amrit", "Kaal"],   // Sat
];

export const CHOGHADIYA_TYPE: Record<ChoghadiyaName, ChoghadiyaType> = {
  Amrit:  "excellent",
  Shubh:  "good",
  Laabh:  "good",
  Chal:   "neutral",
  Udveg:  "bad",
  Roga:   "bad",
  Kaal:   "bad",
};

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface PanchangData {
  vara: string;
  tithi: string;
  tithiNumber: number;
  paksha: "Shukla" | "Krishna";
  nakshatra: string;
  yoga: string;
  karana: string;
  vikramSamvatYear: number;
  hinduMonth: string;
  sunrisePretty: string;
  sunsetPretty: string;
}

export interface ChoghadiyaEntry {
  name: ChoghadiyaName;
  type: ChoghadiyaType;
  startTime: Date;
  endTime: Date;
  isDay: boolean;
}

export interface CalendarDay {
  gregorianDate: Date;
  tithi: string;
  tithiNumber: number;
  isToday: boolean;
  festivalSlug?: string;
  festivalTitle?: string;
}

export interface FestivalRef {
  slug: string;
  title: string;
  gregorianDates: { date: string }[];
}

// ─── Julian Day ───────────────────────────────────────────────────────────────

function getJulianDay(date: Date): number {
  const Y = date.getUTCFullYear();
  const M = date.getUTCMonth() + 1;
  const D = date.getUTCDate() + date.getUTCHours() / 24;
  const A = Math.floor(Y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + D + B - 1524.5;
}

// ─── Sun Longitude (Meeus, simplified) ───────────────────────────────────────

function getSunLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const L0 = 280.46646 + 36000.76983 * T;
  const M = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) * (Math.PI / 180);
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M) +
    0.000289 * Math.sin(3 * M);
  return ((L0 + C) % 360 + 360) % 360;
}

// ─── Moon Longitude (Meeus, simplified) ──────────────────────────────────────

function getMoonLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const toRad = Math.PI / 180;
  const L1 = 218.3164477 + 481267.88123421 * T;
  const D  = (297.8501921 + 445267.1114034 * T) * toRad;
  const M  = (357.5291092 + 35999.0502909  * T) * toRad;
  const M1 = (134.9633964 + 477198.8675055 * T) * toRad;
  const F  = (93.2720950  + 483202.0175233 * T) * toRad;

  const lon =
    L1 +
    6.288774 * Math.sin(M1) +
    1.274027 * Math.sin(2 * D - M1) +
    0.658314 * Math.sin(2 * D) +
    0.213618 * Math.sin(2 * M1) -
    0.185116 * Math.sin(M) -
    0.114332 * Math.sin(2 * F) +
    0.058793 * Math.sin(2 * D - 2 * M1) +
    0.057066 * Math.sin(2 * D - M - M1) +
    0.053322 * Math.sin(2 * D + M1) +
    0.045758 * Math.sin(2 * D - M) -
    0.040923 * Math.sin(M - M1) -
    0.034720 * Math.sin(D) -
    0.030383 * Math.sin(M + M1);

  return ((lon % 360) + 360) % 360;
}

// ─── Vikram Samvat year ───────────────────────────────────────────────────────

function getVikramSamvatYear(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();
  // Hindu new year (Chaitra Shukla Pratipada) roughly April 10–15
  // Before that: VS = year + 56; after: year + 57
  if (month < 4 || (month === 4 && day < 14)) {
    return year + 56;
  }
  return year + 57;
}

// ─── Format time ─────────────────────────────────────────────────────────────

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}

// ─── Main Panchang function ───────────────────────────────────────────────────

export function getPanchangForDate(date: Date): PanchangData {
  const jd = getJulianDay(date);
  const sunLon = getSunLongitude(jd);
  const moonLon = getMoonLongitude(jd);

  // Tithi
  const elongation = ((moonLon - sunLon) + 360) % 360;
  const tithiIndex = Math.floor(elongation / 12);
  const tithi = TITHI_NAMES[tithiIndex] ?? "Pratipada";
  const tithiNumber = (tithiIndex % 15) + 1;
  const paksha: "Shukla" | "Krishna" = tithiIndex < 15 ? "Shukla" : "Krishna";

  // Nakshatra
  const nakshatraIndex = Math.floor(moonLon / (360 / 27)) % 27;
  const nakshatra = NAKSHATRA_NAMES[nakshatraIndex];

  // Yoga
  const yogaIndex = Math.floor(((sunLon + moonLon) % 360) / (360 / 27)) % 27;
  const yoga = YOGA_NAMES[yogaIndex];

  // Karana (half-tithi)
  const halfTithi = Math.floor(elongation / 6);
  const karanaIndex = halfTithi % 11;
  const karana = KARANA_NAMES[karanaIndex];

  // Vara
  const vara = VARA_NAMES[date.getDay()];

  // Hindu month from moon longitude
  const hinduMonthIndex = Math.floor(moonLon / 30) % 12;
  const hinduMonth = HINDU_MONTHS[hinduMonthIndex];

  // Vikram Samvat year
  const vikramSamvatYear = getVikramSamvatYear(date);

  // Sunrise / Sunset (fixed India average; replace with geolocation in v2)
  const today = new Date(date);
  today.setHours(6, 0, 0, 0);
  const sunset = new Date(date);
  sunset.setHours(18, 30, 0, 0);

  return {
    vara,
    tithi,
    tithiNumber,
    paksha,
    nakshatra,
    yoga,
    karana,
    vikramSamvatYear,
    hinduMonth,
    sunrisePretty: formatTime(today),
    sunsetPretty: formatTime(sunset),
  };
}

// ─── Choghadiya ───────────────────────────────────────────────────────────────

export function getChoghadiya(
  date: Date,
  sunriseHour = 6.0,
  sunsetHour = 18.5
): ChoghadiyaEntry[] {
  const dayOfWeek = date.getDay();
  const daySequence = DAY_CHOGHADIYA[dayOfWeek];
  const nightSequence = NIGHT_CHOGHADIYA[dayOfWeek];

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const sunriseMs = startOfDay.getTime() + sunriseHour * 3600000;
  const sunsetMs  = startOfDay.getTime() + sunsetHour  * 3600000;
  const nextSunriseMs = sunriseMs + 24 * 3600000;

  const dayPeriod   = (sunsetMs - sunriseMs) / 8;
  const nightPeriod = (nextSunriseMs - sunsetMs) / 8;

  const entries: ChoghadiyaEntry[] = [];

  // Daytime
  for (let i = 0; i < 8; i++) {
    const start = new Date(sunriseMs + i * dayPeriod);
    const end   = new Date(sunriseMs + (i + 1) * dayPeriod);
    const name  = daySequence[i];
    entries.push({ name, type: CHOGHADIYA_TYPE[name], startTime: start, endTime: end, isDay: true });
  }

  // Nighttime
  for (let i = 0; i < 8; i++) {
    const start = new Date(sunsetMs + i * nightPeriod);
    const end   = new Date(sunsetMs + (i + 1) * nightPeriod);
    const name  = nightSequence[i];
    entries.push({ name, type: CHOGHADIYA_TYPE[name], startTime: start, endTime: end, isDay: false });
  }

  return entries;
}

// ─── Vikram Samvat Calendar ───────────────────────────────────────────────────

export function getCurrentVSMonthYear(date: Date): { vsYear: number; vsMonthIndex: number } {
  const jd = getJulianDay(date);
  const moonLon = getMoonLongitude(jd);
  const vsMonthIndex = Math.floor(moonLon / 30) % 12;
  return { vsYear: getVikramSamvatYear(date), vsMonthIndex };
}

export function getVikramSamvatCalendar(
  vsYear: number,
  vsMonthIndex: number,
  festivals: FestivalRef[]
): CalendarDay[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Approximate Gregorian month start for this VS month
  // VS month 0 = Chaitra ≈ March–April
  // Offset: Chaitra starts ~month index 2 in Gregorian (March)
  const gregorianMonthOffset = (vsMonthIndex + 2) % 12;
  // Approximate the Gregorian year from VS year
  const gregorianYear = vsMonthIndex >= 10 ? vsYear - 57 : vsYear - 56;

  const firstDay = new Date(gregorianYear, gregorianMonthOffset, 1);
  const lastDay  = new Date(gregorianYear, gregorianMonthOffset + 1, 0);

  // Build festival date lookup
  const festivalMap = new Map<string, { slug: string; title: string }>();
  for (const f of festivals) {
    for (const gd of f.gregorianDates) {
      festivalMap.set(gd.date, { slug: f.slug, title: f.title });
    }
  }

  const days: CalendarDay[] = [];

  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    const current = new Date(d);
    const jd = getJulianDay(current);
    const moonLon = getMoonLongitude(jd);
    const sunLon  = getSunLongitude(jd);
    const elongation = ((moonLon - sunLon) + 360) % 360;
    const tithiIdx = Math.floor(elongation / 12);
    const dateStr = current.toISOString().split("T")[0];
    const festival = festivalMap.get(dateStr);

    days.push({
      gregorianDate: new Date(current),
      tithi: TITHI_NAMES[tithiIdx] ?? "Pratipada",
      tithiNumber: (tithiIdx % 15) + 1,
      isToday: current.getTime() === today.getTime(),
      festivalSlug: festival?.slug,
      festivalTitle: festival?.title,
    });
  }

  return days;
}
