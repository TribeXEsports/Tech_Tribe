
import { AnimatedSection } from '@/components/animated-section';
import { Card, CardContent } from '@/components/ui/card';
import { Users, FolderGit2, HeartHandshake } from 'lucide-react';

const impactData = [
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    value: '1500+',
    label: 'Active Members',
  },
  {
    icon: <FolderGit2 className="w-10 h-10 text-primary" />,
    value: '50+',
    label: 'Projects Completed',
  },
  {
    icon: <HeartHandshake className="w-10 h-10 text-primary" />,
    value: '20+',
    label: 'Community Partners',
  },
];

export default function ImpactSection() {
  return (
    <AnimatedSection id="impact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Our Impact in Numbers
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We&apos;re proud of the community we&apos;ve built and the work we&apos;ve delivered. Our strength lies in our numbers and our shared passion.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {impactData.map((item) => (
            <Card key={item.label} className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
              <CardContent className="p-6 text-center flex flex-col items-center gap-4">
                {item.icon}
                <p className="text-4xl font-bold text-primary">{item.value}</p>
                <p className="text-muted-foreground font-semibold">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
