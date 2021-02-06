const genCharArray = (charA, charZ) => {
  var a = [],
    i = charA.charCodeAt(0),
    j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  return a;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const uppercaseChars = genCharArray("A", "Z");
const lowercaseChars = genCharArray("a", "z").concat(" ");

let data: string[] = [];
for (let uppercaseChar of uppercaseChars) {
  let amount = getRandomInt(32, 80);
  for (let i = 0; i < amount; i++) {
    let string = uppercaseChar;
    let length = getRandomInt(5, 24);
    for (let j = 0; j < length; j++) {
      string += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    }
    data.push(string);
  }
}

export default data;
