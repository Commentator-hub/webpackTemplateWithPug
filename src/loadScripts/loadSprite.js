export function requireAll(r) {
    r.keys().forEach(r);
}


requireAll(require.context('../static/images/svg', true, /\.svg$/));