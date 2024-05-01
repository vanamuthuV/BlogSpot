create table users(user_name text unique not null,
	user_email text unique not null,
	user_password text,
	account_created timestamp,
	user_id uuid primary key default uuid_generate_v4()
);

create table coverpicture(
	user_id uuid,
	coverimage text,
	covertime timestamp,
	coverimageid uuid primary key default uuid_generate_v4(),
	foreign key(user_id) references users(user_id) on delete cascade
);

create table follow (
	follower_id uuid,
	following_id uuid,
	following_date timestamp,
	follow_id uuid primary key default uuid_generate_v4(),
	foreign key(follower_id) references users(user_id) on delete cascade,
	foreign key(following_id) references users(user_id) on delete cascade
);

create table profileinformation (
	user_id uuid,
	userfullname varchar(30),
	role varchar(50),
	dateofbirth date,
	bio text,
	profileupdatedate timestamp,
	profileinformationid uuid primary key default uuid_generate_v4(),
	foreign key(user_id) references users(user_id) on delete cascade
);

create table profilepicture (
	user_id uuid,
	profileimage text,
	profiletime timestamp,
	profileimageid uuid primary key default uuid_generate_v4(),
	foreign key(user_id) references users(user_id) on delete cascade
);

create table posts (
	post_title varchar(100),
	post_images text,
	post_content text,
	post_category varchar(50),
	post_tags varchar(100),
	post_summary text,
	post_type varchar(7),
	post_comment_type varchar(5),
	post_upload_time timestamp,
	user_id uuid,
	post_id uuid primary key default uuid_generate_v4(),
	foreign key(user_id) references users(user_id) on delete cascade
);

create table comments (
	user_id uuid,
	post_id uuid,
	comment text,
	comment_time timestamp,
	isedited boolean,
	comment_id uuid primary key default uuid_generate_v4(),
	foreign key(user_id) references users(user_id) on delete cascade,
	foreign key(post_id) references posts(post_id) on delete cascade
);

create table favorite (
	user_id uuid,
	post_id uuid,
	favorite_time timestamp,
	favorite_id uuid primary key default uuid_generate_v4(),
	foreign key(user_id) references users(user_id) on delete cascade,
	foreign key(post_id) references posts(post_id) on delete cascade
);

create table likes (
	user_id uuid,
	post_id uuid,
	likes boolean,
	dislikes boolean,
	like_time timestamp,
	like_id uuid primary key default uuid_generate_v4(),
	foreign key(user_id) references users(user_id) on delete cascade,
	foreign key(post_id) references posts(post_id) on delete cascade
);