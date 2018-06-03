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
    bucketId: {
      type: 'string'
    }
  },
  required: ['displayValue', 'meta', 'bucketId']
};
