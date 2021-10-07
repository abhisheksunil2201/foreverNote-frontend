import Pattern1 from "./images/patterns/pattern1.png";
import Pattern2 from "./images/patterns/pattern2.png";
import Pattern3 from "./images/patterns/pattern3.png";
import Pattern4 from "./images/patterns/pattern4.png";
import Pattern5 from "./images/patterns/pattern5.png";
import Pattern6 from "./images/patterns/pattern6.png";
import Pattern7 from "./images/patterns/pattern7.png";
import Pattern8 from "./images/patterns/pattern8.png";
import Pattern9 from "./images/patterns/pattern9.png";
import Pattern10 from "./images/patterns/pattern10.png";
import Pattern11 from "./images/patterns/pattern11.png";
import Pattern12 from "./images/patterns/pattern12.png";
import Pattern13 from "./images/patterns/pattern13.png";
import Pattern14 from "./images/patterns/pattern14.png";
import Pattern15 from "./images/patterns/pattern15.png";
import Pattern16 from "./images/patterns/pattern16.png";
import Pattern17 from "./images/patterns/pattern17.png";
import Pattern18 from "./images/patterns/pattern18.png";
import Pattern19 from "./images/patterns/pattern19.png";
import Pattern20 from "./images/patterns/pattern20.png";
import Pattern21 from "./images/patterns/pattern21.png";
import Pattern22 from "./images/patterns/pattern22.png";

export const randomPatterns = [
  Pattern1,
  Pattern2,
  Pattern3,
  Pattern4,
  Pattern5,
  Pattern6,
  Pattern7,
  Pattern8,
  Pattern9,
  Pattern10,
  Pattern11,
  Pattern12,
  Pattern13,
  Pattern14,
  Pattern15,
  Pattern16,
  Pattern17,
  Pattern18,
  Pattern19,
  Pattern20,
  Pattern21,
  Pattern22,
];

// Random Pattern for Notebook
export const randomPatternGenerator = (index) => {
  //const indexOfPattern = Math.floor(Math.random() * randomPatterns.length);
  const indexOfPattern = index % randomPatterns.length;
  return indexOfPattern;
};
