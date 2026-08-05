import { useMemo } from "react";
import { useImageTools } from "../../../hooks/useImageTools";

const members = [
  {
    name: "Yohana Corredor",
    role: "Vocal",
    image: "yohana.png",
  },
  {
    name: "Andres Tovar",
    role: "Tesorero",
    image: "andro.png",
  },
  {
    name: "Mauro Ruiz",
    role: "Presidente",
    image: "mauro.png",
  },
  {
    name: "Manuel Nova",
    role: "Secretario",
    image: "no_photo.png",
  },
  {
    name: "Santiago Avila",
    role: "Vocal",
    image: "santiago.png",
  },
];

export const Members: React.FC = () => {
  const { buildAssetUrl } = useImageTools();

  const slides = useMemo(
    () => members.map((member) => ({ ...member, src: buildAssetUrl(`images/members/${member.image}`) })),
    [],
  );

  const visibleSlides = slides.slice(0, 5);

  return (
    <div className="relative w-full">
      <div className="rounded-2xl bg-base-100/50 shadow-lg shadow-base-300/20 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {visibleSlides.map((member) => (
            <article key={member.name} className="group relative h-100 md:h-100 overflow-hidden rounded-2xl">
              <img
                src={member.src}
                alt={member.name}
                className="h-full w-full object-cover transition duration-300 group-hover:shadow-lg group-hover:shadow-black/25"
                style={{ objectPosition: "center" }}
              />
              <div className="absolute inset-x-0 bottom-0 p-3 text-center">
                <div className="rounded-xl bg-black/35 px-3 py-2 text-white backdrop-blur-sm transition duration-300 group-hover:bg-black/50 group-hover:shadow-lg group-hover:shadow-black/25">
                  <h4 className="text-sm font-semibold leading-tight">{member.name}</h4>
                  <p className="mt-1 text-xs font-medium text-white/90">{member.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
