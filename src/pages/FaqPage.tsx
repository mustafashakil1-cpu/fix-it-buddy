type Faq = { q: string; a: string };
type Group = { name: string; items: Faq[] };

const groups: Group[] = [
  {
    name: 'About TaxSaathi',
    items: [
      {
        q: 'Are the TaxSaathi tools free?',
        a: 'Yes. Every calculator and document generator is completely free, with no sign-up required.',
      },
      {
        q: 'Do I need to create an account?',
        a: 'No. You can use every tool on the site without registering, giving an email, or installing anything.',
      },
      {
        q: 'Is my data saved anywhere?',
        a: 'No. Calculations run in your browser and stay on your device. Only details you deliberately submit through a contact or newsletter form reach us.',
      },
      {
        q: 'Who is TaxSaathi for?',
        a: 'Employees, freelancers, business owners, and small-company HR or admin staff in Pakistan and the United States who need a practical starting point.',
      },
      {
        q: 'Do the tools work on a mobile phone?',
        a: 'Yes. Every calculator and generator is designed to work on a phone browser as well as a laptop.',
      },
      {
        q: 'Is TaxSaathi affiliated with the FBR, PTA, IRS, or any government agency?',
        a: 'No. We are independent. We use official Pakistan and US publications as sources, but no government body operates or endorses TaxSaathi.',
      },
      {
        q: 'Do you file tax returns on my behalf?',
        a: 'The tools are self-service, but our team can help with registration, appeals, and legal drafting. Reach out through the Contact page.',
      },
      {
        q: 'How do I contact you?',
        a: 'Use the form on the Contact page, or email taxsaaathi@gmail.com. We reply to most messages within a couple of working days.',
      },
      {
        q: 'Can I suggest a new calculator or guide?',
        a: 'Please do. Send your idea through the Contact page — a lot of what is on the site started as a user request.',
      },
      {
        q: 'How often is the site updated?',
        a: 'We review the calculators whenever slabs, surcharge rules, or PTA bands change, and we publish new guides regularly.',
      },
    ],
  },
  {
    name: 'Salary and income tax',
    items: [
      {
        q: 'How accurate is the salary tax calculator?',
        a: 'It uses the Tax Year 2027 FBR salaried slabs. The 9% surcharge no longer applies to salaried individuals from 1 July 2026. Results remain planning estimates, not official assessments.',
      },
      {
        q: 'Should I enter monthly or annual salary?',
        a: 'Either. The calculator converts your figure to an annual amount, applies the slabs, and shows both yearly tax and the monthly deduction.',
      },
      {
        q: 'What income is tax free?',
        a: 'Under the current salaried slabs, annual taxable income up to Rs. 600,000 attracts no income tax.',
      },
      {
        q: 'Does the 9% surcharge still apply to salaried income?',
        a: 'No. The Finance Act 2026 removed it for salaried individuals from 1 July 2026. Separate surcharge rules may still affect non-salaried individuals and associations of persons.',
      },
      {
        q: 'Does the calculator include allowances and bonuses?',
        a: 'Whatever you enter is treated as taxable salary income. Add bonuses and taxable allowances into the figure to see their effect.',
      },
      {
        q: 'Are provident fund contributions taxed?',
        a: 'Recognised provident fund treatment differs from ordinary salary. Our calculator works on the taxable figure you enter, so exclude amounts your employer treats as exempt.',
      },
      {
        q: 'Why is my payslip deduction different from the calculator?',
        a: 'Employers spread annual tax across months and may already account for credits, arrears, or mid-year joining. Small differences are normal; large gaps are worth querying with HR.',
      },
      {
        q: 'Do freelancers use the salaried slabs?',
        a: 'No. Freelance and business income is taxed under different rules, and export of services can fall under a separate regime. Read our freelancer guides in the Blog.',
      },
      {
        q: 'How is rental income taxed?',
        a: 'Property rental income is assessed separately from salary. Our Blog has a dedicated guide covering rates and allowable deductions.',
      },
      {
        q: 'What is taxable income versus gross income?',
        a: 'Gross income is everything you receive. Taxable income is what remains after exemptions and admissible deductions, and the slabs apply to that figure.',
      },
      {
        q: 'Does the calculator handle tax credits?',
        a: 'Not automatically. Credits such as those for certain investments or donations must be applied separately when you file.',
      },
      {
        q: 'Can I see the slab that applies to me?',
        a: 'Yes. The result card shows the slab your income falls into along with the rate applied to the excess.',
      },
    ],
  },
  {
    name: 'United States federal and state tax',
    items: [
      {
        q: 'Which US tax year does the calculator use?',
        a: 'It uses 2026 federal brackets and standard deductions for returns generally filed in 2027, plus the 2026 Social Security wage base.',
      },
      {
        q: 'Does moving into a higher federal bracket tax all my income at that rate?',
        a: 'No. US federal income tax is progressive. Each rate applies only to the taxable income inside that bracket; earlier dollars remain taxed at lower rates.',
      },
      {
        q: 'Which filing statuses are supported?',
        a: 'Single, married filing jointly, married filing separately, and head of household. Your correct legal status can materially change the brackets and standard deduction.',
      },
      {
        q: 'Does the calculator use the standard deduction?',
        a: 'Yes by default. The full US calculator also lets you enter itemised deductions instead. Payroll and payslip estimates use the standard deduction for a simplified annual estimate.',
      },
      {
        q: 'What are Social Security and Medicare taxes?',
        a: 'They are federal payroll taxes, often called FICA. For employees, the estimate applies the employee share of Social Security up to its annual wage base and Medicare to wages, including Additional Medicare Tax where applicable.',
      },
      {
        q: 'Does the US calculation include the employer share of payroll tax?',
        a: 'No. The displayed take-home and payslip deductions use the employee share. An employer normally owes a separate matching share and may also owe federal and state unemployment taxes.',
      },
      {
        q: 'How is self-employment tax handled?',
        a: 'The US tax calculator estimates both halves of Social Security and Medicare on 92.35% of eligible net self-employment income and applies the deductible half when estimating federal taxable income.',
      },
      {
        q: 'Does the US calculator include state income tax?',
        a: 'It provides an estimate for listed states. State deductions, credits, local taxes, special income rules, and mid-year moves can change the actual result.',
      },
      {
        q: 'Why does my US paycheck withholding differ from the estimate?',
        a: 'Actual withholding depends on Form W-4 elections, pay frequency, bonuses, benefits, year-to-date wages, additional withholding, local taxes, and payroll rounding. The tool estimates annual liability rather than reproducing every payroll table.',
      },
      {
        q: 'Does the calculator include tax credits?',
        a: 'The full US calculator accepts a general non-refundable credit amount. Eligibility and phase-outs for child, education, energy, earned-income, and other credits are not determined automatically.',
      },
      {
        q: 'Are 401(k), HSA, and benefit deductions supported?',
        a: 'The full calculator has a pre-tax contributions field. In payroll, the deductions figure is treated as reducing federal taxable income for estimation, although not every benefit avoids every payroll or state tax.',
      },
      {
        q: 'Does the US estimate cover New York City or other local income taxes?',
        a: 'No. Local taxes, including New York City, Yonkers, many Pennsylvania municipalities, and Maryland county taxes, are not fully modelled. Check the note shown for the selected state.',
      },
      {
        q: 'When are US individual federal tax returns normally due?',
        a: 'Most calendar-year individual returns are due around April 15, subject to weekends, holidays, disaster relief, or IRS changes. An extension generally extends filing time, not the time to pay.',
      },
      {
        q: 'Can a non-US citizen owe US income tax?',
        a: 'Yes. Tax residency can arise through citizenship, a green card, or the substantial presence test, and nonresident aliens may owe US tax on US-source income. Treaty rules and forms can change the result.',
      },
      {
        q: 'Can I use this estimate to file a US tax return?',
        a: 'No. It is a planning estimate, not tax preparation software. It does not generate IRS or state forms and cannot account for every adjustment, credit, local tax, or special rule.',
      },
    ],
  },
  {
    name: 'Filing and FBR',
    items: [
      {
        q: 'Who must file an income tax return in Pakistan?',
        a: 'Broadly, anyone with taxable income, a registered business, or certain assets such as vehicles and property. Our filing guide sets out the common triggers.',
      },
      {
        q: 'What is the Active Taxpayer List?',
        a: 'The ATL is the FBR list of filers. Being on it lowers withholding rates on many transactions, from vehicle registration to banking.',
      },
      {
        q: 'What happens if I file late?',
        a: 'You may pay a penalty and lose ATL status until the surcharge is paid. Filing late is still far better than not filing.',
      },
      {
        q: 'What is an NTN and how do I get one?',
        a: 'For individuals, the CNIC works as the tax number. Registration is completed through the FBR IRIS portal to activate your profile.',
      },
      {
        q: 'Do I need to file if my income is below the threshold?',
        a: 'You may have no tax to pay yet still be required to file because of assets or business registration. Filing also gets you on the ATL.',
      },
      {
        q: 'What documents should I keep for filing?',
        a: 'Salary certificate, bank statements, withholding tax certificates, property and vehicle papers, and invoices if you run a business.',
      },
      {
        q: 'What is a wealth statement?',
        a: 'A declaration of your assets and liabilities filed alongside the return, explaining how your wealth changed during the year.',
      },
      {
        q: 'Can I revise a return after submitting it?',
        a: 'Revision is possible within the limits set by law, usually with an explanation for the change. Advice from a practitioner helps here.',
      },
      {
        q: 'What is withholding tax?',
        a: 'Tax collected at source by a payer — a bank, employer, or buyer — and credited against your final liability when you file.',
      },
      {
        q: 'How do I claim back excess withholding?',
        a: 'Declare the deductions in your return with the certificates attached; excess amounts are adjusted or refunded through the process the FBR provides.',
      },
      {
        q: 'What is an FBR audit notice?',
        a: 'A formal request to examine your declared figures. Respond within the stated time with documents; our audit and appeals guides explain the process.',
      },
      {
        q: 'Can you help with a tax notice or appeal?',
        a: 'Yes. Use the Tax Appeal page to describe your case and our team will get back to you.',
      },
    ],
  },
  {
    name: 'Sales tax and business',
    items: [
      {
        q: 'When do I need sales tax registration?',
        a: 'Registration is generally required once you make taxable supplies as a manufacturer, importer, retailer, or service provider above the applicable thresholds.',
      },
      {
        q: 'What is input and output tax?',
        a: 'Output tax is what you charge customers. Input tax is what you paid suppliers. You normally remit the difference.',
      },
      {
        q: 'What must a sales tax invoice contain?',
        a: 'Seller and buyer details with registration numbers, invoice number and date, description and quantity, value excluding tax, tax charged, and the total.',
      },
      {
        q: 'How do I register a company in Pakistan?',
        a: 'Company incorporation runs through SECP, followed by tax and bank registration. See the Company Registration page for assisted setup.',
      },
      {
        q: 'Sole proprietor, AOP, or private limited — which should I pick?',
        a: 'It depends on liability, partners, and how you plan to raise money. Our Blog compares the three structures in practical terms.',
      },
      {
        q: 'Do small shops need to keep records?',
        a: 'Yes. Even simple sales and purchase registers protect you during an audit and make filing far easier.',
      },
      {
        q: 'Is provincial sales tax on services different?',
        a: 'Yes. Services are taxed by provincial authorities such as SRB and PRA, separately from federal sales tax on goods.',
      },
      {
        q: 'Can I use the invoices and quotations for real clients?',
        a: 'Yes. The generators produce clean, printable documents with your business details, line items, and tax totals.',
      },
    ],
  },
  {
    name: 'PTA mobile tax',
    items: [
      {
        q: 'How is PTA mobile tax calculated?',
        a: 'PTA tax depends on your phone value band and whether you register on CNIC or Passport. Our PTA Mobile Tax Checker gives you an estimate for both options.',
      },
      {
        q: 'Why is Passport registration cheaper?',
        a: 'Passport-based registration is intended for travellers bringing a handset within a set window of arrival, and carries lower duty in most bands.',
      },
      {
        q: 'How long can I use an unregistered phone?',
        a: 'An imported handset works for a short grace period on local networks before it is blocked until registration is completed.',
      },
      {
        q: 'How do I check whether my phone is already registered?',
        a: 'Check the IMEI through the official PTA DIRBS service. Our checker only estimates the cost; it does not query PTA status.',
      },
      {
        q: 'How many phones can I register?',
        a: 'There is an annual allowance per person, and passport-based registration is limited per trip. Beyond that, CNIC registration applies.',
      },
      {
        q: 'Is PTA tax refundable if I sell the phone?',
        a: 'No. The duty attaches to the handset once registered and is not refunded on sale.',
      },
    ],
  },
  {
    name: 'Payroll, invoices and documents',
    items: [
      {
        q: 'Can I add my company logo to documents?',
        a: 'Yes. Invoice, quotation, and payslip generators all let you upload a PNG, JPG, or SVG logo that appears on the printed document.',
      },
      {
        q: 'Will the site header and footer print on my payslip?',
        a: 'No. Printing prints only the document itself. If your browser adds a date or web address line, turn off headers and footers in the print dialog.',
      },
      {
        q: 'Can I generate payslips for several employees?',
        a: 'Yes. Choose Pakistan or the United States, add the staff for that country, then generate a PKR or USD payslip for any employee.',
      },
      {
        q: 'Which allowances and deductions are supported?',
        a: 'House rent, conveyance, and medical allowances, plus income tax, provident fund, loan, and EOBI deductions — and you can add your own custom rows.',
      },
      {
        q: 'Does the payslip calculate income tax automatically?',
        a: 'Yes. Pakistan payslips use current salaried slabs. US payslips estimate federal income tax, employee Social Security, Medicare, and selected state income tax. You can edit the resulting deduction rows.',
      },
      {
        q: 'Can I save a document as a PDF?',
        a: 'Yes. Choose Print, then select "Save as PDF" as the destination in your browser print dialog.',
      },
      {
        q: 'Is my employee data uploaded to your servers?',
        a: 'No. Payroll entries stay in your own browser, which is why they are not shared between devices.',
      },
      {
        q: 'Can I change the currency or tax rate on an invoice?',
        a: 'Payroll and payslips support PKR and USD. Invoice and quotation currency options depend on the generator, with an editable tax rate for the relevant supply.',
      },
    ],
  },
];

function FaqPage() {
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
      <span className="inline-block text-xs font-bold uppercase tracking-widest text-green-600">FAQ</span>
      <h1 className="text-3xl md:text-4xl font-extrabold text-green-900 dark:text-green-100 mt-2">
        Frequently asked questions
      </h1>
      <p className="text-green-700 dark:text-green-300 mt-3">
        {total} answers on Pakistan and US tax, FBR and IRS concepts, business documents, PTA mobile tax,
        payroll, and payslips.
      </p>

      {groups.map((group) => (
        <section key={group.name} className="mt-10">
          <h2 className="text-xl font-bold text-green-900 dark:text-green-100">{group.name}</h2>
          <div className="mt-3 divide-y divide-green-100 dark:divide-slate-700 pop-panel bg-card">
            {group.items.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="cursor-pointer list-none font-semibold text-green-900 dark:text-white flex justify-between gap-4">
                  {f.q}
                  <span className="text-green-600 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-green-700 dark:text-green-300 mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default FaqPage;
