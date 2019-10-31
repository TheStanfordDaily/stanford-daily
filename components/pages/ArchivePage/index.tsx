import React from "react";
import { View, Text } from "react-native";
import { ArchivePageData } from "helpers/wpapi";
import LoadingView from "components/Loading";
import ArticlesView from "components/ArticlesView";
import WPHead from "components/webHelpers/WPHead";
import WPFooter from "components/webHelpers/WPFooter";

export enum ArchivePageType {
  Time, // TODO
  Author,
  Category,
  Tag, // TODO
  Search,
}

export interface ArchivePageProps {
  type: ArchivePageType;
  initData: ArchivePageData;
  getExtraData: (pageNumber: number) => Promise<ArchivePageData>;
  displayCategory?: boolean;
  displayExcerpt?: boolean;
}

export interface ArchivePageState {}

export default class ArchivePage extends React.Component<
  ArchivePageProps,
  ArchivePageState
> {
  static async getInitialProps(param): Promise<any> {
    return {};
  }

  render(): React.ReactNode {
    const {
      initData,
      getExtraData,
      displayCategory,
      displayExcerpt,
    } = this.props;
    if (!initData) {
      return <LoadingView />;
    }

    return (
      <>
        <WPHead base={initData} />
        <ArticlesView
          displayCategory={displayCategory}
          displayExcerpt={displayExcerpt}
          initPosts={initData.posts}
          getExtraPosts={async pageNumber => {
            const extraData = await getExtraData(pageNumber);
            return extraData.posts;
          }}
        />
        <WPFooter base={initData} />
      </>
    );
  }
}
