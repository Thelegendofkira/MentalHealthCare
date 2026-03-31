import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — MindBridge",
  description:
    "Educational resources and video content on understanding youth mental health causes and early warning signs.",
};

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Understanding Mental Health
        </h1>
        <p className="mt-2 text-slate-500">
          Educational resources and awareness content curated for students,
          parents, and community volunteers.
        </p>
      </div>


      <section className="mb-12">
        <h2 className="text-lg font-semibold text-slate-700 mb-4">
          Featured Video
        </h2>
        <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">

          <div style={{ paddingTop: "56.25%" }} className="relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-400">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
              </svg>
              <p className="text-sm font-medium text-slate-500">
                YouTube Embed — Replace{" "}
                <code className="bg-slate-200 px-1.5 py-0.5 rounded text-xs">src</code>{" "}
                in the{" "}
                <code className="bg-slate-200 px-1.5 py-0.5 rounded text-xs">&lt;iframe&gt;</code>{" "}
                below
              </p>
            </div>
          </div>
        </div>
        {/* Uncomment and replace VIDEO_ID to activate:
        <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/VIDEO_ID"
            title="Understanding Mental Health"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        */}
      </section>

      {/* ── General Causes Section ── */}
      <section>
        <h2 className="text-xl font-semibold text-slate-800 mb-6">
          General Causes of Declining Mental Health
        </h2>

        <div className="space-y-8">
          {/* Cause 1 */}
          <article className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-800 mb-2">
              1. Academic & Performance Pressure
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </article>

          {/* Cause 2 */}
          <article className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-800 mb-2">
              2. Social Media & Digital Overload
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
              habitant morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor
              sit amet, ante. Donec eu libero sit amet quam egestas semper.
            </p>
          </article>


          <article className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-800 mb-2">
              3. Family Dysfunction & Home Environment
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis
              ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed
              fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed
              consequat, leo eget bibendum sodales, augue velit cursus nunc.
            </p>
          </article>


          <article className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-800 mb-2">
              4. Poverty, Insecurity & Adverse Childhood Experiences
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean leo
              ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
              ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
              nulla ut metus varius laoreet. Quisque rutrum.
            </p>
          </article>


          <article className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-800 mb-2">
              5. Lack of Access to Safe Spaces & Support Systems
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius,
              turpis molestie pretium placerat, arcu purus aliquam purus, vitae
              tristique lorem lorem placerat lorem. Replace this text with your
              actual content.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
