export const InkSchema = {
  title: 'ink schema',
  version: 0,
  description: 'inks',
  type: 'object',
  uniqueItems: true,
  properties: {
    id: {
      type: 'string',
      primary: true
    },
    value: {
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
  required: ['id', 'name', 'meta', 'bucketId']
};
