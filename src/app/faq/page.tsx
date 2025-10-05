
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Chatbot from '@/components/chatbot';
import { AnimatedSection } from '@/components/animated-section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "What is Tech Tribe?",
        answer: "Tech Tribe is a global community of tech enthusiasts, students, and professionals who come together to learn, collaborate on projects, and grow their skills. We host events, workshops, and run a freelance agency composed of our top community talent."
    },
    {
        question: "Who can join the community?",
        answer: "Anyone with a passion for technology is welcome! Whether you're a beginner developer, a seasoned professional, a designer, or just curious about tech, you'll find a place in our tribe."
    },
    {
        question: "How do I hire the Tech Tribe agency for a project?",
        answer: "You can hire our freelance agency by visiting the 'Services' page to see what we offer and then filling out the contact form to schedule a free consultation call. We'd love to hear about your project."
    },
    {
        question: "How much does it cost to join or attend events?",
        answer: "Joining the Tech Tribe community is completely free. Most of our events and workshops are also free to ensure accessibility, though some special, large-scale events may have a nominal fee to cover costs."
    },
    {
        question: "How can my company partner with or sponsor Tech Tribe?",
        answer: "We are always looking for partners and sponsors to collaborate with on events, hackathons, and community initiatives. Please visit our 'Sponsors' page or contact us directly to discuss opportunities."
    }
]

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <AnimatedSection id="faq" className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Find answers to common questions about our community, freelance agency, events, and mission.
              </p>
            </div>
            <div className="mt-12">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, i) => (
                        <AccordionItem value={`item-${i}`} key={i}>
                            <AccordionTrigger className="text-left font-bold text-lg">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
