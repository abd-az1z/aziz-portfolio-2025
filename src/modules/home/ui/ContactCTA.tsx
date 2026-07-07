import { ArrowRight } from "lucide-react";
import { LuLinkedin } from "react-icons/lu";
import PebbleField from "@/modules/journey/components/PebbleField";
import { SOCIALS } from "@/components/Footer";

const ContactCTA = () => {
  return (
    <section className="relative flex min-h-[80vh] w-full flex-col justify-center py-16">
      {/* Pebble finale - full viewport width, the system comes to rest
          but still reacts to you */}
      <PebbleField />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-10 text-center font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          The next chapter
        </p>
        <div className="mx-auto max-w-2xl space-y-8 text-center">
          {/* Status */}
          <div className="inline-flex items-center gap-2 rounded-md border border-tag-initiative/30 bg-tag-initiative/10 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tag-initiative opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-tag-initiative" />
            </span>
            <span className="font-mono text-xs font-medium tracking-wide text-tag-initiative">
              [OPEN TO FULL-TIME ROLES]
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Let&apos;s build the next chapter
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              Looking for a full-time role at an AI startup or mid-stage SaaS
              company. If you&apos;re building something that ships to
              production and needs an engineer who cares about security and
              reliability - let&apos;s talk.
            </p>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:mohdabdulaziz2023@gmail.com"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90"
              >
                Send me an email
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/abdul-aziz-mohammed-87296b179"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-white/30"
              >
                <LuLinkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Finale footer - the regular footer's contents live here on the
          homepage, resting on the pebble floor */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Abdul Aziz Mohammed
          </p>
          <div className="flex gap-2">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
