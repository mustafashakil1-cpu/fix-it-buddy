<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep India reference link-check records in the shared IndiaReferenceCheck component so dates and verification status stay consistent across pages; never refresh dates without an actual check or label a blocked check as verified.
- Use the shared currency catalogue and selector for business documents; store employee currency separately from tax country, group payroll totals by currency, and use manual tax for non-native currencies to avoid applying local thresholds to foreign amounts without exchange rates.
