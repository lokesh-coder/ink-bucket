export const BucketSchema = {
  title: 'bucket schema',
  version: 0,
  description: 'buckets',
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    description: {
      type: 'string',
      default: ''
    },
    boardId: {
      type: 'string',
      ref: 'boards'
    },
    drops: {
      ref: 'drops',
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  required: ['name', 'boardId']
};
