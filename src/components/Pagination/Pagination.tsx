import React from 'react';
import styles from './Pagination.module.css';
import { usePagination } from '../../hooks/usePagination';

type PaginationProps = {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    pageNumber: number;
    updateURL: (params: { page: string }) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, setCurrentPage, pageNumber, updateURL }) => {
    const { pagesVisible } = usePagination({ currentPage, pageNumber });

    const selectPageHandler = (page: number | string) => {
        if (typeof page === 'number') {
            setCurrentPage(page);
            updateURL({ page: page.toString() });
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            updateURL({ page: (currentPage - 1).toString() });
        }
    };

    const goToNextPage = () => {
        if (currentPage < pageNumber) {
            setCurrentPage(currentPage + 1);
            updateURL({ page: (currentPage + 1).toString() });
        }
    };

    return (
        <div className={styles.paginationList}>
            <div
                className={`${styles.paginationItem} ${currentPage === 1 ? styles.disabled : ''}`}
                onClick={goToPreviousPage}
            >
                &lt;
            </div>
            {pagesVisible &&
                pagesVisible.map((page, index) => (
                    <div
                        className={`${styles.paginationItem} ${page === currentPage && styles.active}`}
                        key={index}
                        onClick={() => selectPageHandler(page)}
                    >
                        {page}
                    </div>
                ))}
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