import { useState, useEffect, useContext } from "react";
import {
  Menu,
  X,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  User,
  ChevronDown,
} from "lucide-react";
import { ApiContext } from "../Context/ContextProvider";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ChangePassword from "../components/Settings/ChangePassword";
import ProfileVisibility from "../components/Settings/ProfileVisibility";
import DeleteAccount from "../components/Settings/DeleteAccount";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("password");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { authUser: user, isAuthenticated } = useContext(ApiContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getInitials = (fullName) => {
    if (!fullName) return "";

    const nameString =
      typeof fullName === "string" ? fullName : fullName.fullName || "";

    return nameString
      .split(" ")
      .filter((name) => name.length > 0)
      .slice(0, 2)
      .map((name) => name[0].toUpperCase())
      .join("");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "password":
        return <ChangePassword />;
      case "visibility":
        return <ProfileVisibility />;
      case "delete":
        return <DeleteAccount />;
      default:
        return <ChangePassword />;
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[--bg-black-900] text-[--text-black-900]">
      <header className="bg-[--bg-black-100] shadow-md p-4">
        <div className="container mx-auto flex justify-center items-center">
          <h1 className="text-xl font-semibold">Account Settings</h1>
        </div>
      </header>

      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed left-4 z-20 text-[--text-black-900] focus:outline-none md:hidden"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      <div className="flex flex-1 overflow-hidden">
        <div
          className={`${sidebarOpen ? "w-64" : "w-0"} 
          bg-[--bg-black-100] shadow-lg transition-all duration-300 ease-in-out
          fixed md:relative z-10 h-[calc(100vh-64px)] md:h-auto mt-0 md:mt-0
          overflow-y-auto`}
          style={{
            top: isMobile ? "64px" : "0",
            bottom: isMobile ? "60px" : "0",
          }}
        >
          <div className="p-4 h-full flex flex-col">
            <nav className="flex-1">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("password");
                      isMobile && setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      activeTab === "password"
                        ? "bg-[--skin-color] text-white"
                        : "hover:bg-[--bg-black-50]"
                    }`}
                  >
                    <Lock className="w-5 h-5" />
                    <span className="ml-3">Change Password</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("visibility");
                      isMobile && setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      activeTab === "visibility"
                        ? "bg-[--skin-color] text-white"
                        : "hover:bg-[--bg-black-50]"
                    }`}
                  >
                    {activeTab === "visibility" ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                    <span className="ml-3">Profile Visibility</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("delete");
                      isMobile && setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      activeTab === "delete"
                        ? "bg-[--skin-color] text-white"
                        : "hover:bg-[--bg-black-50]"
                    }`}
                  >
                    <Trash2 className="w-5 h-5" />
                    <span className="ml-3">Delete Account</span>
                  </button>
                </li>
              </ul>
            </nav>

            <div className="mt-auto p-4 bg-[--bg-black-50] rounded-lg flex items-center">
              <div className="w-10 h-10 rounded-full bg-[--skin-color] flex items-center justify-center text-white font-bold">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(user.fullName)
                )}
              </div>
              <div className="ml-3">
                <p className="font-medium">{user.fullName}</p>
                <p className="text-sm text-[--text-black-700]">{user.role}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`flex-1 overflow-auto transition-all duration-300 ${
            isMobile ? "mt-16" : ""
          }`}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
