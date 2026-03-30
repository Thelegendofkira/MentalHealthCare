import AudioAssessor from "./components/AudioAssessor";
import {
  ShieldOff,
  BookX,
  ActivitySquare,
  Eye,
  Users,
  Globe,
  Baby,
} from "lucide-react";

const coreIssues = [
  {
    icon: ShieldOff,
    title: "No Safe Spaces",
    description:
      "Many young people lack environments where they can speak openly about their mental health without fear of stigma, judgement, or consequences.",
  },
  {
    icon: BookX,
    title: "Resource Inaccessibility",
    description:
      "Professional mental health care remains financially and geographically out of reach for the majority of youth in underserved communities.",
  },
  {
    icon: ActivitySquare,
    title: "Absence of Early Intervention",
    description:
      "Without timely screening and support, manageable concerns escalate into serious crises — creating long-term burdens for individuals and systems alike.",
  },
  {
    icon: Eye,
    title: "NGO Visibility Gap",
    description:
      "Well-intentioned organizations struggle to identify who needs help and where, making data-driven community outreach nearly impossible.",
  },
];

const impactMetrics = [
  {
    icon: Baby,
    stat: "50%",
    label: "of all mental health conditions begin before age 14.",
  },
  {
    icon: Users,
    stat: "90%",
    label: "of affected youth in low-income countries receive no care at all.",
  },
  {
    icon: Globe,
    stat: "1 in 7",
    label: "young people globally experience a mental health condition.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero Section ── */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border border-blue-100">
            Youth Mental Health Platform
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight tracking-tight max-w-3xl mx-auto">
            A Safe Space for Every Young{" "}
            <span className="text-blue-600">Voice</span>
          </h1>
          <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            MindBridge empowers communities with early intervention tools,
            AI-assisted awareness, and a direct channel between youth and the
            NGOs that support them.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/training"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-7 py-3 rounded-lg transition-colors shadow-sm"
            >
              Start Your Wellbeing Check
            </a>
            <a
              href="/dashboard"
              className="inline-block bg-white hover:bg-slate-50 text-slate-700 font-medium px-7 py-3 rounded-lg border border-slate-200 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>


      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-slate-800">
              Speak Freely
            </h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto">
              Record how you feel. Our AI listens with care and helps guide you
              to the right support.
            </p>
          </div>
          <div className="flex justify-center">
            <AudioAssessor />
          </div>
        </div>
      </section>


      <section className="bg-white border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-slate-800">
              The Core Issues We Address
            </h2>
            <p className="mt-2 text-slate-500">
              Four systemic gaps that our platform works to close.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {coreIssues.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-stone-50 border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg text-blue-600">
                    <Icon size={20} />
                  </span>
                  <h3 className="font-semibold text-slate-800">{title}</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-slate-800">
              Why This Matters
            </h2>
            <p className="mt-2 text-slate-500">
              Global data on the scale of the youth mental health crisis.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {impactMetrics.map(({ icon: Icon, stat, label }) => (
              <div
                key={stat}
                className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm text-center"
              >
                <div className="flex justify-center mb-4">
                  <span className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full text-blue-600">
                    <Icon size={24} />
                  </span>
                </div>
                <p className="text-4xl font-bold text-blue-600">{stat}</p>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
