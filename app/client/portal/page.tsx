import { getSession } from "@/lib/auth-jwt";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { logoutAction } from "@/app/actions/auth-actions";
import {
  FolderSync,
  ExternalLink,
  Clapperboard,
  Lightbulb,
  LogOut,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Wallet,
} from "lucide-react";

export default async function ClientPortalPage() {
  const session = await getSession();

  if (!session) {
    redirect("/client");
  }

  // Fetch full user and project details
  const user = await prisma.user.findUnique({
    where: { id: session.id },
    include: { project: true },
  });

  if (!user) {
    redirect("/client");
  }

  const project = user.project;
  const totalAmount = project?.totalAmount || 0;
  const paidAmount = project?.paidAmount || 0;
  const remaining = Math.max(0, totalAmount - paidAmount);
  const percentPaid =
    totalAmount > 0 ? Math.min(100, Math.round((paidAmount / totalAmount) * 100)) : 0;

  let suggestions: string[] = [];
  try {
    suggestions = project?.shootingSuggestions
      ? JSON.parse(project.shootingSuggestions)
      : [];
  } catch {
    suggestions = [];
  }

  const statusStyles: Record<string, { label: string; badge: string; icon: any }> = {
    PENDING: {
      label: "Pending Initiation",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      icon: Clock,
    },
    IN_PROGRESS: {
      label: "Production In Progress",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      icon: Clapperboard,
    },
    REVIEW: {
      label: "Under Client Review",
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      icon: Sparkles,
    },
    COMPLETED: {
      label: "Project Completed",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      icon: CheckCircle2,
    },
  };

  const currentStatus = statusStyles[project?.status || "PENDING"] || statusStyles.PENDING;
  const StatusIcon = currentStatus.icon;

  return (
    <div className="relative bg-[#080808] p-6 md:p-12 min-h-screen font-sans text-white">
      {/* Background ambient lighting */}
      <div className="top-0 right-1/4 absolute bg-red-600/5 blur-[140px] rounded-full w-[600px] h-[350px] pointer-events-none" />

      <div className="z-10 relative space-y-8 mx-auto max-w-6xl">
        {/* Top Bar */}
        <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-4 pb-6 border-white/10 border-b">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block bg-red-600/10 px-3 py-1 border border-red-600/20 rounded-full font-semibold text-[11px] text-red-500 uppercase tracking-widest">
                Client Workspace
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${currentStatus.badge}`}
              >
                <StatusIcon className="w-3 h-3" />
                {currentStatus.label}
              </span>
            </div>
            <h1 className="font-extrabold text-3xl tracking-tight">{user.name}</h1>
            <p className="mt-1 text-zinc-400 text-xs">{user.email}</p>
          </div>

          <div className="flex items-center gap-3">
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex items-center gap-2 bg-white/[0.04] hover:bg-white/10 px-4 py-2 border border-white/10 rounded-xl text-zinc-400 hover:text-white text-xs uppercase tracking-wider transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </form>
          </div>
        </div>

        {/* 1. Financial Overview Cards */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
          <div className="relative bg-[#111111] shadow-lg p-6 border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex justify-between items-center mb-2 text-zinc-400 text-xs uppercase tracking-wider">
              <span>Total Contract Cost</span>
              <Wallet className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="font-extrabold text-white text-3xl tracking-tight">
              {totalAmount.toLocaleString()} <span className="font-normal text-sm text-zinc-400">LE</span>
            </div>
            <p className="mt-2 text-zinc-500 text-xs">Agreed production quote</p>
          </div>

          <div className="relative bg-[#111111] shadow-lg p-6 border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex justify-between items-center mb-2 text-zinc-400 text-xs uppercase tracking-wider">
              <span>Total Amount Paid</span>
              <span className="font-semibold text-emerald-400 text-xs">{percentPaid}%</span>
            </div>
            <div className="font-extrabold text-emerald-400 text-3xl tracking-tight">
              {paidAmount.toLocaleString()} <span className="font-normal text-sm text-emerald-400/80">LE</span>
            </div>
            {/* Progress Bar */}
            <div className="bg-white/5 mt-3 rounded-full w-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-500 rounded-full h-full transition-all duration-500"
                style={{ width: `${percentPaid}%` }}
              />
            </div>
          </div>

          <div className="relative bg-[#111111] shadow-lg p-6 border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex justify-between items-center mb-2 text-zinc-400 text-xs uppercase tracking-wider">
              <span>Remaining Balance</span>
              {remaining > 0 && (
                <span className="bg-red-600 rounded-full w-2 h-2 animate-pulse" />
              )}
            </div>
            <div className="font-extrabold text-red-500 text-3xl tracking-tight">
              {remaining.toLocaleString()} <span className="font-normal text-sm text-red-500/80">LE</span>
            </div>
            <p className="mt-2 text-zinc-500 text-xs">
              {remaining > 0 ? "Due upon final asset delivery" : "Account settled in full"}
            </p>
          </div>
        </div>

        {/* 2. Deliverables & Raw Footage (Google Drive Card) */}
        <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-6 bg-gradient-to-r from-red-950/40 via-[#141414] to-[#111111] shadow-red-950/20 shadow-xl p-8 border border-red-600/30 rounded-2xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="flex justify-center items-center bg-red-600/20 border border-red-600/30 rounded-xl w-9 h-9 text-red-500">
                <FolderSync className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-lg uppercase tracking-wider">
                Deliverables & Master Footage
              </h2>
            </div>
            <p className="pt-1 max-w-xl text-zinc-400 text-sm">
              Access your Google Drive folder for raw recordings, cuts for social media, color graded masters, and export presets.
            </p>
          </div>

          {project?.driveUrl ? (
            <a
              href={project.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30 px-6 py-3.5 rounded-xl font-semibold text-white text-xs uppercase tracking-widest transition duration-200 shrink-0"
            >
              <span>Open Google Drive</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ) : (
            <div className="bg-white/5 px-5 py-3 border border-white/10 rounded-xl text-zinc-400 text-xs uppercase tracking-wider">
              Drive folder will be attached soon
            </div>
          )}
        </div>

        {/* 3. Project Brief & Shooting Suggestions */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          {/* Project Brief */}
          <div className="flex flex-col justify-between space-y-4 bg-[#111111] shadow-lg p-6 border border-white/10 rounded-2xl">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-white/5 border-b">
                <Clapperboard className="w-4 h-4 text-red-500" />
                <h3 className="font-semibold text-sm uppercase tracking-wider">
                  Project Scope & Brief
                </h3>
              </div>

              <div className="bg-black/40 p-4 border border-white/5 rounded-xl min-h-[140px] text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
                {project?.projectBrief || "Brief is currently being coordinated with the team."}
              </div>
            </div>

            <div className="flex items-center gap-1.5 pt-2 text-[11px] text-zinc-500">
              <Calendar className="w-3.5 h-3.5" />
              Last synchronized:{" "}
              {project?.updatedAt
                ? new Date(project.updatedAt).toLocaleDateString()
                : "Recently"}
            </div>
          </div>

          {/* Shooting Suggestions */}
          <div className="space-y-4 bg-[#111111] shadow-lg p-6 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-2 pb-3 border-white/5 border-b">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <h3 className="font-semibold text-sm uppercase tracking-wider">
                Production & Shooting Suggestions
              </h3>
            </div>

            {suggestions.length > 0 ? (
              <ul className="space-y-3">
                {suggestions.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 bg-black/40 p-3.5 border border-white/5 rounded-xl text-zinc-300 text-sm"
                  >
                    <span className="flex justify-center items-center bg-red-600/10 mt-0.5 border border-red-600/30 rounded-full w-5 h-5 font-bold text-red-500 text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="bg-black/40 p-6 border border-white/5 rounded-xl text-zinc-500 text-sm text-center italic">
                Custom shot lists and creative recommendations will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

