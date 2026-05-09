import { BrandMark } from "@/components/brand-mark";

const sidebarGroups = [
  {
    label: "Library",
    items: ["Statements"],
  },
  {
    label: "Reports",
    items: [
      "Search",
      "Trip Report",
      "Settlement",
      "Ask CentProof",
      "What Changed",
      "Cash Flow",
      "Recurring",
      "Price Watch",
      "Anomalies",
      "Saved",
    ],
  },
  {
    label: "Organize",
    items: ["Entities", "Categories", "Cleanup Inbox", "Coverage"],
  },
  {
    label: "System",
    items: ["Trash"],
  },
];

const statements = [
  {
    bank: "Apple Card",
    period: "2026-04-01 \u2192 2026-04-30",
    chip: "PDF proof",
  },
  {
    bank: "US Bank",
    period: "2025-12-16 \u2192 2026-01-15",
    chip: "Local AI ready",
  },
  {
    bank: "Wells Fargo",
    period: "2025-07-09 \u2192 2025-08-08",
    chip: "Source rows",
  },
];

const transactions = [
  {
    date: "04/12",
    description: "AMZN MKTP",
    entity: "Amazon",
    category: "Shopping",
    amount: "-$42.18",
    source: "PDF",
  },
  {
    date: "04/15",
    description: "Payroll Deposit",
    entity: "Payroll",
    category: "Income",
    amount: "+$4,250.00",
    source: "PDF",
  },
  {
    date: "04/18",
    description: "Trader Joe's",
    entity: "Trader Joe's",
    category: "Groceries",
    amount: "-$86.42",
    source: "PDF",
  },
];

export function AppMockup() {
  return (
    <div className="rounded-[1.25rem] border border-[#334155] bg-[#0F172A] p-2 shadow-[0_30px_80px_rgba(15,23,42,0.28)]">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A]">
        <div className="flex items-center justify-between border-b border-white/10 bg-[#0B1220] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[#EF4444]" />
            <span className="size-3 rounded-full bg-[#F59E0B]" />
            <span className="size-3 rounded-full bg-[#16A34A]" />
          </div>
          <div className="hidden text-xs font-medium text-[#94A3B8] sm:block">
            Local vault
          </div>
        </div>

        <div className="grid min-h-[660px] grid-cols-[136px_1fr] sm:grid-cols-[218px_1fr]">
          <aside className="flex min-h-full flex-col bg-[#1E293B] p-3 text-[#CBD5E1] sm:p-4">
            <div className="mb-5 flex items-center gap-3">
              <BrandMark size={36} />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-white">CentProof</p>
                <p className="text-xs text-[#94A3B8]">
                  local finance for Mac
                </p>
              </div>
            </div>

            <div className="min-h-0 flex-1">
              {sidebarGroups.map((group) => (
                <div key={group.label} className="mb-3">
                  <p className="mb-1.5 px-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#64748B] sm:text-[10px]">
                    {group.label}
                  </p>
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const selected = item === "Statements";

                      return (
                        <div
                          key={item}
                          className={`rounded-lg px-2 py-1.5 text-[10px] font-medium sm:text-xs ${
                            selected
                              ? "bg-[#0F766E] text-white"
                              : "text-[#CBD5E1]"
                          }`}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2 border-t border-white/10 pt-3">
              <button className="h-9 w-full rounded-lg bg-[#2DD4BF] px-3 text-xs font-semibold text-[#0F172A]">
                + Add Statement
              </button>
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-[#2DD4BF]">
                AI: 1 ready
              </div>
              <div className="rounded-lg px-2 py-1.5 text-[10px] font-medium text-[#CBD5E1] sm:text-xs">
                Preferences
              </div>
            </div>
          </aside>

          <section className="min-w-0 bg-[#F8FAFC] p-4 sm:p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F766E]">
                  Library
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#0F172A]">
                  Statements
                </h2>
              </div>
              <div className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#64748B] sm:w-56">
                Search statements
              </div>
            </div>

            <div className="mt-5 grid gap-3 lg:grid-cols-3">
              {statements.map((statement) => (
                <article
                  key={statement.bank}
                  className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-[#0F172A]">
                        {statement.bank}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-[#64748B]">
                        Period
                      </p>
                      <p className="mt-0.5 text-sm text-[#475569]">
                        {statement.period}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#ECFDF5] px-2.5 py-1 text-[11px] font-semibold text-[#047857]">
                      {statement.chip}
                    </span>
                  </div>
                  <div className="mt-5 rounded-xl border border-[#D1FAE5] bg-[#F0FDF4] px-3 py-2 text-xs font-semibold text-[#166534]">
                    Reconciles to the cent
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] px-4 py-3">
                <h3 className="text-sm font-semibold text-[#0F172A]">
                  Transactions
                </h3>
                <span className="rounded-full bg-[#CCFBF1] px-3 py-1 text-xs font-semibold text-[#0F766E]">
                  Source rows
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-[680px] text-left text-xs">
                  <thead className="bg-[#F8FAFC] text-[#64748B]">
                    <tr>
                      {[
                        "Date",
                        "Description",
                        "Entity",
                        "Category",
                        "Amount",
                        "Source",
                      ].map((heading) => (
                        <th key={heading} className="px-4 py-3 font-semibold">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0] text-[#334155]">
                    {transactions.map((transaction) => (
                      <tr key={`${transaction.date}-${transaction.description}`}>
                        <td className="whitespace-nowrap px-4 py-3">
                          {transaction.date}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-medium text-[#0F172A]">
                          {transaction.description}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {transaction.entity}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {transaction.category}
                        </td>
                        <td
                          className={`whitespace-nowrap px-4 py-3 font-semibold ${
                            transaction.amount.startsWith("+")
                              ? "text-[#16A34A]"
                              : "text-[#0F172A]"
                          }`}
                        >
                          {transaction.amount}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <span className="rounded-full bg-[#F1F5F9] px-2.5 py-1 font-semibold text-[#475569]">
                            {transaction.source}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F766E]">
                    Ask CentProof
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#0F172A]">
                    How much on dining last quarter?
                  </p>
                </div>
                <div className="rounded-xl bg-[#F8FAFC] px-4 py-3 text-right">
                  <p className="text-xs font-semibold text-[#64748B]">Answer</p>
                  <p className="mt-1 text-lg font-semibold text-[#0F172A]">
                    $1,234 across 47 transactions
                  </p>
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs font-semibold text-[#475569]">
                Answer backed by source rows
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
