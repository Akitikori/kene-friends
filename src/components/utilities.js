export function scramble(word) {
  var a = word.split(""),
    n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
}

export function sameString(goalString, ourString) {
  const element = goalString === ourString;
  return element;
}
