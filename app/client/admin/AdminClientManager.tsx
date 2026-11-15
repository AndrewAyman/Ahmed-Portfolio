"use client";

import { useState } from "react";
import { updateClientProjectAction, deleteClientAction } from "@/app/actions/admin-actions";
import { ProjectStatus } from "@prisma/client";
import { Search, Edit3, X, Check, Loader2, ExternalLink, Filter, Trash2, AlertTriangle } from "lucide-react";
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
  const [deletingClient, setDeletingClient] = useState<ClientUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  async function handleConfirmDelete() {
    if (!deletingClient) return;

    setIsDeleting(true);
    const res = await deleteClientAction(deletingClient.id);

    if (res?.error) {
      toast.error(res.error);
      setIsDeleting(false);
      return;
    }

    toast.success(`Client "${deletingClient.name}" deleted successfully!`);

    // Optimistically remove client from state
    setClients((prev) => prev.filter((c) => c.id !== deletingClient.id));

    setIsDeleting(false);
    setDeletingClient(null);
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
            className="bg-black/60 py-2.5 pr-4 pl-10 border border-white/10 focus:border-red-600 rounded-xl focus:outline-none w-full text-white text-base sm:text-sm transition placeholder-zinc-500"
          />
        </div>

        <div className="flex items-center justify-between sm:justify-start gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-zinc-400 shrink-0" />
            <span className="text-zinc-400 text-xs uppercase tracking-wider whitespace-nowrap">Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-black/60 px-3 py-2 border border-white/10 focus:border-red-600 rounded-xl focus:outline-none text-white text-xs flex-1 sm:flex-initial"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="REVIEW">Review</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {/* ── Mobile View (< md): Sleek Responsive Cards ── */}
      <div className="space-y-4 md:hidden">
        {filtered.map((client) => {
          const total = client.project?.totalAmount || 0;
          const paid = client.project?.paidAmount || 0;
          const remaining = Math.max(0, total - paid);
          const status = client.project?.status || "PENDING";

          return (
            <div
              key={client.id}
              className="bg-[#111111] p-5 rounded-2xl border border-white/10 space-y-4 shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-white text-base truncate">{client.name}</h3>
                  <p className="text-zinc-500 text-xs truncate">{client.email}</p>
                </div>
                <span
                  className={`text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full border shrink-0 whitespace-nowrap ${
                    statusBadge[status] || statusBadge.PENDING
                  }`}
                >
                  {status.replace("_", " ")}
                </span>
              </div>

              {/* Financials 3-column micro-grid */}
              <div className="grid grid-cols-3 gap-2 bg-black/40 p-3 rounded-xl border border-white/5 text-center">
                <div>
                  <div className="text-[10px] uppercase text-zinc-500 tracking-wider">Total</div>
                  <div className="text-xs font-semibold text-white mt-0.5 whitespace-nowrap">
                    {total.toLocaleString()} <span className="text-[9px] text-zinc-400">LE</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-zinc-500 tracking-wider">Paid</div>
                  <div className="text-xs font-semibold text-emerald-400 mt-0.5 whitespace-nowrap">
                    {paid.toLocaleString()} <span className="text-[9px] text-emerald-400/80">LE</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-zinc-500 tracking-wider">Remaining</div>
                  <div className="text-xs font-semibold text-red-500 mt-0.5 whitespace-nowrap">
                    {remaining.toLocaleString()} <span className="text-[9px] text-red-500/80">LE</span>
                  </div>
                </div>
              </div>

              {/* Drive Link */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-zinc-400">Drive Assets:</span>
                {client.project?.driveUrl ? (
                  <a
                    href={client.project.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-red-500 hover:text-red-400 font-medium"
                  >
                    <span>Google Drive</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-zinc-600 italic">Not assigned</span>
                )}
              </div>

              {/* Actions buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => openEditModal(client)}
                  className="flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 py-2.5 px-3 rounded-xl text-zinc-200 text-xs uppercase tracking-wider font-medium border border-white/5 transition"
                >
                  <Edit3 className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeletingClient(client)}
                  className="flex items-center justify-center gap-1.5 bg-red-600/10 hover:bg-red-600/20 py-2.5 px-3 rounded-xl text-red-400 text-xs uppercase tracking-wider font-medium border border-red-600/20 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="bg-[#111111] p-8 rounded-2xl border border-white/10 text-center text-zinc-500 text-sm">
            No clients match the filter criteria.
          </div>
        )}
      </div>

      {/* ── Desktop View (>= md): Full Data Table ── */}
      <div className="hidden md:block bg-[#111111] shadow-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-black/50 border-white/10 border-b text-[11px] text-zinc-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Client / Brand</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap">Contract Total (LE)</th>
                <th className="px-6 py-4 whitespace-nowrap">Paid (LE)</th>
                <th className="px-6 py-4 whitespace-nowrap">Remaining (LE)</th>
                <th className="px-6 py-4 whitespace-nowrap">Google Drive</th>
                <th className="px-6 py-4 text-right whitespace-nowrap">Actions</th>
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-white">{client.name}</div>
                      <div className="text-zinc-500 text-xs">{client.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full border whitespace-nowrap inline-flex items-center ${
                          statusBadge[status] || statusBadge.PENDING
                        }`}
                      >
                        {status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                      {total.toLocaleString()} <span className="font-normal text-xs text-zinc-400">LE</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-emerald-400 whitespace-nowrap">
                      {paid.toLocaleString()} <span className="font-normal text-xs text-emerald-400/80">LE</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-red-500 whitespace-nowrap">
                      {remaining.toLocaleString()} <span className="font-normal text-xs text-red-500/80">LE</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(client)}
                          className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-3 py-1.5 border border-white/5 rounded-lg text-zinc-300 hover:text-white text-xs uppercase tracking-wider transition"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
                          Edit Details
                        </button>
                        <button
                          onClick={() => setDeletingClient(client)}
                          className="inline-flex items-center gap-1.5 bg-red-600/10 hover:bg-red-600/20 px-3 py-1.5 border border-red-600/20 hover:border-red-600/40 rounded-lg text-red-400 hover:text-red-300 text-xs uppercase tracking-wider transition"
                          title="Delete Client"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
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
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/85 backdrop-blur-md p-3 sm:p-4">
          <div className="space-y-5 sm:space-y-6 bg-[#111111] shadow-2xl p-5 sm:p-6 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-white/10 border-b gap-3">
              <div className="min-w-0 flex-1">
                <span className="font-semibold text-[10px] text-red-500 uppercase tracking-widest whitespace-nowrap">
                  Update Client File
                </span>
                <h2 className="font-bold text-lg sm:text-xl truncate text-white">{editingClient.name}</h2>
                <p className="text-zinc-400 text-xs truncate">{editingClient.email}</p>
              </div>
              <button
                onClick={() => setEditingClient(null)}
                className="hover:bg-white/5 p-1.5 rounded-lg text-zinc-400 hover:text-white transition shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="gap-3 sm:gap-4 grid grid-cols-1 sm:grid-cols-3">
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
                    className="bg-black/50 px-3 py-2.5 border border-white/10 focus:border-red-600 rounded-xl focus:outline-none w-full text-white text-base sm:text-sm transition"
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
                    className="bg-black/50 px-3 py-2.5 border border-white/10 focus:border-red-600 rounded-xl focus:outline-none w-full text-white text-base sm:text-sm transition"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-zinc-400 text-xs uppercase tracking-wider">
                    Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as ProjectStatus)}
                    className="bg-black/50 px-3 py-2.5 border border-white/10 focus:border-red-600 rounded-xl focus:outline-none w-full text-white text-base sm:text-sm transition"
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

      {/* Delete Confirmation Modal */}
      {deletingClient && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/85 backdrop-blur-md p-4">
          <div className="space-y-5 bg-[#141414] shadow-2xl p-6 border border-red-600/30 rounded-2xl w-full max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600/15 border border-red-600/30 flex items-center justify-center text-red-500 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Delete Client</h3>
                <p className="text-xs text-zinc-400">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-white/5">
              Are you sure you want to permanently delete{" "}
              <span className="font-bold text-white">{deletingClient.name}</span> (
              <span className="text-zinc-400">{deletingClient.email}</span>)?
              All project deliverables, brief data, and client access will be permanently removed.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingClient(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs uppercase tracking-wider rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-5 py-2 text-xs uppercase tracking-widest font-semibold rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 transition disabled:opacity-50 shadow-lg shadow-red-600/30"
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete Client
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

