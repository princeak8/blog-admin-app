import _ from "lodash";

export const Capitalize = (item) => {
  if (item === undefined) return;
  const words = item.split(" ");

  let caps = [];

  words.forEach((word) => {
    caps.push(_.capitalize(word));
  });
  const capitalizedWord = caps.join(" ");

  return capitalizedWord;
};

export const getLastName = (name) => {
  const lastname = name.split(" ")[1];

  return lastname;
};
