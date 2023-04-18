-- CreateTable
CREATE TABLE "CommentLikeJoin" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "commentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommentLikeJoin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecommentLikeJoin" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "recommentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecommentLikeJoin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommentLikeJoin_userId_commentId_key" ON "CommentLikeJoin"("userId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "RecommentLikeJoin_userId_recommentId_key" ON "RecommentLikeJoin"("userId", "recommentId");

-- AddForeignKey
ALTER TABLE "CommentLikeJoin" ADD CONSTRAINT "CommentLikeJoin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentLikeJoin" ADD CONSTRAINT "CommentLikeJoin_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommentLikeJoin" ADD CONSTRAINT "RecommentLikeJoin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommentLikeJoin" ADD CONSTRAINT "RecommentLikeJoin_recommentId_fkey" FOREIGN KEY ("recommentId") REFERENCES "Recomment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
