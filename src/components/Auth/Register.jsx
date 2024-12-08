import React, { useState } from "react";

const Register = ({ setAuthPage }) => {
  const [role, setRole] = useState("Mentor (Professor)");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    profilePicture: null,
    college: "",
    department: "",
    subjects: [],
    yearsOfExperience: "",
    availableTimeslots: [],
    linkedIn: "",
    certifications: null,
    programOfStudy: "",
    yearOfStudy: "",
    purpose: "",
    interestAreas: [],
    mentorshipType: "",
    industryExpertise: [],
    topSkills: [],
    portfolio: "",
    hourlyFee: "",
    adminType: "",
    institutionName: "",
    privileges: "",
    securityKey: "",
  });

  const [selectedCollege, setSelectedCollege] = useState("NONE");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleCollegeChange = (e) => {
    const value = e.target.value;
    setSelectedCollege(value);
    setFormData({ ...formData, college: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-black-900)] p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[var(--bg-black-100)] p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-[var(--skin-color)] mb-4">
          Register
        </h2>

        <div className="mb-4">
          <label className="block text-[var(--text-black-700)] mb-1">
            Select Role
          </label>
          <select
            name="role"
            value={role}
            onChange={handleRoleChange}
            className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
          >
            <option value="Mentor (Professor)">Mentor (Professor)</option>
            <option value="Mentee (User)">Mentee (User )</option>
            <option value="Mentor (Global)">Mentor (Global)</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Common Fields */}
        <div className="mb-4">
          <label className="block text-[var(--text-black-700)] mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-[var(--text-black-700)] mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-[var(--text-black-700)] mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black- 900)] rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-[var(--text-black-700)] mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-[var(--text-black-700)] mb-1">
            Phone Number (optional)
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-[var(--text-black-700)] mb-1">
            Profile Picture (optional)
          </label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleChange}
            className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
          />
        </div>

        {role === "Mentor (Professor)" && (
          <>
            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                College/University Name
              </label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Business">Business</option>
                <option value="Medicine">Medicine</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                Subjects of Expertise
              </label>
              <input
                type="text"
                name="subjects"
                value={formData.subjects.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subjects: e.target.value.split(", "),
                  })
                }
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
                placeholder="e.g., Machine Learning, Calculus"
              />
            </div>

            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                Years of Teaching Experience
              </label>
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                Available Timeslots
              </label>
              <input
                type="text"
                name="availableTimeslots"
                value={formData.availableTimeslots.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availableTimeslots: e.target.value.split(", "),
                  })
                }
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
                placeholder="e.g., Monday 9 AM - 11 AM"
              />
            </div>

            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                LinkedIn Profile
              </label>
              <input
                type="url"
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleChange}
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                Professional Certifications
              </label>
              <input
                type="file"
                name="certifications"
                onChange={handleChange}
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
              />
            </div>
          </>
        )}

        {role === "Mentee (User)" && (
          <>
            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                College/University Name
              </label>
              <select
                name="college"
                value={selectedCollege}
                onChange={handleCollegeChange}
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
              >
                <option value="NONE">NONE</option>
                <option value="MIT">MIT</option>
                <option value="Oxford">Oxford</option>
                <option value="Harvard">Harvard</option>
              </select>
            </div>

            {selectedCollege !== "NONE" && (
              <>
                <div className="mb-4">
                  <label className="block text-[var(--text-black-700)] mb-1">
                    Program of Study
                  </label>
                  <input
                    type="text"
                    name="programOfStudy"
                    value={formData.programOfStudy}
                    onChange={handleChange}
                    className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[var(--text-black-700)] mb-1">
                    Year of Study
                  </label>
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
                  >
                    <option value="">Select Year</option>
                    <option value="First Year">First Year</option>
                    <option value="Second Year">Second Year</option>
                    <option value="Third Year">Third Year</option>
                    <option value="Fourth Year">Fourth Year</option>
                  </select>
                </div>
              </>
            )}

            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                Purpose of Mentorship
              </label>
              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
                placeholder="e.g., Looking for career guidance in AI"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                Interest Areas
              </label>
              <input
                type="text"
                name="interestAreas"
                value={formData.interestAreas.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    interestAreas: e.target.value.split(", "),
                  })
                }
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
                placeholder="e.g., Finance, Machine Learning"
              />
            </div>

            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                Preferred Mentorship Type
              </label>
              <select
                name="mentorshipType"
                value={formData.mentorshipType}
                onChange={handleChange}
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black -900)] rounded"
              >
                <option value="">Select Type</option>
                <option value="One-on-One">One-on-One</option>
                <option value="Group Sessions">Group Sessions</option>
                <option value="Workshops">Workshops</option>
              </select>
            </div>
          </>
        )}

        {role === "Mentor (Global)" && (
          <>
            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                Industry Expertise
              </label>
              <input
                type="text"
                name="industryExpertise"
                value={formData.industryExpertise.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    industryExpertise: e.target.value.split(", "),
                  })
                }
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
                placeholder="e.g., Software Development, Product Management"
              />
            </div>

            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                Years of Professional Experience
              </label>
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                Top Skills
              </label>
              <input
                type="text"
                name="topSkills"
                value={formData.topSkills.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    topSkills: e.target.value.split(", "),
                  })
                }
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
                placeholder="e.g., JavaScript, Agile Development"
              />
            </div>

            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                Portfolio/Website
              </label>
              <input
                type="url"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                Hourly Fee
              </label>
              <input
                type="number"
                name="hourlyFee"
                value={formData.hourlyFee}
                onChange={handleChange}
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
                placeholder="$50/hour"
              />
            </div>

            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                Available Timeslots
              </label>
              <input
                type="text"
                name="availableTimeslots"
                value={formData.availableTimeslots.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availableTimeslots: e.target.value.split(", "),
                  })
                }
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
                placeholder="e.g., Monday 9 AM - 11 AM"
              />
            </div>

            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                LinkedIn Profile
              </label>
              <input
                type="url"
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleChange}
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                Professional Certifications
              </label>
              <input
                type="file"
                name="certifications"
                onChange={handleChange}
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
              />
            </div>
          </>
        )}

        {role === "Admin" && (
          <>
            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                Admin Type
              </label>
              <select
                name="adminType"
                value={formData.adminType}
                onChange={handleChange}
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
              >
                <option value="">Select Admin Type</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Institution Admin">Institution Admin</option>
              </select>
            </div>

            {formData.adminType === "Institution Admin" && (
              <div className="mb-4">
                <label className="block text-[var(--text-black-700)] mb-1">
                  Institution Name
                </label>
                <input
                  type="text"
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleChange}
                  className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                Privileges Description
              </label>
              <textarea
                name="privileges"
                value={formData.privileges}
                onChange={handleChange}
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
                placeholder="Optional"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-[var(--text-black-700)] mb-1">
                Security Key/Code
              </label>
              <input
                type="text"
                name="securityKey"
                value={formData.securityKey}
                onChange={handleChange}
                className="w-full p-2 border bg-[var(--bg-black-50)] text-[var(--text-black-900)] rounded"
                required
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-[var(--skin-color)] text-white p-2 rounded hover:bg-purple-600 transition duration-200"
        >
          Register
        </button>
        <div className="mt-4 text-center">
          <p className="text-[var(--text-black-700)]">
            Already have account{" "}
            <a
              href="#"
              className="text-[var(--skin-color)] hover:underline"
              onClick={() => {
                setAuthPage("login");
              }}
            >
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
