import { useEffect, useState } from "react";
import API from "../api/api";
import AddLeadModal from "../components/AddLeadModal";

type Lead = {
  _id: string;
  name: string;
  email: string;
  status: "New" | "Contacted" | "Qualified" | "Lost";
  source: "Website" | "Instagram" | "Referral";
  createdAt: string;
};

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [sort, setSort] = useState("latest");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const res = await API.get("/leads", {
        params: {
          search,
          status,
          source,
          sort,
          page,
        },
      });

      setLeads(res.data.leads);
      setPages(res.data.pages || 1);
      setTotal(res.data.total || 0);
    } catch {
      alert("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchLeads, 500);
    return () => clearTimeout(timer);
  }, [search, status, source, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [search, status, source, sort]);

  const deleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    await API.delete(`/leads/${id}`);
    fetchLeads();
  };

  const exportCSV = () => {
    const csv =
      "Name,Email,Status,Source,CreatedAt\n" +
      leads
        .map(
          (lead) =>
            `${lead.name},${lead.email},${lead.status},${lead.source},${new Date(
              lead.createdAt
            ).toLocaleDateString()}`
        )
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/#/";
  };

  const navItems = [
    "Dashboard",
    "Invoices",
    "Payments",
    "Customers",
    "Products",
    "Reports",
    "Settings",
  ];

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex">
      <aside className="fixed left-0 top-0 h-screen w-[260px] bg-white px-7 py-8 border-r border-gray-100">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-14 h-14 bg-[#2563EB] rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
            G
          </div>
          <h1 className="text-3xl font-bold text-[#1F2937]">GigFlow</h1>
        </div>

        <nav className="space-y-3">
          {navItems.map((item) => (
            <div
              key={item}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl font-semibold cursor-pointer ${
                item === "Dashboard"
                  ? "bg-blue-50 text-[#2563EB]"
                  : "text-[#1F2937] hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">◷</span>
              {item}
            </div>
          ))}

          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl font-semibold text-[#1F2937] hover:bg-gray-50 cursor-pointer">
            <span>◎</span>
            Leads
          </div>
        </nav>

        <button
          onClick={logout}
          className="absolute bottom-8 left-7 text-[#6B7280] font-medium"
        >
          Logout
        </button>
      </aside>

      <main className="ml-[260px] flex-1 px-10 py-8">
        <header className="flex justify-end items-center gap-4 mb-8">
          <button className="btn-secondary">🇺🇸 EN</button>
          <button className="btn-secondary">$ USD</button>
          <button className="btn-secondary min-w-[180px]">
            Main Workspace
          </button>

          <button className="btn-primary relative">
            Notifications
            <span className="absolute -top-2 -right-2 bg-[#EF4444] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#22C55E] text-white rounded-xl h-11 px-5 font-semibold shadow-md relative"
          >
            Add Lead
            <span className="absolute -top-2 -right-2 bg-[#EF4444] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              1
            </span>
          </button>

          <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-500 font-bold flex items-center justify-center">
            A
          </div>
        </header>

        <section className="grid grid-cols-4 gap-7 mb-8">
          <MetricCard title="Paid Invoice" value="00.00 $" color="green" />
          <MetricCard title="Unpaid Invoice" value="00.00 $" color="red" />
          <MetricCard title="Quote" value={`${total}`} color="blue" />
          <MetricCard title="Offer" value="00.00 $" color="purple" />
        </section>

        <section className="grid grid-cols-12 gap-7">
          <div className="col-span-9 card-soft p-8">
            <div className="flex justify-between items-start mb-7">
              <div>
                <h2 className="text-2xl font-bold">Leads Management</h2>
                <p className="text-[#6B7280] mt-1">
                  Manage and track your sales pipeline prospects.
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={exportCSV} className="btn-secondary">
                  Export CSV
                </button>
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn-primary"
                >
                  + Add Lead
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-7">
              <input
                className="border border-gray-200 rounded-xl px-4 py-3 outline-none"
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                className="border border-gray-200 rounded-xl px-4 py-3"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Status: All</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
              </select>

              <select
                className="border border-gray-200 rounded-xl px-4 py-3"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                <option value="">Source: All</option>
                <option value="Website">Website</option>
                <option value="Instagram">Instagram</option>
                <option value="Referral">Referral</option>
              </select>

              <select
                className="border border-gray-200 rounded-xl px-4 py-3"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="latest">Sort: Latest</option>
                <option value="oldest">Sort: Oldest</option>
              </select>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-[#F5F6FA] text-[#6B7280]">
                  <tr>
                    <th className="text-left px-5 py-4">Name</th>
                    <th className="text-left px-5 py-4">Email</th>
                    <th className="text-left px-5 py-4">Status</th>
                    <th className="text-left px-5 py-4">Source</th>
                    <th className="text-left px-5 py-4">Created Date</th>
                    <th className="text-left px-5 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-12 text-[#6B7280]"
                      >
                        Loading leads...
                      </td>
                    </tr>
                  ) : leads.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-12 text-[#6B7280]"
                      >
                        No leads found
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr
                        key={lead._id}
                        className="border-t hover:bg-[#F5F6FA]"
                      >
                        <td className="px-5 py-4 font-semibold">
                          {lead.name}
                        </td>
                        <td className="px-5 py-4 text-[#6B7280]">
                          {lead.email}
                        </td>
                        <td className="px-5 py-4">
                          <span className="px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-bold">
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">{lead.source}</td>
                        <td className="px-5 py-4">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-5 py-4 space-x-3">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="text-[#8B5CF6] font-semibold"
                          >
                            View
                          </button>

                          <button className="text-[#2563EB] font-semibold">
                            Edit
                          </button>

                          {user.role === "admin" && (
                            <button
                              onClick={() => deleteLead(lead._id)}
                              className="text-[#EF4444] font-semibold"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-6 text-sm text-[#6B7280]">
              <p>
                Showing {leads.length} of {total} leads — Page {page} of{" "}
                {pages || 1}
              </p>

              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className={`btn-secondary h-10 ${
                    page <= 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Previous
                </button>

                <button className="bg-[#2563EB] text-white px-4 rounded-xl font-semibold">
                  {page}
                </button>

                <button
                  disabled={page >= pages}
                  onClick={() => setPage((prev) => prev + 1)}
                  className={`btn-secondary h-10 ${
                    page >= pages ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-3 card-soft p-8 flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-8">Customers</h3>

            <div className="w-44 h-44 rounded-full border-[14px] border-gray-100 flex items-center justify-center mb-8">
              <span className="text-4xl font-bold">
                {total === 0 ? 0 : Math.min(100, Math.round((total / 10) * 100))}
                %
              </span>
            </div>

            <p className="font-bold mb-8">Last Month : {total}</p>

            <div className="w-full border-t pt-8 text-center">
              <p className="text-[#6B7280] font-semibold mb-3">Total</p>
              <h4 className="text-3xl font-bold">{total}</h4>
            </div>
          </div>

          <div className="col-span-9 card-soft p-8 grid grid-cols-3 gap-10">
            <ProgressPanel
              title="Invoices"
              items={["Draft", "Pending", "Sent", "Paid", "Unpaid", "Partially"]}
            />
            <ProgressPanel
              title="Quotes For Customers"
              items={[
                "Draft",
                "Pending",
                "Sent",
                "Declined",
                "Accepted",
                "Expired",
              ]}
            />
            <ProgressPanel
              title="Quotes For Leads"
              items={[
                "Draft",
                "Pending",
                "Sent",
                "Declined",
                "Accepted",
                "Expired",
              ]}
            />
          </div>
        </section>

        {modalOpen && (
          <AddLeadModal
            onClose={() => setModalOpen(false)}
            onSuccess={fetchLeads}
          />
        )}

        {selectedLead && (
          <LeadDetailsModal
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
          />
        )}
      </main>
    </div>
  );
}

function MetricCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: "green" | "red" | "blue" | "purple";
}) {
  const styles = {
    green: "bg-green-50 text-[#22C55E]",
    red: "bg-red-50 text-[#EF4444]",
    blue: "bg-blue-50 text-[#2563EB]",
    purple: "bg-purple-50 text-[#8B5CF6]",
  };

  return (
    <div className="card-soft p-7 text-center">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className={`rounded-xl py-3 font-bold text-xl ${styles[color]}`}>
        {value}
      </div>
      <div className="mt-7 flex justify-center">
        <button className="btn-secondary h-10 text-sm">From Beginning</button>
      </div>
    </div>
  );
}

function ProgressPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-7">{title}</h3>

      <div className="space-y-5">
        {items.map((item) => (
          <div key={item}>
            <div className="flex justify-between font-semibold mb-2">
              <span>{item}</span>
              <span>0%</span>
            </div>

            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="w-0 h-full bg-[#2563EB]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeadDetailsModal({
  lead,
  onClose,
}: {
  lead: Lead;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="w-[480px] card-soft overflow-hidden">
        <div className="px-7 py-5 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Lead Details</h2>
            <p className="text-sm text-[#6B7280]">
              Full information about this lead
            </p>
          </div>

          <button onClick={onClose} className="text-2xl text-[#6B7280]">
            ×
          </button>
        </div>

        <div className="p-7 space-y-5">
          <DetailItem label="Name" value={lead.name} />
          <DetailItem label="Email" value={lead.email} />
          <DetailItem label="Status" value={lead.status} />
          <DetailItem label="Source" value={lead.source} />
          <DetailItem
            label="Created Date"
            value={new Date(lead.createdAt).toLocaleString()}
          />
        </div>

        <div className="px-7 py-5 bg-[#F5F6FA] flex justify-end">
          <button onClick={onClose} className="btn-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-[#6B7280] font-semibold">{label}</p>
      <p className="text-lg font-bold text-[#1F2937]">{value}</p>
    </div>
  );
}