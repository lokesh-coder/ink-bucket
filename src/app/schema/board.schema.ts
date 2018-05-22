export const BoardSchema = {
  title: 'board schema',
  version: 0,
  description: 'boards',
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
    }
  },
  required: ['name']
};
