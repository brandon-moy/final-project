export default function parseRoute(hashRoute) {
  if (hashRoute.startsWith('#')) {
    hashRoute = hashRoute.replace('#', '');
  }
  const [path, param1, param2] = hashRoute.split('?');
  const param = new URLSearchParams(param1);
  const params = new URLSearchParams(param2);
  return { path, param, params };
}
