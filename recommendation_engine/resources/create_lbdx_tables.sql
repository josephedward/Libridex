drop table if EXISTS book_table;

-- 'lib_id', 'title', 'author', 'genre', 'description',
--        'language', 'copyright_year', 'lib_url', 'cleaned_desc'
create table book_table(
    id SERIAL PRIMARY KEY ,
    lib_id INT,
    title text,
    author text,
    genre text, 
    description text, 
    language text, 
    copyright_year int, 
    lib_url text, 
    -- img_url text,
    cleaned_desc text
     );