import {useCallback, useEffect, useRef, useState} from "react";

function useInfiniteScrollPageController(totalPage) {
    const scrollBarRef = useRef(null)
    const [page, setPage] = useState(1);

    const handleScroll = useCallback(() => {
        const scrollHeight = scrollBarRef.current.scrollHeight
        const scrollTop = scrollBarRef.current.scrollTop
        const clientHeight = scrollBarRef.current.clientHeight
        if (scrollTop + clientHeight >= scrollHeight && totalPage > page) {
            setPage(page + 1)
        }
    }, [page, totalPage])

    useEffect(() => {
        scrollBarRef.current = document.querySelector('.scroll-bar')
    }, [])

    useEffect(() => {
        if (scrollBarRef.current) {
            scrollBarRef.current.addEventListener('scroll', handleScroll)
            return () => {
                scrollBarRef.current.removeEventListener('scroll', handleScroll)
            }
        }
    }, [handleScroll])

    return page
}

export default useInfiniteScrollPageController;