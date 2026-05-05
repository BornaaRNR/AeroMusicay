import { IME_APLIKACIJE } from "../constants";
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Col, Row, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import AlbumService from "../services/albumi/AlbumService";
import IzvodacService from "../services/izvodaci/IzvodacService";
import PjesmaService from "../services/pjesme/PjesmaService";
import OperaterService from "../services/operateri/OperaterService";
import ZanrService from "../services/zanrovi/ZanrService";

export default function NadzornaPloca() {
    

    return (
        <>
        Logirani ste, ovo je nadzorna ploča
        </>
    )
}