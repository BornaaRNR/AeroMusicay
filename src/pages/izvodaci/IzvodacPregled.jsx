import { useEffect, useState } from 'react';
import IzvodacService from '../../services/izvodaci/IzvodacService';
import { Table } from 'react-bootstrap';

export default function IzvodacPregled() {
   const [izvodaci, setIzvodaci] = useState([])

   useEffect(() => {
    ucitajIzvodace();
   }, [])

   async function ucitajIzvodace(){
    await IzvodacService.get().then((odgovor) => {
        setIzvodaci(odgovor.data)
    })
   }

   return(
    <>
    <Table>
        <thead>
            <tr>
                <th>Naziv izvođača</th>
                <th>Zanr</th>
                <th>Pjesma</th>
                <th>Album</th>
                <th>Trajanje</th>
                <th>Datum izdavanja</th>
            </tr>
        </thead>
        <tbody>
            {izvodaci && izvodaci.map((smjer)=>(
                <tr>
                    <td>{smjer.naziv}</td>
                    <td>{smjer.zanr}</td>
                    <td>{smjer.pjesma}</td>
                    <td>{smjer.album}</td>
                    <td className="text-end">{smjer.trajanje}</td>
                    <td>
                        <FormaDatuma datum={smjer.datumIzdavanja}/>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
    </>
   )
}