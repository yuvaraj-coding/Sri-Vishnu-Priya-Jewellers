CREATE TABLE public.shop_info (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_name text NOT NULL DEFAULT 'Sri Vishnu Priya Jewellers',
  address text,
  phone text,
  whatsapp text,
  email text,
  hours text,
  map_url text,
  note text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.shop_info TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.shop_info TO authenticated;
GRANT ALL ON public.shop_info TO service_role;

ALTER TABLE public.shop_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view shop info" ON public.shop_info FOR SELECT USING (true);
CREATE POLICY "Anyone can manage shop info" ON public.shop_info FOR ALL USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_shop_info_updated_at BEFORE UPDATE ON public.shop_info
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.shop_info (shop_name, address, phone, whatsapp, email, hours, note)
VALUES ('Sri Vishnu Priya Jewellers', 'Main Road, Andhra Pradesh, India', '+91 00000 00000', '+91 00000 00000', 'contact@srivishnupriyajewellers.com', 'Mon - Sat: 10:00 AM - 8:30 PM, Sunday: 10:00 AM - 2:00 PM', 'Visit us for gold, diamond and temple jewellery. Please call ahead for custom orders.');