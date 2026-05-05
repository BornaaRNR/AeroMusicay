import { IME_APLIKACIJE } from "../constants";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Col, Row, Card, Container } from "react-bootstrap";
import { useState, useEffect } from "react";

import PjesmaService from "../services/pjesme/PjesmaService";
import AlbumService from "../services/albumi/AlbumService";
import IzvodacService from "../services/izvodaci/IzvodacService";
import OperaterService from "../services/operateri/OperaterService"; // Dodano

export default function Home() {
    // Postojeći state-ovi
    const [brojPjesama, setBrojPjesama] = useState(0);
    const [brojAlbuma, setBrojAlbuma] = useState(0);
    const [brojIzvodaca, setBrojIzvodaca] = useState(0);

    // NOVO: State-ovi za operatere prema slikama
    const [brojOperatera, setBrojOperatera] = useState(0);
    const [brojAdmina, setBrojAdmina] = useState(0);
    const [brojKorisnika, setBrojKorisnika] = useState(0);

    // Animacijski state-ovi
    const [animatedPjesme, setAnimatedPjesme] = useState(0);
    const [animatedAlbumi, setAnimatedAlbumi] = useState(0);
    const [animatedIzvodaci, setAnimatedIzvodaci] = useState(0);
    const [animatedOperateri, setAnimatedOperateri] = useState(0); // Dodano

    useEffect(() => {
        document.title = 'Početna | ' + IME_APLIKACIJE; // Postavljanje naslova kao na slici
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const pjesmeRezultat = await PjesmaService.get();
            const albumiRezultat = await AlbumService.get();
            const izvodaciRezultat = await IzvodacService.get();
            const operateriRezultat = await OperaterService.get(); // Dohvaćanje operatera
            
            setBrojPjesama(pjesmeRezultat.data.length);
            setBrojAlbuma(albumiRezultat.data.length);
            setBrojIzvodaca(izvodaciRezultat.data.length);
            
            // NOVO: Logika filtriranja admina i korisnika prema slici
            const operateriPodaci = operateriRezultat.data;
            setBrojOperatera(operateriPodaci.length);
            
            const admini = operateriPodaci.filter(op => op.uloga === 'admin').length;
            const korisnici = operateriPodaci.filter(op => op.uloga === 'korisnik').length;
            
            setBrojAdmina(admini);
            setBrojKorisnika(korisnici);

        } catch (error) {
            console.error('Greška pri dohvaćanju statistike:', error);
        }
    }

    // Animacije (Timeri)
    useEffect(() => {
        if (animatedPjesme < brojPjesama) {
            const timer = setTimeout(() => setAnimatedPjesme(prev => Math.min(prev + 1, brojPjesama)), 30);
            return () => clearTimeout(timer);
        }
    }, [animatedPjesme, brojPjesama]);

    useEffect(() => {
        if (animatedAlbumi < brojAlbuma) {
            const timer = setTimeout(() => setAnimatedAlbumi(prev => Math.min(prev + 1, brojAlbuma)), 50);
            return () => clearTimeout(timer);
        }
    }, [animatedAlbumi, brojAlbuma]);

    useEffect(() => {
        if (animatedIzvodaci < brojIzvodaca) {
            const timer = setTimeout(() => setAnimatedIzvodaci(prev => Math.min(prev + 1, brojIzvodaca)), 40);
            return () => clearTimeout(timer);
        }
    }, [animatedIzvodaci, brojIzvodaca]);

    // Novo: Animacija za operatere
    useEffect(() => {
        if (animatedOperateri < brojOperatera) {
            const timer = setTimeout(() => setAnimatedOperateri(prev => Math.min(prev + 1, brojOperatera)), 150);
            return () => clearTimeout(timer);
        }
    }, [animatedOperateri, brojOperatera]);

    return (
        <Container fluid className="p-0">
            <div className="hero-section py-5">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={7} className="text-center text-lg-start mb-5 mb-lg-0">
                            <h1 className="display-3 fw-bold mb-5 main-title">
                                Welcome to <span className="text-gradient">{IME_APLIKACIJE}</span>
                            </h1>
                            <div className="lottie-container-large">
                                <DotLottieReact
                                    src="/music-group.lottie" 
                                    loop
                                    autoplay
                                />
                            </div>
                        </Col>

                        <Col lg={5} className="d-flex align-items-center justify-content-center">
                            {/* NOVO: Stil i grid (mreža) kartica prema slici */}
                            <div style={{ width: '100%', maxWidth: '500px' }}>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Card className="shadow-lg border-0 statistikaPanel h-100 card-pjesme">
                                            <Card.Body className="text-center">
                                                <p className="text-white mb-2">Pjesme</p>
                                                <div className="statistikaTekst">{animatedPjesme}</div>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Card className="shadow-lg border-0 statistikaPanel h-100 card-albumi">
                                            <Card.Body className="text-center">
                                                <p className="text-white mb-2">Albumi</p>
                                                <div className="statistikaTekst">{animatedAlbumi}</div>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Card className="shadow-lg border-0 statistikaPanel h-100 card-izvodaci">
                                            <Card.Body className="text-center">
                                                <p className="text-white mb-2">Izvođači</p>
                                                <div className="statistikaTekst">{animatedIzvodaci}</div>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Card className="shadow-lg border-0 statistikaPanel h-100 card-operateri">
                                            <Card.Body className="text-center">
                                                <p className="text-white mb-2">Operateri</p>
                                                <div className="statistikaTekst">{animatedOperateri}</div>
                                                {/* NOVO: Bedževi za admine i korisnike */}
                                                <div style={{ fontSize: '0.9rem', marginTop: '10px' }}>
                                                    <span className="badge bg-danger me-2">Admin: {brojAdmina}</span>
                                                    <span className="badge bg-primary">Korisnik: {brojKorisnika}</span>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Container>
    );
}