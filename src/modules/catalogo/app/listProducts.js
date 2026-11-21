import { NotImplementedError } from '../../../shared/http/errors.js';

// TODO: normalizar paginação (page/pageSize), buscar no repositório, devolver { data, page, pageSize, total }.
export function makeListProducts({ productRepository }) {
  return async function listProducts({ q, page, pageSize }) {
    throw new NotImplementedError('catalogo.listProducts');
  };
}
