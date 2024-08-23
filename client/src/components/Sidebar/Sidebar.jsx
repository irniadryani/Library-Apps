import { useNavigate } from "react-router-dom";
import { logoutUserFn } from "../../api/Auth/Auth";
import useStore from "../../store/index";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { BiSolidHome } from "react-icons/bi";
import { ImList2 } from "react-icons/im";
import { GrTransaction } from "react-icons/gr";
import { IoLogOut } from "react-icons/io5";
import Logo from "../../assets/logo.png"

const Sidebar = () => {
  const store = useStore();
  const navigate = useNavigate();
  const handleLogout = async () => {

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel'
    });
  
    
    if (result.isConfirmed) {
      try {
        await logoutUserFn(); 
        store.logout(); 
        navigate('/login'); 
        toast.success('You successfully logged out'); 
      } catch (error) {
        console.error('Logout error:', error);
        toast.error('Logout failed. Please try again.'); 
      }
    }
  };
  
  return (
    <div className="flex justify-start items-start">
      <div className="drawer !h-screen lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-[#C9DABF] text-[#5F6F65] text-lg font-bold !h-screen w-80 p-4 overflow-y-auto mx-5 rounded-xl shadow-xl ">
            <li className="mt-5">
              <a href="/"><BiSolidHome />Dashboard</a>
            </li>
            <li className="mt-3">
              <a href="/book"><ImList2/>List Books</a>
            </li>
            <li  className="mt-3">
              <a href="/transaction"><GrTransaction />Transaction</a>
            </li>
            <li  className="mt-3 mb-5">
              <a onClick={() => handleLogout()}><IoLogOut/>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
