import { APP_COLOR, APP_FONT } from "@/utils/constants";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// Define notification type
type NotificationType = "order" | "promo" | "system";

// Define notification interface
interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "Đơn hàng #12345 đã được giao",
    message: "Đơn hàng của bạn từ Phở Hồng đã được giao thành công.",
    time: "10 phút trước",
    isRead: false,
  },
  {
    id: "2",
    type: "promo",
    title: "Khuyến mãi hấp dẫn!",
    message:
      "Giảm 30% cho đơn hàng đầu tiên từ KFC, áp dụng đến hết ngày hôm nay.",
    time: "1 giờ trước",
    isRead: true,
  },
  {
    id: "3",
    type: "system",
    title: "Cập nhật ứng dụng",
    message:
      "Phiên bản mới đã sẵn sàng. Cập nhật ngay để trải nghiệm các tính năng mới!",
    time: "2 giờ trước",
    isRead: true,
  },
  {
    id: "4",
    type: "order",
    title: "Đơn hàng #12346 đang được chuẩn bị",
    message: "Nhà hàng Pizza Hut đang chuẩn bị đơn hàng của bạn.",
    time: "3 giờ trước",
    isRead: false,
  },
  {
    id: "5",
    type: "promo",
    title: "Freeship cho đơn từ 100k",
    message:
      "Sử dụng mã FREESHIP6 để được miễn phí vận chuyển cho đơn hàng từ 100k.",
    time: "1 ngày trước",
    isRead: true,
  },
  {
    id: "6",
    type: "system",
    title: "Xác minh tài khoản thành công",
    message:
      "Tài khoản của bạn đã được xác minh thành công. Bạn có thể sử dụng đầy đủ các tính năng của ứng dụng.",
    time: "2 ngày trước",
    isRead: true,
  },
];

const NotificationTab = () => {
  // Function to get icon based on notification type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "order":
        return <Ionicons name="fast-food-outline" size={24} color="#FF5722" />;
      case "promo":
        return <Ionicons name="pricetag-outline" size={24} color="#4CAF50" />;
      case "system":
        return (
          <Ionicons name="notifications-outline" size={24} color="#2196F3" />
        );
      default:
        return (
          <Ionicons name="notifications-outline" size={24} color="#757575" />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            color: APP_COLOR.ORANGE,
            fontSize: 20,
            fontWeight: "bold",
            marginVertical: 15,
          }}
        >
          Thông báo
        </Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.notificationList}>
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationItem,
              notification.isRead
                ? styles.readNotification
                : styles.unreadNotification,
            ]}
          >
            <View style={styles.iconContainer}>
              {getNotificationIcon(notification.type)}
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>
                {notification.message}
              </Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: APP_FONT,
    color: "#333",
  },
  notificationList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  unreadNotification: {
    backgroundColor: "#fff9f0",
  },
  readNotification: {
    backgroundColor: "#fff",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: APP_FONT,
    color: "#333",
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    fontFamily: APP_FONT,
    color: "#666",
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
    fontFamily: APP_FONT,
    color: "#999",
  },
});

export default NotificationTab;
