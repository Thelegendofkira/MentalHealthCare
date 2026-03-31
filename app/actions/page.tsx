import type { Metadata } from 'next';
import { Target, Users, TrendingUp, Zap, Globe, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NGO Actions & Impact — Aroha',
  description: 'High-level overview of Aroha\'s current targets, impact metrics, and community motives driving youth mental health change.',
};

const stats = [
  { icon: Users,      value: '1,200+', label: 'Youth Reached',              sub: 'Across 6 districts' },
  { icon: Shield,     value: '45',     label: 'Active Mentors',             sub: 'Trained & certified' },
  { icon: TrendingUp, value: '85%',    label: 'Early Intervention Success', sub: 'Before crisis escalation' },
];

const motives = [
  {
    emoji: '🏫',
    area: 'Westside District Schools',
    problem: 'Rising academic burnout and exam anxiety is affecting over 60% of students in the region, with no in-school counsellors available.',
    goal: 'Deploy 10 new trained mentors across 8 schools by Q3 2025.',
    tag: 'Education',
    tagColor: 'bg-blue-950 text-blue-300 border-blue-800',
    urgency: 'High',
  },
  {
    emoji: '💬',
    area: 'Online Communities',
    problem: 'Cyberbullying isolation is pushing vulnerable teens to disengage socially. Anonymity makes early detection nearly impossible.',
    goal: 'Launch 5 anonymous peer-support digital circles with moderated AI safety layers.',
    tag: 'Digital',
    tagColor: 'bg-purple-950 text-purple-300 border-purple-800',
    urgency: 'Medium',
  },
  {
    emoji: '🏘️',
    area: 'Low-income Urban Communities',
    problem: 'Families facing poverty-linked stress have no structured outlet for youth grief processing or emotional support.',
    goal: 'Establish 3 community drop-in wellbeing hubs by end of year.',
    tag: 'Community',
    tagColor: 'bg-amber-950 text-amber-300 border-amber-800',
    urgency: 'High',
  },
  {
    emoji: '👨‍👩‍👧',
    area: 'Parent & Caregiver Network',
    problem: 'Parents lack the tools to identify early warning signs of mental health struggles in adolescents at home.',
    goal: 'Run quarterly digital literacy workshops for 500+ caregivers.',
    tag: 'Family',
    tagColor: 'bg-green-950 text-green-300 border-green-800',
    urgency: 'Medium',
  },
  {
    emoji: '🌐',
    area: 'Rural Outreach Zone',
    problem: 'Rural youth have near-zero access to professional support, compounded by stigma and misinformation.',
    goal: 'Partner with 2 local NGOs to deploy MindBridge in 15 rural schools via mobile units.',
    tag: 'Outreach',
    tagColor: 'bg-rose-950 text-rose-300 border-rose-800',
    urgency: 'Critical',
  },
  {
    emoji: '🔬',
    area: 'Research & Data Pipeline',
    problem: 'Lack of anonymised, consent-based youth emotional data makes evidence-based policy nearly impossible.',
    goal: 'Publish the first community mental health index report with aggregated platform insights.',
    tag: 'Research',
    tagColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
    urgency: 'Low',
  },
];

const urgencyColors: Record<string, string> = {
  Critical: 'bg-red-950 text-red-400 border-red-800',
  High:     'bg-orange-950 text-orange-400 border-orange-800',
  Medium:   'bg-yellow-950 text-yellow-400 border-yellow-800',
  Low:      'bg-zinc-800 text-zinc-400 border-zinc-700',
};

export default function ActionsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-zinc-800 py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-zinc-950 to-zinc-950 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-blue-950 border border-blue-800 text-blue-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <Zap size={12} /> NGO Impact Hub
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5">
            Driving Change in<br />
            <span className="text-blue-500">Youth Mental Health</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Aroha is building infrastructure for communities that need it most — connecting data,
            mentors, and youth to create lasting emotional resilience.
          </p>
        </div>
      </section>

      {/* ── Impact Stats ── */}
      <section className="py-16 px-4 border-b border-zinc-800">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-10">
            <Globe size={18} className="text-blue-500" />
            <h2 className="text-xl font-bold text-white">Impact at a Glance</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {stats.map(({ icon: Icon, value, label, sub }) => (
              <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 flex flex-col gap-4 hover:border-zinc-600 transition-colors">
                <span className="flex items-center justify-center w-11 h-11 bg-blue-950 rounded-xl text-blue-400">
                  <Icon size={22} />
                </span>
                <div>
                  <p className="text-4xl font-extrabold text-white">{value}</p>
                  <p className="text-zinc-200 font-semibold mt-1">{label}</p>
                  <p className="text-zinc-500 text-sm mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Current Motives ── */}
      <section className="py-16 px-4 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Target size={18} className="text-blue-500" />
            <h2 className="text-xl font-bold text-white">Current Target Motives</h2>
          </div>
          <p className="text-zinc-500 text-sm mb-10 ml-7">
            Our active intervention areas — each with a defined problem and a measurable goal.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {motives.map((m) => (
              <div
                key={m.area}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4 hover:border-zinc-600 transition-all hover:shadow-xl hover:shadow-black/30"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{m.emoji}</span>
                    <h3 className="font-bold text-white text-base leading-snug">{m.area}</h3>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${m.tagColor}`}>
                      {m.tag}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${urgencyColors[m.urgency]}`}>
                      {m.urgency}
                    </span>
                  </div>
                </div>

                {/* Problem */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                  <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-1.5">Problem</p>
                  <p className="text-zinc-300 text-sm leading-relaxed">{m.problem}</p>
                </div>

                {/* Goal */}
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-blue-500 shrink-0">
                    <Target size={14} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-1">Goal</p>
                    <p className="text-zinc-200 text-sm leading-relaxed font-medium">{m.goal}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
