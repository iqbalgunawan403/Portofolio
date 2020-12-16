-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2019 at 02:51 PM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `weshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE IF NOT EXISTS `banner` (
  `banner_id` int(10) NOT NULL AUTO_INCREMENT,
  `banner` varchar(100) NOT NULL,
  `gambar` varchar(150) NOT NULL,
  `link` varchar(500) NOT NULL,
  `status` enum('on','off') NOT NULL,
  PRIMARY KEY (`banner_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`banner_id`, `banner`, `gambar`, `link`, `status`) VALUES
(1, 'sayur2', 'banner1.png', 'index.php?page=detail&barang_id=5', 'on'),
(2, 'sayur1', 'banner2.png', '', 'on'),
(3, 'banner3', 'banner3.png', '', 'off'),
(4, 'banner4', 'banner4.png', '', 'off');

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE IF NOT EXISTS `barang` (
  `barang_id` int(10) NOT NULL AUTO_INCREMENT,
  `kategori_id` int(10) NOT NULL,
  `nama_barang` varchar(250) NOT NULL,
  `spesifikasi` text NOT NULL,
  `gambar` varchar(300) NOT NULL,
  `harga` int(10) NOT NULL,
  `stok` tinyint(1) NOT NULL,
  `status` enum('on','off') NOT NULL,
  PRIMARY KEY (`barang_id`),
  KEY `kategori_id` (`kategori_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`barang_id`, `kategori_id`, `nama_barang`, `spesifikasi`, `gambar`, `harga`, `stok`, `status`) VALUES
(1, 1, 'Beras', '<p>Beras</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis aliquam sagittis. Aliquam tristique neque elit, at ullamcorper ante sollicitudin quis. Fusce dictum sollicitudin aliquam. Aenean ut mi pretium, porta leo eget, consectetur nulla. Cras ut turpis ullamcorper, pharetra mi interdum, varius velit. Donec sagittis urna et dolor fringilla, fringilla hendrerit sapien vulputate. Nulla vel commodo leo. Ut sit amet eleifend nisl, vitae dictum tortor. Praesent ac vestibulum erat. Sed nec ligula vitae dui ornare vulputate. Vestibulum ante sem, elementum nec vestibulum in, pretium vitae arcu. Aenean ultricies commodo bibendum. Proin tempus, erat eget euismod luctus, lorem sapien laoreet ipsum, ut scelerisque ante mi non erat. Integer efficitur semper massa.</p><p>&nbsp;</p>', 'beras.png', 11400, 9, 'on'),
(2, 2, 'Daging Ayam', '<p>Daging ayam adalah</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis aliquam sagittis. Aliquam tristique neque elit, at ullamcorper ante sollicitudin quis. Fusce dictum sollicitudin aliquam. Aenean ut mi pretium, porta leo eget, consectetur nulla. Cras ut turpis ullamcorper, pharetra mi interdum, varius velit. Donec sagittis urna et dolor fringilla, fringilla hendrerit sapien vulputate. Nulla vel commodo leo. Ut sit amet eleifend nisl, vitae dictum tortor. Praesent ac vestibulum erat. Sed nec ligula vitae dui ornare vulputate. Vestibulum ante sem, elementum nec vestibulum in, pretium vitae arcu. Aenean ultricies commodo bibendum. Proin tempus, erat eget euismod luctus, lorem sapien laoreet ipsum, ut scelerisque ante mi non erat. Integer efficitur semper massa.</p><p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget feugiat felis. Donec aliquam odio arcu, ac sollicitudin nisi volutpat vitae. Nulla facilisi. Nam ex leo, molestie nec augue id, rutrum cursus enim. Nullam tempus iaculis velit. Praesent feugiat velit faucibus magna tristique sollicitudin. Mauris eu lectus velit. Phasellus sagittis diam velit, a hendrerit risus euismod at. Nullam at dignissim massa, vitae facilisis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida sagittis hendrerit. Cras id arcu ornare sem feugiat malesuada quis auctor orci. Curabitur euismod finibus sagittis.</p>', 'daging ayam.jpg', 34000, 12, 'on'),
(3, 2, 'Daging Sapi', '<p>Daging sapi adalah</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis aliquam sagittis. Aliquam tristique neque elit, at ullamcorper ante sollicitudin quis. Fusce dictum sollicitudin aliquam. Aenean ut mi pretium, porta leo eget, consectetur nulla. Cras ut turpis ullamcorper, pharetra mi interdum, varius velit. Donec sagittis urna et dolor fringilla, fringilla hendrerit sapien vulputate. Nulla vel commodo leo. Ut sit amet eleifend nisl, vitae dictum tortor. Praesent ac vestibulum erat. Sed nec ligula vitae dui ornare vulputate. Vestibulum ante sem, elementum nec vestibulum in, pretium vitae arcu. Aenean ultricies commodo bibendum. Proin tempus, erat eget euismod luctus, lorem sapien laoreet ipsum, ut scelerisque ante mi non erat. Integer efficitur semper massa.</p><p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget feugiat felis. Donec aliquam odio arcu, ac sollicitudin nisi volutpat vitae. Nulla facilisi. Nam ex leo, molestie nec augue id, rutrum cursus enim. Nullam tempus iaculis velit. Praesent feugiat velit faucibus magna tristique sollicitudin. Mauris eu lectus velit. Phasellus sagittis diam velit, a hendrerit risus euismod at. Nullam at dignissim massa, vitae facilisis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida sagittis hendrerit. Cras id arcu ornare sem feugiat malesuada quis auctor orci. Curabitur euismod finibus sagittis.</p>', 'daging sapi.jpg', 115000, 1, 'on'),
(4, 2, 'Telur Ayam', '<p>Telur Ayam</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis aliquam sagittis. Aliquam tristique neque elit, at ullamcorper ante sollicitudin quis. Fusce dictum sollicitudin aliquam. Aenean ut mi pretium, porta leo eget, consectetur nulla. Cras ut turpis ullamcorper, pharetra mi interdum, varius velit. Donec sagittis urna et dolor fringilla, fringilla hendrerit sapien vulputate. Nulla vel commodo leo. Ut sit amet eleifend nisl, vitae dictum tortor. Praesent ac vestibulum erat. Sed nec ligula vitae dui ornare vulputate. Vestibulum ante sem, elementum nec vestibulum in, pretium vitae arcu. Aenean ultricies commodo bibendum. Proin tempus, erat eget euismod luctus, lorem sapien laoreet ipsum, ut scelerisque ante mi non erat. Integer efficitur semper massa.</p><p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget feugiat felis. Donec aliquam odio arcu, ac sollicitudin nisi volutpat vitae. Nulla facilisi. Nam ex leo, molestie nec augue id, rutrum cursus enim. Nullam tempus iaculis velit. Praesent feugiat velit faucibus magna tristique sollicitudin. Mauris eu lectus velit. Phasellus sagittis diam velit, a hendrerit risus euismod at. Nullam at dignissim massa, vitae facilisis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida sagittis hendrerit. Cras id arcu ornare sem feugiat malesuada quis auctor orci. Curabitur euismod finibus sagittis.</p>', 'telur ayam.png', 20800, 127, 'on'),
(5, 1, 'Bawang Merah', '<p>Bawang Merah pilihan</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis aliquam sagittis. Aliquam tristique neque elit, at ullamcorper ante sollicitudin quis. Fusce dictum sollicitudin aliquam. Aenean ut mi pretium, porta leo eget, consectetur nulla. Cras ut turpis ullamcorper, pharetra mi interdum, varius velit. Donec sagittis urna et dolor fringilla, fringilla hendrerit sapien vulputate. Nulla vel commodo leo. Ut sit amet eleifend nisl, vitae dictum tortor. Praesent ac vestibulum erat. Sed nec ligula vitae dui ornare vulputate. Vestibulum ante sem, elementum nec vestibulum in, pretium vitae arcu. Aenean ultricies commodo bibendum. Proin tempus, erat eget euismod luctus, lorem sapien laoreet ipsum, ut scelerisque ante mi non erat. Integer efficitur semper massa.</p><p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget feugiat felis. Donec aliquam odio arcu, ac sollicitudin nisi volutpat vitae. Nulla facilisi. Nam ex leo, molestie nec augue id, rutrum cursus enim. Nullam tempus iaculis velit. Praesent feugiat velit faucibus magna tristique sollicitudin. Mauris eu lectus velit. Phasellus sagittis diam velit, a hendrerit risus euismod at. Nullam at dignissim massa, vitae facilisis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida sagittis hendrerit. Cras id arcu ornare sem feugiat malesuada quis auctor orci. Curabitur euismod finibus sagittis.</p>', 'bawang merah.jpg', 24500, 20, 'on'),
(6, 1, 'Bawang Putih', '<p>Bawang Putih</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis aliquam sagittis. Aliquam tristique neque elit, at ullamcorper ante sollicitudin quis. Fusce dictum sollicitudin aliquam. Aenean ut mi pretium, porta leo eget, consectetur nulla. Cras ut turpis ullamcorper, pharetra mi interdum, varius velit. Donec sagittis urna et dolor fringilla, fringilla hendrerit sapien vulputate. Nulla vel commodo leo. Ut sit amet eleifend nisl, vitae dictum tortor. Praesent ac vestibulum erat. Sed nec ligula vitae dui ornare vulputate. Vestibulum ante sem, elementum nec vestibulum in, pretium vitae arcu. Aenean ultricies commodo bibendum. Proin tempus, erat eget euismod luctus, lorem sapien laoreet ipsum, ut scelerisque ante mi non erat. Integer efficitur semper massa.</p><p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget feugiat felis. Donec aliquam odio arcu, ac sollicitudin nisi volutpat vitae. Nulla facilisi. Nam ex leo, molestie nec augue id, rutrum cursus enim. Nullam tempus iaculis velit. Praesent feugiat velit faucibus magna tristique sollicitudin. Mauris eu lectus velit. Phasellus sagittis diam velit, a hendrerit risus euismod at. Nullam at dignissim massa, vitae facilisis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida sagittis hendrerit. Cras id arcu ornare sem feugiat malesuada quis auctor orci. Curabitur euismod finibus sagittis.</p>', 'bawang putih.jpg', 28000, 40, 'on'),
(7, 1, 'Cabai Merah', '<p>Cabe Merah pilihan</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis aliquam sagittis. Aliquam tristique neque elit, at ullamcorper ante sollicitudin quis. Fusce dictum sollicitudin aliquam. Aenean ut mi pretium, porta leo eget, consectetur nulla. Cras ut turpis ullamcorper, pharetra mi interdum, varius velit. Donec sagittis urna et dolor fringilla, fringilla hendrerit sapien vulputate. Nulla vel commodo leo. Ut sit amet eleifend nisl, vitae dictum tortor. Praesent ac vestibulum erat. Sed nec ligula vitae dui ornare vulputate. Vestibulum ante sem, elementum nec vestibulum in, pretium vitae arcu. Aenean ultricies commodo bibendum. Proin tempus, erat eget euismod luctus, lorem sapien laoreet ipsum, ut scelerisque ante mi non erat. Integer efficitur semper massa.</p><p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget feugiat felis. Donec aliquam odio arcu, ac sollicitudin nisi volutpat vitae. Nulla facilisi. Nam ex leo, molestie nec augue id, rutrum cursus enim. Nullam tempus iaculis velit. Praesent feugiat velit faucibus magna tristique sollicitudin. Mauris eu lectus velit. Phasellus sagittis diam velit, a hendrerit risus euismod at. Nullam at dignissim massa, vitae facilisis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida sagittis hendrerit. Cras id arcu ornare sem feugiat malesuada quis auctor orci. Curabitur euismod finibus sagittis.</p>', 'cabai merah.jpg', 32500, 20, 'on'),
(8, 1, 'Cabai Rawit', '<p>Cabe pilihan</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis aliquam sagittis. Aliquam tristique neque elit, at ullamcorper ante sollicitudin quis. Fusce dictum sollicitudin aliquam. Aenean ut mi pretium, porta leo eget, consectetur nulla. Cras ut turpis ullamcorper, pharetra mi interdum, varius velit. Donec sagittis urna et dolor fringilla, fringilla hendrerit sapien vulputate. Nulla vel commodo leo. Ut sit amet eleifend nisl, vitae dictum tortor. Praesent ac vestibulum erat. Sed nec ligula vitae dui ornare vulputate. Vestibulum ante sem, elementum nec vestibulum in, pretium vitae arcu. Aenean ultricies commodo bibendum. Proin tempus, erat eget euismod luctus, lorem sapien laoreet ipsum, ut scelerisque ante mi non erat. Integer efficitur semper massa.</p><p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget feugiat felis. Donec aliquam odio arcu, ac sollicitudin nisi volutpat vitae. Nulla facilisi. Nam ex leo, molestie nec augue id, rutrum cursus enim. Nullam tempus iaculis velit. Praesent feugiat velit faucibus magna tristique sollicitudin. Mauris eu lectus velit. Phasellus sagittis diam velit, a hendrerit risus euismod at. Nullam at dignissim massa, vitae facilisis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida sagittis hendrerit. Cras id arcu ornare sem feugiat malesuada quis auctor orci. Curabitur euismod finibus sagittis.</p>', 'cabai rawit.jpg', 40000, 30, 'on'),
(9, 1, 'Minyak Goreng', '<p>Minyak goreng biasanya bisa digunakan hingga 3 - 4 kali penggorengan. Jika digunakan berulang kali, minyak akan berubah warna.</p><p>Saat penggorengan dilakukan, ikatan rangkap yang terdapat pada asam lemak tak jenuh akan putus membentuk asam lemak jenuh.</p><p>Minyak yang baik adalah minyak yang mengandung asam lemak tak jenuh yang lebih banyak dibandingkan dengan kandungan asam lemak jenuh nya.</p>', 'minyak.jpg', 12000, 20, 'on'),
(10, 1, 'Garam Halus', '<p>Garam halus</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis aliquam sagittis. Aliquam tristique neque elit, at ullamcorper ante sollicitudin quis. Fusce dictum sollicitudin aliquam. Aenean ut mi pretium, porta leo eget, consectetur nulla. Cras ut turpis ullamcorper, pharetra mi interdum, varius velit. Donec sagittis urna et dolor fringilla, fringilla hendrerit sapien vulputate. Nulla vel commodo leo. Ut sit amet eleifend nisl, vitae dictum tortor. Praesent ac vestibulum erat. Sed nec ligula vitae dui ornare vulputate. Vestibulum ante sem, elementum nec vestibulum in, pretium vitae arcu. Aenean ultricies commodo bibendum. Proin tempus, erat eget euismod luctus, lorem sapien laoreet ipsum, ut scelerisque ante mi non erat. Integer efficitur semper massa.</p><p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget feugiat felis. Donec aliquam odio arcu, ac sollicitudin nisi volutpat vitae. Nulla facilisi. Nam ex leo, molestie nec augue id, rutrum cursus enim. Nullam tempus iaculis velit. Praesent feugiat velit faucibus magna tristique sollicitudin. Mauris eu lectus velit. Phasellus sagittis diam velit, a hendrerit risus euismod at. Nullam at dignissim massa, vitae facilisis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida sagittis hendrerit. Cras id arcu ornare sem feugiat malesuada quis auctor orci. Curabitur euismod finibus sagittis.</p>', 'garam.jpg', 3000, 35, 'on'),
(11, 2, 'Ikan Sarden', '<p>Ikan sarden segarr</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis aliquam sagittis. Aliquam tristique neque elit, at ullamcorper ante sollicitudin quis. Fusce dictum sollicitudin aliquam. Aenean ut mi pretium, porta leo eget, consectetur nulla. Cras ut turpis ullamcorper, pharetra mi interdum, varius velit. Donec sagittis urna et dolor fringilla, fringilla hendrerit sapien vulputate. Nulla vel commodo leo. Ut sit amet eleifend nisl, vitae dictum tortor. Praesent ac vestibulum erat. Sed nec ligula vitae dui ornare vulputate. Vestibulum ante sem, elementum nec vestibulum in, pretium vitae arcu. Aenean ultricies commodo bibendum. Proin tempus, erat eget euismod luctus, lorem sapien laoreet ipsum, ut scelerisque ante mi non erat. Integer efficitur semper massa.</p><p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget feugiat felis. Donec aliquam odio arcu, ac sollicitudin nisi volutpat vitae. Nulla facilisi. Nam ex leo, molestie nec augue id, rutrum cursus enim. Nullam tempus iaculis velit. Praesent feugiat velit faucibus magna tristique sollicitudin. Mauris eu lectus velit. Phasellus sagittis diam velit, a hendrerit risus euismod at. Nullam at dignissim massa, vitae facilisis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida sagittis hendrerit. Cras id arcu ornare sem feugiat malesuada quis auctor orci. Curabitur euismod finibus sagittis.</p>', 'ikan sarden.jpeg', 17000, 12, 'on'),
(12, 2, 'Iga Sapi', '<p>Iga sapi pilihan</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis aliquam sagittis. Aliquam tristique neque elit, at ullamcorper ante sollicitudin quis. Fusce dictum sollicitudin aliquam. Aenean ut mi pretium, porta leo eget, consectetur nulla. Cras ut turpis ullamcorper, pharetra mi interdum, varius velit. Donec sagittis urna et dolor fringilla, fringilla hendrerit sapien vulputate. Nulla vel commodo leo. Ut sit amet eleifend nisl, vitae dictum tortor. Praesent ac vestibulum erat. Sed nec ligula vitae dui ornare vulputate. Vestibulum ante sem, elementum nec vestibulum in, pretium vitae arcu. Aenean ultricies commodo bibendum. Proin tempus, erat eget euismod luctus, lorem sapien laoreet ipsum, ut scelerisque ante mi non erat. Integer efficitur semper massa.</p><p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget feugiat felis. Donec aliquam odio arcu, ac sollicitudin nisi volutpat vitae. Nulla facilisi. Nam ex leo, molestie nec augue id, rutrum cursus enim. Nullam tempus iaculis velit. Praesent feugiat velit faucibus magna tristique sollicitudin. Mauris eu lectus velit. Phasellus sagittis diam velit, a hendrerit risus euismod at. Nullam at dignissim massa, vitae facilisis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida sagittis hendrerit. Cras id arcu ornare sem feugiat malesuada quis auctor orci. Curabitur euismod finibus sagittis.</p>', 'iga sapi.jpg', 110000, 16, 'on'),
(13, 1, 'Gula Pasir', '<p>Gula pasir pilihan Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis aliquam sagittis. Aliquam tristique neque elit, at ullamcorper ante sollicitudin quis. Fusce dictum sollicitudin aliquam. Aenean ut mi pretium, porta leo eget, consectetur nulla. Cras ut turpis ullamcorper, pharetra mi interdum, varius velit. Donec sagittis urna et dolor fringilla, fringilla hendrerit sapien vulputate. Nulla vel commodo leo. Ut sit amet eleifend nisl, vitae dictum tortor. Praesent ac vestibulum erat. Sed nec ligula vitae dui ornare vulputate. Vestibulum ante sem, elementum nec vestibulum in, pretium vitae arcu. Aenean ultricies commodo bibendum. Proin tempus, erat eget euismod luctus, lorem sapien laoreet ipsum, ut scelerisque ante mi non erat. Integer efficitur semper massa.</p><p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget feugiat felis. Donec aliquam odio arcu, ac sollicitudin nisi volutpat vitae. Nulla facilisi. Nam ex leo, molestie nec augue id, rutrum cursus enim. Nullam tempus iaculis velit. Praesent feugiat velit faucibus magna tristique sollicitudin. Mauris eu lectus velit. Phasellus sagittis diam velit, a hendrerit risus euismod at. Nullam at dignissim massa, vitae facilisis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida sagittis hendrerit. Cras id arcu ornare sem feugiat malesuada quis auctor orci. Curabitur euismod finibus sagittis.</p>', 'gula pasir.jpg', 13400, 22, 'on'),
(14, 1, 'Merica Bubuk', '<p>Merica bubuk</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis aliquam sagittis. Aliquam tristique neque elit, at ullamcorper ante sollicitudin quis. Fusce dictum sollicitudin aliquam. Aenean ut mi pretium, porta leo eget, consectetur nulla. Cras ut turpis ullamcorper, pharetra mi interdum, varius velit. Donec sagittis urna et dolor fringilla, fringilla hendrerit sapien vulputate. Nulla vel commodo leo. Ut sit amet eleifend nisl, vitae dictum tortor. Praesent ac vestibulum erat. Sed nec ligula vitae dui ornare vulputate. Vestibulum ante sem, elementum nec vestibulum in, pretium vitae arcu. Aenean ultricies commodo bibendum. Proin tempus, erat eget euismod luctus, lorem sapien laoreet ipsum, ut scelerisque ante mi non erat. Integer efficitur semper massa.</p><p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget feugiat felis. Donec aliquam odio arcu, ac sollicitudin nisi volutpat vitae. Nulla facilisi. Nam ex leo, molestie nec augue id, rutrum cursus enim. Nullam tempus iaculis velit. Praesent feugiat velit faucibus magna tristique sollicitudin. Mauris eu lectus velit. Phasellus sagittis diam velit, a hendrerit risus euismod at. Nullam at dignissim massa, vitae facilisis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida sagittis hendrerit. Cras id arcu ornare sem feugiat malesuada quis auctor orci. Curabitur euismod finibus sagittis.</p>', 'merica.jpg', 8000, 28, 'on'),
(15, 1, 'Andaliman Bubuk', '<p>Andaliman bubuk</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis aliquam sagittis. Aliquam tristique neque elit, at ullamcorper ante sollicitudin quis. Fusce dictum sollicitudin aliquam. Aenean ut mi pretium, porta leo eget, consectetur nulla. Cras ut turpis ullamcorper, pharetra mi interdum, varius velit. Donec sagittis urna et dolor fringilla, fringilla hendrerit sapien vulputate. Nulla vel commodo leo. Ut sit amet eleifend nisl, vitae dictum tortor. Praesent ac vestibulum erat. Sed nec ligula vitae dui ornare vulputate. Vestibulum ante sem, elementum nec vestibulum in, pretium vitae arcu. Aenean ultricies commodo bibendum. Proin tempus, erat eget euismod luctus, lorem sapien laoreet ipsum, ut scelerisque ante mi non erat. Integer efficitur semper massa.</p><p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget feugiat felis. Donec aliquam odio arcu, ac sollicitudin nisi volutpat vitae. Nulla facilisi. Nam ex leo, molestie nec augue id, rutrum cursus enim. Nullam tempus iaculis velit. Praesent feugiat velit faucibus magna tristique sollicitudin. Mauris eu lectus velit. Phasellus sagittis diam velit, a hendrerit risus euismod at. Nullam at dignissim massa, vitae facilisis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida sagittis hendrerit. Cras id arcu ornare sem feugiat malesuada quis auctor orci. Curabitur euismod finibus sagittis.</p>', 'andaliman.png', 15000, 27, 'on');

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE IF NOT EXISTS `kategori` (
  `kategori_id` int(10) NOT NULL AUTO_INCREMENT,
  `kategori` varchar(150) NOT NULL,
  `status` enum('on','off') NOT NULL,
  PRIMARY KEY (`kategori_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`kategori_id`, `kategori`, `status`) VALUES
(1, 'Pangan Nabati', 'on'),
(2, 'Pangan Hewani', 'on'),
(3, '', 'off'),
(4, '', 'off');

-- --------------------------------------------------------

--
-- Table structure for table `konfirmasi_pembayaran`
--

CREATE TABLE IF NOT EXISTS `konfirmasi_pembayaran` (
  `konfirmasi_id` int(10) NOT NULL AUTO_INCREMENT,
  `pesanan_id` int(10) NOT NULL,
  `nomor_rekening` varchar(20) NOT NULL,
  `nama_account` varchar(150) NOT NULL,
  `tanggal_transfer` date NOT NULL,
  PRIMARY KEY (`konfirmasi_id`),
  KEY `pesanan_id` (`pesanan_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `konfirmasi_pembayaran`
--

INSERT INTO `konfirmasi_pembayaran` (`konfirmasi_id`, `pesanan_id`, `nomor_rekening`, `nama_account`, `tanggal_transfer`) VALUES
(4, 8, '008877', 'Bambang', '2019-12-02');

-- --------------------------------------------------------

--
-- Table structure for table `kota`
--

CREATE TABLE IF NOT EXISTS `kota` (
  `kota_id` int(10) NOT NULL AUTO_INCREMENT,
  `kota` varchar(150) NOT NULL,
  `tarif` int(10) NOT NULL,
  `status` enum('on','off') NOT NULL,
  PRIMARY KEY (`kota_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `kota`
--

INSERT INTO `kota` (`kota_id`, `kota`, `tarif`, `status`) VALUES
(1, 'Jakarta', 6000, 'on'),
(2, 'Bandung', 8000, 'on'),
(3, 'Surabaya', 11000, 'on'),
(4, 'Semarang', 9000, 'on'),
(5, 'medan', 20000, 'on');

-- --------------------------------------------------------

--
-- Table structure for table `pesanan`
--

CREATE TABLE IF NOT EXISTS `pesanan` (
  `pesanan_id` int(10) NOT NULL AUTO_INCREMENT,
  `kota_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `nama_penerima` varchar(150) NOT NULL,
  `nomor_telepon` varchar(15) NOT NULL,
  `alamat` varchar(300) NOT NULL,
  `tanggal_pemesanan` datetime NOT NULL,
  `status` tinyint(4) NOT NULL,
  PRIMARY KEY (`pesanan_id`),
  KEY `kota_id` (`kota_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `pesanan`
--

INSERT INTO `pesanan` (`pesanan_id`, `kota_id`, `user_id`, `nama_penerima`, `nomor_telepon`, `alamat`, `tanggal_pemesanan`, `status`) VALUES
(5, 5, 7, 'steven', '0823644444', 'medan', '2019-11-30 13:29:47', 0),
(6, 1, 8, 'steven', '3434534346', 'fgdfg', '2019-12-01 08:46:17', 0),
(7, 1, 9, 'gue', '96', 'jdfjdf', '2019-12-02 04:14:19', 0),
(8, 1, 10, 'bambang', '000000', 'jalan thamrin', '2019-12-02 05:20:56', 2);

-- --------------------------------------------------------

--
-- Table structure for table `pesanan_detail`
--

CREATE TABLE IF NOT EXISTS `pesanan_detail` (
  `pesanan_id` int(10) NOT NULL,
  `barang_id` int(10) NOT NULL,
  `quantity` tinyint(2) NOT NULL,
  `harga` int(10) NOT NULL,
  KEY `pesanan_id` (`pesanan_id`),
  KEY `barang_id` (`barang_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pesanan_detail`
--

INSERT INTO `pesanan_detail` (`pesanan_id`, `barang_id`, `quantity`, `harga`) VALUES
(5, 8, 1, 1325000),
(6, 14, 1, 2750000),
(6, 2, 1, 2200000),
(6, 6, 1, 2900000),
(7, 14, 1, 8000),
(8, 13, 3, 13400);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `level` varchar(30) NOT NULL,
  `nama` varchar(150) NOT NULL,
  `email` varchar(160) NOT NULL,
  `alamat` varchar(400) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `password` varchar(300) NOT NULL,
  `status` enum('on','off') NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `level`, `nama`, `email`, `alamat`, `phone`, `password`, `status`) VALUES
(2, 'superadmin', 'admin', 'admin@weshop.com', 'jl weshop', '08889999', 'claode123', 'on'),
(6, 'customer', 'customer', 'customer1@aaa.com', 'jl.Customer Weshop', '088888', '1234', 'on'),
(7, 'superadmin', 'steven', 'steven@claode.com', 'medan', '93232342', '81dc9bdb52d04dc20036dbd8313ed055', 'on'),
(8, 'superadmin', 'steven claode', 'steven@dot.com', 'sasasf', '928374234', '593ddb06fab34b99ae7120193fe0b974', 'on'),
(9, 'customer', 'claode', 'claode@email.com', 'nfjsnfsjdnf', '234242', '81dc9bdb52d04dc20036dbd8313ed055', 'on'),
(10, 'customer', 'customer2', 'customer2@aaa.com', 'jalan thamrin', '00000', '81dc9bdb52d04dc20036dbd8313ed055', 'on');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `barang`
--
ALTER TABLE `barang`
  ADD CONSTRAINT `barang_ibfk_1` FOREIGN KEY (`kategori_id`) REFERENCES `kategori` (`kategori_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `konfirmasi_pembayaran`
--
ALTER TABLE `konfirmasi_pembayaran`
  ADD CONSTRAINT `konfirmasi_pembayaran_ibfk_1` FOREIGN KEY (`pesanan_id`) REFERENCES `pesanan` (`pesanan_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD CONSTRAINT `pesanan_ibfk_1` FOREIGN KEY (`kota_id`) REFERENCES `kota` (`kota_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pesanan_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pesanan_detail`
--
ALTER TABLE `pesanan_detail`
  ADD CONSTRAINT `pesanan_detail_ibfk_1` FOREIGN KEY (`pesanan_id`) REFERENCES `pesanan` (`pesanan_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pesanan_detail_ibfk_2` FOREIGN KEY (`barang_id`) REFERENCES `barang` (`barang_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
