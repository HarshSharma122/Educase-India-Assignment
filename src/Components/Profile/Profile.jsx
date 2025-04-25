import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('popxCurrentUser'));
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
      // Check for saved profile photo in localStorage
      const savedPhoto = localStorage.getItem('popxProfilePhoto');
      if (savedPhoto) {
        setProfilePhoto(savedPhoto);
      }
    }
  }, [navigate]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoData = reader.result;
        setProfilePhoto(photoData);
        localStorage.setItem('popxProfilePhoto', photoData);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Account Settings
              </h1>
              <p className="mt-2 text-gray-500 text-sm">
                Learn ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <p className="text-gray-500 text-sm">
                Sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
              </p>
            </div>
            
            {/* Profile Photo Section */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                {profilePhoto ? (
                  <img 
                    src={profilePhoto} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handlePhotoUpload}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </label>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Personal Information</h3>
              <div className="mt-4 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</p>
                  <p className="text-sm text-gray-900 mt-1">{user.fullName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</p>
                  <p className="text-sm text-gray-900 mt-1">{user.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</p>
                  <p className="text-sm text-gray-900 mt-1">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Company</p>
                  <p className="text-sm text-gray-900 mt-1">{user.company || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Account Type</p>
                  <p className="text-sm text-gray-900 mt-1">{user.isAgency ? 'Agency' : 'Regular'}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <button 
                onClick={() => {
                  localStorage.removeItem('popxCurrentUser');
                  localStorage.removeItem('popxProfilePhoto');
                  navigate('/login');
                }}
                className="w-full bg-red-50 text-red-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;