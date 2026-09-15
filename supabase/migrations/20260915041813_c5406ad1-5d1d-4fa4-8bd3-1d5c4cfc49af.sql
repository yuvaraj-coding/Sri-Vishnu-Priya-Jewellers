CREATE POLICY "Anyone can upload catalog images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'catalog-images');

CREATE POLICY "Anyone can read catalog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'catalog-images');

CREATE POLICY "Anyone can delete catalog images"
ON storage.objects FOR DELETE
USING (bucket_id = 'catalog-images');