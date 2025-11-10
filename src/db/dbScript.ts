// INSERT INTO `p3pro`.`user` (`id`, `userName`, `userSurname`, `userUuid`, `usermail`, `userMobile`, `color`, `userPasswordEnc`, `otp`) VALUES ('1', 'urid', 'urid', 'urid', 'urid', 'urid', 'urid', 'urid', '1');

// INSERT INTO `p3pro`.`company` (`name`, `description`, `Ssn`, `isActive`) VALUES ('Usa', 'usa', '1232', '1');
// INSERT INTO `p3pro`.`company` (`name`, `description`, `Ssn`, `isActive`) VALUES ('europe', 'europe', '321', '1');
// INSERT INTO `p3pro`.`role` (`role`, `roleDisplayName`, `color`) VALUES ('Picker', 'Picker', 'Picker');
// INSERT INTO `p3pro`.`role` (`role`, `roleDisplayName`, `color`) VALUES ('Packer', 'Packer', 'Packer');
// INSERT INTO `p3pro`.`users_roles` (`usersId`, `roleId`) VALUES ('1', '1');
// INSERT INTO `p3pro`.`users_roles` (`usersId`, `roleId`) VALUES ('1', '2');


// INSERT INTO `p3pro`.`user_company` (`usersId`, `companyId`) VALUES ('1', '1');
// INSERT INTO `p3pro`.`user_company` (`usersId`, `companyId`) VALUES ('1', '2');

// INSERT INTO `p3pro`.`role` (`role`, `roleDisplayName`, `color`) VALUES ('Qa', 'Qa', 'pink');
// INSERT INTO `p3pro`.`role` (`role`, `roleDisplayName`, `color`) VALUES ('Shipper', 'Shipper', 'Shipper');
// INSERT INTO `p3pro`.`role` (`role`, `roleDisplayName`, `color`) VALUES ('Administrator', 'Administrator', 'Administrator');
// INSERT INTO `p3pro`.`role` (`role`, `roleDisplayName`, `color`) VALUES ('SysAdmin', 'SysAdmin', 'SysAdmin');

// INSERT INTO `p3pro`.`task_type` (`role`) VALUES ('Assembly');
// INSERT INTO `p3pro`.`task_type` (`role`) VALUES ('Inventory count');
// INSERT INTO `p3pro`.`task_type` (`role`) VALUES ('Good received');
// INSERT INTO `p3pro`.`task_type` (`role`) VALUES ('Warehouse changes');
// INSERT INTO `p3pro`.`task_type` (`role`) VALUES ('Assembly Order');
// INSERT INTO `p3pro`.`task_type` (`role`) VALUES ('Inventory count - Poland');
// INSERT INTO `p3pro`.`task_type` (`role`) VALUES ('Inventory count - US');
// INSERT INTO `p3pro`.`task_type` (`role`) VALUES ('Picking');
// INSERT INTO `p3pro`.`task_type` (`role`) VALUES ('RMA');


// INSERT INTO `p3pro`.`task_status` (`status`, `color`) VALUES ('New', 'yellow    ');
// INSERT INTO `p3pro`.`task_status` (`status`, `color`) VALUES ('In Progress', 'yellow    ');
// INSERT INTO `p3pro`.`task_status` (`status`, `color`) VALUES ('Complete', 'yellow    ');
// INSERT INTO `p3pro`.`task_status` (`status`, `color`) VALUES ('Pending', 'yellow    ');
// INSERT INTO `p3pro`.`task_status` (`status`, `color`) VALUES ('Assistant Pending', 'yellow    ');
// INSERT INTO `p3pro`.`task_status` (`status`, `color`) VALUES ('Assistant Complete', 'yellow    ');
// INSERT INTO `p3pro`.`task_status` (`status`, `color`) VALUES ('Review', 'yellow    ');

// UPDATE `p3pro`.`task_status` SET `id` = '6' WHERE (`id` = '4');
// UPDATE `p3pro`.`task_status` SET `id` = '5' WHERE (`id` = '3');

