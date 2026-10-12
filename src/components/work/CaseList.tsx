import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/content/work";
import { services } from "@/content/services";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Tag } from "@/components/ui/primitives";
import { ServiceGlyph } from "@/components/visuals/ServiceGlyph";

/** Case studies as wide editorial rows. Demonstration projects are always labelled. */
export function CaseList({ items, headingLevel = "h3" }: { items: CaseStudy[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Stagger as="ul" className="border-b border-line">
      {items.map((item) => {
        const service = services.find((s) => s.id === item.service);
        return (
          <StaggerItem as="li" key={item.slug} className="border-t border-line">
            <Link href={`/work/${item.slug}`} className="group grid gap-x-10 gap-y-5 py-8 md:grid-cols-12 md:py-10">
              <div className="md:col-span-2">
                <div className="w-24 border border-line bg-paper-raised p-2 transition-colors duration-500 group-hover:border-ink md:w-full md:max-w-[9rem] md:p-3">
                  <ServiceGlyph id={item.service} className="block aspect-square w-full" />
                </div>
              </div>
              <div className="md:col-span-7">
                <div className="flex flex-wrap items-center gap-2">
                  {item.kind === "demonstration" ? <Tag tone="accent">Demonstration project</Tag> : <Tag tone="pine">Client project</Tag>}
                  <Tag>{item.sector}</Tag>
                </div>
                <Heading className="type-h3 mt-4 max-w-2xl transition-colors duration-300 group-hover:text-accent-ink">{item.title}</Heading>
                <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-ink-soft">{item.summary}</p>
              </div>
              <div className="flex items-end justify-between gap-4 md:col-span-3 md:flex-col md:items-end">
                <p className="type-label text-ink-faint">{service?.shortName}</p>
                <span className="inline-flex items-center gap-2 text-[0.95rem] font-semibold">
                  <span className="link-draw">Read the approach</span>
                  <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
