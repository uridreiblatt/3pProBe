// INSERT INTO `p3pro`.`user` (`id`, `userName`, `userSurname`, `userUuid`, `usermail`, `userMobile`, `color`, `userPasswordEnc`, `otp`) VALUES ('aaa-bbb-ccc', 'unAssigned', 'unAssigned', uuid(), 'unAssigned@gmail.com', '0528012899', 'red', 'dfasdfdasf-dsaf-sdafdsa-fads', '1');
// INSERT INTO `p3pro`.`user` (`id`, `userName`, `userSurname`, `userUuid`, `usermail`, `userMobile`, `color`, `userPasswordEnc`, `otp`) VALUES ('bbb-ccc-ddd', 'urid', 'dreiblatt', uuid(), 'urid@gmail.com', '0528012899', 'red', 'aaaaaa', '');
// INSERT INTO `p3pro`.`user` (`id`, `userName`, `userSurname`, `userUuid`, `usermail`, `userMobile`, `color`, `userPasswordEnc`, `otp`) VALUES ('ccc-ddd-eee', 'Gaya', 'dreiblatt', uuid(), 'gaya@gmail.com', '+972525123', 'red', 'aaaaaa', '');
// INSERT INTO `p3pro`.`user` (`id`, `userName`, `userSurname`, `userUuid`, `usermail`, `userMobile`, `color`, `userPasswordEnc`, `otp`) VALUES ('ddd-eee-ccc', 'Ella', 'dreiblatt', uuid(), 'ella@gmail.com', '+972525124', 'red', 'aaaaaa', '');
// DELIMITER //

// CREATE TRIGGER `user_before_insert`
// BEFORE INSERT ON `p3pro`.`user`
// FOR EACH ROW
// BEGIN
//   IF NEW.`id` IS NULL OR NEW.`id` = '' THEN
//     SET NEW.`id` = UUID();
//   END IF;
// END//
// DELIMITER ;
// INSERT INTO `p3pro`.`company` (`id`, `name`, `description`, `Ssn`) VALUES ('aaa-aaa-aaa', 'Usa', 'Usa', 'Usa');
// INSERT INTO `p3pro`.`company` (`id`, `name`, `description`, `Ssn`) VALUES ('bbb-bbb-bbb', 'europe', 'europe', 'europe');

// DELIMITER //

// CREATE TRIGGER `company_before_insert`
// BEFORE INSERT ON `p3pro`.`company`
// FOR EACH ROW
// BEGIN
//   IF NEW.`id` IS NULL OR NEW.`id` = '' THEN
//     SET NEW.`id` = UUID();
//   END IF;
// END//
// DELIMITER ;



// INSERT INTO `p3pro`.`role` (`id`,`role`, `roleDisplayName`, `color`) VALUES ('1','Picker', 'Picker', 'Picker');
// INSERT INTO `p3pro`.`role` (`id`,`role`, `roleDisplayName`, `color`) VALUES ('2','Packer', 'Packer', 'Packer');
// INSERT INTO `p3pro`.`role` (`id`,`role`, `roleDisplayName`, `color`) VALUES ('3','Qa', 'Qa', 'pink');
// INSERT INTO `p3pro`.`role` (`id`,`role`, `roleDisplayName`, `color`) VALUES ('4','Shipper', 'Shipper', 'Shipper');
// INSERT INTO `p3pro`.`role` (`id`,`role`, `roleDisplayName`, `color`) VALUES ('5','BackOffice', 'BackOffice', 'BackOffice');
// INSERT INTO `p3pro`.`role` (`id`,`role`, `roleDisplayName`, `color`) VALUES ('6','Administrator', 'Administrator', 'Administrator');
// INSERT INTO `p3pro`.`role` (`id`,`role`, `roleDisplayName`, `color`) VALUES ('7','SysAdmin', 'SysAdmin', 'SysAdmin');


// DELIMITER //

// CREATE TRIGGER `users_roles_before_insert`
// BEFORE INSERT ON `p3pro`.`users_roles`
// FOR EACH ROW
// BEGIN
//   IF NEW.`id` IS NULL OR NEW.`id` = '' THEN
//     SET NEW.`id` = UUID();
//   END IF;
// END//
// DELIMITER ;
// INSERT INTO `p3pro`.`users_roles` (`usersId`, `roleId`) VALUES ('bbb-ccc-ddd', '1');
// INSERT INTO `p3pro`.`users_roles` (`usersId`, `roleId`) VALUES ('bbb-ccc-ddd', '2');
// INSERT INTO `p3pro`.`users_roles` (`usersId`, `roleId`) VALUES ('bbb-ccc-ddd', '7');




// INSERT INTO `p3pro`.`task_type` (`role`) VALUES ('Assembly');
// INSERT INTO `p3pro`.`task_type` (`role`) VALUES ('Inventory count');
// INSERT INTO `p3pro`.`task_type` (`role`) VALUES ('Good received');
// INSERT INTO `p3pro`.`task_type` (`role`) VALUES ('Warehouse changes');
// INSERT INTO `p3pro`.`task_type` (`role`) VALUES ('Assembly Order');
// INSERT INTO `p3pro`.`task_type` (`role`) VALUES ('Inventory count - Poland');
// INSERT INTO `p3pro`.`task_type` (`role`) VALUES ('Inventory count - US');
// INSERT INTO `p3pro`.`task_type` (`role`) VALUES ('Picking');
// INSERT INTO `p3pro`.`task_type` (`role`) VALUES ('RMA');


// INSERT INTO `p3pro`.`task_status` (`status`, `color`) VALUES ('New', 'yellow');
// INSERT INTO `p3pro`.`task_status` (`status`, `color`) VALUES ('In Progress', 'yellow    ');
// INSERT INTO `p3pro`.`task_status` (`status`, `color`) VALUES ('Complete', 'yellow');
// INSERT INTO `p3pro`.`task_status` (`status`, `color`) VALUES ('Pending', 'yellow');
// INSERT INTO `p3pro`.`task_status` (`status`, `color`) VALUES ('Assistant Pending', 'yellow');
// INSERT INTO `p3pro`.`task_status` (`status`, `color`) VALUES ('Assistant Complete', 'yellow');
// INSERT INTO `p3pro`.`task_status` (`status`, `color`) VALUES ('Review', 'yellow');

// DELIMITER //

// CREATE TRIGGER `user_company_before_insert`
// BEFORE INSERT ON `p3pro`.`user_company`
// FOR EACH ROW
// BEGIN
//   IF NEW.`id` IS NULL OR NEW.`id` = '' THEN
//     SET NEW.`id` = UUID();
//   END IF;
// END//
// DELIMITER ;

// INSERT INTO `p3pro`.`user_company` (`usersId`, `companyId`) VALUES ('bbb-ccc-ddd', 'aaa-aaa-aaa');
// INSERT INTO `p3pro`.`user_company` (`usersId`, `companyId`) VALUES ('bbb-ccc-ddd', 'bbb-bbb-bbb');







// -- drop any old trigger with the same name
// DROP TRIGGER IF EXISTS `p3pro`.`task_user_before_insert`;

// DELIMITER //

// CREATE TRIGGER `task_user_before_insert`
// BEFORE INSERT ON `p3pro`.`task_inventory_count`
// FOR EACH ROW
// BEGIN
//   IF NEW.`id` IS NULL OR NEW.`id` = '' THEN
//     SET NEW.`id` = UUID();
//   END IF;
// END//
// DELIMITER ;

// DELIMITER //



