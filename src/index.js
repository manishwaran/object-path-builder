import ObjectPathBuilder from './object-path-builder';

export default function buildObjectPath(path, bindings) {
  const objectPathBuilder = new ObjectPathBuilder(bindings)
  objectPathBuilder.convertPath(path)
  return objectPathBuilder.getResult()
}
