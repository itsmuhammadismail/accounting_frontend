import { Avatar } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ heading, toggleDrawer }) => {
  return (
    <header className="p-[2rem] flex justify-between items-center ">
      <div className="flex items-center gap-4">
        <MenuIcon onClick={toggleDrawer} className="hideIcon" />
        <h1 className="text-[1.5rem] font-semibold">{heading}</h1>
      </div>

      <div className="relative">
        <div className="flex items-center gap-4 rounded-full bg-white cursor-pointer">
          <Avatar>I</Avatar>
          <p className="hidden md:block">Muhammad Ismail</p>
          <ArrowDropDownIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
