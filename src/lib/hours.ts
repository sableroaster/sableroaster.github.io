export type Day = { day: string; open?: number; close?: number };

const h = (hh: number, mm = 0) => hh * 60 + mm;

// Indexed like Date#getDay(): 0 = Sunday.
export const HOURS: Day[] = [
  { day: "วันอาทิตย์", open: h(8), close: h(16) },
  { day: "วันจันทร์" },
  { day: "วันอังคาร", open: h(7), close: h(15) },
  { day: "วันพุธ", open: h(7), close: h(15) },
  { day: "วันพฤหัสบดี", open: h(7), close: h(15) },
  { day: "วันศุกร์", open: h(9), close: h(11, 30) },
  { day: "วันเสาร์", open: h(8), close: h(16) },
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const bkk = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Bangkok",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function bangkokNow(date: Date) {
  const p = Object.fromEntries(bkk.formatToParts(date).map((x) => [x.type, x.value]));
  return { weekday: WEEKDAYS.indexOf(p.weekday), minutes: h(+p.hour, +p.minute) };
}

export const fmt = (m: number) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;

export function getStatus(date: Date): { open: boolean; label: string } {
  const { weekday, minutes } = bangkokNow(date);
  const today = HOURS[weekday];
  if (today.open !== undefined && today.close !== undefined) {
    if (minutes >= today.open && minutes < today.close) return { open: true, label: `เปิดอยู่ · ปิด ${fmt(today.close)} น.` };
    if (minutes < today.open) return { open: false, label: `ปิดอยู่ · เปิด ${fmt(today.open)} น. วันนี้` };
  }
  for (let i = 1; i <= 7; i++) {
    const next = HOURS[(weekday + i) % 7];
    if (next.open === undefined) continue;
    const when = i === 1 ? "พรุ่งนี้" : next.day;
    return { open: false, label: `ปิดอยู่ · เปิด${when} ${fmt(next.open)} น.` };
  }
  return { open: false, label: "ปิดอยู่" };
}
