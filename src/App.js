import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import './App.css'; 
import Catalogue from './services/Catalogue';
import ComicLayout from './components/ComicLayout';

export default function App() {
  const [pageNumber, setPageNumber] = useState(5)

  const {comics,hasMore, loading, error, offset} = Catalogue(pageNumber);
  const tempoffset = offset
  const observer = useRef()

  const lastComicElementRef = useCallback(node => {
    if (loading) return 
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  
  return (
    <>
     {loading && !error
             ? loading :
              <Container fluid>
                <Row>
                  <Col lg={9}>
                    {
                    comics.map((comic, index) => {
                      if (comics.length === index + 1) { 
                      return <div ref={lastComicElementRef} key={comic.id} comics={comic}><ComicLayout ref={lastComicElementRef} key={comic.id} comics={comic}/></div>
                    }
                      return <ComicLayout key={comic.id} comics={comic}/>
                    })
                    }
                    <>{loading && 'Loading...'}</>
                    <>{error && 'Error'}</>
                  </Col>
                </Row>
              </Container>
      }
    </>
  );
}

