"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function EventLandingTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-4">
          <EditableText
            id="el-title"
            as="h1"
            className="text-3xl md:text-5xl font-bold text-balance"
            editable={editable}
            {...props}
          >
            Product Summit 2025
          </EditableText>
          <EditableText id="el-sub" className="text-muted-foreground" editable={editable} {...props}>
            Join 2,000+ builders for two days of talks, workshops, and networking.
          </EditableText>
          <div className="grid gap-3 sm:grid-cols-2 max-w-md">
            <article className="rounded-lg border border-border p-4 bg-card">
              <EditableText id="el-when" className="font-medium" editable={editable} {...props}>
                June 12–13, 2025
              </EditableText>
              <EditableText id="el-where" className="text-sm text-muted-foreground" editable={editable} {...props}>
                San Francisco, CA
              </EditableText>
            </article>
            <article className="rounded-lg border border-border p-4 bg-card">
              <EditableText id="el-pass" className="font-medium" editable={editable} {...props}>
                Early bird now live
              </EditableText>
              <EditableText id="el-note" className="text-sm text-muted-foreground" editable={editable} {...props}>
                Limited seats available
              </EditableText>
            </article>
          </div>
          <div className="flex gap-3">
            <EditableButton id="el-cta-1" editable={editable} {...props}>
              Get Tickets
            </EditableButton>
            <EditableButton
              id="el-cta-2"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              editable={editable}
              {...props}
            >
              View Agenda
            </EditableButton>
          </div>
        </div>
        <EditableImage
          id="el-hero"
          src="/event-venue-or-audience.jpg"
          alt="Event venue"
          className="w-full h-auto md:justify-self-end rounded-xl"
          editable={editable}
          {...props}
        />
      </section>

      <section className="bg-card border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <EditableText
            id="el-agenda-title"
            as="h3"
            className="text-2xl font-semibold mb-6"
            editable={editable}
            {...props}
          >
            Agenda Highlights
          </EditableText>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <article key={n} className="rounded-lg border border-border p-5 bg-background">
                <EditableText
                  id={`el-agenda-${n}-title`}
                  as="h4"
                  className="font-medium"
                  editable={editable}
                  {...props}
                >
                  Keynote {n}
                </EditableText>
                <EditableText
                  id={`el-agenda-${n}-desc`}
                  className="text-sm text-muted-foreground"
                  editable={editable}
                  {...props}
                >
                  Brief description of the session, speaker, and what attendees will learn.
                </EditableText>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <EditableText
          id="el-speakers-title"
          as="h3"
          className="text-2xl font-semibold mb-6 text-center"
          editable={editable}
          {...props}
        >
          Featured Speakers
        </EditableText>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <figure key={n} className="rounded-lg border border-border p-5 bg-card">
              <EditableImage
                id={`el-speaker-${n}-avatar`}
                src={`/placeholder.svg?height=120&width=120&query=speaker%20${n}`}
                alt={`Speaker ${n}`}
                className="mx-auto h-28 w-28 rounded-full"
                editable={editable}
                {...props}
              />
              <div className="mt-4 text-center">
                <EditableText
                  id={`el-speaker-${n}-name`}
                  className="text-sm font-medium"
                  editable={editable}
                  {...props}
                >
                  Speaker Name {n}
                </EditableText>
                <EditableText
                  id={`el-speaker-${n}-role`}
                  className="text-xs text-muted-foreground"
                  editable={editable}
                  {...props}
                >
                  Title, Company
                </EditableText>
              </div>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <EditableText
            id="el-tickets-title"
            as="h3"
            className="text-2xl font-semibold mb-6 text-center"
            editable={editable}
            {...props}
          >
            Tickets
          </EditableText>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { k: "basic", badge: "Basic", price: "$99", btn: "Buy Basic" },
              { k: "pro", badge: "Pro", price: "$199", btn: "Buy Pro" },
              { k: "vip", badge: "VIP", price: "$399", btn: "Buy VIP" },
            ].map(({ k, badge, price, btn }) => (
              <article key={k} className="rounded-lg border border-border p-6 bg-background flex flex-col">
                <EditableText
                  id={`el-ticket-badge-${k}`}
                  className="text-sm text-muted-foreground"
                  editable={editable}
                  {...props}
                >
                  {badge}
                </EditableText>
                <EditableText
                  id={`el-ticket-amount-${k}`}
                  as="div"
                  className="mt-2 text-3xl font-bold"
                  editable={editable}
                  {...props}
                >
                  {price}
                </EditableText>
                <ul className="mt-4 space-y-2 text-sm">
                  {[1, 2, 3].map((n) => (
                    <li key={n}>
                      <EditableText id={`el-ticket-feat-${k}-${n}`} editable={editable} {...props}>
                        Ticket feature {n}
                      </EditableText>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <EditableButton id={`el-ticket-cta-${k}`} editable={editable} {...props}>
                    {btn}
                  </EditableButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <EditableText
          id="el-faq-title"
          as="h3"
          className="text-2xl font-semibold mb-6 text-center"
          editable={editable}
          {...props}
        >
          Frequently asked questions
        </EditableText>
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <article key={n} className="rounded-lg border border-border p-5 bg-card">
              <EditableText id={`el-faq-q-${n}`} as="h4" className="font-medium" editable={editable} {...props}>
                Question {n}: What is included with my ticket?
              </EditableText>
              <EditableText
                id={`el-faq-a-${n}`}
                className="text-sm text-muted-foreground"
                editable={editable}
                {...props}
              >
                Answer: Access to all sessions, workshops, and community events for both days.
              </EditableText>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center md:text-left">
          <EditableText id="el-footer" className="text-sm text-muted-foreground" editable={editable} {...props}>
            © 2025 Product Summit. All rights reserved.
          </EditableText>
        </div>
      </footer>
    </main>
  )
}
