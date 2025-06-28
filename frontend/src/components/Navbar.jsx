import {
	Button,
	Container,
	Flex,
	HStack,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useEffect, useState } from "react";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsLoggedIn(!!token);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
		navigate("/login");
		window.location.reload(); // Reload lại để cập nhật trạng thái
	};

	return (
		<Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{ base: "column", sm: "row" }}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
				>
					<Link to={"/"}>Gia Khanh Store 🛒</Link>
				</Text>

				<HStack spacing={2} alignItems={"center"}>
					{isLoggedIn && (
						<>
							<Link to={"/create"}>
								<Button>
									<PlusSquareIcon fontSize={20} />
								</Button>
							</Link>
							<Link to={"/cart"}>
								<Button colorScheme="blue" variant="outline">
									🛒 Giỏ hàng
								</Button>
							</Link>
							<Link to="/orders">
								<Button variant="ghost" colorScheme="teal">
									Đơn hàng đã đặt
								</Button>
							</Link>
							<Button colorScheme="red" onClick={handleLogout}>
								Đăng xuất
							</Button>
						</>
					)}

					{!isLoggedIn && (
						<>
							<Button colorScheme="teal" onClick={() => navigate("/login")}>
								Đăng nhập
							</Button>
							<Button colorScheme="teal" onClick={() => navigate("/register")}>
								Đăng ký
							</Button>
						</>
					)}

					<Button onClick={toggleColorMode}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
					</Button>
				</HStack>
			</Flex>
		</Container>
	);
};

export default Navbar;
