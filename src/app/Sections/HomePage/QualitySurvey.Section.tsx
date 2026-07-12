const competitors = [
  {
    name: "EGO Bank",
    appRating: "4.8",
    transferSpeed: "Instant",
    statementExport: "Monthly PDF",
    support: "24/7 secure chat",
    highlight: true,
  },
  {
    name: "Northline Bank",
    appRating: "4.4",
    transferSpeed: "Same day",
    statementExport: "Quarterly PDF",
    support: "Business hours",
  },
  {
    name: "Crown & Ledger",
    appRating: "4.2",
    transferSpeed: "Next working day",
    statementExport: "Email request",
    support: "Phone support",
  },
  {
    name: "MetroFiction Finance",
    appRating: "4.5",
    transferSpeed: "Under 2 hours",
    statementExport: "Monthly CSV",
    support: "Chat queue",
  },
];

const strengths = [
  ["87%", "of fictional customers found statements easier to download"],
  ["2 min", "average time to send an internal EGO transfer"],
  ["96%", "said card controls were easy to understand"],
];

const Survey = () => {
  return (
    <section className="w-full bg-[#f6f3ef] px-4 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.4fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#d95600]">
              Fictional market survey
            </p>
            <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-stone-950 md:text-6xl">
              How EGO Bank compares with other digital banks
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
              A fictional customer experience benchmark across app usability,
              transfer speed, statement access and day-to-day support.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {strengths.map(([value, label]) => (
              <div
                key={value}
                className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
              >
                <p className="text-3xl font-semibold text-[#213f29]">
                  {value}
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
          <div className="grid grid-cols-[1.1fr_0.7fr_0.9fr_0.9fr_0.9fr] bg-[#213f29] px-5 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white max-lg:hidden">
            <span>Bank</span>
            <span>App score</span>
            <span>Transfer speed</span>
            <span>Statements</span>
            <span>Support</span>
          </div>

          {competitors.map((bank) => (
            <article
              key={bank.name}
              className={`grid gap-3 border-t border-stone-100 px-5 py-5 lg:grid-cols-[1.1fr_0.7fr_0.9fr_0.9fr_0.9fr] lg:items-center ${
                bank.highlight ? "bg-orange-50/70" : "bg-white"
              }`}
            >
              <div>
                <p className="font-semibold text-stone-950">{bank.name}</p>
                {bank.highlight && (
                  <span className="mt-2 inline-flex rounded-full bg-[#d95600] px-3 py-1 text-xs font-semibold text-white">
                    Project bank
                  </span>
                )}
              </div>
              <p className="text-sm text-stone-700">
                <span className="font-semibold lg:hidden">App score: </span>
                {bank.appRating}/5
              </p>
              <p className="text-sm text-stone-700">
                <span className="font-semibold lg:hidden">
                  Transfer speed:{" "}
                </span>
                {bank.transferSpeed}
              </p>
              <p className="text-sm text-stone-700">
                <span className="font-semibold lg:hidden">Statements: </span>
                {bank.statementExport}
              </p>
              <p className="text-sm text-stone-700">
                <span className="font-semibold lg:hidden">Support: </span>
                {bank.support}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-5 text-sm leading-6 text-stone-500">
          Survey figures and competitor names are fictional and are used to
          demonstrate product positioning inside this portfolio banking project.
        </p>
      </div>
    </section>
  );
};

export default Survey;
