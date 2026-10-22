
const { randomUUID } = require('node:crypto');

const sessions = new Map();
const SESSION_TTL_MS = 60 * 60 * 1000;

function create(userId) {
  const id = randomUUID();
  const expiresAt = Date.now() + SESSION_TTL_MS;

  sessions.set(id, { userId, expiresAt });

  return { id, userId, expiresAt };
}

function get(id) {
  if (!id) return null;

  const session = sessions.get(id);

  if (!session) return null;

  if (session.expiresAt <= Date.now()) {
    sessions.delete(id);
    return null;
  }

  return session;
}

function destroy(id) {
  if (id) sessions.delete(id);
}

module.exports = { create, get, destroy, SESSION_TTL_MS };
