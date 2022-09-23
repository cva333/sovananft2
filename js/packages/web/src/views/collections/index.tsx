import { Col, Layout, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { CollectionCard } from '../../components/CollectionCard';
import { Footer } from '../../components/Footer';
import { useCollections } from '../../hooks/useCollections';

export const CollectionsView = () => {
  const { liveCollections } = useCollections();

  return (
    <Layout style={{ margin: 0, marginTop: 30, alignItems: 'center' }}>
      <span
        className={'collections-title'}
        style={{ textAlign: 'center', width: '100%' }}
      >
        Explore Collections
      </span>
      <form className="inputSearch">
        <input type="search" placeholder="Search..." />
        <button type="submit">Search</button>
      </form>

      {/* Pagination */}
      <div className="paginationContainer flexCol">
        <div className="flexRow">
          <span
            className={'pagination-title'}
            style={{ textAlign: 'left', width: '100%' }}
          >
            Page 1 of 199
          </span>
        </div>
        <div className="flexRow">
          <div className="buttonPage flexRow gap3">
            <button type="button" className="connector pb-5 pageBtn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 512 512"
                fill="white"
              >
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
              </svg>
            </button>
            <button type="button" className="connector pb-5 pageBtn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                width={24}
                height={24}
                fill="white"
              >
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
            </button>
            <button type="button" className="connector pb-5 pageBtn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                width={24}
                height={24}
                fill="white"
              >
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
            </button>
            <button type="button" className="connector pb-5 pageBtn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="white"
                viewBox="0 0 512 512"
              >
                <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
              </svg>
            </button>
          </div>

          <div className="buttonPage sortingPage">
            <button type="button" className="connector pb-5 pageBtn">
              SORTING
            </button>
          </div>
        </div>
      </div>

      {/* End Pagination */}
      <Row className={'collections-layout-container'} gutter={32}>
        {liveCollections.map(collection => {
          const pubkey = collection.pubkey;
          return (
            <Col
              key={pubkey}
              xs={24}
              sm={24}
              md={24}
              lg={12}
              className={'col-container'}
            >
              <Link key={pubkey} to={`/collection/${collection.mint}`}>
                <CollectionCard pubkey={pubkey} key={pubkey} />
              </Link>
            </Col>
          );
        })}
      </Row>
      <Footer />
    </Layout>
  );
};
