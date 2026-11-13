# Add US support across site and payroll

## What will change
- Rewrite About Us language so TaxSaathi clearly serves people and businesses in Pakistan and the United States, while keeping Pakistan-only tools clearly identified.
- Add a dedicated US tax FAQ section covering federal brackets, filing status, deductions, payroll taxes, self-employment tax, state estimates, deadlines, and calculator limits; correct stale Pakistan surcharge wording.
- Remove the Lahore address and Pakistan-only office hours from Contact Us, replacing them with global contact wording.
- Expand Company Registration for US visitors with LLC terminology, state formation steps, registered agents, EINs, operating agreements, tax elections, annual obligations, and clear state-specific limitations.
- Add United States agreement and contract-drafting choices, including state/jurisdiction fields and guidance for leases, operating agreements, service/vendor contracts, employment terms, NDAs, and independent-contractor agreements.
- Add a Pakistan/United States selector to multi-employee payroll. Pakistan uses PKR and current Pakistan salary tax; United States uses USD and the existing 2026 federal, Social Security, and Medicare calculations.
- Add a company-logo upload to multi-employee payroll and show the logo on generated payslips.
- Add the same Pakistan/United States selector, PKR/USD display, and country-specific automatic tax calculation to the standalone payslip generator.
- Make payroll totals, employee fields, payslips, and stored employee data follow the selected country and currency.

## Technical details
- Extend employee/payroll types with country-specific US filing and state settings while preserving existing saved Pakistan employees.
- Reuse the existing US tax engine and logo-upload control rather than duplicating tax rules or upload handling.
- Keep Pakistani SECP services distinct from educational US LLC guidance so visitors are not misled about service coverage.
- Separate Pakistan and US legal guidance clearly; state that enforceability and required clauses vary by US state and that local attorney review may be necessary.
- Update payroll calculation, summary, employee editor, list, standalone payslip editor, and payslip display together so all figures stay consistent.
- Fix the currently reported dark-mode hydration mismatch, then validate the build and test the Pakistan and US payroll flows at phone, tablet, and desktop widths.
