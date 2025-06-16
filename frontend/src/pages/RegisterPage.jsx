import {
	Box,
	Button,
	Container,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const toast = useToast();
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("/api/users/register", { username, password });
			toast({
				title: res.data.message || "Đăng ký thành công.",
				status: "success",
				duration: 2000,
				isClosable: true,
			});
			navigate("/login");
		} catch (err) {
			toast({
				title: "Đăng ký thất bại",
				description: err.response?.data?.message || "Lỗi không xác định",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Container maxW="sm" py={12}>
			<Box
				p={8}
				borderWidth={1}
				borderRadius="lg"
				boxShadow="lg"
				bg="white"
				_dark={{ bg: "gray.800" }}
			>
				<Stack spacing={4}>
					<Heading size="lg" textAlign="center">Đăng ký</Heading>
					<form onSubmit={handleRegister}>
						<FormControl id="username" isRequired mb={3}>
							<FormLabel>Tên đăng nhập</FormLabel>
							<Input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</FormControl>

						<FormControl id="password" isRequired mb={5}>
							<FormLabel>Mật khẩu</FormLabel>
							<Input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</FormControl>

						<Button type="submit" colorScheme="teal" width="100%">
							Đăng ký
						</Button>
					</form>

					<Text fontSize="sm" textAlign="center">
						Đã có tài khoản? <Button variant="link" onClick={() => navigate("/login")}>Đăng nhập</Button>
					</Text>
				</Stack>
			</Box>
		</Container>
	);
}
