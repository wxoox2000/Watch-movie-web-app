import { FiHeart, FiLogIn, FiLogOut, FiX } from "react-icons/fi";
import { setMessage } from "./NotificationBuilder";

const Notification = ({
  type,
  N_id,
  createdAt,
  content,
  deleteN,
  showModal,
}) => {
  const setIcon = () => {
    switch (type) {
      case "login":
        return <FiLogIn className="w-8 h-8 mr-3 stroke-green" />;
      case "logout":
        return <FiLogOut className="w-8 h-8 mr-3 stroke-red" />;
      case "add":
        return <FiHeart className="w-8 h-8 mr-3 stroke-blue fill-blue" />;
      case "remove":
        return <FiHeart className="w-8 h-8 mr-3 stroke-blue" />;
      default:
        return null;
    }
  };

  const openModal = (e) => {
    if(type !== "add" && type !== "remove") {
      return;
    }
    if(e.target.tagName === "svg" || e.target.tagName === "line") {
      return;
    }
    showModal({content, type});
  }
  return (
    <li
      className="w-full min-h-[82px] p-2 rounded-xl border-2 border-gray flex items-center cursor-pointer hover:border-blue trans"
      onClick={openModal}
    >
      {setIcon()}
      <div className="h-full w-full flex items-center relative">
        <p className="text-white text-lg">{setMessage(type)}</p>
        <span className="absolute bottom-0 right-0 text-xs font-light block text-right text-white">
          {createdAt}
        </span>
      </div>
      <FiX className="w-8 h-8 stroke-red ml-3" onClick={() => deleteN(N_id)} />
    </li>
  );
};
export default Notification;
