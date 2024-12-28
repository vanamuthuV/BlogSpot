import { trendingscript, networkscript, newpostscript } from "../db/query.js";
import { sendResponse } from "../utils/responder.js";
import { pool } from "../db/db.js";

const read = async (req, res) => {
  const { user_id } = req.user;
  const dummyID = "123e4567-e89b-12d3-a456-426614174000";

  const trendingposts = await pool.query(trendingscript, [
    user_id ? user_id : dummyID,
  ]);
  const newposts = await pool.query(newpostscript, [
    user_id ? user_id : dummyID,
  ]);
  const networkposts = await pool.query(networkscript, [
    user_id ? user_id : dummyID,
  ]);
  return sendResponse({
    code: 200,
    message: "Trending post fetch success",
    res,
    success: true,
    data: {
      trend: trendingposts.rows,
      new: newposts.rows,
      network: networkposts.rows,
      foryou: [],
    },
  });
};

const readnolock = async (req, res) => {
  const dummyID = "123e4567-e89b-12d3-a456-426614174000";

  const trendingposts = await pool.query(trendingscript, [dummyID]);
  const newposts = await pool.query(newpostscript, [dummyID]);
  const networkposts = await pool.query(networkscript, [dummyID]);
  return sendResponse({
    code: 200,
    message: "Trending post fetch success",
    res,
    success: true,
    data: {
      trend: trendingposts.rows,
      new: newposts.rows,
      network: networkposts.rows,
      foryou: [],
    },
  });
};

export { read, readnolock };
