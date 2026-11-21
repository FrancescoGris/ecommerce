import { randomUUID } from 'node:crypto';

const HEADER = 'x-request-id';
const VALID = /^[\w.-]{1,128}$/;

// Reaproveita o x-request-id do cliente (se válido) ou gera um novo.
// Fica em req.id, volta no header da resposta e é usado pelo pino-http em todos os logs.
export function requestId() {
  return (req, res, next) => {
    const incoming = req.get(HEADER);
    req.id = incoming && VALID.test(incoming) ? incoming : randomUUID();
    res.setHeader(HEADER, req.id);
    next();
  };
}
