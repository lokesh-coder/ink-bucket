export const SettingsSchema = {
  title: 'settings schema',
  version: 0,
  description: 'settings',
  type: 'object',
  uniqueItems: true,
  properties: {
    view: {
      type: 'string'
    }
  },
  required: []
};
