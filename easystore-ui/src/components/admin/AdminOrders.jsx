import { useLoaderData, useRevalidator } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";
import { PageTitle } from "../page/PageTitle";

export const AdminOrders = () => {
  const orders = useLoaderData();
  const revalidator = useRevalidator();

  const formatDate = (isDate) => {
    if (!isDate) return "N/A";
    return new Date(isDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleConfirm = async (orderId) => {
    try {
      await apiClient.patch(`/admin/orders/${orderId}/confirm`);
      toast.success("Order confirmed");
      revalidator.revalidate();
    } catch (error) {
      toast.error("Failded to confirm order.");
    }
  };

  const handleCancel = async (orderId) => {
    try {
      await apiClient.patch(`/admin/orders/${orderId}/cancel`);
      toast.success("Order cancelled.");
      revalidator.revalidate();
    } catch {
      toast.error("Failded to cancelled order.");
    }
  };

  return (
    <div className="min-h-[852px] container mx-auto px-6 py-12 font-primary">
      {orders.length === 0 ? (
        <p className="text-center text-2xl text-primary">No orders found.</p>
      ) : (
        <div className="space-y-6 mt-4">
          <PageTitle title="Admin Orders Management" />
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white shadow-md rounded-md p-6"
            >
              <div className="flex flex-wrap items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-primary dark:text-lighter">
                    Order #{order.orderId}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Status:{" "}
                    <span className="font-medium text-gray-800 dark:text-lighter">
                      {order.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Price:{" "}
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      ${order.totalPrice}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Date:{" "}
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {formatDate(order.createdAt)}
                    </span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-4 lg:mt-0">
                  <button
                    onClick={() => handleConfirm(order.orderId)}
                    className="px-6 py-2 mx-2 text-white dark:text-dark text-md rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleCancel(order.orderId)}
                    className="px-6 py-2 text-white text-md rounded-md transition duration-200 bg-red-500 hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center border-b pb-4 last:border-b-0"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h3 className="text-md font-medium text-gray-800">
                        {item.productName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export async function adminOrdersLoader() {
  try {
    const response = await apiClient.get("/admin/orders"); // Axios GET Request
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch orders. Please try again.",
      { status: error.status || 500 }
    );
  }
}
