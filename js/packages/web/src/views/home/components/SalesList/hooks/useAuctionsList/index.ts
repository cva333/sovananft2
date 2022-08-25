import { useEffect, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

import { useAuctions, AuctionView, useArt } from '../../../../../../hooks';

import { LiveAuctionViewState } from '../..';
import { getFilterFunction, resaleAuctionsFilter } from './utils';
import { AuctionState, BidderMetadata, BidderMetadataParser, BidStateType, cache, formatAmount, formatTokenAmount, fromLamports, ParsedAccount, PriceFloorType, StringPublicKey, useMeta, USE_SPEED_RUN, WRAPPED_SOL_MINT } from '@oyster/common';
import { useAuctionStatus } from '../../../../../../components/AuctionRenderCard/hooks/useAuctionStatus';
import BN from 'bn.js';
import { useSolPrice, useAllSplPrices } from '../../../../../../contexts';
import { useTokenList } from '../../../../../../contexts/tokenList';


export const useAuctionsList = (
  activeKey: LiveAuctionViewState,
): { auctions: AuctionView[]; hasResaleAuctions: boolean } => {
  const { publicKey } = useWallet();
  const auctions = useAuctions();
  const { pullAuctionListData, isLoading, metadata } = useMeta();
  const { bidderMetadataByAuctionAndBidder } = useMeta();
  const solPrice = useSolPrice();
  const subscribedTokens = useTokenList().subscribedTokens;
  const allSplPrices = useAllSplPrices();
  // const art = useArt();

  useEffect(() => {
    if (!auctions.length || isLoading) return;
    for (const auction of auctions) {
      pullAuctionListData(auction.auction.pubkey);
    }
  }, [auctions.length, isLoading]);

  const filteredAuctions = useMemo(() => {
    const filterFn = getFilterFunction(activeKey);

    return auctions.filter(auction => filterFn(auction, publicKey));
  }, [activeKey, auctions, publicKey]);

  const hasResaleAuctions = useMemo(() => {
    return auctions.some(auction => resaleAuctionsFilter(auction));
  }, [auctions]);

  // START : TO UPDATE NFT PRICE
  filteredAuctions.map((auction) => {

    var id =
      typeof auction.auction.pubkey === "string"
        ? auction.auction.pubkey !== ""
          ? auction.auction.pubkey
          : undefined
        : auction.auction.pubkey;
    var bids = getBids(bidderMetadataByAuctionAndBidder, id);
    const winningBid = bids?.[0];

    const participationFixedPrice =
      auction.auctionManager.participationConfig?.fixedPrice || 0;
    const participationOnly = auction.auctionManager.numWinners.eq(new BN(0));
    const priceFloor =
      auction.auction.info.priceFloor.type === PriceFloorType.Minimum
        ? auction.auction.info.priceFloor.minPrice?.toNumber() || 0
        : 0;

    let _amount: string | number = fromLamports(
      participationOnly ? participationFixedPrice : priceFloor
    );

    const countdown = auction.auction.info.timeToEnd();
    const isOpen =
      auction.auction.info.bidState.type === BidStateType.OpenEdition;

    const ended =
      countdown?.hours === 0 &&
      countdown?.minutes === 0 &&
      countdown?.seconds === 0 &&
      auction.auction.info.state === AuctionState.Ended;

    if (auction.isInstantSale) {
      _amount = formatTokenAmount(
        auction.auctionDataExtended?.info.instantSalePrice?.toNumber()
      );
    } else if ((bids.length > 0 && !isOpen) || ended) {
      _amount = formatTokenAmount(winningBid?.info.lastBid);
    }

    const amount =
      typeof _amount === "string" ? parseFloat(_amount) : _amount;
    let formattedAmount = `${amount}`;
    if (amount >= 1) {
      formattedAmount = formatAmount(amount);
    }

    const tokenInfo = subscribedTokens.filter(
      (m) => m.address == auction.auction.info.tokenMint
    )[0];

    const altSplPrice = allSplPrices.filter(
      (a) => a.tokenMint == tokenInfo?.address
    )[0]?.tokenPrice;
    const tokenPrice =
      tokenInfo?.address == WRAPPED_SOL_MINT.toBase58()
        ? solPrice
        : altSplPrice;

    auction.amount = tokenPrice * amount;
    auction.name = auction.thumbnail?.metadata?.info?.data?.name || " ";

    // var pubkey =
    //   typeof auction.thumbnail.metadata.pubkey === "string"
    //     ? auction.thumbnail.metadata.pubkey !== ""
    //       ? auction.thumbnail.metadata.pubkey
    //       : undefined
    //     : auction.thumbnail.metadata.pubkey;

    // var art = metadata.find((a) => a.pubkey === pubkey);
    // auction.name = art?.info?.data?.name || " ";

  });
  // END : TO UPDATE NFT PRICE

  return { auctions: filteredAuctions, hasResaleAuctions };
};

const getBids = (
  bidderMetadataByAuctionAndBidder: Record<
    string,
    ParsedAccount<BidderMetadata>
  >,
  id?: StringPublicKey,
) => {
  // I have no idea why, but cache doesnt work with speed run and i couldnt figure it out for the life of me,
  // because that file is so confusing I have no idea how it works.
  // so we use the tempCache for pulling bids. B come save me.- J
  let bids;
  if (USE_SPEED_RUN) {
    bids = Object.values(bidderMetadataByAuctionAndBidder).filter(
      b => b.info.auctionPubkey === id,
    );
  } else {
    bids = cache
      .byParser(BidderMetadataParser)
      .filter(key => {
        const bidder = cache.get(key) as ParsedAccount<BidderMetadata>;

        if (!bidder) {
          return false;
        }
        return id === bidder.info.auctionPubkey;
      })
      .map(key => {
        const bidder = cache.get(key) as ParsedAccount<BidderMetadata>;
        return bidder;
      });
  }
  return bids
    .sort((a, b) => {
      const lastBidDiff = b.info.lastBid.sub(a.info.lastBid).toNumber();
      if (lastBidDiff === 0) {
        return a.info.lastBidTimestamp.sub(b.info.lastBidTimestamp).toNumber();
      }

      return lastBidDiff;
    })
    .map(item => {
      return item;
    });
};