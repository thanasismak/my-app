import React from 'react'
import { Card, Button, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import style from './ComicLayout.module.css';

export default function ComicLayout({ comics }) {
    return (
        <Col lg={3} md={4} sm={8} className={style.crdMargin}>
            <Card className={style.cardAbs}>
                <Card.Img variant="top" src={comics.image} />
                <Card.Title className={style.abs}>{comics.name}</Card.Title>
                <Card.Body className={style.back}>
                    <Col className={style.textcenter}>
                        <Button variant="danger" onClick={() => { /*addHero(comics.id)*/ }}>Informations</Button>
                    </Col>
                </Card.Body>
            </Card>
        </Col>
    )
}
