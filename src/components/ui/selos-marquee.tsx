import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

const SELOS = [
  { src: "/imgs/selos/CAMARA_COMERCIO_ARABE_BR.webp", alt: "Câmara de Comércio Árabe-Brasileira" },
  { src: "/imgs/selos/CIC.webp", alt: "CIC" },
  { src: "/imgs/selos/FDA.webp", alt: "FDA" },
  { src: "/imgs/selos/HALAL.webp", alt: "Halal" },
  { src: "/imgs/selos/KOSHER.webp", alt: "Kosher" },
];

export function SelosMarquee({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden py-12 [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]",
        className
      )}
    >
      <InfiniteSlider gap={64} speed={40} speedOnHover={15}>
        {SELOS.map((selo) => (
          <div key={selo.alt} className="flex flex-col items-center justify-center group">
            <img
              alt={selo.alt}
              className="pointer-events-none h-16 md:h-20 lg:h-24 select-none w-auto opacity-60 group-hover:opacity-100 transition-all duration-500 object-contain grayscale hover:grayscale-0 filter"
              loading="lazy"
              src={selo.src}
            />
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}
