import { Outlet } from "react-router-dom";
import ProfileNavLinks, {
  items as navLinks,
} from "../../components/Input/ProfileNavLinks";

function Profile() {
  return (
    <div id="profile-page" className="w-full h-full flex pt-16" dir="rtl">
      <div className="w-full h-full ml-4">
        <Outlet />
      </div>
      <ProfileNavLinks list={navLinks}></ProfileNavLinks>
    </div>
  );
}

export default Profile;
