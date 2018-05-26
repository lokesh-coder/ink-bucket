export const BoardSchema = {
  title: 'board schema',
  version: 0,
  description: 'boards',
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    description: {
      type: 'string',
      default: ''
    },
    createdAt: {
      type: 'string',
      default: '123'
    }
  },
  required: ['name']
};
