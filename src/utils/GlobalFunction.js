export function str_gblen(string) {
  string = String(string)
  var len = 0;
  for (var i = 0; i < string.length; i++) {
    if (string.charCodeAt(i) > 127 || string.charCodeAt(i) == 94) {
      len += 2;
    } else {
      len++;
    }
  }
  return len;
}
