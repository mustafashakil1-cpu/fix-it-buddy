CREATE TABLE public.inquiries (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.inquiries TO anon;
GRANT INSERT ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an inquiry" ON public.inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);