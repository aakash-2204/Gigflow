import { useState } from "react";
import API from "../api/api";

type Lead = {
  _id: string;
  name: string;
  email: string;
  status: "New" | "Contacted" | "Qualified" | "Lost";
  source: "Website" | "Instagram" | "Referral";
};

type Props = {
  onClose: () => void;
  onSuccess: () => void;
  editLead?: Lead | null;
};

export default function AddLeadModal({
  onClose,
  onSuccess,
  editLead,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: editLead?.name || "",
    email: editLead?.email || "",
    status: editLead?.status || "New",
    source: editLead?.source || "Website",
  });

  const [error, setError] = useState("");

  const saveLead = async () => {
    try {
      setLoading(true);
      setError("");

      if (!form.name || !form.email) {
        setError("Please enter name and email");
        return;
      }

      if (editLead) {
        // UPDATE
        await API.put(`/leads/${editLead._id}`, form);
      } else {
        // CREATE
        await API.post("/leads", form);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.log(err);
      setError("Failed to save lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center">
      <div className="w-[500px] bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="px-7 py-5 border-b flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              {editLead ? "Edit Lead" : "Add Lead"}
            </h2>

            <p className="text-gray-500 mt-1">
              {editLead
                ? "Update lead information"
                : "Create a new sales lead"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl text-gray-400"
          >
            ×
          </button>
        </div>


        {/* Form */}
        <div className="p-7 space-y-5">

          <div>
            <label className="font-semibold">
              Name
            </label>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full mt-2 border rounded-xl px-4 py-3"
              placeholder="Enter name"
            />
          </div>


          <div>
            <label className="font-semibold">
              Email
            </label>

            <input
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full mt-2 border rounded-xl px-4 py-3"
              placeholder="Enter email"
            />
          </div>


          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="font-semibold">
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as Lead["status"],
                  })
                }
                className="w-full mt-2 border rounded-xl px-4 py-3"
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Lost</option>
              </select>
            </div>


            <div>
              <label className="font-semibold">
                Source
              </label>

              <select
                value={form.source}
                onChange={(e) =>
                  setForm({
                    ...form,
                    source: e.target.value as Lead["source"],
                  })
                }
                className="w-full mt-2 border rounded-xl px-4 py-3"
              >
                <option>Website</option>
                <option>Instagram</option>
                <option>Referral</option>
              </select>
            </div>

          </div>


          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}
        </div>



        {/* Footer */}
        <div className="px-7 py-5 bg-gray-50 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border"
          >
            Cancel
          </button>


          <button
            onClick={saveLead}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl"
          >
            {loading
              ? "Saving..."
              : editLead
              ? "Update Lead"
              : "Save Lead"}
          </button>

        </div>

      </div>
    </div>
  );
}