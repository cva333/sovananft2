import { useWallet } from "@solana/wallet-adapter-react";
import {
  Col,
  Layout,
  Row,
  Tabs,
  Dropdown,
  Menu,
  Input,
  Space,
  Popover,
  Button,
} from "antd";
import { Link } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import { DownOutlined } from "@ant-design/icons";

import { useMeta } from "../../../../contexts";
import { CardLoader } from "../../../../components/MyLoader";
import { Banner } from "../../../../components/Banner";
import { HowToBuyModal } from "../../../../components/HowToBuyModal";

import { useAuctionsList } from "./hooks/useAuctionsList";
import { AuctionRenderCard } from "../../../../components/AuctionRenderCard";

const { TabPane } = Tabs;
const { Content } = Layout;
const { Search } = Input;

export enum LiveAuctionViewState {
  All = "0",
  Participated = "1",
  Ended = "2",
  Resale = "3",
  Own = "4",
}

export const SalesListView = (props: { collectionMintFilter?: string }) => {
  const [activeKey, setActiveKey] = useState(LiveAuctionViewState.All);
  const { isLoading } = useMeta();
  const { connected } = useWallet();
  const { auctions, hasResaleAuctions } = useAuctionsList(activeKey);

  const [nameFilterValue, setNameFilterValue] = useState("");
  const [minValueFilter, setMinValueFilter] = useState("0");
  const [maxValueFilter, setMaxValueFilter] = useState("0");
  const [resetValueFilterCount, setResetValueFilterCount] = useState(0);

  let filteredAuctions = useMemo(() => {
    if (props.collectionMintFilter) {
      return auctions.filter(
        (auction) =>
          auction.thumbnail.metadata.info.collection?.key ===
          props.collectionMintFilter
      );
    }
    return auctions;
  }, [auctions, props.collectionMintFilter]);

  const [filteredAuctionList, setFilteredAuctionList] = useState(
    filteredAuctions
  );

  const changeFilter = (filter: string, type: string) => {
    let copy = [...filteredAuctionList];
    if (type == "sort") {
      if (filter == "asc") {
        setFilteredAuctionList(
          copy.sort((a, b) => (a.amount > b.amount ? 1 : -1))
        );
      } else {
        setFilteredAuctionList(
          copy.sort((a, b) => (a.amount < b.amount ? 1 : -1))
        );
      }
    } else if (type == "name") {
      if (!filter) {
        setFilteredAuctionList(filteredAuctions);
      } else {
        setFilteredAuctionList(
          copy.filter((a) =>
            a.name?.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
          )
        );
      }
    } else if (type == "value") {
      if (!minValueFilter || !maxValueFilter) {
        setFilteredAuctionList(filteredAuctions);
      } else {
        console.log(copy);
        setFilteredAuctionList(
          copy.filter(
            (a) =>
              a.amount >= parseFloat(minValueFilter) &&
              a.amount <= parseFloat(maxValueFilter)
          )
        );
      }
    }
  };

  useMemo(() => {
    setFilteredAuctionList(filteredAuctions);
  }, [filteredAuctions]);

  useMemo(() => {
    if (resetValueFilterCount > 0) changeFilter("value", "value");
  }, [resetValueFilterCount]);

  const onSearch = (value: string) => changeFilter(value, "name");
  const onValueSearch = () => changeFilter("value", "value");
  const onValueSearchReset = () => {
    console.log(Search);
    setMinValueFilter("");
    setMaxValueFilter("");
    setNameFilterValue("");
    setResetValueFilterCount(resetValueFilterCount + 1);
  };

  const filterContent = (
    <Input.Group size="large">
      <Row gutter={10}>
        <Col span={7}>
          <Input
            value={minValueFilter}
            onChange={(e) => setMinValueFilter(e.target.value)}
            placeholder="Min"
          />
        </Col>
        <Col span={7}>
          <Input
            value={maxValueFilter}
            onChange={(e) => setMaxValueFilter(e.target.value)}
            placeholder="Max"
          />
        </Col>
        <Col span={5}>
          <button
            onClick={onValueSearch}
            style={{ height: "40px", width: "100%" }}
            className="ant-btn ant-btn-primary ant-btn-lg ant-input-search-button"
          >
            Filter
          </button>
        </Col>
        <Col span={5}>
          <button
            onClick={onValueSearchReset}
            style={{ height: "40px", width: "100%" }}
            className="ant-btn ant-btn-primary ant-btn-lg ant-input-search-button"
          >
            Reset
          </button>
        </Col>
      </Row>
    </Input.Group>
  );

  const additionalTabContent = (
    <Space direction="horizontal">
      <Search
        placeholder="Nft Name"
        allowClear
        enterButton
        size="large"
        value={nameFilterValue}
        onChange={(e) => setNameFilterValue(e.target.value)}
        onSearch={onSearch}
      />
      <Dropdown.Button
        size="large"
        className="refresh-button padding0"
        icon={<DownOutlined />}
        overlayClassName="refresh-overlay"
        overlay={
          <div>
            <Menu className="gray-dropdown">
              <Menu.Item onClick={() => changeFilter("asc", "sort")}>
                Price: Low to High
              </Menu.Item>
              <Menu.Item onClick={() => changeFilter("desc", "sort")}>
                Price: High to Low
              </Menu.Item>
            </Menu>
          </div>
        }
      >
        Sorting
      </Dropdown.Button>
      <Popover
        placement="bottomLeft"
        content={filterContent}
        title="Price Filter"
        trigger="hover"
      >
        <Button>Filter</Button>
      </Popover>
    </Space>
  );

  return (
    <>
      {!props.collectionMintFilter && (
        <Banner
          src="/main-banner.svg"
          headingText="The Future of Poker"
          subHeadingText="Buy exclusive NFTs."
          actionComponent={<HowToBuyModal buttonClassName="secondary-btn" />}
          useBannerBg
        />
      )}
      <Layout>
        <Content id="testest" style={{ display: "flex", flexWrap: "wrap" }}>
          <Col style={{ width: "100%", marginTop: 32 }}>
            <Row>
              <Tabs
                activeKey={activeKey}
                onTabClick={(key) => setActiveKey(key as LiveAuctionViewState)}
                tabBarExtraContent={additionalTabContent}
              >
                <TabPane
                  tab={
                    <>
                      <span className="live"></span> Live
                    </>
                  }
                  key={LiveAuctionViewState.All}
                ></TabPane>
                {hasResaleAuctions && (
                  <TabPane
                    tab="Secondary Marketplace"
                    key={LiveAuctionViewState.Resale}
                  ></TabPane>
                )}
                <TabPane tab="Ended" key={LiveAuctionViewState.Ended}></TabPane>
                {connected && (
                  <TabPane
                    tab="Participated"
                    key={LiveAuctionViewState.Participated}
                  ></TabPane>
                )}
                {connected && (
                  <TabPane
                    tab="My Live Auctions"
                    key={LiveAuctionViewState.Own}
                  ></TabPane>
                )}
              </Tabs>
            </Row>
            <Row>
              <div className="artwork-grid">
                {isLoading &&
                  [...Array(10)].map((_, idx) => <CardLoader key={idx} />)}
                {!isLoading &&
                  filteredAuctionList.map((auction) => (
                    <Link
                      key={auction.auction.pubkey}
                      to={`/auction/${auction.auction.pubkey}`}
                    >
                      <AuctionRenderCard auctionView={auction} />
                    </Link>
                  ))}
              </div>
            </Row>
          </Col>
        </Content>
      </Layout>
    </>
  );
};
