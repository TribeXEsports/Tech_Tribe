
import { AnimatedSection } from '@/components/animated-section';
import { ContactForm } from '@/components/contact-form';

export default function ContactSection() {
  return (
    <AnimatedSection id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Get in Touch
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Have a project in mind, a question about our services, or a partnership proposal? We&apos;re here to help.
          </p>
        </div>
        <div className="mt-12 flex justify-center px-4 sm:px-0">
          <ContactForm />
        </div>
      </div>
    </AnimatedSection>
  );
}
