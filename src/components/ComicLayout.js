import React, { useState } from 'react'
import { Card, Button, Col, Row } from 'react-bootstrap';
import { CalendarDayFill, BugFill, CurrencyEuro, Paypal } from 'react-bootstrap-icons';

import style from './ComicLayout.module.css';

export default function ComicLayout({ comics }) {

    const [info, setInfo] = useState(false)

    const handleClick = (e) => {
        setInfo(!info)
    }

    return ([info],
        <Row>
            <Col lg={6} md={8} sm={12} className={style.crdMargin}>
                <Card key={comics.id} className={style.cardAbs}>
                    <Card.Img variant="top" src={comics.image} />
                    <Card.Title className={style.abs}>{comics.name}</Card.Title>
                    <Card.Body className={style.back}>
                        <Col className={style.textcenter}>
                            <Button className={style.infobtn} variant="danger" onClick={() => handleClick(comics.id)}>Informations</Button>
                        </Col>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={5} md={6} sm={12} className={style.crdMargin}>
                {info &&
                    <Card key={comics.id} className={style.cardAbsInfo}>
                        <Card.Body className={style.backInfo}>
                            <thead>
                                <tr>
                                    <th>Comic Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><CalendarDayFill/> ReleaseDate:</td>
                                    <td>{new Date(comics.date).toDateString()}</td>
                                </tr>
                                <tr>
                                    <td><BugFill/> IssueNumber:</td>
                                    <td className={style.textcenter}>{comics.issueNumber}</td>
                                </tr>
                                <tr>
                                    <td><Paypal/> Cost:</td>
                                    <td className={style.textcenter}>{comics.price}<CurrencyEuro/></td>
                                </tr>
                            </tbody>
                        </Card.Body>
                    </Card>
                }
            </Col>
        </Row>
    )
}
