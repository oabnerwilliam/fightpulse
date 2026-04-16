-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fighter_external_id_map" (
    "id" TEXT NOT NULL,
    "ball_dont_lie_id" INTEGER NOT NULL,
    "octagon_slug" TEXT NOT NULL,

    CONSTRAINT "fighter_external_id_map_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_authId_key" ON "user"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "fighter_external_id_map_ball_dont_lie_id_key" ON "fighter_external_id_map"("ball_dont_lie_id");

-- CreateIndex
CREATE UNIQUE INDEX "fighter_external_id_map_octagon_slug_key" ON "fighter_external_id_map"("octagon_slug");
