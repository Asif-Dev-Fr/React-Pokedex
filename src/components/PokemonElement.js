export const pokemonElement = (element) => {
  let toLowerCase = element.toLowerCase();

  switch (toLowerCase) {
    case "rock":
      return "rgb(148, 81, 81)";

    case "ghost":
      return "rgb(247, 247, 247)";

    case "electric":
      return "rgb(255, 255, 161)";

    case "bug":
      return "#F6D6A7";

    case "poison":
      return "#e0a7f6";

    case "normal":
      return "#F4F4F4";

    case "fairy":
      return "rgba(255, 192, 203, 0.863)";

    case "fire":
      return "#FBE3DF";

    case "grass":
      return "#E2F9E1";

    case "water":
      return " #E0F1FD";

    case "ground":
      return "#684132";

    default:
      return "black";
  }
};
