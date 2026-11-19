import Image, { getImageProps } from "next/image";

// 1x1 grey SVG, good enough as a blur placeholder for remote images
const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IGZpbGw9IiM5Y2EzYWYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48L3N2Zz4=";

const images = [
  { src: "https://picsum.photos/id/1018/800/600", alt: "Mountain landscape" },
  { src: "https://picsum.photos/id/1015/800/600", alt: "Ocean sunset" },
  { src: "https://picsum.photos/id/1043/800/600", alt: "Forest path" },
  { src: "https://picsum.photos/id/1067/800/600", alt: "City skyline" },
];

// Art direction: wide crop on desktop, tall crop on small screens. Either one
// can be the LCP element depending on the viewport, so no `preload` here -
// fetchPriority="high" is enough.
function Hero() {
  const common = {
    alt: "Lake with a rowing boat",
    sizes: "100vw",
    fetchPriority: "high" as const,
    quality: 85,
  };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    src: "https://picsum.photos/id/1011/1600/600",
    width: 1600,
    height: 600,
  });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    src: "https://picsum.photos/id/1011/750/1000",
    width: 750,
    height: 1000,
  });

  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktop} />
      <img
        {...rest}
        alt={common.alt}
        srcSet={mobile}
        className="mb-8 h-auto w-full rounded-lg"
      />
    </picture>
  );
}

export default function GalleryPage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 font-bold text-3xl">Photo Gallery</h1>

      <Hero />

      <div className="grid grid-cols-2 gap-4">
        {images.map((image) => (
          <div key={image.src} className="relative aspect-[4/3]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 50vw, 432px"
              quality={75}
              placeholder="blur"
              blurDataURL={blurDataURL}
              className="rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
