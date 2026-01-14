import { useLoaderData, useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../../api/apiClient";
import { PageTitle } from "../page/PageTitle";

export const Messages = () => {
  const messages = useLoaderData();
  const revalidator = useRevalidator();

  const handleCloseMessage = async (contactId) => {
    try {
      await apiClient.patch(`/admin/message/${contactId}/close`);
      toast.success("Message closed");
      revalidator.revalidate();
    } catch (error) {
      toast.error("Failed to close message");
    }
  };

  return (
    <div className="min-n-[825px] container mx-auto px-6 py-12 font-primary">
      {messages.length === 0 ? (
        <p className="text-center text-2xl text-primary">
          No open message found.
        </p>
      ):(
        <div className="overflow-x-auto">
         <PageTitle title="Admin Contact Message" />
       <table className="w-full mt-4 table-fixed border-collapse border border-gray-200 dark:border-gray-700">
            <thead>
              <tr className="bg-primary dark:bg-light text-lighter dark:text-primary">
                <th className="w-1/6 border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  Name
                </th>
                <th className="w-1/6 border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  Email
                </th>
                <th className="w-1/6 border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  Mobile #
                </th>
                <th className="w-2/5 border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  Message
                </th>
                <th className="w-1/6 border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr
                  key={message.contactId}
                  className=" bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-lighter"
                >
                  <td className="border px-4 py-2 break-words">
                    {message.name}
                  </td>
                  <td className="border px-4 py-2 break-words">
                    {message.email}
                  </td>
                  <td className="border px-4 py-2 break-words">
                    {message.mobileNumber}
                  </td>
                  <td className="border px-4 py-2 break-words max-w-[300px] overflow-auto">
                    {message.message}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleCloseMessage(message.contactId)}
                      className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Close
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export async function messagesLoader() {
  try {
    const response = await apiClient.get("/admin/messages"); // Axios GET Request
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch messages. Please try again.",
      { status: error.status || 500 }
    );
  }
}
