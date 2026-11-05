import { Share2 } from "lucide-react";
import { btnGhost } from "@/components/styles";
import { useToast } from "@/components/toast";
import { copyText } from "@/lib/copy";
import { cn } from "@/lib/utils";
import { SITE } from "@/site";

/** Opens the system share sheet where there is one; otherwise copies the link. */
export function ShareButton({ className }: { className?: string }) {
  const toast = useToast();

  const share = async () => {
    const url = window.location.href.split("#")[0];
    if (navigator.share) {
      try {
        await navigator.share({ title: SITE.name, text: "ร้านกาแฟร่มรื่นย่านบางมด", url });
        return;
      } catch (e) {
        // AbortError: the person closed the share sheet. Any other failure falls back to copying.
        if ((e as Error).name === "AbortError") return;
      }
    }
    copyText(url)
      .then(() => toast.show("คัดลอกลิงก์ร้านแล้ว ส่งให้เพื่อนได้เลย"))
      .catch(() => toast.show("คัดลอกไม่สำเร็จ ลองคัดลอกลิงก์จากแถบที่อยู่ของเบราว์เซอร์"));
  };

  return (
    <>
      <button type="button" onClick={share} className={cn(btnGhost, "cursor-pointer", className)}>
        <Share2 className="size-5" aria-hidden />
        ชวนเพื่อนมา
      </button>
      {toast.node}
    </>
  );
}
