export default function(time = +new Date()) {
  var date = new Date(time + 8 * 3600 * 1000);
  return date.toJSON().substring(0, 23).replace('T', ' ');
}