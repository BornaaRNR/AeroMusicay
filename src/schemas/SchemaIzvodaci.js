import { z } from 'zod'

export const ShemaIzvodaci = z.object({
  // Šifra je opcionalna jer je baza često sama generira
  sifra: z.coerce.number().optional(),

  // Naziv izvođača
  naziv: z.string()
    .trim()
    .min(1, "Naziv izvođača je obavezan!")
    .min(2, "Naziv mora imati najmanje 2 znaka!")
    .max(100, "Naziv može imati najviše 100 znakova!"),

  // Dominantni žanr (prema tvojim podacima: dominantniZanr: 1)
  dominantniZanr: z.coerce.number({
    invalid_type_error: "Morate odabrati glavni žanr!",
  })
    .positive("Obavezan odabir dominantnog žanra!")
});