import bcrypt from 'bcryptjs'
const hashiranaLozinka = bcrypt.hashSync('AeroMusicay1!', 10)

export const operateri = [
    {
        sifra: 1,
        email: 'admin@tvoja-glazba.hr', // Prilagođeno tvojoj domeni
        lozinka: hashiranaLozinka,
        uloga: 'admin' // Ključno za prikaz u statistici
    },
    {
        sifra: 2,
        email: 'korisnik@tvoja-glazba.hr', // Prilagođeno tvojoj domeni
        lozinka: hashiranaLozinka,
        uloga: 'korisnik' // Ključno za prikaz u statistici
    }
]

export default {
    operateri
}