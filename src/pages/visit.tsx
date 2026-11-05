import { Clock, Copy, MapPinned, Navigation } from "lucide-react";
import { AppIcon, APPS, type AppId } from "@/components/app-icon";
import { HoursTable } from "@/components/hours-table";
import { OpenStatus } from "@/components/open-status";
import { btnPrimary, wrap } from "@/components/styles";
import { useToast } from "@/components/toast";
import { copyText } from "@/lib/copy";
import { SITE } from "@/site";

const ROWS: AppId[] = ["phone", "instagram", "facebook", "email"];

const rowCls = "grid gap-2 py-4 sm:grid-cols-[148px_1fr] sm:gap-4";
const dtCls = "flex items-center gap-2.5 font-semibold text-leaf-text";
const tileCls = "size-9 rounded-[11px]";
const glyphCls = "size-[18px]";
const linkCls = "inline-flex min-h-10 items-center font-medium text-brand underline-offset-4 hover:underline [overflow-wrap:anywhere]";

export default function Visit() {
  const toast = useToast();

  const copyAddress = () =>
    copyText(SITE.address)
      .then(() => toast.show("คัดลอกที่อยู่แล้ว"))
      .catch(() => toast.show("คัดลอกไม่สำเร็จ ลองกดค้างที่ข้อความเพื่อคัดลอกเอง"));

  return (
    <section className="py-14 md:py-20">
      <div className={`${wrap} grid gap-10 md:grid-cols-2 md:gap-14`}>
        <div>
          <h1 className="flex items-center gap-3 text-4xl text-ink md:text-5xl">
            <MapPinned className="size-9 text-brand md:size-11" aria-hidden />
            การเดินทาง
          </h1>

          <dl className="mt-8 divide-y divide-line border-y border-line">
            <div className={rowCls}>
              <dt className={dtCls}>
                <AppIcon app="maps" className={tileCls} glyphClassName={glyphCls} />
                ที่อยู่
              </dt>
              <dd>
                <address className="not-italic">{SITE.address}</address>
                <button
                  type="button"
                  onClick={copyAddress}
                  className="mt-2 inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-brand hover:border-brand"
                >
                  <Copy className="size-4" aria-hidden />
                  คัดลอกที่อยู่
                </button>
              </dd>
            </div>
            {ROWS.map((id) => (
              <div key={id} className={rowCls}>
                <dt className={dtCls}>
                  <AppIcon app={id} className={tileCls} glyphClassName={glyphCls} />
                  {APPS[id].label}
                </dt>
                <dd>
                  <a className={linkCls} {...APPS[id].link}>
                    {APPS[id].text}
                  </a>
                </dd>
              </div>
            ))}
          </dl>

          <a className={`${btnPrimary} mt-8`} href={SITE.maps} target="_blank" rel="noopener">
            <Navigation className="size-5" aria-hidden />
            เปิดเส้นทางใน Google Maps
          </a>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="flex items-center gap-2.5 text-2xl text-ink">
                <Clock className="size-6 text-brand" aria-hidden />
                เวลาเปิด–ปิด
              </h2>
              <OpenStatus />
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white">
              <HoursTable />
            </div>
          </div>

          <div className="min-h-[320px] flex-1 overflow-hidden rounded-[28px] border border-line bg-sky">
            <iframe
              title="แผนที่ร้าน Sable Roaster"
              src="https://www.google.com/maps?q=Sable+Roaster+%E0%B8%9E%E0%B8%B8%E0%B8%97%E0%B8%98%E0%B8%9A%E0%B8%B9%E0%B8%8A%E0%B8%B2+36+%E0%B8%9A%E0%B8%B2%E0%B8%87%E0%B8%A1%E0%B8%94&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block size-full min-h-[320px] border-0"
            />
          </div>
        </div>
      </div>
      {toast.node}
    </section>
  );
}
