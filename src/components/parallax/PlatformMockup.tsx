import Image from "next/image";

export default function PlatformMockup() {
  return (
    <div className="relative mx-auto flex max-w-2xl items-end justify-center gap-4 pt-4">
      <div className="w-[78%] rounded-t-2xl border border-border bg-title p-2 shadow-2xl">
        <div className="mb-2 flex gap-1.5 px-1">
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-primary/10">
          <Image
            src="/demo/arvore.png"
            alt="Árvore genealógica da plataforma Legado Digital"
            fill
            sizes="(min-width: 768px) 500px, 80vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      <div className="w-[24%] flex-shrink-0 rounded-[1.4rem] border-4 border-title bg-title shadow-2xl">
        <div className="relative aspect-[9/18.5] overflow-hidden rounded-[1rem] bg-primary/10">
          <Image
            src="/demo/pessoas.png"
            alt="Perfis de pessoas na plataforma Legado Digital"
            fill
            sizes="150px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
