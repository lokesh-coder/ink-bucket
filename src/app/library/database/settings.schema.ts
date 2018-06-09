export const SettingsSchema = {
  title: 'settings schema',
  version: 0,
  description: 'settings',
  type: 'object',
  uniqueItems: true,
  properties: {
    key: {
      type: 'string',
      primary: true
    },
    value: {
      type: ['string', 'boolean', 'number', 'integer', 'null', 'array', 'object']
    }
  },
  required: ['key', 'value']
};
