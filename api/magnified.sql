--! RESET !--
DELETE FROM Users;
DELETE FROM Sightings;
DELETE FROM Cryptids;
DELETE FROM Locations;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Sightings;
DROP TABLE IF EXISTS Cryptids;
DROP TABLE IF EXISTS Locations;


--* TABLE CREATION *--
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `name` NVARCHAR(160) NOT NULL,
    `email` NVARCHAR(160) NOT NULL,
    `iconNumber` NUMERIC(5,2) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT 0
);
CREATE TABLE `Sightings` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `userId` INTEGER NOT NULL,
    `time` TIMESTAMP NOT NULL,
    `cryptidId` INTEGER NOT NULL,
    `locationId` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    FOREIGN KEY (`userId`) REFERENCES `Users`(`id`),
    FOREIGN KEY (`cryptidId`) REFERENCES `Cryptids`(`id`),
    FOREIGN KEY (`locationId`) REFERENCES `Locations`(`id`)
);
CREATE TABLE `Cryptids` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `name` NVARCHAR(160) NOT NULL,
    `description` TEXT NOT NULL,
    `image` NVARCHAR(255) NOT NULL,
    `status` NVARCHAR(50) NOT NULL,
    `userId` INTEGER NOT NULL,
    `time` TIMESTAMP NOT NULL,
    FOREIGN KEY (`userId`) REFERENCES `Users`(`id`)
);
CREATE TABLE `Locations` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `location` NVARCHAR(255) NOT NULL
);


--* TABLE POPULATION *--
INSERT INTO `Users`
    (`name`, `email`, `iconNumber`, `isAdmin`)
VALUES 
    ('Admina Strator', 'admina@strator.comx', 1, 1),
    ('Notan Admin', 'notan@admin.comx', 1, 0),
    ('Hewson Schulz', 'hewson@bruh.com', 6, 1),
    ('Emma Crum', 'emma@bruh.com', 5, 0),
    ('John Doe', 'john@example.com', 1, 0),
    ('Jane Smith', 'jane@example.com', 1, 0),
    ('Maxwell Johnson', 'max@example.com', 1, 0),
    ('Samantha White', 'samantha@example.com', 1, 0),
    ('Robert Brown', 'robert@example.com', 1, 0),
    ('Alicia Martinez', 'alicia@example.com', 1, 0),
    ('Marcus Lee', 'marcus@example.com', 1, 0);
INSERT INTO Cryptids
    (`name`, `description`, `image`, `status`, `userId`, `time`)
VALUES 
    ('Bigfoot', 'Pulvinar sapien et ligula ullamcorper malesuada proin libero. Enim nec dui nunc mattis enim. Amet nisl purus in mollis nunc sed id semper risus. Quam id leo in vitae turpis. Porttitor rhoncus dolor purus non enim praesent elementum facilisis. Urna condimentum mattis pellentesque id nibh tortor id. Sed risus pretium quam vulputate dignissim suspendisse in. Est velit egestas dui id ornare arcu odio. Est velit egestas dui id ornare arcu odio. Amet nisl purus in mollis nunc sed id semper risus. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Nulla pellentesque dignissim enim sit amet venenatis. Fermentum leo vel orci porta non pulvinar. Pellentesque diam volutpat commodo sed. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisis gravida neque convallis a cras. Justo donec enim diam vulputate ut pharetra. Nulla pellentesque dignissim enim sit amet venenatis. Neque viverra justo nec ultrices dui.', 'https://www.charlotteobserver.com/latest-news/56zrwt/picture230808569/alternates/LANDSCAPE_1140/bigfoot1.JPG', 'approved', 1, '2023-01-29T18:40:13'),
    ('Loch Ness Monster', 'Placerat orci nulla pellentesque dignissim enim. Elit pellentesque habitant morbi tristique senectus et netus et malesuada. Sed risus pretium quam vulputate dignissim suspendisse in. Vitae nunc sed velit dignissim sodales ut eu sem integer. Eu ultrices vitae auctor eu augue ut lectus. In dictum non consectetur a erat nam at. Amet nisl purus in mollis nunc sed id semper risus. Gravida in fermentum et sollicitudin ac orci phasellus egestas. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam. Quis eleifend quam adipiscing vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://nypost.com/wp-content/uploads/sites/2/2020/02/loch-ness-monster-01.jpg?quality=90&strip=all&w=1756', 'approved', 1, '2023-04-11T20:23:48'),
    ('Chupacabra', 'Placerat orci nulla pellentesque dignissim enim. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Urna condimentum mattis pellentesque id nibh tortor id. Ut etiam sit amet nisl purus in mollis nunc sed. Amet nisl purus in mollis nunc sed id semper risus. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Pellentesque diam volutpat commodo sed. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Placerat orci nulla pellentesque dignissim enim. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Elit pellentesque habitant morbi tristique senectus et netus et malesuada.', 'https://www.science-rumors.com/wp-content/uploads/2016/10/San-Antonio-Chupacabra-Sighting.jpg', 'approved', 1, '2023-03-07T23:57:51'),
    ('Mothman', 'Quis eleifend quam adipiscing vitae. Mi sit amet mauris commodo quis imperdiet massa tincidunt nunc. Elit pellentesque habitant morbi tristique senectus et netus et malesuada. Vehicula ipsum a arcu cursus vitae. Enim nec dui nunc mattis enim. Ut sem nulla pharetra diam sit. Elit pellentesque habitant morbi tristique senectus et netus et malesuada. Orci ac auctor augue mauris augue neque gravida. Facilisis gravida neque convallis a cras. Neque viverra justo nec ultrices dui. Ut etiam sit amet nisl purus in mollis nunc sed. Ut sem nulla pharetra diam sit. Mi sit amet mauris commodo quis imperdiet massa tincidunt nunc. Enim nec dui nunc mattis enim. Morbi tincidunt augue interdum velit. Urna condimentum mattis pellentesque id nibh tortor id.', 'https://www.science-rumors.com/wp-content/uploads/2016/10/mothman-sighting.jpg', 'approved', 1, '2023-10-30T09:58:37'),
    ('Jersey Devil', 'Sit amet risus nullam eget felis. Est velit egestas dui id ornare arcu odio. Donec adipiscing tristique risus nec feugiat in. Justo donec enim diam vulputate ut pharetra. Elementum nibh tellus molestie nunc non blandit massa enim. Urna condimentum mattis pellentesque id nibh tortor id. Pulvinar sapien et ligula ullamcorper malesuada proin libero. Ut etiam sit amet nisl purus in mollis nunc sed. Enim nec dui nunc mattis enim. Ut sem nulla pharetra diam sit amet nisl suscipit adipiscing.', 'https://www.science-rumors.com/wp-content/uploads/2016/10/jersey-devil-sighting.jpg', 'approved', 1, '2023-11-20T17:24:45'),
    ('Yeti', 'Faucibus purus in massa tempor nec feugiat nisl pretium. Eget nunc scelerisque viverra mauris in aliquam sem. Urna molestie at elementum eu facilisis. Amet nisl purus in mollis nunc sed id semper risus. Enim nec dui nunc mattis enim. Vitae purus faucibus ornare suspendisse sed nisi lacus sed. Ut etiam sit amet nisl purus in mollis nunc sed. Velit ut tortor pretium viverra suspendisse potenti nullam ac. Suspendisse ultrices gravida dictum fusce ut placerat orci. Etiam tempor orci eu lobortis elementum nibh tellus. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Egestas congue quisque egestas diam in. Pharetra convallis posuere morbi leo urna molestie at elementum eu. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit. Tellus cras adipiscing enim eu turpis egestas pretium aenean pharetra. Elementum sagittis vitae et leo duis ut diam quam nulla. Diam in arcu cursus euismod quis viverra nibh cras pulvinar.', 'https://www.science-rumors.com/wp-content/uploads/2016/10/Yeti-sightings.jpg', 'approved', 1, '2023-05-15T14:30:29'),
    ('Wampus Cat', 'Vitae nunc sed velit dignissim sodales ut eu sem integer. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Morbi tincidunt augue interdum velit. Quis eleifend quam adipiscing vitae. Morbi tincidunt augue interdum velit. Neque viverra justo nec ultrices dui. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Porttitor rhoncus dolor purus non enim praesent elementum facilisis. Gravida in fermentum et sollicitudin ac orci phasellus egestas. Placerat orci nulla pellentesque dignissim enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisis gravida neque convallis a cras. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Elit pellentesque habitant morbi tristique senectus et netus et malesuada. Tincidunt arcu non sodales neque sodales. Ut porttitor leo a diam sollicitudin tempor id eu..', 'https://africageographic.com/wp-content/uploads/2016/02/african-wild-cat-in-tree.jpg', 'approved', 4, '2023-03-09T20:20:27'),
    ('Awesomeface', 'Morbi tincidunt augue interdum velit. Malesuada fames ac turpis egestas sed tempus. Quis eleifend quam adipiscing vitae. Pulvinar sapien et ligula ullamcorper malesuada proin libero. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Nulla pellentesque dignissim enim sit amet venenatis. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam. Donec adipiscing tristique risus nec feugiat in. Elit pellentesque habitant morbi tristique senectus et netus et malesuada. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Nulla pellentesque dignissim enim sit amet venenatis. Elit pellentesque habitant morbi tristique senectus et netus et malesuada.', 'https://www.pixelstalk.net/wp-content/uploads/2016/06/Awsome-Face-Wallpaper.jpg', 'denied', 4, '2023-09-01T08:25:40'),
    ('Dover Demon', 'Sit amet risus nullam eget felis. Est velit egestas dui id ornare arcu odio. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam. Pulvinar sapien et ligula ullamcorper malesuada proin libero. Urna condimentum mattis pellentesque id nibh tortor id. Mi sit amet mauris commodo quis imperdiet massa tincidunt nunc. Tincidunt arcu non sodales neque sodales. Mi sit amet mauris commodo quis imperdiet massa tincidunt nunc. Sit amet risus nullam eget felis. Malesuada fames ac turpis egestas sed tempus.', 'https://thoughtcatalog.com/wp-content/uploads/2018/07/doverdemon.jpg?w=1920&h=1280&crop=1&resize=1920,1280&quality=95&strip=all', 'approved', 1, '2023-01-24T19:44:47'),
    ('Flatwoods Monster', 'Amet nisl purus in mollis nunc sed id semper risus. Ut etiam sit amet nisl purus in mollis nunc sed. Ut sem nulla pharetra diam sit. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam. Donec adipiscing tristique risus nec feugiat in. Quam id leo in vitae turpis. Tincidunt arcu non sodales neque sodales. Neque viverra justo nec ultrices dui. Facilisis gravida neque convallis a cras. Eget aliquet nibh praesent tristique magna sit amet. Tellus orci ac auctor augue mauris augue neque gravida. Neque egestas congue quisque egestas diam in arcu. Amet facilisis magna etiam tempor orci eu lobortis elementum. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Magna fermentum iaculis eu non diam phasellus. Diam ut venenatis tellus in metus vulputate eu scelerisque. Enim diam vulputate ut pharetra sit amet aliquam id.', 'https://thoughtcatalog.com/wp-content/uploads/2018/07/flatwoodsmonster.jpg?w=1920&h=1280&crop=1&resize=1920,1280&quality=95&strip=all', 'approved', 1, '2023-09-01T08:25:40'),
    ('Death Worm', 'Fermentum leo vel orci porta non pulvinar. Neque viverra justo nec ultrices dui. Adipiscing commodo elit at imperdiet dui. Enim nec dui nunc mattis enim. Est velit egestas dui id ornare arcu odio. Elit pellentesque habitant morbi tristique senectus et netus et malesuada. Adipiscing commodo elit at imperdiet dui. Placerat orci nulla pellentesque dignissim enim. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Vehicula ipsum a arcu cursus vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor rhoncus dolor purus non enim praesent elementum facilisis. Enim nec dui nunc mattis enim. Ut porttitor leo a diam sollicitudin tempor id eu..', 'https://tripfreakz.com/galleries/olgoi-khorkhoi-red-mongolian-deathworm/ok01.jpg', 'approved', 1, '2023-11-01T11:30:24'),
    ('Thunderbird', 'Est velit egestas dui id ornare arcu odio. Mi sit amet mauris commodo quis imperdiet massa tincidunt nunc. Id diam vel quam elementum. Est velit egestas dui id ornare arcu odio. Gravida in fermentum et sollicitudin ac orci phasellus egestas. Urna condimentum mattis pellentesque id nibh tortor id. Sed risus pretium quam vulputate dignissim suspendisse in. Id diam vel quam elementum. Vehicula ipsum a arcu cursus vitae. Est velit egestas dui id ornare arcu odio. Orci ac auctor augue mauris augue neque gravida. Placerat orci nulla pellentesque dignissim enim. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Malesuada fames ac turpis egestas sed tempus.', 'https://wildbirdworld.com/wp-content/uploads/2022/03/Hawks-of-Texas.jpeg', 'approved', 1, '2023-04-10T16:30:10'),
    ('Wendigo', 'Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam. Fames ac turpis egestas sed tempus urna et pharetra pharetra. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Eu ultrices vitae auctor eu augue ut lectus. Enim nec dui nunc mattis enim. Ut sem nulla pharetra diam sit. Orci ac auctor augue mauris augue neque gravida. Pulvinar sapien et ligula ullamcorper malesuada proin libero. Est velit egestas dui id ornare arcu odio. Sit amet risus nullam eget felis. Est velit egestas dui id ornare arcu odio. Enim nec dui nunc mattis enim. Quis eleifend quam adipiscing vitae. Quis eleifend quam adipiscing vitae. Elementum nibh tellus molestie nunc non blandit massa enim. At urna condimentum mattis pellentesque id nibh tortor.', 'https://wallpaperaccess.com/full/6116106.jpg', 'approved', 1, '2023-11-04T13:27:03'),
    ('Drop Bear', 'Mi sit amet mauris commodo quis imperdiet massa tincidunt nunc. Pulvinar sapien et ligula ullamcorper malesuada proin libero. Pulvinar sapien et ligula ullamcorper malesuada proin libero. Id diam vel quam elementum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Eu ultrices vitae auctor eu augue ut lectus. Justo donec enim diam vulputate ut pharetra. Enim nec dui nunc mattis enim. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Fermentum leo vel orci porta non pulvinar. Quis eleifend quam adipiscing vitae. Sed risus pretium quam vulputate dignissim suspendisse in. Elementum nibh tellus molestie nunc non blandit massa enim. Vehicula ipsum a arcu cursus vitae. Vitae nunc sed velit dignissim sodales ut eu sem integer. Enim nec dui nunc mattis enim. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Neque viverra justo nec ultrices dui. In dictum non consectetur a erat nam at. Placerat orci nulla pellentesque dignissim enim.', 'https://www.metro.us/wp-content/uploads/2020/03/crazy-koala_1.jpg', 'approved', 1, '2023-02-25T00:37:09'),
    ('Hodag', 'Orci ac auctor augue mauris augue neque gravida. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Eu ultrices vitae auctor eu augue ut lectus. Morbi tincidunt augue interdum velit. Fames ac turpis egestas sed tempus urna et pharetra pharetra. Elementum nibh tellus molestie nunc non blandit massa enim. Urna condimentum mattis pellentesque id nibh tortor id. Sit amet risus nullam eget felis. Ut sem nulla pharetra diam sit. Quam id leo in vitae turpis. Ut porttitor leo a diam sollicitudin tempor id eu.. Malesuada fames ac turpis egestas sed tempus. Vitae nunc sed velit dignissim sodales ut eu sem integer.', 'http://www.popfi.com/wp-content/uploads/hodag.jpg', 'approved', 1, '2023-02-08T22:10:23'),
    ('Kelpie', 'Urna condimentum mattis pellentesque id nibh tortor id. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam. Malesuada fames ac turpis egestas sed tempus. Gravida in fermentum et sollicitudin ac orci phasellus egestas. Ut porttitor leo a diam sollicitudin tempor id eu.. Neque viverra justo nec ultrices dui. Nulla pellentesque dignissim enim sit amet venenatis. Quis eleifend quam adipiscing vitae. Elementum integer enim neque volutpat ac tincidunt vitae semper. Sit amet risus nullam eget felis. Quis eleifend quam adipiscing vitae. Elementum nibh tellus molestie nunc non blandit massa enim. Ut etiam sit amet nisl purus in mollis nunc sed. Pellentesque diam volutpat commodo sed.', 'https://data.1freewallpapers.com/detail/dirty-horse-on-the-field.jpg', 'approved', 1, '2023-06-12T09:32:32');
INSERT INTO `Locations`
    (`location`)
VALUES 
    ('Nashville, TN'),
    ('Memphis, TN'),
    ('Knoxville, TN'),
    ('Chattanooga, TN'),
    ('Clarksville, TN'),
    ('Murfreesboro, TN'),
    ('Franklin, TN'),
    ('Johnson City, TN'),
    ('Jackson, TN'),
    ('Huntsville, AL'),
    ('Bowling Green, KY'),
    ('Asheville, NC'),
    ('Gallatin, TN'),
    ('Oak Ridge, TN'),
    ('Lebanon, TN'),
    ('Columbia, TN'),
    ('Cookeville, TN'),
    ('Sevierville, TN'),
    ('Gatlinburg, TN'),
    ('Pigeon Forge, TN'),
    ('Bristol, TN'),
    ('Morristown, TN'),
    ('Athens, TN'),
    ('Smyrna, TN'),
    ('Springfield, TN'),
    ('Dickson, TN'),
    ('Tullahoma, TN'),
    ('Lawrenceburg, TN'),
    ('Winchester, TN'),
    ('McMinnville, TN');

--* DISPLAY ALL *--
SELECT * FROM Users;
SELECT * FROM Sightings;
SELECT * FROM Cryptids;
SELECT * FROM Locations;
