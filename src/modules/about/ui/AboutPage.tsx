const INTERESTS = [
  { emoji: "🏋️", label: "Workouts & Health" },
  { emoji: "🌍", label: "Travel & Hiking" },
  { emoji: "🚀", label: "Space & Astronomy" },
  { emoji: "🏎️", label: "Cars" },
  { emoji: "🎬", label: "Sci-Fi Movies" },
  { emoji: "🏏", label: "Cricket" },
  { emoji: "⌚", label: "Watches" },
  { emoji: "🔌", label: "Gadgets & Electronics" },
  { emoji: "🧠", label: "Thought & Mindset" },
  { emoji: "🥗", label: "Diet & Nutrition" },
];

const BUCKET_LIST: { label: string; done: boolean }[] = [
  { label: "Skydiving", done: true },
  { label: "Bungee jumping", done: false },
  { label: "Scuba diving", done: false },
  { label: "Paragliding", done: false },
  { label: "Skiing", done: false },
  { label: "Boating", done: false },
  { label: "Buy my dream watch", done: false },
  { label: "Hike Mount Rainier", done: false },
  { label: "3-day camping trip", done: false },
  { label: "Visit Tokyo, Japan", done: false },
  { label: "Desert riding", done: false },
  { label: "Solo road trip", done: false },
  { label: "See the Northern Lights", done: true },
];

const AboutPage = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-16 max-w-2xl space-y-4">
        <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
          About
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Beyond the code
        </h1>
        <p className="text-base text-muted-foreground md:text-lg">
          I&apos;m Abdul Aziz - a software engineer based in Seattle, WA. I
          joined Agentnomics.ai in November 2025 and have been shipping
          production AI systems ever since. But there&apos;s more to the story
          than the commits.
        </p>
      </div>

      {/* How I learn */}
      <div className="mb-16 rounded-xl border border-border bg-surface p-6 md:p-8">
        <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-4">
          How I learn
        </p>
        <p className="text-base text-foreground leading-relaxed max-w-2xl">
          I don&apos;t take courses to learn a skill. I pick the skill and build
          something real with it. Every project in my portfolio started as a
          question I needed to answer - not a tutorial I followed. That&apos;s
          the only way I know how to retain anything.
        </p>
      </div>

      {/* Interests */}
      <div className="mb-16">
        <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-6">
          Outside the terminal
        </p>
        <div className="flex flex-wrap gap-3">
          {INTERESTS.map(({ emoji, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground"
            >
              <span>{emoji}</span>
              <span>{label}</span>
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground max-w-xl">
          Particularly obsessed with space - Mars colonisation, the solar system, and
          anything Elon or NASA puts up. I collect watches and gadgets the same
          way I collect side projects: always one more.
        </p>
      </div>

      {/* Bucket list */}
      <div className="mb-16">
        <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-6">
          Bucket list
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {BUCKET_LIST.map(({ label, done }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3"
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border text-xs ${
                  done
                    ? "border-green-500 bg-green-500/10 text-green-400"
                    : "border-white/20 text-transparent"
                }`}
              >
                ✓
              </span>
              <span
                className={`text-sm ${
                  done
                    ? "line-through text-muted-foreground"
                    : "text-foreground"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Always adding more. Always finding time.
        </p>
      </div>

      {/* Education + Currently looking for */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-6 space-y-4">
          <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
            Education
          </h2>
          <div>
            <p className="text-sm font-semibold text-foreground">
              MS, Information Technology Management (STEM)
            </p>
            <p className="text-sm text-muted-foreground">
              <a
                href="https://www.campbellsville.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline underline-offset-4"
              >
                Campbellsville University
              </a>
              {" "}· May 2025
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              BE, Electronics and Communication Engineering
            </p>
            <p className="text-sm text-muted-foreground">
              <a
                href="https://deccancollege.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline underline-offset-4"
              >
                Deccan College
              </a>
              {" "}· July 2022
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6 space-y-3">
          <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
            Currently looking for
          </h2>
          <p className="text-sm text-muted-foreground">
            Full-time software engineering roles at AI startups or mid-stage
            SaaS companies - backend, full-stack, or AI infrastructure focus.
            Remote or Seattle, WA.
          </p>
          <a
            href="mailto:mohdabdulaziz2023@gmail.com"
            className="inline-block text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            mohdabdulaziz2023@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
