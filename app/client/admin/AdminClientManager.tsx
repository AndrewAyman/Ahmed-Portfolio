"use client";

import { useState } from "react";
import { updateClientProjectAction } from "@/app/actions/admin-actions";
import { ProjectStatus } from "@prisma/client";
import { Search, Edit3, X, Check, Loader2, ExternalLink, Filter } from "lucide-react";
import { toast } from "react-toastify";

interface ClientProjectData {
  id: string;
  totalAmount: number;
  paidAmount: number;
  driveUrl: string | null;
  projectBrief: string;
  shootingSuggestions: string;
  status: ProjectStatus;
}

interface ClientUser {
  id: string;
  name: string;
  email: string;
  project: ClientProjectData | null;
}

export default function AdminClientManager({
  initialClients,
}: {
  initialClients: ClientUser[];
}) {
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [editingClient, setEditingClient] = useState<ClientUser | null>(null);
  const [saving, setSaving] = useState(false);

  // Edit form state
  const [editTotal, setEditTotal] = useState<number>(0);
  const [editPaid, setEditPaid] = useState<number>(0);
  const [editDrive, setEditDrive] = useState<string>("");
  const [editBrief, setEditBrief] = useState<string>("");
  const [editSuggestions, setEditSuggestions] = useState<string>("");
  const [editStatus, setEditStatus] = useState<ProjectStatus>("PENDING");

  function openEditModal(client: ClientUser) {
    setEditingClient(client);
    setEditTotal(client.project?.totalAmount || 0);
    setEditPaid(client.project?.paidAmount || 0);
    setEditDrive(client.project?.driveUrl || "");
    setEditBrief(client.project?.projectBrief || "");
    setEditStatus(client.project?.status || "PENDING");

    let parsedSuggestions: string[] = [];
    try {
      parsedSuggestions = client.project?.shootingSuggestions
        ? JSON.parse(client.project.shootingSuggestions)
        : [];
    } catch {
      parsedSuggestions = [];
    }
    setEditSuggestions(parsedSuggestions.join("\n"));
  }

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingClient?.project?.id) return;

    setSaving(true);
    const suggestionsArray = editSuggestions
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const res = await updateClientProjectAction({
      projectId: editingClient.project.id,
      totalAmount: editTotal,
      paidAmount: editPaid,
      driveUrl: editDrive,
      projectBrief: editBrief,
      shootingSuggestions: suggestionsArray,
      status: editStatus,
    });

    if (res?.error) {
      toast.error(res.error);
      setSaving(false);
      return;
    }

    toast.success(`Updated ${editingClient.name} successfully!`);

    // Optimistically update table data
    setClients((prev) =>
      prev.map((c) =>
        c.id === editingClient.id
          ? {
              ...c,
              project: {
                ...c.project!,
                totalAmount: editTotal,
                paidAmount: editPaid,
                driveUrl: editDrive || null,
                projectBrief: editBrief,
                shootingSuggestions: JSON.stringify(suggestionsArray),
                status: editStatus,
              },
            }
          : c
      )
    );

    setSaving(false);
    setEditingClient(null);
  }

  const filtered = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || c.project?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusBadge: Record<string, string> = {
    PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    IN_PROGRESS: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    REVIEW: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    COMPLETED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Toolbar */}
      <div className="flex md:flex-row flex-col justify-between items-center gap-4 bg-[#111111] shadow-lg p-4 border border-white/10 rounded-2xl">
        <div className="relative w-full md:w-80">
          <Search className="top-3 left-3.5 absolute w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search clients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-black/60 py-2 pr-4 pl-10 border border-white/10 focus:border-red-600 rounded-xl focus:outline-none w-full text-white text-sm transition placeholder-zinc-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-zinc-400" />
          <span className="text-zinc-400 text-xs uppercase tracking-wider">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-black/60 px-3 py-2 border border-white/10 focus:border-red-600 rounded-xl focus:outline-none text-white text-xs"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="REVIEW">Review</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111111] shadow-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-black/50 border-white/10 border-b text-[11px] text-zinc-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Client / Brand</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Contract Total (LE)</th>
                <th className="px-6 py-4">Paid (LE)</th>
                <th className="px-6 py-4">Remaining (LE)</th>
                <th className="px-6 py-4">Google Drive</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((client) => {
                const total = client.project?.totalAmount || 0;
                const paid = client.project?.paidAmount || 0;
                const remaining = Math.max(0, total - paid);
                const status = client.project?.status || "PENDING";

                return (
                  <tr key={client.id} className="hover:bg-white/[0.02] transition">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{client.name}</div>
                      <div className="text-zinc-500 text-xs">{client.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full border ${
                          statusBadge[status] || statusBadge.PENDING
                        }`}
                      >
                        {status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      {total.toLocaleString()} <span className="font-normal text-xs text-zinc-400">LE</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-emerald-400">
                      {paid.toLocaleString()} <span className="font-normal text-xs text-emerald-400/80">LE</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-red-500">
                      {remaining.toLocaleString()} <span className="font-normal text-xs text-red-500/80">LE</span>
                    </td>
                    <td className="px-6 py-4">
                      {client.project?.driveUrl ? (
                        <a
                          href={client.project.driveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-medium text-red-500 hover:text-red-400 text-xs"
                        >
                          Drive Link <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-zinc-600 text-xs italic">Not assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => openEditModal(client)}
                        className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-3 py-1.5 border border-white/5 rounded-lg text-zinc-300 hover:text-white text-xs uppercase tracking-wider transition"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-red-500" />
                        Edit Details
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-zinc-500 text-sm text-center">
                    No clients match the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Drawer / Modal */}
      {editingClient && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/80 backdrop-blur-md p-4">
          <div className="space-y-6 bg-[#111111] shadow-2xl p-6 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-white/10 border-b">
              <div>
                <span className="font-semibold text-[10px] text-red-500 uppercase tracking-widest">
                  Update Client File
                </span>
                <h2 className="font-bold text-xl">{editingClient.name}</h2>
                <p className="text-zinc-400 text-xs">{editingClient.email}</p>
              </div>
              <button
                onClick={() => setEditingClient(null)}
                className="hover:bg-white/5 p-1 rounded-lg text-zinc-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                <div>
                  <label className="block mb-1 text-zinc-400 text-xs uppercase tracking-wider">
                    Total Amount (LE)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={editTotal}
                    onChange={(e) => setEditTotal(parseFloat(e.target.value) || 0)}
                    className="bg-black/50 px-3 py-2 border border-white/10 focus:border-red-600 rounded-xl focus:outline-none w-full text-white text-sm transition"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-zinc-400 text-xs uppercase tracking-wider">
                    Paid Amount (LE)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={editPaid}
                    onChange={(e) => setEditPaid(parseFloat(e.target.value) || 0)}
                    className="bg-black/50 px-3 py-2 border border-white/10 focus:border-red-600 rounded-xl focus:outline-none w-full text-white text-sm transition"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-zinc-400 text-xs uppercase tracking-wider">
                    Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as ProjectStatus)}
                    className="bg-black/50 px-3 py-2 border border-white/10 focus:border-red-600 rounded-xl focus:outline-none w-full text-white text-sm transition"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="REVIEW">Review</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-zinc-400 text-xs uppercase tracking-wider">
                  Google Drive Folder Link
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/drive/folders/..."
                  value={editDrive}
                  onChange={(e) => setEditDrive(e.target.value)}
                  className="bg-black/50 px-3 py-2 border border-white/10 focus:border-red-600 rounded-xl focus:outline-none w-full text-white text-sm transition"
                />
              </div>

              <div>
                <label className="block mb-1 text-zinc-400 text-xs uppercase tracking-wider">
                  Project Brief & Scope
                </label>
                <textarea
                  rows={3}
                  value={editBrief}
                  onChange={(e) => setEditBrief(e.target.value)}
                  placeholder="Describe project deliverables, timeline, format requirements..."
                  className="bg-black/50 p-3 border border-white/10 focus:border-red-600 rounded-xl focus:outline-none w-full text-white text-sm transition"
                />
              </div>

              <div>
                <label className="block mb-1 text-zinc-400 text-xs uppercase tracking-wider">
                  Shooting / Production Suggestions (1 item per line)
                </label>
                <textarea
                  rows={4}
                  value={editSuggestions}
                  onChange={(e) => setEditSuggestions(e.target.value)}
                  placeholder="Golden hour drone establishing shot&#10;Macro product focus at 120fps&#10;Moody key light with warm edge rim"
                  className="bg-black/50 p-3 border border-white/10 focus:border-red-600 rounded-xl focus:outline-none w-full text-white text-sm transition"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-white/10 border-t">
                <button
                  type="button"
                  onClick={() => setEditingClient(null)}
                  className="bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl text-zinc-300 text-xs uppercase tracking-wider transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 shadow-lg shadow-red-600/30 px-6 py-2.5 rounded-xl font-semibold text-white text-xs uppercase tracking-widest transition"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

