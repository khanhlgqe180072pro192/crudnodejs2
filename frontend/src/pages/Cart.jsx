import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  VStack,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useCart } from "../contexts/CartContext";
import { AddIcon, MinusIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const toast = useToast();
  const navigate = useNavigate();
  const boxBg = useColorModeValue("white", "gray.800");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const newOrder = {
      items: cart,
      total,
      status: "Đang xử lý",
      createdAt: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    clearCart();

    toast({
      title: "✅ Đặt hàng thành công!",
      description: "Cảm ơn bạn đã mua hàng tại Gia Khánh Store 😎",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    navigate("/orders");
  };

  return (
    <Box maxW="1140px" mx="auto" px={4} py={6}>
      <Heading mb={6} textAlign="center">
        🛒 Giỏ hàng của bạn
      </Heading>

      {cart.length === 0 ? (
        <Text fontSize="xl" color="gray.500" textAlign="center">
          Giỏ hàng hiện đang trống.
        </Text>
      ) : (
        <Flex direction={{ base: "column", md: "row" }} gap={8}>
          <VStack align="stretch" flex="3" spacing={4}>
            {cart.map((item) => (
              <Box
                key={item._id}
                borderWidth="1px"
                borderRadius="lg"
                bg={boxBg}
                p={4}
                boxShadow="md"
              >
                <Flex gap={4} direction={{ base: "column", sm: "row" }}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    boxSize="100px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <Flex direction="column" flex="1" justify="space-between">
                    <Box>
                      <Text fontSize="lg" fontWeight="bold">
                        {item.name}
                      </Text>
                      <Text color="teal.500" fontWeight="bold" fontSize="md">
                        {item.price.toLocaleString()} VNĐ
                      </Text>
                    </Box>

                    <Flex align="center" mt={2} gap={2}>
                      <IconButton
                        icon={<MinusIcon />}
                        size="sm"
                        aria-label="Giảm"
                        onClick={() => decreaseQty(item._id)}
                        isDisabled={item.quantity === 1}
                      />
                      <Text fontWeight="medium" minW="24px" textAlign="center">
                        {item.quantity}
                      </Text>
                      <IconButton
                        icon={<AddIcon />}
                        size="sm"
                        aria-label="Tăng"
                        onClick={() => increaseQty(item._id)}
                      />
                    </Flex>
                  </Flex>

                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    aria-label="Xoá"
                    onClick={() => removeFromCart(item._id)}
                    alignSelf="start"
                  />
                </Flex>
              </Box>
            ))}
          </VStack>

          <Box
            flex="1"
            borderWidth="1px"
            borderRadius="lg"
            p={6}
            bg={boxBg}
            boxShadow="lg"
            h="fit-content"
          >
            <Heading size="md" mb={4}>
              Thông tin thanh toán
            </Heading>
            <Divider mb={4} />
            <Text fontSize="lg" fontWeight="bold">
              Tổng cộng:
            </Text>
            <Text fontSize="2xl" color="green.500" fontWeight="extrabold">
              {total.toLocaleString()} VNĐ
            </Text>
            <Button
              colorScheme="teal"
              width="100%"
              mt={6}
              size="lg"
              onClick={handleCheckout}
            >
              ✅ Xác nhận đặt hàng
            </Button>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default Cart;
