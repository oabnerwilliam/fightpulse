-- CreateTable
CREATE TABLE "Fighter_External_Id_Map" (
    "id" TEXT NOT NULL,
    "ball_dont_lie_id" INTEGER NOT NULL,
    "api_sports_id" INTEGER NOT NULL,

    CONSTRAINT "Fighter_External_Id_Map_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fighter_External_Id_Map_ball_dont_lie_id_key" ON "Fighter_External_Id_Map"("ball_dont_lie_id");

-- CreateIndex
CREATE UNIQUE INDEX "Fighter_External_Id_Map_api_sports_id_key" ON "Fighter_External_Id_Map"("api_sports_id");
