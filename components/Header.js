import Link from "next/link";
import Logo from "./Logo";
import { GlobalContext } from "../context/global";
import { useState, useContext, useEffect } from "react";

export default function Header({ topbarText }) {
  const [isHamburger, setHamburger] = useState(false);
  let { handleSettings, state } = useContext(GlobalContext);
  let { headers, isLoading, setIsLoading } = state;
  let { getMenu } = handleSettings;

  useEffect(() => {
    getMenu();
  }, [setIsLoading]);

  return (
    <>
      <header className="fixed z-40 top-0 inset-x-0 flex flex-col items-center transition">
        <section className="Topbar relative z-20 w-full bg-primary font-bold text-xs flex justify-center h-8 px-4 transition-opacity ease-linear duration-500 opacity-100">
          <div className="leading-8">{topbarText}</div>
        </section>
        <section className="MainNav relative z-20 wrapper-fluid-no-padding-mobile grid grid-cols-6 items-center h-16 md:h-24 transition-opacity ease-linear duration-500 opacity-100">
          <nav className="flex lg:hidden items-center space-x-3 col-span-2 lg:col-span-1">
            <button
              className="Burger text-gray-500 w-auto h-auto relative focus:outline-none bg-white pl-4 md:pl-0"
              onClick={() => setHamburger(!isHamburger)}
            >
              <span className="sr-only">Open main menu</span>
              <div className="block w-5">
                <span
                  aria-hidden="true"
                  className={`block absolute h-0.5 w-5 bg-black transform transition ease-in-out ${
                    isHamburger ? "rotate-45" : "-translate-y-1.5"
                  }`}
                ></span>
                <span
                  aria-hidden="true"
                  className={`block absolute h-0.5 w-5 bg-black transform  transition ease-in-out ${
                    isHamburger ? "-rotate-45" : "translate-y-1"
                  }`}
                ></span>
              </div>
            </button>
          </nav>
          <div className="flex justify-center lg:justify-start col-span-2 lg:col-span-1">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <nav className="hidden lg:flex items-center justify-center space-x-4 h-full lg:col-span-4">
            {isLoading ? (
              <div className="bg-gray-100 rounded-full h-4 w-20"></div>
            ) : (
              headers.map((item, i) =>
                item.children.length > 0 ? (
                  <div
                    key={`Menu-${i}`}
                    className="uppercase flex font-bold h-full cursor-pointer"
                  >
                    <div className="font-bold whitespace-nowrap h-full flex items-center justify-center group">
                      <span className="after:content-[''] after:block after:w-full after:h-0.5 after:bg-black after:group-hover:scale-x-100 after:scale-x-0 after:origin-top-left after:transition after:ease-in-out after:duration-300">
                        {item.name}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    key={`Menu-${i}`}
                    className="uppercase flex font-bold h-full cursor-pointer"
                  >
                    <Link
                      href={item.url}
                      className="font-bold whitespace-nowrap h-full flex items-center justify-center group"
                    >
                      <span className="after:content-[''] after:block after:w-full after:h-0.5 after:bg-black after:group-hover:scale-x-100 after:scale-x-0 after:origin-top-left after:transition after:ease-in-out after:duration-300">
                        {item.name}
                      </span>
                    </Link>
                  </div>
                )
              )
            )}
          </nav>
          <nav className="flex items-center space-x-4 justify-end col-span-2 lg:col-span-1">
            <button className='className="hidden lg:inline"'>
              <i className="fa-regular fa-magnifying-glass text-xl"></i>
            </button>
            <Link href={`#`} className="flex relative">
              <i className="fa-regular fa-heart text-xl"></i>
              <div className="flex justify-center items-center w-4 h-4 -top-[0.25rem] -right-[0.5rem] bg-primary rounded-full absolute text-[10px] shadow-sm text-white">
                2
              </div>
            </Link>
            <Link href={`#`} className="flex items-center space-x-2">
              <i className="fa-regular fa-user-hair-long text-xl"></i>
              <span className="hidden md:block text-sm font-bold">
                Hi, Adnan
              </span>
            </Link>
            <button className="CartIcon pr-4 md:pr-0">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18.5"
                  height="18.5"
                  viewBox="0 0 20 22"
                >
                  <g
                    id="Group_150"
                    data-name="Group 150"
                    transform="translate(-45.584 -1)"
                  >
                    <path
                      id="Path_37"
                      data-name="Path 37"
                      d="M59.584,7a1,1,0,0,1-1-1V3h-6V6a1,1,0,0,1-2,0V3a2,2,0,0,1,2-2h6a2,2,0,0,1,2,2V6A1,1,0,0,1,59.584,7Z"
                      fill="#111"
                    />
                    <path
                      id="Path_38"
                      data-name="Path 38"
                      d="M63.584,5h-16a2,2,0,0,0-2,2V20a3,3,0,0,0,3,3h14a3,3,0,0,0,3-3V7A2,2,0,0,0,63.584,5Zm0,15a1,1,0,0,1-1,1h-14a1,1,0,0,1-1-1V7h16Z"
                      fill="#111"
                    />
                  </g>
                </svg>
                <div className="absolute z-10 top-[2px] text-[9px] font-bold flex justify-center items-center w-[18.5px] h-[18.5px]">
                  3
                </div>
                <div className="absolute flex justify-center items-center -right-2 top-3 bg-black rounded-full p-0.5 animate-spin">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 0c3.31 0 6.291 1.353 8.459 3.522l2.48-2.48 1.061 7.341-7.437-.966 2.489-2.489c-1.808-1.807-4.299-2.928-7.052-2.928-5.514 0-10 4.486-10 10s4.486 10 10 10c3.872 0 7.229-2.216 8.89-5.443l1.717 1.046c-2.012 3.803-6.005 6.397-10.607 6.397-6.627 0-12-5.373-12-12s5.373-12 12-12z"
                      fill="#FFF"
                    />
                  </svg>
                </div>
              </div>
            </button>
          </nav>
        </section>
      </header>
    </>
  );
}
