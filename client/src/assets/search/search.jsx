import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";
import ImageComponent from "../../../utils/ImageComponent";
import useSearch from "../../../hooks/useSearch";
import SearchVideo from "../../../public/Search.mp4";
import img from "../../../public/Profile.jpeg";
import { Loader } from "lucide-react";
import { useSnackbarContext } from "../../context/snackProvider";

const SEARCH = "/search/search";

export const FetchContinous = ({ keyword }) => {
  // console.log(keyword);

  const { searchOpen, setSearchOpen } = useSearch();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    Accounts: [],
    Posts: [],
    Category: [],
    Tags: [],
  });

  const { showSnackbar } = useSnackbarContext();

  const [userMore, setUserMore] = useState(false);
  const [postMore, setPostMore] = useState(false);
  const [categoryMore, setCategoryMore] = useState(false);
  const [tagMore, setTagMore] = useState(false);

  const [userMaintainer, setUserMaintainer] = useState([]);
  const [postMaintainer, setPostMaintainer] = useState([]);
  const [categoryMaintainer, setCategoryMaintainer] = useState([]);
  const [tagMaintainer, setTagMaintainer] = useState([]);

  useEffect(() => {
    if (keyword.length !== 1) {
      const tempuser = [...data.Accounts];
      setUserMaintainer(() => {
        const tempu = tempuser.filter((user) =>
          user.user_name.includes(keyword)
        );
        return tempu;
      });
      const temppost = [...data.Posts];
      setPostMaintainer(() => {
        const tempp = temppost.filter((post) =>
          post.post_title.includes(keyword)
        );
        return tempp;
      });
      const tempcategory = [...data.Category];
      setCategoryMaintainer(() => {
        const tempc = tempcategory.filter((cat) =>
          cat.post_category.includes(keyword)
        );
        return tempc;
      });
      const temptags = [...data.Tags];
      setTagMaintainer(() => {
        const tempt = temptags.filter((tag) => tag.post_tags.includes(keyword));
        return tempt;
      });
      return;
    }

    (async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${SEARCH}/${keyword}`);
        console.log(response?.data?.data);
        const { accounts, posts, categorys, tags } = response?.data?.data;
        setData((prev) => {
          const newSearch = { ...prev };

          newSearch.Accounts = accounts;
          const tempuser = [...accounts];
          setUserMaintainer(tempuser.splice(0, 4));
          newSearch.Category = categorys;
          const tempcategory = [...categorys];
          setCategoryMaintainer(tempcategory.splice(0, 4));
          newSearch.Posts = posts;
          const temppost = [...posts];
          setPostMaintainer(temppost.splice(0, 4));
          newSearch.Tags = tags;
          const temptags = [...tags];
          setTagMaintainer(temptags.splice(0, 4));
          return newSearch;
        });
      } catch (error) {
        showSnackbar(error?.response?.data?.message, false);
      }
      setLoading(false);
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
            <Loader className="animate-spin" />
          </div>
        ) : (
          <>
            <div className="flex flex-row w-full max-md:flex-col max-md:h-full">
              <div className="flex flex-col w-1/4 ml-4 mr-4 max-md:w-full max-md:mt-5 max-md:mb-5">
                <p className="text-base font-semibold text-center text-gray-400 max-md:text-start">
                  PEOPLE
                </p>
                {data.Accounts.length === 0 ? (
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
                                src={img}
                              />
                            ) : (
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
                {data.Accounts.length > 4 &&
                  (userMore ? (
                    <button
                      onClick={() => {
                        setUserMore(false);
                        setUserMaintainer(data.Accounts.slice(0, 4));
                      }}
                      className="mt-5 text-xs text-center text-red-400 cursor-pointer hover:underline"
                    >
                      show less
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setUserMore(true);
                        setUserMaintainer(data.Accounts);
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
                {data.Posts.length === 0 ? (
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

                {data.Posts.length > 4 &&
                  (postMore ? (
                    <button
                      onClick={() => {
                        setPostMore(false);
                        setPostMaintainer(data.Posts.slice(0, 4));
                      }}
                      className="mt-5 text-xs text-center text-red-400 cursor-pointer hover:underline"
                    >
                      show less
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setPostMore(true);
                        setPostMaintainer(data.Posts);
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
                {data.Category.length === 0 ? (
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
                {data.Category.length > 4 &&
                  (categoryMore ? (
                    <button
                      onClick={() => {
                        setCategoryMore(false);
                        setCategoryMaintainer(data.Category.slice(0, 4));
                      }}
                      className="mt-5 text-xs text-center text-red-400 cursor-pointer hover:underline"
                    >
                      show less
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setCategoryMore(true);
                        setCategoryMaintainer(data.Category);
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
                {data.Tags.length === 0 ? (
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
                {data.Tags.length > 4 &&
                  (tagMore ? (
                    <button
                      onClick={() => {
                        setTagMore(false);
                        setTagMaintainer(data.Tags.slice(0, 4));
                      }}
                      className="mt-5 text-xs text-center text-red-400 cursor-pointer hover:underline"
                    >
                      show less
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setTagMore(true);
                        setTagMaintainer(data.Tags);
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
