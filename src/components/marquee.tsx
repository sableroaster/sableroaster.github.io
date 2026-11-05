import { Bird, CakeSlice, Coffee, Laptop, Leaf } from "lucide-react";

const ITEMS = [
  { icon: Coffee, label: "ดื่มกาแฟ" },
  { icon: Laptop, label: "นั่งทำงาน" },
  { icon: Leaf, label: "บรรยากาศร่มรื่น" },
  { icon: CakeSlice, label: "เค้กผลไม้สด" },
  { icon: Bird, label: "นกเขาหน้าระเบียง" },
];

const groupCls =
  "flex min-w-full shrink-0 animate-marquee items-center justify-around gap-10 pr-10 group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-6 motion-reduce:gap-y-3 motion-reduce:px-4";

function Items() {
  return ITEMS.map(({ icon: Icon, label }) => (
    <li key={label} className="flex items-center gap-3 whitespace-nowrap font-head text-xl">
      <Icon className="size-6 text-sun" aria-hidden />
      {label}
    </li>
  ));
}

export function Marquee() {
  return (
    <section aria-label="จุดเด่นของร้าน" className="group flex overflow-hidden bg-brand py-5 text-white">
      <ul className={groupCls}>
        <Items />
      </ul>
      {/* Second copy makes the loop seamless; hidden from screen readers and when motion is reduced. */}
      <ul aria-hidden className={`${groupCls} motion-reduce:hidden`}>
        <Items />
      </ul>
    </section>
  );
}
