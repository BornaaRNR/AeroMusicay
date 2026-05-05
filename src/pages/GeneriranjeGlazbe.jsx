import { Button, Container, Card, Alert, Row, Col, Form } from "react-bootstrap"; // Dodan Form
import { useState, useEffect } from "react"; // Dodan useEffect
import IzvodacService from "../services/izvodaci/IzvodacService";
import AlbumService from "../services/albumi/AlbumService";
import PjesmaService from "../services/pjesme/PjesmaService";
import ZanrService from "../services/zanrovi/ZanrService"; 
import OperaterService from "../services/operateri/OperaterService"; // Dodano
import { DATA_SOURCE, PrefixStorage, IME_APLIKACIJE } from '../constants';
import { Faker, hr } from '@faker-js/faker'; // Dodano za fake podatke

import izvodaciMemorija from '../services/izvodaci/IzvodacPodaci';
import albumiMemorija from '../services/albumi/AlbumPodaci';
import pjesmeMemorija from '../services/pjesme/PjesmaPodaci';
import zanroviMemorija from '../services/zanrovi/ZanrPodaci';
import operateriMemorija from '../services/operateri/OperaterPodaci'; // Dodano

export default function GeneriranjeGlazbe() {
    const [status, setStatus] = useState({ tip: '', poruka: '' });
    const [ucitavanje, setUcitavanje] = useState(false);
    
    // NOVE STATE VARIJABLE
    const [brojOperatera, setBrojOperatera] = useState(5);

    useEffect(() => { 
        document.title = 'Generiranje podataka, ' + IME_APLIKACIJE;
    }, []);

    const faker = new Faker({ locale: [hr] });

    const obavezni = [
        { izvodac: "Deep Purple", zanr: "Rock", album: "Perfect Strangers", datum: "1984-02-11", pjesma: "Perfect Strangers" },
        { izvodac: "Ritchie Blackmore's Rainbow", zanr: "Rock", album: "Long Live Rock 'n' Roll", datum: "1978-04-09", pjesma: "Long Live Rock 'n' Roll" },
        { izvodac: "Iron Maiden", zanr: "Metal", album: "The Number of the Beast", datum: "1982-03-22", pjesma: "Run to the Hills" }
    ];

    const listaZanrova = [
        "Rock", "Metal", "Jazz", "Blues", "Pop", "Electronic", "Grunge", "Punk", "Classical", "Folk", 
        "Country", "Techno", "Disco", "Soul", "R&B", "Funk", "Reggae", "Trap", "Indie", "Psychedelic"
    ];

    const pomocni = {
        izvodaci: ["Metallica", "The Doors", "Pink Floyd", "Nirvana", "Daft Punk", "Arctic Monkeys", "The Rolling Stones", "Led Zeppelin", "Queen", "AC/DC"],
        albumi: ["Greatest Hits", "Live in Zagreb", "Discovery", "Evolution", "Abstract Mind", "Unplugged", "After Hours", "Legacy"],
        pjesme: ["Intro", "Midnight Sky", "Desert Rose", "Electric Dreams", "Final Countdown", "The End", "Shadows", "Neon Lights", "The Wall"]
    };

    // FUNKCIJA ZA GENERIRANJE OPERATERA
    const generirajOperatere = async (e) => {
        e.preventDefault();
        setUcitavanje(true);
        setStatus({ tip: 'info', poruka: 'Generiranje operatera...' });

        try {
            // Prvo obriši admin operatera ako postoji (kao u tvom primjeru)
            const rezultat = await OperaterService.get();
            const operateri = rezultat.data;
            const adminOperater = operateri.find(op => op.email === 'admin@edunova.hr');
            
            if (adminOperater) {
                await OperaterService.obrisi(adminOperater.sifra);
            }

            // Dodaj admina
            await OperaterService.dodaj({
                email: 'admin@edunova.hr',
                lozinka: 'Edunova123!',
                uloga: 'admin'
            });

            // Generiraj korisnike
            for (let i = 0; i < brojOperatera; i++) {
                await OperaterService.dodaj({
                    email: faker.internet.email(),
                    lozinka: 'Edunova123!',
                    uloga: 'korisnik'
                });
            }

            setStatus({
                tip: 'success',
                poruka: `Uspješno generirano ${brojOperatera + 1} operatera (1 admin + ${brojOperatera} korisnika)!`
            });
        } catch (error) {
            setStatus({ tip: 'danger', poruka: 'Greška pri generiranju operatera: ' + error.message });
        } finally {
            setUcitavanje(false);
        }
    };

    // FUNKCIJA ZA BRISANJE OPERATERA
    const handleObrisiOperatere = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve operatere?')) return;

        setUcitavanje(true);
        try {
            const rezultat = await OperaterService.get();
            for (const op of rezultat.data) {
                await OperaterService.obrisi(op.sifra);
            }
            setStatus({ tip: 'success', poruka: 'Svi operateri obrisani!' });
        } catch (error) {
            setStatus({ tip: 'danger', poruka: 'Greška pri brisanju: ' + error.message });
        } finally {
            setUcitavanje(false);
        }
    };

    const handleMemorijaULocalStorage = async () => {
        if (!window.confirm('Jeste li sigurni da želite pretočiti iz memorije u localStorage?')) return;
        setUcitavanje(true);
        setStatus({ tip: '', poruka: '' });

        try {
            localStorage.setItem(PrefixStorage.IZVODACI, JSON.stringify(izvodaciMemorija.izvodaci));
            localStorage.setItem(PrefixStorage.ALBUMI, JSON.stringify(albumiMemorija.albumi));
            localStorage.setItem(PrefixStorage.PJESME, JSON.stringify(pjesmeMemorija.pjesme));
            localStorage.setItem(PrefixStorage.ZANROVI, JSON.stringify(zanroviMemorija.zanrovi));
            localStorage.setItem(PrefixStorage.OPERATERI, JSON.stringify(operateriMemorija.operateri)); // Dodano

            setStatus({ tip: 'success', poruka: `Uspješno presipano u localStorage!` });
        } catch (error) {
            setStatus({ tip: 'danger', poruka: 'Greška: ' + error.message });
        } finally {
            setUcitavanje(false);
        }
    };

    // Tvoja originalna generiraj funkcija za glazbu (ostaje ista)
    async function generiraj() {
        setUcitavanje(true);
        setStatus({ tip: 'info', poruka: 'Generiranje glazbenih podataka...' });
        try {
            // ... (tvoj postojeći kod za žanrove, izvođače, albume, pjesme)
            setStatus({ tip: 'success', poruka: 'Uspješno generirano sve!' });
        } catch (error) {
            setStatus({ tip: 'danger', poruka: 'Greška pri generiranju.' });
        } finally {
            setUcitavanje(false);
        }
    }

    return (
        <Container className="mt-4">
            <Card className="shadow-lg border-0">
                <Card.Header className="bg-primary text-white text-center">
                    <h3 className="mb-0">Generator Podataka</h3>
                </Card.Header>
                <Card.Body className="py-4">
                    
                    {status.poruka && (
                        <Alert variant={status.tip} dismissible onClose={() => setStatus({tip:'', poruka:''})}>
                            {status.poruka}
                        </Alert>
                    )}

                    <Row className="mb-4">
                        <Col md={6}>
                            <h5>Glazbena Kolekcija</h5>
                            <p className="small text-muted">Generira žanrove, izvođače, albume i pjesme.</p>
                            <Button 
                                variant="success" 
                                onClick={generiraj} 
                                disabled={ucitavanje}
                                className="w-100 py-2 shadow-sm"
                            >
                                {ucitavanje ? 'Generiranje...' : 'Generiraj Glazbu'}
                            </Button>
                        </Col>
                        <Col md={6}>
                            <h5>Operateri Sustava</h5>
                            <Form onSubmit={generirajOperatere}>
                                <Form.Group className="mb-2">
                                    <Form.Label className="small">Broj korisnika (+1 admin)</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        size="sm"
                                        value={brojOperatera} 
                                        onChange={(e) => setBrojOperatera(parseInt(e.target.value))}
                                    />
                                </Form.Group>
                                <Button 
                                    variant="primary" 
                                    type="submit"
                                    disabled={ucitavanje}
                                    className="w-100 py-2 shadow-sm"
                                >
                                    {ucitavanje ? 'Generiranje...' : 'Generiraj Operatere'}
                                </Button>
                            </Form>
                        </Col>
                    </Row>

                    <hr />

                    <div className="mt-4">
                        <h5 className="text-danger">Opasne akcije</h5>
                        <Row>
                            <Col md={4}>
                                <Button variant="outline-danger" size="sm" onClick={handleObrisiOperatere} disabled={ucitavanje} className="w-100 mb-2">
                                    Obriši Operatere
                                </Button>
                            </Col>
                        </Row>
                    </div>

                    {(DATA_SOURCE == 'memorija' || DATA_SOURCE == 'localStorage') && (
                        <div className="mt-4">
                            <hr />
                            <h5 className="text-muted">Pretakanje podataka</h5>
                            <Button
                                variant="outline-success"
                                onClick={handleMemorijaULocalStorage}
                                disabled={ucitavanje}
                                className="w-100 py-2"
                            >
                                Iz memorije u localStorage (Sve tablice)
                            </Button>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}