export default function StudyAbstract() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-2 text-xs uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
            Clinical Evidence
          </div>

          <h2 className="text-2xl font-semibold tracking-tight">
            Clinical study overview
          </h2>
        </div>

        {/* Abstract body */}
        <div className="space-y-4 text-sm leading-relaxed">
          <div>
            <span className="font-medium">Study Design:</span>{" "}
            Randomized controlled trial
          </div>

          <div>
            <span className="font-medium">Population:</span>{" "}
            Infants younger than 12 months diagnosed with congenital muscular
            torticollis
          </div>

          <div>
            <span className="font-medium">Intervention:</span>{" "}
            ACESO digital therapeutic in addition to standard physical therapy
          </div>

          <div>
            <span className="font-medium">Comparator:</span>{" "}
            Standard physical therapy alone
          </div>

          <div>
            <span className="font-medium">Duration:</span> 12 weeks
          </div>

          <div>
            <span className="font-medium">Primary Outcome:</span>{" "}
            Improvement in cervical range of motion
          </div>

          <div>
            <span className="font-medium">Secondary Outcomes:</span>{" "}
            Exercise adherence and caregiver-reported satisfaction
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-[hsl(var(--border))]" />

        {/* Interpretation */}
        <div>
          <h3 className="mb-2 text-sm font-medium uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
            Interpretation
          </h3>
          <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
            The study demonstrates that a structured digital therapeutic
            intervention can enhance adherence to prescribed rehabilitation
            exercises when used alongside standard care, supporting its role as
            a clinically meaningful adjunct therapy.
          </p>
        </div>
      </div>
    </section>
  );
}
