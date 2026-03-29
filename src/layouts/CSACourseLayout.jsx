import { useLocation, Link } from 'react-router-dom';

const moduleLinks = [
  { number: '01', title: 'Security Operations', route: '/csa/module-01', accent: 'emerald' },
  { number: '02', title: 'Cyber Threats & IoCs', route: '/csa/module-02', accent: 'red' },
  { number: '03', title: 'Log Management', route: '/csa/module-03', accent: 'cyan' },
  { number: '04', title: 'Incident Detection', route: '/csa/module-04', accent: 'blue' },
  { number: '05', title: 'Threat Detection', route: '/csa/module-05', accent: 'purple' },
  { number: '06', title: 'Incident Response', route: '/csa/module-06', accent: 'rose' },
  { number: '07', title: 'Forensics & Malware', route: '/csa/module-07', accent: 'teal' },
  { number: '08', title: 'Cloud SOC', route: '/csa/module-08', accent: 'sky' },
];

export default function CSACourseLayout({ children }) {
  const location = useLocation();
  const isModulePage = moduleLinks.some(m => location.pathname === m.route);

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="border-b border-zinc-800 bg-zinc-950 px-6 py-3 flex items-center gap-4 sticky top-0 z-40">
        <Link to="/csa" className="text-zinc-400 hover:text-zinc-100 text-sm transition-colors">
          ← CSA Dashboard
        </Link>
        <span className="text-zinc-700">|</span>
        <span className="text-zinc-500 text-sm">EC-Council Certified SOC Analyst v2</span>
        {isModulePage && (
          <>
            <span className="text-zinc-700">|</span>
            <div className="flex items-center gap-2 overflow-x-auto">
              {moduleLinks.map((m) => (
                <Link
                  key={m.number}
                  to={m.route}
                  className={`text-xs px-2 py-1 rounded border transition-colors whitespace-nowrap ${
                    location.pathname === m.route
                      ? 'border-zinc-400 text-zinc-100 bg-zinc-800'
                      : 'border-zinc-700 text-zinc-500 hover:text-zinc-300 hover:border-zinc-500'
                  }`}
                >
                  M{m.number}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      <main>{children}</main>
    </div>
  );
}
