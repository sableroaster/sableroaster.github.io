import { test } from "node:test";
import assert from "node:assert/strict";
import { bangkokNow, fmt, getStatus } from "./hours.ts";

// UTC instants; Bangkok is UTC+7. 2026-11-02 is a Monday.
const cases: [string, string, boolean, string][] = [
  ["Mon 10:00", "2026-11-02T03:00Z", false, "ปิดอยู่ · เปิดพรุ่งนี้ 7:00 น."],
  ["Tue 06:59", "2026-11-02T23:59Z", false, "ปิดอยู่ · เปิด 7:00 น. วันนี้"],
  ["Tue 07:00", "2026-11-03T00:00Z", true, "เปิดอยู่ · ปิด 15:00 น."],
  ["Tue 15:00", "2026-11-03T08:00Z", false, "ปิดอยู่ · เปิดพรุ่งนี้ 7:00 น."],
  ["Fri 11:29", "2026-11-06T04:29Z", true, "เปิดอยู่ · ปิด 11:30 น."],
  ["Fri 11:30", "2026-11-06T04:30Z", false, "ปิดอยู่ · เปิดพรุ่งนี้ 8:00 น."],
  ["Sun 16:30", "2026-11-08T09:30Z", false, "ปิดอยู่ · เปิดวันอังคาร 7:00 น."],
  ["Tue 06:30 (still Mon in UTC)", "2026-11-02T23:30Z", false, "ปิดอยู่ · เปิด 7:00 น. วันนี้"],
];

for (const [name, iso, open, label] of cases) {
  test(name, () => assert.deepEqual(getStatus(new Date(iso)), { open, label }));
}

test("bangkokNow crosses the date line from UTC", () => {
  assert.deepEqual(bangkokNow(new Date("2026-11-02T23:30Z")), { weekday: 2, minutes: 390 });
  assert.deepEqual(bangkokNow(new Date("2026-11-02T17:00Z")), { weekday: 2, minutes: 0 });
});

test("fmt", () => {
  assert.equal(fmt(420), "7:00");
  assert.equal(fmt(690), "11:30");
  assert.equal(fmt(900), "15:00");
});
