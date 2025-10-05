'use client';

import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { ArrowRight, Calendar, Clock, MapPin, Globe, Wifi } from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


type Event = {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  dateFrom?: string;
  dateTo?: string;
  time?: string;
  venue?: string;
  mode?: 'Online' | 'Offline' | 'Online & In-Person';
};

const hardcodedPastEvents: Event[] = [
  {
    id: "past-1",
    name: "InnovateAI Hackathon 2024",
    description: "A 2-day intensive hackathon focused on creating innovative solutions using Artificial Intelligence. Prizes for top 3 teams!",
    dateFrom: "2024-10-26",
    dateTo: "2024-10-27",
    time: "9:00 AM - 5:00 PM",
    venue: "Silicon Valley",
    mode: "Online & In-Person",
    isActive: false,
  },
  {
    id: "past-2",
    name: "Web 3.0 & Blockchain Workshop",
    description: "A hands-on workshop covering the fundamentals of Web 3.0, smart contracts, and decentralized applications.",
    dateFrom: "2024-11-09",
    time: "10:00 AM - 2:00 PM",
    venue: "Global",
    mode: "Online",
    isActive: false,
  },
  {
    id: "past-3",
    name: "UI/UX Design for Developers",
    description: "Learn the core principles of UI/UX design that can help you build more intuitive and user-friendly applications.",
    dateFrom: "2024-11-23",
    time: "1:00 PM - 4:00 PM",
    venue: "Global",
    mode: "Online",
    isActive: false,
  },
];


function EventCard({ event }: { event: Event }) {
    const formatDateRange = (from?: string, to?: string) => {
        if (!from) return '';
        const fromDate = new Date(from);
        if (to) {
            const toDate = new Date(to);
            if (fromDate.getMonth() === toDate.getMonth() && fromDate.getFullYear() === toDate.getFullYear()) {
                 if(fromDate.getDate() === toDate.getDate()){
                    return format(fromDate, 'LLL d, yyyy');
                }
                return `${format(fromDate, 'LLL d')} - ${format(toDate, 'd, yyyy')}`;
            } else if (fromDate.getFullYear() === toDate.getFullYear()) {
                 return `${format(fromDate, 'LLL d')} - ${format(toDate, 'LLL d, yyyy')}`;
            }
            return `${format(fromDate, 'LLL d, yyyy')} - ${format(toDate, 'LLL d, yyyy')}`;
        }
        return format(fromDate, 'PPP');
    }
    
    return (
        <Card className="flex flex-col overflow-hidden group bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="font-headline text-xl">{event.name}</CardTitle>
                    {event.mode && (
                        <Badge variant={event.mode === 'Online' ? 'default' : 'secondary'} className="flex items-center gap-1 shrink-0">
                            {event.mode.includes('Online') && <Wifi className="w-3 h-3" />}
                            {event.mode.includes('In-Person') && <Globe className="w-3 h-3" />}
                            {event.mode}
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <p className="text-muted-foreground text-sm line-clamp-3">{event.description}</p>
                <div className="space-y-3 text-sm text-muted-foreground">
                    {event.dateFrom && (
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>{formatDateRange(event.dateFrom, event.dateTo)}</span>
                        </div>
                    )}
                    {event.time && (
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{event.time}</span>
                        </div>
                    )}
                    {event.venue && (
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{event.venue}</span>
                        </div>
                    )}
                </div>
            </CardContent>
            {event.isActive && (
                <CardFooter>
                    <Button asChild className="w-full font-bold">
                    <Link href="/register">
                        Register Now
                    </Link>
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}

export default function EventsSection({ isPage = false }: { isPage?: boolean }) {
  const firestore = useFirestore();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!firestore) return;
    
    setLoading(true);
    const eventsQuery = query(collection(firestore, 'events'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(eventsQuery, (snapshot) => {
      const eventData: Event[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
      setEvents(eventData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching events:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore]);

  const upcomingEvents = events.filter(e => e.isActive);
  const pastEvents = [...hardcodedPastEvents, ...events.filter(e => !e.isActive)];

  const dataToDisplay = {
      upcoming: isPage ? upcomingEvents : upcomingEvents.slice(0, 3),
      past: isPage ? pastEvents : []
  };
  
  if (loading && isPage) {
    return (
        <AnimatedSection id="events" className="py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                 <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                 <p className="mt-4 text-muted-foreground">Loading events...</p>
            </div>
        </AnimatedSection>
    )
  }
  
  const EventGrid = ({ events }: { events: Event[] }) => (
    events.length > 0 ? (
      <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    ) : (
      <div className="mt-12 text-center text-muted-foreground">
        <p>No events in this category right now. Check back soon!</p>
      </div>
    )
  );

  return (
    <AnimatedSection id="events" className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            {isPage ? "All Events" : "Upcoming Events"}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Join our hackathons, workshops, and networking events to learn, build, and connect with a global community.
          </p>
        </div>
        
        {isPage ? (
            <Tabs defaultValue="upcoming" className="mt-8">
                <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                    <EventGrid events={dataToDisplay.upcoming} />
                </TabsContent>
                <TabsContent value="past">
                    <EventGrid events={dataToDisplay.past} />
                </TabsContent>
            </Tabs>
        ) : (
            <>
                <EventGrid events={dataToDisplay.upcoming} />
                { dataToDisplay.upcoming.length > 0 && !isPage && (
                    <div className="text-center mt-12">
                        <Button asChild>
                            <Link href="/events">
                                View All Events <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                )}
            </>
        )}
      </div>
    </AnimatedSection>
  );
}
