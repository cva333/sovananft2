import React, { useState } from 'react';
import { Card, CardProps } from 'antd';
import { ArtContent } from '../ArtContent';
import { AuctionView, useArt, useCreators } from '../../hooks';
import { AmountLabel } from '../AmountLabel';
// import { MetaAvatar } from '../MetaAvatar';
import { AuctionCountdown } from '../AuctionNumbers';
import { LoveButton } from '../LoveButton';

import { useAuctionStatus } from './hooks/useAuctionStatus';
import { useTokenList } from '../../contexts/tokenList';

// import {heart} from '../../../../../assets/heart-white.svg'

export interface AuctionCollectionCard extends CardProps {
  auctionView: AuctionView;
}

export const AuctionRenderCard = (props: AuctionCollectionCard) => {
  const { auctionView } = props;
  const id = auctionView.thumbnail.metadata.pubkey;
  const art = useArt(id);
  const creators = useCreators(auctionView);
  console.log(creators);
  const name = art?.title || ' ';

  const tokenInfo = useTokenList().subscribedTokens.filter(
    m => m.address == auctionView.auction.info.tokenMint,
  )[0];
  const { status, amount } = useAuctionStatus(auctionView);
  const [hoverAuction, setHoverAuction] = useState(false);

  console.log(hoverAuction);

  const card = (
    <Card
      hoverable={true}
      className={`auction-render-card mobiletest`}
      bordered={false}
    >
      <div className={'card-art-info'}>
        {/* <div className="auction-gray-wrapper"> */}
        <div className={'card-artist-info'}>
          {/* <MetaAvatar creators={creators.length ? [creators[0]] : undefined} /> */}
          {/* <img src="/apeCardLogo.svg" width={45} className="crdLogo" /> */}
          {/* <span className={'artist-name'}>
            {creators[0]?.name ||
              creators[0]?.address?.substr(0, 6) ||
              'Go to auction'}
            ...
          </span> */}
          <span className="love-btn">
            <LoveButton />
          </span>
        </div>
        <div
          className={'art-content-wrapper'}
          onMouseOver={() => setHoverAuction(true)}
          onFocus={() => setHoverAuction(true)}
          onMouseOut={() => setHoverAuction(false)}
          onBlur={() => setHoverAuction(false)}
        >
          <ArtContent
            className="auction-image no-events"
            preview={false}
            pubkey={id}
            allowMeshRender={false}
          />
          {/* <Button className="secondary-btn">Buy Now</Button> */}
        </div>
        <div className={'art-name'}>{name}</div>
        {!auctionView.isInstantSale && (
          <div className="auction-info-container">
            <div className={'info-message'}>ENDING IN</div>
            <AuctionCountdown auctionView={auctionView} labels={false} />
          </div>
        )}
        {/* </div> */}
        <div className="card-bid-info">
          <span className={'text-uppercase info-message'}>{status}</span>
          <AmountLabel
            containerStyle={{ flexDirection: 'row' }}
            amount={amount}
            iconSize={24}
            tokenInfo={tokenInfo}
          />
        </div>
      </div>
    </Card>
  );

  return card;
};
