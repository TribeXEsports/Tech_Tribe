
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Chatbot from '@/components/chatbot';
import { AnimatedSection } from '@/components/animated-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Globe, Star, Award, Gift } from 'lucide-react';

const perks = [
  {
    icon: <Globe className="w-8 h-8 text-primary" />,
    title: 'Global Network',
    description: 'Gain access to our global network of tech professionals, mentors, and fellow students from around the world.',
  },
  {
    icon: <Star className="w-8 h-8 text-primary" />,
    title: 'Exclusive Events',
    description: 'Get priority access and discounts to our flagship hackathons, workshops, and international conferences.',
  },
  {
    icon: <Award className="w-8 h-8 text-primary" />,
    title: 'Leadership Experience',
    description: 'Develop valuable leadership, management, and organizational skills by leading a local chapter.',
  },
  {
    icon: <Gift className="w-8 h-8 text-primary" />,
    title: 'Sponsorship Support',
    description: 'Receive an official starter kit, comprehensive guides, and resources to secure sponsorships for your events.',
  },
]

export default function ChapterPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <AnimatedSection id="lead-chapter" className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-headline">
                Lead a Tech Tribe Chapter
              </h1>
              <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
                Bring our community to your university. Inspire change, foster innovation, and build your leadership skills on a global stage.
              </p>
            </div>
          </div>
        </AnimatedSection>
        
        <AnimatedSection id="perks" className="pt-0 py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl font-headline">Chapter Perks & Benefits</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {perks.map((perk, index) => (
                    <Card key={index} className="text-center bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
                        <CardHeader className="items-center">
                            <div className="p-4 bg-primary/10 rounded-full inline-flex">
                                {perk.icon}
                            </div>
                            <CardTitle>{perk.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{perk.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="apply" className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl font-headline">Apply to Start a Chapter</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Fill out the form below to start the process. We review applications on a rolling basis and will get in touch with the next steps.
                </p>
              </div>

              <Card className="border-2 border-primary/20 bg-card/50 shadow-xl">
                <CardContent className="p-6 sm:p-8">
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="university-name">University Name</Label>
                      <Input id="university-name" placeholder="University of Technology" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="full-name">Your Full Name</Label>
                      <Input id="full-name" placeholder="Alex Turing" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="university-email">Your University Email</Label>
                      <Input id="university-email" type="email" placeholder="alex.turing@university.edu" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motivation">Why do you want to start a chapter?</Label>
                      <Textarea id="motivation" placeholder="Tell us about your motivation and how you plan to build a community..." rows={5} />
                    </div>
                    <Button type="submit" className="w-full font-bold !mt-8">Submit Application</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
