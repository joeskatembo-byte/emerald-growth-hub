CREATE TABLE public.preach_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token text NOT NULL UNIQUE,
  guest text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT now() + interval '24 hours',
  used_at timestamptz
);
GRANT ALL ON public.preach_invites TO service_role;
ALTER TABLE public.preach_invites ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.guest_meditations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invite_id uuid NOT NULL REFERENCES public.preach_invites(id) ON DELETE CASCADE,
  book text NOT NULL,
  verse text NOT NULL,
  body text NOT NULL,
  servant text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  imported boolean NOT NULL DEFAULT false
);
GRANT ALL ON public.guest_meditations TO service_role;
ALTER TABLE public.guest_meditations ENABLE ROW LEVEL SECURITY;