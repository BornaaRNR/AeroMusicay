import { z } from 'zod'

export const ShemaPjesme = z.object({
  sifra: z.coerce.number().optional(),

  naziv: z.string()
    .trim()
    .min(1, "Naziv pjesme je obavezan!")
    .min(2, "Naziv pjesme mora imati najmanje 2 znaka!")
    .max(100, "Naziv pjesme može imati najviše 100 znakova!"),
  album: z.coerce.number({
    invalid_type_error: "Morate odabrati album!",
  })
    .positive("Obavezan odabir albuma!"),

  zanr: z.array(z.coerce.number())
    .min(1, "Pjesma mora imati barem jedan žanr!"),

  trajanje: z.coerce.number({
    invalid_type_error: "Trajanje mora biti broj sekundi!",
  })
    .min(1, "Trajanje ne može biti 0!")
    .max(3600, "Pjesma ne može trajati duže od sat vremena!")
});