import { z } from 'zod';

export const ShemaZanrovi = z.object({
  naziv: z.string()
    .min(1, 'Naziv žanra je obavezan')
    .min(2, 'Naziv mora imati barem 2 znaka')
    .max(30, 'Naziv može imati najviše 30 znakova')
});