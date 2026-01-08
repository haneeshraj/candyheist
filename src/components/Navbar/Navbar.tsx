"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/all";
import { AnimatePresence, motion } from "motion/react";

import { navItems, socialItems } from "./navItems";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredSocialIndex, setHoveredSocialIndex] = useState<number | null>(
    null
  );
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(DrawSVGPlugin);
    gsap.set("#path", { drawSVG: "36% 0%" }); // Initial state
    gsap.set("#path2", { drawSVG: "36% 0%" }); // Initial state
  }, []);

  const handleSvgClick = () => {
    if (isOpen) {
      gsap.to("#path", {
        drawSVG: "36% 0%",
        duration: 0.6,
        ease: "cubic-bezier(0.7, 0, 0, 0.94)",
        delay: 0.1,
      }); // Go back to initial state
      gsap.to("#path2", {
        drawSVG: "36% 0%",
        duration: 0.6,
        ease: "cubic-bezier(0.7, 0, 0, 0.94)",
      });
    } else {
      gsap.to("#path", {
        drawSVG: "56% 100%",
        duration: 0.6,
        ease: "cubic-bezier(0.7, 0, 0, 0.94)",
        delay: 0.1,
      }); // Draw the path
      gsap.to("#path2", {
        drawSVG: "56% 100%",
        duration: 0.6,
        ease: "cubic-bezier(0.7, 0, 0, 0.94)",
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <motion.div
        onClick={handleSvgClick}
        style={{ cursor: "pointer" }}
        className={styles["hamburger"]}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180 }}
      >
        <motion.div
          className={styles["circle"]}
          initial={{ width: "3rem", height: "3rem" }}
          animate={{
            width: isOpen ? "6.5rem" : "3rem",
            height: isOpen ? "6.5rem" : "3rem",
          }}
          transition={{ duration: 0.6, ease: [0.7, 0, 0, 1] }}
        />
        <svg
          width="16"
          height="16"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 8.38235C0 8.38235 7.8908 8.38235 8.76755 8.38235C10.0827 8.38235 10.5211 10.5 9.20593 10.5C8.53684 10.5 7.45242 8.91177 7.45242 8.91177L1.31513 1.5"
            stroke="black"
            strokeWidth={1}
            id="path"
          />
          <path
            d="M0 2.61765C0 2.61765 7.8908 2.61765 8.76755 2.61765C10.0827 2.61765 10.5211 0.5 9.20593 0.5C8.53684 0.499999 7.45242 2.08823 7.45242 2.08823L1.31513 9.5"
            stroke="black"
            strokeWidth={1}
            id="path2"
          />
        </svg>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles["navbar"]}
            initial={{
              clipPath: "polygon(0 0, 100% 0, 100% 0%, 0% 0%)",
            }}
            animate={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            }}
            exit={{
              clipPath: "polygon(0 0, 100% 0, 100% 0%, 0% 0%)",
            }}
            transition={{ duration: 1, ease: [0.7, 0, 0, 1] }}
          >
            <div className={styles["navbar__container"]}>
              <div className={styles["navbar__updates"]}></div>
              <div className={styles["navbar__links"]}>
                <ul className={styles["navbar__items"]}>
                  {navItems.map((item, index) => {
                    const letters = item.title.split("");

                    return (
                      <motion.li
                        key={index}
                        className={`${styles["navbar__item"]} ${
                          item.id === "discography"
                            ? styles["navbar__item--small"]
                            : ""
                        } ${
                          pathname === item.path
                            ? styles["navbar__item--active"]
                            : ""
                        }`}
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                      >
                        <Link
                          href={item.path}
                          style={{
                            display: "block",
                            width: "fit-content",
                          }}
                        >
                          <div
                            style={{
                              overflow: "hidden",
                              position: "relative",
                              width: "fit-content",
                            }}
                          >
                            <motion.span
                              style={{
                                lineHeight: 1,
                                display: "inline-block",
                              }}
                              initial={{ y: 100 }}
                              animate={{ y: 0 }}
                              transition={{
                                delay: 0.2 + index * 0.05,
                                duration: 1,
                                ease: [0.63, 0, 0, 0.97],
                              }}
                            >
                              {letters.map((letter, i) => (
                                <motion.span
                                  key={i}
                                  style={{
                                    lineHeight: 1,
                                    display: "inline-block",
                                  }}
                                  initial={{ y: 100 }}
                                  animate={{
                                    y: hoveredIndex === index ? -100 : 0,
                                  }}
                                  transition={{
                                    duration: 0.6,
                                    delay: i * 0.05, // Per letter
                                    ease: [0.63, 0, 0, 0.97],
                                  }}
                                >
                                  {letter === " " ? "\u00A0" : letter}
                                </motion.span>
                              ))}
                            </motion.span>
                            <motion.span
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 100,
                                lineHeight: 1,
                                display: "inline-block",
                              }}
                            >
                              {letters.map((letter, i) => (
                                <motion.span
                                  key={i}
                                  style={{
                                    lineHeight: 1,
                                    display: "inline-block",
                                  }}
                                  initial={{ y: 0 }}
                                  animate={{
                                    y: hoveredIndex === index ? -100 : 0,
                                  }}
                                  transition={{
                                    duration: 0.6,
                                    delay: i * 0.05, // Base delay per item + per letter
                                    ease: [0.63, 0, 0, 0.97],
                                  }}
                                >
                                  {letter === " " ? "\u00A0" : letter}
                                </motion.span>
                              ))}
                            </motion.span>
                          </div>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
