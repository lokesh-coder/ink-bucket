export const DropSchema = {
  title: 'drop schema',
  version: 0,
  description: 'drops',
  type: 'object',
  uniqueItems: true,
  properties: {
    name: {
      type: 'string'
    },
    displayValue: {
      type: 'string'
    },
    meta: {
      type: 'object'
    },
    description: {
      type: 'string'
    },
    createdAt: {
      type: 'number',
      default: 0,
      index: true
    },
    updatedAt: {
      type: 'number',
      default: 0
    },
    bucketId: {
      type: 'string',
      ref: 'buckets'
    }
  },
  required: ['displayValue', 'meta', 'bucketId']
};
