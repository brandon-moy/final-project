export default function parseRoute(hashRoute) {
  if (hashRoute.startsWith('#')) {
    hashRoute = hashRoute.replace('#', '');
  }
  const [path, param] = hashRoute.split('?');
  const params = new URLSearchParams(param);
  return { path, params };
}
