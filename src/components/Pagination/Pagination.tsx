import React, {useLayoutEffect, useState} from 'react';
import styles from "./Pagination.module.css";

type PaginationProps = {
    currentPage: number,
    pageNumber: number,
    setCurrentPage: any,
}
const Pagination: React.FC<PaginationProps> = ({currentPage, pageNumber, setCurrentPage}) => {

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

    return (
        <div className={styles.paginationList}>
            {
                pagesVisible &&
                pagesVisible.map((page, index) =>
                    <div className={`${styles.paginationItem} ${page === currentPage && styles.active}`} key={index} onClick={() => selectPageHandler(page)}>
                        {page}
                    </div>)
            }
        </div>
    );
};

export default Pagination;