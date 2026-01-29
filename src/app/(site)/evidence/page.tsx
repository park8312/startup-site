export const dynamic = "force-dynamic";

function Hr() {
  return <div className="my-10 border-t border-[hsl(var(--border))]" />;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-medium text-[hsl(var(--foreground))]">{children}</span>
  );
}

function Muted({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[hsl(var(--muted-foreground))]">{children}</span>
  );
}

export default function ClinicalEvidencePage() {
  return (
    <main>
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4">
          {/* Header */}
          <div className="mb-10">
            <div className="text-xs uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
              Clinical Evidence
            </div>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Clinical Evidence <span className="text-[hsl(var(--muted-foreground))]">(게재 리뷰중)</span>
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              Manuscript under peer review.
            </p>

            <p className="mt-4 text-sm leading-relaxed">
              <span className="italic">
                Exercise Program Using a Digital Therapeutics in Infant with congenital muscular torticollis:
                Prospective, Open-label, Pilot Study
              </span>
            </p>
          </div>

          {/* At a glance */}
          <div className="space-y-2 text-sm leading-relaxed">
            <div>
              <Label>Design:</Label> Prospective, open-label, randomized pilot (single center)
            </div>
            <div>
              <Label>Population:</Label> Infants &lt; 12 months with congenital muscular torticollis
            </div>
            <div>
              <Label>Intervention:</Label> ACESO-APP + standard physical therapy
            </div>
            <div>
              <Label>Comparator:</Label> Standard education + standard physical therapy
            </div>
            <div>
              <Label>Duration:</Label> 12 weeks (baseline, week 4, week 8, week 12)
            </div>
            <div>
              <Label>Primary Outcome:</Label> Torticollis Overall Assessment (TOA)
            </div>
            <div>
              <Label>Secondary Outcomes:</Label> Exercise amount (adherence), usability (SUS), satisfaction, safety
            </div>
          </div>

          <Hr />

          {/* Structured Abstract */}
          <div className="space-y-6 text-sm leading-relaxed">
            <div>
              <Label>Background.</Label>{" "}
              <Muted>
                Congenital muscular torticollis (CMT) is common; early physical therapy is effective and total
                exercise dosage is a key factor in symptom alleviation.
              </Muted>
            </div>

            <div>
              <Label>Objective.</Label>{" "}
              <Muted>
                Evaluate ACESO-APP, a personalized exercise app with real-time feedback using skeleton-based
                motion analysis and AI-driven body reconstruction, on clinical outcomes and exercise amount
                in infants with CMT.
              </Muted>
            </div>

            <div>
              <Label>Methods.</Label>{" "}
              <Muted>
                Prospective, open-label pilot study with random allocation to standard education (SE) or digital
                therapeutics (DT). Participants performed a 12-week home-based program alongside conventional
                hospital physical therapy. Outcomes were assessed at baseline, 4, 8, and 12 weeks; usability and
                satisfaction were assessed at 12 weeks.
              </Muted>
            </div>

            <div>
              <Label>Results.</Label>{" "}
              <Muted>
                TOA improved overall at 12 weeks from 13.50 (SD 2.88) to 16.13 (SD 2.36; P=.010). There were no
                statistically significant between-group differences in TOA change or exercise amount; however,
                the DT group showed a trend toward greater improvement and higher exercise amount. Usability,
                satisfaction, and safety were verified.
              </Muted>
            </div>

            <div>
              <Label>Conclusion.</Label>{" "}
              <Muted>
                ACESO-APP appears practical, acceptable, and promising. These preliminary findings support
                further optimization and larger-scale randomized controlled studies, and suggest potential as an
                adjunct treatment option (and possibly an alternative) to conventional physical therapy.
              </Muted>
            </div>
          </div>

          <Hr />

          {/* Key numbers (minimal) */}
          <div className="space-y-3 text-sm leading-relaxed">
            <div className="text-xs uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
              Key findings (pilot)
            </div>

            <div>
              <Label>Participants:</Label>{" "}
              <Muted>Enrolled n=14 (DT 7, SE 7); completed n=8.</Muted>
            </div>

            <div>
              <Label>Primary outcome:</Label>{" "}
              <Muted>Overall TOA improvement at 12 weeks (P=.010).</Muted>
            </div>

            <div>
              <Label>Usability:</Label>{" "}
              <Muted>SUS 73.13 (grade “B”, good).</Muted>
            </div>

            <div>
              <Label>Safety:</Label>{" "}
              <Muted>No adverse symptoms reported.</Muted>
            </div>
          </div>

          <Hr />

          {/* Disclaimer / CTA */}
          <div className="space-y-3 text-sm leading-relaxed">
            <div className="text-xs uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
              Note
            </div>
            <p className="text-[hsl(var(--muted-foreground))]">
              This page summarizes a manuscript currently under peer review. Study details and interpretations may be
              updated following editorial decisions.
            </p>

            <div className="pt-2">
              <a
                href="/contact"
                className="inline-flex items-center rounded-full border border-[hsl(var(--border))] px-4 py-2 text-sm
                           hover:bg-[hsl(var(--muted))]/40 transition"
              >
                Contact for clinical collaboration
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
