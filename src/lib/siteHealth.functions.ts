import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

const SITE = 'https://taxsaathi.site'
const ADSENSE_CLIENT = 'ca-pub-7851393090887931'
const ADS_TXT_LINE = 'google.com, pub-7851393090887931, DIRECT, f08c47fec0942fa0'

export type HealthCheck = {
  id: string
  title: string
  status: 'pass' | 'fail' | 'warn'
  summary: string
  nextStep?: string
}

async function fetchWithUA(url: string, ua: string) {
  const res = await fetch(url, {
    headers: { 'User-Agent': ua },
    redirect: 'follow',
  })
  const body = await res.text()
  return { status: res.status, body }
}

export const runSiteHealthChecks = createServerFn({ method: 'POST' })
  .inputValidator((data) => z.object({ password: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    const expected = process.env['SUBMISSIONS_PAGE_PASSWORD']
    if (!expected || data.password !== expected) {
      throw new Error('Incorrect password')
    }

    const checks: HealthCheck[] = []

    // 1. Homepage HTML (used for AdSense tag checks)
    let homepage: { status: number; body: string } | null = null
    try {
      homepage = await fetchWithUA(SITE + '/', 'Mozilla/5.0 (compatible; SiteHealth/1.0)')
    } catch {
      homepage = null
    }

    if (!homepage || homepage.status !== 200) {
      checks.push({
        id: 'homepage',
        title: 'Homepage loads',
        status: 'fail',
        summary: `The homepage did not return a normal page (status ${homepage?.status ?? 'no response'}).`,
        nextStep:
          'Check that the site is published and the custom domain is connected, then run this check again.',
      })
    } else {
      checks.push({
        id: 'homepage',
        title: 'Homepage loads',
        status: 'pass',
        summary: 'The homepage loads normally.',
      })

      // The script is injected by a small loader after page load, so its URL
      // appears inside an inline script rather than a <script src> tag.
      const hasScript = homepage.body.includes(
        `pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`,
      )
      checks.push({
        id: 'adsense-script',
        title: 'AdSense code snippet',
        status: hasScript ? 'pass' : 'fail',
        summary: hasScript
          ? 'The AdSense script is present in the page head on every page.'
          : 'The AdSense script was not found in the homepage HTML.',
        nextStep: hasScript
          ? undefined
          : 'The AdSense script needs to be added to the shared site head. Ask in chat to re-add it.',
      })

      const hasMeta = homepage.body.includes(`name="google-adsense-account"`) &&
        homepage.body.includes(ADSENSE_CLIENT)
      checks.push({
        id: 'adsense-meta',
        title: 'AdSense account meta tag',
        status: hasMeta ? 'pass' : 'fail',
        summary: hasMeta
          ? 'The google-adsense-account meta tag is present with your publisher ID.'
          : 'The google-adsense-account meta tag was not found.',
        nextStep: hasMeta
          ? undefined
          : 'The meta tag needs to be added to the shared site head. Ask in chat to re-add it.',
      })
    }

    // 2. ads.txt
    try {
      const ads = await fetchWithUA(SITE + '/ads.txt', 'Mozilla/5.0 (compatible; SiteHealth/1.0)')
      const exact = ads.status === 200 && ads.body.trim() === ADS_TXT_LINE
      checks.push({
        id: 'ads-txt',
        title: 'ads.txt file',
        status: exact ? 'pass' : 'fail',
        summary: exact
          ? 'ads.txt is served from the domain root with the exact Google line.'
          : `ads.txt returned status ${ads.status} or its content does not match the required line.`,
        nextStep: exact
          ? undefined
          : 'ads.txt must contain exactly: ' + ADS_TXT_LINE + ' — ask in chat to fix it, then republish.',
      })
    } catch {
      checks.push({
        id: 'ads-txt',
        title: 'ads.txt file',
        status: 'fail',
        summary: 'ads.txt could not be reached at all.',
        nextStep: 'Check that the site is published, then run this check again.',
      })
    }

    // 3. robots.txt
    try {
      const robots = await fetchWithUA(SITE + '/robots.txt', 'Mozilla/5.0 (compatible; SiteHealth/1.0)')
      const body = robots.body.toLowerCase()
      const blocksAll = /user-agent:\s*\*\s*\n\s*disallow:\s*\//.test(body)
      const allowsGoogle =
        body.includes('adsbot-google') && body.includes('googlebot') && body.includes('allow: /')
      const ok = robots.status === 200 && !blocksAll && allowsGoogle
      checks.push({
        id: 'robots',
        title: 'robots.txt crawler rules',
        status: ok ? 'pass' : blocksAll ? 'fail' : 'warn',
        summary: ok
          ? 'robots.txt explicitly allows Googlebot, AdsBot-Google and Mediapartners-Google.'
          : blocksAll
            ? 'robots.txt blocks all crawlers with "Disallow: /".'
            : 'robots.txt is reachable but does not explicitly allow all Google crawlers.',
        nextStep: ok
          ? undefined
          : 'Ask in chat to update robots.txt so Google crawlers are allowed.',
      })
    } catch {
      checks.push({
        id: 'robots',
        title: 'robots.txt crawler rules',
        status: 'fail',
        summary: 'robots.txt could not be reached.',
        nextStep: 'Check that the site is published, then run this check again.',
      })
    }

    // 4. Google crawler access
    const crawlers: { name: string; ua: string }[] = [
      { name: 'AdsBot-Google', ua: 'AdsBot-Google (+http://www.google.com/adsbot.html)' },
      { name: 'Mediapartners-Google', ua: 'Mediapartners-Google' },
      {
        name: 'Googlebot',
        ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      },
    ]
    const results: { name: string; status: number | null }[] = []
    for (const c of crawlers) {
      try {
        const r = await fetchWithUA(SITE + '/', c.ua)
        const a = await fetchWithUA(SITE + '/ads.txt', c.ua)
        results.push({ name: c.name, status: r.status === 200 && a.status === 200 ? 200 : r.status })
      } catch {
        results.push({ name: c.name, status: null })
      }
    }
    const blocked = results.filter((r) => r.status !== 200)
    checks.push({
      id: 'crawler-access',
      title: 'Google crawler access',
      status: blocked.length === 0 ? 'pass' : 'fail',
      summary:
        blocked.length === 0
          ? 'All three Google crawlers (AdsBot-Google, Mediapartners-Google, Googlebot) can load the homepage and ads.txt.'
          : `Blocked or erroring for: ${blocked.map((b) => `${b.name} (status ${b.status ?? 'no response'})`).join(', ')}.`,
      nextStep:
        blocked.length === 0
          ? undefined
          : 'Something between Google and the site is blocking these crawlers. If AdSense still reports a problem while this check passes, its status is likely stale — request a re-check in AdSense and wait 24–48 hours.',
    })

    const passed = checks.filter((c) => c.status === 'pass').length
    return {
      checkedAt: new Date().toISOString(),
      site: SITE,
      checks,
      passed,
      total: checks.length,
    }
  })
