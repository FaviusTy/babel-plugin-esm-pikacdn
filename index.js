const path = require("path");
const finder = require("find-package-json");

function isModulePath(srcPath) {
  if (
    srcPath[0] === "." ||
    srcPath[0] === "/" ||
    srcPath.startsWith("http:") ||
    srcPath.startsWith("https:")
  )
    return false;
  return true;
}

function getImportMap(dir = "web_modules") {
  const filepath = path.resolve(process.cwd(), dir, "import-map.json");
  const ImportMap = requre(filepath);
  return Object.keys(ImportMap.imports);
}

function getPackageVersion(packageName) {
  const modulesPath = process.cwd() + "/node_modules";
  const entryPointPath = require.resolve(packageName, { paths: [modulesPath] });
  const json = finder(entryPointPath).next().value;
  return json.version;
}

function rewriteImport(imp) {
  return `https://cdn.pika.dev/${imp}/${getPackageVersion(imp)}`;
}

module.exports = function pikaWebBabelTransform({ types: t }, { dir } = {}) {
  const modules = getImportMap(dir);
  return {
    visitor: {
      ImportDeclaration(path) {
        const srcPath = path.node.source.value;
        if (!isModulePath(srcPath) || !modules.includes(srcPath)) return;
        path.node.source = t.stringLiteral(rewriteImport(srcPath));
      },
      CallExpression(path) {
        if (!t.isImport(path.node.callee)) return;
        const srcPath = path.node.arguments[0].value;
        if (!isModulePath(srcPath) || !modules.includes(srcPath)) return;
        path.node.arguments = [t.stringLiteral(rewriteImport(srcPath))];
      }
    }
  };
};
