import {useEffect, useState} from 'react'
import axios from 'axios'
import { ComicObj } from '../entities/ComicObj'

export default function Catalogue(pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [comics, setComics] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [offset, setOffset] = useState()

    var md5 = require("blueimp-md5")
    const { baseAPI, key } = require("../shared/baseApi");

    function getCatalogue () {
        let cancel;
        baseAPI.get(`comics?apikey=${key}`)
        // .then(response => setOffset(response.data.data.offset))
        .then(response => response.data.data.results)
        .then(comicsList => {
            setComics(comics => {
                return [...new Set(...comics, comicsList.slice(0,5).map(comic => new ComicObj(comic)))];
            })
            setHasMore(comicsList.length > 0)
            setLoading(false)
            console.log(md5(comicsList))
            console.log(comicsList)
        }).catch(e=> {
            if(axios.isCancel(e)) return
            setError(true);
        })
        return () => cancel()
    }

    useEffect(() => {
        setLoading(true)
        setError(false)
        setComics([])
        getCatalogue();
    }, [pageNumber])
  return {loading, error, comics, hasMore}
}
