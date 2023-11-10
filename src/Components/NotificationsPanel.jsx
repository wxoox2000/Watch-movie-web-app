import { NotifyVariants } from "./FramerMotionVariants/Variants";
import Notification from "./Notification";
import { motion } from "framer-motion";
import { getNotifications, deleteNotification } from "./notificationsApi";
import { useEffect, useState } from "react";
import NotificationModal from "./NotificationModal";

const NotificationsPanel = ({ closing }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getNotifications();
        const timeDescended = [...res].sort(
          (a, b) => b.timeStamp - a.timeStamp
        );
        setNotifications(timeDescended);
      } catch (error) {
        setError(true);
      }
    };
    fetchNotifications();
  }, []);

  const showModal = (data) => {
    setModalOpen(true);
    setModalData(data);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  const deleteNotif = (id) => {
    deleteNotification(id);
    setNotifications(notifications.filter((elem) => elem.id !== id));
  };
  return (
    <motion.div
      className={`absolute top-10 left-20 w-80 h-80 border border-gray bg-black px-4 py-6 rounded-2xl shadow-xl shadow-shadowColor ${
        closing && "animate-inputPopOut"
      }`}
      variants={NotifyVariants}
      initial="init"
      animate="visible"
    >
      {notifications.length && !error ? (
        <ul className="flex flex-col gap-3 h-[272px] overflow-y-scroll hide-scroll">
          {notifications.map((elem) => {
            return (
              <Notification
                key={elem.id}
                type={elem.action}
                N_id={elem.id}
                createdAt={elem.createdAt}
                content={elem.content}
                deleteN={deleteNotif}
                showModal={showModal}
              />
            );
          })}
        </ul>
      ) : error ? (
        <p className="text-white w-fit text-xl text-center mx-auto mt-24">
          Something went wrong, try reload the page
        </p>
      ) : (
        <p className="text-white w-fit text-2xl mx-auto mt-24">
          No notifications...
        </p>
      )}
      {modalOpen && (
        <NotificationModal 
        modalData={modalData} 
        closeModal={closeModal} />
      )}
    </motion.div>
  );
};
export default NotificationsPanel;
