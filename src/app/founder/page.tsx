'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Chatbot from '@/components/chatbot';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Hand, Rocket, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { motion, useScroll, useSpring } from 'framer-motion';

// --- (Your data arrays: journeyItems) ---
const journeyItems = [
    {
        title: 'K.R. Mangalam University (2024)',
        description: 'Began community and seed-level financial education. Tech team and community building, UI/UX designing, and basic application and system upgrades.'
    },
    {
        title: 'Java AI Workshop at KIET Ghaziabad',
        description: 'Interacting with more than 150+ students in a live session about future technologies and the basics of Java language.'
    },
    {
        title: 'IOT Workshop at KIET Kurukshetra',
        description: 'An engaging and hands-on session with 100+ students and faculties of the ECE department.'
    },
    {
        title: 'Felicitation L/S',
        description: 'Felicitation by the Optical Society & Photonics Society.'
    },
    {
        title: 'Spiritual Camp at ISKCON Gurugram',
        description: 'Experienced a spiritual awakening with my team.'
    },
    {
        title: 'Campus Ambassador Roles',
        description: 'Served as Campus Ambassador for leading brands like Coding Ninjas, Unstop, and GeeksforGeeks, and also led the Google Developer Student Club.'
    },
    {
        title: 'Founded TribexU Esports',
        description: 'Founded and led a team that won over 20+ official tournaments and are now recognized on global platforms, putting India on the esports map.'
    },
    {
        title: 'ABES Imports Collaboration',
        description: 'Collaborated with ABES Imports and Mr. Vinay Tyagi.'
    }
];

// UPDATED: Replaced placeholder data with your local image paths.
const partnerships = [
    { name: 'Blockchain Orbit', logoUrl: '/partner/comp/blockchain_rbit.jpg', hint: 'Blockchain Orbit logo', type: 'company' },
    { name: 'BNG Esports', logoUrl: '/partner/comp/BNG_Esports.jpg', hint: 'BNG Esports logo', type: 'company' },
    { name: 'Edutech Life', logoUrl: '/partner/comp/Edutech_life.jpg', hint: 'Edutech Life logo', type: 'company' },
    { name: 'Growbinar', logoUrl: '/partner/comp/Growbinar.jpg', hint: 'Growbinar logo', type: 'company' },
    { name: 'ISKCON Gurugram', logoUrl: '/partner/comp/iscon_gurugram.jpg', hint: 'ISKCON Gurugram logo', type: 'company' },
    { name: 'TechFest IIT Bombay', logoUrl: '/partner/comp/TechFest_IIT_BOMBAY.jpg', hint: 'TechFest IIT Bombay logo', type: 'company' },
    { name: 'K.R. Mangalam University', logoUrl: '/partner/uni/K_R_MANGALAM_UNIVERSITY.png', hint: 'K.R. Mangalam University logo', type: 'university' },
    { name: 'Manav Rachna University', logoUrl: '/partner/uni/MANAV_RACHNA_UNIVERSITY.png', hint: 'Manav Rachna University logo', type: 'university' }
];


const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};


function JourneyItem({ item, index }: { item: typeof journeyItems[0], index: number }) {
  const isEven = index % 2 === 0;

  const variants = {
    hidden: {
      opacity: 0,
      x: isEven ? 50 : -50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="flex items-center w-full mb-8 relative">
       {/* Timeline Dot */}
      <div className={cn("absolute w-4 h-4 bg-primary rounded-full z-10",
          isEven ? "left-[calc(50%+26px)]" : "right-[calc(50%+26px)]", "md:left-1/2 md:-translate-x-1/2"
      )}></div>

      <motion.div
        className={cn('w-full md:w-5/12', isEven ? 'md:ml-auto' : '')}
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <Card className="relative border-border/50 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
          <CardHeader>
            <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function JourneySection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });

    return (
        <motion.section
          id="journey"
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="py-16 md:py-24"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl font-headline mb-16">My Journey So Far</motion.h2>
                <div className="relative">
                    <div className="absolute left-4 md:left-1/2 w-0.5 h-full bg-border/30 md:-translate-x-1/2" style={{ transformOrigin: 'top' }}>
                      <motion.div className="bg-primary w-full h-full" style={{ scaleY }} />
                    </div>

                    <div className="space-y-4 md:space-y-0">
                      {journeyItems.map((item, index) => (
                          <JourneyItem key={index} item={item} index={index} />
                      ))}
                    </div>
                </div>
            </div>
        </motion.section>
    )
}


function PartnerMarquee({ title, partners }: { title: string; partners: (typeof partnerships) }) {
  if (!partners || partners.length === 0) return null;

  return (
    <div className="mt-12 md:mt-16">
       <h3 className="text-2xl font-bold tracking-tight text-center text-foreground sm:text-3xl font-headline">{title}</h3>
      <div
        className="mt-8 relative m-auto w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[50px] md:before:w-[100px] before:bg-[linear-gradient(to_right,hsl(var(--card))_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[50px] md:after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,hsl(var(--card))_0%,rgba(255,255,255,0)_100%)] after:content-['']"
      >
        <div className="animate-scroll flex gap-8">
          {[...partners, ...partners].map((partner, index) => (
             <Dialog key={`${partner.name}-${index}`}>
              <DialogTrigger asChild>
                <motion.div
                  className="flex-shrink-0 w-[200px] md:w-[250px] aspect-video flex items-center justify-center cursor-pointer p-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={partner.logoUrl}
                    alt={`${partner.name} logo`}
                    width={200}
                    height={100}
                    className="object-contain"
                    data-ai-hint={partner.hint}
                  />
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-card p-0">
                  <Image
                      src={partner.logoUrl}
                      alt={`${partner.name} logo`}
                      width={425}
                      height={240}
                      className="object-contain rounded-t-lg"
                      data-ai-hint={partner.hint}
                    />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
}


function PartnershipsSection() {
    const companyPartners = partnerships.filter(p => p.type === 'company');
    const universityPartners = partnerships.filter(p => p.type === 'university');

  return (
    <motion.section
      id="partnerships"
      className="bg-card py-16 md:py-24 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Key Partnerships & Collaborations</motion.h2>
          <motion.p variants={itemVariants} className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Collaboration is at the heart of our growth. We proudly partner with these leading organizations and academic institutions to create meaningful impact.
          </motion.p>
        </div>

        <PartnerMarquee title="Company Partners" partners={companyPartners} />
        <PartnerMarquee title="Academic Collaborations" partners={universityPartners} />

      </div>
    </motion.section>
  )
}

export default function FounderPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <motion.section
          id="founder-hero"
          className="py-16 md:py-24"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <motion.div variants={itemVariants} className="w-48 h-48 md:w-56 md:h-56 bg-muted rounded-full mx-auto md:mx-0 flex-shrink-0 border-4 border-primary/50 overflow-hidden">
                 <Image src="/founder/founder.jpg" alt="Founder photo" width={224} height={224} className="object-cover w-full h-full" data-ai-hint="founder portrait" />
              </motion.div>
              <div className="md:col-span-2 text-center md:text-left">
                <motion.p variants={itemVariants} className="text-sm font-semibold text-primary">FOUNDER</motion.p>
                <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold font-headline mt-1">Swastik Mishra</motion.h1>
                <motion.p variants={itemVariants} className="text-lg text-muted-foreground mt-2">Ghaziabad, Uttar Pradesh</motion.p>
                <motion.p variants={itemVariants} className="mt-4 max-w-xl mx-auto md:mx-0">A visionary community builder from the spiritual town of India, this entrepreneur is here to bridge the gap between student potential and real-world skills with his new venture.</motion.p>
                <motion.div variants={itemVariants} className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                  <Button asChild><Link href="https://www.linkedin.com/in/myselfswastikmishra/" target="_blank">Connect on Linkedin</Link></Button>
                  <Button asChild variant="outline"><Link href="/contact">Get In Touch</Link></Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="vision"
          className="py-16 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">My Vision</motion.h2>
                <motion.p variants={itemVariants} className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                    Tech Tribe Co is a student community striving for community growth and creating opportunities for students, organizing tech events and hackathons, and serving as a student-driven freelance agency.
                </motion.p>
            </div>
            <motion.div variants={sectionVariants} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Vision Cards */}
              <motion.div variants={itemVariants}>
                  <Card className="text-center h-full bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
                      <CardHeader className="items-center">
                        <div className="p-4 bg-primary/10 rounded-full inline-flex">
                          <Hand className="w-8 h-8 text-primary"/>
                        </div>
                        <CardTitle>Hands-On Training</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Expanding our members' skill sets through hands-on workshops and competition hackathons.</p>
                      </CardContent>
                  </Card>
              </motion.div>
               <motion.div variants={itemVariants}>
                  <Card className="text-center h-full bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
                    <CardHeader className="items-center">
                       <div className="p-4 bg-primary/10 rounded-full inline-flex">
                        <Rocket className="w-8 h-8 text-primary"/>
                      </div>
                      <CardTitle>Inducing Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Creating a bridge between our members and industry collaborators to launch careers.</p>
                    </CardContent>
                  </Card>
               </motion.div>
               <motion.div variants={itemVariants}>
                  <Card className="text-center h-full bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
                    <CardHeader className="items-center">
                       <div className="p-4 bg-primary/10 rounded-full inline-flex">
                        <Users className="w-8 h-8 text-primary"/>
                      </div>
                      <CardTitle>Tribex Experts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>A modular team of experts to create complex solutions and establish them on a global platform.</p>
                    </CardContent>
                  </Card>
                </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <JourneySection />
        <PartnershipsSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}