sqlite3 db-imdb.sqlite << EOF
.tables
.mode ascii
.separator "\t" "\n"
.import -skip 1 ./database/title.basics.tsv title_basics
.import -skip 1 ./database/title.ratings.tsv title_ratings
DELETE FROM title_basics WHERE titleType!='movie';
DELETE FROM title_basics WHERE startYear='\N' OR isAdult=1;
DELETE FROM title_basics WHERE startYear<1960;
DELETE FROM title_basics WHERE runtimeMinutes='\N' OR runtimeMinutes<60;
DELETE FROM title_ratings WHERE numVotes<5000 OR averageRating<6;
DELETE FROM title_basics WHERE tconst NOT IN (SELECT r.tconst FROM title_ratings r);
DELETE FROM title_ratings WHERE tconst NOT IN (SELECT b.tconst FROM title_basics b);
SELECT COUNT(*) FROM title_basics;
SELECT COUNT(*) FROM title_ratings;

SELECT * from title_basics LIMIT 10;
SELECT * FROM title_ratings LIMIT 10;
EOF