import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import './App.css';
import Catalogue from './services/Catalogue';
import ComicLayout from './components/ComicLayout';

export default function App() {
  const [pageNumber, setPageNumber] = useState(5)
  const { comics, hasMore, loading, error, eof } = Catalogue(pageNumber);

  const observer = useRef()
  const lastComicElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])


  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={6} md={7} sm={12}>
            {comics.map((comic, index) => {
              if (comics.length === index + 1) {
                return <div ref={lastComicElementRef} key={comic.id} comics={comic}><ComicLayout key={comic.id} comics={comic} /></div>
              } else {
                return <ComicLayout key={comic.id} comics={comic} />
              }
            })
            }
            <>{loading && 'Loading...'}</>
            <>{eof && 'No resources...'}</>
            <>{error && 'Error'}</>
          </Col>
        </Row>
      </Container>
    </>
  );
}

