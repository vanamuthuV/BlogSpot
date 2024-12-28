export const loginScript =
  "SELECT * from users left outer join profilepicture on users.user_id = profilepicture.user_id WHERE users.user_email = $1";

export const signupscript =
  "INSERT INTO users values($1, $2,  CURRENT_TIMESTAMP, $3, 'manual_user', 'manual', false)";

export const usernamecheckscript = "SELECT * FROM users WHERE user_name = $1";

export const emailcheckscript = "SELECT * FROM users WHERE user_email = $1";

export const unuecheckscript =
  "SELECT * from users WHERE user_name = $1 OR user_email = $2";

export const reloaduserscript =
  "select * from users left join profilepicture on users.user_id = profilepicture.user_id where users.user_id = $1";

export const landingpagescript = `SELECT
    posts.*,
    users.*,
	profilepicture.*,
    profileinformation.*,
    COUNT(likes.likes) AS likes_count,
    COUNT(dislikes.dislikes) AS dislikes_count
FROM
    posts
    INNER JOIN users  ON posts.user_id = users.user_id
    LEFT OUTER JOIN profileinformation ON posts.user_id = profileinformation.user_id
	LEFT OUTER JOIN profilepicture ON profilepicture.user_id = posts.user_id
    LEFT OUTER JOIN likes ON posts.post_id = likes.post_id AND likes.likes = 'true'
    LEFT OUTER JOIN likes AS dislikes ON posts.post_id = dislikes.post_id AND dislikes.dislikes = 'true'
WHERE
    posts.post_type = 'public'
GROUP BY
    posts.post_id, users.user_id, profilepicture.user_id, profilepicture.profileimage, profilepicture.profiletime, profilepicture.profileimageid, profileinformation.user_id, profileinformation.userfullname, profileinformation.role, profileinformation.dateofbirth, profileinformation.bio, profileinformation.profileupdatedate, profileinformation.profileinformationid
ORDER BY
    likes_count DESC
LIMIT 6`;

export const createpostscript = `INSERT INTO posts values ($1, $2, $3, $4, $5, $6, $7, $8, current_timestamp, $9)`;

export const postdetailwithuserscript = `
SELECT users.*, profilepicture.*, posts.*, profileinformation.*, CASE 
        WHEN bookmark.bookmarkid IS NOT NULL THEN TRUE
        ELSE FALSE
    END AS is_bookmarked,
    bookmark.bookmarkid
from users
    join posts on users.user_id = posts.user_id
    left outer join profilepicture on profilepicture.user_id = users.user_id
    left outer join profileinformation on users.user_id = profileinformation.user_id
LEFT JOIN
    (SELECT
        post_id,
        bookmarkid
     FROM
        bookmark
     WHERE
        user_id = $1
    ) AS bookmark ON posts.post_id = bookmark.post_id
    where posts.post_id = $2
`;

export const postdetailwithoutuserscript = `
SELECT * from users
    join posts on users.user_id = posts.user_id
    left outer join profilepicture on profilepicture.user_id = users.user_id
    left outer join profileinformation on users.user_id = profileinformation.user_id
    where posts.post_id = $1
`;

export const addbookmarkscript = `
INSERT INTO bookmark values ($1, $2, CURRENT_TIMESTAMP) RETURNING *
`;

export const removebookmarkscript = `
    delete from bookmark where bookmarkid = $1
`;

export const trendingscript = `
SELECT
    posts.*,
    users.*,
    profilepicture.*,
    COALESCE(liked.likecount, 0) AS likecount,
    COALESCE(disliked.dislikecount, 0) AS dislikecount,
    CASE 
        WHEN bookmark.bookmarkid IS NOT NULL THEN TRUE
        ELSE FALSE
    END AS is_bookmarked,
    bookmark.bookmarkid
FROM
    posts
LEFT JOIN
    profilepicture ON posts.user_id = profilepicture.user_id
JOIN
    users ON posts.user_id = users.user_id
LEFT JOIN
    (SELECT
        post_id,
        COUNT(*) AS likecount
     FROM
        likes
     WHERE
        likes.likes = 'true'
     GROUP BY
        post_id
    ) AS liked ON posts.post_id = liked.post_id
LEFT JOIN
    (SELECT
        post_id,
        COUNT(*) AS dislikecount
     FROM
        likes
     WHERE
        likes.dislikes = 'true'
     GROUP BY
        post_id
    ) AS disliked ON posts.post_id = disliked.post_id
LEFT JOIN
    (SELECT
        post_id,
        bookmarkid
     FROM
        bookmark
     WHERE
        user_id = $1
    ) AS bookmark ON posts.post_id = bookmark.post_id
WHERE
    post_type = 'public'
order by likecount desc
`;

export const newpostscript = `
select posts.* , users.*, profilepicture.*, coalesce(liked.likescount, 0) as likecount, COALESCE(disliked.dislikecount, 0) AS dislikecount,
CASE 
        WHEN bookmark.bookmarkid IS NOT NULL THEN TRUE
        ELSE FALSE
    END AS is_bookmarked,
    bookmark.bookmarkid
from posts LEFT JOIN
    profilepicture ON posts.user_id = profilepicture.user_id 
join users on posts.user_id = users.user_id 
left join 
(select post_id, coalesce(count(*),0) as likescount from likes where likes.likes = 'true' group by post_id) as liked
on posts.post_id = liked.post_id LEFT JOIN
    (SELECT
        post_id,
        COUNT(*) AS dislikecount
     FROM
        likes
     WHERE
        likes.dislikes = 'true'
     GROUP BY
        post_id
    ) AS disliked ON posts.post_id = disliked.post_id 
LEFT JOIN
    (SELECT
        post_id,
        bookmarkid
     FROM
        bookmark
     WHERE
        user_id = $1
    ) AS bookmark ON posts.post_id = bookmark.post_id
where post_type='public'  order by post_upload_time desc
`;

export const networkscript = `
select A.*, 
coalesce(likedd.lik, 0) as likecount, 
coalesce(dislikedd.dislik, 0) as dislikecount,
 CASE 
        WHEN bookmark.bookmarkid IS NOT NULL THEN TRUE
        ELSE FALSE
    END AS is_bookmarked,
    bookmark.bookmarkid
from 
(select posts.*, users.*, prof.* from posts join users on posts.user_id = users.user_id join
 (select
    follow.following_id,
    profilepicture.profileimage from follow join users on follow.follower_id = $1
    left join profilepicture on following_id =
profilepicture.user_id
    group by following_id, profilepicture.profileimage) as prof
        on posts.user_id = prof.following_id) as A 
left join (select post_id, count(*) as lik from likes 
where likes = 'true' 
group by 
likes.post_id) as likedd on A.post_id = likedd.post_id left join
(select post_id, count(*) as dislik from likes where dislikes = 'true' group by likes.post_id) 
as dislikedd on A.post_id = dislikedd.post_id 
LEFT JOIN
    (SELECT
        post_id,
        bookmarkid
     FROM
        bookmark
     WHERE
        user_id = $1
    ) AS bookmark ON A.post_id = bookmark.post_id
where A.post_type = 'public' order by A.post_upload_time desc
`;

export const addpersonalinformationscript = `
insert into profileinformation values ($1, $2, $3, $4, $5, current_timestamp) RETURNING *
`;

export const updatepersonalinformationscript = `
 update profileinformation set userfullname = $1, role = $2, dateofbirth = $3, bio = $4, profileupdatedate = current_timestamp where user_id = $5 RETURNING *
`;

export const addcoverpicturescript = `
        insert into coverpicture values ($1, $2, current_timestamp) returning *
    `;

export const upadtecoverpicturescript = `
        update coverpicture set coverimage = $1, covertime = current_timestamp where user_id = $2 returning *
    `;

export const addprofilepicturescript = `
        insert into profilepicture values ($1, $2, current_timestamp) returning *
    `;

export const updateprofilepicturescript = `
update profilepicture set profileimage = $1, profiletime = current_timestamp where user_id = $2 returning *    
`;

export const deletepostscript = `
delete from posts where post_id = $1
`;

export const addfollowscript = `
    insert into follow values ($1, $2, current_timestamp) returning *
`;

export const deletefollowscript = `
        delete from follow where follow_id = $1
    `;

export const fetchfromusernamescript = `
    select * from users where user_name = $1
`;

export const getfollowersscript = `
 select * from follow 
join users on users.user_id = follow.follower_id
left outer join profilepicture on profilepicture.user_id = follow.follower_id
left outer join profileinformation on profileinformation.user_id = follow.follower_id
where follow.following_id = $1
`;

export const getfollowingscript = `
     select * from follow 
    join users on users.user_id = follow.following_id
    left outer join profilepicture on profilepicture.user_id = follow.following_id
    left outer join profileinformation on profileinformation.user_id = follow.following_id
    where follow.follower_id = $1
`;

export const getbookmarkscript = `
SELECT 
  posts.post_id, 
  posts.post_title, 
  posts.post_images
FROM 
  bookmark 
JOIN 
  posts 
ON 
  bookmark.post_id = posts.post_id
WHERE 
  bookmark.user_id = $1
`;

export const getfavoritescript = `
SELECT 
  posts.post_id, 
  posts.post_title, 
  posts.post_images
FROM 
  favorite 
JOIN 
  posts 
ON 
  favorite.post_id = posts.post_id
WHERE 
  favorite.user_id = $1
`;

export const getlikescript = `
SELECT 
  posts.post_id, 
  posts.post_title, 
  posts.post_images
FROM 
  likes 
JOIN 
  posts 
ON 
  likes.post_id = posts.post_id
WHERE 
  likes.user_id = $1 
  AND likes.likes = true
`;

export const getdislikescript = `
SELECT 
  posts.post_id, 
  posts.post_title, 
  posts.post_images
FROM 
  likes 
JOIN 
  posts 
ON 
  likes.post_id = posts.post_id
WHERE 
  likes.user_id = $1 
  AND likes.dislikes = true
`;

export const checkfollowscript = `
    SELECT * from follow where follower_id = $1 and following_id = $2
`;

export const getlikebyidscript = `
SELECT * FROM likes WHERE post_id = $1
`;

export const deletelikescript = `
    DELETE FROM likes WHERE like_id = $1
`;
export const insertlikescript = `
 insert into likes values ($1, $2, true, false, current_timestamp) RETURNING *
`;

export const insertdislikescript = `
insert into likes values ($1, $2, false, true, current_timestamp) RETURNING *
`;

export const addfavoritescript = `
 insert into favorite values ($1, $2, current_timestamp) returning *
`;

export const removefavoritescript = `
        delete from favorite where favorite_id = $1
    `;

export const checkfavoritescript = `
        select * from favorite where user_id = $1 and post_id = $2
    `;

export const addcommentscript = `
    insert into comments values ($1, $2, $3, current_timestamp, false) returning *
    `;

export const getcommentscript = `
   select * from users 
          left join comments on users.user_id = comments.user_id
          left join profilepicture on users.user_id = profilepicture.user_id
          where comments.post_id = $1 ORDER BY comments.comment_time DESC    
`;

export const removecommentscript = `
        delete from comments where comment_id = $1
    `;

export const updatecommentscript = `
        update comments set comment = $1, isedited = true where comment_id = $2 returning *
    `;

export const getpostdetailscript = `select * from posts where post_id = $1`;

export const updatepostscript = `
 update posts set post_title = $1, post_images = $2, post_content = $3, post_category = $4, post_tags = $5, post_summary = $6, post_type = $7, post_comment_type = $8 where post_id = $9
`;

export const usernamecheckscripts = `
  SELECT * FROM users WHERE user_name LIKE $1 || '%'
`;

export const updateusernamescript = `
        update users set user_name = $1 where user_id = $2 returning *
    `;

export const useremailcheckscripts = `
  SELECT * FROM users WHERE user_email LIKE $1 || '%'
`;

export const updateuseremailscript = `
        update users set user_email = $1 , verified = false where user_id = $2 returning *
    `;

export const verifyscript = `
    UPDATE users SET verified = true WHERE user_id = $1;
`;

export const getuserscript = `
        select * from users where user_id = $1
    `;

export const updatepasswordbyidscript = `
          update users set user_password = $1 where user_id = $2
      `;

export const deleteaccountscript = `
        delete from users where user_id = $1
    `;

export const updatepasswordbyemailscript = `
          update users set user_password = $1 where user_email = $2
      `;

export const searchuserscript = `
SELECT 
  profilepicture.profileimage,
  users.user_name,
  profileInformation.userfullname
FROM 
  users
LEFT OUTER JOIN 
  profilepicture 
ON 
  users.user_id = profilepicture.user_id
LEFT OUTER JOIN 
  profileInformation 
ON 
  users.user_id = profileInformation.user_id
WHERE 
  UPPER(users.user_name) LIKE UPPER('%' || $1 || '%');
      
`;

export const searchcategoryscript = `
SELECT 
  posts.post_id,
  posts.post_images,
  users.user_name,
  posts.post_title,
  posts.post_category
FROM 
  posts
JOIN 
  users 
ON 
  posts.user_id = users.user_id
WHERE 
  UPPER(posts.post_category) LIKE UPPER('%' || $1 || '%');

`;

export const searchtagscript = `
SELECT 
  users.user_name,
  posts.post_title,
  posts.post_images,
  posts.post_id,
  posts.post_tags
FROM 
  posts
JOIN 
  users 
ON 
  posts.user_id = users.user_id
WHERE 
  UPPER(posts.post_tags) LIKE UPPER('%' || $1 || '%');
`;

export const searchpostscript = `
SELECT 
  users.user_name,
  posts.post_title,
  posts.post_images,
  posts.post_id
FROM 
  posts
JOIN 
  users 
ON 
  posts.user_id = users.user_id
WHERE 
  UPPER(posts.post_title) LIKE UPPER('%' || $1 || '%');
`;
