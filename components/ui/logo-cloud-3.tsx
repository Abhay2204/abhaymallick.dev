import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-8 w-full",
        className
      )}
    >
      <InfiniteSlider gap={60} reverse duration={12} durationOnHover={40}>
        {logos.map((logo) => (
          <img
            alt={logo.alt}
            className="pointer-events-none h-16 md:h-24 select-none opacity-60 hover:opacity-100 transition-opacity duration-300"
            height={logo.height || "auto"}
            key={`logo-${logo.alt}`}
            loading="eager"
            src={logo.src}
            width={logo.width || "auto"}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}
