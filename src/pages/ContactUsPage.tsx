import LeadCaptureForm from '@/components/LeadCaptureForm';

function ContactUsPage() {
  return (
    <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-green-100">Contact Us</h1>
      <p className="text-green-700 dark:text-green-300 mt-2">
        Questions, feedback, or need help with a service? Send us a message and we'll get back to
        you.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <LeadCaptureForm
            category="contact"
            fields={[
              { name: 'name', label: 'Full Name', required: true },
              { name: 'email', label: 'Email', type: 'email', required: true },
              { name: 'subject', label: 'Subject', required: true },
              { name: 'message', label: 'Message', type: 'textarea', required: true },
            ]}
            submitLabel="Send Message"
          />
        </div>
        <div className="text-sm text-green-700 dark:text-green-300 space-y-3">
          <p className="font-semibold text-green-900 dark:text-white">Get in touch</p>
          <p>📧 taxsaaathi@gmail.com</p>
          <p>🌍 Online support for Pakistan, the United States and India</p>
          <p>We reply by email, usually within two working days.</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
