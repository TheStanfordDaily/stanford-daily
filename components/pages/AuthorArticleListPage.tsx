import React from "react";
import { getAuthorAsync, AuthorArticleListPageData } from "helpers/wpapi";
import Wrapper from "components/Wrapper";
import { Section } from "components/Section";
import AuthorBox from "components/AuthorBox";
import ArticleListPage, {
  ArticleListPageType,
  ArticleListPageState,
} from "./ArticleListPage";

async function _getAuthorData(
  slug: string,
  pageNumber: number,
): Promise<AuthorArticleListPageData> {
  return getAuthorAsync(slug, pageNumber);
}

interface AuthorArticleListPageProps {
  initData: AuthorArticleListPageData;
  slug: string;
}

export default class AuthorArticleListPage extends React.Component<
  AuthorArticleListPageProps,
  ArticleListPageState
> {
  static async getInitialProps(param): Promise<any> {
    const { query } = param;
    const { slug } = query;
    const authorData = await _getAuthorData(slug, 1);

    return { initData: authorData, slug };
  }

  render(): React.ReactNode {
    const { initData, slug } = this.props;
    return (
      <Section
        style={{
          flexGrow: 1,
          flexDirection: "column",
        }}
      >
        <AuthorBox author={initData.tsdMeta.author} linkToAuthor={false} />
        <ArticleListPage
          initData={initData}
          type={ArticleListPageType.Author}
          getExtraData={async pageNumber => {
            return _getAuthorData(slug, pageNumber);
          }}
          {...this.props}
        />
      </Section>
    );
  }
}

export function AuthorArticleListPageWrapper(props: any): any {
  return (
    <Wrapper class={AuthorArticleListPage} props={props} getInitialProps={{}} />
  );
}
