-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 21, 2017 at 01:26 AM
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
(1, 'Settlers of Catan', 'Friendly game of Catan between superfriends!', '9200 Irvine Center Dr.', 'Irvine', 'CA', '92618', 33.634857, -117.740463, '2017-09-13', '19:00:00'),
(4, 'Some Game', 'Some details', 'some place', 'some city', 'CA', '92618', 1234.000000, 789.000000, '2017-09-16', '14:00:00'),
(5, 'Monopoly', 'blah blah blah', 'some place', 'Somethingtown', 'CA', '92618', NULL, NULL, '2017-09-03', NULL),
(16, 'Catan or something', 'blah blah blah', 'some place', 'Somethingtown', 'CA', '92618', 123.123451, 456.123474, '2017-09-20', '17:30:00'),
(21, 'Monopoly', 'experienced players preferred, college students preferred, parking available, food provided', '5500 Irvine Center Dr.', 'Irvine', 'CA', '92618', 33.675823, -117.778008, '2017-10-28', '17:00:00'),
(34, 'Cards Against Humanity', 'BBQ before party, BYOB, parking available, pets present, adults only, no previous experience necessary', '2005 Los Trancos Dr.', 'Irvine', 'CA', '92617', 33.641953, -117.840736, '2017-12-01', '17:00:00'),
(35, 'Scrabble', 'BYOB, no food provided, 21 years old and up, parking unavailable', '50 Eastshore', 'Irvine', 'CA', '92604', 33.675217, -117.784981, '2017-11-13', '18:30:00'),
(36, 'Scrabble, Apples to Apples, Pi', 'Private event, Staff and RSVP only, food provided, no alcohol, guest and staff parking, all age groups, any level of experience', 'Irvine Research Center', 'Irvine', 'CA', '92618', 33.642334, -117.739639, '2017-11-15', '18:30:00'),
(37, 'Charades', 'Staff and family members only, food provided, wine provided, guest parking', 'Irvine Medical and Science Complex', 'Irvine', 'CA', '92618', 33.658195, -117.767151, '2017-12-12', '19:00:00'),
(38, 'Yahtzee', 'No food or drinks, water ok, all age groups, previous experience preferred', '101 Technology Dr.', 'Irvine', 'CA', '92618', 33.650562, -117.746155, '2017-10-10', '12:00:00'),
(39, 'Clue', 'No alcohol, all age groups, parking available, pets in the house, no previous experience required', '1 Holland', 'Irvine', 'CA', '92618', 33.646561, -117.726524, '2017-09-22', '15:00:00'),
(40, 'Monopoly', 'BBQ before the game, all age groups, BYOB, parking available, carpool available, no previous experience required', 'Pizza 900, 23020 Lake Forest Dr. #170', 'Laguna Hills', 'CA', '92653', 33.628361, -117.725220, '2017-10-07', '17:00:00'),
(41, 'Ouija', 'Will have alcohol, BYOB, no food, pets in the house, no parking available', 'Snow Heaven, 22367 El Toro Rd.', 'Lake Forest', 'CA', '92630', 33.638779, -117.680748, '2017-11-15', '20:30:00'),
(42, 'The Game of Life', 'some alcohol provided, BYOB, no food provided, no parking, carpool available, 21 years and older only', '9461 Irvine Center Dr.', 'Irvine', 'CA', '92618', 33.635139, -117.735504, '2017-09-29', '19:00:00'),
(43, 'Sorry!', 'Kids game, BBQ for parents, parking available, no experience required', '511 Spectrum Center Dr.', 'Irvine', 'CA', '92618', 33.651447, -117.745689, '2017-07-02', '10:00:00'),
(44, 'Battleship', 'two dogs in the house, all age groups, food provided, no parking', '115 Technology Dr.', 'Irvine', 'CA', '92618', 33.660168, -117.744690, '2017-10-04', '16:00:00'),
(45, 'Catan', 'no alcohol, bring your own food, parking available, no previous game exprience necessary, all age groups', '125 Retreat', 'Irvine', 'CA', '92603', 33.643051, -117.770050, '2017-09-27', '18:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_ID` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
