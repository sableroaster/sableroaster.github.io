import { useEffect, useState } from "react";
import { bangkokNow, fmt, HOURS } from "@/lib/hours";

const ORDER = [1, 2, 3, 4, 5, 6, 0]; // Monday first

export function HoursTable() {
  const [today, setToday] = useState(() => bangkokNow(new Date()).weekday);

  // Same 60 s tick as OpenStatus, so the highlighted row moves at midnight too.
  useEffect(() => {
    const id = setInterval(() => setToday(bangkokNow(new Date()).weekday), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <table className="w-full text-left">
      <caption className="sr-only">เวลาเปิด–ปิด</caption>
      <tbody className="divide-y divide-line">
        {ORDER.map((i) => {
          const { day, open, close } = HOURS[i];
          const isToday = i === today;
          return (
            <tr key={i} className={isToday ? "bg-sky font-semibold" : undefined} aria-current={isToday ? "date" : undefined}>
              <th scope="row" className="px-3 py-2.5 [font-weight:inherit]">{day}</th>
              <td className={`px-3 py-2.5 ${open === undefined ? "text-ink-soft" : ""}`}>
                {open === undefined || close === undefined ? "ปิด" : `${fmt(open)}–${fmt(close)} น.`}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
