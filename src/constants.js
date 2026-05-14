export const IME_APLIKACIJE = 'AeroMusicay'

export const RouteNames = {
    ZANROVI: '/zanrovi',
    ZANR_NOVI: '/zanrovi/novi',
    ZANR_PROMJENA: '/zanrovi/:sifra',

    HOME: '/',
    IZVODACI: '/izvodaci',
    IZVODACI_NOVI: '/izvodaci/novi',
    IZVODACI_PROMJENA: '/izvodaci/:sifra',

    ALBUMI: '/albumi',
    ALBUMI_NOVI: '/albumi/novi',
    ALBUMI_PROMJENA: '/albumi/:sifra',

    PJESME: '/pjesme',
    PJESME_NOVI: '/pjesme/novi',
    PJESME_PROMJENA: '/pjesme/:sifra',

    OPERATERI: '/operateri',
    OPERATERI_NOVI: '/operateri/novi',
    OPERATERI_PROMJENA: '/operateri/:sifra',
    OPERATERI_PROMJENA_LOZINKE: '/operateri/:sifra/lozinka',

    GENERIRANJE_GLAZBE: '/generiranje-glazbe',

    LOGIN: '/login',
    REGISTRACIJA: '/registracija',

    NADZORNA_PLOCA: '/nadzorna-ploca'
}

// memorija, localStorage
export const DATA_SOURCE = 'localStorage';

export const PrefixStorage = {
    ZANROVI: 'zanrovi',
    IZVODACI: 'izvodaci',
    ALBUMI: 'albumi',
    PJESME: 'pjesme',
    OPERATERI: 'operateri'
}