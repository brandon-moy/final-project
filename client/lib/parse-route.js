export default function parseRoute(hashRoute) {
  if (hashRoute.startsWith('#')) {
    hashRoute = hashRoute.replace('#', '');
  }
  const [path, param1, param2] = hashRoute.split('?');
  const name = new URLSearchParams(param1);
  const id = new URLSearchParams(param2);
  return { path, name, id };
}
