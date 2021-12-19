-- CreateTable
CREATE TABLE `products` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `code_bar` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
