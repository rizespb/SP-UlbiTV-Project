const firstCharUpperCase = require('../firstCharUpperCase')

module.exports = (sliceName) => `export interface I${firstCharUpperCase(sliceName)}Schema {
    
}`
