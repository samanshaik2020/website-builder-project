"use client"
import type { TemplateProps } from "../types"
import { EditableImage, EditableText } from "../shared/editable"

export function ProjectOverviewTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-5xl px-4 py-12">
        <EditableText
          id="po-title"
          as="h1"
          className="text-3xl md:text-5xl font-bold text-balance"
          editable={editable}
          {...props}
        >
          Project Phoenix
        </EditableText>
        <EditableText id="po-sub" className="text-muted-foreground mt-2" editable={editable} {...props}>
          A concise overview of goals, timeline, stakeholders, and key deliverables.
        </EditableText>
      </section>

      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-5xl px-4 py-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-lg border border-border p-6 bg-background">
            <EditableText
              id="po-problem-title"
              as="h3"
              className="text-xl font-semibold mb-2"
              editable={editable}
              {...props}
            >
              Problem
            </EditableText>
            <EditableText id="po-problem" className="text-sm text-muted-foreground" editable={editable} {...props}>
              Describe the business challenge and constraints that motivated the project.
            </EditableText>
          </article>
          <article className="rounded-lg border border-border p-6 bg-background">
            <EditableText
              id="po-solution-title"
              as="h3"
              className="text-xl font-semibold mb-2"
              editable={editable}
              {...props}
            >
              Solution
            </EditableText>
            <EditableText id="po-solution" className="text-sm text-muted-foreground" editable={editable} {...props}>
              Summarize the approach, key decisions, and how the solution addresses the problem.
            </EditableText>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 grid gap-6 md:grid-cols-3">
        {["Goals", "Timeline", "Team"].map((t, i) => (
          <article key={t} className="rounded-lg border border-border p-5 bg-card">
            <EditableText id={`po-card-${i}-title`} as="h3" className="font-semibold" editable={editable} {...props}>
              {t}
            </EditableText>
            <EditableText
              id={`po-card-${i}-desc`}
              className="text-sm text-muted-foreground"
              editable={editable}
              {...props}
            >
              Replace this with structured details about {t.toLowerCase()}.
            </EditableText>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <EditableText
          id="po-process-title"
          as="h3"
          className="text-2xl font-semibold mb-6"
          editable={editable}
          {...props}
        >
          Process
        </EditableText>
        <div className="grid gap-6 md:grid-cols-3">
          {["Research", "Design", "Implementation"].map((step, i) => (
            <article key={step} className="rounded-lg border border-border p-5 bg-card">
              <EditableText id={`po-step-${i}-title`} as="h4" className="font-medium" editable={editable} {...props}>
                {step}
              </EditableText>
              <EditableText
                id={`po-step-${i}-desc`}
                className="text-sm text-muted-foreground"
                editable={editable}
                {...props}
              >
                Outline activities, artifacts, and outcomes for this phase.
              </EditableText>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <EditableText
            id="po-metrics-title"
            as="h3"
            className="text-2xl font-semibold mb-6"
            editable={editable}
            {...props}
          >
            Results & Metrics
          </EditableText>
          <div className="grid gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="rounded-lg border border-border p-5 bg-background text-center">
                <EditableText
                  id={`po-metric-${n}-value`}
                  as="div"
                  className="text-2xl font-bold"
                  editable={editable}
                  {...props}
                >
                  +45%
                </EditableText>
                <EditableText
                  id={`po-metric-${n}-label`}
                  className="text-xs text-muted-foreground"
                  editable={editable}
                  {...props}
                >
                  Improvement metric
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-xl border border-border p-6 bg-card grid gap-6 md:grid-cols-[1.2fr_1fr] items-center">
          <div>
            <EditableText
              id="po-outcome-title"
              as="h4"
              className="text-xl font-semibold"
              editable={editable}
              {...props}
            >
              Outcomes
            </EditableText>
            <EditableText
              id="po-outcome-desc"
              className="text-sm text-muted-foreground mt-2"
              editable={editable}
              {...props}
            >
              Summarize the final impact, adoption, and learnings post-release.
            </EditableText>
          </div>
          <EditableImage
            id="po-outcome-img"
            src="/outcome-visual.jpg"
            alt="Outcome visual"
            className="w-full h-auto md:justify-self-end rounded-lg"
            editable={editable}
            {...props}
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="rounded-xl border border-border overflow-hidden">
          <EditableImage
            id="po-hero"
            src="/project-banner.png"
            alt="Project banner"
            className="w-full h-auto"
            editable={editable}
            {...props}
          />
        </div>
      </section>
    </main>
  )
}
