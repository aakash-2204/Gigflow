import { useState } from "react";
import API from "../api/api";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddLeadModal({ onClose, onSuccess }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    status: "New",
    source: "Website",
  });

  const [error, setError] = useState("");

  const saveLead = async () => {
    if (!form.name || !form.email) {
      setError("Please enter name and email.");
      return;
    }

    await API.post("/leads", form);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="w-[500px] card-soft overflow-hidden">
        <div className="px-7 py-5 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Add New Lead</h2>
            <p className="text-sm text-[#6B7280]">Create a new sales prospect</p>
          </div>

          <button onClick={onClose} className="text-2xl text-[#6B7280]">
            ×
          </button>
        </div>

        <div className="p-7 space-y-5">
          <div>
            <label className="text-sm font-semibold">Full Name</label>
            <input
              className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Michael Chen"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Email Address</label>
            <input
              className={`w-full mt-2 border rounded-xl px-4 py-3 outline-none ${
                error ? "border-[#EF4444]" : "border-gray-200"
              }`}
              placeholder="michael@example.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {error && <p className="text-sm text-[#EF4444] mt-2">{error}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">Lead Status</label>
              <select
                className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3"
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Lost</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold">Lead Source</label>
              <select
                className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3"
                onChange={(e) => setForm({ ...form, source: e.target.value })}
              >
                <option>Website</option>
                <option>Instagram</option>
                <option>Referral</option>
              </select>
            </div>
          </div>

          <textarea
            className="w-full border border-gray-200 rounded-xl px-4 py-3"
            placeholder="Additional lead notes..."
          />
        </div>

        <div className="px-7 py-5 bg-[#F5F6FA] flex justify-end gap-3">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={saveLead} className="btn-primary">
            Save Lead
          </button>
        </div>
      </div>
    </div>
  );
}