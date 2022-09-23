import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Banner } from '../../../components/Banner';
import { pubkeyToString, useMeta } from '@oyster/common';
import { useExtendedArt } from '../../../hooks';
import { CollectionListView } from '../../home/components/SalesList/collectionList';

export const CollectionDetailView = () => {
  const { id } = useParams<{ id: string }>();
  const key = pubkeyToString(id);
  const { metadataByCollection } = useMeta();
  const pubkey = useMemo(
    () => metadataByCollection[key].pubkey,
    [key, metadataByCollection],
  );
  const { ref } = useExtendedArt(pubkey);

  return (
    <>
      <div ref={ref} className={'collection-banner'}>
        <Banner src={''} headingText={''} subHeadingText={''} useBannerBg />
      </div>
      <CollectionListView collectionMintFilter={key} />
    </>
  );
};
