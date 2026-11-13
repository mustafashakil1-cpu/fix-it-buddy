import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { runSiteHealthChecks, type HealthCheck } from '@/lib/siteHealth.functions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Lock, CheckCircle2, XCircle, AlertTriangle, RefreshCw, HeartPulse } from 'lucide-react'

export const Route = createFileRoute('/site-health')({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: 'Site Health Checklist — TaxSaathi' },
      { name: 'description', content: 'Private checklist that verifies the AdSense tag, ads.txt, robots.txt and Google crawler access for TaxSaathi.' },
      { property: 'og:title', content: 'Site Health Checklist — TaxSaathi' },
      { property: 'og:description', content: 'Private AdSense and crawler access checklist for TaxSaathi.' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: SiteHealthPage,
})

type HealthResult = {
  checkedAt: string
  site: string
  checks: HealthCheck[]
  passed: number
  total: number
}

function StatusIcon({ status }: { status: HealthCheck['status'] }) {
  if (status === 'pass') return <CheckCircle2 className="h-5 w-5 text-green-600" />
  if (status === 'warn') return <AlertTriangle className="h-5 w-5 text-amber-500" />
  return <XCircle className="h-5 w-5 text-red-600" />
}

function SiteHealthPage() {
  const runChecks = useServerFn(runSiteHealthChecks)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<HealthResult | null>(null)

  const handleRun = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await runChecks({ data: { password } })
      setData(result)
    } catch {
      setError(data ? 'Could not run the checks. Please try again.' : 'Incorrect password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!data) {
    return (
      <div className="container mx-auto max-w-md px-4 py-20">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" /> Private: Site Health Checklist
            </CardTitle>
            <CardDescription>
              Enter the site owner password to run live checks on the AdSense tag, ads.txt,
              robots.txt and Google crawler access.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRun} className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Running checks…' : 'Run checks'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  const allGood = data.passed === data.total

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <HeartPulse className="h-7 w-7" /> Site Health Checklist
          </h1>
          <p className="text-muted-foreground mt-1">
            Live checks against {data.site} · run {new Date(data.checkedAt).toLocaleString('en-PK')}
          </p>
        </div>
        <Button variant="outline" onClick={() => handleRun()} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Re-run checks
        </Button>
      </div>

      <Card className={allGood ? 'border-green-600' : 'border-amber-500'}>
        <CardContent className="pt-5">
          <p className="font-semibold text-lg">
            {data.passed} of {data.total} checks passing
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {allGood
              ? 'Everything looks good. If AdSense still reports a problem, its status is likely stale — request a re-check in AdSense and allow 24–48 hours.'
              : 'Some checks need attention. See the next steps below each failing item.'}
          </p>
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="space-y-3">
        {data.checks.map((check) => (
          <Card key={check.id}>
            <CardContent className="pt-5 flex gap-3">
              <div className="pt-0.5 shrink-0">
                <StatusIcon status={check.status} />
              </div>
              <div className="space-y-1">
                <p className="font-semibold">{check.title}</p>
                <p className="text-sm text-muted-foreground">{check.summary}</p>
                {check.nextStep && (
                  <p className="text-sm rounded-md bg-muted p-2 mt-2">
                    <span className="font-medium">Next step: </span>
                    {check.nextStep}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
