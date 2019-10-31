import WPAPI from "wpapi";
import moment from "moment";
import { STRINGS } from "./constants";
import tsdJson from "./tsd-json.json";

export type Base = {
  tsdMeta: {
    wpHead?: string; // Elements (scripts, styles, etc.) in `wp_head()`.
    wpFooter?: string; // Elements (scripts etc.) in `wp_footer()`.
  };
};

export type Home = Base & {
  featured: Post[];
  news: Post[];
  sports: Post[];
  opinions: Post[];
  theGrind: Post[];
  artsAndLife: Post[];
  sponsored: Post[];
  moreFromTheDaily: Post[];
  tsdMeta: {
    categories: {
      featured: Category;
      news: Category;
      sports: Category;
      opinions: Category;
      "arts-life": Category;
      thegrind: Category;
    };
  };
};

export type PostURL = {
  year: string;
  month: string;
  day: string;
  slug: string;
};

export type Author = {
  id: number;
  displayName: string;
  userNicename: string; // This is user's URL-friendly slug
  url: string;
  avatarUrl: string;
  description?: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  url: string;
};

export type Thumbnail = {
  urls: {
    full?: string;
    mediumLarge?: string;
    thumbnail?: string;
  };
  caption?: string;
  alt?: string;
};

export type Post = Base & {
  id: number;
  postDate: string;
  postDateGmt: string;
  postModified: string;
  postModifiedGmt: string;
  postTitle: string;
  postSubtitle?: string;
  tsdAuthors: Author[];
  postExcerpt: string;
  postContent?: string;
  postType: "post" | "page";
  commentStatus: string;
  thumbnailInfo?: Thumbnail;
  tsdPrimaryCategory?: Category;
  tsdCategories?: Category[];
  tagsInput: string[];
  tsdUrlParameters: PostURL;
  guid: string; // Unique perminlinks (e.g., "https://www.stanforddaily.com/?p=1144743")
};

export type ArchivePageData = Base & {
  posts: Post[];
};

export type CategoryArchivePageData = ArchivePageData & {
  tsdMeta: {
    title: string;
  };
};

export type AuthorArchivePageData = ArchivePageData & {
  tsdMeta: {
    author: Author;
  };
};

export type SearchArchivePageData = ArchivePageData & {};

const wp = new WPAPI({
  endpoint: `${STRINGS.WP_URL}/wp-json`,
  routes: tsdJson.routes,
});
const wpTsdJson = wp.namespace("tsd/json/v1");

export async function getPostByIdAsync(id: number): Promise<Post> {
  return wpTsdJson.postsId().postId(id);
}

export async function getPostAsync(
  year: string,
  month: string,
  day: string,
  slug: string,
): Promise<Post> {
  return (
    wpTsdJson
      .posts()
      .postYear(year)
      .postMonth(month)
      .postDay(day)
      // We have to encode it for cases such as https://www.stanforddaily.com/2019/05/09/dont-miss-cap-and-gowns-spring-brunch%ef%bb%bf-featuring-a-guest-from-the-san-francisco-49ers/
      .postSlug(encodeURIComponent(slug))
      .param("_time", moment().format("MMMM Do YYYY, h:mm a")) // Update every minute
  );
}

export async function getPageAsync(slug: string): Promise<Post> {
  return wpTsdJson.page().pageSlug(encodeURIComponent(slug));
}

export async function getHomeAsync(): Promise<Home> {
  return wpTsdJson
    .home()
    .param("_time", moment().format("MMMM Do YYYY, h:mm a")); // Update every minute
}

export async function getHomeMoreAsync(
  extraPageNumber: number,
): Promise<Post[]> {
  return wpTsdJson
    .home()
    .more()
    .extraPageNumber(extraPageNumber)
    .param("_time", moment().format("MMMM Do YYYY, h:mm a")); // Update every minute
}

export async function getCategoryAsync(
  categorySlugs: string[],
  pageNumber: number,
): Promise<CategoryArchivePageData> {
  return wpTsdJson
    .category()
    .categorySlugs(categorySlugs.map(encodeURIComponent).join("/"))
    .pageNumber(pageNumber);
}

export async function getAuthorAsync(
  authorSlug: string,
  pageNumber: number,
): Promise<AuthorArchivePageData> {
  return wpTsdJson
    .author()
    .authorSlug(encodeURIComponent(authorSlug))
    .pageNumber(pageNumber);
}

export async function getSearchAsync(
  keyword: string,
  pageNumber: number,
): Promise<SearchArchivePageData> {
  return wpTsdJson
    .search()
    .searchKeyword(encodeURIComponent(keyword))
    .pageNumber(pageNumber);
}

export function getPostLocalDate(post: Post): moment.Moment {
  const date = moment.utc(post.postDateGmt);
  return date;
}

export function getPostPath(post: Post): string {
  const { tsdUrlParameters } = post;
  return `/${tsdUrlParameters.year}/${tsdUrlParameters.month}/${tsdUrlParameters.day}/${tsdUrlParameters.slug}/`;
}

export function getNextJsCategoryPath(categoryUrl: string): string {
  const categorySlugs = categoryUrl.split("/");
  const categoryLevel = categorySlugs.length - 3; // Remove beginning `"/"`, `"category/"`, and trailing `"/"`
  let nextJsCategoryPath = "/category";
  for (let index = 1; index <= categoryLevel; index += 1) {
    nextJsCategoryPath += `/[slug${index}]`;
  }
  return nextJsCategoryPath;
}

export function getPostTimeString(date: moment.Moment, format: string): string {
  if (date.isSame(new Date(), "day")) {
    // If posted on the same day.
    return date.fromNow();
  } else {
    return date.format(format);
  }
}
