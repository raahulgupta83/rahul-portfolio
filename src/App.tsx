import { useEffect, useMemo, useState } from "react";
import {
  Github,
  Mail,
  Phone,
  Linkedin,
  Server,
  ShieldCheck,
  Container,
  Cloud,
  Wrench,
  Rocket,
  Database,
  Workflow,
  Sun,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { Button } from "./components/ui/button";

/** === Formspree endpoint (replace with your own) === */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/XXXXABCD";

const TAGS = [
  "AWS (EC2, S3, RDS, EFS, ALB, Route 53, IAM, VPC, CloudWatch, KMS)",
  "Azure",
  "Terraform",
  "Ansible",
  "Docker",
  "Kubernetes (K8s)",
  "Jenkins",
  "GitHub Actions",
  "GitLab CI",
  "ArgoCD",
  "Prometheus",
  "Grafana",
  "Datadog",
  "Nginx",
  "Apache",
  "LiteSpeed",
  "Tomcat",
  "Postfix",
  "Dovecot",
  "Exim",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Memcached",
  "RDS",
  "Git",
  "GitHub",
  "GitLab",
  "VMware ESXi",
  "Proxmox",
  "KVM",
  "IAM",
  "TLS/SSL",
  "HSTS",
];

export default function Portfolio() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState<null | "ok" | "fail">(null);
  const [theme, setTheme] = useState<"light" | "dark">(
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  // scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  // parallax for profile card
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 120]);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const services = useMemo(() => ([
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Cloud Infra (AWS/Azure)",
      points: ["Design & provisioning", "VPC, IAM, security baselines", "HA & autoscaling"],
    },
    {
      icon: <Container className="h-6 w-6" />,
      title: "Docker & Kubernetes",
      points: ["Containerization", "K8s deployments", "Helm, Ingress & GitOps"],
    },
    {
      icon: <Workflow className="h-6 w-6" />,
      title: "CI/CD Automation",
      points: ["Jenkins/GitHub Actions/GitLab CI", "Zero-downtime", "Blue-green/Canary"],
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Security & Hardening",
      points: ["TLS/SSL & HSTS", "Firewalls/WAF", "CVE remediation"],
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Databases & Caching",
      points: ["MySQL/PostgreSQL/MongoDB", "RDS, Redis, Memcached", "Backups & tuning"],
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "Servers & Panels",
      points: ["Nginx/Apache/LiteSpeed", "WHM/cPanel, Plesk", "Performance optimization"],
    },
  ]), []);

  const caseStudies = [
    {
      title: "CI/CD + Zero-downtime releases",
      impact: "Release speed ↑ and incidents ↓ via pipelines & safe strategies",
      stack: "Jenkins, GitHub Actions, GitLab CI, Nginx, K8s",
    },
    {
      title: "Cloud cost & security baseline",
      impact: "Hardened IAM, TLS/HSTS; reduced waste with right-sizing & autoscaling",
      stack: "AWS (EC2, ALB, RDS, CloudWatch, IAM, VPC)",
    },
    {
      title: "Monitoring that catches issues early",
      impact: "Actionable alerts; faster MTTR on infra & apps",
      stack: "Prometheus, Grafana, Alertmanager, Datadog",
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSent(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) { setSent("ok"); form.reset(); } else { setSent("fail"); }
    } catch { setSent("fail"); } finally { setSubmitting(false); }
  };

  // Shared fade/slide variant
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-950 dark:to-black dark:text-slate-100" : "light-sky text-slate-900"}`}>
      {/* Scroll progress */}
      <motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 h-1 origin-left bg-indigo-500/90 z-[60]" />

      {/* Glow blobs (very subtle) */}
      <div className="pointer-events-none fixed -top-20 -right-20 h-64 w-64 rounded-full bg-indigo-300/30 blur-3xl animate-glow dark:hidden" />
      <div className="pointer-events-none fixed -bottom-24 -left-24 h-64 w-64 rounded-full bg-sky-300/20 blur-3xl animate-glow dark:hidden" />

      {/* Nav */}
      <header className={`sticky top-0 z-40 backdrop-blur border-b ${theme === "dark" ? "dark:border-white/5 dark:bg-black/30" : "border-black/5 bg-white/70"}`}>
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-wide">Rahul Gupta</a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#services" className="hover:opacity-80">Services</a>
            <a href="#work" className="hover:opacity-80">Work</a>
            <a href="#about" className="hover:opacity-80">About</a>
            <a href="#contact" className="hover:opacity-80">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white hover:bg-black/5 dark:border-white/10 dark:bg-black/40 dark:hover:bg-white/10 transition"
              title={theme === "dark" ? "Switch to light" : "Switch to dark"}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <a href="mailto:raaahulgupta83@gmail.com" className="hidden sm:inline-flex"><Mail className="h-5 w-5" /></a>
            <a href="https://www.linkedin.com/in/rahul-gupta83" target="_blank" rel="noreferrer" className="hidden sm:inline-flex"><Linkedin className="h-5 w-5" /></a>
            <a href="https://github.com/raahulgupta83" target="_blank" rel="noreferrer" className="hidden sm:inline-flex"><Github className="h-5 w-5" /></a>
            <Button className="rounded-2xl px-4 py-2 text-sm" asChild><a href="#contact">Hire Me</a></Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <motion.section id="home" className="mx-auto max-w-6xl px-4 py-16 md:py-20" {...fadeUp}>
        <div className="grid md:grid-cols-[1.2fr_.8fr] gap-10 items-center">
          <div>
            <p className={`text-xs uppercase tracking-widest ${theme === "dark" ? "text-white/60" : "text-slate-600"}`}>DevOps • Cloud • Security</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-bold leading-tight">
              <motion.span
                initial={{ backgroundSize: "200% 200%", opacity: 0 }}
                animate={{ backgroundSize: "100% 100%", opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-600"
              >
                I scale, secure & automate
              </motion.span>
              <br />
              cloud infrastructure.
            </h1>
            <p className={`mt-4 max-w-prose ${theme === "dark" ? "text-white/80" : "text-slate-700"}`}>
              I’m <span className="font-semibold">Rahul Gupta</span>{" "}
              (<a href="https://raahulgupta83.tech" className="underline hover:opacity-80">raahulgupta83.tech</a>), a DevOps & Cloud Infrastructure Specialist.
              I help teams ship faster with resilient architecture, repeatable deployments, and strong security baselines.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="rounded-2xl px-5 py-2" asChild><a href="#contact">Book a 30-min call</a></Button>
              <a href="#work" className={`rounded-2xl px-5 py-2 text-sm transition
                ${theme === "dark" ? "border border-white/10 hover:bg-white/5" : "border border-black/10 hover:bg-black/5"}`}>
                See case studies
              </a>
            </div>
            <ul className={`mt-8 grid grid-cols-2 gap-3 text-sm ${theme === "dark" ? "text-white/80" : "text-slate-700"}`}>
              <li className="flex items-center gap-2"><Rocket className="h-4 w-4"/> Zero-downtime releases</li>
              <li className="flex items-center gap-2"><Wrench className="h-4 w-4"/> Hands-on troubleshooting</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> Security-first approach</li>
              <li className="flex items-center gap-2"><Server className="h-4 w-4"/> Cost-aware design</li>
            </ul>
          </div>

          {/* Profile card with parallax + float */}
          <motion.div style={{ y: yParallax }} initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .5 }}>
            <div className={`rounded-3xl p-1 ${theme === "dark" ? "card-dark" : "card-light"}`}>
              <div className="rounded-2xl p-6 grid gap-4 place-items-center animate-floaty">
                <img src="/profile.jpg" alt="Rahul Gupta" className="h-36 w-36 rounded-full object-cover ring-2 ring-black/10 dark:ring-white/10" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Rahul Gupta</h3>
                  <p className={`${theme === "dark" ? "text-white/70" : "text-slate-600"} text-sm`}>DevOps & Cloud Engineer • Jaipur (IST)</p>
                </div>
                <div className="flex gap-3 text-sm">
                  <a href="mailto:raaahulgupta83@gmail.com" className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 transition
                    ${theme === "dark" ? "border border-white/10 hover:bg-white/5" : "border border-black/10 hover:bg-black/5"}`}>
                    <Mail className="h-4 w-4"/> Email
                  </a>
                  <a href="tel:+918386938653" className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 transition
                    ${theme === "dark" ? "border border-white/10 hover:bg-white/5" : "border border-black/10 hover:bg-black/5"}`}>
                    <Phone className="h-4 w-4"/> Call
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* TECH STACK (stagger + hover micro) */}
      <motion.section className="mx-auto max-w-6xl px-4 py-8" {...fadeUp}>
        <h2 className="text-2xl md:text-3xl font-semibold">Tech Stack</h2>
        <p className={`${theme === "dark" ? "text-white/70" : "text-slate-700"} mt-2`}>Tools I use to design, automate and run reliable systems.</p>
        <motion.div layout className="mt-5 flex flex-wrap gap-2">
          {TAGS.map((t, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2, scale: 1.03 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.015, duration: 0.35 }}
              className={`rounded-xl px-3 py-1 text-xs md:text-sm shadow-sm transition
                ${theme === "dark" ? "border border-white/10 bg-white/10 text-white/90" : "border border-black/10 bg-white text-slate-800"}`}
            >
              {t}
            </motion.span>
          ))}
        </motion.div>
      </motion.section>

      {/* Services (staggered cards) */}
      <motion.section id="services" className="mx-auto max-w-6xl px-4 py-12" {...fadeUp}>
        <h2 className="text-2xl md:text-3xl font-semibold">Services</h2>
        <p className={`${theme === "dark" ? "text-white/70" : "text-slate-700"} mt-2`}>Flexible engagement: hourly, sprint-based, or managed retainers.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className={`rounded-2xl p-5 transition ${theme === "dark" ? "card-dark hover:bg-white/10" : "card-light hover:bg-black/5"}`}
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-xl p-2 ${theme === "dark" ? "bg-black/40 border border-white/10" : "bg-black/5 border border-black/10"}`}>{s.icon}</div>
                <h3 className="font-medium">{s.title}</h3>
              </div>
              <ul className={`mt-3 list-disc list-inside text-sm space-y-1 ${theme === "dark" ? "text-white/75" : "text-slate-700"}`}>
                {s.points.map((p, j) => (<li key={j}>{p}</li>))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Work */}
      <motion.section id="work" className="mx-auto max-w-6xl px-4 py-12" {...fadeUp}>
        <h2 className="text-2xl md:text-3xl font-semibold">Selected Work</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {caseStudies.map((c, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className={`rounded-2xl p-5 ${theme === "dark" ? "card-dark" : "card-light"}`}
            >
              <h3 className="font-medium text-lg">{c.title}</h3>
              <p className={`${theme === "dark" ? "text-white/80" : "text-slate-700"} mt-2 text-sm`}>{c.impact}</p>
              <p className={`${theme === "dark" ? "text-white/60" : "text-slate-500"} mt-2 text-xs`}>Stack: {c.stack}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* About */}
      <motion.section id="about" className="mx-auto max-w-6xl px-4 py-12" {...fadeUp}>
        <h2 className="text-2xl md:text-3xl font-semibold">About</h2>
        <div className="mt-4 grid md:grid-cols-2 gap-8">
          <p className={`${theme === "dark" ? "text-white/80" : "text-slate-800"}`}>
            I build reliable infrastructure, production-grade CI/CD, and strong security baselines. I work across AWS & Azure,
            automate with Terraform/Ansible, ship with Jenkins/GitHub Actions/GitLab CI, and operate Docker/Kubernetes
            with observability via Prometheus/Grafana/Datadog. Comfortable firefighting incidents and guiding modernization.
          </p>
          <ul className={`text-sm space-y-2 ${theme === "dark" ? "text-white/75" : "text-slate-700"}`}>
            <li>• Jaipur (IST) • Remote-friendly</li>
            <li>• Engagements: project, retainer, or advisory</li>
            <li>• Education: BA; Certifications: OCI Foundations, DevOps training</li>
            <li>• GitHub: <a href="https://github.com/raahulgupta83" className="underline hover:opacity-80" target="_blank">github.com/raahulgupta83</a></li>
            <li>• LinkedIn: <a href="https://linkedin.com/in/rahul-gupta83" className="underline hover:opacity-80" target="_blank">linkedin.com/in/rahul-gupta83</a></li>
          </ul>
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section id="contact" className="mx-auto max-w-6xl px-4 py-12" {...fadeUp}>
        <div className={`rounded-3xl p-6 md:p-8 ${theme === "dark" ? "card-dark" : "card-light"}`}>
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">Let’s work together</h2>
              <p className={`${theme === "dark" ? "text-white/75" : "text-slate-700"} mt-2`}>Tell me briefly about your project. I usually reply the same day.</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <a href="mailto:raaahulgupta83@gmail.com" className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 transition
                ${theme === "dark" ? "border border-white/10 hover:bg-white/5" : "border border-black/10 hover:bg-black/5"}`}>
                <Mail className="h-4 w-4"/> raaahulgupta83@gmail.com
              </a>
              <a href="tel:+918386938653" className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 transition
                ${theme === "dark" ? "border border-white/10 hover:bg-white/5" : "border border-black/10 hover:bg-black/5"}`}>
                <Phone className="h-4 w-4"/> +91 8386938653
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-3 md:grid-cols-2">
            <input name="name" className={`rounded-xl px-4 py-3 outline-none ${theme === "dark" ? "border border-white/10 bg-black/40" : "border border-black/10 bg-white"}`} placeholder="Your name" required />
            <input name="email" type="email" className={`rounded-xl px-4 py-3 outline-none ${theme === "dark" ? "border border-white/10 bg-black/40" : "border border-black/10 bg-white"}`} placeholder="Email" required />
            <input name="company" className={`md:col-span-2 rounded-xl px-4 py-3 outline-none ${theme === "dark" ? "border border-white/10 bg-black/40" : "border border-black/10 bg-white"}`} placeholder="Company / Project" />
            <textarea name="message" className={`md:col-span-2 rounded-xl px-4 py-3 outline-none ${theme === "dark" ? "border border-white/10 bg-black/40" : "border border-black/10 bg-white"}`} placeholder="What do you need help with?" rows={5} required />
            <input type="hidden" name="_subject" value="New inquiry from raahulgupta83.tech" />
            <Button disabled={submitting} className="md:col-span-2 rounded-2xl px-5 py-3">
              {submitting ? "Sending…" : "Send message"}
            </Button>
            <AnimatePresence>
              {sent === "ok" && (
                <motion.p className="md:col-span-2 text-green-600 dark:text-green-400" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                  Thanks! I’ll get back to you soon.
                </motion.p>
              )}
              {sent === "fail" && (
                <motion.p className="md:col-span-2 text-red-600 dark:text-red-400" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                  Error sending. Try again or email me directly.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.section>

      <footer className={`mx-auto max-w-6xl px-4 py-10 text-center text-xs ${theme === "dark" ? "text-white/60" : "text-slate-600"}`}>
        © {new Date().getFullYear()} Rahul Gupta • Built with React + Tailwind
      </footer>
    </div>
  );
}

