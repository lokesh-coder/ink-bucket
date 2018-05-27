export const InkSchema = {
  title: 'ink schema',
  version: 0,
  description: 'inks',
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
