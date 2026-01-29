import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

type StudyItem = {
  label: string;
  value: string;
  note?: string;
};

const STUDY_META: StudyItem[] = [
  { label: "Study Design", value: "Randomized Controlled Trial (RCT)" },
  { label: "Population", value: "Infants < 12 months with torticollis" },
  { label: "Arms", value: "ACESO App + Standard Care vs Standard Care" },
  { label: "Duration", value: "12 weeks" },
  { label: "Primary Outcome", value: "Cervical ROM improvement" },
  { label: "Secondary Outcomes", value: "Adherence, caregiver satisfaction" },
  { label: "Setting", value: "Clinical / Home-based hybrid" },
];

export default function StudyOverview() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Clinical Evidence</Badge>
            <Badge variant="outline">Study Overview</Badge>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight">
            Clinical study at a glance
          </h2>

          <p className="max-w-3xl text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
            Clinician-friendly study metadata, structured for fast scanning and low ambiguity.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Summary */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/40 p-4">
                <div className="text-sm text-[hsl(var(--muted-foreground))]">Design</div>
                <div className="mt-1 text-base font-medium">
                  Randomized Controlled Trial
                </div>
              </div>

              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/40 p-4">
                <div className="text-sm text-[hsl(var(--muted-foreground))]">Comparison</div>
                <div className="mt-1 text-base font-medium">
                  Intervention vs Active Control
                </div>
              </div>

              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/40 p-4">
                <div className="text-sm text-[hsl(var(--muted-foreground))]">Timeline</div>
                <div className="mt-1 text-base font-medium">12 weeks</div>
                <div className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                  Baseline → Week 4 → Week 8 → Week 12
                </div>
              </div>

              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                * Replace placeholders with your final protocol numbers (n, IRB, endpoints).
              </p>
            </CardContent>
          </Card>

          {/* Protocol metadata */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Protocol metadata</CardTitle>
            </CardHeader>

            <CardContent>
              <dl className="grid gap-4 sm:grid-cols-2">
                {STUDY_META.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/40 p-4"
                  >
                    <dt className="text-sm text-[hsl(var(--muted-foreground))]">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-base font-medium">{item.value}</dd>
                    {item.note ? (
                      <div className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                        {item.note}
                      </div>
                    ) : null}
                  </div>
                ))}
              </dl>

              <div className="mt-6 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/40 p-4">
                <div className="text-sm font-medium">What this means</div>
                <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                  This layout mirrors a clinical abstract header—fast to scan, hard to misinterpret.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
