-- CreateTable
CREATE TABLE "Bookmark" (
    "expressionId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("expressionId","authorId")
);

-- CreateTable
CREATE TABLE "SemanticGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameDE" TEXT,
    "nameFR" TEXT,
    "nameIT" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "SemanticGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExpressionToSemanticGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ExpressionToSemanticGroup_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_expressionId_authorId_key" ON "Bookmark"("expressionId", "authorId");

-- CreateIndex
CREATE UNIQUE INDEX "SemanticGroup_name_key" ON "SemanticGroup"("name");

-- CreateIndex
CREATE INDEX "_ExpressionToSemanticGroup_B_index" ON "_ExpressionToSemanticGroup"("B");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_expressionId_fkey" FOREIGN KEY ("expressionId") REFERENCES "Expression"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpressionToSemanticGroup" ADD CONSTRAINT "_ExpressionToSemanticGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Expression"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpressionToSemanticGroup" ADD CONSTRAINT "_ExpressionToSemanticGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "SemanticGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
