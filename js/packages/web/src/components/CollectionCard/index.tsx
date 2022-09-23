import React from 'react';
import { ArtContent } from '../ArtContent';
import { shortenAddress, StringPublicKey } from '@oyster/common';
import { useArt, useExtendedArt } from '../../hooks';
import { MetaAvatar } from '../MetaAvatar';

export const CollectionCard = (props: { pubkey: StringPublicKey }) => {
  const { pubkey } = props;

  const art = useArt(pubkey);
  const { ref, data } = useExtendedArt(pubkey);

  return (
    <div className={'collection-card-container'} ref={ref}>
      <div className={'asset-container'}>
        <div className={'art-content-wrapper'}>
          <ArtContent
            className="collectionsAuction auction-image no-events"
            preview={false}
            pubkey={pubkey}
            allowMeshRender={false}
          />
        </div>
      </div>

      <div className="flexCol">
        <div>
          <div className="flexRow">
            <div className={'collection-description'}>{data?.description}</div>
            <div className={'collection-title'} style={{ width: '50%' }}>
              {art.title}
            </div>
            <div className="center" style={{ width: '50%' }}>
              <div className="flexCol">
                <div>Volume</div>
                <div>
                  <img src="/logoSolana.svg" width={24} /> 8.04K
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={'collection-OpenBtn'}>
            <div className="buycontainerCollection">
              <button
                type="button"
                className="ant-btn ant-btn-default connector buyBtn pb-5"
              >
                <span>Open Collection</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={'collection-artists'}>
        <MetaAvatar creators={art.creators} />
        <span className={'artist-name'}>
          {art.creators
            ?.map(c => c.name || shortenAddress(c.address ?? ''))
            .join(', ')}
        </span>
      </div>
    </div>
  );
};
