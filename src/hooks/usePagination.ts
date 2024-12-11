import { useState, useLayoutEffect } from 'react';

type UsePaginationProps = {
    currentPage: number;
    pageNumber: number;
};

export const usePagination = ({ currentPage, pageNumber }: UsePaginationProps) => {
    const [paginationNumbers, setPaginationNumbers] = useState<number[]>([]);
    const [pagesVisible, setPagesVisible] = useState<(number | string)[]>([]);

    // Генерація списку номерів сторінок
    const pageNumberList = () => {
        let pagesList: number[] = [];
        for (let i = 1; i <= pageNumber; i++) {
            pagesList.push(i);
        }
        setPaginationNumbers(pagesList);
    };

    // Обчислення видимих сторінок
    const visiblePagination = () => {
        const visiblePages: (number | string)[] = [];
        if (paginationNumbers.length > 8 && currentPage > 4) {
            visiblePages.push(1);
            visiblePages.push('...');
        }

        paginationNumbers.forEach((page) => {
            if (currentPage < 5) {
                if (page < 8) visiblePages.push(page);
            } else if (currentPage >= 5 && currentPage < pageNumber - 3) {
                if (page === currentPage) {
                    visiblePages.push(page);
                } else if (page < currentPage && currentPage - page < 4) {
                    visiblePages.push(page);
                } else if (page > currentPage && page - currentPage < 4) {
                    visiblePages.push(page);
                }
            } else if (currentPage >= pageNumber - 3) {
                if (page > pageNumber - 7) visiblePages.push(page);
            }
        });

        if (paginationNumbers.length > 8 && currentPage < paginationNumbers.length - 3) {
            visiblePages.push('...');
            visiblePages.push(paginationNumbers[paginationNumbers.length - 1]);
        }

        setPagesVisible(visiblePages);
    };

    useLayoutEffect(() => {
        pageNumberList();
    }, [pageNumber]);

    useLayoutEffect(() => {
        visiblePagination();
    }, [currentPage, paginationNumbers]);

    return { pagesVisible };
};