-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2026 at 04:02 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kidora1_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `action` varchar(100) NOT NULL,
  `details` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_logs`
--

INSERT INTO `activity_logs` (`id`, `user_id`, `action`, `details`, `ip_address`, `created_at`) VALUES
(1, 2, 'Registration', 'User registered with role: parent', '::1', '2026-05-09 20:18:31'),
(2, 2, 'Login', 'User logged into the platform', '::1', '2026-05-09 20:18:39'),
(3, 2, 'Module Completed', 'Completed module ID: 1', '::1', '2026-05-09 20:20:08'),
(4, 2, 'AI Query: Hello', NULL, '::1', '2026-05-09 22:42:34'),
(5, 1, 'Login', 'User logged into the platform', '::1', '2026-05-09 23:25:23'),
(6, 2, 'Login', 'User logged into the platform', '::1', '2026-05-09 23:52:08'),
(7, 2, 'Login', 'User logged into the platform', '::1', '2026-05-09 23:52:57'),
(8, 2, 'Login', 'User logged into the platform', '::1', '2026-05-10 00:00:26'),
(9, 1, 'Login', 'User logged into the platform', '::1', '2026-05-10 00:18:34'),
(10, 1, 'Update Simulator', 'Updated simulator: The Grocery ', '::1', '2026-05-10 00:19:03'),
(11, 1, 'Delete Simulator', 'Deleted simulator ID: 1', '::1', '2026-05-10 00:19:28'),
(12, 1, 'Update Simulator', 'Updated simulator: Broken Toy Dilemma', '::1', '2026-05-10 00:22:37'),
(13, 1, 'Create Simulator', 'Added simulator: Child insultshis uncle', '::1', '2026-05-10 00:24:39'),
(14, 2, 'Password Reset', 'User reset their password', '::1', '2026-05-10 00:43:03'),
(15, 2, 'Login', 'User logged into the platform', '::1', '2026-05-10 00:47:24'),
(16, 1, 'Admin Login', 'Admin logged into the platform', '::1', '2026-05-10 01:01:23'),
(17, 1, 'Delete Module', 'Deleted module ID: 5', '::1', '2026-05-10 01:12:23'),
(18, 1, 'Admin Login', 'Admin logged into the platform', '::1', '2026-05-10 01:29:28'),
(19, 2, 'Login', 'User logged into the platform', '::1', '2026-05-10 01:47:02'),
(20, 2, 'Login', 'User logged into the platform', '::1', '2026-05-10 01:47:02'),
(21, 2, 'Login', 'User logged into the platform', '::1', '2026-05-10 01:48:54'),
(22, 2, 'Login', 'User logged into the platform', '::1', '2026-05-10 01:48:54'),
(23, 1, 'Admin Login', 'Admin logged into the platform', '::1', '2026-05-10 01:50:22'),
(24, 2, 'Login', 'User logged into the platform', '::1', '2026-05-10 01:51:23'),
(25, 2, 'Login', 'User logged into the platform', '::1', '2026-05-10 01:51:23'),
(26, 1, 'Admin Login', 'Admin logged into the platform', '::1', '2026-05-10 01:52:29'),
(27, 1, 'Add Testimonial', 'Added: Pius', '::1', '2026-05-10 01:53:07');

-- --------------------------------------------------------

--
-- Table structure for table `awareness_posts`
--

CREATE TABLE `awareness_posts` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `content` text NOT NULL,
  `action_tip` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `awareness_posts`
--

INSERT INTO `awareness_posts` (`id`, `title`, `content`, `action_tip`, `created_at`) VALUES
(1, 'Windows of Tolerance', 'Every child has a window where they can handle stress. Outside this window, they go into fight/flight. It\'s not about behavior; it\'s about biology.', 'Watch for \"glassy eyes\" or heavy breathing as early signs of leaving the window.', '2026-05-09 20:15:14'),
(2, 'Neuroplasticity in Kids', 'Children\'s brains are like sponges. Safe interactions literally grow new positive neural pathways in as little as 3 weeks of consistent empathy.', 'Celebrate small wins. Positive reinforcement is the best brain food.', '2026-05-09 20:15:14'),
(3, 'The 5-Second Pause', 'When your child triggers you, wait 5 seconds before speaking. This moves your brain from reaction to response.', 'Breathe deep and count slowly before you react to a \"No\".', '2026-05-09 20:15:14'),
(4, 'Recognizing Triggers', 'Sudden loud noises, changes in routine, or specific tones of voice can trigger a trauma response in children who have experienced loss.', 'Create a \'Safe Corner\' with soft items where they can retreat without shame.', '2026-05-09 20:15:14');

-- --------------------------------------------------------

--
-- Table structure for table `children`
--

CREATE TABLE `children` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `emotion_cards`
--

CREATE TABLE `emotion_cards` (
  `id` int(11) NOT NULL,
  `emotion` varchar(50) NOT NULL,
  `hidden_message` text DEFAULT NULL,
  `scenario` text DEFAULT NULL,
  `response` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `emotion_cards`
--

INSERT INTO `emotion_cards` (`id`, `emotion`, `hidden_message`, `scenario`, `response`, `created_at`) VALUES
(1, 'Anger', 'I feel powerless and I am trying to regain control.', 'The child is throwing toys across the room.', 'Stay calm, ensure safety, and wait for the \"calm window\" to talk.', '2026-05-09 20:15:14'),
(2, 'Silence', 'I am overwhelmed by big feelings and I do not have the words yet.', 'The child refuses to speak after a school event.', 'Simply sit with them in silence until they are ready to share.', '2026-05-09 20:15:14'),
(3, 'Defiance', 'I am testing my autonomy to see if you are a safe person to trust.', 'The child says \"NO\" to every simple request.', 'Offer choices instead of commands. \"Would you like the red or blue cup?\"', '2026-05-09 20:15:14'),
(4, 'Fear', 'The world feels unsafe and I need you to be my protection.', 'Clinging and crying when being dropped off at school.', 'Validate the feeling. \"I know this is scary, but I will be back for you. You are safe here.\"', '2026-05-09 20:15:14');

-- --------------------------------------------------------

--
-- Table structure for table `learning_modules`
--

CREATE TABLE `learning_modules` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `difficulty` enum('Easy','Medium','Hard') DEFAULT NULL,
  `estimated_time` varchar(50) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `age_range` varchar(50) DEFAULT 'All Ages',
  `min_age` int(11) DEFAULT 0,
  `max_age` int(11) DEFAULT 18,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `learning_modules`
--

INSERT INTO `learning_modules` (`id`, `title`, `description`, `category`, `difficulty`, `estimated_time`, `image_url`, `age_range`, `min_age`, `max_age`, `status`, `created_at`) VALUES
(1, 'The Biology of Trauma', 'Understanding how trauma affects child brain development and daily behavior.', 'Neuroscience', 'Medium', '20 mins', 'images/trauma-bio.jpg', 'All Ages', 0, 18, 'active', '2026-05-09 20:15:13'),
(2, 'Positive Discipline', 'Strategies for setting boundaries without using shame or physical punishment.', 'Parenting Styles', 'Easy', '15 mins', 'images/discipline.jpg', '2-10 years', 2, 10, 'active', '2026-05-09 20:15:13'),
(3, 'Managing Tantrums', 'Practical steps to de-escalate emotional outbursts using empathy.', 'Crisis Management', 'Easy', '10 mins', 'images/tantrum.jpg', 'Toddlers', 1, 5, 'active', '2026-05-09 20:15:13'),
(4, 'Building Trust', 'Create a safe psychological space where your child feels secure enough to be honest.', 'Relationship', 'Hard', '30 mins', 'images/trust.jpg', '10-16 years', 10, 16, 'active', '2026-05-09 20:15:13');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(150) NOT NULL,
  `message` text NOT NULL,
  `type` enum('donation','progress','system','alert') DEFAULT 'system',
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `title`, `message`, `type`, `is_read`, `created_at`) VALUES
(1, 2, 'Welcome to Kidora! ✨', 'Thank you for joining our community.', 'system', 0, '2026-05-09 20:18:31'),
(2, 2, 'Module Completed! 🎓', 'Congratulations on finishing the module. Keep learning!', 'progress', 0, '2026-05-09 20:20:08');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `token` varchar(64) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `resource_type` enum('book','video','audio') NOT NULL,
  `file_url` varchar(255) NOT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`id`, `title`, `description`, `resource_type`, `file_url`, `thumbnail_url`, `category`, `created_at`) VALUES
(1, 'The Whole-Brain Child', 'A PDF guide on child development strategies focusing on the left and right brain integration.', 'book', 'resources/whole-brain.pdf', NULL, 'Psychology', '2026-05-09 20:15:15'),
(2, 'Managing Toddler Tantrums', 'A 5-minute video guide for parents of young children by developmental experts.', 'video', 'https://example.com/tantrums.mp4', NULL, 'Behavioral', '2026-05-09 20:15:15'),
(3, 'Lullabies for Better Sleep', 'Soothing audio tracks curated to help children with anxiety settle down for bedtime.', 'audio', 'resources/lullaby.mp3', NULL, 'Sleep', '2026-05-09 20:15:15'),
(4, 'Attachment Styles Explained', 'An infographic explaining secure vs insecure attachment in early childhood.', 'book', 'resources/attachment.pdf', NULL, 'Development', '2026-05-09 20:15:15');

-- --------------------------------------------------------

--
-- Table structure for table `simulator_scenarios`
--

CREATE TABLE `simulator_scenarios` (
  `id` int(11) NOT NULL,
  `title` varchar(150) DEFAULT NULL,
  `desc` text DEFAULT NULL,
  `prompt` text DEFAULT NULL,
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`options`)),
  `type` varchar(50) DEFAULT 'Behavioral',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `simulator_scenarios`
--

INSERT INTO `simulator_scenarios` (`id`, `title`, `desc`, `prompt`, `options`, `type`, `status`, `created_at`) VALUES
(2, 'Broken Toy Dilemma', 'Your child accidentally breaks their favorite toy and starts sobbing.', 'They are inconsolable. How do you respond?', '{\"A\":{\"label\":\"Tell them to stop crying\",\"outcome\":\"They learn to suppress emotions. The sobbing continues but now they feel guilty.\",\"type\":\"negative\"},\"B\":{\"label\":\"Validate their grief\",\"outcome\":\"You say \\\"I know it hurts to lose something you love.\\\" They feel supported and stop crying sooner.\",\"type\":\"positive\"}}', 'Emotional Resilience', 'active', '2026-05-09 20:15:14'),
(3, 'Child insultshis uncle', 'Your seven year old insults his uncle', 'He refuses to apologize and begins to cry instead', '{\"A\":{\"label\":\"ask them nicely to apologize again\",\"outcome\":\"They  do and in some case they don\'t\",\"type\":\"positive\"},\"B\":{\"label\":\"Punish them until they do \",\"outcome\":\"They definitely apologizes\",\"type\":\"positive\"}}', 'Behavioral', 'active', '2026-05-10 00:24:38');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` varchar(50) DEFAULT NULL,
  `quote` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `role`, `quote`, `created_at`) VALUES
(1, 'Mrs. Adebayo', 'Parent', 'Kidora1 changed how I talk to my teenage son. We actually have conversations now instead of arguments.', '2026-05-09 20:15:14'),
(2, 'John Doe', 'Donor', 'Seeing the impact of my small monthly donation on these families is incredibly rewarding.', '2026-05-09 20:15:14'),
(3, 'Sarah J.', 'Volunteer', 'The mentorship program is fantastic. I\'ve seen shy kids blossom into confident leaders.', '2026-05-09 20:15:14'),
(4, 'Pius', 'Parent', 'This is  aweasome', '2026-05-10 01:53:07');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','parent') DEFAULT 'parent',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password_hash`, `role`, `created_at`) VALUES
(1, 'Kidora Admin', 'admin@kidora1.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '2026-05-09 20:15:13'),
(2, 'Pius Unwaba', 'unwabapius@gmail.com', '$2y$10$YbCstWHbhx/2T5YOvBUWeeij0hHOj3bNypkfzYdEghJUIetAjCFJu', 'parent', '2026-05-09 20:18:30');

-- --------------------------------------------------------

--
-- Table structure for table `user_progress`
--

CREATE TABLE `user_progress` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `module_id` int(11) DEFAULT NULL,
  `progress` int(11) DEFAULT 0,
  `completed` tinyint(1) DEFAULT 0,
  `last_accessed` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_progress`
--

INSERT INTO `user_progress` (`id`, `user_id`, `module_id`, `progress`, `completed`, `last_accessed`) VALUES
(1, 2, 1, 100, 1, '2026-05-09 20:20:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `awareness_posts`
--
ALTER TABLE `awareness_posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `children`
--
ALTER TABLE `children`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indexes for table `emotion_cards`
--
ALTER TABLE `emotion_cards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `learning_modules`
--
ALTER TABLE `learning_modules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`),
  ADD KEY `token` (`token`);

--
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `simulator_scenarios`
--
ALTER TABLE `simulator_scenarios`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_progress`
--
ALTER TABLE `user_progress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `module_id` (`module_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `awareness_posts`
--
ALTER TABLE `awareness_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `children`
--
ALTER TABLE `children`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `emotion_cards`
--
ALTER TABLE `emotion_cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `learning_modules`
--
ALTER TABLE `learning_modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `simulator_scenarios`
--
ALTER TABLE `simulator_scenarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_progress`
--
ALTER TABLE `user_progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD CONSTRAINT `activity_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `children`
--
ALTER TABLE `children`
  ADD CONSTRAINT `children_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_progress`
--
ALTER TABLE `user_progress`
  ADD CONSTRAINT `user_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_progress_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `learning_modules` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
