// Part 1
var trace1 = {
  x: ["Cat",
  "Rabbit",
  "Dog",
  "Horse",
  "Turtle",
  "Guinea Pig",
  "Chicken",
  "Pot Bellied",
  "Pig",
  "Rat",
  "Reptile",
  "Goat",
  "Dove",
  "Parrot",
  "Parakeet",
  "Mouse",
  "Duck",
  "Snake",
  "Hamster",
  "Miniature Horse",
  "Fish",
  "Ferret",
  "Cow",
  "Pony",
  "Finch",
  "Sheep",
  "Donkey",
  "Mule",
  "Other Animal",
  "Tortoise"],
  y: [100,
    100,
    100,
    92,
    57,
    48,
    43,
    42,
    32,
    29,
    25,
    23,
    16,
    14,
    13,
    12,
    12,
    12,
    8,
    4,
    4,
    3,
    2,
    2,
    2,
    1,
    1,
    1,
    1,
    1,],
  type: "bar"
};

var data = [trace1];

var layout = {
  title: "Adoptable Pets By Species"
};

Plotly.newPlot("plot", data, layout);

//used week 15/D1/A1 as example