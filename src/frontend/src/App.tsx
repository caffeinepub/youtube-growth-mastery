import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import {
  ArrowRight,
  BarChart2,
  Camera,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  Image,
  Loader2,
  Mail,
  Menu,
  Play,
  Search,
  Star,
  Target,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import type { BlogPost } from "./backend.d";
import {
  useGetPosts,
  useGetPostsByCategory,
  useSubmitLead,
} from "./hooks/useQueries";

/* ============================================================
   SAMPLE BLOG POSTS — shown as fallback / initial seeding
   ============================================================ */
const SAMPLE_POSTS: BlogPost[] = [
  {
    id: BigInt(1),
    title: "YouTube's 2026 Algorithm: Everything Creators Need to Know",
    category: "Algorithm Updates",
    date: "March 1, 2026",
    excerpt:
      "The latest update to YouTube's recommendation engine prioritizes watch time velocity and click-through rate in the first 48 hours. Here's how to optimize your uploads for maximum reach.",
    content: "",
    imageUrl: "/assets/generated/blog-algorithm.dim_800x450.jpg",
  },
  {
    id: BigInt(2),
    title: "How I Hit $10,000/Month on YouTube in 12 Months",
    category: "Monetization",
    date: "February 22, 2026",
    excerpt:
      "From zero to $10k/month — a transparent breakdown of every revenue stream including AdSense, memberships, sponsorships, and digital products that compound over time.",
    content: "",
    imageUrl: "/assets/generated/blog-monetization.dim_800x450.jpg",
  },
  {
    id: BigInt(3),
    title: "Best Budget Creator Setup Under $500 (2026 Edition)",
    category: "Gear Reviews",
    date: "February 14, 2026",
    excerpt:
      "You don't need $5,000 worth of gear to produce pro-level videos. This hands-on guide covers the best camera, mic, and lighting combo for under $500 that makes you look like a studio.",
    content: "",
    imageUrl: "/assets/generated/blog-gear.dim_800x450.jpg",
  },
  {
    id: BigInt(4),
    title: "Thumbnail Psychology: The Science Behind High CTR",
    category: "Algorithm Updates",
    date: "February 8, 2026",
    excerpt:
      "A/B testing 200+ thumbnails revealed 5 psychological triggers that consistently double click-through rates. Contrast, faces, pattern interrupts — learn the framework.",
    content: "",
    imageUrl: "/assets/generated/blog-algorithm.dim_800x450.jpg",
  },
  {
    id: BigInt(5),
    title: "Super Thanks, Memberships & Tips: The Full Monetization Playbook",
    category: "Monetization",
    date: "January 30, 2026",
    excerpt:
      "YouTube's fan funding tools are underutilized by 90% of creators. A step-by-step breakdown of every monetization feature and when to enable each one for your channel size.",
    content: "",
    imageUrl: "/assets/generated/blog-monetization.dim_800x450.jpg",
  },
  {
    id: BigInt(6),
    title: "Sony ZV-E10 II vs Canon R50: Which Should YouTubers Buy?",
    category: "Gear Reviews",
    date: "January 20, 2026",
    excerpt:
      "Two of the most popular beginner mirrorless cameras go head-to-head. We tested autofocus, video quality, microphone preamp, and battery life in a real vlogging scenario.",
    content: "",
    imageUrl: "/assets/generated/blog-gear.dim_800x450.jpg",
  },
];

/* ============================================================
   NAVBAR
   ============================================================ */
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", id: "hero", ocid: "nav.home.link" },
    { label: "Start Here", id: "start-here", ocid: "nav.starthere.link" },
    { label: "Resources", id: "resources", ocid: "nav.resources.link" },
    { label: "Blog", id: "blog", ocid: "nav.blog.link" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/95 backdrop-blur-sm border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-brand-red rounded flex items-center justify-center shadow-red-glow">
              <Play className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-display font-black text-white text-lg tracking-tight">
              YGM
              <span className="text-brand-red">.</span>
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                data-ocid={link.ocid}
                onClick={() => scrollTo(link.id)}
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-md hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              data-ocid="nav.checklist.link"
              onClick={() => scrollTo("lead-capture")}
              className="ml-2 px-5 py-2 text-sm font-bold bg-brand-red text-white rounded-md hover:bg-brand-red-bright transition-all shadow-red-glow hover:shadow-red-glow-lg animate-pulse-red"
            >
              Free Checklist
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-white/5"
            >
              <div className="py-3 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    data-ocid={link.ocid}
                    onClick={() => scrollTo(link.id)}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  type="button"
                  data-ocid="nav.checklist.link"
                  onClick={() => scrollTo("lead-capture")}
                  className="mx-4 mt-2 px-5 py-2.5 text-sm font-bold bg-brand-red text-white rounded-md text-center"
                >
                  🎁 Free Viral Checklist
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

/* ============================================================
   HERO SECTION
   ============================================================ */
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-dark"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-bg.dim_1920x1080.jpg"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
      </div>

      {/* Decorative red accent line */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-48 bg-brand-red shadow-red-glow" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.1) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Pre-headline badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-red/20 border border-brand-red/30 mb-6"
          >
            <Zap className="w-3.5 h-3.5 text-brand-red" />
            <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
              Proven Growth Strategies
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight mb-6"
          >
            Grow Your{" "}
            <span className="text-brand-red text-shadow-red relative">
              YouTube
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-red/50" />
            </span>{" "}
            Channel Faster Than Ever
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-lg sm:text-xl text-white/70 leading-relaxed mb-8 max-w-2xl"
          >
            Data-backed strategies, algorithm secrets, and creator playbooks
            that have helped thousands of channels go from zero to monetized —
            faster than they thought possible.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap gap-6 mb-10"
          >
            {[
              { value: "50K+", label: "Creators Helped" },
              { value: "2.8B", label: "Views Generated" },
              { value: "94%", label: "Success Rate" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-white font-display">
                  {stat.value}
                </div>
                <div className="text-xs text-white/50 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              type="button"
              data-ocid="hero.starthere.primary_button"
              onClick={() =>
                document
                  .getElementById("start-here")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-red text-white font-bold text-base rounded-md shadow-red-glow hover:shadow-red-glow-lg hover:bg-brand-red-bright transition-all duration-200"
            >
              Start Here — It&apos;s Free
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              data-ocid="hero.checklist.secondary_button"
              onClick={() =>
                document
                  .getElementById("lead-capture")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold text-base rounded-md hover:bg-white/5 hover:border-white/40 transition-all duration-200"
            >
              <Star className="w-4 h-4 text-brand-red" />
              Get Free Viral Checklist
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/30 uppercase tracking-widest font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-brand-red/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ============================================================
   START HERE GUIDE
   ============================================================ */
const STEPS = [
  {
    num: "01",
    icon: Target,
    title: "Set Up Your Channel for Success",
    desc: "Nail your niche, craft a magnetic channel description, and configure every setting for discoverability before you upload a single video.",
  },
  {
    num: "02",
    icon: Search,
    title: "Master YouTube SEO",
    desc: "Learn how to find high-volume, low-competition keywords and weave them into titles, descriptions, and tags that the algorithm loves.",
  },
  {
    num: "03",
    icon: Image,
    title: "Design Click-Worthy Thumbnails",
    desc: "Use proven design formulas — contrast, faces, bold text — that force viewers to click. A great thumbnail is your most powerful growth lever.",
  },
  {
    num: "04",
    icon: BarChart2,
    title: "Decode the Algorithm",
    desc: "Understand how watch time, CTR, and session velocity interact to determine whether YouTube recommends your content to millions.",
  },
  {
    num: "05",
    icon: DollarSign,
    title: "Start Monetizing",
    desc: "Unlock AdSense at 1,000 subscribers, then layer in memberships, sponsorships, and digital products for income that scales beyond views.",
  },
];

function StartHereSection() {
  return (
    <section id="start-here" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 mb-4">
            <Play className="w-3 h-3 text-brand-red fill-brand-red" />
            <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
              Beginner Roadmap
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-foreground mb-4">
            Start Here:{" "}
            <span className="text-brand-red">Your Growth Roadmap</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Five proven steps that take you from blank channel to growing,
            monetizing creator. Follow them in order.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="group relative bg-white border border-border rounded-xl p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                {/* Step number — large background */}
                <div className="absolute top-4 right-4 font-display text-6xl font-black text-foreground/5 leading-none select-none">
                  {step.num}
                </div>

                {/* Icon */}
                <div className="w-11 h-11 rounded-lg bg-brand-red/10 flex items-center justify-center mb-4 group-hover:bg-brand-red group-hover:shadow-red-glow transition-all duration-300">
                  <Icon className="w-5 h-5 text-brand-red group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Step badge */}
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-red text-white text-xs font-bold mb-3">
                  Step {step.num}
                </div>

                <h3 className="font-display text-lg font-bold text-foreground mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>

                {/* Hover arrow */}
                <div className="mt-4 flex items-center gap-1 text-brand-red text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-3 h-3" />
                </div>
              </motion.div>
            );
          })}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: STEPS.length * 0.1, duration: 0.4 }}
            className="bg-brand-dark rounded-xl p-6 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-red blur-3xl" />
            </div>
            <div className="relative z-10">
              <div className="w-11 h-11 rounded-lg bg-brand-red flex items-center justify-center mb-4 shadow-red-glow">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display text-xl font-black text-white mb-2">
                Ready to accelerate?
              </h3>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                Get the complete Viral Video Checklist — 47 action items used by
                top 1% creators.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("lead-capture")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="relative z-10 w-full px-5 py-3 bg-brand-red text-white font-bold text-sm rounded-md shadow-red-glow hover:bg-brand-red-bright transition-all"
            >
              Get Free Checklist →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   RESOURCE GRID
   ============================================================ */
const RESOURCES = [
  {
    id: "seo",
    ocidCard: "resource.seo.card",
    ocidBtn: "resource.seo.button",
    icon: Search,
    title: "SEO Tools",
    subtitle: "Find what people search for",
    desc: "Keyword research, tag optimization, and search ranking tools that surface your videos to the exact audience looking for your content.",
    tags: ["Keyword Research", "Tag Optimizer", "Rank Tracker"],
    accent: "bg-blue-500/10 text-blue-600",
  },
  {
    id: "thumbnail",
    ocidCard: "resource.thumbnail.card",
    ocidBtn: "resource.thumbnail.button",
    icon: Image,
    title: "Thumbnail Design",
    subtitle: "Stop the scroll, earn the click",
    desc: "Free Canva templates, A/B testing tools, and psychological design frameworks that consistently double click-through rates.",
    tags: ["Canva Templates", "A/B Testing", "CTR Analyzer"],
    accent: "bg-orange-500/10 text-orange-600",
  },
  {
    id: "equipment",
    ocidCard: "resource.equipment.card",
    ocidBtn: "resource.equipment.button",
    icon: Camera,
    title: "Equipment",
    subtitle: "Look & sound professional",
    desc: "Camera, lighting, and microphone recommendations curated by budget — from under $200 to full professional studio setups.",
    tags: ["Cameras", "Lighting Kits", "Microphones"],
    accent: "bg-green-500/10 text-green-600",
  },
];

function ResourcesSection() {
  return (
    <section id="resources" className="py-24 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 mb-4">
            <Star className="w-3 h-3 text-brand-red" />
            <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
              Creator Toolkit
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-foreground mb-4">
            Essential <span className="text-brand-red">Resources</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Everything you need to research, design, and produce content that
            ranks and converts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESOURCES.map((res, i) => {
            const Icon = res.icon;
            return (
              <motion.div
                key={res.id}
                data-ocid={res.ocidCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
                className="group relative bg-white rounded-xl border border-border overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top color accent bar */}
                <div
                  className="h-0.5 w-full"
                  style={{ background: "oklch(0.48 0.245 25.5)" }}
                />

                <div className="p-6">
                  <div
                    className={`w-12 h-12 rounded-xl ${res.accent} flex items-center justify-center mb-5`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display text-xl font-black text-foreground mb-1">
                    {res.title}
                  </h3>
                  <p className="text-xs font-semibold text-brand-red uppercase tracking-wider mb-3">
                    {res.subtitle}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {res.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {res.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button
                    data-ocid={res.ocidBtn}
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red transition-all duration-300 font-bold"
                    onClick={() =>
                      document
                        .getElementById("blog")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Explore {res.title}
                    <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   LEAD CAPTURE FORM
   ============================================================ */
function LeadCaptureSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const submitLead = useSubmitLead();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim() || !email.trim()) {
        toast.error("Please fill in your name and email.");
        return;
      }
      try {
        await submitLead.mutateAsync({
          name: name.trim(),
          email: email.trim(),
        });
        toast.success("🎉 Checklist sent! Check your inbox.");
        setName("");
        setEmail("");
      } catch {
        toast.error("Something went wrong. Please try again.");
      }
    },
    [name, email, submitLead],
  );

  const isSuccess = submitLead.isSuccess;
  const isError = submitLead.isError;
  const isPending = submitLead.isPending;

  return (
    <section
      id="lead-capture"
      className="relative py-24 bg-brand-dark overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-brand-red/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 0.1) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-red shadow-red-glow-lg mb-6">
            <Mail className="w-7 h-7 text-white" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-4">
            Get Your Free{" "}
            <span className="text-brand-red text-shadow-red">
              Viral Checklist
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-3">
            47 battle-tested action items that every viral video has in common.
            Used by 50,000+ creators. Yours free — no strings.
          </p>

          {/* Checklist preview bullets */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[
              "Algorithm-optimized titles",
              "CTR thumbnail checklist",
              "First 30-second hook formula",
              "End screen & card strategy",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-1.5 text-sm text-white/60"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-lg mx-auto backdrop-blur-sm"
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                data-ocid="lead.success_state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-6"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="font-display text-xl font-black text-white">
                  You&apos;re in!
                </h3>
                <p className="text-white/60 text-sm">
                  Your Viral Checklist is on its way. Check your inbox!
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div className="text-left">
                  <label
                    htmlFor="lead-name"
                    className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1.5 block"
                  >
                    Your Name
                  </label>
                  <Input
                    id="lead-name"
                    data-ocid="lead.name.input"
                    type="text"
                    placeholder="e.g. Alex Johnson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isPending}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-brand-red focus:ring-brand-red/20 h-12"
                  />
                </div>

                <div className="text-left">
                  <label
                    htmlFor="lead-email"
                    className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1.5 block"
                  >
                    Email Address
                  </label>
                  <Input
                    id="lead-email"
                    data-ocid="lead.email.input"
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isPending}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-brand-red focus:ring-brand-red/20 h-12"
                  />
                </div>

                {/* Error state */}
                {isError && (
                  <div
                    data-ocid="lead.error_state"
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                  >
                    <X className="w-4 h-4 flex-shrink-0" />
                    Something went wrong. Please try again.
                  </div>
                )}

                <Button
                  data-ocid="lead.submit_button"
                  type="submit"
                  disabled={isPending}
                  className="h-12 bg-brand-red hover:bg-brand-red-bright text-white font-bold text-base shadow-red-glow hover:shadow-red-glow-lg transition-all duration-200 border-0"
                >
                  {isPending ? (
                    <span
                      data-ocid="lead.loading_state"
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending your checklist…
                    </span>
                  ) : (
                    <>
                      Send Me the Free Checklist
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-white/30 text-center">
                  No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   BLOG SECTION
   ============================================================ */
const BLOG_CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Algorithm Updates", value: "Algorithm Updates" },
  { label: "Monetization", value: "Monetization" },
  { label: "Gear Reviews", value: "Gear Reviews" },
];

const CATEGORY_BADGE_COLORS: Record<string, string> = {
  "Algorithm Updates": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Monetization: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  "Gear Reviews": "bg-green-500/10 text-green-600 border-green-500/20",
};

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      data-ocid={`blog.item.${index + 1}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={
            post.imageUrl || "/assets/generated/blog-algorithm.dim_800x450.jpg"
          }
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
              CATEGORY_BADGE_COLORS[post.category] ??
              "bg-brand-red/10 text-brand-red border-brand-red/20"
            }`}
          >
            {post.category}
          </span>
          <span className="text-xs text-muted-foreground">{post.date}</span>
        </div>

        <h3 className="font-display text-base font-black text-foreground mb-2 leading-tight line-clamp-2 group-hover:text-brand-red transition-colors">
          {post.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
          {post.excerpt}
        </p>

        <button
          type="button"
          className="flex items-center gap-1.5 text-sm font-bold text-brand-red hover:gap-2.5 transition-all duration-200 mt-auto"
        >
          Read More <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.article>
  );
}

function BlogSection() {
  const [activeTab, setActiveTab] = useState("all");

  const allPostsQuery = useGetPosts();
  const categoryQuery = useGetPostsByCategory(
    activeTab !== "all" ? activeTab : "",
  );

  let posts: BlogPost[] = [];
  let isLoading = false;

  if (activeTab === "all") {
    posts =
      allPostsQuery.data && allPostsQuery.data.length > 0
        ? allPostsQuery.data
        : SAMPLE_POSTS;
    isLoading = allPostsQuery.isLoading;
  } else {
    const filtered =
      categoryQuery.data && categoryQuery.data.length > 0
        ? categoryQuery.data
        : SAMPLE_POSTS.filter((p) => p.category === activeTab);
    posts = filtered;
    isLoading = categoryQuery.isLoading;
  }

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 mb-4">
            <TrendingUp className="w-3 h-3 text-brand-red" />
            <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
              Creator Blog
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-foreground mb-2">
                Latest Strategies{" "}
                <span className="text-brand-red">&amp; Insights</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Deep dives, case studies, and breakdowns from top creators.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {BLOG_CATEGORIES.map((cat) => {
            const ocid =
              cat.value === "all"
                ? "blog.tab.all"
                : cat.value === "Algorithm Updates"
                  ? "blog.tab.algorithm"
                  : cat.value === "Monetization"
                    ? "blog.tab.monetization"
                    : "blog.tab.gear";
            return (
              <button
                key={cat.value}
                type="button"
                data-ocid={ocid}
                onClick={() => setActiveTab(cat.value)}
                className={`px-5 py-2 text-sm font-bold rounded-full transition-all duration-200 ${
                  activeTab === cat.value
                    ? "bg-brand-red text-white shadow-red-glow"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/70"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Posts grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              data-ocid="blog.loading_state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-border rounded-xl overflow-hidden"
                >
                  <Skeleton className="aspect-video w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : posts.length === 0 ? (
            <motion.div
              key="empty"
              data-ocid="blog.empty_state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                No posts yet in this category
              </h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                Check back soon — fresh content drops weekly.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {posts.map((post, i) => (
                <BlogCard key={post.id.toString()} post={post} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  const currentYear = new Date().getFullYear();
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-red rounded-lg flex items-center justify-center shadow-red-glow">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-display text-xl font-black text-white">
                YouTube Growth Mastery
                <span className="text-brand-red">.</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-5">
              The definitive resource for creators who want to grow faster,
              monetize smarter, and build a lasting audience on YouTube.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["A", "J", "M", "S"].map((letter) => (
                  <div
                    key={letter}
                    className="w-8 h-8 rounded-full bg-brand-red/20 border-2 border-brand-dark flex items-center justify-center text-xs font-bold text-brand-red"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <span className="text-xs text-white/40">
                50,000+ creators growing with us
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-black text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", id: "hero" },
                { label: "Start Here", id: "start-here" },
                { label: "Resources", id: "resources" },
                { label: "Blog", id: "blog" },
                { label: "Free Checklist", id: "lead-capture" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-sm font-black text-white uppercase tracking-wider mb-4">
              Topics
            </h4>
            <ul className="space-y-2.5">
              {[
                "Algorithm Updates",
                "Monetization",
                "Gear Reviews",
                "SEO Tools",
                "Thumbnail Design",
              ].map((topic) => (
                <li key={topic}>
                  <button
                    type="button"
                    onClick={() => scrollTo("blog")}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {topic}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {currentYear} YouTube Growth Mastery. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/30 hover:text-white/50 transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   APP ROOT
   ============================================================ */
export default function App() {
  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <Navbar />
      <main>
        <HeroSection />
        <StartHereSection />
        <ResourcesSection />
        <LeadCaptureSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}
