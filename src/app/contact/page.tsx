import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/ui/primitives";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell LIPI SOFT about your project. Share what you are trying to achieve and we will reply with questions, ideas and an honest view of how we can help.",
  path: "/contact",
});

const nextSteps = [
  { title: "We read it properly", body: "Your message goes to someone who can discuss the work, not a ticket queue." },
  { title: "We reply with questions", body: "Expect a short reply asking about your process, systems and goals." },
  { title: "We suggest a first step", body: "Usually a call, followed by a written outline of how we would approach it." },
];

export default function ContactPage() {
  const { email, phone, address, hours } = site.contact;
  const hasDetails = Boolean(email || phone || address || hours);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact" }]}
        label="Contact"
        title="Tell us what you would like to *fix.*"
        lead="A few lines about the problem is enough to start. You do not need a specification, a budget or a deadline."
      />

      <section className="shell pb-20 md:pb-28" aria-label="Contact form and details">
        <div className="grid gap-x-12 gap-y-14 border-t border-line pt-10 lg:grid-cols-12 lg:pt-14">
          <div className="relative lg:col-span-7">
            <ContactForm fallbackEmail={email} />
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="rule-top pt-6 lg:sticky lg:top-28">
              <h2 className="type-h3">What happens next</h2>
              <ol className="mt-6">
                {nextSteps.map((step, i) => (
                  <li key={step.title} className="grid grid-cols-[2.25rem_1fr] border-t border-line py-5">
                    <span className="type-label pt-1 text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-sans text-base font-semibold">{step.title}</h3>
                      <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {hasDetails ? (
                <div className="mt-8 border-t-2 border-ink pt-6">
                  <h2 className="type-h3">Contact details</h2>
                  <dl className="mt-5 space-y-4 text-[0.97rem]">
                    {email ? (
                      <div>
                        <dt className="type-label text-ink-faint">Email</dt>
                        <dd className="mt-1">
                          <a href={`mailto:${email}`} className="link-inline">
                            {email}
                          </a>
                        </dd>
                      </div>
                    ) : null}
                    {phone ? (
                      <div>
                        <dt className="type-label text-ink-faint">Phone</dt>
                        <dd className="mt-1">
                          <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="link-inline">
                            {phone}
                          </a>
                        </dd>
                      </div>
                    ) : null}
                    {address ? (
                      <div>
                        <dt className="type-label text-ink-faint">Address</dt>
                        <dd className="mt-1">
                          <address className="not-italic leading-relaxed text-ink-soft">
                            {address.map((line) => (
                              <span key={line} className="block">
                                {line}
                              </span>
                            ))}
                          </address>
                        </dd>
                      </div>
                    ) : null}
                    {hours ? (
                      <div>
                        <dt className="type-label text-ink-faint">Business hours</dt>
                        <dd className="mt-1 text-ink-soft">{hours}</dd>
                      </div>
                    ) : null}
                  </dl>
                </div>
              ) : null}

              {site.social.length > 0 ? (
                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1 border-t border-line pt-5">
                  {site.social.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-inline inline-block py-1 text-[0.95rem]">
                        {s.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
