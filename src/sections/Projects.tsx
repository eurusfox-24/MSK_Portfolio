import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'IoT Biometric Pulse & Oxygen Tracker',
    description: 'Developed a biometric monitoring system using a Raspberry Pi and a Pulse Oximeter sensor to capture and analyze real-time heart rate and oxygen saturation (SpO₂) data.',
    image: 'images/BiometricSensorProj.jpeg',
    tags: ['Raspberry Pi', 'IoT', 'Python', 'Sensors'],
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    id: 2,
    title: 'Adaptive Seismic Alert System',
    description: 'Successfully pivoted from a sign-language translation glove to a functional earthquake detector in under 48 hours after hardware failure. Re-engineered motion sensors and hardware logic to meet presentation requirements.',
    image: 'images/earthquakeDetector.jpeg',
    tags: ['Hardware', 'Arduino', 'C++', 'Rapid Prototyping'],
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: 3,
    title: 'Projekti Honeypot',
    description: 'Led a team of six to architect a multi-node honeynet using Cowrie, Suricata, and OpenWrt, conducting a full-scale Red Team/Blue Team simulation to analyze real-time intrusion detection and adversary behavior.',
    image: 'images/honeyPot.jpeg',
    tags: ['Cybersecurity', 'Honeypot', 'Suricata', 'Team Lead'],
    color: 'from-red-500/20 to-orange-500/20',
  },
];

export default function Projects() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    const cards = sectionRef.current?.querySelectorAll('.project-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-16 lg:py-24"
    >
      {/* Decorative Line */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10 lg:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-cyber-green/50" />
            <span className="font-mono text-xs text-cyber-green/60 tracking-widest">
              FEATURED WORK
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Projects
          </h2>
          <p className="mt-3 text-white/50 max-w-2xl text-sm sm:text-base">
            A collection of hands-on technical projects demonstrating expertise in IoT, 
            cybersecurity, and rapid hardware prototyping.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isVisible={visibleCards.includes(index)}
            />
          ))}
        </div>


      </div>
    </section>
  );
}

// Project Card Component
function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: typeof projects[0];
  index: number;
  isVisible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      data-index={index}
      className={`project-card group relative transition-all duration-700 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Glow */}
      <div 
        className={`absolute -inset-0.5 bg-gradient-to-r ${project.color} rounded-xl blur-lg transition-opacity duration-500 ${
          isHovered ? 'opacity-50' : 'opacity-0'
        }`}
      />

      {/* Card Content */}
      <div className="relative h-full bg-cyber-dark rounded-xl border border-white/10 overflow-hidden hover:border-cyber-green/30 transition-all duration-500">
        {/* Image Container */}
        <div className="relative h-40 sm:h-44 overflow-hidden">
          <div 
            className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-40`}
          />
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
          {/* Overlay */}
          <div className={`absolute inset-0 bg-cyber-black/50 transition-opacity duration-300 ${
            isHovered ? 'opacity-30' : 'opacity-50'
          }`} />

          {/* Quick Action */}
          <div className={`absolute top-3 right-3 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
          }`}>
            <button className="w-7 h-7 bg-cyber-black/80 backdrop-blur-sm rounded-md flex items-center justify-center border border-white/10 hover:border-cyber-green/50 transition-all duration-300">
              <ExternalLink className="w-3.5 h-3.5 text-white/70" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-3">
          <h3 className="font-heading text-base sm:text-lg font-semibold text-white group-hover:text-cyber-green transition-colors duration-300 line-clamp-2">
            {project.title}
          </h3>
          <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-mono text-white/40 bg-white/5 rounded border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Accent */}
        <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-green/50 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>
    </div>
  );
}
