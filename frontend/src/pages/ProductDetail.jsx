import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  Box,
  Button,
  Image,
  Spinner,
  Stack,
  Text,
  useToast,
  Heading,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const toast = useToast();
  const bg = useColorModeValue("white", "gray.800");

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
        const data = await res.json();
        setProduct(data.data);
      } catch (err) {
        console.error("Lỗi khi load chi tiết:", err);
        toast({
          title: "Lỗi",
          description: "Không thể tải sản phẩm. Vui lòng thử lại.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "⚠️ Vui lòng đăng nhập",
        description: "Bạn cần đăng nhập để thêm vào giỏ hàng.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    addToCart(product);
    toast({
      title: "🛒 Đã thêm vào giỏ hàng",
      description: `${product.name} đã được thêm.`,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });
  };

  if (loading) return <Spinner size="xl" mt={10} />;
  if (!product) return <Text>Không tìm thấy sản phẩm.</Text>;

  return (
    <Box p={6} maxW="1200px" mx="auto" bg={bg} rounded="lg" shadow="xl">
      <Stack direction={{ base: "column", md: "row" }} spacing={10}>
        {/* ZOOM IMAGE with hover text */}
        <Box position="relative" flex="1" role="group">
          <Zoom>
            <Image
              src={product.image}
              alt={product.name}
              borderRadius="xl"
              objectFit="cover"
              w="100%"
              maxH="600px"
              cursor="zoom-in"
              transition="all 0.3s"
              _hover={{ transform: "scale(1.02)" }}
            />
          </Zoom>

          <Box
            position="absolute"
            bottom={3}
            left="50%"
            transform="translateX(-50%)"
            bg="blackAlpha.700"
            color="white"
            fontSize="sm"
            px={3}
            py={1}
            rounded="md"
            opacity={0}
            _groupHover={{ opacity: 1 }}
            transition="opacity 0.3s"
          >
            Nhấp vào để xem hình ảnh rõ hơn
          </Box>
        </Box>

        {/* PRODUCT INFO */}
        <Box flex="1">
          <Badge colorScheme="teal" mb={2} fontSize="sm">
            Sản phẩm mới
          </Badge>

          <Heading fontSize="3xl" mb={2}>
            {product.name}
          </Heading>

          <Text fontSize="lg" color="gray.600" mb={4}>
            {product.description || "Không có mô tả."}
          </Text>

          <Text fontSize="2xl" fontWeight="bold" color="teal.500" mb={6}>
            {product.price.toLocaleString()} VNĐ
          </Text>

          <Button colorScheme="teal" size="lg" onClick={handleAddToCart} px={10}>
            ➕ Thêm vào giỏ hàng
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductDetail;
