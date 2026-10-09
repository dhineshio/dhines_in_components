// 3D laptop built with CSS 3D transforms (no image). The screen and the
// keyboard deck are real planes in 3D space, viewed from the front-left.
// The screen shows a small dashboard made in HTML, so it stays crisp.

import { cn } from "@/lib/utils";

const BARS = [30, 45, 38, 60, 52, 75, 64, 88, 70, 95];

function Dashboard() {
  return (
    <div className="flex h-full w-full overflow-hidden rounded-[3px] bg-white text-[5px] text-slate-500">
      {/* Sidebar */}
      <div className="flex w-[18%] flex-col gap-[3px] bg-slate-900 p-[4px]">
        <div className="mb-[3px] h-[4px] w-[70%] rounded-full bg-slate-500" />
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "h-[3px] rounded-full",
              i === 0 ? "w-[80%] bg-indigo-400" : "w-[60%] bg-slate-600",
            )}
          />
        ))}
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col gap-[4px] p-[5px]">
        <div className="text-[6px] font-semibold text-slate-800">Dashboard</div>
        <div className="grid grid-cols-3 gap-[3px]">
          {["12,480", "8,320", "2,140"].map((n) => (
            <div
              key={n}
              className="rounded-[2px] border border-slate-100 p-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <div className="h-[2px] w-[50%] rounded-full bg-slate-200" />
              <div className="mt-[2px] text-[5.5px] font-semibold text-slate-800">
                {n}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-1 gap-[3px]">
          {/* Bar chart */}
          <div className="flex flex-[2] items-end gap-[2px] rounded-[2px] border border-slate-100 p-[3px]">
            {BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-[1px] bg-gradient-to-t from-indigo-500 to-blue-400"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          {/* Donut */}
          <div className="grid flex-1 place-items-center rounded-[2px] border border-slate-100">
            <div className="size-[22px] rounded-full bg-[conic-gradient(#6366f1_0_68%,#e2e8f0_68%_100%)] p-[4px]">
              <div className="size-full rounded-full bg-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Laptop3D({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none [perspective:900px]", className)}
    >
      {/* Soft floor shadow */}
      <div className="absolute inset-x-[8%] bottom-[2%] h-[18%] rounded-[50%] bg-indigo-900/25 blur-xl" />

      <div className="relative mx-auto w-[220px] [transform:rotateX(-22deg)_rotateY(-28deg)_rotateZ(1deg)] [transform-style:preserve-3d]">
        {/* Screen (lid), tilted back a little from its bottom edge */}
        <div className="relative h-[142px] origin-bottom rounded-t-[10px] bg-gradient-to-b from-slate-700 to-slate-900 p-[6px] pb-[10px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] [transform:rotateX(10deg)] [transform-style:preserve-3d]">
          <Dashboard />
          {/* Glass reflection */}
          <div className="pointer-events-none absolute inset-[6px] bottom-[10px] rounded-[3px] bg-[linear-gradient(115deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_35%)]" />
          {/* Back of the lid, so it looks solid from the side */}
          <div className="absolute inset-0 rounded-t-[10px] bg-slate-300 [transform:translateZ(-3px)]" />
        </div>

        {/* Keyboard deck, lying flat toward the viewer */}
        <div className="absolute top-full -left-[14px] h-[150px] w-[248px] origin-top rounded-b-[12px] bg-gradient-to-b from-slate-200 to-slate-300 [transform:rotateX(90deg)] [transform-style:preserve-3d]">
          {/* Keys */}
          <div className="absolute inset-x-[16px] top-[12px] h-[62px] rounded-[3px] bg-slate-400/40 bg-[linear-gradient(90deg,transparent_85%,rgba(226,232,240,0.9)_85%),linear-gradient(0deg,transparent_80%,rgba(226,232,240,0.9)_80%)] bg-size-[11px_11px]" />
          {/* Trackpad */}
          <div className="absolute top-[86px] left-1/2 h-[46px] w-[78px] -translate-x-1/2 rounded-[4px] bg-slate-200 shadow-[inset_0_0_0_1px_rgba(100,116,139,0.25)]" />
          {/* Front edge (thickness) */}
          <div className="absolute inset-x-0 bottom-0 h-[6px] origin-bottom rounded-b-[6px] bg-slate-400 [transform:rotateX(90deg)]" />
        </div>
      </div>
    </div>
  );
}
