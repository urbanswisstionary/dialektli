-- CreateTable
CREATE TABLE "Synonym" (
    "synonymOfId" TEXT NOT NULL,
    "synonymId" TEXT NOT NULL,

    CONSTRAINT "Synonym_pkey" PRIMARY KEY ("synonymId","synonymOfId")
);

-- AddForeignKey
ALTER TABLE "Synonym" ADD CONSTRAINT "Synonym_synonymOfId_fkey" FOREIGN KEY ("synonymOfId") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Synonym" ADD CONSTRAINT "Synonym_synonymId_fkey" FOREIGN KEY ("synonymId") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;
