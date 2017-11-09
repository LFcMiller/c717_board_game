-- this sql code will create a database as if it was in use
-- Clark Kent is the host of the game
-- He has invited Diana and Bruce, but only Diana has accepted the invitation
-- Lex Luther has applied, but has been ignored by Clark


--              ,,########################################,,
--           .*##############################################*
--         ,*####*:::*########***::::::::**######:::*###########,
--       .*####:    *#####*.                 :*###,.#######*,####*.
--      *####:    *#####*                      .###########*  ,####*
--   .*####:    ,#######,                        ##########*    :####*
--   *####.    :#########*,                       ,,,,,,,,.      ,####:
--     ####*  ,##############****************:,,               .####*
--      :####*#####################################**,        *####.
--        *############################################*,   :####:
--         .#############################################*,####*
--           :#####:*****#####################################.
--             *####:                  .,,,:*****###########,
--              .*####,                            *######*
--                .####* :*#######*               ,#####*
--                  *###############*,,,,,,,,::**######,
--                    *##############################:
--                      *####*****##########**#####*
--                       .####*.            :####*
--                         :####*         .#####,
--                           *####:      *####:
--                            .*####,  *####*
--                              :####*####*
--                                *######,
--                                  *##,


-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 13, 2017 at 11:00 PM
-- Server version: 5.6.34-log
-- PHP Version: 7.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bgb_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_ID` int(6) UNSIGNED NOT NULL,
  `game_name` varchar(30) DEFAULT NULL,
  `general_details` varchar(1000) DEFAULT NULL,
  `street_address` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `zip` varchar(5) DEFAULT NULL,
  `lat` float(10,6) DEFAULT NULL,
  `lon` float(10,6) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_ID`, `game_name`, `general_details`, `street_address`, `city`, `state`, `zip`, `lat`, `lon`, `date`, `time`) VALUES
(1, 'Settlers of Catan', 'Friendly game of Catan between superfriends!', '9200 Irvine Center Dr.', 'Irvine', 'CA', '92618', 33.634857, -117.740463, '2017-09-13', '19:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_ID` int(6) UNSIGNED NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_ID`, `first_name`, `last_name`, `email`) VALUES
(1, 'Clark', 'Kent', 'clarkkent@dailyplanet.com'),
(2, 'Bruce', 'Wayne', 'bruce@wayneenterprises.com'),
(3, 'Diana', 'Prince', 'd.prince@idontevenknow.com'),
(4, 'Lex', 'Luther', 'lex@lexcorp.com');

-- --------------------------------------------------------

--
-- Table structure for table `users_to_events`
--

CREATE TABLE `users_to_events` (
  `u_2_e_ID` int(6) UNSIGNED NOT NULL,
  `event_ID` int(6) UNSIGNED DEFAULT NULL,
  `player_ID` int(6) UNSIGNED DEFAULT NULL,
  `role` enum('host','guest','invitee','applicant') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_to_events`
--

INSERT INTO `users_to_events` (`u_2_e_ID`, `event_ID`, `player_ID`, `role`) VALUES
(1, 1, 1, 'host'),
(2, 1, 3, 'guest'),
(3, 1, 2, 'invitee'),
(4, 1, 4, 'applicant');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_ID`);

--
-- Indexes for table `users_to_events`
--
ALTER TABLE `users_to_events`
  ADD PRIMARY KEY (`u_2_e_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_ID` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_ID` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `users_to_events`
--
ALTER TABLE `users_to_events`
  MODIFY `u_2_e_ID` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
