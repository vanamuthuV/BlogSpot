import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { user_name } = req?.body?.user_name;
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
  
  const ProfilePictureExist = await pool.query(query, [user_name]);
  const UserDetails = await pool.query(query1, [user_name]);
  const CoverPictureExist = await pool.query(query2, [user_name]);
  const ProfileInfo = await pool.query(query3, [user_name])
  const PublicPost = await pool.query(query4, [user_name])
  const PrivatePost = await pool.query(query5, [user_name])


  if (ProfilePictureExist.rows.length === 0 && CoverPictureExist.rows.length === 0) {
    res.status(200).json({
      data: {
        profilestatus: "NO",
        coverstatus: "NO",
        userDetails: UserDetails.rows,
        ProfileInfo: ProfileInfo.rows.length === 0 ? [{}] : ProfileInfo.rows,
        PublicPost: PublicPost.rows,
        PrivatePost : PrivatePost.rows
      },
    });
  }
  else if(ProfilePictureExist.rows.length === 0 && CoverPictureExist.rows.length !== 0){
      res.status(200).json({
        data: {
          profilestatus: "NO",
          coverstatus: CoverPictureExist.rows,
          userDetails: UserDetails.rows,
          ProfileInfo: ProfileInfo.rows.length === 0 ? [{}] : ProfileInfo.rows,
          PublicPost: PublicPost.rows,
          PrivatePost: PrivatePost.rows,
        },
      });
  }
  else if (ProfilePictureExist.rows.length !== 0 && CoverPictureExist.rows.length === 0) {
      res.status(200).json({
        data: {
          profilestatus: ProfilePictureExist.rows,
          coverstatus: "NO",
          userDetails: UserDetails.rows,
          ProfileInfo: ProfileInfo.rows.length === 0 ? [{}] : ProfileInfo.rows,
          PublicPost: PublicPost.rows,
          PrivatePost: PrivatePost.rows,
        },
      });
      }
  else {
    res.status(200).json({
      data: {
        profilestatus: ProfilePictureExist.rows,
        coverstatus: CoverPictureExist.rows,
        userDetails: UserDetails.rows,
        ProfileInfo: ProfileInfo.rows.length === 0 ? [{}] : ProfileInfo.rows,
        PublicPost: PublicPost.rows,
        PrivatePost: PrivatePost.rows,
      },
    });
  }
});

export default router;
