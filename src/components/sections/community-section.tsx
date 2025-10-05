
import { AnimatedSection } from '@/components/animated-section';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";


const communityImages = [
    { src: '/gallery/img1.jpg', alt: 'Community event 1', hint: 'tech conference' },
    { src: '/gallery/img2.jpg', alt: 'Community event 2', hint: 'student workshop' },
    { src: '/gallery/img3.jpg', alt: 'Community event 3', hint: 'group presentation' },
    { src: '/gallery/img4.jpg', alt: 'Community event 4', hint: 'hackathon team' }
];

export default function CommunitySection() {
    return (
        <AnimatedSection id="community-in-action" className="py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                        Our Community in Action
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        A dynamic showcase of our vibrant events, workshops, and collaborative moments that define the Tech Tribe spirit.
                    </p>
                </div>
            </div>
            <div
                className="mt-12 relative m-auto w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[50px] md:before:w-[100px] before:bg-[linear-gradient(to_right,hsl(var(--background))_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[50px] md:after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,hsl(var(--background))_0%,rgba(255,255,255,0)_100%)] after:content-['']"
            >
                <div className="animate-scroll flex gap-4">
                    {[...communityImages, ...communityImages].map((image, index) => (
                        <Dialog key={index}>
                            <DialogTrigger asChild>
                                <div className="relative aspect-video w-[300px] md:w-[350px] flex-shrink-0 rounded-lg overflow-hidden group shadow-lg cursor-pointer">
                                    <Image 
                                        src={image.src} 
                                        alt={image.alt} 
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        data-ai-hint={image.hint} 
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl p-0">
                                <Image 
                                    src={image.src.replace('/600/400', '/800/600')} 
                                    alt={image.alt} 
                                    width={800}
                                    height={600}
                                    className="object-contain rounded-lg"
                                    data-ai-hint={image.hint} 
                                />
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    )
}
