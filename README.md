# Sable Roaster

เว็บโชว์ร้านกาแฟ Sable Roaster (React + TypeScript + Tailwind + shadcn)

## เปิดดูบนเครื่อง

```bash
npm install
npm run dev
```

แล้วเปิด http://localhost:5173

## เอาขึ้นเว็บจริง

push ขึ้น branch `main` แล้ว GitHub Actions จะ test, build และอัปเดตเว็บเอง
ขั้นตอนโดเมนและการส่งมอบให้ร้านอยู่ใน [HANDOVER.md](HANDOVER.md)

หมายเหตุ: ดับเบิลคลิก `dist/index.html` ตรง ๆ จะเป็นหน้าว่าง เพราะเบราว์เซอร์ไม่รันสคริปต์จากไฟล์ในเครื่อง ต้องเปิดผ่านเซิร์ฟเวอร์

## แก้ข้อมูลร้าน

- ที่อยู่ เบอร์ อีเมล ลิงก์โซเชียล: `src/site.ts`
- เวลาเปิด–ปิด: `src/lib/hours.ts` (แก้แล้วรัน `npm test`)
- รูป: `public/img/`
- เปลี่ยนข้อความหัวเรื่องลายมือ: แก้ `TEXT` ใน `scripts/gen-handwriting.mjs` แล้วรัน `npm run gen:headline`
