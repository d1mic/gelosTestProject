sqlite3 db-books.sqlite << EOF
.tables
.mode ascii
.separator "," "\n"
.import -skip 1 ./database/books.csv books
SELECT COUNT(*) FROM books;
SELECT * from books LIMIT 10;
EOF