import { IME_APLIKACIJE } from "../constants";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import Highcharts from 'highcharts';
import {HighchartsReact}  from 'highcharts-react-official';

// Putanje prilagođene tvojoj strukturi
import PjesmaService from "../services/pjesme/PjesmaService";
import ZanrService from "../services/zanrovi/ZanrService";

export default function NadzornaPloca() {
    const [podaciGrafikon, setPodaciGrafikon] = useState([]);

    useEffect(() => {
        document.title = 'Nadzorna ploča | ' + IME_APLIKACIJE;
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const pjesmeRezultat = await PjesmaService.get();
            const zanroviRezultat = await ZanrService.get();

            const pjesme = pjesmeRezultat.data;
            const zanrovi = zanroviRezultat.data;

            const brojacZanrova = {};
            pjesme.forEach(pjesma => {
                if (Array.isArray(pjesma.zanr)) {
                    pjesma.zanr.forEach(sifra => {
                        brojacZanrova[sifra] = (brojacZanrova[sifra] || 0) + 1;
                    });
                }
            });

            const chartData = Object.keys(brojacZanrova).map(sifra => {
                const zanrObjekt = zanrovi.find(z => z.sifra === parseInt(sifra));
                return {
                    name: zanrObjekt ? zanrObjekt.naziv : `Nepoznat žanr (${sifra})`,
                    y: brojacZanrova[sifra]
                };
            });

            setPodaciGrafikon(chartData);
        } catch (error) {
            console.error('Greška pri dohvaćanju podataka za grafikon:', error);
        } finally {
        }
    }

    // PROMJENA: Nazvali smo varijablu točno onako kako je pozivaš dolje
    const grafikonOpcije = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
        },
        title: {
            text: 'Broj pjesama po žanrovima',
            align: 'left',
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        accessibility: {
            enabled: false,
            point: {
                valueSuffix: '%',
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>',
                },
            },
        },
    };

    return (
        <Container className="mt-4">
            <Row className="mb-4">
                <Col>
                    <Card className="shadow-sm border-0">
                        <Card.Body className="p-4">
                            <h2 className="fw-bold mb-1">Nadzorna ploča</h2>
                            <p className="text-muted">Logirani ste u sustav {IME_APLIKACIJE}</p>
                            <hr />

                            {podaciGrafikon && podaciGrafikon.length > 0 && (
                            <HighchartsReact 
                                highcharts={Highcharts}
                                options={{
                                    ...grafikonOpcije,
                                    series: [
                                        {
                                            name: 'Pjesme',
                                            colorByPoint: true,
                                            data: podaciGrafikon,
                                        }
                                    ]
                                }}
                            />)}

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}