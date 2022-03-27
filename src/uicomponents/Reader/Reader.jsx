import React, { useState, useEffect } from "react";
import useLibrarian from "../../hooks/useLibrarian";
import Liaison from "../../functionalcomponents/Liaison/Liaison";

import styles from "./Reader.module.css";

import scrollControlFunctions from "../../util/disableScrolling";
import { useReader } from "../../contexts/ReaderContext/ReaderProvider";

const { disableScroll, enableScroll } = scrollControlFunctions;

function Reader({ novelInfo, chapter }) {
    const { setReaderIsOpen } = useReader();

    const [content, setContent] = useState("");
    const [backgroundColor, setBackgroundColor] = useState(null);
    const [fontColor, setFontColor] = useState(null);
    const [fontSize, setFontSize] = useState(null);

    const [isFetching, setIsFetching] = useState(true);

    // ui flags
    const [chapterNavIsOpen, setChapterNavIsOpen] = useState(true);
    const [settingsIsOpen, setSettingsIsOpen] = useState(false);

    const { librarian } = useLibrarian();

    useEffect(() => {
        disableScroll();
        return () => {
            enableScroll();
        };
    });

    useEffect(() => {
        // get novel info if novelID changes
        let isMounted = true;
        if (!novelInfo) return;
        setIsFetching(true);
        librarian
            .getChapterContent(novelInfo.url, chapter.index)
            .then((res) => {
                if (res) {
                    if (isMounted) {
                        setContent(res.content);
                        setIsFetching(false);
                    }
                } else {
                    // fetch from network
                    Liaison.getNovelChapterContent(
                        chapter.url,
                        novelInfo.source
                    ).then((res) => {
                        if (res) {
                            if (isMounted) {
                                setContent(res.content);
                                setIsFetching(false);
                            }
                        }
                    });
                }
            });

        return () => {
            isMounted = false;
        };
    }, [novelInfo, chapter, librarian]);

    function closeReader() {
        setReaderIsOpen(false);
    }

    function detectScreen() {
        // if "block" then it's a mobile device, else it's a desktop device
        let display = window.getComputedStyle(
            document.getElementById("device-detector")
        ).display;
        if (display === "block") {
            return "mobile";
        }
        return "desktop";
    }

    function handleClickForMobile() {
        let device = detectScreen();
        if (device === "mobile") {
            setChapterNavIsOpen(!chapterNavIsOpen);
        }
    }

    return (
        <div className={styles.Container} onClick={handleClickForMobile}>
            <div id="device-detector" className="absolute md:hidden"></div>
            {/* content */}
            <div
                className={styles.Content}
                style={{
                    backgroundColor: backgroundColor,
                    color: fontColor,
                    fontSize: fontSize,
                }}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Vestibulum morbi blandit cursus risus at ultrices mi tempus
                imperdiet. Arcu non sodales neque sodales ut. Donec enim diam
                vulputate ut pharetra sit amet aliquam id. Nulla facilisi nullam
                vehicula ipsum a. Feugiat vivamus at augue eget. Vel fringilla
                est ullamcorper eget nulla facilisi etiam dignissim diam. Nisi
                lacus sed viverra tellus in hac. Dignissim sodales ut eu sem
                integer. Orci sagittis eu volutpat odio facilisis. Faucibus nisl
                tincidunt eget nullam non. Bibendum ut tristique et egestas quis
                ipsum suspendisse ultrices. Est velit egestas dui id. Enim nec
                dui nunc mattis. Sed tempus urna et pharetra pharetra. Morbi
                blandit cursus risus at ultrices mi. Turpis cursus in hac
                habitasse platea dictumst. Neque egestas congue quisque egestas
                diam in. Nunc sed id semper risus in hendrerit gravida rutrum
                quisque. Odio ut sem nulla pharetra diam sit amet. Id interdum
                velit laoreet id donec ultrices tincidunt. Vel fringilla est
                ullamcorper eget nulla facilisi etiam dignissim. Eget mi proin
                sed libero enim sed faucibus. Tempus egestas sed sed risus
                pretium quam vulputate. Tortor at risus viverra adipiscing at in
                tellus integer feugiat. Varius morbi enim nunc faucibus a
                pellentesque sit amet porttitor. Tortor at auctor urna nunc id.
                Nam libero justo laoreet sit amet. Pellentesque sit amet
                porttitor eget dolor. Elementum nibh tellus molestie nunc. Et
                malesuada fames ac turpis egestas sed. Ut tellus elementum
                sagittis vitae et leo. Eros in cursus turpis massa. Lorem dolor
                sed viverra ipsum nunc aliquet. Tempus egestas sed sed risus.
                Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.
                Libero nunc consequat interdum varius sit amet mattis. Nisl
                rhoncus mattis rhoncus urna neque. Convallis posuere morbi leo
                urna molestie at elementum eu. Vestibulum mattis ullamcorper
                velit sed. Sagittis orci a scelerisque purus semper eget duis
                at. Hendrerit dolor magna eget est lorem ipsum dolor. Sit amet
                massa vitae tortor. Scelerisque fermentum dui faucibus in.
                Scelerisque eleifend donec pretium vulputate sapien nec sagittis
                aliquam. Egestas sed tempus urna et pharetra pharetra. Mauris
                pellentesque pulvinar pellentesque habitant morbi. Vitae et leo
                duis ut diam. Risus viverra adipiscing at in tellus. Purus non
                enim praesent elementum. Ac turpis egestas sed tempus urna et.
                Auctor eu augue ut lectus. Consectetur purus ut faucibus
                pulvinar elementum integer enim. Quis lectus nulla at volutpat
                diam. Id porta nibh venenatis cras sed felis. Nibh sit amet
                commodo nulla facilisi nullam vehicula ipsum a. Libero nunc
                consequat interdum varius sit amet mattis. Amet commodo nulla
                facilisi nullam. Amet consectetur adipiscing elit duis tristique
                sollicitudin. Odio facilisis mauris sit amet massa vitae tortor.
                Enim facilisis gravida neque convallis a. Condimentum lacinia
                quis vel eros donec ac. Diam quis enim lobortis scelerisque
                fermentum dui faucibus in ornare. Dui vivamus arcu felis
                bibendum ut tristique et egestas. Faucibus et molestie ac
                feugiat sed lectus vestibulum mattis. Adipiscing enim eu turpis
                egestas pretium aenean pharetra magna. Quis blandit turpis
                cursus in hac habitasse platea. Consectetur a erat nam at lectus
                urna duis convallis convallis. Massa placerat duis ultricies
                lacus sed turpis. In nibh mauris cursus mattis molestie a.
                Venenatis urna cursus eget nunc scelerisque viverra mauris. Enim
                ut tellus elementum sagittis vitae et leo. Nisi quis eleifend
                quam adipiscing vitae proin sagittis nisl. Egestas dui id ornare
                arcu odio ut sem nulla. Elit scelerisque mauris pellentesque
                pulvinar pellentesque habitant morbi tristique senectus. Mauris
                pharetra et ultrices neque ornare aenean. Mi proin sed libero
                enim sed faucibus turpis in eu. Pretium fusce id velit ut tortor
                pretium viverra suspendisse. Sit amet risus nullam eget felis
                eget. Pulvinar pellentesque habitant morbi tristique senectus et
                netus. Fames ac turpis egestas maecenas pharetra convallis
                posuere morbi leo. Ut sem nulla pharetra diam sit amet nisl.
                Tempor orci eu lobortis elementum nibh tellus molestie nunc. Mi
                tempus imperdiet nulla malesuada pellentesque elit eget.
                Tincidunt tortor aliquam nulla facilisi cras fermentum odio.
                Dictum sit amet justo donec enim diam vulputate ut pharetra.
                Cursus in hac habitasse platea dictumst quisque sagittis purus
                sit. Sed elementum tempus egestas sed sed risus pretium quam.
                Purus in massa tempor nec feugiat nisl pretium. Ultricies leo
                integer malesuada nunc vel risus commodo viverra. Aliquam
                faucibus purus in massa tempor. Tristique nulla aliquet enim
                tortor at auctor urna. Scelerisque mauris pellentesque pulvinar
                pellentesque habitant morbi tristique. Ipsum dolor sit amet
                consectetur adipiscing elit ut aliquam. Volutpat commodo sed
                egestas egestas fringilla phasellus faucibus. In nisl nisi
                scelerisque eu ultrices. Nisl purus in mollis nunc sed id. Ut
                etiam sit amet nisl purus in mollis nunc. Convallis posuere
                morbi leo urna. Phasellus faucibus scelerisque eleifend donec
                pretium vulputate sapien nec. Morbi tristique senectus et netus
                et malesuada fames ac. Dui ut ornare lectus sit. In ante metus
                dictum at tempor commodo ullamcorper a lacus. Facilisis gravida
                neque convallis a cras. Nam aliquam sem et tortor consequat id
                porta nibh. Dictumst vestibulum rhoncus est pellentesque elit
                ullamcorper dignissim cras tincidunt. Fermentum leo vel orci
                porta non pulvinar neque laoreet. Curabitur vitae nunc sed
                velit. Sodales neque sodales ut etiam sit amet nisl. Nunc
                consequat interdum varius sit. Molestie a iaculis at erat. Risus
                in hendrerit gravida rutrum quisque. Tincidunt arcu non sodales
                neque sodales ut etiam sit amet. Dignissim suspendisse in est
                ante in nibh mauris cursus. Neque vitae tempus quam pellentesque
                nec nam aliquam sem et. Viverra maecenas accumsan lacus vel
                facilisis volutpat est velit. Suspendisse interdum consectetur
                libero id. Pellentesque elit ullamcorper dignissim cras
                tincidunt lobortis feugiat. A diam sollicitudin tempor id eu. Et
                tortor consequat id porta nibh venenatis cras sed. Posuere lorem
                ipsum dolor sit amet consectetur adipiscing elit. Nam aliquam
                sem et tortor consequat id porta nibh venenatis. Pharetra diam
                sit amet nisl suscipit. Nisl pretium fusce id velit. Ut lectus
                arcu bibendum at varius. Nunc consequat interdum varius sit amet
                mattis vulputate enim. At risus viverra adipiscing at in tellus
                integer. Mauris augue neque gravida in fermentum et
                sollicitudin. Ac turpis egestas maecenas pharetra. Eget duis at
                tellus at urna. Turpis cursus in hac habitasse platea dictumst
                quisque. Turpis cursus in hac habitasse. Rutrum tellus
                pellentesque eu tincidunt. Quis blandit turpis cursus in hac
                habitasse platea dictumst quisque. Viverra nam libero justo
                laoreet sit amet cursus sit amet. Volutpat maecenas volutpat
                blandit aliquam. Vitae ultricies leo integer malesuada. Eu nisl
                nunc mi ipsum faucibus vitae. Scelerisque varius morbi enim nunc
                faucibus. Nulla aliquet porttitor lacus luctus accumsan. Neque
                viverra justo nec ultrices. Neque sodales ut etiam sit amet nisl
                purus. Tincidunt eget nullam non nisi est sit. Augue lacus
                viverra vitae congue eu. Lorem ipsum dolor sit amet consectetur
                adipiscing elit ut. Orci porta non pulvinar neque laoreet
                suspendisse interdum. Dignissim sodales ut eu sem integer.
                Nullam eget felis eget nunc lobortis mattis. Tincidunt praesent
                semper feugiat nibh sed pulvinar proin gravida. Orci phasellus
                egestas tellus rutrum. Eleifend mi in nulla posuere sollicitudin
                aliquam ultrices sagittis orci.
            </div>

            {/* chapter nav */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`${styles.TopBar} ${
                    chapterNavIsOpen ? "" : styles.TopBarClose
                }`}
            >
                {/* exit */}
                <div
                    className="flex items-center justify-center text-white"
                    onClick={closeReader}
                >
                    <svg
                        height="24"
                        width="24"
                        className="text-white fill-current md:mr-3"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z" />
                    </svg>
                    <span className="hidden md:inline">Exit</span>
                </div>

                {/* chapter info */}
                <div className="text-white text-xs md:text-base">
                    Chapater 5: yada yada yada
                </div>

                {/* appearance settings */}
                <div className="flex items-center justify-center text-white">
                    <svg
                        className="text-white fill-current md:mr-3"
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
                    </svg>
                    <span className="hidden md:inline text-sm">Appearance</span>
                </div>
            </div>

            <div
                className={`${styles.ChapterNav} ${
                    chapterNavIsOpen ? "" : styles.ChapterNavClose
                }`}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div>Prev Chapter</div>
                <div>Next Chapter</div>
            </div>

            {/* appearance control */}
            <div className={styles.AppearanceControl}></div>
        </div>
    );
}

export default Reader;
