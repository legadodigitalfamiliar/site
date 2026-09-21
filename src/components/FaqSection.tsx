"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/site";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-title sm:text-4xl">Dúvidas? Temos as respostas</h2>
          <p className="mt-4 text-body">
            Não encontrou o que procurava? Fale com a gente pelo WhatsApp.
          </p>
        </div>

        <div className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.q} className={isOpen ? "bg-paper" : "bg-white"}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-title">{item.q}</span>
                  <span
                    className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-transform ${
                      isOpen ? "rotate-45 bg-primary text-white" : "bg-primary/10 text-primary"
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-body">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
