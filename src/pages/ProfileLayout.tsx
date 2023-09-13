import { Outlet } from "react-router-dom";
import ProfileNavLinks, {
  items as navLinks,
} from "../components/ProfileNavLinks";

function Profile() {
  return (
    <div id="profile-page" className="w-full h-full flex">
      <ProfileNavLinks list={navLinks}></ProfileNavLinks>
      <div className="w-full h-full ml-4 ">
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
