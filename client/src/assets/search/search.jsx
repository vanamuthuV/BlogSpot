import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";
import ImageComponent from "../../../utils/ImageComponent";
import useSearch from "../../../hooks/useSearch";
import SearchVideo from "../../../public/Search.mp4"

const ACCOUNTSEARCH = "/accountsearch";
const CATEGORYSEARCH = "/categorysearch";
const POSTSEARCH = "/postsearch";
const TAGSEARCH = "/tagsearch";

export const FetchContinous = ({ keyword }) => {
  // console.log(keyword);

  const { searchOpen, setSearchOpen } = useSearch();

  const [loading, setLoading] = useState(true);
  const [Accounts, setAccounts] = useState([]);
  const [Posts, setPosts] = useState([]);
  const [Category, setCategory] = useState([]);
  const [Tags, setTags] = useState([]);
  const [userMore, setUserMore] = useState(false);
  const [postMore, setPostMore] = useState(false);
  const [categoryMore, setCategoryMore] = useState(false);
  const [tagMore, setTagMore] = useState(false);

  const [userMaintainer, setUserMaintainer] = useState([]);
  const [postMaintainer, setPostMaintainer] = useState([]);
  const [categoryMaintainer, setCategoryMaintainer] = useState([]);
  const [tagMaintainer, setTagMaintainer] = useState([]);

  const Search = {
    val: keyword,
  };

  useEffect(() => {
    (async () => {
      try {
        const resposne = await axios.post(ACCOUNTSEARCH, Search);
        // console.log(resposne?.data?.data);
        setAccounts(resposne?.data?.data);
        setUserMaintainer(resposne?.data?.data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }

      // Post Fetching

      try {
        const resposne = await axios.post(POSTSEARCH, Search);
        // console.log(resposne?.data?.data);
        setPosts(resposne?.data?.data);
        setPostMaintainer(resposne?.data?.data.slice(0, 4));
      } catch (error) {
        console.error(error);
      }

      // Category Fetching

      try {
        const resposne = await axios.post(CATEGORYSEARCH, Search);
        // console.log(resposne?.data?.data);
        setCategory(resposne?.data?.data);
        setCategoryMaintainer(resposne?.data?.data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }

      // Tags Fetching

      try {
        const resposne = await axios.post(TAGSEARCH, Search);
        // console.log(resposne?.data?.data);
        setTags(resposne?.data?.data);
        setTagMaintainer(resposne?.data?.data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [keyword]);

  return (
    <div className="flex flex-row items-center justify-center h-full max-md:h-auto">
      <div className="flex flex-col items-center justify-center w-full gap-3 m-10 mt-8 mb-8 max-md:flex-row">
        {keyword.trim() === "" ? (
          <div className="flex flex-row items-center justify-center w-full h-full">
            <video
              autoPlay
              loop
              controls={false}
              width={"50%"}
              height={"50%"}
              playsInline
            >
              <source src={SearchVideo} type="video/mp4" />
            </video>
          </div>
        ) : loading ? (
          <div className="flex flex-row items-center justify-center w-full h-full">
            <h1>loading...</h1>
          </div>
        ) : (
          <>
            <div className="flex flex-row w-full max-md:flex-col max-md:h-full">
              <div className="flex flex-col w-1/4 ml-4 mr-4 max-md:w-full max-md:mt-5 max-md:mb-5">
                <p className="text-base font-semibold text-center text-gray-400 max-md:text-start">
                  PEOPLE
                </p>
                {Accounts.length === 0 ? (
                  <p className="mt-10 text-sm text-center text-orange-500">
                    No Users Found
                  </p>
                ) : (
                  userMaintainer.map((account) => {
                    return (
                      <Link
                        onClick={() => setSearchOpen(false)}
                        to={`/${account.user_name}`}
                      >
                        <div className="flex flex-row items-center mt-5">
                          <div className="flex flex-row items-center justify-center min-w-10 max-w-10 min-h-10 max-h-10">
                            {account.profileimage === null ? (
                              <img
                                className="rounded-full min-w-10 max-w-10 min-h-10 max-h-10 max-md:min-w-8 max-md:max-w-8 max-md:min-h-8 max-md:max-h-8"
                                src="../../../public/Profile.jpeg"
                              />
                            ) : (
                              // <img
                              //   className="rounded-full min-w-16 max-w-16 min-h-16 max-h-16 max-md:min-w-10 max-md:max-w-10 max-md:min-h-10 max-md:max-h-10"
                              //   src={`http://localhost:5000/${post.profileimage}`}
                              //   />
                              <ImageComponent
                                base64String={account.profileimage}
                                features={
                                  "rounded-full min-w-10 max-w-10 min-h-10 max-h-10 max-md:min-w-8 max-md:max-w-8 max-md:min-h-8 max-md:max-h-8"
                                }
                              />
                            )}
                          </div>
                          <div className="flex flex-col justify-center pl-2 max-md:pl-0">
                            <p className="text-xs">@{account.user_name}</p>
                            <p className="text-sm ">{account.userfullname}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                )}
                {Accounts.length > 4 &&
                  (userMore ? (
                    <button
                      onClick={() => {
                        setUserMore(false);
                        setUserMaintainer(Accounts.slice(0, 4));
                      }}
                      className="mt-5 text-xs text-center text-red-400 cursor-pointer hover:underline"
                    >
                      show less
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setUserMore(true);
                        setUserMaintainer(Accounts);
                      }}
                      className="mt-5 text-xs text-center text-blue-400 cursor-pointer hover:underline"
                    >
                      show more
                    </button>
                  ))}
              </div>

              <div className="flex flex-col w-1/4 ml-4 mr-4 max-md:w-full max-md:mt-5 max-md:mb-5">
                <p className="text-base font-semibold text-center text-gray-400 max-md:text-start">
                  POST
                </p>
                {Posts.length === 0 ? (
                  <p className="mt-10 text-sm text-center text-orange-500">
                    {" "}
                    No Results Found
                  </p>
                ) : (
                  postMaintainer.map((post) => {
                    return (
                      <Link className="cursor-normal">
                        <div className="flex flex-row items-center mt-5">
                          <Link
                            onClick={() => setSearchOpen(false)}
                            to={`/Read/${post.post_id}`}
                          >
                            <div className="flex flex-row items-center justify-center min-w-14 max-w-14 min-h-18 max-h-18">
                              {/* <img
                              className=" min-w-28 max-w-28 min-h-18 max-h-18 max-md:min-w-16 max-md:max-w-16 max-md:min-h-14 max-md:max-h-14"
                              src={`http://localhost:5000/${post.post_images}`}
                            /> */}
                              <ImageComponent
                                features={
                                  "min-w-14 max-w-14 min-h-18 max-h-18 max-md:min-w-16 max-md:max-w-16 max-md:min-h-14 max-md:max-h-14"
                                }
                                base64String={post.post_images}
                              />
                            </div>
                          </Link>

                          <div className="flex flex-col justify-center pl-2 ">
                            <Link
                              onClick={() => setSearchOpen(false)}
                              to={`/Read/${post.post_id}`}
                            >
                              <p className="text-xs">
                                {post.post_title.length <= 40
                                  ? post.post_title
                                  : post.post_title.substring(0, 40) + "..."}
                              </p>
                            </Link>
                            <Link>
                              <p className="text-xs text-gray-500">
                                By{" "}
                                <Link
                                  onClick={() => setSearchOpen(false)}
                                  to={`/${post.user_name}`}
                                >
                                  <span className="text-xs hover:underline">
                                    {post.user_name}
                                  </span>
                                </Link>
                              </p>
                            </Link>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                )}

                {Posts.length > 4 &&
                  (postMore ? (
                    <button
                      onClick={() => {
                        setPostMore(false);
                        setPostMaintainer(Posts.slice(0, 4));
                      }}
                      className="mt-5 text-xs text-center text-red-400 cursor-pointer hover:underline"
                    >
                      show less
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setPostMore(true);
                        setPostMaintainer(Posts);
                      }}
                      className="mt-5 text-xs text-center text-blue-400 cursor-pointer hover:underline"
                    >
                      show more
                    </button>
                  ))}
              </div>
              <div className="flex flex-col w-1/4 ml-4 mr-4 max-md:w-full max-md:mt-5 max-md:mb-5">
                <p className="text-base font-semibold text-center text-gray-400 max-md:text-start">
                  TOPIC
                </p>
                {Category.length === 0 ? (
                  <p className="mt-10 text-sm text-center text-orange-500">
                    No Results Found
                  </p>
                ) : (
                  categoryMaintainer.map((category) => {
                    return (
                      <Link className="cursor-normal">
                        <div className="flex flex-row items-center mt-5">
                          <Link
                            onClick={() => setSearchOpen(false)}
                            to={`/Read/${category.post_id}`}
                          >
                            <div className="flex flex-row items-center justify-center min-w-14 max-w-14 min-h-18 max-h-18">
                              {/* <img
                              className=" min-w-28 max-w-28 min-h-18 max-h-18 max-md:min-w-16 max-md:max-w-16 max-md:min-h-14 max-md:max-h-14"
                              src={`http://localhost:5000/${post.post_images}`}
                            /> */}
                              <ImageComponent
                                features={
                                  "min-w-14 max-w-14 min-h-18 max-h-18 max-md:min-w-16 max-md:max-w-16 max-md:min-h-14 max-md:max-h-14"
                                }
                                base64String={category.post_images}
                              />
                            </div>
                          </Link>

                          <div className="flex flex-col justify-center pl-2">
                            <Link
                              onClick={() => setSearchOpen(false)}
                              to={`/Read/${category.post_id}`}
                            >
                              <p className="text-xs">
                                {category.post_title.length <= 40
                                  ? category.post_title
                                  : category.post_title.substring(0, 40) +
                                    "..."}
                              </p>
                            </Link>
                            <Link>
                              <p className="text-xs text-gray-500">
                                By{" "}
                                <Link
                                  onClick={() => setSearchOpen(false)}
                                  to={`/${category.user_name}`}
                                >
                                  <span className="text-xs hover:underline">
                                    {category.user_name}
                                  </span>
                                </Link>
                              </p>
                            </Link>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                )}
                {Category.length > 4 &&
                  (categoryMore ? (
                    <button
                      onClick={() => {
                        setCategoryMore(false);
                        setCategoryMaintainer(Category.slice(0, 4));
                      }}
                      className="mt-5 text-xs text-center text-red-400 cursor-pointer hover:underline"
                    >
                      show less
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setCategoryMore(true);
                        setCategoryMaintainer(Category);
                      }}
                      className="mt-5 text-xs text-center text-blue-400 cursor-pointer hover:underline"
                    >
                      show more
                    </button>
                  ))}
              </div>
              <div className="flex flex-col w-1/4 ml-4 mr-4 max-md:w-full max-md:mt-5 max-md:mb-5">
                <p className="text-base font-semibold text-center text-gray-400 max-md:text-start">
                  TAGS
                </p>
                {Tags.length === 0 ? (
                  <p className="mt-10 text-sm text-center text-orange-500">
                    {" "}
                    No Results Found
                  </p>
                ) : (
                  tagMaintainer.map((tags) => {
                    return (
                      <Link className="cursor-normal">
                        <div className="flex flex-row items-center mt-5">
                          <Link
                            onClick={() => setSearchOpen(false)}
                            to={`/Read/${tags.post_id}`}
                          >
                            <div className="flex flex-row items-center justify-center min-w-14 max-w-14 min-h-18 max-h-18">
                              {/* <img
                              className=" min-w-28 max-w-28 min-h-18 max-h-18 max-md:min-w-16 max-md:max-w-16 max-md:min-h-14 max-md:max-h-14"
                              src={`http://localhost:5000/${post.post_images}`}
                            /> */}
                              <ImageComponent
                                features={
                                  "min-w-14 max-w-14 min-h-18 max-h-18 max-md:min-w-16 max-md:max-w-16 max-md:min-h-14 max-md:max-h-14"
                                }
                                base64String={tags.post_images}
                              />
                            </div>
                          </Link>

                          <div className="flex flex-col justify-center pl-2">
                            <Link
                              onClick={() => setSearchOpen(false)}
                              to={`/Read/${tags.post_id}`}
                            >
                              <p className="text-xs ">
                                {tags.post_title.length <= 40
                                  ? tags.post_title
                                  : tags.post_title.substring(0, 40) + "..."}
                              </p>
                            </Link>
                            <Link>
                              <p className="text-xs text-gray-500 ">
                                By{" "}
                                <Link
                                  onClick={() => setSearchOpen(false)}
                                  to={`/${tags.user_name}`}
                                >
                                  <span className="text-xs hover:underline">
                                    {tags.user_name}
                                  </span>
                                </Link>
                              </p>
                            </Link>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                )}
                {Tags.length > 4 &&
                  (tagMore ? (
                    <button
                      onClick={() => {
                        setTagMore(false);
                        setTagMaintainer(Tags.slice(0, 4));
                      }}
                      className="mt-5 text-xs text-center text-red-400 cursor-pointer hover:underline"
                    >
                      show less
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setTagMore(true);
                        setTagMaintainer(Tags);
                      }}
                      className="mt-5 text-xs text-center text-blue-400 cursor-pointer hover:underline"
                    >
                      show more
                    </button>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
