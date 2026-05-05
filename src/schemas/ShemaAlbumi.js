import { z } from 'zod'

export const ShemaAlbumi = z.object({
  // Dodajemo šifru jer postoji u tvojim podacima
  sifra: z.coerce.number().optional(),

  naziv: z.string()
    .trim()
    .min(1, "Naziv albuma je obavezan!")
    .min(2, "Naziv albuma mora imati najmanje 2 znaka!")
    .max(100, "Naziv albuma može imati najviše 100 znakova!"),

  izvodac: z.coerce.number({
    invalid_type_error: "Morate odabrati izvođača!",
  })
    .positive("Obavezan odabir izvođača!"),

  // PROMJENA: ključ mora biti datumIzdavanja (kao u albumpodaci.js)
  datumIzdavanja: z.coerce.date({
    errorMap: (issue, ctx) => {
      if (issue.code === z.ZodIssueCode.invalid_date) {
        return { message: "Molimo unesite ispravan format datuma!" };
      }
      return { message: ctx.defaultError };
    },
    invalid_type_error: "Molimo unesite ispravan format datuma!",
    required_error: "Datum izdavanja je obavezan!"
  })
    .refine((odabraniDatum) => {
      const danas = new Date();
      danas.setFullYear(danas.getFullYear() + 1);
      return odabraniDatum <= danas;
    }, "Datum izdavanja ne može biti više od godinu dana u budućnosti!")
});