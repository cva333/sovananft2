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
