import { Link } from '@tanstack/react-router';

function PrivacyPolicyPage() {
  return (
    <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-10 text-green-900 dark:text-green-100">
      <h1 className="text-2xl md:text-3xl font-bold">Privacy Policy</h1>
      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
        Last updated: {new Date().getFullYear()}
      </p>

      <div className="mt-6 space-y-5 text-green-800 dark:text-green-200 leading-relaxed">
        <section>
          <h2 className="font-semibold text-lg text-green-900 dark:text-white">1. Who we are</h2>
          <p>
            TaxSaathi ("we", "us") operates this website, which offers free tax calculators, payroll
            and document generators, and educational articles for Pakistan. You can reach us any
            time at <a href="mailto:taxsaaathi@gmail.com" className="underline">taxsaaathi@gmail.com</a>{' '}
            or through our <Link to="/contact" className="underline">contact page</Link>. This policy
            explains what we collect, why, and what choices you have.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-green-900 dark:text-white">2. Data you enter into our tools</h2>
          <p>
            Our calculators and generators (salary tax, PTA mobile tax, payroll, payslips, invoices,
            quotations) run entirely in your browser. Salaries, employee details, client details,
            uploaded logos and any other figures you type are stored only on your own device using
            local storage. They are not transmitted to us, and we cannot see them. Clearing your
            browser data removes them permanently.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-green-900 dark:text-white">3. Information you send us</h2>
          <p>
            If you submit a contact form, service enquiry or newsletter signup, we receive the
            details you provide — typically your name, email address, phone number (if given) and
            your message. We use this only to reply to you, to deliver the service you asked about,
            or to send updates you subscribed to. We do not sell your information, and we do not
            share it with third parties except service providers who host our website and database
            on our behalf. Enquiry records are kept only as long as needed for that purpose, and you
            can ask us to delete them at any time.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-green-900 dark:text-white">4. Cookies</h2>
          <p>Cookies and similar storage are used on this site for three purposes:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              <strong>Essential / functional</strong> — remembering your theme choice and the
              details you save in our generators.
            </li>
            <li>
              <strong>Analytics</strong> — understanding, in aggregate, which pages are useful so we
              can improve them.
            </li>
            <li>
              <strong>Advertising</strong> — third-party advertising cookies, described below.
            </li>
          </ul>
          <p className="mt-2">
            You can block or delete cookies in your browser settings. Blocking advertising cookies
            does not stop adverts appearing; it means they will be less relevant to you.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-green-900 dark:text-white">
            5. Third-party advertising (Google AdSense)
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Third-party vendors, including Google, use cookies to serve adverts based on your
              prior visits to this website or other websites.
            </li>
            <li>
              Google's use of advertising cookies enables it and its partners to serve adverts to
              you based on your visit to this site and/or other sites on the internet.
            </li>
            <li>
              You may opt out of personalised advertising by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Google Ads Settings
              </a>
              . You can also opt out of third-party vendor cookies at{' '}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                aboutads.info
              </a>{' '}
              or{' '}
              <a
                href="https://optout.networkadvertising.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                the NAI opt-out page
              </a>
              .
            </li>
            <li>
              Advertising partners may also collect your IP address and device information to
              measure and deliver adverts. See{' '}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                how Google uses data from sites that use its services
              </a>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-green-900 dark:text-white">6. Your rights and choices</h2>
          <p>
            You can ask us to show you, correct or delete the information you have sent us, withdraw
            consent for marketing emails (every newsletter has an unsubscribe option), or object to
            our use of your data. Email{' '}
            <a href="mailto:taxsaaathi@gmail.com" className="underline">taxsaaathi@gmail.com</a> and
            we will respond within 30 days. If you are in the EEA or UK, we rely on your consent for
            advertising and analytics cookies and on legitimate interest for replying to enquiries.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-green-900 dark:text-white">7. Children</h2>
          <p>
            This website is intended for adults dealing with tax and business matters. We do not
            knowingly collect information from children under 13. If you believe a child has sent us
            personal information, contact us and we will delete it.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-green-900 dark:text-white">8. Security</h2>
          <p>
            Enquiries are stored in a managed database with restricted access over encrypted
            connections. No method of transmission over the internet is completely secure, so please
            do not send sensitive documents such as CNIC copies or bank statements through the forms.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-green-900 dark:text-white">9. Changes to this policy</h2>
          <p>
            We may update this policy as our services or the law change. The revision date at the top
            of the page always reflects the current version. Please also read our{' '}
            <Link to="/disclaimer" className="underline">Disclaimer</Link> and{' '}
            <Link to="/terms" className="underline">Terms of Service</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
