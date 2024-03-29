-- CreateTable
CREATE TABLE "Author" (
    "authorId" VARCHAR(80) NOT NULL,
    "authorName" VARCHAR(50) NOT NULL,
    "authorLastName" VARCHAR(50) NOT NULL,
    "authorStatus" VARCHAR(10) NOT NULL,

    CONSTRAINT "pk_author" PRIMARY KEY ("authorId")
);

-- CreateTable
CREATE TABLE "Book" (
    "bookId" VARCHAR(80) NOT NULL,
    "bookTitle" VARCHAR(50) NOT NULL,
    "coverUrl" VARCHAR(100),
    "bookStatus" VARCHAR(10) NOT NULL,

    CONSTRAINT "pk_book" PRIMARY KEY ("bookId")
);

-- CreateTable
CREATE TABLE "Book_author" (
    "bookId" VARCHAR(80) NOT NULL,
    "authorId" VARCHAR(80) NOT NULL,
    "bookAuthorStatus" VARCHAR(10) NOT NULL,

    CONSTRAINT "pk_book_author" PRIMARY KEY ("bookId","authorId")
);

-- CreateTable
CREATE TABLE "Collections" (
    "collectionId" VARCHAR(80) NOT NULL,
    "collectionName" VARCHAR(50) NOT NULL,
    "coverUrl" VARCHAR(100),
    "userId" VARCHAR(15),
    "collectionStatus" VARCHAR(10) NOT NULL,

    CONSTRAINT "pk_collections" PRIMARY KEY ("collectionId")
);

-- CreateTable
CREATE TABLE "Collections_book" (
    "bookId" VARCHAR(80) NOT NULL,
    "collectionId" VARCHAR(80) NOT NULL,
    "collectionsBookStatus" VARCHAR(10) NOT NULL,

    CONSTRAINT "pk_collections_book" PRIMARY KEY ("bookId","collectionId")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" VARCHAR(15) NOT NULL,
    "userName" VARCHAR(40) NOT NULL,
    "userLastName" VARCHAR(40) NOT NULL,
    "userStatus" VARCHAR(10) NOT NULL,
    "password" VARCHAR(255) NOT NULL DEFAULT '123',

    CONSTRAINT "pk_users" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "author_unique_key" ON "Author"("authorName", "authorLastName");

-- CreateIndex
CREATE UNIQUE INDEX "unique_name_books" ON "Book"("bookTitle");

-- CreateIndex
CREATE UNIQUE INDEX "unique_name_collections" ON "Collections"("collectionName");

-- AddForeignKey
ALTER TABLE "Book_author" ADD CONSTRAINT "book_author_authorid_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("authorId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Book_author" ADD CONSTRAINT "book_author_bookid_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Collections" ADD CONSTRAINT "collections_userid_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Collections_book" ADD CONSTRAINT "collections_book_bookid_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Collections_book" ADD CONSTRAINT "collections_book_collectionid_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collections"("collectionId") ON DELETE NO ACTION ON UPDATE NO ACTION;

