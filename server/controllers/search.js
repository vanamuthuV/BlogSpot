import {
  searchcategoryscript,
  searchpostscript,
  searchtagscript,
  searchuserscript,
} from "../db/query.js";
import { sendResponse } from "../utils/responder.js";
import { pool } from "../db/db.js";

const getsearch = async (req, res) => {
  const { value } = req.params;

  const [users, posts, categorys, tags] = await Promise.all([
    pool.query(searchuserscript, [value]),
    pool.query(searchpostscript, [value]),
    pool.query(searchcategoryscript, [value]),
    pool.query(searchtagscript, [value]),
  ]);

  return sendResponse({
    code: 200,
    message: "Search success",
    res,
    success: true,
    data: {
      accounts: users.rows,
      posts: posts.rows,
      categorys: categorys.rows,
      tags: tags.rows,
    },
  });
};

export { getsearch };
