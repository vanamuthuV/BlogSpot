import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { user_name } = req?.body?.user_name;
  const { user_id } = req?.body;
  console.log(user_name);

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

  const Follower_id = User?.rows[0]?.user_id;
  const FollowStatus = await pool.query(query7, [user_id, Follower_id]);
  const Followers = await pool.query(query8, [Follower_id]);
  const Followings = await pool.query(query9, [Follower_id]);

  console.log(Follower_id + "HEHEHE");
  console.log(user_id + "YO");
  console.log(FollowStatus.rows);

  if (
    ProfilePictureExist.rows.length === 0 &&
    CoverPictureExist.rows.length === 0
  ) {
    res.status(200).json({
      data: {
        profilestatus: "NO",
        coverstatus: "NO",
        userDetails: UserDetails.rows,
        ProfileInfo: ProfileInfo.rows.length === 0 ? [{}] : ProfileInfo.rows,
        PublicPost: PublicPost.rows,
        PrivatePost: PrivatePost.rows,
        FollowStatus:
          FollowStatus.rows.length === 0 ? [] : FollowStatus.rows,
        Followers: Followers.rows,
        Followings: Followings.rows,
      },
    });
  } else if (
    ProfilePictureExist?.rows?.length === 0 &&
    CoverPictureExist?.rows?.length !== 0
  ) {
    res.status(200).json({
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
    res.status(200).json({
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
    res.status(200).json({
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
});

export default router;
