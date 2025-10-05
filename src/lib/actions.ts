'use server';

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  subject: z.enum(["schedule-a-call", "sponsorship-inquiry", "project-inquiry", "general-question", "other"]),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormState = {
  message: string;
  status: 'success' | 'error' | 'idle';
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.errors.map(e => e.message).join(' ');
    return {
      message: errorMessages || 'There was an error with your submission.',
      status: 'error',
    };
  }
  
  if (!process.env.DISCORD_WEBHOOK_URL) {
    console.error("Discord Webhook URL is not configured on the server via environment variables.");
    return { 
      message: "The server is not configured to send notifications. Please contact the site administrator.",
      status: 'error',
    }
  }

  const { name, email, subject, message } = validatedFields.data;
  
  const subjectMapping: Record<z.infer<typeof contactFormSchema>['subject'], string> = {
    'schedule-a-call': "Schedule a Call",
    'sponsorship-inquiry': "Sponsorship Inquiry",
    'project-inquiry': "Project Inquiry",
    'general-question': "General Question",
    'other': "Other",
  }
  const subjectText = subjectMapping[subject]

  const discordMessage = {
    embeds: [
      {
        title: "New Contact Form Submission",
        color: 3447003, // A pleasant blue color
        fields: [
           {
            name: "Subject",
            value: subjectText,
            inline: false,
          },
          {
            name: "Name",
            value: name,
            inline: true,
          },
          {
            name: "Email",
            value: `[${email}](mailto:${email})`,
            inline: true,
          },
          {
            name: "Message",
            value: message,
            inline: false,
          },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "Tech Tribex Contact Form",
        },
      },
    ],
  };

  try {
    const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordMessage),
    });

    if (!response.ok) {
       console.error("Failed to send notification to Discord.", { status: response.status, statusText: response.statusText });
      return { 
        message: "Failed to send notification. The webhook URL may be invalid or missing permissions.",
        status: 'error'
      }
    }

    return {
      message: 'Thank you for your message! We will get back to you soon.',
      status: 'success',
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown network error occurred."
    console.error("Error sending message to Discord:", error);
    return { 
        message: `An unexpected error occurred: ${errorMessage}`,
        status: 'error',
    }
  }
}
