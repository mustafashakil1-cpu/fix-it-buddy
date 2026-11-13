export interface GuideTable {
  headers: string[];
  rows: string[][];
}

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: GuideTable;
}

export interface GuideFaqItem {
  q: string;
  a: string;
}

export interface PageGuide {
  sections: GuideSection[];
  faqs: GuideFaqItem[];
  lastReviewed: string;
}

const REVIEWED = 'September 2026';

export const salaryTaxGuide: PageGuide = {
  lastReviewed: REVIEWED,
  sections: [
    {
      heading: 'How salary tax is actually worked out in Pakistan',
      paragraphs: [
        'Pakistan taxes salaried income on a slab basis, which means no single percentage applies to your whole salary. Your annual taxable salary is split across bands, and each band carries its own rate. The result is that a raise never pushes your entire income into a higher rate — only the portion above the threshold is taxed at the higher rate.',
        'Each slab in the table below has two parts: a fixed amount of tax accumulated from all the lower slabs, plus a percentage applied only to the amount by which your income exceeds that slab\'s starting point. This is exactly the arithmetic our calculator performs, and it is why the effective rate you end up paying is always lower than the headline rate of your top slab.',
      ],
      table: {
        headers: ['Annual taxable salary (PKR)', 'Tax payable'],
        rows: [
          ['0 – 600,000', 'Nil'],
          ['600,001 – 1,200,000', '1% of the amount above 600,000'],
          ['1,200,001 – 2,200,000', '6,000 + 11% of the amount above 1,200,000'],
          ['2,200,001 – 3,200,000', '116,000 + 20% of the amount above 2,200,000'],
          ['3,200,001 – 4,100,000', '316,000 + 25% of the amount above 3,200,000'],
          ['4,100,001 – 5,600,000', '541,000 + 29% of the amount above 4,100,000'],
          ['5,600,001 – 7,000,000', '976,000 + 32% of the amount above 5,600,000'],
          ['Above 7,000,000', '1,424,000 + 35% of the amount above 7,000,000'],
        ],
      },
    },
    {
      heading: 'A worked example',
      paragraphs: [
        'Take a monthly salary of PKR 250,000, which is PKR 3,000,000 a year. That income falls in the fourth slab, so the tax is PKR 116,000 plus 20% of (3,000,000 − 2,200,000) = 116,000 + 160,000 = PKR 276,000 for the year, or PKR 23,000 a month deducted at source by the employer.',
        'Notice the effective rate: PKR 276,000 on PKR 3,000,000 is 9.2%, not the 20% marginal rate of the slab. People frequently overestimate their liability because they apply the slab rate to their whole salary. If that same person receives a raise to PKR 3,300,000, only the PKR 100,000 above the 3,200,000 threshold is taxed at 25% — the rest is unaffected.',
      ],
    },
    {
      heading: 'The 9% surcharge has gone for salaried people',
      paragraphs: [
        'Until 30 June 2026, an individual whose taxable income exceeded PKR 10,000,000 paid a surcharge of 9% on the income tax computed — a charge on the tax itself, not on the income. Many calculators and articles still apply it.',
        'The Finance Act, 2026 abolished that surcharge for salaried individuals with effect from 1 July 2026, so it does not form part of the Tax Year 2027 computation on this page. It has not been removed for non-salaried individuals and associations of persons, who continue to face it above the threshold. If you are comparing our figure with an older payslip or another website and theirs is higher at the top end, this is usually the reason.',
      ],
    },
    {
      heading: 'What counts as taxable salary',
      paragraphs: [
        'Salary for tax purposes is broader than your basic pay. It generally includes basic salary, all cash allowances (house rent, conveyance, utilities, medical allowance paid in cash), bonuses, commissions, leave encashment, and the taxable value of perquisites such as a company-maintained car or accommodation provided by the employer.',
      ],
      bullets: [
        'Reimbursement of actual business expenses is not salary, provided it is supported by evidence.',
        'Medical treatment or reimbursement in line with the terms of employment is exempt up to the limit prescribed in the Ordinance, while a cash medical allowance is exempt only up to 10% of basic salary.',
        'Employer contributions to a recognised provident fund are treated differently from your own contribution — your contribution is not a deduction from taxable salary, but the accretion rules on the fund matter at withdrawal.',
        'Gratuity and pension receipts have their own exemption rules and are not simply added to monthly salary.',
      ],
    },
    {
      heading: 'Salaried vs non-salaried: why the numbers differ',
      paragraphs: [
        'Pakistan applies a separate, generally steeper slab table to business and professional income. You are treated as a salaried individual for slab purposes when salary is more than 75% of your total taxable income for the year. If you draw a salary but also earn substantial freelance or business income, the mix determines which table applies to you — a common reason two people with identical total income pay different tax.',
        'This calculator uses the salaried table. If most of your income comes from a business, a profession, or freelancing paid into your own account, the figure shown here will understate your liability.',
      ],
    },
    {
      heading: 'How employers deduct it, and how to check your payslip',
      paragraphs: [
        'Employers are required to deduct tax at source each month and deposit it, then report it so that it appears against your CNIC. In practice the annual liability is estimated at the start of the tax year (1 July to 30 June) and spread across twelve months, with adjustments later if your pay changes or you submit evidence of tax credits.',
        'To check your own payslip, take your annual gross taxable salary, run it through this calculator, and divide the annual tax by twelve. If the deduction on your payslip is materially higher, the usual explanations are a bonus being taxed in the month it is paid, a perquisite being valued and added, or arrears from a mid-year increment. If it is materially lower, your employer may not yet have applied a recent raise.',
      ],
    },
    {
      heading: 'Filing your return even when tax is already deducted',
      paragraphs: [
        'Salaried people often assume that because tax was deducted at source, there is nothing to file. Filing is a separate obligation, and it is what gets you onto the Active Taxpayer List (ATL). Being on the ATL matters in cash terms: non-filers face higher withholding rates on banking transactions, property transfers, vehicle registration and dividend income, which frequently costs more over a year than the effort of filing.',
        'Keep your annual salary certificate from your employer, your tax deduction certificate, bank statements, and evidence of any donations or investments you intend to claim. The return is filed on FBR\'s IRIS portal after the tax year closes, with the deadline usually falling on 30 September unless extended.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Is income up to PKR 600,000 really tax-free?',
      a: 'Yes. For salaried individuals, annual taxable income up to PKR 600,000 attracts no income tax. You may still be filing a return and may still have tax withheld on other transactions such as bank profit or mobile services, but no slab tax arises on the salary itself.',
    },
    {
      q: 'Do I still pay the 9% surcharge above PKR 10 million?',
      a: 'Not on salary income. The Finance Act, 2026 abolished the section 4AB surcharge for salaried individuals from 1 July 2026, so our Tax Year 2027 calculation does not include it. Non-salaried individuals and associations of persons are still subject to it above the threshold.',
    },
    {
      q: 'Should I enter my gross salary or my salary after deductions?',
      a: 'Enter annual gross taxable salary — before income tax, and before your own provident fund contribution is deducted. Do not subtract EOBI or PF from the figure you enter, because the slabs apply to gross taxable salary.',
    },
    {
      q: 'Why is my employer deducting more than this calculator shows?',
      a: 'The most common reasons are a bonus or arrears paid in that particular month, the taxable value of a perquisite such as a company car being included, or the employer estimating your full-year salary higher than the figure you entered here. Ask for your monthly tax computation sheet to reconcile it.',
    },
    {
      q: 'Can I reduce my salary tax legally?',
      a: 'The available reliefs are narrow for salaried people, but they exist: tax credit for approved charitable donations, credit for contributions to an approved pension fund, and correct treatment of medical benefits under your employment terms. Structuring genuine reimbursements properly also helps. Claiming anything you cannot document invites an audit.',
    },
    {
      q: 'Which tax year do these rates belong to?',
      a: 'The slabs shown here are the salaried-individual rates for Tax Year 2027, covering 1 July 2026 to 30 June 2027, as enacted by the Finance Act, 2026. We revise them after each Finance Act and update the review date at the bottom of this page.',
    },
  ],
};

export const ptaTaxGuide: PageGuide = {
  lastReviewed: REVIEWED,
  sections: [
    {
      heading: 'Why a phone brought into Pakistan has to be registered',
      paragraphs: [
        'Pakistan operates DIRBS — the Device Identification, Registration and Blocking System — run by the Pakistan Telecommunication Authority. Every handset that connects to a Pakistani mobile network is identified by its IMEI. A handset bought locally from an authorised seller is already registered and works indefinitely. A handset brought in from abroad is not, and after a short grace period on a Pakistani SIM its service is blocked until the applicable duties and taxes are paid.',
        'The charge is not a single "PTA tax". It is a bundle of import levies — regulatory duty, sales tax, withholding income tax, a mobile handset levy and related charges — collected together when you register the device. That is why the amount rises steeply with the value of the phone: several of the components are value-based.',
      ],
    },
    {
      heading: 'CNIC registration versus passport registration',
      paragraphs: [
        'There are two routes, and they cost different amounts. Registering on your passport is the concessionary route available to a traveller entering Pakistan, and it is limited: it must be done within a defined window of arrival and covers only one handset per passport per visit. Registering on your CNIC is the general route, available to anyone at any time, and it carries the higher charge.',
        'If you are an overseas Pakistani or a visitor bringing a phone in personally, the passport route is almost always cheaper — but you lose it if you delay past the permitted period after arrival, and you then fall back to the CNIC rate. If a relative abroad is sending you a phone by courier, the passport route is not available to you at all, because the concession attaches to the traveller.',
      ],
    },
    {
      heading: 'How to register, step by step',
      bullets: [
        'Find the IMEI: dial *#06# on the handset, or check Settings, or the box. Dual-SIM phones have two IMEIs; you normally register the first.',
        'Check the current status free of charge on the PTA DIRBS portal or by sending the IMEI to 8484 by SMS. It will tell you whether the device is already compliant, non-compliant, or blocked.',
        'Create an account on the PTA Device Verification System and start a registration request for the IMEI, selecting CNIC or passport as the basis.',
        'The system generates a Payment Slip ID (PSID) with the exact amount due. This figure from PTA — not an estimate from any website, including ours — is the amount you must pay.',
        'Pay the PSID through internet banking, a mobile wallet, an ATM or over the counter at a designated bank.',
        'Allow up to about 24 hours for the status to update to compliant. Keep the receipt; if the handset is later reported blocked in error, the PSID and receipt are your evidence.',
      ],
    },
    {
      heading: 'What our checker does and does not tell you',
      paragraphs: [
        'This tool gives you an estimate before you commit to buying or importing a handset, based on published duty bands and either a typical customs value for the model you select or a value you enter yourself. It is designed for planning: deciding whether importing a particular phone is worth it compared with buying a PTA-approved unit locally.',
        'It cannot be the final figure, for three reasons. Customs may assess a value different from the one you assumed; duty bands and levies change with government notifications, sometimes mid-year; and the exchange rate applied on the day affects the rupee amount. Always treat the PSID generated by PTA as authoritative.',
      ],
    },
    {
      heading: 'Buying a used phone in Pakistan: check before you pay',
      paragraphs: [
        'The single most expensive mistake in the local used-phone market is buying a handset that is not PTA-approved. The seller\'s phone may work on Wi-Fi perfectly, and may even have been working on a SIM during a grace period, but once blocked it is useless as a phone and effectively worth a fraction of what you paid.',
        'Before handing over money, send the IMEI to 8484 or check it on the DIRBS portal in front of the seller, and confirm the status says compliant or valid. Be particularly careful with phrases like "just needs PTA approval" — that approval is the expensive part, and it is often more than the discount you are being offered.',
      ],
    },
    {
      heading: 'Is importing still worth it?',
      paragraphs: [
        'For mid-range handsets, registration charges often erase the price advantage of buying abroad, especially once you account for the absence of a local warranty. For flagship models the arithmetic can still favour importing, because the overseas retail price gap is larger, but the duty on high-value devices is also the steepest. Run the estimate here, add the registration figure to the overseas purchase price and shipping, and compare that total with the local PTA-approved price before deciding.',
      ],
    },
  ],
  faqs: [
    {
      q: 'How long can I use a foreign phone in Pakistan before it is blocked?',
      a: 'A non-registered handset inserted with a Pakistani SIM typically works for a short grace period — around 60 days — after which mobile service on it is blocked until registration is completed. Wi-Fi continues to work, but the device cannot be used as a phone.',
    },
    {
      q: 'Is checking my IMEI free?',
      a: 'Yes. Checking status on the DIRBS portal or by SMS to 8484 costs nothing beyond the SMS charge. Only registration itself carries duty and taxes.',
    },
    {
      q: 'Can I register more than one phone on my passport?',
      a: 'No. The passport concession covers one handset per passport per entry into Pakistan, and only within the permitted period after arrival. Additional devices must be registered on a CNIC at the higher rate.',
    },
    {
      q: 'Why does the amount PTA charges differ from the estimate here?',
      a: 'Because the final figure depends on the customs value assessed for your specific device and the duty structure in force on that date. Our estimate uses published bands and a typical value, which is useful for planning but not a substitute for the PSID.',
    },
    {
      q: 'I paid but my phone is still blocked. What now?',
      a: 'Wait up to 24 hours first, as status updates are not instant. If it remains blocked, raise a complaint with PTA quoting the IMEI, the PSID and the payment receipt. Registration is tied to the IMEI, so the record can be traced.',
    },
    {
      q: 'Does registration transfer if I sell the phone?',
      a: 'Yes. Compliance attaches to the IMEI, not to the owner, so a properly registered handset stays registered after a sale. That is why a buyer should verify the IMEI status rather than rely on any paperwork shown to them.',
    },
  ],
};

export const invoiceGuide: PageGuide = {
  lastReviewed: REVIEWED,
  sections: [
    {
      heading: 'What a valid invoice must show in Pakistan',
      paragraphs: [
        'An invoice is not just a request for payment — it is the document your customer relies on to claim input tax and the document you rely on if a payment is disputed or if FBR questions your turnover. A weak invoice creates problems months later, when nobody remembers the conversation.',
        'Whether or not you are registered for sales tax, a complete invoice should carry the following. Where you are registered, the Sales Tax Act prescribes most of these as mandatory particulars of a tax invoice.',
      ],
      bullets: [
        'A serial number from a sequence that does not repeat or reset arbitrarily, and the date of issue.',
        'Your business name and address, and your NTN — plus your Sales Tax Registration Number if you are registered.',
        'The customer\'s name and address, and their NTN or STRN where they are a registered business.',
        'A description of each item or service, the quantity, the unit price and the line value.',
        'The rate and amount of sales tax charged, shown separately from the value of the supply.',
        'The total payable, in figures, with the currency stated if you bill overseas clients.',
        'Payment terms: the due date, the bank account, and what happens on late payment.',
      ],
    },
    {
      heading: 'Sales tax on the invoice: what rate applies',
      paragraphs: [
        'The standard rate of sales tax on goods is set federally and is currently 18%, while services are taxed by the provinces — Sindh, Punjab, Khyber Pakhtunkhwa, Balochistan and Islamabad each have their own authority and their own rate schedule, commonly in the 13% to 16% range depending on the service. Certain supplies are zero-rated, exempt, or subject to a reduced rate.',
        'This matters because the wrong rate on an invoice is your problem, not your customer\'s. If you are registered, charge the rate applicable to your specific supply under the schedule that applies to you, and state it explicitly. If you are not registered for sales tax, do not add a sales tax line at all — charging tax you are not authorised to collect is a serious exposure. Our generator lets you set the tax rate yourself, or set it to zero, precisely because the correct answer depends on what you supply and where.',
      ],
    },
    {
      heading: 'Withholding: why the client pays you less than the invoice',
      paragraphs: [
        'Companies, government departments and other prescribed persons are required to withhold income tax when they pay for goods or services, and to deposit it against your NTN. So an invoice for PKR 100,000 may be settled with a payment of, say, PKR 92,000 plus a tax deduction certificate for the balance.',
        'That deduction is not lost money — it is an advance against your own income tax, claimable when you file. The practical discipline is to collect the withholding tax certificate for every such payment, because without it you are paying the tax twice: once by deduction, once on your return. Rates are higher for persons not on the Active Taxpayer List, which is one of the clearest financial arguments for filing.',
      ],
    },
    {
      heading: 'Numbering, records and getting paid',
      paragraphs: [
        'Use a numbering scheme you can defend: a prefix, the year, and a sequence, such as INV-2026-014. Never issue two invoices with the same number, and never delete a number from the sequence — if an invoice is cancelled, mark it cancelled and keep it. Records supporting your turnover should be retained for at least six years, which is the general retention expectation under the tax laws.',
        'On collection, the details that actually shorten payment cycles are mundane: an explicit due date rather than "on receipt", a purchase order or contract reference so the invoice can be matched by the client\'s accounts team, correct bank details including IBAN, and the name of the person who approved the work. Add a late-payment clause if your terms allow it, and send the invoice the day the work is delivered rather than at month end.',
      ],
    },
    {
      heading: 'Common mistakes we see',
      bullets: [
        'Charging 18% sales tax when the supply is a service falling under a provincial regime at a different rate.',
        'Adding sales tax while unregistered, or quoting a sales tax number that has been suspended.',
        'Rounding each line item and then rounding the total again, so the invoice does not add up.',
        'Omitting the customer\'s NTN, which can obstruct their input tax claim and delay your payment.',
        'Reusing invoice numbers across a financial year, or restarting the sequence without a year prefix.',
        'Issuing an invoice in a foreign currency without stating the currency or the conversion basis.',
      ],
    },
    {
      heading: 'How to use this generator',
      paragraphs: [
        'Fill in your business details on the left, add your client, then add a line for each item or service with quantity and unit price. Set the tax rate to whatever applies to your supply — or zero if none does. Upload your logo if you want the invoice branded. The preview on the right updates as you type, and "Print / Download PDF" produces a clean document with the site navigation stripped out, so you can save it as a PDF or print it directly.',
        'Everything stays in your browser. We do not receive, store or transmit your client names, amounts or logo — which also means nothing is recoverable if you close the tab, so save the PDF before you leave.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Can I issue an invoice without being registered for sales tax?',
      a: 'Yes. Any business can issue an invoice for its supplies. What you cannot do without a Sales Tax Registration Number is charge sales tax on it. Leave the tax rate at zero and simply bill the value of your goods or services.',
    },
    {
      q: 'What sales tax rate should I put on the invoice?',
      a: 'It depends on what you supply and where. Goods are generally at the federal standard rate of 18%, while services fall under the relevant provincial authority at its own rate. Reduced rates, zero-rating and exemptions exist for specific supplies, so check the schedule that applies to your activity.',
    },
    {
      q: 'Is a PDF invoice acceptable, or does it have to be printed and signed?',
      a: 'An invoice delivered electronically is normally acceptable in commercial practice, and most clients now expect a PDF. Keep the file, and keep proof of when you sent it. Some clients, particularly government buyers, still ask for a signed and stamped hard copy for their own records.',
    },
    {
      q: 'Does this tool store my invoices?',
      a: 'No. The generator runs entirely in your browser and nothing is sent to us. Download or print the PDF before closing the page, because the data is not saved anywhere we can retrieve.',
    },
    {
      q: 'How long should I keep copies of invoices?',
      a: 'Keep them, and the records behind them, for at least six years. That aligns with the general record-retention expectation under Pakistan\'s tax laws and covers the period in which an assessment can typically be reopened.',
    },
    {
      q: 'The client deducted tax from my payment. Is that correct?',
      a: 'Usually yes — companies and other prescribed payers must withhold income tax on payments for goods and services. Ask for the withholding tax certificate so you can claim the amount as an advance against your own tax when you file your return.',
    },
  ],
};

export const quotationGuide: PageGuide = {
  lastReviewed: REVIEWED,
  sections: [
    {
      heading: 'A quotation is a commercial offer, so write it like one',
      paragraphs: [
        'A quotation states what you will supply, at what price, on what terms, and for how long that price holds. Once your customer accepts it, it usually becomes the basis of the contract between you — which is why a vague quotation is the origin of most scope disputes in small business.',
        'The difference from an invoice matters: a quotation is issued before the work, creates no tax liability by itself, and is not a demand for payment. You invoice after delivery, referencing the accepted quotation. Keeping the two documents distinct — different number series, different wording — avoids awkward arguments about whether a price was a firm commitment or an estimate.',
      ],
    },
    {
      heading: 'What to include',
      bullets: [
        'A quotation number and date, in a series separate from your invoices, such as QUO-2026-031.',
        'Your business details and the customer\'s, so the offer is clearly addressed.',
        'A validity date. Without one, you can be held to a price months later, after your own costs have risen.',
        'Itemised scope: quantities, specifications, and what each line actually covers.',
        'Price per line and the total, stating whether sales tax is included or extra.',
        'Exclusions — what is deliberately not in the price. This single section prevents most disputes.',
        'Delivery or completion timeline, and what it depends on from the customer.',
        'Payment terms: advance percentage, milestones, and the balance on delivery.',
        'Warranty or support terms, and how variations to scope will be priced.',
      ],
    },
    {
      heading: 'Pricing and tax presentation',
      paragraphs: [
        'Decide and state clearly whether your figures are inclusive or exclusive of sales tax. "Plus applicable taxes" is acceptable, but a customer comparing two quotations will read the smaller number first, so if a competitor quotes tax-inclusive and you quote tax-exclusive, you may look more expensive than you are. Show the tax as a separate line and give a gross total.',
        'Also anticipate withholding. If your customer is a company or government body, they will deduct income tax at source on payment. State your price as the gross contract value so there is no later argument that you expected to receive the full figure in cash.',
        'If you import materials or your costs are dollar-linked, say so and tie validity to a shorter window, or add a clause allowing revision if the exchange rate or a duty changes beyond a stated tolerance. That is far easier to agree up front than to negotiate after acceptance.',
      ],
    },
    {
      heading: 'Quotation, proforma invoice, or purchase order?',
      paragraphs: [
        'These are frequently confused. A quotation is your offer to the customer. A proforma invoice is a document you issue, often at the customer\'s request, so they can arrange payment or open a letter of credit before supply — it looks like an invoice but is not a tax invoice and does not record a completed supply. A purchase order comes from the customer and is their formal acceptance and instruction to supply.',
        'The clean sequence is: quotation → purchase order → delivery → tax invoice → payment. Reference the previous document in each step. When an audit or a dispute arrives, that chain is what establishes what was agreed.',
      ],
    },
    {
      heading: 'Improving your acceptance rate',
      bullets: [
        'Send it fast. The quotation that arrives the same day is frequently the one that wins.',
        'Offer options — a basic and an enhanced scope — rather than a single take-it-or-leave-it price.',
        'Justify the price briefly: materials specification, team, timeline. Bare numbers invite bargaining.',
        'Put the validity date in bold. A deadline that is real creates a reason to decide.',
        'Include your NTN and a professional logo; it signals a documented business, which matters to corporate buyers who need to book the expense.',
        'Follow up once, in writing, before the validity expires.',
      ],
    },
    {
      heading: 'Using this generator',
      paragraphs: [
        'Enter your details and the customer\'s, add a line per item with quantity and rate, set the tax rate that applies to your supply, and set the "valid until" date. Add your logo for a branded document, then use "Print / Download PDF" to produce a clean file with site navigation removed. The work happens in your browser — nothing is uploaded to us — so save the PDF before closing the tab.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Is a quotation legally binding in Pakistan?',
      a: 'On its own it is an offer, not a contract. It becomes binding when the customer accepts it within its validity period, which is why stating a validity date and clear terms matters. Adding "subject to availability" or similar qualifications limits your exposure further.',
    },
    {
      q: 'How long should a quotation stay valid?',
      a: 'Fifteen to thirty days suits most service work. Where your costs depend on imported materials or the exchange rate, use seven to fifteen days and say why. Never leave validity open-ended.',
    },
    {
      q: 'Should I show sales tax on a quotation?',
      a: 'If you are registered and the supply is taxable, yes — show the value, the tax as a separate line, and the gross total. If you are not registered, do not show a tax line at all.',
    },
    {
      q: 'What is the difference between a quotation and a proforma invoice?',
      a: 'A quotation is an offer to supply at a stated price. A proforma invoice is issued so the buyer can arrange payment or import documentation before the supply happens. Neither is a tax invoice, and neither records a completed transaction.',
    },
    {
      q: 'Can I change the price after the customer accepts?',
      a: 'Not unilaterally, once they have accepted within the validity period. You can, however, build in a variation clause covering scope changes, exchange rate movement beyond a stated tolerance, or duty changes — agreed in advance, in the quotation itself.',
    },
    {
      q: 'Do I need to number quotations?',
      a: 'It is not a statutory requirement the way invoice numbering is, but use a separate series anyway. It lets you reference the accepted quotation on the eventual invoice, which is what links your paperwork together if anything is questioned later.',
    },
  ],
};

export const payslipGuide: PageGuide = {
  lastReviewed: REVIEWED,
  sections: [
    {
      heading: 'What belongs on a Pakistan or US payslip',
      paragraphs: [
        'A payslip is the employee\'s record of how their pay was calculated. It may support a bank, tenancy, immigration, tax, or employment query. A payslip that shows only "salary" and a net figure fails those uses in either Pakistan or the United States.',
        'A properly drafted payslip separates earnings from deductions and shows the arithmetic in between.',
      ],
      bullets: [
        'Employer name, address and logo, plus the pay period and date of payment.',
        'Employee name, designation, department, employee number, CNIC and date of joining.',
        'Earnings side: basic salary, house rent allowance, conveyance allowance, medical allowance and any other allowance, each on its own line.',
        'Deductions side: income tax withheld, provident fund (employee share), EOBI contribution, loan or advance recovery, and any authorised deduction such as unpaid leave.',
        'Gross earnings, total deductions, and net pay — with net pay also written in words on documents intended for external use.',
        'Attendance data where pay depends on it: days worked, leave taken, leave balance, overtime hours.',
        'Bank name and account or the mode of payment, and signature blocks for the preparer and the employee.',
      ],
    },
    {
      heading: 'US payslips: federal, FICA, state, and benefit lines',
      paragraphs: [
        'A US pay statement normally separates federal income-tax withholding from Social Security and Medicare. State and local withholding, retirement contributions, health-plan deductions, garnishments, and other authorised deductions should each have their own line. Employers may also need to show hours, rate, overtime, year-to-date totals, and accrued leave under state law.',
        'This generator estimates 2026 federal income tax by annualising the monthly wage and applying the selected filing status and standard deduction. It also estimates employee Social Security, Medicare, Additional Medicare Tax where applicable, and listed state income tax. It does not reproduce Form W-4 adjustments, local tax, employer FICA, unemployment tax, or every state pay-statement rule.',
      ],
      bullets: [
        'Use USD and enter the employee’s federal filing status and work state.',
        'Keep Social Security and Medicare on separate deduction lines rather than combining them with federal income tax.',
        'Treat 401(k), HSA, insurance, and other benefits according to their actual pre-tax or post-tax payroll treatment.',
        'Track year-to-date wages because the Social Security wage base and Additional Medicare threshold apply annually.',
        'Check the employee’s work-state and locality rules for required statement details and withholding.',
      ],
    },
    {
      heading: 'Allowances: how HR usually structures them',
      paragraphs: [
        'Most Pakistani employers split a gross package into a basic salary plus allowances rather than paying one undifferentiated amount. Basic salary is the anchor: gratuity, provident fund contribution, EOBI and often leave encashment are all computed as a percentage of basic, so the split has real cost consequences. A common structure is basic at around 60% of gross with house rent at 30% to 45% of basic and conveyance and medical making up the rest.',
        'Two points are frequently mishandled. First, a cash medical allowance is exempt only up to 10% of basic salary, whereas actual medical treatment or reimbursement provided under the terms of employment has its own, more generous treatment — so the label on the line matters. Second, an allowance is not automatically tax-free just because it is called an allowance; cash allowances are generally part of taxable salary.',
      ],
    },
    {
      heading: 'Deductions: provident fund, EOBI, loans and tax',
      paragraphs: [
        'Provident fund is typically a matching contribution — the employee\'s share is deducted from salary and appears on the payslip, while the employer\'s share is a cost to the company and is not a deduction from the employee\'s pay. Showing the employer share as a deduction is a common error that makes an employee believe their salary is lower than it is.',
        'EOBI contributions are calculated on the prescribed wage basis, with a small employee share and a larger employer share. Loan and advance recoveries should show the instalment, and ideally the remaining balance, so the employee can see the schedule. Income tax withheld is the monthly portion of the employee\'s estimated annual liability under the salaried slabs.',
      ],
      bullets: [
        'Never deduct anything not authorised by law, the employment contract, or the employee\'s written consent.',
        'Keep the deduction narrative specific: "loan instalment 4 of 12" rather than "other deduction".',
        'Issue a tax deduction certificate annually so the employee can file their return.',
        'Retain payroll records; they are the primary evidence in a labour or tax dispute.',
      ],
    },
    {
      heading: 'A worked payslip',
      paragraphs: [
        'Take a gross monthly package of PKR 150,000 structured as basic 90,000, house rent 40,500, conveyance 12,000 and medical 7,500. Annual gross is PKR 1,800,000, which falls in the third salaried slab, giving annual tax of 6,000 + 11% of (1,800,000 − 1,200,000) = PKR 72,000, or PKR 6,000 a month withheld.',
        'Add an employee provident fund contribution of 8.33% of basic (PKR 7,497), an EOBI employee share, and a loan instalment of PKR 5,000. Total deductions come to roughly PKR 18,600, giving net pay of about PKR 131,400. The payslip should show every one of those lines — not simply PKR 131,400 against the word "salary".',
      ],
    },
    {
      heading: 'Legal and practical obligations',
      paragraphs: [
        'Provincial labour laws and the standing orders applicable to industrial and commercial establishments require employers to pay wages within a prescribed period after the wage period ends, to maintain wage records, and to avoid unauthorised deductions. Minimum wage is notified province by province and revised most years; payroll should be checked against the current notification each time it changes.',
        'Beyond compliance, a clear payslip reduces disputes. Most payroll grievances we see are not about the amount but about the absence of an explanation — an employee who can read their own deductions rarely escalates.',
      ],
    },
    {
      heading: 'Using this payslip generator',
      paragraphs: [
        'Enter your company details once, then the employee\'s information. Add each allowance on the earnings side and each deduction on the deduction side, using the custom rows for anything specific to your organisation. Income tax is calculated for you from the current salaried slabs. Upload your logo to brand the document, preview it, then print or save as PDF — the print output strips the site navigation so you get a clean payslip.',
        'All processing happens in your browser: employee names, salaries and deductions are never sent to us. That also means nothing is stored for you, so save each payslip as you generate it.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Is an employer in Pakistan legally required to give a payslip?',
      a: 'Employers must maintain wage records and pay wages within the prescribed period under the applicable provincial labour laws and standing orders, and a payslip is the standard way of evidencing that. In practice, any documented employer issues one — and employees need it for banks, landlords and visa applications.',
    },
    {
      q: 'What is the difference between gross and net salary?',
      a: 'Gross salary is basic pay plus all allowances before anything is taken out. Net salary, or take-home pay, is gross minus income tax, provident fund, EOBI, loan recoveries and any other authorised deduction.',
    },
    {
      q: 'Should the employer\'s provident fund contribution appear as a deduction?',
      a: 'No. Only the employee\'s share is deducted from salary and shown on the deductions side. The employer\'s matching contribution is a company cost and can be shown separately as information, but never as a deduction from the employee\'s pay.',
    },
    {
      q: 'Is the medical allowance tax-free?',
      a: 'A cash medical allowance is exempt only up to 10% of basic salary. Medical treatment or reimbursement of actual expenses provided under the terms of employment is treated more favourably. How the line is labelled and documented therefore affects the tax.',
    },
    {
      q: 'Can an employer deduct for damage or unpaid loans without consent?',
      a: 'Deductions must be authorised by law, the contract of employment, or the employee\'s written consent. Arbitrary deductions are challengeable before the labour authorities, so document the basis of every recovery on the payslip itself.',
    },
    {
      q: 'Does this tool save my employee data anywhere?',
      a: 'No. Everything runs locally in your browser and nothing is transmitted to us. Download or print each payslip before you close the page.',
    },
    {
      q: 'Does the US payslip reproduce exact Form W-4 withholding?',
      a: 'No. It estimates annual liability using filing status and the standard deduction. Form W-4 adjustments, multiple jobs, dependants, extra withholding, pay frequency, local tax, and year-to-date payroll can make the actual check different.',
    },
    {
      q: 'Does the US payslip include employer payroll taxes?',
      a: 'No. Its deductions show the employee share of Social Security and Medicare. Employer matching FICA and unemployment taxes are company liabilities and should not reduce employee net pay.',
    },
  ],
};

export const payrollGuide: PageGuide = {
  lastReviewed: REVIEWED,
  sections: [
    {
      heading: 'Running payroll in Pakistan: the monthly cycle',
      paragraphs: [
        'Payroll is a repeating sequence, and most errors come from doing the steps out of order. The reliable cycle is: freeze attendance and leave data, apply any changes to pay (increments, new joiners, exits), compute gross pay per employee, compute statutory and other deductions, review the register, pay, then file and record.',
        'Because Pakistan\'s tax year runs from 1 July to 30 June, the annual tax estimate resets in July. Payroll for July should therefore be recomputed from the new slabs and the new expected annual salary, not simply carried forward from June.',
      ],
    },
    {
      heading: 'Running payroll in the United States',
      paragraphs: [
        'US payroll separates federal income-tax withholding from FICA. Employees generally contribute Social Security up to the annual wage base and Medicare on wages, with Additional Medicare Tax above the applicable threshold. State and sometimes local withholding sit alongside those federal deductions.',
        'The calculator annualises the monthly wage, applies the selected filing status and standard deduction, estimates federal and selected state income tax, and adds the employee shares of Social Security and Medicare. It is a planning figure rather than a payroll filing engine: actual checks depend on Form W-4, pay frequency, year-to-date wages, benefits, local tax, and state withholding tables.',
      ],
      bullets: [
        'Collect Form W-4 and any state withholding certificate before the first payroll.',
        'Track year-to-date wages so Social Security stops at the annual wage base.',
        'Separate employee deductions from employer payroll liabilities and unemployment taxes.',
        'Check state and local registration, payday, wage-statement, leave, and final-pay rules.',
        'Use a payroll service or professional review when filing Forms 941, W-2, state returns, and deposits.',
      ],
    },
    {
      heading: 'What has to be deducted and deposited',
      bullets: [
        'Income tax on salary, withheld monthly from each employee\'s pay and deposited by the prescribed date, then reported in the periodic withholding statement.',
        'EOBI contributions on the notified wage basis, with an employee share and a larger employer share, deposited monthly.',
        'Provincial social security contributions (for example PESSI, SESSI, PSSSI depending on province) where the establishment is covered.',
        'Provident fund employee and employer contributions, remitted to the fund rather than retained by the company.',
        'Any court-ordered or contractually agreed recovery, such as a loan instalment.',
      ],
      paragraphs: [
        'Deposit deadlines matter more than the amounts. Late deposit of withheld tax attracts default surcharge and penalty, and the withholding statement is the document FBR reconciles against your employees\' returns. A mismatch there is one of the most common triggers for correspondence.',
      ],
    },
    {
      heading: 'Salary structuring and its cost consequences',
      paragraphs: [
        'How a package is split between basic salary and allowances changes your costs, not just the presentation. Gratuity, provident fund contributions, EOBI and often leave encashment are computed on basic salary, so a high-basic structure increases employer cost while a very low basic can breach minimum wage rules or look artificial. A basic of roughly 60% of gross, with house rent and smaller conveyance and medical allowances on top, is the common middle ground.',
        'Keep the structure consistent across grades and documented in an offer letter. Ad hoc structures for individual employees create gratuity disputes years later and make your payroll difficult to audit.',
      ],
    },
    {
      heading: 'Minimum wage, overtime and leave',
      paragraphs: [
        'Minimum wage in Pakistan is notified by each province and revised most years, so a payroll that was compliant last July may not be this July. Check every unskilled and entry-level salary against the current notification for the province where the employee works, not where your head office is.',
        'Overtime for covered workers is generally payable at twice the ordinary rate for hours beyond the statutory working hours. Leave entitlements — annual, casual and sick — also derive from the applicable provincial law and standing orders, and unused annual leave can attract encashment obligations. Track leave balances in payroll rather than separately, so the final settlement of a departing employee can be computed from one record.',
      ],
    },
    {
      heading: 'Joiners, leavers and final settlement',
      bullets: [
        'For a mid-month joiner, pro-rate on actual days and recompute the annual tax estimate on the salary they will actually receive in this tax year, not on twelve months.',
        'For a leaver, settle salary to the last working day, encash any leave due under policy, pay gratuity where the entitlement has vested, recover any outstanding loan or notice shortfall, and close the provident fund position.',
        'Issue a tax deduction certificate on exit so the employee can file, and retain the full settlement calculation.',
        'Update EOBI and social security records promptly; stale employee lists cause reconciliation problems long after the person has left.',
      ],
    },
    {
      heading: 'Records, controls and this tool',
      paragraphs: [
        'Keep the monthly payroll register, the payslips, the attendance basis, the deposit challans and the withholding statements together for each month. Retain them for at least six years. Separate the person who prepares payroll from the person who approves the payment, even in a small company — that single control prevents most payroll fraud.',
        'This payroll generator lets you add employees, computes income tax from the current salaried slabs, shows a consolidated summary of your payroll cost, and produces individual payslips you can print or save as PDF. Employee records are held in your own browser only: nothing is uploaded to us, and nothing is visible to anyone else using a different device. The trade-off is that clearing your browser data clears the records, so export or print what you need to keep.',
      ],
    },
  ],
  faqs: [
    {
      q: 'When must withheld salary tax be deposited?',
      a: 'Tax deducted from salary must be deposited with the government by the prescribed date following the month of deduction, and reported in the periodic withholding statement. Late deposit attracts default surcharge and penalty, so treat the date as fixed.',
    },
    {
      q: 'Is EOBI registration mandatory for small employers?',
      a: 'EOBI coverage applies to establishments meeting the prescribed employee threshold, and once covered, contributions on the notified wage basis are compulsory for both employer and employee. Check your establishment\'s status rather than assuming a small headcount exempts you.',
    },
    {
      q: 'How is gratuity calculated?',
      a: 'Gratuity is commonly computed as thirty days\' wages, based on basic salary, for each completed year of service, subject to the applicable standing orders or your own more generous policy. Because it is based on basic pay, the salary structure directly affects the eventual cost.',
    },
    {
      q: 'Do I recompute tax when an employee gets a raise mid-year?',
      a: 'Yes. Recalculate the expected annual taxable salary from the date of the increment and spread the revised liability over the remaining months of the tax year, otherwise the employee faces a large catch-up deduction later or a shortfall at filing.',
    },
    {
      q: 'Is payroll data entered here sent to your servers?',
      a: 'No. Employee names, salaries and deductions stay in your browser. That keeps the data private, but also means we cannot recover it — print or save what you need.',
    },
    {
      q: 'How many employees does this tool handle?',
      a: 'It is built for small teams, which is where spreadsheets usually break down. For a large or multi-location workforce with shift and overtime complexity, dedicated payroll software with an audit trail is the better choice.',
    },
  ],
};

export const companyRegistrationGuide: PageGuide = {
  lastReviewed: REVIEWED,
  sections: [
    {
      heading: 'Choosing a structure before you register anything',
      paragraphs: [
        'The registration route follows from the structure, and the structure follows from liability, ownership and how you intend to raise money or take on clients. Changing structure later is possible but costs time and paperwork, so it is worth an hour of thought now.',
      ],
      table: {
        headers: ['Structure', 'Registered with', 'Liability', 'Best suited to'],
        rows: [
          ['Sole proprietorship', 'FBR (NTN) only', 'Unlimited — personal assets exposed', 'Single owner, freelancers, small trading and service businesses'],
          ['Partnership / AOP', 'Registrar of Firms + FBR', 'Unlimited, joint and several', 'Two or more owners sharing profits, professional firms'],
          ['Single Member Company', 'SECP + FBR', 'Limited to the company', 'Solo founder wanting limited liability and a corporate identity'],
          ['Private limited company', 'SECP + FBR', 'Limited to shareholding', 'Multiple shareholders, outside investment, corporate clients'],
          ['LLP', 'SECP + FBR', 'Limited', 'Professional partnerships wanting limited liability'],
        ],
      },
    },
    {
      heading: 'Sole proprietorship: what registration actually involves',
      paragraphs: [
        'There is no separate legal entity to create. You register yourself as a business with FBR, obtain an NTN in your own name with a business name and address, and use that to open a current account in the business name. If you supply taxable goods or services, you then register for sales tax with FBR or the relevant provincial authority.',
      ],
      bullets: [
        'Documents: CNIC, proof of business address (ownership documents or tenancy agreement plus a recent utility bill), a mobile number and email registered in your own name, and a letterhead.',
        'Process: create an IRIS account on FBR\'s portal, complete the registration form with the business name, address and principal activity, and add the business branch details.',
        'Bank account: banks generally ask for the NTN certificate, the letterhead, a business stamp and sometimes a chamber of commerce membership.',
        'Timeline: typically a few working days once your documents are in order.',
        'Ongoing: file an annual income tax return, and monthly or quarterly sales tax returns if registered.',
      ],
    },
    {
      heading: 'Partnership firm registration',
      paragraphs: [
        'A partnership is created by agreement, but registering it with the Registrar of Firms in the relevant province gives you a registration certificate that banks and clients expect, and it makes the firm\'s terms enforceable in ways an unregistered firm\'s are not.',
        'The heart of the process is the partnership deed. Have it drafted properly on stamp paper of the prescribed value, covering capital contributions, profit and loss sharing ratios, management roles and authority to bind the firm, drawings, admission of new partners, retirement and death, dispute resolution, and dissolution. Most partnership litigation in Pakistan traces back to a deed that was silent on exit terms.',
      ],
      bullets: [
        'Documents: partnership deed on stamp paper, CNICs of all partners, Form I, proof of the firm\'s address, and the prescribed fee.',
        'Process: execute the deed, have it notarised, then file Form I with the Registrar of Firms along with the deed and partner CNICs.',
        'Then: obtain the firm\'s NTN from FBR as an Association of Persons, and open a bank account in the firm\'s name.',
        'Timeline: commonly two to four weeks, depending on the registrar\'s office.',
      ],
    },
    {
      heading: 'Private limited company incorporation with SECP',
      paragraphs: [
        'Incorporation is done online through SECP\'s eServices portal and is faster than most people expect — often a few working days when the name is clean and the documents are consistent. The steps are sequential and each depends on the last being accepted.',
      ],
      bullets: [
        'Reserve the name: submit up to three choices. Names that are deceptively similar to an existing company, or that imply government patronage or a regulated activity, are refused. This is the most common cause of delay.',
        'Prepare the constitutive documents: the Memorandum of Association setting out the objects, and the Articles of Association governing internal management. SECP\'s standard specimens are acceptable for most businesses.',
        'Decide the authorised and paid-up capital, and the shareholding split between subscribers. There is no high statutory minimum for a private company, but the figure affects the filing fee.',
        'Obtain digital signatures for the subscribers and directors, and have CNICs (or passports for foreign nationals) ready, along with the registered office address.',
        'File the incorporation application with the subscribers\' details, directors\' consents and the registered office address, and pay the fee, which varies with authorised capital and whether you file online.',
        'Receive the Certificate of Incorporation with the company\'s Incorporation Number and the digitally issued constitutive documents.',
      ],
    },
    {
      heading: 'What has to happen after incorporation',
      paragraphs: [
        'An incorporated company that stops at the certificate is not yet able to trade properly, and it starts accruing compliance obligations immediately.',
      ],
      bullets: [
        'Register with FBR for the company\'s own NTN, and for sales tax if applicable.',
        'Open a company bank account, and deposit the subscription money against the shares.',
        'Issue share certificates and maintain the statutory registers of members, directors and charges.',
        'Appoint the first auditor within the period prescribed by the Companies Act, 2017.',
        'File the annual return of the company with SECP, and the audited or prescribed financial statements as applicable to your company\'s size.',
        'Register with EOBI and the relevant provincial social security and labour departments once you hire employees.',
        'Notify SECP of any change in directors, registered office or share capital within the prescribed period — late filings attract penalties that accumulate quietly.',
      ],
    },
    {
      heading: 'Costs, timelines and where projects go wrong',
      paragraphs: [
        'Government fees are published: SECP\'s fee schedule depends on authorised capital and filing mode, stamp duty on a partnership deed depends on the province and the capital, and FBR registration itself carries no fee. Professional fees, if you engage help, are separate and vary. Because these schedules change, confirm the current figure at the time of filing rather than relying on a number quoted in an older article.',
        'The delays we see repeatedly are: a proposed company name too close to an existing one; a tenancy agreement or utility bill that does not match the address on the application; a mobile number or email not registered in the applicant\'s own name, which blocks FBR verification; and a partnership deed that the registrar returns for insufficient stamp value. Fixing each of these before filing is far cheaper than responding to an objection.',
      ],
    },
    {
      heading: 'United States LLC formation: the essential terms',
      paragraphs: [
        'A US limited liability company is formed under state law, not federal law. The filing is usually called Articles of Organization or a Certificate of Formation, depending on the state. An LLC can protect its owners, called members, from many business liabilities, but that protection depends on keeping business and personal affairs separate and does not excuse personal guarantees, fraud, or the member’s own misconduct.',
        'Forming in Delaware or Wyoming is not automatically better. A business operating in another state may still need to register there as a foreign LLC, appoint another registered agent, and pay fees in both states. For most small owner-operated businesses, the home state is the practical starting point unless a US attorney or tax adviser identifies a specific reason otherwise.',
      ],
      bullets: [
        'Choose the formation state and confirm the name against that state’s business registry.',
        'Appoint a registered agent with a physical address in the formation state to receive official notices.',
        'File the formation document and pay the state filing fee.',
        'Prepare an operating agreement covering ownership, contributions, voting, distributions, transfers, exits, and dissolution—even for a single-member LLC.',
        'Apply to the IRS for an Employer Identification Number when required for banking, employees, elections, or federal filings.',
        'Review federal beneficial ownership reporting requirements at the time of formation because rules and exemptions have changed repeatedly.',
        'Obtain state and local licences, sales-tax permits, payroll accounts, or professional approvals for the actual activity and location.',
        'Calendar annual reports, franchise taxes, registered-agent renewals, and other state-specific maintenance.',
      ],
    },
    {
      heading: 'How a US LLC is taxed',
      paragraphs: [
        'LLC is a state-law entity type, not a single federal tax status. By default, a single-member LLC is generally disregarded for federal income tax, while a multi-member LLC is generally taxed as a partnership. An eligible LLC may elect corporate taxation and, if it qualifies, later elect S corporation treatment. The best choice depends on profits, payroll, ownership, residency, benefits, and state rules—not merely on which election sounds cheaper.',
        'Non-US owners face additional reporting and withholding issues. A foreign-owned single-member US LLC can have federal information-return duties even when no ordinary US income tax is due. Missing those filings can carry significant penalties, so international founders should obtain qualified cross-border advice before formation or taking payments.',
      ],
    },
  ],
  faqs: [
    {
      q: 'How long does it take to register a private limited company in Pakistan?',
      a: 'With a clean name and complete documents, SECP incorporation through eServices commonly completes within a few working days. Name objections, inconsistent address documents or missing digital signatures are what stretch it into weeks.',
    },
    {
      q: 'Is there a minimum capital requirement for a private limited company?',
      a: 'There is no high statutory minimum paid-up capital for an ordinary private company, so many are incorporated with a modest figure. Your chosen authorised capital does affect the SECP filing fee, and certain regulated activities carry their own capital requirements.',
    },
    {
      q: 'Can a single person own a company?',
      a: 'Yes. A Single Member Company gives one individual limited liability and a corporate identity, with a nominee required to be named in case of the member\'s death. It can later be converted into a private limited company when other shareholders join.',
    },
    {
      q: 'Do I need to register a business name for a sole proprietorship?',
      a: 'There is no separate business-name registry for proprietorships. You register the business name as part of your FBR registration and use it on your NTN certificate and bank account. If you want exclusive rights to the name, that is a trade mark application, which is a different process.',
    },
    {
      q: 'Can a foreign national be a director or shareholder?',
      a: 'Yes, subject to security clearance requirements and the applicable rules for foreign shareholding in the relevant sector. Expect additional documentation and a longer timeline than an all-resident incorporation.',
    },
    {
      q: 'What ongoing filings does a registered company face?',
      a: 'At minimum, the annual return to SECP, financial statements as applicable to the company\'s size, the annual income tax return to FBR, and sales tax and withholding statements where applicable. Changes in directors, office or capital must also be notified within prescribed periods.',
    },
    {
      q: 'Is a US LLC the same as a corporation?',
      a: 'No. An LLC is a state-law entity with flexible management and federal tax classification. A corporation is a different legal form. An LLC can elect corporate tax treatment without becoming a corporation under state law.',
    },
    {
      q: 'Should I form my LLC in Delaware or Wyoming?',
      a: 'Not automatically. If you operate in another state, you may have to register there too and pay two sets of fees. Home-state formation is often simpler for a small operating business; obtain state-specific advice before choosing otherwise.',
    },
    {
      q: 'Does every US LLC need an operating agreement and EIN?',
      a: 'An operating agreement is strongly recommended and may be required or expected under state or banking practice. EIN requirements vary, but it is commonly needed for employees, multi-member entities, tax elections, and business banking.',
    },
  ],
};

export const legalDraftingGuide: PageGuide = {
  lastReviewed: REVIEWED,
  sections: [
    {
      heading: 'Why the drafting matters more than the signature',
      paragraphs: [
        'Under the Contract Act, 1872, an agreement is enforceable when there is offer, acceptance, lawful consideration, capacity and lawful object. That is a low bar, and it is why so many unenforceable-in-practice contracts exist: they are technically valid but so imprecise that neither party can prove what was promised.',
        'Good drafting does one thing above all — it removes ambiguity about obligations, timelines, money and exit. A dispute is rarely about whether a contract existed; it is about what it required. Every clause should be readable by someone who was not in the room.',
      ],
    },
    {
      heading: 'Rent and lease agreements',
      paragraphs: [
        'Tenancy in Pakistan is governed provincially — the Sindh Rented Premises Ordinance, the Punjab Rented Premises Act and their counterparts elsewhere — and those statutes override contrary terms in your agreement. Registration and stamping requirements depend on the province and the term of the lease, and an unregistered long lease can be difficult to enforce.',
      ],
      bullets: [
        'Identify the premises precisely, with address, area and a schedule or plan for commercial space.',
        'State the term, the commencement date, and the renewal mechanism with the escalation percentage.',
        'Rent amount, due date, mode of payment, and the consequence of late payment.',
        'Security deposit: amount, what it may be applied against, and the timeline for refund.',
        'Split responsibility for utilities, property tax, maintenance and major repairs explicitly.',
        'Permitted use, and whether subletting or alteration is allowed.',
        'Termination: notice period for each side, and grounds for immediate termination.',
        'Handover condition at the end of the term, and an inventory where the premises are furnished.',
      ],
    },
    {
      heading: 'Partnership deeds',
      paragraphs: [
        'A partnership deed is the constitution of the firm, and the Partnership Act, 1932 fills gaps with default rules you may not want. The clauses that prevent litigation are the unglamorous ones about money and exit.',
      ],
      bullets: [
        'Capital contribution of each partner, and whether further contributions can be required.',
        'Profit and loss sharing ratios, and how they change if capital changes.',
        'Drawings: how much each partner may withdraw, and how often.',
        'Management authority: who can sign, who can bind the firm, and what needs unanimous consent.',
        'Admission of a new partner, retirement, expulsion, and what happens on a partner\'s death.',
        'Valuation method for a departing partner\'s share — agreed in advance, not negotiated in a dispute.',
        'Non-compete and confidentiality obligations during and after the partnership.',
        'Dispute resolution, and the mechanics of dissolution and winding up.',
      ],
    },
    {
      heading: 'Service, vendor and employment agreements',
      paragraphs: [
        'For service and vendor contracts, the scope schedule is the contract. Vague scope produces the two commonest disputes in Pakistani freelancing and consultancy: unbounded revisions, and payment withheld because "the work is not finished". Define deliverables, acceptance criteria, the number of revision rounds included, and how out-of-scope work is priced and approved.',
        'Employment agreements should align with the applicable provincial labour laws and standing orders, which set floors that a contract cannot undercut. State designation, reporting line, place of work, remuneration structure, probation, working hours, leave entitlement, notice period on each side, confidentiality, and ownership of work product. Restrictive covenants must be reasonable in scope and duration to have any prospect of enforcement.',
      ],
      bullets: [
        'Payment terms: milestones, advance, currency, and what happens on late payment.',
        'Intellectual property: who owns the output, and when ownership transfers — commonly on full payment.',
        'Confidentiality, with a defined term and carve-outs for information already public.',
        'Limitation of liability, and indemnities that are mutual rather than one-sided.',
        'Termination for convenience and for breach, with the cure period spelled out.',
        'Force majeure, defining the events and the consequence rather than just naming the concept.',
        'Governing law and forum — name the city whose courts will hear a dispute, or the arbitration seat.',
      ],
    },
    {
      heading: 'Stamping, witnesses and registration',
      paragraphs: [
        'Execution formalities are where otherwise sound documents fail. Stamp duty is a provincial levy and the prescribed value depends on the instrument and the amounts involved; an under-stamped document can be inadmissible until the deficiency and a penalty are paid. Certain instruments, notably leases beyond a specified term and documents affecting immovable property, require registration under the Registration Act, 1908.',
        'Practical discipline: use stamp paper of the correct value in the correct province, have the parties sign every page, include two witnesses with their CNIC numbers and signatures, notarise where the counterparty or a bank expects it, register where the law requires it, and give each party an original. Keep a scanned copy — originals go missing precisely when they are needed.',
      ],
    },
    {
      heading: 'What we can help with',
      paragraphs: [
        'Use the form below to describe the agreement you need and the commercial terms you have in mind. We will come back on scope, the formalities that apply in your province, and what the drafting will cover. For anything already in dispute, or where a large sum or immovable property is involved, engage a lawyer directly — drafting and litigation are different exercises, and the second needs someone who can appear for you.',
      ],
    },
    {
      heading: 'United States agreements: name the state and relationship',
      paragraphs: [
        'US contract law is largely state law. A document should identify its governing law and dispute forum, but a chosen-law clause cannot always override mandatory rules where people work, property sits, or consumers live. There is no responsible one-template-for-all-states approach, especially for employment, residential leases, construction, regulated services, and consumer contracts.',
        'Common business documents include LLC operating agreements, independent-contractor and consulting agreements, vendor and software contracts, confidentiality agreements, employment offer letters, intellectual-property assignments, and commercial leases. Each should define parties, scope, payment, ownership, confidentiality, warranties, liability, termination, dispute process, governing law, and signature method in language suited to the transaction.',
      ],
      bullets: [
        'LLC operating agreement: membership percentages, capital, voting, management, distributions, tax treatment, transfers, buyouts, death or disability, and dissolution.',
        'Independent-contractor agreement: deliverables, control, tax responsibility, expenses, intellectual property, confidentiality, and termination—without misclassifying an employee.',
        'NDA: define confidential information, permitted use, exclusions, duration, return or destruction, and remedies; avoid an unlimited restraint disguised as confidentiality.',
        'Employment terms: at-will language where lawful, wage and hour compliance, benefits, leave, intellectual property, confidentiality, and state restrictions on non-competes.',
        'Lease: permitted use, rent and escalation, deposit, maintenance, insurance, casualty, assignment, default, and state or local disclosures.',
        'Electronic signatures are generally recognized, but notarisation, witnessing, or recording may still apply to particular documents.',
      ],
    },
    {
      heading: 'When US attorney review is essential',
      paragraphs: [
        'Use a lawyer licensed in the relevant state when a transaction involves real estate, securities or investors, regulated activity, substantial liability, employees in multiple states, a dispute, a personal guarantee, or a clause whose enforceability varies sharply by state. TaxSaathi’s US material is educational and intake-oriented; it is not a substitute for state-specific legal advice or representation.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Does a contract in Pakistan have to be on stamp paper to be valid?',
      a: 'Validity under the Contract Act does not depend on stamp paper, but admissibility and enforcement can. Many instruments attract provincial stamp duty, and an under-stamped document may not be accepted by a court until the deficiency plus a penalty is paid. Use the correct stamp value for the instrument and province.',
    },
    {
      q: 'Is an agreement signed over email or WhatsApp enforceable?',
      a: 'Electronic records and signatures have legal recognition under the Electronic Transactions Ordinance, 2002, so a clear exchange can be enforceable. It is still weaker evidence than a properly executed document, and some instruments require specific formalities or registration regardless.',
    },
    {
      q: 'How many witnesses does an agreement need?',
      a: 'Two witnesses is the standard practice for most agreements, and specific instruments have their own requirements. Record each witness\'s full name, CNIC number and signature — an unidentifiable witness is of little use if the document is challenged.',
    },
    {
      q: 'Does a rent agreement have to be registered?',
      a: 'It depends on the province and the term. Leases beyond the period specified in the applicable law generally require registration, and registration also gives you a far stronger position in a possession dispute. Short residential tenancies are commonly notarised rather than registered.',
    },
    {
      q: 'Are non-compete clauses enforceable in Pakistan?',
      a: 'They are viewed narrowly. A restraint that is unreasonable in duration, geography or scope risks being treated as an unlawful restraint of trade. Confidentiality and non-solicitation obligations, drafted tightly, are generally more defensible than a broad ban on working in an industry.',
    },
    {
      q: 'Can I just use a template I found online?',
      a: 'A template is a starting point, but most circulating online are drafted for other jurisdictions and ignore Pakistani stamp duty, registration and labour requirements. The clauses that matter — scope, payment, exit, governing forum — are also the ones a generic template leaves blank or wrong.',
    },
    {
      q: 'Can one US contract template be used in every state?',
      a: 'Not safely. Contract principles overlap, but employment, tenancy, consumer, non-compete, notice, and signature rules vary by state and sometimes by city. Name the relevant state and obtain local review where the stakes are material.',
    },
    {
      q: 'What belongs in a US LLC operating agreement?',
      a: 'At minimum: members and ownership, capital contributions, management and voting, profit and loss allocations, distributions, tax elections, transfer restrictions, buyout rules, records, disputes, and dissolution. State default rules fill any gaps you leave.',
    },
    {
      q: 'Is an independent-contractor label enough in the US?',
      a: 'No. Federal and state agencies examine the real working relationship, including control, independence, and economic dependence. A contract helps document the arrangement but cannot convert an employee into a contractor by wording alone.',
    },
  ],
};

export const taxAppealGuide: PageGuide = {
  lastReviewed: REVIEWED,
  sections: [
    {
      heading: 'First, identify what you have actually received',
      paragraphs: [
        'Not every letter from FBR is an assessment, and the right response depends entirely on which stage you are at. Read the heading, the section quoted and the date, because the section number tells you what is being asked and the date starts a clock.',
      ],
      bullets: [
        'A notice to file a return: you have not filed, and FBR is requiring you to. Filing usually closes it.',
        'A notice calling for information or documents: a request at the enquiry stage. Answer it fully and on time; this is the cheapest point to resolve a case.',
        'A show-cause or amendment notice: FBR is proposing to change your assessment and must give you an opportunity to be heard. Your written reply here shapes everything that follows.',
        'An assessment or amended assessment order: a decision has been made and a demand created. This is what you appeal.',
        'A recovery notice, attachment of a bank account or a notice to a third party: enforcement of an existing demand. This is urgent and needs immediate action.',
      ],
    },
    {
      heading: 'Responding to a notice properly',
      paragraphs: [
        'The single most damaging thing a taxpayer does is ignore a notice. An unanswered notice typically results in a best-judgement assessment based on FBR\'s own estimates, and you then spend far more effort dismantling a number than you would have spent explaining your position in the first place.',
        'A good reply is specific and documented. Address each point raised, in order. Attach the evidence — bank statements, invoices, contracts, withholding certificates, import documents — and reference each attachment in the text. Keep the tone factual. If you genuinely need more time, request an extension in writing before the deadline rather than after it, and say why.',
      ],
    },
    {
      heading: 'The appeal ladder',
      paragraphs: [
        'Pakistan\'s tax appeal structure is sequential: you cannot skip a tier, and each tier has its own time limit and its own character.',
      ],
      table: {
        headers: ['Stage', 'Forum', 'Nature of the hearing'],
        rows: [
          ['First appeal', 'Commissioner Inland Revenue (Appeals)', 'Full review of facts and law, usually with a hearing'],
          ['Second appeal', 'Appellate Tribunal Inland Revenue (ATIR)', 'Final fact-finding authority; independent of FBR'],
          ['Reference', 'High Court', 'Questions of law only'],
          ['Final appeal', 'Supreme Court of Pakistan', 'Leave to appeal on substantial questions of law'],
        ],
      },
    },
    {
      heading: 'Time limits and the deposit question',
      paragraphs: [
        'An appeal to the Commissioner (Appeals) must generally be filed within thirty days of service of the order, and a further appeal to the Tribunal within sixty days of the appellate order. These periods are strict. Condonation of delay is possible but discretionary and requires a genuine, evidenced reason — a missed deadline is the most common way a good case is lost.',
        'Filing an appeal does not automatically stop recovery of the demand. Where you need to prevent enforcement while the appeal is pending, a separate application for stay is required, and the appellate authority may require part of the demand to be deposited or secured. Alternative dispute resolution is also available in appropriate cases and can be faster than litigation, particularly where the dispute is about quantum rather than principle.',
      ],
    },
    {
      heading: 'Preparing a case that can win',
      bullets: [
        'Assemble the complete file: the notices, your replies, the order under appeal, and every document you rely on, paginated.',
        'Identify the grounds precisely — a factual error, a misapplication of a section, a denial of the opportunity to be heard, or a legal position supported by reported decisions.',
        'Draft grounds of appeal that are specific. "The order is bad in law" argues nothing; "the addition under section X ignored the withholding certificates at pages 14–19" argues something.',
        'Reconcile your figures with FBR\'s and explain each difference; unexplained gaps are read against you.',
        'Attend hearings or ensure your authorised representative does, with the file. Repeated non-appearance can result in the appeal being decided against you on that basis alone.',
        'Keep proof of filing and of every submission made.',
      ],
    },
    {
      heading: 'How to avoid ending up here',
      paragraphs: [
        'Most of the assessments we see could have been prevented by ordinary record discipline: filing on time, staying on the Active Taxpayer List, collecting withholding tax certificates for every deduction, keeping bank accounts for business and personal use separate, retaining invoices and contracts for at least six years, and ensuring the wealth statement is consistent with declared income. Where a transaction is unusual — a gift, an inheritance, a foreign remittance, a property sale — keep the documentation at the time, not when it is asked for three years later.',
      ],
    },
    {
      heading: 'Getting help with your case',
      paragraphs: [
        'Describe your situation in the form below — the section quoted, the date of the notice or order, the amount in dispute and what has happened so far. We will tell you what stage you are at, what the applicable deadline is, and what the realistic options are. If the matter requires representation before the Tribunal or a High Court reference, we will say so plainly rather than take on work that needs a tax lawyer.',
      ],
    },
  ],
  faqs: [
    {
      q: 'How long do I have to appeal an FBR assessment order?',
      a: 'An appeal to the Commissioner Inland Revenue (Appeals) is generally to be filed within thirty days of service of the order, and a subsequent appeal to the Appellate Tribunal within sixty days of the appellate order. Treat these deadlines as hard, because condonation of delay is discretionary.',
    },
    {
      q: 'What happens if I ignore a tax notice?',
      a: 'FBR can proceed to a best-judgement assessment using its own estimates, create a demand, and then move to recovery — including attaching bank accounts. Reversing that is far more expensive than replying to the notice with documents.',
    },
    {
      q: 'Does filing an appeal stop recovery of the demand?',
      a: 'Not automatically. You need to apply for a stay, and the authority may require part of the demand to be paid or secured while the appeal is pending.',
    },
    {
      q: 'Can I handle an appeal myself?',
      a: 'You may appear personally, and for a straightforward factual dispute with good documents that is sometimes workable. Where the dispute turns on the interpretation of a section or on reported case law, an authorised representative or a tax lawyer materially improves your prospects.',
    },
    {
      q: 'Is there an alternative to litigation?',
      a: 'Yes. Alternative dispute resolution is available for eligible cases and can resolve a quantum dispute faster than the appeal ladder. It is not suited to matters where you need a ruling on a point of principle.',
    },
    {
      q: 'What does an appeal cost?',
      a: 'There is a prescribed filing fee at each appellate tier, which is modest, plus professional fees if you engage representation. Weigh those against the amount in dispute and the strength of your documents before proceeding — sometimes the sensible course is to correct the position and pay.',
    },
  ],
};

export const usTaxGuide: PageGuide = {
  lastReviewed: REVIEWED,
  sections: [
    {
      heading: 'How US income tax actually works',
      paragraphs: [
        'The United States taxes individuals on a progressive schedule: the first slice of your taxable income is taxed at 10%, the next slice at 12%, and so on up to 37%. A common misunderstanding is that moving into a higher bracket taxes all of your income at that higher rate. It does not. Only the dollars inside each band are taxed at that band\'s rate, which is why your effective rate is always lower than your top bracket.',
        'Federal income tax is only one of three layers. On top of it sit the payroll taxes — Social Security at 6.2% of wages up to an annual wage base, and Medicare at 1.45% with no ceiling — and then state income tax, which ranges from nothing at all in nine states to over 12% at the top in California. Our calculator shows all three so the take-home figure resembles what actually lands in your bank account.',
      ],
    },
    {
      heading: 'Tax year 2026 brackets and standard deduction',
      paragraphs: [
        'The figures below are the IRS inflation-adjusted amounts for tax year 2026, the year you report on a return filed in early 2027. The standard deduction is $16,100 for single filers and those married filing separately, $32,200 for married couples filing jointly, and $24,150 for heads of household.',
      ],
      table: {
        headers: ['Rate', 'Single taxable income', 'Married filing jointly'],
        rows: [
          ['10%', 'Up to $12,400', 'Up to $24,800'],
          ['12%', '$12,400 – $50,400', '$24,800 – $100,800'],
          ['22%', '$50,400 – $105,700', '$100,800 – $211,400'],
          ['24%', '$105,700 – $201,775', '$211,400 – $403,550'],
          ['32%', '$201,775 – $256,225', '$403,550 – $512,450'],
          ['35%', '$256,225 – $640,600', '$512,450 – $768,700'],
          ['37%', 'Above $640,600', 'Above $768,700'],
        ],
      },
    },
    {
      heading: 'Filing status changes everything',
      bullets: [
        'Single — unmarried on the last day of the year with no qualifying dependent.',
        'Married filing jointly — one return for both spouses, the widest brackets and the largest standard deduction. Also available to a surviving spouse for two years after a spouse\'s death.',
        'Married filing separately — narrower brackets and several credits are lost, but it can protect one spouse from the other\'s tax debts or help with income-driven student loan repayment.',
        'Head of household — unmarried, paying more than half the cost of a home for a qualifying child or relative. Brackets and the standard deduction sit between single and joint.',
      ],
      paragraphs: [
        'Choosing the wrong status is one of the most expensive routine errors on a US return. If you qualify as head of household but file as single, you pay tax on roughly $8,000 more income than you needed to.',
      ],
    },
    {
      heading: 'Social Security, Medicare and the self-employed',
      paragraphs: [
        'Employees pay 6.2% Social Security on wages up to the annual wage base — $184,500 for 2026 — and 1.45% Medicare on every dollar, with the employer matching both. High earners pay an extra 0.9% Additional Medicare tax on wages above $200,000 single, $250,000 joint and $125,000 married filing separately.',
        'Self-employed people pay both the employee and employer halves, a combined 15.3%, but only on 92.35% of net earnings, and half of the resulting self-employment tax is deductible against income tax. Our calculator applies all three of these adjustments, which is why a $100,000 1099 result differs from a $100,000 W-2 result.',
      ],
    },
    {
      heading: 'State income tax: nine states with none, and everyone else',
      paragraphs: [
        'Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Wyoming, New Hampshire and Washington do not tax wage income. A growing group — Arizona, Colorado, Georgia, Idaho, Illinois, Indiana, Iowa, Kentucky, Louisiana, Michigan, Mississippi, North Carolina, Pennsylvania and Utah — charge a single flat rate. The rest run graduated schedules, with California, New York, New Jersey, Oregon and Minnesota at the higher end.',
        'Two cautions. Our state figures start from your federal adjusted gross income and apply the state standard deduction; they do not model state-specific credits, exemptions or addbacks. And several states allow local income taxes on top: New York City, Yonkers, most Maryland counties, and many Ohio and Pennsylvania municipalities. Treat the state line as a good planning estimate, not a filing figure.',
      ],
    },
    {
      heading: 'Reducing what you owe, legitimately',
      bullets: [
        'Contribute to a traditional 401(k), 403(b) or IRA — contributions come off taxable income in the year you make them.',
        'Use an HSA if you have a high-deductible health plan; contributions are deductible, growth is untaxed and qualified medical withdrawals are untaxed.',
        'Compare itemising against the standard deduction. Mortgage interest, state and local taxes up to the cap, and charitable gifts only help if their total exceeds the standard amount.',
        'Claim the credits you qualify for. The Child Tax Credit, the Earned Income Tax Credit, the American Opportunity Credit and the Saver\'s Credit reduce tax dollar for dollar, which is more valuable than a deduction of the same size.',
        'If you are self-employed, deduct the home office, health insurance premiums and half of your self-employment tax, and consider a SEP-IRA or solo 401(k).',
      ],
    },
    {
      heading: 'Deadlines and withholding',
      paragraphs: [
        'The individual return is due on 15 April following the tax year, with an automatic six-month extension available to file — but not to pay. Self-employed people and anyone with significant untaxed income generally owe quarterly estimated tax on 15 April, 15 June, 15 September and 15 January.',
        'If your refund is large every year you are lending the government money interest-free; if you owe a large amount you risk an underpayment penalty. Either way, adjust Form W-4 with your employer rather than waiting for next April.',
      ],
    },
    {
      heading: 'Pakistan and the United States: the overlap',
      paragraphs: [
        'Many of our readers have income in both countries — a salary in Karachi and freelance clients in New York, or a green card and rental property back home. The United States taxes citizens and permanent residents on worldwide income, while Pakistan taxes residents on worldwide income and non-residents on Pakistan-source income. Double taxation is relieved through the foreign tax credit and the Pakistan–US tax treaty, not by ignoring one return.',
        'If that describes you, calculate each side separately — use our Pakistan salary calculator for the local figure and this page for the US figure — and then take professional advice on the credit position before filing. Cross-border returns are one of the few situations where a calculator genuinely is not enough.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Which tax year does this calculator use?',
      a: 'Tax year 2026, using the IRS inflation-adjusted brackets and standard deduction amounts that apply to returns filed in early 2027, and the 2026 Social Security wage base of $184,500.',
    },
    {
      q: 'Does a higher bracket tax all my income at that rate?',
      a: 'No. Only the income that falls inside each band is taxed at that band\'s rate. Someone in the 22% bracket pays 10% and 12% on the lower parts of their income, so their overall effective rate is well below 22%.',
    },
    {
      q: 'Why is my self-employment tax so much higher than a salary?',
      a: 'An employee pays 7.65% in payroll tax and the employer pays the other 7.65%. A self-employed person pays both halves, a combined 15.3%, though only on 92.35% of net earnings, and half of it is deductible against income tax.',
    },
    {
      q: 'Are the state figures accurate enough to file with?',
      a: 'They are planning estimates. We apply each state\'s rate schedule and standard deduction to your federal AGI, but we do not model state-specific credits, exemptions or local city and county income taxes. Check your state revenue department before filing.',
    },
    {
      q: 'Should I take the standard deduction or itemise?',
      a: 'Add up your mortgage interest, state and local taxes (capped), charitable donations and qualifying medical costs. If the total is more than the standard deduction for your filing status, itemise; otherwise take the standard amount. Most filers take the standard deduction.',
    },
    {
      q: 'What if I have income in both Pakistan and the United States?',
      a: 'Calculate each country separately, then look at relief. US citizens and green card holders report worldwide income and can claim a foreign tax credit for Pakistani tax paid; the Pakistan–US treaty allocates taxing rights. Cross-border cases warrant professional advice.',
    },
    {
      q: 'Does the calculator store my figures?',
      a: 'No. Everything runs in your browser as you type. Nothing is submitted to us or saved anywhere.',
    },
  ],
};
