export const BucketSchema = {
  title: 'bucket schema',
  version: 0,
  description: 'buckets',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true
    },
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    boardId: {
      type: 'string'
    }
  },
  required: ['id', 'name', 'boardId']
};
