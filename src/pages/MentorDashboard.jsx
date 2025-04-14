import { useState, useEffect, useContext } from "react";
import { Menu, X, Calendar, BookOpen, User, ChevronDown } from "lucide-react";
import ManageAvailability from "../components/MentorDashboard/ManageAvailability";
import BookedSessions from "../components/MentorDashboard/BookedSessions";
import ProfileSettings from "../components/MentorDashboard/ProfileSettings ";
import { ApiContext } from "../Context/ContextProvider";
import LoadingSpinner from "../components/common/LoadingSpinner";

const MentorDashboard = () => {
  const [activeTab, setActiveTab] = useState("availability");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { authUser: user, isAuthenticated } = useContext(ApiContext);
  if (!isAuthenticated || !user) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

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

    // Handle both string and object with fullName property
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
      case "availability":
        return <ManageAvailability />;
      case "sessions":
        return <BookedSessions />;
      case "profile":
        return <ProfileSettings />;
      default:
        return <ManageAvailability />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[--bg-black-900] text-[--text-black-900]">
      {/* Your Existing Navbar (kept intact) */}
      <header className="bg-[--bg-black-100] shadow-md p-4">
        <div className="container mx-auto flex justify-center items-center">
          <h1 className="text-xl font-semibold">Mentor Dashboard</h1>
          {/* Other navbar content */}
        </div>
      </header>

      {/* Mobile Menu Button (positioned in navbar) */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed left-4 z-20 text-[--text-black-900] focus:outline-none md:hidden"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop (always visible) and Mobile (when open) */}
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
            {/* Navigation */}
            <nav className="flex-1">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("availability");
                      isMobile && setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      activeTab === "availability"
                        ? "bg-[--skin-color] text-white"
                        : "hover:bg-[--bg-black-50]"
                    }`}
                  >
                    <Calendar className="w-5 h-5" />
                    <span className="ml-3">Manage Availability</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("sessions");
                      isMobile && setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      activeTab === "sessions"
                        ? "bg-[--skin-color] text-white"
                        : "hover:bg-[--bg-black-50]"
                    }`}
                  >
                    <BookOpen className="w-5 h-5" />
                    <span className="ml-3">Booked Sessions</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("profile");
                      isMobile && setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      activeTab === "profile"
                        ? "bg-[--skin-color] text-white"
                        : "hover:bg-[--bg-black-50]"
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span className="ml-3">Profile Settings</span>
                  </button>
                </li>
              </ul>
            </nav>

            {/* User Profile */}
            <div className="mt-auto p-4 bg-[--bg-black-50] rounded-lg flex items-center">
              <div className="w-10 h-10 rounded-full bg-[--skin-color] flex items-center justify-center text-white font-bold">
                {getInitials(user.fullName)}
              </div>
              <div className="ml-3">
                <p className="font-medium">{user.fullName}</p>
                <p className="text-sm text-[--text-black-700]">Mentor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
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

export default MentorDashboard;
