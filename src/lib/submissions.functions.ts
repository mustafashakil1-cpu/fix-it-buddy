import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

export const getSubmissions = createServerFn({ method: 'POST' })
  .inputValidator((data) => z.object({ password: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    const expected = process.env['SUBMISSIONS_PAGE_PASSWORD']
    if (!expected || data.password !== expected) {
      throw new Error('Incorrect password')
    }
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server')
    const [inquiriesRes, subscribersRes] = await Promise.all([
      supabaseAdmin
        .from('inquiries')
        .select('id, created_at, category, name, email, phone, message')
        .order('created_at', { ascending: false }),
      supabaseAdmin
        .from('newsletter_subscribers')
        .select('id, created_at, email')
        .order('created_at', { ascending: false }),
    ])
    if (inquiriesRes.error) throw new Error('Could not load form submissions')
    if (subscribersRes.error) throw new Error('Could not load subscribers')
    return {
      inquiries: inquiriesRes.data ?? [],
      subscribers: subscribersRes.data ?? [],
    }
  })
