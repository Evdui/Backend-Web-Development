const posts = new Map([
  [1, {
    id: 1,
    title: 'First post',
    body: 'Repository boundaries protect change.',
    authorId: 7,
  }],
  [2, {
    id: 2,
    title: 'Second post',
    body: 'Services should speak in domain language.',
    authorId: 8,
  }],
]);

let nextId = 3;

// When switching to Prisma, only this repository's storage implementation changes.
// The repository interface and the service, controller, and route behavior stay the same.

function findAll() {
  return Array.from(posts.values(), (post) => ({ ...post }));
}

function findById(id) {
  return posts.get(Number(id)) || null;
}

function create(fields) {
  const record = {
    id: nextId++,
    ...fields,
  };

  posts.set(record.id, record);
  return record;
}

function update(id, patch) {
  const post = findById(id);

  if (!post) return null;

  const updatedPost = { ...post, ...patch };
  posts.set(Number(id), updatedPost);

  return updatedPost;
}

function remove(id) {
  return posts.delete(Number(id));
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};