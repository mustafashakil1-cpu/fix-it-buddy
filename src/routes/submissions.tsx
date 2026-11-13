import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { getSubmissions } from '@/lib/submissions.functions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Lock, Mail, Users } from 'lucide-react'

export const Route = createFileRoute('/submissions')({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: 'Form Submissions — TaxSaathi' },
      { name: 'description', content: 'Private, password-protected view of TaxSaathi contact inquiries and newsletter subscribers.' },
      { property: 'og:title', content: 'Form Submissions — TaxSaathi' },
      { property: 'og:description', content: 'Private view of TaxSaathi contact inquiries and newsletter sign-ups.' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: SubmissionsPage,
})

type Inquiry = {
  id: string
  created_at: string
  category: string
  name: string
  email: string
  phone: string | null
  message: string | null
}

type Subscriber = {
  id: string
  created_at: string
  email: string
}

function SubmissionsPage() {
  const fetchSubmissions = useServerFn(getSubmissions)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<{ inquiries: Inquiry[]; subscribers: Subscriber[] } | null>(null)

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await fetchSubmissions({ data: { password } })
      setData(result)
    } catch {
      setError('Incorrect password. Please try again.')
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
              <Lock className="h-5 w-5" /> Private: Form Submissions
            </CardTitle>
            <CardDescription>
              Enter the site owner password to view contact form enquiries and newsletter signups.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUnlock} className="space-y-4">
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
                {loading ? 'Checking…' : 'Unlock'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 space-y-10">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Mail className="h-7 w-7" /> Form Submissions
        </h1>
        <p className="text-muted-foreground mt-1">
          {data.inquiries.length} contact enquiries · {data.subscribers.length} newsletter subscribers
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Contact Form Enquiries</h2>
        {data.inquiries.length === 0 ? (
          <p className="text-muted-foreground">No enquiries yet.</p>
        ) : (
          <div className="space-y-3">
            {data.inquiries.map((inq) => (
              <Card key={inq.id}>
                <CardContent className="pt-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold">{inq.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(inq.created_at).toLocaleString('en-PK')}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    <a className="underline" href={`mailto:${inq.email}`}>{inq.email}</a>
                    {inq.phone ? ` · ${inq.phone}` : ''} · {inq.category}
                  </p>
                  {inq.message && (
                    <p className="mt-3 whitespace-pre-wrap rounded-md bg-muted p-3 text-sm">
                      {inq.message}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Users className="h-5 w-5" /> Newsletter Subscribers
        </h2>
        {data.subscribers.length === 0 ? (
          <p className="text-muted-foreground">No subscribers yet.</p>
        ) : (
          <Card>
            <CardContent className="pt-5">
              <ul className="divide-y">
                {data.subscribers.map((sub) => (
                  <li key={sub.id} className="flex justify-between gap-4 py-2 text-sm">
                    <a className="underline" href={`mailto:${sub.email}`}>{sub.email}</a>
                    <span className="text-muted-foreground">
                      {new Date(sub.created_at).toLocaleDateString('en-PK')}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  )
}
