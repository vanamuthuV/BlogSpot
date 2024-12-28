import { sendResponse } from "../utils/responder.js";
import {
  addpersonalinformationscript,
  updatepersonalinformationscript,
  addcoverpicturescript,
  upadtecoverpicturescript,
  addprofilepicturescript,
  updateprofilepicturescript,
} from "../db/query.js";
import { pool } from "../db/db.js";

const addpersonalinformation = async (req, res) => {
  const { user_id } = req.user;
  const { name, dof, bio, role } = req.body;

  const persona = await pool.query(addpersonalinformationscript, [
    user_id,
    name,
    role,
    dof,
    bio,
  ]);
  return sendResponse({
    code: 200,
    message: "Personal details added",
    res,
    success: true,
    data: persona.rows,
  });
};

const updatepersonalinformation = async (req, res) => {
  const { name, dof, bio, role } = req.body;
  const { user_id } = req.user;

  const persona = await pool.query(updatepersonalinformationscript, [
    name,
    role,
    dof,
    bio,
    user_id,
  ]);
  return sendResponse({
    code: 200,
    message: "Personal details updated",
    res,
    success: true,
    data: persona.rows,
  });
};

const getprofile = async (req, res) => {
  const { user_name, user_id } = req?.params;

  console.log(req.params);

  const query = `
    select * from users join profilepicture on users.user_id = profilepicture.user_id where users.user_name = $1;
    `;

  const query1 = `
        select * from users where user_name =  $1
    `;
  const query2 = `
        select * from users join coverpicture on users.user_id = coverpicture.user_id where users.user_name = $1;
    `;

  const query3 = `
        select userfullname, role, profileupdatedate, dateofbirth,bio from users join profileinformation on profileinformation.user_id = users.user_id where users.user_name = $1;
  `;

  const query4 = `
    select * from users join posts on users.user_id = posts.user_id where posts.post_type = 'public' and users.user_name = $1
  `;

  const query5 = `
    select * from users join posts on users.user_id = posts.user_id where posts.post_type = 'private' and users.user_name = $1
  `;

  const query6 = `
     select * from users where user_name = $1
  `;

  const query7 = `
        select * from follow where follower_id = $1 and following_id = $2
    `;

  const query8 = `
    select * from follow 
join users on users.user_id = follow.follower_id
left outer join profilepicture on profilepicture.user_id = follow.follower_id
left outer join profileinformation on profileinformation.user_id = follow.follower_id
where follow.following_id = $1
  `;

  const query9 = `
    select * from follow 
join users on users.user_id = follow.following_id
left outer join profilepicture on profilepicture.user_id = follow.following_id
left outer join profileinformation on profileinformation.user_id = follow.following_id
where follow.follower_id = $1
  `;

  const ProfilePictureExist = await pool.query(query, [user_name]);
  const UserDetails = await pool.query(query1, [user_name]);
  const CoverPictureExist = await pool.query(query2, [user_name]);
  const ProfileInfo = await pool.query(query3, [user_name]);
  const PublicPost = await pool.query(query4, [user_name]);
  const PrivatePost = await pool.query(query5, [user_name]);
  const User = await pool.query(query6, [user_name]);

  const users =
    user_id !== "undefined" ? user_id : "00000000-0000-0000-0000-000000000000";

  console.log("The uuid ", users, user_id);

  const Follower_id = User?.rows[0]?.user_id;
  const FollowStatus = await pool.query(query7, [users, Follower_id]);
  const Followers = await pool.query(query8, [Follower_id]);
  const Followings = await pool.query(query9, [Follower_id]);

  if (
    ProfilePictureExist.rows.length === 0 &&
    CoverPictureExist.rows.length === 0
  ) {
    return sendResponse({
      code: 200,
      message: "Profile fetch success",
      res,
      success: true,
      data: {
        profilestatus: "NO",
        coverstatus: "NO",
        userDetails: UserDetails.rows,
        ProfileInfo: ProfileInfo.rows.length === 0 ? [{}] : ProfileInfo.rows,
        PublicPost: PublicPost.rows,
        PrivatePost: PrivatePost.rows,
        FollowStatus: FollowStatus.rows.length === 0 ? [] : FollowStatus.rows,
        Followers: Followers.rows,
        Followings: Followings.rows,
      },
    });
  } else if (
    ProfilePictureExist?.rows?.length === 0 &&
    CoverPictureExist?.rows?.length !== 0
  ) {
    return sendResponse({
      code: 200,
      message: "Profile fetch success",
      res,
      success: true,
      data: {
        profilestatus: "NO",
        coverstatus: CoverPictureExist?.rows,
        userDetails: UserDetails?.rows,
        ProfileInfo: ProfileInfo?.rows?.length === 0 ? [{}] : ProfileInfo.rows,
        PublicPost: PublicPost?.rows,
        PrivatePost: PrivatePost?.rows,
        FollowStatus: FollowStatus?.rows === 0 ? {} : FollowStatus.rows[0],
        Followers: Followers?.rows,
        Followings: Followings?.rows,
      },
    });
  } else if (
    ProfilePictureExist.rows.length !== 0 &&
    CoverPictureExist.rows.length === 0
  ) {
    return sendResponse({
      code: 200,
      message: "Profile fetch success",
      res,
      success: true,
      data: {
        profilestatus: ProfilePictureExist.rows,
        coverstatus: "NO",
        userDetails: UserDetails.rows,
        ProfileInfo: ProfileInfo.rows.length === 0 ? [{}] : ProfileInfo.rows,
        PublicPost: PublicPost.rows,
        PrivatePost: PrivatePost.rows,
        FollowStatus: FollowStatus.rows === 0 ? {} : FollowStatus.rows[0],
        Followers: Followers.rows,
        Followings: Followings.rows,
      },
    });
  } else {
    return sendResponse({
      code: 200,
      message: "Profile fetch success",
      res,
      success: true,
      data: {
        profilestatus: ProfilePictureExist.rows,
        coverstatus: CoverPictureExist.rows,
        userDetails: UserDetails.rows,
        ProfileInfo: ProfileInfo.rows.length === 0 ? [{}] : ProfileInfo.rows,
        PublicPost: PublicPost.rows,
        PrivatePost: PrivatePost.rows,
        FollowStatus: FollowStatus.rows === 0 ? {} : FollowStatus.rows[0],
        Followers: Followers.rows,
        Followings: Followings.rows,
      },
    });
  }
};

const addcoverimage = async (req, res) => {
  const { user_id } = req.user;
  const { media } = req.body;

  if (!media) {
    return sendResponse({
      code: 400,
      message: "Cannot find cover picture",
      res,
      success: false,
      data: null,
    });
  }

  const cover = await pool.query(addcoverpicturescript, [user_id, media]);
  return sendResponse({
    code: 200,
    message: "Cover picture updated",
    res,
    success: "true",
    data: cover.rows,
  });
};

const updatecoverimage = async (req, res) => {
  const { media } = req.body;
  const { user_id } = req.user;

  if (!media) {
    return sendResponse({
      code: 400,
      message: "Cannot find cover picture",
      res,
      success: false,
      data: null,
    });
  }

  const cover = await pool.query(upadtecoverpicturescript, [media, user_id]);
  return sendResponse({
    code: 200,
    message: "Cover picture updated",
    res,
    success: "true",
    data: cover.rows,
  });
};

const addprofileimage = async (req, res) => {
  const { user_id } = req.user;
  const { media } = req.body;

  if (!media) {
    return sendResponse({
      code: 400,
      message: "Cannot find profile picture",
      res,
      success: false,
      data: null,
    });
  }

  const profile = await pool.query(addprofilepicturescript, [user_id, media]);
  return sendResponse({
    code: 200,
    message: "Profile picture updated",
    res,
    success: "true",
    data: profile.rows,
  });
};

const updateprofileimage = async (req, res) => {
  const { media } = req.body;
  const { user_id } = req.user;

  console.log("THe body", req.body)

  if (!media) {
    return sendResponse({
      code: 400,
      message: "Cannot find profile picture",
      res,
      success: false,
      data: null,
    });
  }

  const profile = await pool.query(updateprofilepicturescript, [
    media,
    user_id,
  ]);
  return sendResponse({
    code: 200,
    message: "Profile picture updated",
    res,
    success: "true",
    data: profile.rows,
  });
};

export {
  addpersonalinformation,
  updatepersonalinformation,
  getprofile,
  addcoverimage,
  updatecoverimage,
  addprofileimage,
  updateprofileimage,
};
