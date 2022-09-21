import { Col, Layout, Row, Input } from 'antd';
// import { Col, Layout, Row} from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CollectionCard } from '../../components/CollectionCard';
import { useCollections } from '../../hooks/useCollections';

const { Search } = Input;

export const CollectionsView = () => {
  const { liveCollections } = useCollections();

  const [nameFilterValue, setNameFilterValue] = useState('');

  // const onSearch = (value: string) => changeFilter(value, 'name');
  // const onValueSearch = () => changeFilter('value', 'value');

  return (
    <Layout style={{ margin: 0, marginTop: 30, alignItems: 'center' }}>
      <span className={'collections-title'}>EXPLORE COLLECTIONS</span>
      <span className={'collections-title'}></span>
      <Search
        placeholder=""
        allowClear
        enterButton
        size="large"
        value={nameFilterValue}
        onChange={e => setNameFilterValue(e.target.value)}
        // onSearch={onSearch}
      />
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
    </Layout>
  );
};
