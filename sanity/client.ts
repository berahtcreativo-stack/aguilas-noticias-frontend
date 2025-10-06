// sanity/client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'd8ddozja', // Tu Project ID de Las Aguilas del Norte
  dataset: 'production',
  apiVersion: '2025-10-05', // Usamos una fecha reciente
  useCdn: false, 
})