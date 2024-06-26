-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "chat_id" INTEGER NOT NULL,
    "right" INTEGER NOT NULL DEFAULT 0,
    "wrong" INTEGER NOT NULL DEFAULT 0,
    "first_name" TEXT,
    "username" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "luck" INTEGER NOT NULL DEFAULT 0,
    "referals" INTEGER NOT NULL DEFAULT 0,
    "refered" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserReward" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "small_box" INTEGER NOT NULL DEFAULT 0,
    "midle_box" INTEGER NOT NULL DEFAULT 0,
    "large_box" INTEGER NOT NULL DEFAULT 0,
    "bronze_amulet" BOOLEAN NOT NULL DEFAULT false,
    "silver_amulet" BOOLEAN NOT NULL DEFAULT false,
    "gold_amulet" BOOLEAN NOT NULL DEFAULT false,
    "diamond_amulet" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserReward_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_chat_id_key" ON "users"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserReward_userId_key" ON "UserReward"("userId");

-- AddForeignKey
ALTER TABLE "UserReward" ADD CONSTRAINT "UserReward_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
