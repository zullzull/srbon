import { useEffect, useState } from "react";
import Header from "../components/Header";
import nextConfig from "../next.config";
import Footer from "../components/Footer";
import cache from "../plugins/cache";
import Setting from "../models/setting";

export default function LayoutDefault({ children }) {
  const [topbarText, setTopbarText] = useState(null);
  const [pageNoPaddingTop, setPageNoPaddingTop] = useState(false);
  const [isHomeTransparent, setIsHomeTransparent] = useState(
    nextConfig.env.HOMEPAGE_TRANSPARANT
  );
  const [topBar, setTopBar] = useState(null);
  const [theme, setTheme] = useState(nextConfig.env.THEME);
  const [defaultThemeColor, setDefaultThemeColor] = useState(null);

  const getTopBar = async () => {
    const topbar = await cache({
      key: "topbar",
      onNoCache: async () => {
        return await Setting.fetchTopBar();
      },
      maxExpired: nextConfig.env.GENERAL_CACHE_TIME ?? 5 * 60,
    });
    console.log(topbar);
    if (topbar.success && topbar.value !== "") {
      setTopbarText(topbar.value);

      switch (theme) {
        case "napocut":
          setDefaultThemeColor("#D4A68B");
          break;

        default:
          setDefaultThemeColor("#000000");
          break;
      }
    }
  };

  const getPadding = () => {
    let padding;
    if (!pageNoPaddingTop) {
      if (topbarText) {
        padding = "pt-24 lg:pt-32";
      } else {
        padding = "pt-16 lg:pt-24";
      }

      if (isHomeTransparent) {
        if (topbarText) {
          padding = "pt-8";
        }
      }
    }
    return padding;
  };

  useEffect(() => {
    getTopBar();
  }, [setTopbarText]);
  return (
    <>
      <div>
        <section className="LayoutDefault">
          <Header topbarText={topbarText} />
          <main
            className={`flex-grow w-screen overflow-x-hidden min-h-screen ${getPadding()}`}
          >
            {children}
          </main>
          <Footer />
        </section>
      </div>
    </>
  );
}
