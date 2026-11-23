"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, Briefcase, Check, Code2, Download, ExternalLink, GitBranch, GraduationCap, Mail, Menu, Terminal, X } from "lucide-react";
import { projects } from "@/data/projects";

const nav = ["Home","About","Skills","Projects","Experience","Contact"];
const social = { github:"https://github.com/AR-BeGiNnErDeVElOpEr", linkedin:"https://www.linkedin.com/in/ammar-riaz-a61821278/", email:"ammarriaz8662@gmail.com" };

function Reveal({ children, delay=0 }: { children: React.ReactNode; delay?:number }) {
  return <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-80px"}} transition={{duration:.65,delay,ease:[.2,.8,.2,1]}}>{children}</motion.div>;
}

export function Portfolio() {
  const [menu,setMenu]=useState(false);
  const [entered,setEntered]=useState(false);
  const [exploring,setExploring]=useState(false);
  const [resumeUrl,setResumeUrl]=useState("/Ammar-Riaz-Resume.pdf");
  const [resumeName,setResumeName]=useState("Ammar-Riaz-Resume.pdf");
  const [resumeStatus,setResumeStatus]=useState("");
  const [active,setActive]=useState("Home");
  const [scrolled,setScrolled]=useState(false);
  const [filter,setFilter]=useState("All Projects");
  const [repos,setRepos]=useState<Array<{name:string;description:string|null;language:string|null;html_url:string}>>([]);
  const [repoError,setRepoError]=useState("");
  const [typing,setTyping]=useState("");
  const roles=["MERN Stack Developer","Full-Stack Developer","React Developer","Frontend Developer"];
  const { scrollYProgress }=useScroll();

  useEffect(()=>{ const onScroll=()=>setScrolled(window.scrollY>20); onScroll(); window.addEventListener("scroll",onScroll); return()=>window.removeEventListener("scroll",onScroll); },[]);
  useEffect(()=>{ let role=0,char=0,forward=true; const tick=()=>{const text=roles[role]; if(forward){char++; if(char>text.length){forward=false; setTimeout(tick,1200); return;} }else{char--; if(char===0){forward=true;role=(role+1)%roles.length;}} setTyping(text.slice(0,char));}; const timer=setInterval(tick,80); return()=>clearInterval(timer); },[]);
  useEffect(()=>{fetch("https://api.github.com/users/AR-BeGiNnErDeVElOpEr/repos?sort=updated&per_page=6").then(r=>{if(!r.ok) throw new Error("GitHub repositories are temporarily unavailable.");return r.json();}).then(setRepos).catch((e)=>setRepoError(e.message));},[]);

  useEffect(()=>{
    const sections=nav.map(name=>document.getElementById(name==="Experience"?"experience":name.toLowerCase())).filter((section):section is HTMLElement=>Boolean(section));
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(visible?.target.id){
        const name=visible.target.id==="experience"?"Experience":visible.target.id[0].toUpperCase()+visible.target.id.slice(1);
        setActive(name);
      }
    },{rootMargin:"-30% 0px -55% 0px",threshold:[0,.15,.35,.65]});
    sections.forEach(section=>observer.observe(section));
    return()=>observer.disconnect();
  },[entered]);

  const enterPortfolio = () => {
    if (exploring) return;
    setExploring(true);
    window.setTimeout(() => {
      setEntered(true);
      window.setTimeout(() => document.getElementById("home")?.scrollIntoView({behavior:"smooth"}), 100);
    }, 650);
  };

  const updateResume = async (file: File) => {
    if (file.type !== "application/pdf") {
      setResumeStatus("Please select a PDF file.");
      return;
    }
    setResumeStatus("Updating...");
    const form = new FormData();
    form.append("resume", file);
    try {
      const response = await fetch("/api/resume", {method:"POST", body:form});
      if (!response.ok) throw new Error("Upload failed");
      const result = await response.json();
      setResumeUrl(`${result.url}?v=${Date.now()}`);
      setResumeName(file.name);
      setResumeStatus("Resume updated.");
    } catch {
      setResumeStatus("Could not update resume.");
    }
  };

  const visible=projects.filter(p=>filter==="All Projects"||p.category===filter);
  const skillGroups=[
    ["Programming / Web",["HTML5","CSS3","JavaScript","TypeScript","C#"]],
    ["Frontend",["React","Tailwind CSS","Bootstrap","Material UI","Responsive Web Design","UI/UX"]],
    ["Backend",["Node.js","Express.js"]],
    ["Database",["MongoDB","SQL","Firebase"]],
    ["Mobile",["Flutter","Dart","GetX"]],
    ["Tools",["Git","GitHub","VS Code","Android Studio","Cursor","npm","Chrome DevTools","Figma"]],
  ];
  const firstMarquee=[
    ["HTML5","html5/html5-original"],["CSS3","css3/css3-original"],["JavaScript","javascript/javascript-original"],["TypeScript","typescript/typescript-original"],["React","react/react-original"],["Tailwind CSS","tailwindcss/tailwindcss-original"],["Bootstrap","bootstrap/bootstrap-original"],["Material UI","materialui/materialui-original"]
  ];
  const secondMarquee=[
    ["Node.js","nodejs/nodejs-original"],["Express.js","express/express-original"],["MongoDB","mongodb/mongodb-original"],["SQL","mysql/mysql-original"],["Firebase","firebase/firebase-original"],["Flutter","flutter/flutter-original"],["Git","git/git-original"],["GitHub","github/github-original"],["Figma","figma/figma-original"],["C#","csharp/csharp-original"]
  ];

  return (
    <>
      <AnimatePresence>
        {!entered && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-[#08090d]"
            initial={{opacity:1}}
            exit={{opacity:0,scale:1.04}}
            transition={{duration:.8,ease:[.22,1,.36,1]}}
          >
            <motion.div
              className="intro-grid absolute inset-0"
              animate={exploring ? {opacity:0,scale:1.12} : {opacity:1,scale:1}}
              transition={{duration:.65}}
            />
            <motion.div
              className="intro-content relative z-10 flex max-w-5xl flex-col items-center px-5 text-center"
              animate={exploring ? {opacity:0,y:-20,scale:.96} : {opacity:1,y:0,scale:1}}
              transition={{duration:.45}}
            >
              <motion.div
                className="code-symbol mb-6 sm:mb-8"
                animate={{y:[0,-8,0],scale:[1,1.025,1]}}
                transition={{duration:3.2,repeat:Infinity,ease:"easeInOut"}}
              >
                <Code2 className="h-[clamp(72px,8vw,112px)] w-[clamp(72px,8vw,112px)] text-violet-200" strokeWidth={1.35}/>
              </motion.div>
              <h1 className="whitespace-nowrap text-[clamp(42px,7.2vw,104px)] leading-[1] font-semibold tracking-[-.065em]">
                <span className="code-metallic">Code it,</span>{" "}
                <span className="build-metallic">Build It</span>
              </h1>
              <button
                type="button"
                onClick={enterPortfolio}
                className="explore-fill mt-9 h-14 rounded-full border border-white/10 px-8 text-sm font-semibold text-[#11131b] shadow-[0_16px_50px_rgba(139,92,246,.18)]"
              >
                Explore My Work
              </button>
              <button
                type="button"
                onClick={enterPortfolio}
                aria-label="Enter portfolio"
                className="mt-8 grid h-[52px] w-[52px] place-items-center rounded-full border border-white/12 bg-[#11131b]/85 text-violet-300 shadow-[0_12px_40px_rgba(0,0,0,.4)] transition hover:border-violet-400/50"
              >
                <motion.span animate={{y:[0,6,0]}} transition={{duration:1.5,repeat:Infinity,ease:"easeInOut"}}>
                  <ArrowDown size={18}/>
                </motion.span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div style={{scaleX:scrollYProgress}} className="fixed z-[60] left-0 top-0 h-[2px] w-full origin-left bg-violet-500"/>
      <nav className={`fixed z-50 left-0 top-0 w-full transition-all duration-700 ${entered?"translate-y-0 opacity-100":"pointer-events-none -translate-y-5 opacity-0"} ${scrolled?"border-b border-white/8 bg-[#08090d]/85 backdrop-blur-xl":"bg-transparent"}`}>
        <div className="container relative grid h-20 grid-cols-[60px_1fr_120px] items-center">
        <a href="#home" className="grid h-10 w-10 place-items-center rounded-xl border border-violet-400/25 bg-violet-500/10 font-bold text-violet-300">AR</a>
        <div className="hidden items-center justify-center gap-7 lg:flex">{nav.map(item=>{const id=item.toLowerCase()==="experience"?"experience":item.toLowerCase();return <a key={item} href={`#${id}`} onClick={()=>setActive(item)} className={`text-sm transition ${active===item?"text-white":"text-[#9295a3] hover:text-white"}`}>{item}</a>;})}</div>
          <div className="hidden items-center gap-2 lg:flex">
            <a href="#contact" className="lets-talk rounded-full px-5 py-2.5 text-sm font-semibold">Let&apos;s talk</a>
          </div>
          <button onClick={()=>setMenu(v=>!v)} className="p-2 lg:hidden" aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button>
        </div>
        <AnimatePresence>{menu&&<motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden border-t border-white/8 bg-[#08090d] lg:hidden"><div className="container flex flex-col py-5">{nav.map(item=><a key={item} href={`#${item.toLowerCase()}`} onClick={()=>setMenu(false)} className="border-b border-white/5 py-4">{item}</a>)}</div></motion.div>}</AnimatePresence>
      </nav>

      <main>
        <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
          <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-700/10 blur-[120px]"/>
          <div className="container grid items-center gap-12 py-16 lg:grid-cols-[1.12fr_.88fr]">
            <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
              <p className="eyebrow mb-5">Hello, I&apos;m</p>
              <h1 className="text-[clamp(54px,9vw,112px)] leading-[.84] font-semibold tracking-[-.065em]">Ammar<br/><span className="text-[#aaa0c7]">Riaz</span></h1>
              <div className="mt-7 flex h-8 items-center text-lg text-violet-300 sm:text-xl"><Terminal size={18} className="mr-3"/><span>{typing}</span><span className="ml-1 w-px animate-pulse bg-violet-300">&nbsp;</span></div>
              <p className="muted mt-6 max-w-xl text-lg leading-8">I build responsive web applications and modern digital experiences, combining clean frontend interfaces with powerful backend functionality.</p>
              <div className="mt-8 flex flex-wrap gap-3"><a href="#projects" className="rounded-full bg-violet-600 px-6 py-3.5 text-sm font-semibold shadow-[0_12px_40px_rgba(124,58,237,.25)] transition hover:-translate-y-1">View My Projects</a><a href={resumeUrl} download={resumeName} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3.5 text-sm font-semibold hover:border-violet-400/40"><Download size={16}/> Download Resume</a><label className="cursor-pointer rounded-full px-5 py-3.5 text-sm text-violet-300 border border-violet-400/20 hover:border-violet-400/50">Update Resume<input type="file" accept="application/pdf" className="hidden" onChange={(event)=>event.target.files?.[0]&&updateResume(event.target.files[0])}/></label><a href="#contact" className="rounded-full px-5 py-3.5 text-sm text-[#aaaabd] hover:text-white">Contact Me</a></div>
              {resumeStatus&&<p className="mt-3 text-xs text-violet-300" role="status">{resumeStatus}</p>}
              <div className="mt-9 flex gap-5"><a href={social.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitBranch size={20}/></a><a href={social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-sm font-bold">in</a><a href={`mailto:${social.email}`} aria-label="Email"><Mail size={20}/></a></div>
            </motion.div>
            <motion.div initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{duration:.9,delay:.15}} className="relative">
              <div className="glass relative mx-auto aspect-[4/5] max-w-[440px] rounded-[32px] p-3">
                <div className="absolute inset-3 overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_50%_25%,#5b21b6_0,#17142a_34%,#0c0d13_74%)]">
                  <div className="absolute left-1/2 top-24 h-48 w-48 -translate-x-1/2 rounded-full border border-violet-300/20 bg-violet-400/10"/>
                  <motion.div
                    animate={{rotate:360}}
                    transition={{duration:18,repeat:Infinity,ease:"linear"}}
                    className="absolute left-1/2 top-[92px] h-56 w-56 -translate-x-1/2 rounded-full border border-dashed border-violet-300/25"
                  >
                    <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 rounded-full bg-violet-300 shadow-[0_0_18px_#a78bfa]"/>
                  </motion.div>
                  <Code2 className="absolute left-1/2 top-[155px] h-24 w-24 -translate-x-1/2 text-violet-200/80"/>
                  <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-[#08090d]/82 p-4 font-mono text-xs backdrop-blur-md">
                    <div className="mb-3 flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-red-400"/><i className="h-2.5 w-2.5 rounded-full bg-yellow-400"/><i className="h-2.5 w-2.5 rounded-full bg-green-400"/></div>
                    <p><span className="text-violet-400">const</span> developer = {"{"}</p><p className="pl-4">name: <span className="text-green-300">&quot;Ammar Riaz&quot;</span>,</p><p className="pl-4">focus: <span className="text-green-300">&quot;Full-Stack&quot;</span></p><p>{"}"}</p>
                  </div>
                </div>
              </div>
              {["React","Node","Flutter"].map((tech,i)=><motion.div key={tech} animate={{y:[0,-10,0]}} transition={{duration:3+i*.3,repeat:Infinity}} className="absolute rounded-xl border border-white/10 bg-[#11131b]/95 px-3 py-2 text-xs shadow-xl" style={{top:[15,65,82][i]+"%",left:[-8,78,-3][i]+"%"}}>{tech}</motion.div>)}
            </motion.div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container grid gap-12 lg:grid-cols-[.95fr_1.05fr]">
            <Reveal><p className="eyebrow">01 / About</p><h2 className="section-title">About Me</h2><p className="muted leading-8">I am a Computer Science graduate from Air University Islamabad with practical experience in frontend and full-stack web development. During my internship at Apexcify Technologies, I worked on responsive client websites, frontend debugging, RESTful APIs, and backend integrations. I enjoy learning new technologies and transforming ideas into functional applications.</p></Reveal>
            <Reveal delay={.1}><div className="glass rounded-3xl p-7"><GraduationCap className="mb-5 text-violet-400"/><p className="text-sm text-violet-300">2022–2026</p><h3 className="mt-2 text-2xl font-semibold">Bachelor of Science in Computer Science</h3><p className="muted mt-2">Air University Islamabad</p></div></Reveal>
          </div>
        </section>

        <section id="skills" className="section border-y border-white/5">
          <div className="container"><Reveal><p className="eyebrow">02 / Skills</p><h2 className="section-title">Technologies I Work With</h2></Reveal><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{skillGroups.map(([group,items],i)=>{const list=items as string[];return <Reveal key={group as string} delay={i*.05}><motion.article whileHover={{y:-8}} transition={{duration:.25,ease:"easeOut"}} className="skill-category glass h-full rounded-2xl p-5"><h3 className="mb-4 text-sm font-semibold text-violet-300">{group}</h3><div className="flex flex-wrap gap-2">{list.map(item=><span key={item} className="skill-tag rounded-lg px-2.5 py-1.5 text-xs text-[#bbbcca]">{item}</span>)}</div></motion.article></Reveal>;})}</div></div>
          <div className="skill-marquees mt-16">
            <div className="marquee-track">
              {[...firstMarquee,...firstMarquee].map(([name,slug],i)=>(
                <div key={`first-${i}`} className="marquee-card">
                  <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}.svg`} alt="" width="34" height="34" loading="lazy"/>
                  <span>{name}</span>
                </div>
              ))}
            </div>
            <div className="marquee-track reverse">
              {[...secondMarquee,...secondMarquee].map(([name,slug],i)=>(
                <div key={`second-${i}`} className="marquee-card">
                  <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}.svg`} alt="" width="34" height="34" loading="lazy"/>
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container"><Reveal><p className="eyebrow">03 / Work</p><h2 className="section-title">Featured Projects</h2><p className="muted">Explore some of my web development and application projects.</p></Reveal>
            <div className="mt-8 flex flex-wrap gap-2">{["All Projects","Web Applications","Frontend Development","Mobile Applications"].map(name=><button key={name} onClick={()=>setFilter(name)} className={`rounded-full border px-4 py-2 text-sm transition ${filter===name?"border-violet-400/50 bg-violet-500/15 text-violet-200":"border-white/8 text-[#9699a7]"}`}>{name}</button>)}</div>
            <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2">{visible.map((project,i)=><motion.article layout key={project.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*.06}} className="glass group overflow-hidden rounded-3xl"><Link href={`/projects/${project.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-[#10121a]"><Image src={project.image} alt={`${project.title} project screenshot or labeled preview`} fill className="object-cover transition duration-700 group-hover:scale-[1.04]" sizes="(max-width:768px) 100vw, 50vw"/></Link><div className="p-6"><p className="text-xs text-violet-300">{project.category}</p><h3 className="mt-2 text-2xl font-semibold"><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p className="muted mt-3 min-h-16 text-sm leading-6">{project.description}</p><div className="mt-4 flex flex-wrap gap-2">{project.technologies.map(t=><span key={t} className="rounded-full border border-white/8 px-2.5 py-1 text-xs text-[#aaaabd]">{t}</span>)}</div><div className="mt-6 flex flex-wrap gap-4 text-sm">{project.liveUrl&&<a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-violet-300"><ExternalLink size={15}/> Live Demo</a>}{project.githubUrl&&<a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-violet-300"><GitBranch size={15}/> GitHub</a>}<Link href={`/projects/${project.slug}`} className="ml-auto text-violet-300">Case Study →</Link></div></div></motion.article>)}</motion.div>
            {filter==="Mobile Applications"&&<p className="muted mt-8 text-center">More mobile application projects coming soon.</p>}
          </div>
        </section>

        <section id="experience" className="section">
          <div className="container"><Reveal><p className="eyebrow">04 / Experience</p><h2 className="section-title">Professional Experience</h2></Reveal><Reveal delay={.1}><div className="relative mt-10 border-l border-violet-400/30 pl-8"><div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_20px_#8b5cf6]"/><div className="glass rounded-3xl p-7"><div className="flex flex-wrap justify-between gap-3"><div><p className="text-violet-300">Apexcify Technologies</p><h3 className="mt-1 text-2xl font-semibold">Junior Developer</h3></div><p className="text-sm text-[#a6a8b5]">August 2025 – September 2025<br/>Remote Internship</p></div><ul className="mt-6 grid gap-3 sm:grid-cols-2">{["Built and updated client websites using HTML, CSS, JavaScript, and React.","Supported backend integrations using Node.js and Express.","Debugged frontend components using browser DevTools.","Resolved cross-browser compatibility issues.","Delivered responsive, cross-device-compatible interfaces.","Implemented RESTful APIs for internal tools using Node.js.","Maintained stable development environments and resolved technical issues."].map(x=><li key={x} className="muted flex gap-2 text-sm"><Check size={16} className="mt-1 shrink-0 text-violet-400"/>{x}</li>)}</ul><div className="mt-6 flex flex-wrap gap-2">{["HTML","CSS","JavaScript","React","Node.js","Express.js","REST APIs","Chrome DevTools"].map(t=><span key={t} className="rounded-full bg-violet-400/8 px-3 py-1.5 text-xs text-violet-200">{t}</span>)}</div></div></div></Reveal></div>
        </section>

        <section id="github" className="section border-y border-white/5">
          <div className="container"><Reveal><p className="eyebrow">05 / GitHub</p><h2 className="section-title">Explore My GitHub</h2></Reveal><div className="mt-8 grid gap-5 lg:grid-cols-[280px_1fr]"><a href={social.github} target="_blank" rel="noreferrer" className="glass rounded-3xl p-7"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-violet-500/15"><GitBranch/></div><h3 className="mt-5 text-xl font-semibold">@AR-BeGiNnErDeVElOpEr</h3><p className="muted mt-2 text-sm">View GitHub profile</p></a><div className="grid gap-3 sm:grid-cols-2">{repoError?<p className="muted">{repoError}</p>:repos.map(repo=><a href={repo.html_url} target="_blank" rel="noreferrer" key={repo.name} className="glass rounded-2xl p-5 transition hover:border-violet-400/30"><h3 className="font-semibold">{repo.name}</h3><p className="muted mt-2 line-clamp-2 text-sm">{repo.description||"No description provided."}</p>{repo.language&&<p className="mt-4 text-xs text-violet-300">{repo.language}</p>}</a>)}</div></div></div>
        </section>

        <section id="contact" className="section">
          <div className="container grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><Reveal><p className="eyebrow">06 / Contact</p><h2 className="section-title">Let&apos;s Work Together</h2><p className="muted leading-7">Have a project in mind or looking for a developer? Feel free to get in touch.</p><div className="mt-8 space-y-4 text-sm"><a className="flex items-center gap-3" href={`mailto:${social.email}`}><Mail size={18} className="text-violet-400"/>{social.email}</a><a className="flex items-center gap-3" href={social.github} target="_blank" rel="noreferrer"><GitBranch size={18} className="text-violet-400"/>GitHub</a><a className="flex items-center gap-3" href={social.linkedin} target="_blank" rel="noreferrer"><Briefcase size={18} className="text-violet-400"/>LinkedIn</a></div></Reveal>
            <Reveal delay={.1}><ContactForm/></Reveal>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
}

function ContactForm() {
  const [status,setStatus]=useState<"idle"|"loading"|"success"|"error">("idle");
  const [values,setValues]=useState({name:"",email:"",subject:"",message:""});
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    if(!values.name||!values.email.includes("@")||!values.subject||values.message.length<10){setStatus("error");return;}
    setStatus("loading");
    try {
      const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(values)});
      if(!response.ok){
        const result=await response.json();
        if(response.status===503){
          const subject=encodeURIComponent(values.subject);
          const body=encodeURIComponent(`From: ${values.name} <${values.email}>\n\n${values.message}`);
          window.location.href=`mailto:ammarriaz8662@gmail.com?subject=${subject}&body=${body}`;
          setStatus("success");
          setValues({name:"",email:"",subject:"",message:""});
          return;
        }
        throw new Error(result.error||"Unable to send message");
      }
      setStatus("success");
      setValues({name:"",email:"",subject:"",message:""});
    }catch{
      setStatus("error");
    }
  }
  return <form onSubmit={submit} className="glass rounded-3xl p-6 sm:p-8"><div className="grid gap-5 sm:grid-cols-2">{[{name:"name",label:"Name",type:"text"},{name:"email",label:"Email",type:"email"},{name:"subject",label:"Subject",type:"text"}].map(field=><label key={field.name} className={field.name==="subject"?"sm:col-span-2":""}><span className="mb-2 block text-sm text-[#aaaabd]">{field.label}</span><input required type={field.type} value={values[field.name as keyof typeof values]} onChange={e=>setValues(v=>({...v,[field.name]:e.target.value}))} className="w-full rounded-xl border border-white/8 bg-[#090a10] px-4 py-3 outline-none transition focus:border-violet-400/50"/></label>)}</div><label className="mt-5 block"><span className="mb-2 block text-sm text-[#aaaabd]">Message</span><textarea required rows={5} value={values.message} onChange={e=>setValues(v=>({...v,message:e.target.value}))} className="w-full resize-none rounded-xl border border-white/8 bg-[#090a10] px-4 py-3 outline-none transition focus:border-violet-400/50"/></label><button disabled={status==="loading"} className="send-message mt-5 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold disabled:opacity-60">{status==="loading"?"Sending...":"Send Message"}</button>{status==="error"&&<p className="mt-4 text-sm text-red-300">Please complete all fields with a valid email and message.</p>}{status==="success"&&<p className="mt-4 text-sm text-green-300">Message sent or opened in your email application.</p>}</form>;
}

function Footer() {
  const [year,setYear]=useState("2026");
  useEffect(()=>setYear(String(new Date().getFullYear())),[]);
  return <footer className="border-t border-white/5 py-10"><div className="container flex flex-wrap items-end justify-between gap-6"><div><a href="#home" className="font-bold text-violet-300">AR.</a><p className="mt-2 text-sm text-[#858897]">Ammar Riaz · {year}</p></div><div className="flex items-center gap-6"><a href={social.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition hover:text-violet-300"><GitBranch size={24}/></a><a href={social.linkedin} target="_blank" rel="noreferrer" className="text-xl font-bold transition hover:text-violet-300">in</a><a href={`mailto:${social.email}`} aria-label="Email" className="transition hover:text-violet-300"><Mail size={24}/></a></div></div></footer>;
}
