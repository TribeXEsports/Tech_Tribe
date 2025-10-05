
"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitContactForm, type ContactFormState } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.enum(["schedule-a-call", "sponsorship-inquiry", "project-inquiry", "general-question", "other"]),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    {
      message: "",
      status: "idle",
    }
  );
  
  const subjectParam = searchParams.get('subject');
  const validSubjects = ["schedule-a-call", "sponsorship-inquiry", "project-inquiry", "general-question", "other"];
  const defaultSubject = subjectParam && validSubjects.includes(subjectParam) ? subjectParam : "schedule-a-call";

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      subject: defaultSubject as ContactFormData['subject'],
      name: "",
      email: "",
      message: "",
    },
  });

  const subjectValue = form.watch("subject");

  useEffect(() => {
    if (state.status === "success") {
      toast({
        title: "Message Sent!",
        description: state.message,
      });
      form.reset();
    } else if (state.status === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast, form]);
  
  return (
    <Card className="border-2 border-primary/20 bg-card/50 shadow-xl w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-center font-bold text-2xl font-headline">Send us a Message</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <Form {...form}>
          <form
            action={formAction}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name={field.name}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Schedule a Call" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="schedule-a-call">
                        Schedule a Call
                      </SelectItem>
                       <SelectItem value="sponsorship-inquiry">
                        Sponsorship Inquiry
                      </SelectItem>
                      <SelectItem value="project-inquiry">
                        Project Inquiry
                      </SelectItem>
                      <SelectItem value="general-question">
                        General Question
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="How can we help you?"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  {subjectValue === 'schedule-a-call' && (
                    <FormDescription>Please suggest a few time slots that work for you.</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full font-bold" disabled={isPending}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Send Message
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
