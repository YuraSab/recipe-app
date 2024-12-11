import React, {useLayoutEffect, useState} from 'react';
import styles from "./Pagination.module.css";
import {useLocation, useNavigate} from "react-router-dom";

type PaginationProps = {
    currentPage: number,
    pageNumber: number,
    setCurrentPage: any,
    updateURL: any
}
const Pagination: React.FC<PaginationProps> = ({currentPage, pageNumber, setCurrentPage, updateURL}) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [paginationNumbers, setPaginationNumbers] = useState<number[]>([]);
    const [pagesVisible, setPagesVisible] = useState<any[]>([]);

    const pageNumberList = () => {
        let pagesList: number[] = [];
        for(let i = 1; i < pageNumber+1; i++) {
            pagesList = [...pagesList, i];
        }
        setPaginationNumbers(pagesList);
    }

    useLayoutEffect(() => {
        pageNumberList();
    }, [currentPage, pageNumber]);

    const visiblePagination = () => {
        const visiblePages = [];

        if (paginationNumbers.length > 8 && currentPage > 4) {
            visiblePages.push(1);
            visiblePages.push("...");
        }
        paginationNumbers.forEach((page, index) => {
            if (currentPage < 5) {
                if (page < 8) visiblePages.push(page);
            } else if (currentPage >= 5 && currentPage < pageNumber-3) {
                if (page === currentPage) {
                    visiblePages.push(page)
                } else if (page < currentPage && currentPage - page < 4) {
                    visiblePages.push(page)
                } else if (page > currentPage && page - currentPage < 4) {
                    visiblePages.push(page)
                }
            } else if (currentPage >= pageNumber-3) {
                if (page > pageNumber-7) visiblePages.push(page);
            }
        });
        if (paginationNumbers.length > 8 && currentPage !< paginationNumbers.length-3) {
            visiblePages.push("...");
            visiblePages.push(paginationNumbers[paginationNumbers.length-1]);
        }
        setPagesVisible(visiblePages);
    }

    useLayoutEffect(() => {
        visiblePagination();
    }, [currentPage, paginationNumbers]);

    const selectPageHandler = (pageNumber: any) => {
        if (typeof pageNumber === "number")
            setCurrentPage(pageNumber);
    }

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < pageNumber) {
            setCurrentPage(currentPage + 1);
        }
    };


    // useLayoutEffect(() => {
    //     const params = new URLSearchParams(location.search);
    //     const pageParams = params.get("page");
    //     if (!pageParams) {
    //         params.set("page", "1");
    //         setCurrentPage(Number(1));
    //         console.log("pageParams 1:",pageParams);
    //         // navigate(`?page=1`);
    //
    //     } else {
    //         params.set("page", pageParams || "");
    //         // setCurrentPage(Number(pageParams));
    //         console.log("pageParams 2:",pageParams);
    //         setCurrentPage(Number(6));
    //         // navigate(`?page=${pageParams}`);
    //
    //     }
    // }, []);

    const selectPageHandlerTwo = (page: string) => {
        selectPageHandler(page);
        updateURL({ page: page.toString() });
    }

    return (
        <div className={styles.paginationList}>
            <div
                className={`${styles.paginationItem} ${currentPage === 1 ? styles.disabled : ''}`}
                onClick={goToPreviousPage}
            >
                &lt;
            </div>
            {
                pagesVisible &&
                pagesVisible.map((page, index) =>
                    <div className={`${styles.paginationItem} ${page === currentPage && styles.active}`} key={index}
                         // onClick={() => selectPageHandler(page)}>
                         onClick={() => selectPageHandlerTwo(page)}>
                    {page}
                    </div>)
            }
            <div
                className={`${styles.paginationItem} ${currentPage === pageNumber ? styles.disabled : ''}`}
                onClick={goToNextPage}
            >
                &gt;
            </div>
        </div>
    );
};

export default Pagination;