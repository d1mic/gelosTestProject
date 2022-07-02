sqlite3 db-books.sqlite  ".tables"
sqlite3 -separator ',' -header db-books.sqlite ".import -skip 1 ./database/books.csv books"
sqlite3 -header db-books.sqlite "select *  from books limit 10;"