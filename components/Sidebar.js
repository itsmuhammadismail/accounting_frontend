import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Image from "next/image";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCardIcon from "@mui/icons-material/AddCard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ListAltIcon from "@mui/icons-material/ListAlt";

const MyDrawer = () => {
  return (
    <div>
      <div className="px-[2rem] py-[3rem] text-center">
        <h1 className="font-bold text-2xl">
          ACCOUNTING <br />
          LAB PROJECT
        </h1>
      </div>
      <ul>
        <Link href="/">
          <a>
            <li className="p-[1rem] flex items-center gap-[1rem] hover:bg-[#377DFF] hover:text-white">
              <MenuBookIcon /> Journal Entry
            </li>
          </a>
        </Link>
        <Link href="/accounts">
          <li className="p-[1rem] flex items-center justify-between gap-[1rem] hover:bg-[#377DFF] cursor-pointer hover:text-white">
            <div className="flex items-center gap-[1rem]">
              <AccountBalanceIcon /> Accounts
            </div>
          </li>
        </Link>
        <Link href="/ledger">
          <li className="p-[1rem] flex items-center justify-between gap-[1rem] hover:bg-[#377DFF] cursor-pointer hover:text-white">
            <div className="flex items-center gap-[1rem]">
              <AutoStoriesIcon /> Ledger
            </div>
          </li>
        </Link>
        <Link href="/trial-balance">
          <li className="p-[1rem] flex items-center justify-between gap-[1rem] hover:bg-[#377DFF] cursor-pointer hover:text-white">
            <div className="flex items-center gap-[1rem]">
              <AttachMoneyIcon /> Trial Balance
            </div>
          </li>
        </Link>
        <Link href="/income-statement">
          <li className="p-[1rem] flex items-center justify-between gap-[1rem] hover:bg-[#377DFF] cursor-pointer hover:text-white">
            <div className="flex items-center gap-[1rem]">
              <AccountBalanceWalletIcon /> Income Statement
            </div>
          </li>
        </Link>
        <Link href="/balance-sheet">
          <li className="p-[1rem] flex items-center justify-between gap-[1rem] hover:bg-[#377DFF] cursor-pointer hover:text-white">
            <div className="flex items-center gap-[1rem]">
              <ListAltIcon /> Balance Sheet
            </div>
          </li>
        </Link>
      </ul>
    </div>
  );
};

const Sidebar = (props) => {
  const { window } = props;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { md: 280 }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { sm: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
        }}
      >
        <MyDrawer />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
        }}
        open
      >
        <MyDrawer />
      </Drawer>
    </Box>
  );
};

export default Sidebar;
