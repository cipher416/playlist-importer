-- CreateEnum
CREATE TYPE "StreamingService" AS ENUM ('SPOTIFY', 'TIDAL');

-- CreateTable
CREATE TABLE "UserStreamingServiceAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "accountPassword" TEXT NOT NULL,
    "streamingService" "StreamingService" NOT NULL,

    CONSTRAINT "UserStreamingServiceAccount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserStreamingServiceAccount" ADD CONSTRAINT "UserStreamingServiceAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
