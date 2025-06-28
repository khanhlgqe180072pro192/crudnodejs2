import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  Image,
  Badge,
} from "@chakra-ui/react";

const Orders = () => {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <Box maxW="1140px" mx="auto" p={6}>
      <Heading mb={6}>📦 Đơn hàng của bạn</Heading>

      {orders.length === 0 ? (
        <Text>Chưa có đơn hàng nào.</Text>
      ) : (
        orders.map((order, index) => (
          <Box key={index} p={4} borderWidth="1px" rounded="lg" mb={4} shadow="md">
            <Text mb={2} fontWeight="bold">
              Ngày đặt: {new Date(order.date).toLocaleString()}
            </Text>
            <Text mb={2} color="green.600">
              Tổng tiền: {order.total.toLocaleString()} VNĐ
            </Text>
            <Badge colorScheme="yellow" mb={3}>
              {order.status}
            </Badge>

            <VStack align="start" spacing={2}>
              {order.items.map((item) => (
                <Box key={item._id} display="flex" gap={4} alignItems="center">
                  <Image
                    src={item.image}
                    boxSize="60px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <Box>
                    <Text fontWeight="bold">{item.name}</Text>
                    <Text>
                      Số lượng: {item.quantity} | Giá: {item.price.toLocaleString()} VNĐ
                    </Text>
                  </Box>
                </Box>
              ))}
            </VStack>
          </Box>
        ))
      )}
    </Box>
  );
};

export default Orders;
