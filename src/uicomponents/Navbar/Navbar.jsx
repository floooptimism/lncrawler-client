import styles from "./Navbar.module.css";
import { useViewState } from "../ViewState/ViewStateContext";
import { useEffect, useState } from "react";

import DownloadsSideBar from "./subuicomponents/DownloadBar/DownloadsSideBar";

function Navbar(props) {
  const { viewState, setViewState } = useViewState();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [downloadsBarOpen, setDownloadsBarOpen] = useState(false);

  return (
    <div className="">
      {/* Topbar - shows up only when in mobile mode*/}
      <div className={`${styles.TopBar}`}>
        {/* Menu Button */}
        <div>
          <svg
            onClick={() => setSideBarOpen(!sideBarOpen)}
            height="20"
            width="20"
            viewBox="0 0 33 23"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs />
            <path
              className="cls-1"
              id="Menu"
              d="M86.5,1344h30a1.5,1.5,0,0,0,0-3h-30A1.5,1.5,0,0,0,86.5,1344Zm30,7h-30a1.5,1.5,0,0,0,0,3h30A1.5,1.5,0,0,0,116.5,1351Zm0,10h-30a1.5,1.5,0,0,0,0,3h30A1.5,1.5,0,0,0,116.5,1361Z"
              transform="translate(-85 -1341)"
            />
          </svg>
        </div>

        {/* Title */}
        <div className={`${styles.TopBarTitle}`}>
          <h1>
            {viewState[0][0].toUpperCase() +
              viewState[0].slice(1).toLowerCase()}
          </h1>
        </div>

        {/* Downloads button */}
        <div>
          <svg
            onClick={() => setDownloadsBarOpen(!downloadsBarOpen)}
            height="20"
            width="20"
            viewBox="0 0 2048 2048"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M384 2048v-128h1152v128H384zm1197-979l-621 626-621-626 90-90 467 470V0h128v1449l467-470z" />
          </svg>
        </div>
      </div>

      {/* sidebar - shows up in both modes, toggable in mobile*/}
      <div>
        {/* sidebar background */}
        <div
          onClick={() => setSideBarOpen(false)}
          className={` ${
            sideBarOpen ? "bg-opacity-60" : "bg-opacity-0 pointer-events-none"
          } transition-all ease-in duration-100 md:hidden fixed h-screen w-screen top-0 left-0 bg-gray-800 z-40`}
        ></div>

        {/* sidebar */}
        <div
          className={`${styles.SideBar} ${
            sideBarOpen ? "left-0" : "-left-56"
          } flex flex-col`}
        >
          <nav>
            <ul className={styles.NavContainer}>
              <li>
                <div
                  className={`${styles.NavItem} group ${
                    viewState[0] === "library"
                      ? `${styles.NavItemPicked}`
                      : `${styles.NavItemNotPicked}`
                  } `}
                  data-value="library"
                  onClick={(e) => setViewState([e.target.dataset["value"], ""])}
                >
                  {/* icon */}
                  <svg
                    className={`${
                      styles.NavItemIcon
                    } pointer-events-none`}
                    height="16"
                    width="16"
                    viewBox="0 0 36 44"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs />
                    <path
                      className="cls-1"
                      id="_Book"
                      d="M357,3112l-7,7v32a5,5,0,0,0,5,5h21a7.82,7.82,0,0,0,3-1s7-5,7-8v-35H357Zm26,3v31c0,1.26-2,3-2,3v-33H357.312a2.216,2.216,0,0,1,1.849-1H383Zm-16,4h4v8.88l-2-1.88-2,2v-9Zm-12,34a2,2,0,0,1-2-2v-30a2,2,0,0,1,2-2h9v15l5-4,5,4v-15h4v32a2,2,0,0,1-2,2H355Z"
                      transform="translate(-350 -3112)"
                      data-name=" Book"
                    />
                  </svg>

                  {/* text */}
                  <span className="pointer-events-none">Library</span>
                </div>
              </li>
              <li>
                <div
                  className={`${styles.NavItem} group ${
                    viewState[0] === "browse"
                      ? `${styles.NavItemPicked}`
                      : `${styles.NavItemNotPicked}`
                  }`}
                  data-value="browse"
                  onClick={(e) => setViewState([e.target.dataset["value"], ""])}
                >
                  <svg
                    className={`${
                      styles.NavItemIcon
                    } pointer-events-none`}
                    width="17"
                    height="17"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z" />
                  </svg>
                  <span className="pointer-events-none">Browse</span>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Downloads Bar */}
      <div className={`${styles.DownloadsBarContainer}`}>
        {/* Downloads Bar background */}
        <div
          onClick={() => setDownloadsBarOpen(false)}
          className={`${
            downloadsBarOpen
              ? "bg-opacity-60"
              : "bg-opacity-0 pointer-events-none"
          } transition-all ease-in duration-100 md:hidden fixed h-screen w-screen top-0 left-0 bg-gray-800 z-40`}
        ></div>

        {/* Downloads Bar */}
        <DownloadsSideBar downloadsBarOpen={downloadsBarOpen} />
      </div>
    </div>
  );
}

export default Navbar;
