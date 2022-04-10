import { useEffect, useState } from 'react'
import axios from 'axios'
import { ComicObj } from '../entities/ComicObj'

export default function Catalogue(pageNumber) {
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [comics, setComics] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [eof, setEof] = useState(false)
    var md5 = require("blueimp-md5")

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancelToken
        axios({
            method: 'GET',
            url: 'https://gateway.marvel.com:443/v1/public/comics?apikey=04aace4f699fa3248ccc7d117714e1da',
            cancelToken: new axios.CancelToken(c => cancelToken = c)
        }).then(comics => {
            setComics([])
            setComics(prevComic => {
                return [...new Set([...prevComic, ...comics.data.data.results.slice(0, pageNumber).map(comic => new ComicObj(comic))])];
            })
            setHasMore(comics.data.data.results.length > 0)
            setLoading(false)
            console.log(md5(comics.data.data.results))
            console.log(comics.data.data.results.slice(0, pageNumber))
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true);
        })
        return () => cancelToken()
    }, [pageNumber])
    return { loading, error, comics, hasMore, eof }
}
