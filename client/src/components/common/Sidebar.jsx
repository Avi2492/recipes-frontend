import {
  RiHeart2Line,
  RiHeartAdd2Line,
  RiHome2Line,
  RiLogoutBoxLine,
  RiUser3Line,
} from "@remixicon/react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Sidebar = () => {
  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/v1/auth/logout", {
          method: "POST",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went in Sidebar");
        }
      } catch (error) {
        // toast.error(error.message);
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Logout Success!");

      queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
    },
    onError: () => {
      toast.error("Logout Failed");
    },
  });

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
  });

  return (
    <>
      <div className="p-3 md:p-10 border-r min-h-screen w-24 md:w-64 hidden sm:block">
        <div className="flex flex-col gap-20 sticky top-10 left-0">
          <div className="w-full">
            <Logo />
          </div>
          <ul className="flex flex-col items-center md:items-start gap-8">
            <Link to={"/"} className="flex gap-1 items-center">
              <RiHome2Line size={30} />
              <span className="font-bold hidden md:block">Home</span>
            </Link>
            <Link to={"/wishlist"} className="flex gap-1 items-center">
              <RiHeart2Line size={30} />
              <span className="font-bold hidden md:block">My Favorites</span>
            </Link>
            <Link to={"/create"} className="flex gap-1 items-center">
              <RiHeartAdd2Line size={30} />
              <span className="font-bold hidden md:block">Create New</span>
            </Link>
          </ul>
          <div className="mt-20">
            {authUser ? (
              <Link to={`/profile/${authUser.username}`}>
                <div className="avatar hidden md:inline-flex">
                  <div className="w-8 rounded-full">
                    <img
                      src={authUser?.profileImg || "/avatar-placeholder.png"}
                    />
                  </div>
                </div>
                <div className="flex flex-1 justify-between items-center">
                  <div className="hidden md:block">
                    <p className="text-white font-bold text-sm w-20 truncate">
                      {authUser?.fullName}
                    </p>
                    <p className="text-orange-500 text-sm">
                      {authUser?.username}
                    </p>
                  </div>
                  <RiLogoutBoxLine
                    className="w-5 h-5 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
                    }}
                  />
                </div>
              </Link>
            ) : (
              <Link to={`/signin}`} className="flex gap-1 items-center">
                <RiUser3Line size={30} />
                <span className="font-bold hidden md:block">My Profile</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

// const MobileSidebar = () => {
//   return (
//     <div
//       className="flex justify-between gap-10 border-t fixed w-full
// 			bottom-0 left-0 bg-base-100 z-10 p-2 sm:hidden
// 		"
//     >
//       <Link to={"/"}>
//         <RiHome2Line size={24} className="cursor-pointer" />
//       </Link>
//       <Link to={"/wishlist"}>
//         <RiHeart2Line size={24} className="cursor-pointer" />
//       </Link>
//       <Link to={"/create"} className="flex gap-1 items-center">
//         <RiHeartAdd2Line size={24} />
//       </Link>
//       <Link to={"/signup"} className="flex gap-1 items-center">
//         <RiUser3Line size={24} />
//       </Link>
//     </div>
//   );
// };
