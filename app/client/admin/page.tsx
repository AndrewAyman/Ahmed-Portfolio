import { getSession } from "@/lib/auth-jwt";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { logoutAction } from "@/app/actions/auth-actions";
import AdminClientManager from "./AdminClientManager";
import { Users, TrendingUp, FolderCheck, LogOut, ShieldAlert } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/client");
  }

  // Fetch all registered clients and their linked projects
  let clients: any[] = [];
  try {
    clients = await prisma.user.findMany({
      where: { role: "USER" },
      include: { project: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Error loading clients:", err);
    clients = [];
  }

  const serializedClients = clients.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    project: c.project
      ? {
          id: c.project.id,
          totalAmount: c.project.totalAmount,
          paidAmount: c.project.paidAmount,
          driveUrl: c.project.driveUrl,
          projectBrief: c.project.projectBrief,
          shootingSuggestions: c.project.shootingSuggestions,
          status: c.project.status,
        }
      : null,
  }));

  const totalClients = serializedClients.length;
  const totalRevenue = serializedClients.reduce(
    (sum, c) => sum + (c.project?.totalAmount || 0),
    0
  );
  const totalCollected = serializedClients.reduce(
    (sum, c) => sum + (c.project?.paidAmount || 0),
    0
  );
  const totalOutstanding = Math.max(0, totalRevenue - totalCollected);

  return (
    <div className="relative bg-[#080808] p-4 sm:p-6 md:p-12 min-h-screen font-sans text-white">
      {/* Background ambient lighting */}
      <div className="top-0 left-1/3 absolute bg-red-600/5 blur-[160px] rounded-full w-[700px] h-[350px] pointer-events-none" />

      <div className="z-10 relative space-y-6 sm:space-y-8 mx-auto max-w-7xl">
        {/* Top Header */}
        <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-4 pb-6 border-white/10 border-b">
          <div className="w-full md:w-auto">
            <div className="inline-flex items-center gap-1.5 bg-red-600/10 mb-2 px-3 py-1 border border-red-600/30 rounded-full font-semibold text-[11px] text-red-500 uppercase tracking-widest whitespace-nowrap">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin Management Hub</span>
            </div>
            <h1 className="font-extrabold text-2xl sm:text-3xl tracking-tight break-words">Client Operations</h1>
            <p className="mt-1 text-zinc-400 text-xs break-all">
              Signed in as {session.name} ({session.email})
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <form action={logoutAction} className="w-full md:w-auto">
              <button
                type="submit"
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-white/[0.04] hover:bg-white/10 px-4 py-2.5 border border-white/10 rounded-xl text-zinc-400 hover:text-white text-xs uppercase tracking-wider transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </form>
          </div>
        </div>

        {/* Global Statistics */}
        <div className="gap-3 sm:gap-6 grid grid-cols-2 lg:grid-cols-4">
          <div className="bg-[#111111] shadow-lg p-4 sm:p-6 border border-white/10 rounded-2xl">
            <div className="flex justify-between items-center mb-2 text-zinc-400 text-xs uppercase tracking-wider">
              <span>Clients</span>
              <Users className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="font-extrabold text-2xl sm:text-3xl tracking-tight">{totalClients}</div>
            <p className="mt-1 sm:mt-2 text-zinc-500 text-[11px] sm:text-xs">Active accounts</p>
          </div>

          <div className="bg-[#111111] shadow-lg p-4 sm:p-6 border border-white/10 rounded-2xl">
            <div className="flex justify-between items-center mb-2 text-zinc-400 text-xs uppercase tracking-wider">
              <span>Pipeline</span>
              <TrendingUp className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="font-extrabold text-2xl sm:text-3xl tracking-tight whitespace-nowrap">
              {totalRevenue.toLocaleString()} <span className="font-normal text-xs sm:text-sm text-zinc-400">LE</span>
            </div>
            <p className="mt-1 sm:mt-2 text-zinc-500 text-[11px] sm:text-xs">Gross value</p>
          </div>

          <div className="bg-[#111111] shadow-lg p-4 sm:p-6 border border-white/10 rounded-2xl">
            <div className="flex justify-between items-center mb-2 text-zinc-400 text-xs uppercase tracking-wider">
              <span>Received</span>
              <FolderCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="font-extrabold text-emerald-400 text-2xl sm:text-3xl tracking-tight whitespace-nowrap">
              {totalCollected.toLocaleString()} <span className="font-normal text-xs sm:text-sm text-emerald-400/80">LE</span>
            </div>
            <p className="mt-1 sm:mt-2 text-zinc-500 text-[11px] sm:text-xs">Collected</p>
          </div>

          <div className="bg-[#111111] shadow-lg p-4 sm:p-6 border border-white/10 rounded-2xl">
            <div className="flex justify-between items-center mb-2 text-zinc-400 text-xs uppercase tracking-wider">
              <span>Outstanding</span>
              {totalOutstanding > 0 && (
                <span className="bg-red-600 rounded-full w-2 h-2 animate-pulse" />
              )}
            </div>
            <div className="font-extrabold text-red-500 text-2xl sm:text-3xl tracking-tight whitespace-nowrap">
              {totalOutstanding.toLocaleString()} <span className="font-normal text-xs sm:text-sm text-red-500/80">LE</span>
            </div>
            <p className="mt-1 sm:mt-2 text-zinc-500 text-[11px] sm:text-xs">Pending due</p>
          </div>
        </div>

        {/* Client Management Table & Edit Modal */}
        <AdminClientManager initialClients={serializedClients} />
      </div>
    </div>
  );
}

