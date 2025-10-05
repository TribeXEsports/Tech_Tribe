
'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useMemo } from 'react';
import { collection, onSnapshot, query, where, doc, updateDoc, addDoc, deleteDoc, serverTimestamp, writeBatch, getDocs, type Query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { getAuth, signOut } from 'firebase/auth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { PlusCircle, Trash2, Download, Edit, CalendarIcon, MoreVertical } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import * as xlsx from 'xlsx';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


type FormField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'url';
  required: boolean;
};

type Event = {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  fields: FormField[];
  createdAt: any;
  dateFrom?: string;
  dateTo?: string;
  time?: string;
  venue?: string;
  mode?: 'Online' | 'Offline';
};

type Registration = {
  id: string;
  eventId: string;
  formData: Record<string, any>;
  submittedAt: any;
};

function EventForm({ event, onSave, onCancel }: { event?: Event | null, onSave: (eventData: Omit<Event, 'id' | 'createdAt'> & { createdAt?: any }) => void, onCancel: () => void }) {
  const [name, setName] = useState(event?.name || '');
  const [description, setDescription] = useState(event?.description || '');
  const [fields, setFields] = useState<FormField[]>(event?.fields || [{ name: 'name', label: 'Full Name', type: 'text', required: true }, { name: 'email', label: 'Email Address', type: 'email', required: true }]);
  const [date, setDate] = useState<DateRange | undefined>({
    from: event?.dateFrom ? new Date(event.dateFrom) : undefined,
    to: event?.dateTo ? new Date(event.dateTo) : undefined,
  });
  const [time, setTime] = useState(event?.time || '');
  const [venue, setVenue] = useState(event?.venue || '');
  const [mode, setMode] = useState<'Online' | 'Offline' | undefined>(event?.mode);


  const addField = () => {
    setFields([...fields, { name: `field_${Date.now()}`, label: '', type: 'text', required: false }]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index: number, fieldData: Partial<FormField>) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], ...fieldData };
    setFields(newFields);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date?.from) {
        alert('Please select a start date for the event.');
        return;
    }

    const eventData: any = { 
      name, 
      description,
      isActive: event?.isActive !== undefined ? event.isActive : true, 
      fields,
      dateFrom: format(date.from, 'yyyy-MM-dd'),
      time,
      venue,
      mode,
    };

    if (date.to) eventData.dateTo = format(date.to, 'yyyy-MM-dd');

    if (!event) {
        eventData.createdAt = serverTimestamp();
    }
    onSave(eventData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="event-name">Event Name</Label>
        <Input id="event-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Summer Hackathon 2024" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="event-description">Description</Label>
        <Input id="event-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A brief summary of the event" />
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="space-y-2">
            <Label>Event Dates</Label>
            <Popover>
                <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                    date.to ? (
                        <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                        </>
                    ) : (
                        format(date.from, "LLL dd, y")
                    )
                    ) : (
                    <span>Pick a date range</span>
                    )}
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                />
                </PopoverContent>
            </Popover>
         </div>
         <div className="space-y-2">
            <Label htmlFor="event-time">Time</Label>
            <Input id="event-time" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g., 10:00 AM - 5:00 PM" />
         </div>
         <div className="space-y-2">
            <Label htmlFor="event-venue">Venue</Label>
            <Input id="event-venue" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="e.g., Virtual or Physical Address" />
         </div>
         <div className="space-y-2">
            <Label>Mode</Label>
            <Select value={mode} onValueChange={(value) => setMode(value as 'Online' | 'Offline')}>
                <SelectTrigger><SelectValue placeholder="Select mode" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                </SelectContent>
            </Select>
         </div>
       </div>

      <div className="space-y-4">
        <h4 className="font-medium">Registration Fields</h4>
        {fields.map((field, index) => (
          <Card key={index} className="p-4 bg-muted/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <Label>Label</Label>
                <Input value={field.label} onChange={(e) => handleFieldChange(index, { label: e.target.value })} placeholder="Field Label" required/>
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                 <Select value={field.type} onValueChange={(value) => handleFieldChange(index, { type: value as FormField['type'] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="tel">Phone</SelectItem>
                    <SelectItem value="url">URL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Switch id={`required-${index}`} checked={field.required} onCheckedChange={(checked) => handleFieldChange(index, { required: checked })} />
                  <Label htmlFor={`required-${index}`}>Required</Label>
                </div>
                <Button variant="destructive" size="icon" type="button" onClick={() => removeField(index)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
             <div className="space-y-2 mt-4">
                <Label>Field Name (Key)</Label>
                <Input value={field.name} onChange={(e) => handleFieldChange(index, { name: e.target.value.toLowerCase().replace(/\s+/g, '_') })} placeholder="field_name_key" required disabled={index < 2}/>
                <p className="text-xs text-muted-foreground">This is the unique key for the field. Auto-generated.</p>
              </div>
          </Card>
        ))}
        <Button variant="outline" type="button" onClick={addField}><PlusCircle className="w-4 h-4 mr-2" /> Add Field</Button>
      </div>
      
      <DialogFooter>
        <Button variant="ghost" type="button" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Event</Button>
      </DialogFooter>
    </form>
  );
}


function EventsTable({
  events,
  selectedEventId,
  setSelectedEventId,
  onToggleActive,
  onEdit,
  onDelete
}: {
  events: Event[];
  selectedEventId: string | null;
  setSelectedEventId: (id: string | null) => void;
  onToggleActive: (event: Event) => void;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[40%]'>Event Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Registrations</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length > 0 ? (
            events.map((event) => (
              <TableRow
                key={event.id}
                className="cursor-pointer"
                data-state={selectedEventId === event.id ? "selected" : ""}
                onClick={() => setSelectedEventId(selectedEventId === event.id ? null : event.id)}
              >
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={event.isActive}
                      onCheckedChange={() => onToggleActive(event)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className={event.isActive ? "text-green-500" : "text-muted-foreground"}>
                      {event.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                   {/* Placeholder for registration count */}
                   -
                </TableCell>
                <TableCell className="text-right">
                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                             e.stopPropagation();
                             onEdit(event);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                             <DropdownMenuItem
                                className="text-destructive"
                                 onClick={(e) => e.stopPropagation()}
                                 onSelect={(e) => e.preventDefault()}
                              >
                               <Trash2 className="mr-2 h-4 w-4" />
                               Delete
                             </DropdownMenuItem>
                           </AlertDialogTrigger>
                           <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the event "{event.name}" and all of its registrations. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onDelete(event.id)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Yes, delete it
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center h-24">
                No events in this category.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default function AdminPage() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/login');
    }
  }, [user, userLoading, router]);

  useEffect(() => {
    if (!firestore) return;

    const eventsQuery = query(collection(firestore, 'events'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(eventsQuery, (snapshot) => {
      const eventData: Event[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
      setEvents(eventData);
      if (!selectedEventId && eventData.some(e => e.isActive)) {
        setSelectedEventId(eventData.find(e => e.isActive)?.id || null);
      }
      setLoading(false);
    },
    (error) => {
        const permissionError = new FirestorePermissionError({
            path: 'events',
            operation: 'list',
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
    });

    return () => unsubscribe();
  }, [firestore, selectedEventId]);

  useEffect(() => {
    if (!firestore || !selectedEventId) {
        setRegistrations([]);
        return;
    };

    const regsQuery: Query = query(collection(firestore, 'registrations'), where('eventId', '==', selectedEventId));
    const unsubscribe = onSnapshot(regsQuery, (snapshot) => {
      const regData: Registration[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Registration));
      setRegistrations(regData);
    },
    (error) => {
        const permissionError = new FirestorePermissionError({
            path: 'registrations',
            operation: 'list',
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
    });

    return () => unsubscribe();
  }, [firestore, selectedEventId]);

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const handleToggleActive = async (event: Event) => {
    if (!firestore) return;
    const eventRef = doc(firestore, 'events', event.id);

    updateDoc(eventRef, { isActive: !event.isActive }).catch(serverError => {
        const permissionError = new FirestorePermissionError({
            path: eventRef.path,
            operation: 'update',
            requestResourceData: { isActive: !event.isActive }
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
    });
  };

  const handleSaveEvent = (eventData: Omit<Event, 'id' | 'createdAt'> & { createdAt?: any }) => {
    if (!firestore) return;
    if (editingEvent) {
        const eventRef = doc(firestore, 'events', editingEvent.id);
        const { createdAt, ...updateData } = eventData;
        updateDoc(eventRef, updateData).catch(serverError => {
            const permissionError = new FirestorePermissionError({
                path: eventRef.path,
                operation: 'update',
                requestResourceData: updateData
            } satisfies SecurityRuleContext);
            errorEmitter.emit('permission-error', permissionError);
        });
    } else {
        const data = { ...eventData };
        if (!data.dateTo) {
          delete data.dateTo;
        }
        addDoc(collection(firestore, 'events'), data).catch(serverError => {
             const permissionError = new FirestorePermissionError({
                path: 'events',
                operation: 'create',
                requestResourceData: data
            } satisfies SecurityRuleContext);
            errorEmitter.emit('permission-error', permissionError);
        });
    }
    setIsFormOpen(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!firestore) return;
    try {
        const regsQuery = query(collection(firestore, 'registrations'), where('eventId', '==', eventId));
        const regsSnapshot = await getDocs(regsQuery);
        const batch = writeBatch(firestore);
        regsSnapshot.forEach(doc => batch.delete(doc.ref));
        
        await batch.commit().catch(serverError => {
            const permissionError = new FirestorePermissionError({
                path: 'registrations',
                operation: 'delete',
            } satisfies SecurityRuleContext);
            errorEmitter.emit('permission-error', permissionError);
        });

        const eventRef = doc(firestore, 'events', eventId)
        await deleteDoc(eventRef).catch(serverError => {
             const permissionError = new FirestorePermissionError({
                path: eventRef.path,
                operation: 'delete',
            } satisfies SecurityRuleContext);
            errorEmitter.emit('permission-error', permissionError);
        });
        
        if (selectedEventId === eventId) {
            setSelectedEventId(null);
        }

    } catch (error) {
        const permissionError = new FirestorePermissionError({
            path: 'registrations',
            operation: 'list',
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
    }
  }

  const handleDeleteRegistration = async (registrationId: string) => {
      if (!firestore) return;
      const regRef = doc(firestore, 'registrations', registrationId);
      deleteDoc(regRef).catch(serverError => {
          const permissionError = new FirestorePermissionError({
              path: regRef.path,
              operation: 'delete',
          } satisfies SecurityRuleContext);
          errorEmitter.emit('permission-error', permissionError);
      });
  }
  
  const selectedEvent = useMemo(() => events.find(e => e.id === selectedEventId), [events, selectedEventId]);
  
  const upcomingEvents = useMemo(() => events.filter(e => e.isActive), [events]);
  const pastEvents = useMemo(() => events.filter(e => !e.isActive), [events]);

  const handleExport = () => {
    if (!selectedEvent) return;
    
    const fields = selectedEvent.fields.map(f => f.name);
    
    const dataToExport = registrations.map(reg => {
      const row: Record<string, any> = {};
      fields.forEach(field => {
        row[field] = reg.formData[field] || '';
      });
      row['submittedAt'] = reg.submittedAt?.toDate ? reg.submittedAt.toDate().toLocaleString() : 'N/A';
      return row;
    });

    const worksheet = xlsx.utils.json_to_sheet(dataToExport);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Registrations');
    xlsx.writeFile(workbook, `${selectedEvent.name.replace(/\s+/g, '_')}_registrations.xlsx`);
  };

  if (userLoading || loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background">
        <Header />
        <main className="flex-1 py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
                        <p className="text-muted-foreground">Manage your events and view registrations.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                            <DialogTrigger asChild>
                            <Button onClick={() => { setEditingEvent(null); setIsFormOpen(true); }}><PlusCircle className="w-4 h-4 mr-2"/> Create Event</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{editingEvent ? 'Edit Event' : 'Create New Event'}</DialogTitle>
                            </DialogHeader>
                            <EventForm 
                                event={editingEvent}
                                onSave={handleSaveEvent} 
                                onCancel={() => { setIsFormOpen(false); setEditingEvent(null); }}
                            />
                            </DialogContent>
                        </Dialog>
                        <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
                    </div>
                </div>
                
                 <Card>
                    <CardHeader>
                        <CardTitle>Manage Events</CardTitle>
                        <CardDescription>Select an event to view its registrations.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="upcoming">
                            <TabsList className="mb-4">
                                <TabsTrigger value="upcoming">Upcoming & Active</TabsTrigger>
                                <TabsTrigger value="past">Past & Inactive</TabsTrigger>
                            </TabsList>
                            <TabsContent value="upcoming">
                                <EventsTable
                                    events={upcomingEvents}
                                    selectedEventId={selectedEventId}
                                    setSelectedEventId={setSelectedEventId}
                                    onToggleActive={handleToggleActive}
                                    onEdit={(event) => { setEditingEvent(event); setIsFormOpen(true); }}
                                    onDelete={handleDeleteEvent}
                                />
                            </TabsContent>
                            <TabsContent value="past">
                               <EventsTable
                                    events={pastEvents}
                                    selectedEventId={selectedEventId}
                                    setSelectedEventId={setSelectedEventId}
                                    onToggleActive={handleToggleActive}
                                    onEdit={(event) => { setEditingEvent(event); setIsFormOpen(true); }}
                                    onDelete={handleDeleteEvent}
                                />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>


                {selectedEvent && (
                  <Card className="mt-8">
                      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                          <div>
                            <CardTitle>Registrations for: <span className="text-primary">{selectedEvent.name}</span></CardTitle>
                             <CardDescription>{registrations.length} total registration(s).</CardDescription>
                          </div>
                          <Button variant="outline" onClick={handleExport} disabled={registrations.length === 0}>
                            <Download className="w-4 h-4 mr-2"/> Export to Excel
                          </Button>
                      </CardHeader>
                      <CardContent>
                          <div className="border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                      {selectedEvent.fields.map(field => <TableHead key={field.name}>{field.label}</TableHead>)}
                                      <TableHead>Submitted At</TableHead>
                                      <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {registrations.length > 0 ? (
                                    registrations.map((reg) => (
                                        <TableRow key={reg.id}>
                                          {selectedEvent.fields.map(field => (
                                            <TableCell key={field.name}>{reg.formData[field.name] || 'N/A'}</TableCell>
                                          ))}
                                          <TableCell>{reg.submittedAt?.toDate ? reg.submittedAt.toDate().toLocaleString() : 'N/A'}</TableCell>
                                          <TableCell className="text-right">
                                             <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-destructive">
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This will permanently delete this registration. This action cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDeleteRegistration(reg.id)}
                                                            className="bg-destructive hover:bg-destructive/90"
                                                        >
                                                            Yes, delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                          </TableCell>
                                        </TableRow>
                                    ))
                                    ) : (
                                    <TableRow>
                                        <TableCell colSpan={selectedEvent.fields.length + 2} className="text-center h-24">
                                        No registrations for this event yet.
                                        </TableCell>
                                    </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                          </div>
                      </CardContent>
                  </Card>
                )}
            </div>
        </main>
        <Footer />
    </div>
  );
}
