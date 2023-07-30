import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { getToken } from "../../Services/LocalStorageService";
import { removeToken } from "../../Services/LocalStorageService";
import { user_remove_token } from "../../redux/features/counter/CounterSlice";
import logo from "../../assets/images/atharva-brand-logo-dark.png";

function Header() {

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [SideMenuOpen, setSideMenuOpen] = useState(true);
  const usertoken = useSelector((state: {counter: {value :string}}) => state.counter.value);
  const tokens = getToken()
  const token = usertoken || tokens;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {

    const confirmLogout = () => {
      confirmAlert({
        title: "Are you sure you want to logout?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              navigate("/");
              toast.success("Logout Successfully !!");
              localStorage.clear()
              dispatch(user_remove_token());
              window.location.reload();
            },
          },
          {
            label: "No",
            onClick: () => navigate("/candidates"),
          },
        ],
      });
    };

    confirmLogout();
  };
  return (
    <>
      {token ? (
        <header
          className={
            "app-header sticky top-0 z-10" + (SideMenuOpen ? " hide-menu" : "")
          }
        >
          <div className="h-left">
            <div className="h-menu-toggle">
              <button
                className="menu_toggle"
                onClick={() => setSideMenuOpen(!SideMenuOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                  <path
                    fill="currentColor"
                    d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="logo">
              <Link to={"/"}>
                <img src={logo} alt="Atharva System" />
              </Link>
            </div>
          </div>
          <div className="h-right">
            <div className="dropdown">
              <span
                className="dropdown-toggle"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <div className="flex items-center px-3">
                  <span className="w-[30px] h-[30px] inline-flex items-center justify-center bg-gray-200 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="24"
                    >
                      <path d="M5.85 17.1q1.275-.975 2.85-1.538Q10.275 15 12 15q1.725 0 3.3.562 1.575.563 2.85 1.538.875-1.025 1.363-2.325Q20 13.475 20 12q0-3.325-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12q0 1.475.488 2.775.487 1.3 1.362 2.325ZM12 13q-1.475 0-2.488-1.012Q8.5 10.975 8.5 9.5t1.012-2.488Q10.525 6 12 6t2.488 1.012Q15.5 8.025 15.5 9.5t-1.012 2.488Q13.475 13 12 13Zm0 9q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q1.325 0 2.5-.387 1.175-.388 2.15-1.113-.975-.725-2.15-1.113Q13.325 17 12 17t-2.5.387q-1.175.388-2.15 1.113.975.725 2.15 1.113Q10.675 20 12 20Zm0-9q.65 0 1.075-.425.425-.425.425-1.075 0-.65-.425-1.075Q12.65 8 12 8q-.65 0-1.075.425Q10.5 8.85 10.5 9.5q0 .65.425 1.075Q11.35 11 12 11Zm0-1.5Zm0 9Z" />
                    </svg>
                  </span>
                  <span className="px-2">Account</span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </span>
              <ul
                className={
                  "dropdown-menu dropdown-menu-end" +
                  (navbarOpen ? " show" : "")
                }
              >
                <li>
                  <Link to={"/change-password"} className="dropdown-item">
                    Change Password
                  </Link>
                </li>
                <li>
                  <span
                    className="dropdown-item cursor-pointer"
                    onClick={() => handleLogout()}
                  >
                    Log Out
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </header>
      ) : null}
    </>
  );
}
export default Header;
