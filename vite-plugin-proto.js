export default function protoPlugin() {
  return {
    name: "vite-plugin-proto",
    transform(code, id) {
      if (id.endsWith(".proto")) {
        return {
          code: `export default ${JSON.stringify(code)}`,
          map: null,
        };
      }
    },
    enforce: "pre",
  };
}
