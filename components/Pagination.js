import React from 'react';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import { Query } from 'react-apollo';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
query PAGINATION_QUERY{
    itemsConnection {
        aggregate {
            count
        }
    }
}
`;

const Pagination = props => {
    return (
        <Query query={PAGINATION_QUERY}>
            {({ data, loading, error }) => {
                if (loading) return <p>Loading...</p>;
                const { count } = data.itemsConnection.aggregate;
                const pages = Math.ceil(count / perPage);
                const currentPage = props.page;
                return (
                    <PaginationStyles className="no-print" data-test="pagination">
                        <Head>
                        <title>
                            Dell Store | Aeropost - Page {currentPage} of {pages}
                        </title>
                        </Head>
                        <Link prefetch
                             href={{
                                pathname: 'items',
                                query: {page: currentPage -1}
                            }}>
                            <a className="prev" aria-disabled={currentPage <= 1}>
                                ← Anterior
                            </a>
                        </Link>
                        <p>Página {currentPage} de <span className="total-pages">{pages}</span></p>
                        <Link
                            prefetch
                            href={{
                                pathname: 'items',
                                query: { page: currentPage + 1 },
                            }}
                            >
                            <a className="next" aria-disabled={currentPage >= pages}>
                                Siguiente →
                            </a>
                        </Link>
                    </PaginationStyles>
                )
            }}
        </Query>
    )
}

export default Pagination;
export { PAGINATION_QUERY };